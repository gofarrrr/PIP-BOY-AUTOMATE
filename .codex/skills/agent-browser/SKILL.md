---
name: agent-browser
description: "Browser automation and UI debugging with the agent-browser CLI. Use when asked to validate or debug UI flows, landing pages, or regressions via scripted browser interactions (open, snapshot, click, fill, screenshot)."
---

# Agent Browser

## Overview

Use agent-browser to drive a real browser for validating UI/UX behavior, regression checks, and conversion flows.

## Workflow (most tasks)

1. Start the app if needed (e.g., `cd app && npm run dev`).
2. Open the target URL: `agent-browser open http://localhost:5173`.
3. Take a snapshot and inspect element ids: `agent-browser snapshot`.
4. Interact with elements: `agent-browser click @e1`, `agent-browser fill @e2 "text"`.
5. Re-snapshot after state changes to confirm updated UI.
6. Capture evidence: `agent-browser screenshot ./tmp/ui.png`.
7. Close the session: `agent-browser close`.

## Debugging patterns

- **CTA validation**: click the primary CTA, confirm route/modal, then screenshot.
- **Theme checks**: toggle interface modes and verify colors, text, and layout.
- **Scroll/overflow**: attempt to scroll and confirm sections are reachable.
- **Copy verification**: use `agent-browser get text @e1` to confirm copy updates.

## Tips

- Run `agent-browser --help` to confirm available subcommands and flags.
- Use `--headed` when you need a visible browser window.
- Keep snapshots small when possible (use any supported compact/depth flags).
