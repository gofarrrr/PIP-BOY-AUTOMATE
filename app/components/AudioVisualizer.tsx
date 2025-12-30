// Audio waveform visualizer component

import React, { useRef, useEffect } from 'react';

interface AudioVisualizerProps {
    audioLevel: number;  // 0-1
    isActive: boolean;
    color?: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
    audioLevel,
    isActive,
    color = '#33ff00'
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const barsRef = useRef<number[]>(new Array(20).fill(0));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        const draw = () => {
            const { width, height } = canvas;

            // Clear canvas
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, width, height);

            // Update bars with some randomness based on audio level
            const bars = barsRef.current;
            for (let i = 0; i < bars.length; i++) {
                if (isActive) {
                    // Add variation based on audio level and position
                    const targetHeight = audioLevel * (0.3 + Math.random() * 0.7);
                    bars[i] += (targetHeight - bars[i]) * 0.3;
                } else {
                    // Decay when not active
                    bars[i] *= 0.9;
                }
            }

            // Draw bars
            const barWidth = width / bars.length;
            const gap = 2;

            ctx.fillStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;

            for (let i = 0; i < bars.length; i++) {
                const barHeight = Math.max(2, bars[i] * height);
                const x = i * barWidth + gap / 2;
                const y = (height - barHeight) / 2;

                // Draw bar with rounded corners
                ctx.beginPath();
                ctx.roundRect(x, y, barWidth - gap, barHeight, 2);
                ctx.fill();
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [audioLevel, isActive, color]);

    return (
        <div className="w-full flex items-center justify-center">
            <canvas
                ref={canvasRef}
                width={300}
                height={60}
                className="rounded-lg"
                style={{ background: 'rgba(0, 0, 0, 0.3)' }}
            />
        </div>
    );
};

export default AudioVisualizer;
