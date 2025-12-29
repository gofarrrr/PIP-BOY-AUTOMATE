import { useState, useCallback, useRef, WheelEvent } from 'react';
import { FlowNode } from '../types';

export interface ViewBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

// Zoom levels with corresponding viewBox widths
const ZOOM_LEVELS = [1000, 700, 500, 350, 200]; // Level 0 = full, Level 4 = max zoom
const DEFAULT_VIEWBOX: ViewBox = { x: 0, y: 0, width: 1000, height: 1800 };
const ASPECT_RATIO = 1800 / 1000; // height/width ratio of the flowchart

interface UseZoomReturn {
    viewBox: ViewBox;
    zoomLevel: number;
    zoomIn: () => void;
    zoomOut: () => void;
    zoomToNode: (node: FlowNode) => void;
    resetZoom: () => void;
    handleWheel: (e: WheelEvent) => void;
    isAnimating: boolean;
}

export function useZoom(): UseZoomReturn {
    const [viewBox, setViewBox] = useState<ViewBox>(DEFAULT_VIEWBOX);
    const [zoomLevel, setZoomLevel] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRef = useRef<number | null>(null);

    // Animate viewBox transition
    const animateToViewBox = useCallback((targetViewBox: ViewBox, duration = 400) => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        const startViewBox = { ...viewBox };
        const startTime = performance.now();
        setIsAnimating(true);

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setViewBox({
                x: startViewBox.x + (targetViewBox.x - startViewBox.x) * easeOut,
                y: startViewBox.y + (targetViewBox.y - startViewBox.y) * easeOut,
                width: startViewBox.width + (targetViewBox.width - startViewBox.width) * easeOut,
                height: startViewBox.height + (targetViewBox.height - startViewBox.height) * easeOut,
            });

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                setIsAnimating(false);
                animationRef.current = null;
            }
        };

        animationRef.current = requestAnimationFrame(animate);
    }, [viewBox]);

    // Clamp viewBox to bounds
    const clampViewBox = useCallback((vb: ViewBox): ViewBox => {
        const maxX = Math.max(0, 1000 - vb.width);
        const maxY = Math.max(0, 1800 - vb.height);
        return {
            ...vb,
            x: Math.max(0, Math.min(vb.x, maxX)),
            y: Math.max(0, Math.min(vb.y, maxY)),
        };
    }, []);

    const zoomIn = useCallback(() => {
        const newLevel = Math.min(zoomLevel + 1, ZOOM_LEVELS.length - 1);
        if (newLevel !== zoomLevel) {
            setZoomLevel(newLevel);
            const newWidth = ZOOM_LEVELS[newLevel];
            const newHeight = newWidth * ASPECT_RATIO;

            // Zoom toward center of current view
            const centerX = viewBox.x + viewBox.width / 2;
            const centerY = viewBox.y + viewBox.height / 2;

            const targetViewBox = clampViewBox({
                x: centerX - newWidth / 2,
                y: centerY - newHeight / 2,
                width: newWidth,
                height: newHeight,
            });

            animateToViewBox(targetViewBox);
        }
    }, [zoomLevel, viewBox, animateToViewBox, clampViewBox]);

    const zoomOut = useCallback(() => {
        const newLevel = Math.max(zoomLevel - 1, 0);
        if (newLevel !== zoomLevel) {
            setZoomLevel(newLevel);
            const newWidth = ZOOM_LEVELS[newLevel];
            const newHeight = newWidth * ASPECT_RATIO;

            // Zoom out from center of current view
            const centerX = viewBox.x + viewBox.width / 2;
            const centerY = viewBox.y + viewBox.height / 2;

            const targetViewBox = clampViewBox({
                x: centerX - newWidth / 2,
                y: centerY - newHeight / 2,
                width: newWidth,
                height: newHeight,
            });

            animateToViewBox(targetViewBox);
        }
    }, [zoomLevel, viewBox, animateToViewBox, clampViewBox]);

    const resetZoom = useCallback(() => {
        setZoomLevel(0);
        animateToViewBox(DEFAULT_VIEWBOX);
    }, [animateToViewBox]);

    const zoomToNode = useCallback((node: FlowNode) => {
        // Convert node position (0-100 scale) to SVG coordinates (0-1000 scale)
        const nodeX = node.x * 10;
        const nodeY = node.y * 10;

        // Use zoom level 3 (width 350) for a good readable size
        const targetLevel = 3;
        const newWidth = ZOOM_LEVELS[targetLevel];
        const newHeight = newWidth * ASPECT_RATIO;

        setZoomLevel(targetLevel);

        const targetViewBox = clampViewBox({
            x: nodeX - newWidth / 2,
            y: nodeY - newHeight / 2,
            width: newWidth,
            height: newHeight,
        });

        animateToViewBox(targetViewBox, 500); // Slightly slower for dramatic effect
    }, [animateToViewBox, clampViewBox]);

    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();

        // Determine zoom direction
        if (e.deltaY < 0) {
            zoomIn();
        } else if (e.deltaY > 0) {
            zoomOut();
        }
    }, [zoomIn, zoomOut]);

    return {
        viewBox,
        zoomLevel,
        zoomIn,
        zoomOut,
        zoomToNode,
        resetZoom,
        handleWheel,
        isAnimating,
    };
}
