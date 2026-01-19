# PIP-BOY AI Readiness Flowchart - Complete Copy

This document contains all the text content (copy) that is presented to users when interacting with the AI readiness assessment flowchart.

---

## DECISION NODES

### Assessing AI Readiness
**Node ID:** `assess`

> **ANALYSIS**  
> READINESS ASSESSMENT: Before chasing AI pilots and agent deployments, you need to know where your organization actually stands. Based on interviews with over 1,000 executives, the average readiness score is 52.1 out of 100—firmly in the 'Pilot' category. 58% of organizations are stuck at the low end of that range. This diagnostic will identify your archetype and prescribe your next steps.

> **EVALUATION**  
> This assessment diagnoses: (1) Your organizational archetype—which of 5 common patterns you fit. (2) Your key blockers—data, governance, culture, or execution. (3) Your recommended next steps. Answer based on current reality, not aspirations.

> **EXECUTION**  
> Begin the diagnostic. Honesty leads to accurate prescriptions.

---

### Executive AI Mandate?
**Node ID:** `exec_mandate`

> **ANALYSIS**  
> TOP-DOWN CHECK: Executive commitment is one of the top enablers we see across successful AI adoptions. Without it, AI becomes a side project rather than a strategic priority. But 'mandate' means more than verbal encouragement—it requires budget, time allocation, and realistic expectations.

> **EVALUATION**  
> Signs of REAL mandate: (1) Dedicated budget for AI initiatives. (2) Time explicitly allocated—not just 'do AI on the side.' (3) AI discussed at board level. (4) Leadership understands demo ≠ production. If it's just executive enthusiasm without resources attached, that's not a mandate.

> **EXECUTION**  
> First fork: Do you have top-down commitment with real resources?

---

### Grassroots Activity?
**Node ID:** `grassroots`

> **ANALYSIS**  
> BOTTOM-UP CHECK: Even without executive mandate, some organizations have pockets of AI experimentation. Employees using ChatGPT, teams building custom GPTs, individuals automating their workflows. This grassroots energy is valuable—but without coordination, it creates shadow AI and inconsistent quality.

> **EVALUATION**  
> Signs of grassroots activity: (1) Employees using AI tools on own initiative. (2) Teams have built demos or proofs of concept. (3) Informal knowledge sharing about prompts and tools. (4) Some 'AI champions' have emerged naturally. If none of this is happening, you're truly at the starting line.

> **EXECUTION**  
> No exec mandate: Is there at least bottom-up experimentation?

---

### Central AI Governance?
**Node ID:** `governance`

> **ANALYSIS**  
> GOVERNANCE CHECK: Organizations with established AI governance frameworks are 6.6% more agent-ready on average. This isn't just about rules—it's about creating safe space for experimentation. Central governance means someone OWNS AI, there's written policy, and people know what's permitted.

> **EVALUATION**  
> Signs of real governance: (1) Dedicated AI team or council—not '10% of someone's time.' (2) Written AI policy document. (3) Central repository of approved tools. (4) Someone can answer 'who owns AI?' without saying 'the CEO.' If governance is foggy, people either avoid AI or use it in shadow.

> **EXECUTION**  
> Exec mandate exists: Is there central coordination and policy?

---

### Data Accessible?
**Node ID:** `data_ready`

> **ANALYSIS**  
> DATA CHECK: Data fragmentation is the #1 blocker across all our interviews—even ahead of skills and budget. Internal data is the ONLY thing that differentiates successful AI adoption. But most orgs have it trapped in emails, spreadsheets, and people's heads. One company spent a quarter just collecting documents—the AI build took two weeks.

> **EVALUATION**  
> Data readiness test: (1) Are key documents in accessible systems—not 50 different tools? (2) Can you describe a business process without asking 'Bob'? (3) Is there a unified data lakehouse or consolidation plan? (4) Are data access permissions sorted for AI tools? If data lives in silos, that's still your blocker.

> **EXECUTION**  
> Governance exists: Is data consolidated and accessible?

---

### Risk Appetite?
**Node ID:** `risk_appetite`

> **ANALYSIS**  
> CULTURE CHECK: Some organizations prioritize governance and security so heavily that experimentation becomes impossible. Common in regulated industries—finance, healthcare, legal. Their caution may be appropriate, but it can create analysis paralysis and competitive lag. The question is whether caution has become paralysis.

> **EVALUATION**  
> Assess your culture: (1) Does compliance review take months? (2) Are employees afraid to try AI due to compliance fears? (3) Is the default answer 'no' until proven safe? (4) Has caution resulted in zero approved tools after 2+ years? Conservative isn't wrong—but frozen is.

> **EXECUTION**  
> Foundation in place: What's your cultural posture toward AI risk?

---

### Quick Wins Achieved?
**Node ID:** `quick_wins`

> **ANALYSIS**  
> EXECUTION CHECK: Quick wins are a top enabler across successful organizations. Internal support bots, back-office automation, coding assistants—these build momentum and convert skeptics. The question isn't just 'are you trying things' but 'have you shipped anything that shows ROI?'

> **EVALUATION**  
> Quick win test: (1) Have you deployed ANY AI tool to production—not just pilot? (2) Can you measure its impact? (3) Have you celebrated a win publicly to build momentum? (4) Did the win convert any skeptics? If you're still in pilot purgatory with nothing shipped, you haven't achieved quick wins yet.

> **EXECUTION**  
> Experimental culture: Have you actually shipped anything?

---

## ARCHETYPE OUTCOMES

### STATUS: INITIATE
**Node ID:** `initiate`

> **ANALYSIS**  
> STARTING LINE: You're at zero—no executive mandate, no grassroots experimentation. This isn't failure; it's a clean slate. You can leapfrog organizations stuck in legacy automation patterns. Zero prior automation is actually an advantage—no RPA to unlearn, no legacy to rip out.

> **EVALUATION**  
> Where you are: (1) Readiness score ~0-25. (2) No AI pilots underway. (3) No governance or strategy. (4) Limited AI fluency. (5) Data infrastructure likely fragmented. This is the starting position for many organizations—especially smaller ones or those in traditional industries.

> **EXECUTION**  
> PRESCRIPTION: Start small. (1) Write a one-page AI policy—even minimal governance beats none. (2) Identify your natural AI champions—people already curious about these tools. (3) Pick ONE quick-win use case: internal support bot or document Q&A. (4) Don't boil the ocean. Build governance and momentum in parallel.

---

### ARCHETYPE: GRASSROOTS TINKERERS
**Node ID:** `grassroots_tinkerers`

> **ANALYSIS**  
> ENERGY WITHOUT DIRECTION: You have bottom-up experimentation but no top-down support. People are using GPTs and copilots on their own initiative, but without mandate, budget, or coordination. This creates shadow AI, duplicated efforts, and inconsistent quality. You're likely at the Pilot stage (50-60) for individual tools, but falling behind on systematic deployment.

> **EVALUATION**  
> Symptoms: (1) Lots of individual AI usage, few team-wide deployments. (2) Teams doing the same work without knowing it. (3) No central place to find approved tools or share wins. (4) AI champions exist but aren't supported. (5) Policy gaps—people don't know what's allowed.

> **EXECUTION**  
> PRESCRIPTION: Legitimize the energy. (1) Get executive sponsorship—even minimal. (2) Formalize your AI champions into a task force. (3) Create a single channel for AI communication (Slack, Teams). (4) Document and share what's working. (5) Use grassroots wins to build the case for real mandate.

---

### ARCHETYPE: VISIONARY BOTTLENECK
**Node ID:** `visionary_bottleneck`

> **ANALYSIS**  
> VISION WITHOUT PLUMBING: You have executive excitement but the foundation is broken—either governance is missing, data is fragmented, or both. Leaders push AI tools without understanding ground-level complexity. Employees experience change fatigue from too many pilots that never scale. You're likely at Explorer stage (25-50).

> **EVALUATION**  
> Symptoms: (1) Pilots that never reach production—pilot purgatory. (2) 'Just use AI' mandates without time or training allocated. (3) Data trapped in dozens of disconnected systems. (4) Employees overwhelmed by new tools every month. (5) 70%+ reporting skills gaps with no training program. (6) No one knows what's permitted.

> **EXECUTION**  
> PRESCRIPTION: Stop and fix foundations. (1) Pause new pilots—you don't need more experiments, you need plumbing. (2) If governance is missing: establish AI council and written policy. (3) If data is fragmented: invest in consolidation before more AI. (4) The 6.6% readiness lift from governance alone justifies the pause. Fix foundations, then resume with quick-wins strategy.

---

### ARCHETYPE: CAUTIOUS INCUMBENT
**Node ID:** `cautious_incumbent`

> **ANALYSIS**  
> GOVERNANCE WITHOUT VELOCITY: You have mandate, governance, and accessible data—but your culture is risk-averse. Common in regulated industries where risk management is paramount. Your caution is often appropriate, but excessive conservatism creates competitive lag. Employees either avoid AI entirely or use it secretly.

> **EVALUATION**  
> Symptoms: (1) Analysis paralysis—months of review before any pilot approved. (2) Employees afraid to try AI due to compliance fears. (3) Zero or minimal tools approved after 2+ years. (4) Competitors moving faster. (5) Secret 'shadow AI' usage because approval is too slow. (6) Governance focused on 'no' rather than 'how.'

> **EXECUTION**  
> PRESCRIPTION: Create a sandbox with guardrails. (1) Define a safe experimentation zone with explicit boundaries. (2) Start with low-risk internal tools—internal support bots are ideal. (3) Shift governance from 'blocking' to 'enabling with constraints.' (4) Celebrate small wins publicly to shift culture. This pattern works for 2/3 of regulated organizations that succeed.

---

### ARCHETYPE: FOUNDATION BUILDER
**Node ID:** `foundation_builder`

> **ANALYSIS**  
> INFRASTRUCTURE WITHOUT WINS: You have everything in place—mandate, governance, data, experimental culture—but you're focused on building infrastructure rather than shipping value. Strong IT/data team working on lakehouses, gateways, and platforms. Technologically sound but slow to show ROI. Business units grow frustrated.

> **EVALUATION**  
> Symptoms: (1) Major data infrastructure investments underway or complete. (2) Enterprise-grade security and governance operational. (3) Business units asking 'when do WE get AI?' (4) Few deployed use cases despite solid foundation. (5) Risk of being overtaken by more agile competitors. (6) 'We'll do AI when the platform is ready' mindset.

> **EXECUTION**  
> PRESCRIPTION: Parallel track NOW. (1) Don't wait for perfect infrastructure—ship something this quarter. (2) Pick 2-3 quick wins that run on existing capabilities. (3) Internal support bots and back-office automation show ROI fastest. (4) Build momentum with wins WHILE building foundation. (5) The infrastructure is valuable—but only if it gets used.

---

### STATUS: AGENT READY
**Node ID:** `agent_ready`

> **ANALYSIS**  
> ALIGNED AND EXECUTING: Rare status—only a small percentage of organizations reach this. You have executive commitment, central governance, accessible data, experimental culture, AND demonstrated wins. Both top-down and bottom-up are connected and moving together. You're not just ready for AI—you're already delivering value.

> **EVALUATION**  
> Signs you're here: (1) Readiness score 75-100. (2) Multiple AI tools deployed to production—not just pilots. (3) Clear governance with sandbox for experimentation. (4) AI task force or center of excellence operating. (5) Measured ROI from quick wins. (6) Skills training program active. (7) Employees know what's permitted and use it.

> **EXECUTION**  
> MAINTENANCE MODE: Stay sharp. (1) Keep iterating—AI evolves fast. (2) Revisit governance for agent-specific considerations. (3) Watch for talent poaching from startups offering speed and upside. (4) Continue celebrating wins to maintain momentum. (5) Success today doesn't guarantee success tomorrow. The 2026 theme is Context + ROI—invest accordingly.

---

## EDGE CONNECTIONS

### Assess → Let's Begin → Exec Mandate
**Edge ID:** `r1`

> BEGIN DIAGNOSTIC. We'll identify your organizational archetype through a series of questions about mandate, governance, data, culture, and execution. Answer based on current reality, not aspirations.

---

### Exec Mandate → No → Grassroots
**Edge ID:** `r2`

> NO TOP-DOWN MANDATE. AI is not a strategic priority with real resources attached. This isn't fatal—some of the best AI adoption starts bottom-up. Let's check for grassroots energy.

---

### Exec Mandate → Yes → Governance
**Edge ID:** `r3`

> EXECUTIVE MANDATE EXISTS. Leadership is committed with real resources—budget, time, strategic priority. Great start. But exec enthusiasm alone can create chaos. Let's check for coordination.

---

### Grassroots → No → Initiate
**Edge ID:** `r4`

> NO ACTIVITY DETECTED. Neither top-down mandate nor bottom-up experimentation. You're at the true starting line. This is actually a clean slate—no bad habits to unlearn.

---

### Grassroots → Yes → Grassroots Tinkerers
**Edge ID:** `r5`

> GRASSROOTS ENERGY EXISTS. Bottom-up experimentation is happening, but without executive support or coordination. You have energy but need structure. Goal: legitimize and coordinate.

---

### Governance → No → Visionary Bottleneck
**Edge ID:** `r6`

> MANDATE WITHOUT GOVERNANCE. Executive excitement exists, but no central coordination, policy, or ownership. This leads to pilot purgatory—lots of experiments, nothing scales.

---

### Governance → Yes → Data Ready
**Edge ID:** `r7`

> MANDATE + GOVERNANCE. Both executive commitment and central coordination exist. Strong foundation. Next question: Is the data infrastructure actually ready?

---

### Data Ready → No → Visionary Bottleneck
**Edge ID:** `r8`

> GOVERNANCE WITHOUT DATA. You have mandate and policy, but data is fragmented. The #1 blocker remains unfixed. Vision and coordination exist, but plumbing is broken.

---

### Data Ready → Yes → Risk Appetite
**Edge ID:** `r9`

> FOUNDATION COMPLETE. Mandate, governance, and data are all in place. Now the question is culture: Is the organization willing to actually experiment and ship?

---

### Risk Appetite → Conservative → Cautious Incumbent
**Edge ID:** `r10`

> CONSERVATIVE CULTURE. Despite having mandate, governance, and data, the organization is risk-averse. Caution may be appropriate—but paralysis is not. Need to create safe experimentation space.

---

### Risk Appetite → Experimental → Quick Wins
**Edge ID:** `r11`

> EXPERIMENTAL CULTURE. Mandate, governance, data, and willingness to try things. Strong position. Final question: Have you actually shipped anything?

---

### Quick Wins → Not Yet → Foundation Builder
**Edge ID:** `r12`

> BUILDING BUT NOT SHIPPING. You have all the components but haven't demonstrated value yet. You're close—but until you ship and show ROI, you're still Foundation Builder.

---

### Quick Wins → Yes → Agent Ready
**Edge ID:** `r13`

> EXECUTING WITH RESULTS. Mandate, governance, data, culture, and demonstrated wins. Full package. This is the target state. You've proven the model works. Now maintain and scale.

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
