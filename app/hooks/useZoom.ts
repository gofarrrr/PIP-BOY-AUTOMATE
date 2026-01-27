import React, { useState, useCallback, useRef, WheelEvent, useEffect } from 'react';
import { FlowNode } from '../types';

export interface ViewBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

// Base zoom levels (as width relative to standard 100-unit grid width)
// e.g., 100 means showing the full width (100 units * scale)
const BASE_ZOOM_LEVELS = [100, 70, 50, 35, 20];
const GRID_HEIGHT = 200; // The grid is roughly 200 units tall
const ASPECT_RATIO = GRID_HEIGHT / 100; // 2.0

interface UseZoomReturn {
    viewBox: ViewBox;
    zoomLevel: number;
    zoomIn: () => void;
    zoomOut: () => void;
    zoomToNode: (node: FlowNode) => void;
    zoomToArea: (target: ViewBox, duration?: number) => void;
    resetZoom: () => void;
    handleWheel: (e: WheelEvent) => void;
    handleMouseDown: (e: React.MouseEvent) => void;
    handleMouseMove: (e: React.MouseEvent) => void;
    handleMouseUp: () => void;
    handleMouseLeave: () => void;
    isAnimating: boolean;
    isPanning: boolean;
}

export function useZoom(isCleanTheme: boolean = false): UseZoomReturn {
    // Grid scaling - must match GraphNode/GraphEdge logic
    // For Optimistic theme (isCleanTheme), we increase from 14 to 22
    // to accommodate wider dynamic node sizing.
    const scale = isCleanTheme ? 22 : 10;
    const prevScaleRef = useRef(scale);

    // Calculate derived constants based on current scale
    const fullWidth = 100 * scale;
    const fullHeight = GRID_HEIGHT * scale;
    const zoomLevels = BASE_ZOOM_LEVELS.map(level => level * scale);
    const defaultViewBox = { x: 0, y: -5 * (scale / 10), width: fullWidth, height: fullHeight };

    const [viewBox, setViewBox] = useState<ViewBox>(defaultViewBox);
    const [zoomLevel, setZoomLevel] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPanning, setIsPanning] = useState(false);
    const animationRef = useRef<number | null>(null);
    const panStartRef = useRef<{ x: number; y: number; viewBoxX: number; viewBoxY: number } | null>(null);

    // Handle scale change (recalculate viewBox to maintain relative position)
    useEffect(() => {
        if (prevScaleRef.current !== scale) {
            const ratio = scale / prevScaleRef.current;
            setViewBox(prev => ({
                x: prev.x * ratio,
                y: prev.y * ratio,
                width: prev.width * ratio,
                height: prev.height * ratio
            }));
            prevScaleRef.current = scale;
        }
    }, [scale]);

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
        const maxX = Math.max(0, fullWidth - vb.width);
        // Allow slightly more scroll breathing room
        const maxY = Math.max(-50 * (scale / 10), (fullHeight + 50 * (scale / 10)) - vb.height);
        return {
            ...vb,
            x: Math.max(0, Math.min(vb.x, maxX)),
            y: Math.max(-50 * (scale / 10), Math.min(vb.y, maxY)),
        };
    }, [fullWidth, fullHeight, scale]);

    const zoomIn = useCallback(() => {
        const newLevel = Math.min(zoomLevel + 1, zoomLevels.length - 1);
        if (newLevel !== zoomLevel) {
            setZoomLevel(newLevel);
            const newWidth = zoomLevels[newLevel];
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
    }, [zoomLevel, viewBox, animateToViewBox, clampViewBox, zoomLevels]);

    const zoomOut = useCallback(() => {
        const newLevel = Math.max(zoomLevel - 1, 0);
        if (newLevel !== zoomLevel) {
            setZoomLevel(newLevel);
            const newWidth = zoomLevels[newLevel];
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
    }, [zoomLevel, viewBox, animateToViewBox, clampViewBox, zoomLevels]);

    const resetZoom = useCallback(() => {
        setZoomLevel(0);
        animateToViewBox(defaultViewBox);
    }, [animateToViewBox, defaultViewBox]);

    const zoomToNode = useCallback((node: FlowNode) => {
        // Convert node position (0-100 scale) to SVG coordinates based on current scale
        const nodeX = node.x * scale;
        const nodeY = node.y * scale;

        // Use zoom level 3 for a good readable size
        const targetLevel = 3;
        const newWidth = zoomLevels[targetLevel];
        const newHeight = newWidth * ASPECT_RATIO;

        setZoomLevel(targetLevel);

        const targetViewBox = clampViewBox({
            x: nodeX - newWidth / 2,
            y: nodeY - newHeight / 2,
            width: newWidth,
            height: newHeight,
        });

        animateToViewBox(targetViewBox, 500);
    }, [animateToViewBox, clampViewBox, scale, zoomLevels]);

    const zoomToArea = useCallback((target: ViewBox, duration = 500) => {
        const targetViewBox = clampViewBox({
            x: target.x * scale,
            y: target.y * scale,
            width: target.width * scale,
            height: target.height * scale,
        });

        // Calculate appropriate zoom level based on width
        const targetWidth = target.width * scale;
        const closestLevel = zoomLevels.reduce((prev, curr, idx) => {
            return Math.abs(curr - targetWidth) < Math.abs(zoomLevels[prev] - targetWidth) ? idx : prev;
        }, 0);

        setZoomLevel(closestLevel);
        animateToViewBox(targetViewBox, duration);
    }, [animateToViewBox, clampViewBox, scale, zoomLevels]);

    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();

        // Determine zoom direction
        if (e.deltaY < 0) {
            zoomIn();
        } else if (e.deltaY > 0) {
            zoomOut();
        }
    }, [zoomIn, zoomOut]);

    // Pan/drag handlers
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        // Don't pan if clicking on interactive elements (nodes, edges, text)
        const target = e.target as SVGElement;
        const tagName = target.tagName?.toLowerCase();

        // Skip panning for interactive node/edge elements
        const interactiveTags = ['text', 'tspan', 'rect', 'path', 'polygon', 'circle', 'ellipse'];
        if (interactiveTags.includes(tagName)) {
            return;
        }

        e.preventDefault();
        setIsPanning(true);
        panStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            viewBoxX: viewBox.x,
            viewBoxY: viewBox.y,
        };
    }, [viewBox.x, viewBox.y]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isPanning || !panStartRef.current) return;

        e.preventDefault();

        // Calculate the movement in screen pixels
        const dx = e.clientX - panStartRef.current.x;
        const dy = e.clientY - panStartRef.current.y;

        // Get the SVG element dimensions to calculate scale
        const svg = e.currentTarget as SVGSVGElement;
        const rect = svg.getBoundingClientRect();

        // Scale mouse movement to viewBox coordinates
        const scaleX = viewBox.width / rect.width;
        const scaleY = viewBox.height / rect.height;

        const newViewBox = clampViewBox({
            x: panStartRef.current.viewBoxX - dx * scaleX,
            y: panStartRef.current.viewBoxY - dy * scaleY,
            width: viewBox.width,
            height: viewBox.height,
        });

        setViewBox(newViewBox);
    }, [isPanning, viewBox.width, viewBox.height, clampViewBox]);

    const handleMouseUp = useCallback(() => {
        setIsPanning(false);
        panStartRef.current = null;
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsPanning(false);
        panStartRef.current = null;
    }, []);

    return {
        viewBox,
        zoomLevel,
        zoomIn,
        zoomOut,
        zoomToNode,
        zoomToArea,
        resetZoom,
        handleWheel,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseLeave,
        isAnimating,
        isPanning,
    };
}
