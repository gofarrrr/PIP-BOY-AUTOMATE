import React from 'react';

interface ZoomControlsProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onReset: () => void;
    zoomLevel: number;
    maxLevel: number;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
    onZoomIn,
    onZoomOut,
    onReset,
    zoomLevel,
    maxLevel,
}) => {
    const buttonBase = `
    w-10 h-10 
    flex items-center justify-center 
    text-2xl font-bold font-vt323
    border-2 border-[#33ff00] 
    bg-black/80 
    text-[#33ff00] 
    hover:bg-[#33ff00]/20 
    hover:shadow-[0_0_10px_rgba(51,255,0,0.5)]
    active:bg-[#33ff00]/40
    transition-all duration-150
    disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black/80 disabled:hover:shadow-none
  `;

    return (
        <div className="absolute bottom-6 left-6 z-40 flex flex-col gap-1">
            {/* Zoom In Button */}
            <button
                onClick={onZoomIn}
                disabled={zoomLevel >= maxLevel}
                className={buttonBase}
                title="Zoom In (+)"
                aria-label="Zoom In"
            >
                +
            </button>

            {/* Zoom Level Indicator */}
            <div className="w-10 h-6 flex items-center justify-center text-xs font-vt323 text-[#33ff00]/70 border-x-2 border-[#33ff00]/30 bg-black/60">
                {zoomLevel + 1}x
            </div>

            {/* Zoom Out Button */}
            <button
                onClick={onZoomOut}
                disabled={zoomLevel <= 0}
                className={buttonBase}
                title="Zoom Out (-)"
                aria-label="Zoom Out"
            >
                −
            </button>

            {/* Reset Button */}
            <button
                onClick={onReset}
                disabled={zoomLevel === 0}
                className={`${buttonBase} mt-2 text-lg`}
                title="Reset Zoom (0)"
                aria-label="Reset Zoom"
            >
                ⟲
            </button>
        </div>
    );
};

export default ZoomControls;
