# Editorial Theme - AI or Not.BS

This directory contains a complete editorial theme implementation for the AI or Not.BS decision flow app, designed based on the sophisticated aesthetic from your reference image.

## Files Created

### Theme
- `themes/editorial.css` - Complete CSS theme with colors, typography, and component styles

### Components
- `components/LandingPageEditorial.tsx` - Landing page with editorial design
- `components/FlowchartEditorial.tsx` - Flowchart container with editorial styling
- `components/GraphNodeEditorial.tsx` - Decision/outcome nodes with editorial aesthetic
- `components/GraphEdgeEditorial.tsx` - Connection edges with editorial styling
- `AppEditorial.tsx` - Complete app instance using editorial theme

### Design Reference
- `pencil-new.pen` - Original Pencil design file with all visual specifications

## Design System

### Colors
```css
--bg-primary: #1A1916       /* Dark charcoal background */
--bg-secondary: #242220     /* Slightly lighter dark */
--bg-tertiary: #0F0E0D      /* Darkest (footer) */
--bg-card: #F5F2ED          /* Cream/beige cards */
--bg-accent: #C87941        /* Terracotta accent */
--bg-accent-dark: #B5683A   /* Darker terracotta */
```

### Typography
- **Display/Headings**: Playfair Display (italic serif)
- **Body/UI**: Inter (sans-serif)
- **Sizes**: 12px - 96px scale

### Visual Elements
- Corner brackets on feature cards and sections
- Diamond section dividers
- Dotted line separators
- Geometric illustrations (circles, triangles, Venn diagrams)

## How to Use

### Option 1: Replace Main App (Complete Switch)

Update `index.html` or your main entry point:

```tsx
// Change from:
import App from './App'

// To:
import App from './AppEditorial'
```

### Option 2: Add as Alternative Landing Page

In your main `App.tsx`, add a theme switcher:

```tsx
import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LandingPageEditorial from './components/LandingPageEditorial';

function App() {
  const [useEditorial, setUseEditorial] = useState(false);

  return useEditorial
    ? <LandingPageEditorial onStart={handleStart} />
    : <LandingPage onStart={handleStart} />;
}
```

### Option 3: Use Editorial Components in Existing App

Replace individual components while keeping your existing app structure:

```tsx
// In your flowchart view:
import FlowchartEditorial from './components/FlowchartEditorial';

// Use it instead of regular Flowchart:
<FlowchartEditorial
  nodes={nodes}
  edges={edges}
  onSelect={setSelectedItem}
  selectedItem={selectedItem}
/>
```

## Component Props

### LandingPageEditorial
```tsx
interface LandingPageEditorialProps {
  onStart: (mode: ChartMode) => void;
}
```

### FlowchartEditorial
```tsx
interface FlowchartEditorialProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  onSelect: (item: SelectedItem) => void;
  selectedItem: SelectedItem | null;
  visitedNodes?: string[];
  visitedEdges?: string[];
  currentNodeId?: string | null;
  // ... (same as original Flowchart)
}
```

## Features

### Landing Page Sections
1. **Header** - Logo and navigation
2. **Performance Timeline** - Year/month timeline with metrics
3. **Hero** - Large serif headline with CTAs
4. **Features** - Three cards with geometric illustrations
5. **Decision Flow** - Flowchart preview
6. **Enterprise** - Large typography section
7. **Footer** - Links and copyright

### Flowchart Features
- Editorial color scheme (cream, terracotta, dark)
- Playfair Display for node labels
- Rectangular nodes (no diamonds)
- Clean, professional styling
- Same interactive features as original

## Customization

### Changing Colors

Edit `themes/editorial.css`:

```css
.theme-editorial {
  --bg-accent: #YOUR_COLOR;
  /* ... */
}
```

### Changing Typography

Update font families in `editorial.css`:

```css
.theme-editorial {
  --font-display: 'YourSerifFont', serif;
  --font-body: 'YourSansFont', sans-serif;
}
```

Don't forget to import the fonts in your HTML or CSS!

### Adding Fonts

Add to your `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Comparison with Original Theme

| Feature | Original (Pip-Boy) | Editorial |
|---------|-------------------|-----------|
| Background | Dark green-tinted | Dark charcoal |
| Accent | Neon green/yellow | Terracotta/cream |
| Typography | VT323 monospace | Playfair Display serif |
| Node Shape | Diamonds & Rectangles | All rectangles |
| Aesthetic | Retro terminal | Modern sophisticated |
| Use Case | Playful/nostalgic | Professional/agency |

## Browser Support

Same as main app - modern browsers with CSS custom properties support.

## Original Design

The Pencil design file (`pencil-new.pen`) contains the full visual specification and can be opened in Pencil to view exact spacing, colors, and layout details.

---

**Note**: This theme is completely separate from your original implementation. Your existing Pip-Boy theme and clean theme remain unchanged and can still be used.
