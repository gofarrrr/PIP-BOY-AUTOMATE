# Agent Instructions

## Browser Automation (agent-browser)

Use `agent-browser` for end-to-end UI debugging and flow validation.

Install:
1. `npm install -g agent-browser`
2. `agent-browser install`

Core workflow:
1. `agent-browser open http://localhost:5173`
2. `agent-browser snapshot -i`
3. `agent-browser click @e1` / `agent-browser fill @e2 "text"`
4. Re-run `agent-browser snapshot -i` after page changes

Common helpers:
- `agent-browser get text @e1`
- `agent-browser screenshot page.png`
- `agent-browser close`
 - `agent-browser open http://localhost:5173 --headed`
