import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { STRATEGY_NODES } from '../constants-strategy';
import { NODES } from '../constants';
import { KNOWLEDGE_NODES, KNOWLEDGE_TACTICAL_INSIGHTS } from '../constants-knowledge';
import type { ChartMode } from '../types';

interface CopyForAIProps {
    chartMode: ChartMode;
}

const CopyForAI: React.FC<CopyForAIProps> = ({ chartMode }) => {
    const { theme } = useTheme();
    const isPipBoy = theme === 'pipboy';
    const [copied, setCopied] = useState(false);

    const generateMarkdown = (): string => {
        let markdown = '';

        if (chartMode === 'strategy') {
            markdown = `# Strategy Diagnostic - aiornot.biz\n\n`;
            markdown += `Use this framework to determine if AI is right for your business challenge.\n\n`;

            STRATEGY_NODES.forEach(node => {
                if (node.description) {
                    markdown += `## ${node.label.replace(/\\n/g, ' ')}\n\n`;
                    markdown += `**Analysis:** ${node.description.why}\n\n`;
                    markdown += `**Evaluation:** ${node.description.evaluate}\n\n`;
                    markdown += `**Execution:** ${node.description.read}\n\n`;
                    markdown += `---\n\n`;
                }
            });
        } else if (chartMode === 'task') {
            markdown = `# Task Assessment - aiornot.biz\n\n`;
            markdown += `Use this framework to evaluate whether a specific task should be automated, augmented, or protected.\n\n`;

            NODES.forEach(node => {
                if (node.description) {
                    markdown += `## ${node.label.replace(/\\n/g, ' ')}\n\n`;
                    markdown += `**Analysis:** ${node.description.why}\n\n`;
                    markdown += `**Evaluation:** ${node.description.evaluate}\n\n`;
                    markdown += `**Execution:** ${node.description.read}\n\n`;
                    markdown += `---\n\n`;
                }
            });
        } else if (chartMode === 'knowledge') {
            markdown = `# Knowledge Playbook - aiornot.biz\n\n`;
            markdown += `Use this framework to extract, package, and distribute organizational knowledge.\n\n`;

            KNOWLEDGE_NODES.forEach(node => {
                if (node.description) {
                    markdown += `## ${node.label.replace(/\\n/g, ' ')}\n\n`;
                    markdown += `**Analysis:** ${node.description.why}\n\n`;
                    markdown += `**Evaluation:** ${node.description.evaluate}\n\n`;
                    markdown += `**Execution:** ${node.description.read}\n\n`;

                    if (node.description.tactic) {
                        markdown += `### Tactic: ${node.description.tactic.label}\n`;
                        markdown += `\`\`\`\n${node.description.tactic.content}\n\`\`\`\n\n`;
                    }

                    if (node.description.framework) {
                        markdown += `### Framework\n`;
                        node.description.framework.forEach(f => {
                            markdown += `- **${f.w}**: ${f.desc}\n`;
                        });
                        markdown += `\n`;
                    }

                    markdown += `---\n\n`;
                }
            });

            // Add Tactical Insights
            markdown += `## Tactical Insights\n\n`;
            Object.values(KNOWLEDGE_TACTICAL_INSIGHTS).forEach(insight => {
                markdown += `### ${insight.title}\n`;
                markdown += `**Concept:** "${insight.concept}"\n\n`;
                markdown += `**Trap:** ${insight.warning}\n\n`;
                markdown += `**Advice:** ${insight.advice}\n\n`;
                markdown += `---\n\n`;
            });
        }

        return markdown;
    };

    const handleCopy = async () => {
        const markdown = generateMarkdown();
        try {
            await navigator.clipboard.writeText(markdown);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`fixed top-20 left-4 z-50 flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${isPipBoy
                ? 'bg-[#33ff00] text-black hover:bg-[#33ff00]/80 border-2 border-[#33ff00]'
                : 'bg-[#1E3D2F] text-white hover:bg-[#FF6B4A] border-2 border-[#1E3D2F] shadow-[2px_2px_0px_#1E3D2F]'
                }`}
        >
            {copied ? (
                <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                    </svg>
                    Copied!
                </>
            ) : (
                <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 2a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1H5zm0-1h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V3a2 2 0 012-2z" />
                        <path d="M3 4H2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2v-1h-1v1a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1h1V4z" />
                    </svg>
                    Copy for AI
                </>
            )}
        </button>
    );
};

export default CopyForAI;
