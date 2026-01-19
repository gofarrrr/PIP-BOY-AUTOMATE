# PIP-BOY Knowledge Distribution Flowchart - Complete Copy

This document contains all the text content (copy) that is presented to users when interacting with the Knowledge Distribution decision flowchart.

---

## DECISION NODES

### Is knowledge trapped?
**Node ID:** `trapped`

> **ANALYSIS**  
> BOTTLENECK DETECTION: Your best employee is also your biggest risk. Everything that makes them great is trapped in their head. When they leave, that knowledge dies with them. This is knowledge concentration—the primary disease that mitigates an organization's ability to scale.

> **EVALUATION**  
> Identify bottlenecks: (1) Is there one person everyone goes to for a specific skill or answer? (2) Do projects stall when someone is on vacation? (3) Are new hires dependent on shadowing one 'expert' for months? If yes, knowledge is trapped.

> **EXECUTION**  
> Start here. If knowledge flows freely, you're fine. If it's concentrated, you have work to do.

---

### Tribal knowledge or AI gap?
**Node ID:** `symptom`

> **ANALYSIS**  
> SYMPTOM ANALYSIS: Two diseases manifest from knowledge concentration. Tribal knowledge is the traditional problem—a 22-year veteran who estimates projects in 20 minutes with near-perfect accuracy while others take 3 hours at 50% accuracy. The AI gap is new—some employees are AI-forward and 3x more effective, while others work traditionally.

> **EVALUATION**  
> Which describes your bottleneck? (1) TRIBAL: Expert has domain knowledge others lack—processes, shortcuts, relationships, intuition. (2) AI GAP: Expert uses AI tools effectively while peers don't. Both need extraction, but the methods differ slightly.

> **EXECUTION**  
> Diagnose the symptom to choose the right extraction approach.

---

### Training recordings exist?
**Node ID:** `recordings`

> **ANALYSIS**  
> ASSET AUDIT: Your organization likely has more extraction material than you realize. Meeting recordings, training videos, Loom walkthroughs—these contain expert knowledge already captured. A transcript from a 1-hour training can become an SOP in minutes with AI.

> **EVALUATION**  
> Check for: (1) Recorded onboarding sessions? (2) Loom or video walkthroughs? (3) Recorded client calls showing expert handling? If you've got recordings, you've got shortcuts.

> **EXECUTION**  
> Transcripts + AI = instant SOPs. Don't recreate what's already captured.

---

### Expert available for interview?
**Node ID:** `expert_available`

> **ANALYSIS**  
> ACCESS CHECK: The Reverse AI Interview is the most powerful extraction method—but it requires the expert's time. If they're unavailable, unwilling, or already departed, you need alternative extraction methods.

> **EVALUATION**  
> Can you get 1-2 hours of the expert's focused time? Are they willing to be 'interviewed' by an AI? If yes, proceed to reverse interview. If no, fall back to documentation audit.

> **EXECUTION**  
> Expert access is ideal. No access? Mine their digital footprint instead.

---

### SOP complete and accurate?
**Node ID:** `sop_complete`

> **ANALYSIS**  
> QUALITY GATE: An SOP that's 75% complete is useless for AI. Edge cases, nuances, and subtle judgment calls are where experts shine—and where incomplete SOPs fail. The AI needs the full recipe, not just the ingredients.

> **EVALUATION**  
> Test your SOP: (1) Could a new hire follow it without questions? (2) Does it cover edge cases the expert handles intuitively? (3) Did the expert validate it? If gaps exist, fill them before packaging.

> **EXECUTION**  
> Garbage in, garbage out. Invest in SOP quality now.

---

### Team AI maturity level?
**Node ID:** `maturity`

> **ANALYSIS**  
> DISTRIBUTION CALIBRATION: Not all teams are ready for autonomous AI agents. Start where your team is, not where you wish they were. Prompt libraries require manual work but teach AI fluency. Projects/Gems are semi-automated. Skills are fully autonomous.

> **EVALUATION**  
> Assess honestly: (1) LOW: Most team members rarely use AI, need hand-holding. (2) MEDIUM: Team uses ChatGPT/Claude but not systematically. (3) HIGH: Team is AI-native, comfortable with autonomous tools.

> **EXECUTION**  
> Match distribution method to team readiness. Level up over time.

---

## OUTCOME NODES

### EXTRACT: USE TRANSCRIPTS
**Node ID:** `use_transcripts`

> **ANALYSIS**  
> TRANSCRIPT EXTRACTION: You have recordings—use them. Pass transcripts to an AI with this prompt: 'Here's a training recording transcript. Create a detailed SOP that a new employee could follow step-by-step, including edge cases and decision points mentioned.'

> **EVALUATION**  
> Pro tip: Combine transcript + interview. Give AI the transcript first: 'Here's a training. Interview me to fill gaps—ask about nuances, edge cases, and anything unclear.' This yields the highest quality SOPs.

> **EXECUTION**  
> Transcripts are starting points. Layer in interviews for completeness.

---

### EXTRACT: REVERSE INTERVIEW
**Node ID:** `reverse_interview`

> **ANALYSIS**  
> REVERSE AI INTERVIEW: The AI acts as a new employee interviewing the expert. Key prompt: 'Act as a new employee. Interview me to understand how I do [X]. Ask one question at a time—each answer informs your next question. At the end, create a detailed SOP.'

> **EVALUATION**  
> Critical success factors: (1) One question at a time—prevents expert from forgetting details. (2) AI probes for edge cases. (3) AI asks 'why' not just 'what'. (4) Final output is a complete SOP.

> **EXECUTION**  
> The best extraction method when experts are available. 30-60 minutes yields gold.

---

### EXTRACT: DOC AUDIT
**Node ID:** `doc_audit`

> **ANALYSIS**  
> DOCUMENTATION AUDIT: Expert unavailable? Mine their digital footprint. Slack messages, email threads, Notion pages, Google Drive docs, Confluence wikis—consolidate everything related to their expertise. Pass to AI for synthesis.

> **EVALUATION**  
> Sources to audit: (1) Slack/Teams threads where expert answered questions. (2) Email chains showing their process. (3) Scattered documentation they created. (4) Comments on tickets/PRs. Consolidate → Synthesize → Validate with whoever's available.

> **EXECUTION**  
> Less ideal than interviews, but extracts 60-80% of captured knowledge.

---

### DISTRIBUTE: PROMPT LIBRARY
**Node ID:** `prompt_library`

> **ANALYSIS**  
> LEVEL 1 - PROMPT LIBRARY: A shared folder (Google Drive, Notion, etc.) with proven prompts. Each prompt includes: (1) The prompt itself. (2) A use case study showing benefit. (3) A templated version others can customize. Highest user involvement, but easiest to start.

> **EVALUATION**  
> Setup: Create shared folder → Add prompts as templates → Require submissions include 'why it works' → Review and curate monthly. This trains AI fluency while distributing knowledge.

> **EXECUTION**  
> Start here if team is new to AI. Graduate to Projects/Gems as fluency grows.

---

### DISTRIBUTE: PROJECTS/GEMS
**Node ID:** `projects_gems`

> **ANALYSIS**  
> LEVEL 2 - PROJECTS & GEMS: ChatGPT Projects, Claude Projects, Gemini Gems—preconfigured AI assistants for specific tasks. Paste your system prompt (from the SOP) + upload reference files. Users interact naturally, AI applies expert knowledge automatically.

> **EVALUATION**  
> Setup: (1) Create Project/Gem per use case. (2) Paste system prompt with What/Why/How. (3) Upload reference files (templates, examples). (4) Test with real inputs. (5) Share with team. Medium user involvement—they use it, but it guides them.

> **EXECUTION**  
> The sweet spot for most teams. Expert knowledge embedded in reusable AI tools.

---

### DISTRIBUTE: CLAUDE SKILLS
**Node ID:** `skills`

> **ANALYSIS**  
> LEVEL 3 - CLAUDE SKILLS: Autonomous AI that activates based on context. Unlike Projects (you go to them), Skills come to you—triggered automatically in any conversation. Folders of prompts and tools AI calls autonomously.

> **EVALUATION**  
> When to use: (1) Highly repeatable tasks with clear triggers. (2) Team is AI-native and comfortable with autonomy. (3) Task requires specific formatting/branding every time. Coming soon to ChatGPT and Gemini—the future of knowledge distribution.

> **EXECUTION**  
> Most automated, least user involvement. Reserve for well-defined, high-frequency tasks.

---

### NO BOTTLENECK
**Node ID:** `no_bottleneck`

> **ANALYSIS**  
> CLEAR STATUS: Knowledge flows freely in your organization. Skills and expertise aren't concentrated in single individuals. New hires ramp up quickly. Vacations don't create emergencies. This is the goal state.

> **EVALUATION**  
> Maintain this state: (1) Document as you go—don't let new knowledge concentrate. (2) Regular knowledge audits. (3) Cross-training as standard practice. (4) AI-assisted documentation habits.

> **EXECUTION**  
> Congratulations—but stay vigilant. Knowledge concentration creeps back.

---

## EDGE CONNECTIONS

### Trapped → Yes → Symptom
**Edge ID:** `k1`

> BOTTLENECK CONFIRMED. Knowledge is concentrated in one or few individuals. Time to diagnose the type of concentration.

---

### Trapped → No → No Bottleneck
**Edge ID:** `k2`

> NO CONCENTRATION DETECTED. Knowledge flows freely. You're in a healthy state.

---

### Symptom → Tribal → Recordings
**Edge ID:** `k3`

> TRIBAL KNOWLEDGE DETECTED. Expert has domain knowledge others lack. First check: do training recordings already exist?

---

### Symptom → AI Gap → Expert Available
**Edge ID:** `k4`

> AI GAP DETECTED. Expert uses AI tools effectively while others don't. Need to extract their AI workflows and prompts.

---

### Recordings → Yes → Use Transcripts
**Edge ID:** `k5`

> RECORDINGS FOUND. You have material to work with. Transcribe and synthesize into SOPs.

---

### Recordings → No → Expert Available
**Edge ID:** `k6`

> NO RECORDINGS. Need to extract knowledge directly from the expert.

---

### Expert Available → Yes → Reverse Interview
**Edge ID:** `k7`

> EXPERT AVAILABLE. The gold standard for knowledge extraction. Book 1-2 hours for a reverse AI interview.

---

### Expert Available → No → Doc Audit
**Edge ID:** `k8`

> EXPERT UNAVAILABLE. Fall back to mining their digital footprint—Slack, email, docs.

---

### Use Transcripts → SOP Complete
**Edge ID:** `k9`

> TRANSCRIPTS PROCESSED. SOP generated from recordings. Now validate quality.

---

### Reverse Interview → SOP Complete
**Edge ID:** `k10`

> INTERVIEW COMPLETE. SOP generated from expert interview. Now validate quality.

---

### Doc Audit → SOP Complete
**Edge ID:** `k11`

> AUDIT COMPLETE. SOP synthesized from documentation. Now validate quality.

---

### SOP Complete → No → (Loop)
**Edge ID:** `k12`

> SOP INCOMPLETE. Gaps exist that will cause AI failures. Go back and fill them.

---

### SOP Complete → Yes → Maturity
**Edge ID:** `k13`

> SOP VALIDATED. Ready to package into system prompt and distribute.

---

### Maturity → Low → Prompt Library
**Edge ID:** `k14`

> LOW AI MATURITY. Team needs hands-on learning. Prompt libraries teach AI fluency while distributing knowledge.

---

### Maturity → Medium → Projects/Gems
**Edge ID:** `k15`

> MEDIUM AI MATURITY. Team uses AI but not systematically. Pre-configured Projects/Gems embed expertise in reusable tools.

---

### Maturity → High → Skills
**Edge ID:** `k16`

> HIGH AI MATURITY. Team is AI-native. Deploy autonomous Skills that activate contextually.

---

## UI ELEMENTS

### Terminal Waiting State
```
> WAITING FOR INPUT...
> SELECT NODE OR PATH
```

### Terminal Header Format
```
V.A.T.S.: [Node Label or "LINK: FROM -> TO"]
```

### Section Headers (in terminal)
- `>> ANALYSIS`
- `>> EVALUATION`
- `>> EXECUTION`

### Terminal Footer
```
MEM: 64KB OK                    ROBCO INDUSTRIES (TM)
```
