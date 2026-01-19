# Archived Components

This directory contains archived components from the PIP-BOY application. These tabs (READINESS and MISTAKES) were removed from the main UI to simplify the user experience and focus on the core diagnostics.

## Archived Date
January 2026

## Contents

### Constants
- `constants-readiness.ts` - Node and edge definitions for READINESS diagnostic
- `constants-mistakes.ts` - Node and edge definitions for MISTAKES audit

### Components
- `ReadinessReport.tsx` - Report display for organizational archetype results
- `MistakesAuditReport.tsx` - Report display for mistake audit results
- `MistakesAuditPanel.tsx` - Interactive panel for mistake audit questionnaire

### Hooks
- `useReadinessDiagnostic.ts` - State management for READINESS diagnostic flow
- `useMistakesAudit.ts` - State management for MISTAKES audit flow

## Potential Future Use
These components contain valuable concepts that could be reintegrated:
- **"Pilot Purgatory"** diagnostic terminology (READINESS)
- **"Demo ≠ Production" 10x gap** calibration (MISTAKES)
- Agent maturity archetypes identification logic

The core insights from these tabs are already expressed in the STRATEGY and KNOWLEDGE tabs.
