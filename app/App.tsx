import React, { useState, useEffect } from 'react';
import Flowchart from './components/Flowchart';
import InfoTerminal from './components/InfoTerminal';
// WIP: Voice Interview feature - temporarily disabled
// import InterviewMode from './components/InterviewMode';
import BlueprintGenerator from './components/BlueprintGenerator';
import SurvivalBlueprint from './components/SurvivalBlueprint';
import { SelectedItem, FlowEdge } from './types';
import type { GraphNodeId } from './types/interview';
import { NODES, EDGES } from './constants';
import { STRATEGY_NODES, STRATEGY_EDGES } from './constants-strategy';
import { KNOWLEDGE_NODES, KNOWLEDGE_EDGES } from './constants-knowledge';
import { useDiagnosticPath } from './hooks/useDiagnosticPath';
import { useTaskAssessment } from './hooks/useTaskAssessment';
import { useKnowledgePlaybook } from './hooks/useKnowledgePlaybook';
import { useProgressiveReveal } from './hooks/useProgressiveReveal';
import TaskNameOverlay from './components/TaskNameOverlay';
import TaskVerdict from './components/TaskVerdict';
import KnowledgeLifecycleHUD from './components/KnowledgeLifecycleHUD';

type ChartMode = 'task' | 'strategy' | 'knowledge';

function App() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  // WIP: Voice Interview state - temporarily disabled
  // const [isInterviewMode, setIsInterviewMode] = useState(false);
  // const [revealedNodes, setRevealedNodes] = useState<GraphNodeId[]>([]);
  const [chartMode, setChartMode] = useState<ChartMode>('strategy');
  const [showBlueprint, setShowBlueprint] = useState(false);

  // Diagnostic path tracking for Strategy mode
  const {
    recordNodeVisit,
    recordDecision,
    getPathSummary,
    isComplete: diagnosticComplete,
    isInProgress: diagnosticInProgress,
    resetDiagnostic,
    getProgress,
    state: strategyState,
  } = useDiagnosticPath();

  // Task Assessment state
  const {
    mode: taskMode,
    taskName,
    setMode: setTaskAssessmentMode,
    startAssessment,
    recordDecision: recordTaskDecision,
    resetAssessment: resetTaskAssessment,
    isNodeVisited,
    isCurrentNode,
    isComplete: taskAssessmentComplete,
    visitedNodes: taskVisitedNodes,
  } = useTaskAssessment();

  // Auto-select current node in assessment mode
  useEffect(() => {
    if (chartMode === 'task' && taskMode === 'assess' && taskVisitedNodes.length > 0) {
      const currentNodeId = taskVisitedNodes[taskVisitedNodes.length - 1];
      const node = NODES.find(n => n.id === currentNodeId);
      if (node && (!selectedItem || selectedItem.data.id !== currentNodeId)) {
        setSelectedItem({ type: 'node', data: node });
      }
    }
  }, [chartMode, taskMode, taskVisitedNodes, selectedItem]);

  // Knowledge Playbook state
  const {
    activePhase,
    selectPhase,
    resetPlaybook,
    phases: knowledgePhases,
  } = useKnowledgePlaybook();

  // Progressive Reveal for Strategy mode
  const {
    revealNode: revealStrategyNode,
    resetReveal: resetStrategyReveal,
    nodeVisibilityMap: strategyNodeVisibility,
    edgeVisibilityMap: strategyEdgeVisibility,
  } = useProgressiveReveal(STRATEGY_NODES, STRATEGY_EDGES, 'atoms');

  // Zoom to phase cluster when selected
  useEffect(() => {
    // We need a ref to the zoomToViewBox or similar if we want to zoom from here.
    // However, the Flowchart component currently manages its own zoom.
    // We can add a "viewBox" prop to Flowchart or a trigger.
  }, [activePhase]);

  // Get the appropriate nodes/edges based on mode
  const getNodesAndEdges = () => {
    switch (chartMode) {
      case 'task':
        return { nodes: NODES, edges: EDGES };
      case 'strategy':
        return { nodes: STRATEGY_NODES, edges: STRATEGY_EDGES };
      case 'knowledge':
        return { nodes: KNOWLEDGE_NODES, edges: KNOWLEDGE_EDGES };
    }
  };
  const { nodes: currentNodes, edges: currentEdges } = getNodesAndEdges();

  const handleSelect = (item: SelectedItem) => {
    setSelectedItem(item);

    // Track diagnostic path in Strategy mode + progressive reveal
    if (chartMode === 'strategy') {
      if (item.type === 'node') {
        recordNodeVisit(item.data.id);
        revealStrategyNode(item.data.id); // Reveal the node and its adjacents
      } else if (item.type === 'edge') {
        const edge = item.data as FlowEdge;
        const choice = edge.label?.toLowerCase() === 'yes' ? 'yes' : 'no';
        recordDecision(edge.from, choice);
        revealStrategyNode(edge.to); // Reveal the destination node
      }
    }
  };

  const handleShowBlueprint = () => {
    setShowBlueprint(true);
  };

  const handleCloseBlueprint = () => {
    setShowBlueprint(false);
  };

  const handleResetDiagnostic = () => {
    resetDiagnostic();
    resetStrategyReveal(); // Reset progressive reveal
    setShowBlueprint(false);
  };

  const handleCloseTerminal = () => {
    // In assessment mode, closing terminal might be confusing if they haven't finished.
    // We'll allow it but they have to click the node again to resume.
    setSelectedItem(null);
  };

  const handleTaskDecision = (choice: 'yes' | 'no') => {
    if (selectedItem?.type === 'node') {
      const currentNodeId = selectedItem.data.id;
      const choiceLabel = choice === 'yes' ? 'Yes' : 'No';
      const edge = EDGES.find(e => e.from === currentNodeId && e.label === choiceLabel);

      if (edge) {
        recordTaskDecision(currentNodeId, choice, edge.to);
        const nextNode = NODES.find(n => n.id === edge.to);
        if (nextNode) {
          setSelectedItem({ type: 'node', data: nextNode });
        }
      }
    }
  };

  const handleStartTaskAssessment = (name: string) => {
    startAssessment(name);
    const firstNode = NODES.find(n => n.id === 'often');
    if (firstNode) {
      setSelectedItem({ type: 'node', data: firstNode });
    }
  };

  const getPathOutcome = (visitedNodes: string[]): 'automate' | 'augment' | 'diy' => {
    const lastNodeId = visitedNodes[visitedNodes.length - 1];
    if (lastNodeId === 'automate' || lastNodeId === 'augment' || lastNodeId === 'diy') {
      return lastNodeId as 'automate' | 'augment' | 'diy';
    }
    return 'augment'; // Fallback
  };

  // WIP: Voice Interview handlers - temporarily disabled
  // const handleStartInterview = () => {
  //   setIsInterviewMode(true);
  //   setSelectedItem(null);
  // };

  // const handleCloseInterview = () => {
  //   setIsInterviewMode(false);
  // };

  // const handleRevealNodes = useCallback((nodes: GraphNodeId[]) => {
  //   setRevealedNodes(prev => {
  //     const newNodes = nodes.filter(n => !prev.includes(n));
  //     return newNodes.length > 0 ? [...prev, ...newNodes] : prev;
  //   });
  // }, []);

  const handleModeChange = (mode: ChartMode) => {
    setChartMode(mode);
    setSelectedItem(null); // Clear selection when switching modes
  };

  // WIP: Voice Interview render - temporarily disabled
  // if (isInterviewMode) {
  //   return (
  //     <InterviewMode
  //       onClose={handleCloseInterview}
  //       onRevealNodes={handleRevealNodes}
  //     />
  //   );
  // }

  return (
    <div className="relative w-screen h-screen bg-[#0a0a0a] overflow-hidden flex flex-col">
      {/* Background Visuals */}
      <div className="scanlines"></div>
      <div className="crt-flicker"></div>

      {/* Decorative Border Layer */}
      <div className="absolute inset-0 border-[16px] border-[#0a0a0a] pointer-events-none z-20 rounded-[30px]"></div>
      <div className="absolute inset-2 border-2 border-[#33ff00] opacity-50 pointer-events-none z-20 rounded-[20px]"></div>

      {/* Header / Top Bar */}
      <header className="relative z-30 flex justify-between items-center px-6 py-2 border-b-2 border-[#33ff00]/30 bg-[#001100]/80">
        <h1 className="text-3xl font-bold text-[#33ff00] tracking-widest glow-text">
          PIP-BOY <span className="text-sm align-top opacity-70">Model 3000</span>
        </h1>

        {/* Chart Mode Toggle */}
        <div className="flex items-center gap-1 bg-[#0a0a0a] border border-[#33ff00]/50 rounded-lg p-1">
          <button
            onClick={() => handleModeChange('strategy')}
            className={`px-3 py-1 rounded font-vt323 text-sm transition-all ${chartMode === 'strategy'
              ? 'bg-[#33ff00] text-black'
              : 'text-[#33ff00]/70 hover:text-[#33ff00] hover:bg-[#33ff00]/10'
              }`}
          >
            STRATEGY
          </button>
          <button
            onClick={() => handleModeChange('task')}
            className={`px-3 py-1 rounded font-vt323 text-sm transition-all ${chartMode === 'task'
              ? 'bg-[#33ff00] text-black'
              : 'text-[#33ff00]/70 hover:text-[#33ff00] hover:bg-[#33ff00]/10'
              }`}
          >
            TASK
          </button>
          <button
            onClick={() => handleModeChange('knowledge')}
            className={`px-3 py-1 rounded font-vt323 text-sm transition-all ${chartMode === 'knowledge'
              ? 'bg-[#33ff00] text-black'
              : 'text-[#33ff00]/70 hover:text-[#33ff00] hover:bg-[#33ff00]/10'
              }`}
          >
            KNOWLEDGE
          </button>
        </div>

        <div className="hidden md:flex space-x-8 text-[#33ff00]/80 text-xl font-bold font-vt323">
          <span>STATUS: <span className="text-[#ffb000]">ONLINE</span></span>
          <span>RADS: <span className="text-[#ff3333]">0</span></span>
        </div>
      </header>

      {/* Chart Mode Subtitle */}
      <div className="relative z-30 px-6 py-1 bg-[#001100]/40 border-b border-[#33ff00]/20 flex justify-between items-center">
        <span className="text-[#33ff00]/60 font-vt323 text-sm">
          {chartMode === 'task' && (
            <div className="flex items-center gap-4">
              <span className="opacity-60">{' > '}TASK AUTOMATOR:</span>
              <div className="flex bg-black/40 border border-[#33ff00]/30 rounded overflow-hidden">
                <button
                  onClick={() => {
                    setTaskAssessmentMode('learn');
                    resetTaskAssessment();
                  }}
                  className={`px-3 py-0.5 text-xs transition-all ${taskMode === 'learn' ? 'bg-[#33ff00] text-black' : 'text-[#33ff00]/60 hover:bg-[#33ff00]/10'}`}
                >
                  LEARN
                </button>
                <button
                  onClick={() => setTaskAssessmentMode('assess')}
                  className={`px-3 py-0.5 text-xs transition-all ${taskMode === 'assess' ? 'bg-[#33ff00] text-black' : 'text-[#33ff00]/60 hover:bg-[#33ff00]/10'}`}
                >
                  ASSESS
                </button>
              </div>
              {taskMode === 'assess' && taskName && (
                <span className="text-[#33ff00] animate-pulse ml-2 text-xs">
                  [ EVALUATING: {taskName.toUpperCase()} ]
                </span>
              )}
            </div>
          )}
          {chartMode === 'strategy' && (
            diagnosticInProgress
              ? `> DIAGNOSTIC IN PROGRESS: ${getProgress()}% complete. Click nodes to continue...`
              : diagnosticComplete
                ? '> DIAGNOSTIC COMPLETE: Your Survival Blueprint is ready!'
                : '> AI SURVIVAL DIAGNOSTIC: Is your business built for the Bits or the Atoms?'
          )}
          {chartMode === 'knowledge' && '> KNOWLEDGE DISTRIBUTION: Extract, Package, Distribute expert knowledge'}
        </span>
        {(chartMode === 'strategy' && (diagnosticInProgress || diagnosticComplete)) && (
          <button
            onClick={handleResetDiagnostic}
            className="text-[#33ff00]/50 hover:text-[#33ff00] font-vt323 text-sm"
          >
            [RESET]
          </button>
        )}
      </div>

      {/* Main Graph Area */}
      <main className="flex-1 relative z-10 overflow-hidden">
        <Flowchart
          nodes={currentNodes}
          edges={currentEdges}
          onSelect={handleSelect}
          selectedItem={selectedItem}
          visitedNodes={
            chartMode === 'task' ? taskVisitedNodes :
              chartMode === 'strategy' ? strategyState.visitedNodes : []
          }
          visitedEdges={
            chartMode === 'task' ? taskVisitedNodes.slice(0, -1).map((id, i) => {
              const nextId = taskVisitedNodes[i + 1];
              return currentEdges.find(e => e.from === id && e.to === nextId)?.id || '';
            }).filter(id => id !== '') :
              chartMode === 'strategy' ? strategyState.visitedNodes.slice(0, -1).map((id, i) => {
                const nextId = strategyState.visitedNodes[i + 1];
                return currentEdges.find(e => e.from === id && e.to === nextId)?.id || '';
              }).filter(id => id !== '') : []
          }
          currentNodeId={
            chartMode === 'task' ? taskVisitedNodes[taskVisitedNodes.length - 1] :
              chartMode === 'strategy' ? strategyState.visitedNodes[strategyState.visitedNodes.length - 1] : null
          }
          zoomArea={chartMode === 'knowledge' && activePhase ? knowledgePhases.find(p => p.id === activePhase)?.zoomTarget : null}
          nodeVisibility={chartMode === 'strategy' ? strategyNodeVisibility : undefined}
          edgeVisibility={chartMode === 'strategy' ? strategyEdgeVisibility : undefined}
          startNodeId={chartMode === 'strategy' ? 'atoms' : null}
          nodeHighlights={{}}
        />
      </main>

      {/* Info Terminal Overlay */}
      <InfoTerminal
        selectedItem={selectedItem}
        onClose={handleCloseTerminal}
        isDiagnosticMode={chartMode === 'strategy'}
        isAssessmentMode={chartMode === 'task' && taskMode === 'assess'}
        onDecision={handleTaskDecision}
      />

      {/* Knowledge Lifecycle HUD */}
      {chartMode === 'knowledge' && (
        <KnowledgeLifecycleHUD
          activePhase={activePhase}
          phases={knowledgePhases}
          onPhaseSelect={selectPhase}
        />
      )}

      {/* Task Assessment Overlay */}
      {chartMode === 'task' && taskMode === 'assess' && !taskName && (
        <TaskNameOverlay
          onStart={handleStartTaskAssessment}
          onCancel={() => setTaskAssessmentMode('learn')}
        />
      )}

      {/* Task Verdict - Assessment Complete */}
      {chartMode === 'task' && taskMode === 'assess' && taskAssessmentComplete && (
        <TaskVerdict
          taskName={taskName}
          outcome={getPathOutcome(taskVisitedNodes)}
          onReset={resetTaskAssessment}
        />
      )}

      {/* Blueprint Generator - Strategy Mode */}
      {chartMode === 'strategy' && (
        <BlueprintGenerator
          isComplete={diagnosticComplete}
          onGenerate={handleShowBlueprint}
          pathSummary={getPathSummary()}
        />
      )}

      {/* Survival Blueprint Modal */}
      {showBlueprint && (
        <SurvivalBlueprint
          pathSummary={getPathSummary()}
          onClose={handleCloseBlueprint}
          onReset={handleResetDiagnostic}
        />
      )}

      {/* WIP: Voice Interview Button - temporarily disabled
      {chartMode === 'task' && (
        <button
          onClick={handleStartInterview}
          className="absolute bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 bg-[#33ff00] text-black font-vt323 text-lg rounded-lg hover:bg-[#33ff00]/80 transition-all shadow-lg shadow-[#33ff00]/20 hover:shadow-[#33ff00]/40"
        >
          <span className="text-xl">[MIC]</span>
          <span className="hidden md:inline">START VOICE INTERVIEW</span>
          <span className="md:hidden">INTERVIEW</span>
        </button>
      )}
      */}

      {/* Footer Instructions (Only visible when no selection) */}
      {!selectedItem && (
        <div className="absolute bottom-6 left-28 text-[#33ff00]/60 z-30 hidden md:block animate-pulse font-vt323 text-xl">
          {'>'} SELECT NODES OR CONNECTIONS TO BEGIN ANALYSIS...
        </div>
      )}
    </div>
  );
}

export default App;
