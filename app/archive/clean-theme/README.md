# Archived Theme Files

This folder contains the **Clean** and **Editorial** theme files that were archived during the theme consolidation refactor (January 2026).

## Contents

### Components
- `Flowchart.tsx` - Original dual-theme flowchart (pipboy/clean)
- `GraphNode.tsx` - Original dual-theme node renderer
- `GraphEdge.tsx` - Original dual-theme edge renderer
- `InfoTerminal.tsx` - Original dual-theme info panel
- `LandingPage.tsx` - Original dual-theme landing page
- `FlowchartEditorial.tsx` - Editorial theme flowchart
- `GraphNodeEditorial.tsx` - Editorial theme nodes
- `GraphEdgeEditorial.tsx` - Editorial theme edges
- `LandingPageEditorial.tsx` - Editorial landing page

### Themes CSS
- `clean.css` - Clean theme styles
- `dark.css` - Dark/Pip-Boy variant styles
- `editorial.css` - Editorial theme styles
- `vintage.css` - Vintage theme styles

### App Variants
- `App.tsx` - Original full-featured App with mode switching
- `AppEditorial.tsx` - Editorial theme App variant

## Restoration

To restore any of these files:
1. Copy the desired file back to `/components/` or `/themes/`
2. Update imports in the main entry point
3. Re-add any required dependencies in `ThemeContext.tsx`
