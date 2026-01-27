<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1DFf8Hb-5Xl39PyP6xAWzUvkZF5b4ERJ5

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Debugging with agent-browser

Optional UI automation to validate flows and landing page UX.

```bash
npm install -g agent-browser
agent-browser install
agent-browser open http://localhost:5173
agent-browser snapshot -i
agent-browser click @e1
agent-browser fill @e2 "Example"
```

See `AGENTS.md` at the repo root for the quick workflow.
