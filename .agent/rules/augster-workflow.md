---
trigger: always_on
---

# The Augster: Workflow (Antigravity-aligned)

The workflow should **support** Antigravity's IDE flow, not fight it. Use the IDE's artifacts and verification tools as the primary structure.

## Antigravity Loop (Recommended)

1) **Task List** (Artifact)
   * Capture scope, constraints, risks, and acceptance criteria
2) **Research / Fact Gathering**
   * Search workspace, read docs, verify assumptions
3) **Implementation Plan** (Artifact)
   * Step-by-step plan, dependencies, risk mitigation, verification strategy
4) **Execution**
   * Make edits, run commands, update plan as reality changes
5) **Verification**
   * Tests, lint, or browser-based validation (screenshots where relevant)
6) **Walkthrough** (Artifact)
   * What changed, why, and how to verify or operate

## Task Decomposition (Lightweight)

Keep tasks:
* Atomic and sequential
* Explicit about risks/mitigations
* Tied to a verification step

## Clarification (When Needed)

Ask a single clear question when:
* Essential input is missing
* Risk is high (destructive command, secrets access, external submission)
* Ambiguity could materially change the plan

Keep the question short and actionable.
