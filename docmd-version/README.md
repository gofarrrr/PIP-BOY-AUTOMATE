# Automation Decision Frameworks - docmd Site

A standalone, portable documentation site for automation assessment frameworks using [docmd](https://github.com/mgks/docmd) and Mermaid diagrams.

## Quick Start

```bash
# Install docmd globally (one-time)
npm install -g @mgks/docmd

# Navigate to this folder
cd docmd-version

# Start development server
docmd dev

# Build for production
docmd build

# Launch live editor
docmd live
```

## Structure

```
docmd-version/
├── docs/                        # Markdown source files
│   ├── index.md                 # Homepage
│   ├── frameworks/              # Framework pages (TABS)
│   │   ├── index.md            # Frameworks overview
│   │   └── frequency-analysis/ # Current framework
│   ├── nodes/                   # Decision node deep-dives
│   │   ├── often.md
│   │   ├── enjoy.md
│   │   ├── augmenting.md
│   │   ├── complex.md
│   │   ├── steps.md
│   │   ├── success.md
│   │   ├── judgment.md
│   │   └── risk.md
│   └── outcomes/                # Final outcome pages
│       ├── automate.md
│       ├── augment.md
│       └── diy.md
├── docmd.config.js              # Site configuration
└── README.md                    # This file
```

## Adding a New Framework

1. **Create folder**: `docs/frameworks/your-framework-name/`
2. **Add main diagram**: Create `index.md` with your Mermaid diagram
3. **Add node pages**: Create pages for each decision point
4. **Update config**: Add to `docmd.config.js` navigation
5. **Build**: Run `docmd build`

### Example: Adding ARC Method

```javascript
// In docmd.config.js, add to navigation children:
{ title: 'ARC Method', path: './frameworks/arc/', icon: 'check-circle' },
```

Then create `docs/frameworks/arc/index.md` with your Mermaid diagram.

## Features

- **Mermaid diagrams** - Interactive flowcharts rendered from text
- **Dark mode** - Built-in theme support
- **Multi-tab architecture** - Ready for multiple frameworks
- **Portable** - Just copy this folder anywhere
- **No React** - Pure static HTML output

## Customization

Edit `docmd.config.js` to change:
- Site title
- Theme (default, sky, ruby, retro)
- Navigation structure
- Light/dark mode defaults

## Deployment

```bash
# Build static site
docmd build

# Output is in ./site folder
# Deploy to any static hosting (GitHub Pages, Netlify, Vercel)
```

---

*Generated from PIP-BOY automation assessment content.*
