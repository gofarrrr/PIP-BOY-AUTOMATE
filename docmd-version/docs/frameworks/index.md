# Frameworks Overview

> Choose a framework to assess your task for automation potential.

## Available Frameworks

:::cards
::card{icon="clock" title="Frequency Analysis" link="./frequency-analysis/"}
The classic decision tree. Start with "Do I do this often?" and follow the path to your answer. **Currently active.**
::
::card{icon="check-circle" title="ARC Method" link="#arc-method"}
🚧 **Coming Soon** — Enterprise-grade Automation Readiness Check across 5 dimensions.
::
::card{icon="list-ordered" title="Vandra 6-Step" link="#vandra"}
🚧 **Coming Soon** — Data-driven framework from 100+ discovery interviews.
::
::card{icon="layers" title="Ripla Spectrum" link="#ripla"}
🚧 **Coming Soon** — Augmentation levels from Information to Hybrid.
::
:::

---

## Framework Comparison

| Framework | Best For | Complexity | Time Required |
|-----------|----------|------------|---------------|
| **Frequency Analysis** | Individual tasks | Low | 5 minutes |
| **ARC Method** | Enterprise initiatives | High | 1-2 weeks |
| **Vandra 6-Step** | Process discovery | Medium | 1-2 hours |
| **Ripla Spectrum** | Choosing augmentation level | Low | 10 minutes |

---

## How to Add a New Framework

This site is designed for easy expansion. To add a new framework:

1. Create a new folder: `docs/frameworks/your-framework/`
2. Add an `index.md` with the main Mermaid diagram
3. Add node pages for each decision point
4. Update `docmd.config.js` navigation
5. Run `docmd build` to generate the site

Each framework follows the same pattern:
- Main diagram page with overview
- Individual node pages with deep explanations
- Links to outcomes (AUTOMATE, AUGMENT, DIY)

---

<a id="arc-method"></a>
## ARC Method (Coming Soon)

**Automation Readiness Check** - A structured assessment framework evaluating automation readiness across 5 dimensions:

1. **Management** — Strategy, vision, change readiness
2. **People** — Skills, training, organizational culture  
3. **Processes** — Stability, rule-based nature, standardization
4. **IT Infrastructure** — Data readiness, system connectivity
5. **Finance** — ROI potential, cost-benefit analysis

*Each evaluated on 0-5 scale using interviews + observation + data analysis.*

---

<a id="vandra"></a>
## Vandra 6-Step (Coming Soon)

From 100+ discovery interviews:

1. **Frequency + Time Wasters** — What consumes disproportionate time?
2. **KPI Visibility** — Do you have clear metrics?
3. **Data Availability** — Can you access the data needed?
4. **Rule-Based Nature** — Are decisions repeatable?
5. **Complexity Assessment** — How complex is the task?
6. **Risk Profile** — What's the cost of error?

---

<a id="ripla"></a>
## Ripla Spectrum (Coming Soon)

Augmentation levels for when full automation isn't feasible:

- **Information Augmentation** — Filtering, aggregation, visibility
- **Analysis Augmentation** — Pattern detection, anomalies
- **Recommendation Systems** — Suggesting actions (human decides)
- **Hybrid Approaches** — Mix automation + human oversight

---

[← Back to Home](../)
