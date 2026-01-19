import { FlowNode, FlowEdge } from './types';

// Grid Layout Strategy for Knowledge Distribution Chart:
// X=50: Central Decision Spine
// X=15: Extraction Methods Left Side
// X=85: Distribution Outcomes Right Side
// Y-Axis: Top to Bottom flow (Extract → Package → Distribute)

export const KNOWLEDGE_NODES: FlowNode[] = [
    // ============ PHASE 0: ENTRY ============
    {
        id: 'trapped',
        label: 'Knowledge\\nTrapped?',
        type: 'decision',
        x: 50,
        y: 5,
        color: 'blue',
        description: {
            why: "BOTTLENECK DETECTION: Your best employee is also your biggest risk. Everything that makes them great is trapped in their head. When they leave, that knowledge dies with them. This is knowledge concentration—the primary disease that mitigates an organization's ability to scale.",
            evaluate: "Identify bottlenecks: (1) Is there one person everyone goes to for a specific skill or answer? (2) Do projects stall when someone is on vacation? (3) Are new hires dependent on shadowing one 'expert' for months? If yes, knowledge is trapped.",
            read: "Start here. If knowledge flows freely, you're fine. If it's concentrated, you have work to do."
        }
    },

    // ============ PHASE 1: DIAGNOSE ============
    {
        id: 'symptom',
        label: 'Tribal or\\nAI Gap?',
        type: 'decision',
        x: 50,
        y: 35,
        color: 'blue',
        description: {
            why: "SYMPTOM ANALYSIS: Two diseases manifest from knowledge concentration. Tribal knowledge is the traditional problem—a 22-year veteran who estimates projects in 20 minutes with near-perfect accuracy while others take 3 hours at 50% accuracy. The AI gap is new—some employees are AI-forward and 3x more effective, while others work traditionally.",
            evaluate: "Which describes your bottleneck? (1) TRIBAL: Expert has domain knowledge others lack—processes, shortcuts, relationships, intuition. (2) AI GAP: Expert uses AI tools effectively while peers don't. Both need extraction, but the methods differ slightly.",
            read: "Diagnose the symptom to choose the right extraction approach."
        }
    },

    // ============ PHASE 2: EXTRACT ============
    {
        id: 'recordings',
        label: 'Recordings\\nExist?',
        type: 'decision',
        x: 28,
        y: 62,
        color: 'blue',
        description: {
            why: "ASSET AUDIT: Your organization likely has more extraction material than you realize. Meeting recordings, training videos, Loom walkthroughs—these contain expert knowledge already captured. A transcript from a 1-hour training can become an SOP in minutes with AI.",
            evaluate: "Check for: (1) Recorded onboarding sessions? (2) Loom or video walkthroughs? (3) Recorded client calls showing expert handling? If you've got recordings, you've got shortcuts.",
            read: "Transcripts + AI = instant SOPs. Don't recreate what's already captured."
        }
    },
    {
        id: 'expert_available',
        label: 'Expert\\nAvailable?',
        type: 'decision',
        x: 72,
        y: 62,
        color: 'blue',
        description: {
            why: "ACCESS CHECK: The Reverse AI Interview is the most powerful extraction method—but it requires the expert's time. If they're unavailable, unwilling, or already departed, you need alternative extraction methods.",
            evaluate: "Can you get 1-2 hours of the expert's focused time? Are they willing to be 'interviewed' by an AI? If yes, proceed to reverse interview. If no, fall back to documentation audit.",
            read: "Expert access is ideal. No access? Mine their digital footprint instead."
        }
    },

    // ============ PHASE 3: PACKAGE ============
    {
        id: 'sop_complete',
        label: 'SOP\\nComplete?',
        type: 'decision',
        x: 50,
        y: 108,
        color: 'blue',
        description: {
            why: "QUALITY GATE: An SOP that's 75% complete is useless for AI. Edge cases, nuances, and subtle judgment calls are where experts shine—and where incomplete SOPs fail. The AI needs the full recipe, not just the ingredients.",
            evaluate: "Test your SOP: (1) Could a new hire follow it without questions? (2) Does it cover edge cases the expert handles intuitively? (3) Did the expert validate it? If gaps exist, fill them before packaging.",
            read: "Garbage in, garbage out. Invest in SOP quality now."
        }
    },
    {
        id: 'maturity',
        label: 'AI\\nMaturity?',
        type: 'decision',
        x: 50,
        y: 140,
        color: 'blue',
        description: {
            why: "DISTRIBUTION CALIBRATION: Not all teams are ready for autonomous AI agents. Start where your team is, not where you wish they were. Prompt libraries require manual work but teach AI fluency. Projects/Gems are semi-automated. Skills are fully autonomous.",
            evaluate: "Assess honestly: (1) LOW: Most team members rarely use AI, need hand-holding. (2) MEDIUM: Team uses ChatGPT/Claude but not systematically. (3) HIGH: Team is AI-native, comfortable with autonomous tools.",
            read: "Match distribution method to team readiness. Level up over time."
        }
    },

    // ============ EXTRACTION OUTCOMES ============
    {
        id: 'use_transcripts',
        label: 'EXTRACT:\\nTRANSCRIPTS',
        type: 'outcome',
        x: 15,
        y: 85,
        color: 'yellow',
        description: {
            why: "TRANSCRIPT EXTRACTION: You have recordings—use them. Pass transcripts to an AI with this prompt: 'Here's a training recording transcript. Create a detailed SOP that a new employee could follow step-by-step, including edge cases and decision points mentioned.'",
            evaluate: "Pro tip: Combine transcript + interview. Give AI the transcript first: 'Here's a training. Interview me to fill gaps—ask about nuances, edge cases, and anything unclear.' This yields the highest quality SOPs.",
            read: "Transcripts are starting points. Layer in interviews for completeness.",
            tactic: {
                label: "The Transcript Synthesis Prompt",
                content: "Act as an Expert Systems Engineer. I am going to provide you with a raw transcript from a training session. Your goal is to extract the 'Genetic Knowledge' from this text and package it into a high-fidelity SOP.\n\nRequirements:\n1. Identify the 'Core Workflow'.\n2. List all 'Decision Branching' (if/then logic).\n3. Extract 'Expert Nuance' (tips, shortcuts, edge cases).\n4. Format as a Step-by-Step checklist.\n\nTranscript follows:\n[PASTE TRANSCRIPT HERE]"
            }
        }
    },
    {
        id: 'reverse_interview',
        label: 'EXTRACT:\\nINTERVIEW',
        type: 'outcome',
        x: 50,
        y: 85,
        color: 'yellow',
        description: {
            why: "REVERSE AI INTERVIEW: The AI acts as a new employee interviewing the expert. Key prompt: 'Act as a new employee. Interview me to understand how I do [X]. Ask one question at a time—each answer informs your next question. At the end, create a detailed SOP.'",
            evaluate: "Critical success factors: (1) One question at a time—prevents expert from forgetting details. (2) AI probes for edge cases. (3) AI asks 'why' not just 'what'. (4) Final output is a complete SOP.",
            read: "The best extraction method when experts are available. 30-60 minutes yields gold.",
            tactic: {
                label: "Reverse Interview Prompt",
                content: "I want to extract my knowledge about [INSERT TOPIC] so that we can build an AI Agent to replace/augment me.\n\nYour Role: Act as a high-performing new hire who is hungry to learn, but also a systems analyst. \n\nTask: Interview me to understand this workflow completely.\n\nRules:\n1. Ask ONE question at a time.\n2. Wait for my answer before asking the next.\n3. Drill down into 'Judgment Calls' (e.g., 'How do you decide between X and Y?').\n4. After 10 questions or when I say 'STOP', synthesize everything into a Master SOP."
            }
        }
    },
    {
        id: 'doc_audit',
        label: 'EXTRACT:\\nDOC AUDIT',
        type: 'outcome',
        x: 85,
        y: 85,
        color: 'yellow',
        description: {
            why: "DOCUMENTATION AUDIT: Expert unavailable? Mine their digital footprint. Slack messages, email threads, Notion pages, Google Drive docs, Confluence wikis—consolidate everything related to their expertise. Pass to AI for synthesis.",
            evaluate: "Sources to audit: (1) Slack/Teams threads where expert answered questions. (2) Email chains showing their process. (3) Scattered documentation they created. (4) Comments on tickets/PRs. Consolidate → Synthesize → Validate with whoever's available.",
            read: "Less ideal than interviews, but extracts 60-80% of captured knowledge."
        }
    },

    // ============ DISTRIBUTION OUTCOMES ============
    {
        id: 'prompt_library',
        label: 'DISTRIBUTE:\\nPROMPTS',
        type: 'outcome',
        x: 15,
        y: 170,
        color: 'green',
        description: {
            why: "LEVEL 1 - PROMPT LIBRARY: A shared folder (Google Drive, Notion, etc.) with proven prompts. Each prompt includes: (1) The prompt itself. (2) A use case study showing benefit. (3) A templated version others can customize. Highest user involvement, but easiest to start.",
            evaluate: "Setup: Create shared folder → Add prompts as templates → Require submissions include 'why it works' → Review and curate monthly. This trains AI fluency while distributing knowledge.",
            read: "Start here if team is new to AI. Graduate to Projects/Gems as fluency grows.",
            tactic: {
                label: "Prompt Documentation Template",
                content: "# PROMPT_ID: [e.g. CUSTOMER_SERVICE_V1]\n## GOAL: [What does this prompt solve?]\n## SUCCESS_METRIC: [How do we know it worked?]\n\n## THE_PROMPT:\n```\n[INSERT PROMPT HERE]\n```\n\n## INPUT_REQUIREMENTS:\n- [Source File A]\n- [Context B]"
            }
        }
    },
    {
        id: 'projects_gems',
        label: 'DISTRIBUTE:\\nPROJECTS',
        type: 'outcome',
        x: 50,
        y: 170,
        color: 'green',
        description: {
            why: "LEVEL 2 - PROJECTS & GEMS: ChatGPT Projects, Claude Projects, Gemini Gems—preconfigured AI assistants for specific tasks. Paste your system prompt (from the SOP) + upload reference files. Users interact naturally, AI applies expert knowledge automatically.",
            evaluate: "Setup: (1) Create Project/Gem per use case. (2) Paste system prompt with What/Why/How. (3) Upload reference files (templates, examples). (4) Test with real inputs. (5) Share with team. Medium user involvement—they use it, but it guides them.",
            read: "The sweet spot for most teams. Expert knowledge embedded in reusable AI tools."
        }
    },
    {
        id: 'skills',
        label: 'DISTRIBUTE:\\nSKILLS',
        type: 'outcome',
        x: 85,
        y: 170,
        color: 'green',
        description: {
            why: "LEVEL 3 - CLAUDE SKILLS: Autonomous AI that activates based on context. Unlike Projects (you go to them), Skills come to you—triggered automatically in any conversation. Folders of prompts and tools AI calls autonomously.",
            evaluate: "When to use: (1) Highly repeatable tasks with clear triggers. (2) Team is AI-native and comfortable with autonomy. (3) Task requires specific formatting/branding every time. Coming soon to ChatGPT and Gemini—the future of knowledge distribution.",
            read: "Most automated, least user involvement. Reserve for well-defined, high-frequency tasks."
        }
    },

    // ============ EXIT OUTCOME ============
    {
        id: 'no_bottleneck',
        label: 'NO\\nBOTTLENECK',
        type: 'outcome',
        x: 80,
        y: 5,
        color: 'green',
        description: {
            why: "CLEAR STATUS: Knowledge flows freely in your organization. Skills and expertise aren't concentrated in single individuals. New hires ramp up quickly. Vacations don't create emergencies. This is the goal state.",
            evaluate: "Maintain this state: (1) Document as you go—don't let new knowledge concentrate. (2) Regular knowledge audits. (3) Cross-training as standard practice. (4) AI-assisted documentation habits.",
            read: "Congratulations—but stay vigilant. Knowledge concentration creeps back."
        }
    }
];

export const KNOWLEDGE_EDGES: FlowEdge[] = [
    // Entry splits
    {
        id: 'k1', from: 'trapped', to: 'symptom', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "BOTTLENECK CONFIRMED. Knowledge is concentrated in one or few individuals. Time to diagnose the type of concentration.",
            evaluate: "Is it traditional tribal knowledge or the newer AI proficiency gap?",
            read: "Proceeds to Symptom Analysis."
        }
    },
    {
        id: 'k2', from: 'trapped', to: 'no_bottleneck', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "NO CONCENTRATION DETECTED. Knowledge flows freely. You're in a healthy state.",
            evaluate: "Maintain documentation habits and cross-training to stay here.",
            read: "Terminates at No Bottleneck."
        }
    },

    // Symptom diagnosis
    {
        id: 'k3', from: 'symptom', to: 'recordings', label: 'Tribal',
        labelPosition: 0.5,
        description: {
            why: "TRIBAL KNOWLEDGE DETECTED. Expert has domain knowledge others lack. First check: do training recordings already exist?",
            evaluate: "Mining existing recordings is faster than new interviews. Check your video archive first.",
            read: "Proceeds to Recordings Check."
        }
    },
    {
        id: 'k4', from: 'symptom', to: 'expert_available', label: 'AI Gap',
        labelPosition: 0.5,
        description: {
            why: "AI GAP DETECTED. Expert uses AI tools effectively while others don't. Need to extract their AI workflows and prompts.",
            evaluate: "AI-forward employees often have prompt libraries, custom GPTs, and workflows ready to share.",
            read: "Proceeds to Expert Availability Check."
        }
    },

    // Recording paths
    {
        id: 'k5', from: 'recordings', to: 'use_transcripts', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "RECORDINGS FOUND. You have material to work with. Transcribe and synthesize into SOPs.",
            evaluate: "Pass transcripts to AI for SOP generation. Layer in interviews for completeness.",
            read: "Proceeds to Transcript Extraction."
        }
    },
    {
        id: 'k6', from: 'recordings', to: 'expert_available', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "NO RECORDINGS. Need to extract knowledge directly from the expert.",
            evaluate: "Check if expert is available for a reverse AI interview.",
            read: "Proceeds to Expert Availability Check."
        }
    },

    // Expert availability paths
    {
        id: 'k7', from: 'expert_available', to: 'reverse_interview', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "EXPERT AVAILABLE. The gold standard for knowledge extraction. Book 1-2 hours for a reverse AI interview.",
            evaluate: "AI interviews expert, probes for edge cases, produces complete SOP.",
            read: "Proceeds to Reverse Interview."
        }
    },
    {
        id: 'k8', from: 'expert_available', to: 'doc_audit', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "EXPERT UNAVAILABLE. Fall back to mining their digital footprint—Slack, email, docs.",
            evaluate: "Less ideal but still extracts significant knowledge. Validate with available team members.",
            read: "Proceeds to Documentation Audit."
        }
    },

    // Extraction to Packaging
    {
        id: 'k9', from: 'use_transcripts', to: 'sop_complete', label: '',
        labelPosition: 0.5,
        description: {
            why: "TRANSCRIPTS PROCESSED. SOP generated from recordings. Now validate quality.",
            evaluate: "Is the SOP complete enough for AI to use reliably?",
            read: "Proceeds to Quality Gate."
        }
    },
    {
        id: 'k10', from: 'reverse_interview', to: 'sop_complete', label: '',
        labelPosition: 0.5,
        description: {
            why: "INTERVIEW COMPLETE. SOP generated from expert interview. Now validate quality.",
            evaluate: "Did the interview capture edge cases and nuances?",
            read: "Proceeds to Quality Gate."
        }
    },
    {
        id: 'k11', from: 'doc_audit', to: 'sop_complete', label: '', pathType: 'curved', controlPoints: [[72, 97]],
        labelPosition: 0.5,
        description: {
            why: "AUDIT COMPLETE. SOP synthesized from documentation. Now validate quality.",
            evaluate: "Doc audits often miss nuances—extra validation needed.",
            read: "Proceeds to Quality Gate."
        }
    },

    // Packaging to Distribution
    {
        id: 'k12', from: 'sop_complete', to: 'sop_complete', label: 'No', pathType: 'curved', controlPoints: [[35, 105]],
        labelPosition: 0.3,
        description: {
            why: "SOP INCOMPLETE. Gaps exist that will cause AI failures. Go back and fill them.",
            evaluate: "Reverse interview the expert on specific gaps. Don't skip this—incomplete SOPs waste everyone's time.",
            read: "Loop back to fill gaps, then re-validate."
        }
    },
    {
        id: 'k13', from: 'sop_complete', to: 'maturity', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "SOP VALIDATED. Ready to package into system prompt and distribute.",
            evaluate: "Next step: assess team AI maturity to choose distribution method.",
            read: "Proceeds to Maturity Assessment."
        }
    },

    // Distribution paths
    {
        id: 'k14', from: 'maturity', to: 'prompt_library', label: 'Low',
        labelPosition: 0.5,
        description: {
            why: "LOW AI MATURITY. Team needs hands-on learning. Prompt libraries teach AI fluency while distributing knowledge.",
            evaluate: "Start with copy-paste prompts. Graduate to Projects/Gems as team skill grows.",
            read: "Terminates at Prompt Library."
        }
    },
    {
        id: 'k15', from: 'maturity', to: 'projects_gems', label: 'Medium',
        labelPosition: 0.5,
        description: {
            why: "MEDIUM AI MATURITY. Team uses AI but not systematically. Pre-configured Projects/Gems embed expertise in reusable tools.",
            evaluate: "Sweet spot for most teams. Users interact naturally, expert knowledge applied automatically.",
            read: "Terminates at Projects & Gems."
        }
    },
    {
        id: 'k16', from: 'maturity', to: 'skills', label: 'High',
        labelPosition: 0.5,
        description: {
            why: "HIGH AI MATURITY. Team is AI-native. Deploy autonomous Skills that activate contextually.",
            evaluate: "Most automated, least friction. Users don't even have to remember to use it.",
            read: "Terminates at Claude Skills."
        }
    }
];

// Node labels for display
export const KNOWLEDGE_NODE_LABELS: Record<string, string> = {
    trapped: 'Bottleneck Detection',
    symptom: 'Symptom Analysis',
    recordings: 'Recordings Check',
    expert_available: 'Expert Availability',
    sop_complete: 'Quality Gate',
    maturity: 'Maturity Assessment',
    use_transcripts: 'Transcript Extraction',
    reverse_interview: 'Reverse Interview',
    doc_audit: 'Documentation Audit',
    prompt_library: 'Prompt Library',
    projects_gems: 'Projects & Gems',
    skills: 'Claude Skills',
    no_bottleneck: 'No Bottleneck'
};
