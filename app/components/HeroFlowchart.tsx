import React from 'react';

/**
 * Animated Flowchart for Hero Section
 * Inspired by Remotion FlowchartShowcase - adapted for native CSS animations
 */
const HeroFlowchart: React.FC = () => {
    return (
        <div className="hero-flowchart-container">
            <svg viewBox="0 0 400 420" className="w-full h-full max-w-[400px]">
                <defs>
                    {/* Glow filter for nodes */}
                    <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Arrow marker */}
                    <marker id="heroArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="var(--border-primary)" />
                    </marker>
                </defs>

                {/* Background circle with pulse */}
                <circle
                    cx="200" cy="210" r="180"
                    fill="var(--bg-secondary)"
                    stroke="var(--border-primary)"
                    strokeWidth="1.5"
                    opacity="0.3"
                    className="hero-flowchart-bg"
                />

                {/* ===== EDGES (draw first, appear with animation) ===== */}

                {/* Edge: Entry → Decision 1 */}
                <path
                    d="M200 85 L200 125"
                    stroke="var(--border-primary)"
                    strokeWidth="2.5"
                    fill="none"
                    markerEnd="url(#heroArrow)"
                    className="hero-edge hero-edge-1"
                />

                {/* Edge: Decision 1 → PROTECT (left) */}
                <path
                    d="M150 175 L80 220"
                    stroke="var(--border-primary)"
                    strokeWidth="2.5"
                    fill="none"
                    markerEnd="url(#heroArrow)"
                    className="hero-edge hero-edge-2"
                />

                {/* Edge: Decision 1 → AUTOMATE (right) */}
                <path
                    d="M250 175 L320 220"
                    stroke="var(--border-primary)"
                    strokeWidth="2.5"
                    fill="none"
                    markerEnd="url(#heroArrow)"
                    className="hero-edge hero-edge-3"
                />

                {/* Edge: PROTECT → Decision 2 (dashed continuation) */}
                <path
                    d="M80 275 L80 310 L200 310 L200 335"
                    stroke="var(--border-primary)"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="none"
                    className="hero-edge hero-edge-4"
                />

                {/* ===== NODES ===== */}

                {/* Entry Node: YOUR TASK */}
                <g className="hero-node hero-node-1">
                    <rect
                        x="125" y="35" width="150" height="50" rx="8"
                        fill="var(--bg-highlight)"
                        stroke="var(--border-primary)"
                        strokeWidth="2.5"
                    />
                    <text
                        x="200" y="67"
                        textAnchor="middle"
                        fill="var(--text-primary)"
                        fontSize="14"
                        fontFamily="var(--font-display)"
                        fontWeight="bold"
                    >
                        YOUR TASK
                    </text>
                </g>

                {/* Decision Node: Worth Automating? */}
                <g className="hero-node hero-node-2">
                    <rect
                        x="145" y="130" width="110" height="55" rx="8"
                        fill="white"
                        stroke="var(--border-primary)"
                        strokeWidth="2.5"
                        filter="url(#nodeGlow)"
                    />
                    <text x="200" y="153" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontFamily="var(--font-body)" fontWeight="600">Worth</text>
                    <text x="200" y="170" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontFamily="var(--font-body)" fontWeight="600">Automating?</text>
                </g>

                {/* Left Outcome: PROTECT */}
                <g className="hero-node hero-node-3">
                    <rect
                        x="30" y="225" width="100" height="45" rx="6"
                        fill="var(--bg-tertiary)"
                        stroke="var(--border-primary)"
                        strokeWidth="2.5"
                    />
                    <text x="80" y="253" textAnchor="middle" fill="white" fontSize="13" fontFamily="var(--font-display)" fontWeight="bold">PROTECT</text>
                </g>
                {/* NO label */}
                <text className="hero-label hero-label-1" x="120" y="195" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-body)" fontWeight="600">NO</text>

                {/* Right Outcome: AUTOMATE */}
                <g className="hero-node hero-node-4">
                    <rect
                        x="270" y="225" width="100" height="45" rx="6"
                        fill="var(--bg-accent)"
                        stroke="var(--border-primary)"
                        strokeWidth="2.5"
                    />
                    <text x="320" y="253" textAnchor="middle" fill="white" fontSize="13" fontFamily="var(--font-display)" fontWeight="bold">AUTOMATE</text>
                </g>
                {/* YES label */}
                <text className="hero-label hero-label-2" x="275" y="195" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-body)" fontWeight="600">YES</text>

                {/* Decision Node 2: Worth Augmenting? */}
                <g className="hero-node hero-node-5">
                    <rect
                        x="145" y="340" width="110" height="50" rx="8"
                        fill="white"
                        stroke="var(--border-primary)"
                        strokeWidth="2.5"
                    />
                    <text x="200" y="362" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-body)" fontWeight="600">Worth</text>
                    <text x="200" y="378" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-body)" fontWeight="600">Augmenting?</text>
                </g>

                {/* Animated data pulse traveling through */}
                <circle className="hero-pulse" r="6" fill="var(--bg-accent)">
                    <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        path="M200 60 L200 155 L320 247"
                    />
                </circle>

                {/* More decisions indicator */}
                <text
                    x="200" y="410"
                    textAnchor="middle"
                    fill="var(--text-tertiary)"
                    fontSize="11"
                    fontFamily="var(--font-body)"
                    className="hero-more-indicator"
                >
                    ↓ more decisions
                </text>
            </svg>
        </div>
    );
};

export default HeroFlowchart;
