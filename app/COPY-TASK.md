# PIP-BOY Automation Decision Flowchart - Complete Copy

This document contains all the text content (copy) that is presented to users when interacting with the decision flowchart nodes and edges.

---

## DECISION NODES

### Do I do this task often?
**Node ID:** `often`

> **ANALYSIS**  
> FREQUENCY ANALYSIS: One-off tasks rarely justify the setup time for a system. We are looking for the daily grind, the weekly report, the recurring chore. Time wasters hide in plain sight—track where your hours actually go.

> **EVALUATION**  
> Check your calendar or to-do list, dweller. If it eats hours every week, it's a target. If it's once a year, move on. Pro tip: log your time for a week—you'll be surprised.

> **EXECUTION**  
> Start here. The path splits based on volume.

---

### Do I enjoy it?
**Node ID:** `enjoy`

> **ANALYSIS**  
> MORALE CHECK: Even inefficient tasks have value if they maintain sanity or joy. Don't automate away your hobbies or the parts of work you love.

> **EVALUATION**  
> Does doing this task drain your energy or restore it? Be honest.

> **EXECUTION**  
> If you love it, maybe keep it—unless it's inefficient.

---

### Worth Augmenting?
**Node ID:** `augmenting`

> **ANALYSIS**  
> EFFICIENCY AUDIT: Can a tool do the heavy lifting? A dishwasher augments dishwashing; a spellchecker augments writing. The question isn't 'automate or not'—it's 'what layer of help makes sense here?'

> **EVALUATION**  
> Can you buy a tool, build a template, or use software to cut the time in half? Look for leverage. Also consider: providers who specialize in this often have bulk pricing 10-100x better than your DIY cost. Don't build what you can buy cheaper.

> **EXECUTION**  
> Mid-tier decision. Leads to hybrid workflows. Small tools often beat big systems.

---

### Is it complex?
**Node ID:** `complex`

> **ANALYSIS**  
> COMPLEXITY THRESHOLD: High complexity creates fragile systems. But complexity isn't just logic—it's also data. Dealing with angry customers is complex; filing a standard form is simple. A task with simple logic but data trapped in emails is still complex.

> **EVALUATION**  
> Two checks: (1) Does the task change every time? (2) Is the information you need scattered—in spreadsheets, inboxes, or people's heads? If data is trapped, that's hidden complexity.

> **EXECUTION**  
> Complex tasks push towards Augmentation or Manual work.

---

### Know the steps?
**Node ID:** `steps`

> **ANALYSIS**  
> PROCESS MAPPING: You cannot delegate what you can't explain. Ambiguity is the enemy of efficiency. If the 'process' lives only in your head or varies by mood, no system can replicate it.

> **EVALUATION**  
> Can you write a checklist so precise a stranger could follow it without questions? Better yet: does a log or record of this process exist somewhere? If it's undocumented, you have work to do first.

> **EXECUTION**  
> If you don't know the steps, you can't build the machine. Document first, automate second.

---

### Clear success criteria?
**Node ID:** `success`

> **ANALYSIS**  
> TARGET ACQUISITION: A system needs to know when to stop. 'Write a good email' is vague; 'Send the PDF invoice' is clear. Without measurable success criteria, you can't evaluate if automation is working.

> **EVALUATION**  
> Is the result objective (Pass/Fail, Number, Timestamp) or subjective (Good/Bad)? Better question: do you track outcomes for this task? If you can't measure success, you can't automate reliably.

> **EXECUTION**  
> Subjective outcomes force you back to manual oversight. Clear metrics unlock automation.

---

### Needs judgment?
**Node ID:** `judgment`

> **ANALYSIS**  
> COGNITIVE LOAD: Tasks requiring empathy, taste, negotiation, or ethics need a human soul.

> **EVALUATION**  
> Does it involve reading the room, making an aesthetic choice, or handling a sensitive crisis?

> **EXECUTION**  
> Judgment calls act as a hard stop for pure automation.

---

### Risk?
**Node ID:** `risk`

> **ANALYSIS**  
> HAZARD ASSESSMENT: If the system fails, is it a minor annoyance or a catastrophe? Don't let a robot hold the baby. Risk isn't just technical—it's organizational. Even low-risk automation fails if leadership doesn't support it or the team resists change. ACCURACY WARNING: 95% accuracy sounds amazing until you realize it means 1 in 20 failures. For payroll, invoices, or financial calculations—that's unacceptable.

> **EVALUATION**  
> Four checks: (1) What's the worst-case if this breaks? (2) Does your organization have the appetite for this change? (3) Will the team embrace or sabotage it? (4) Does this need to be 100% accurate? If one wrong paycheck or invoice could create liability, use code—not AI. Technical risk is obvious; accuracy and organizational risk are silent and deadly.

> **EXECUTION**  
> Final safety check before deployment. Green light means go.

---

## OUTCOME NODES

### AUTOMATE
**Node ID:** `automate`

> **ANALYSIS**  
> SYSTEM ONLINE: The holy grail. The machine works while you sleep. Perfect for data entry, payments, or cleaning floors. But reaching this outcome doesn't mean you're done—implementation can still fail.

> **EVALUATION**  
> Final checklist: (1) Systems connected, data accessible? (2) Team ready? (3) ROI realistic? (4) Build vs Buy—is there a provider who does this at scale with bulk API deals? They may cost less than your DIY solution, plus they handle maintenance.

> **EXECUTION**  
> The ultimate goal for low-risk, high-frequency, boring tasks. Run a pilot before you commit.

---

### AUGMENT
**Node ID:** `augment`

> **ANALYSIS**  
> POWER ARMOR: You are the pilot; the tech is the suit. Writing with AI, calculating with spreadsheets, building with power tools. But augmentation isn't one thing—it's a spectrum of human-machine collaboration.

> **EVALUATION**  
> Pick your level: (1) INFORMATION: Dashboards, alerts, summaries—tech gathers, you decide. (2) ANALYSIS: Pattern detection, anomalies flagged—tech highlights, you investigate. (3) RECOMMENDATIONS: AI suggests actions—you approve or override. (4) HYBRID: Automation handles routine, escalates edge cases to you.

> **EXECUTION**  
> Best for complex, high-value work requiring human oversight. Match the augmentation level to your task's judgment requirements.

---

### DO IT YOURSELF
**Node ID:** `diy`

> **ANALYSIS**  
> MANUAL OVERRIDE: Sometimes, the old ways are best. Don't overengineer a sandwich. If the task is rare, the tools are expensive, or the process keeps changing, manual work is the rational choice.

> **EVALUATION**  
> Just do the work. It builds character and keeps your skills sharp. Sometimes 'inefficiency' is the point—human touch, learning opportunity, relationship building.

> **EXECUTION**  
> The default state when tech is too risky, costly, or unnecessary. No shame in DIY.

---

## EDGE CONNECTIONS (Path Descriptions)

### Often → Yes → Enjoy
**Edge ID:** `e1`

> **ANALYSIS**  
> HIGH VOLUME DETECTED. If you do it often, we must check if you actually like doing it.

> **EVALUATION**  
> Is this a chore, a necessary evil, or a hobby?

> **EXECUTION**  
> Proceeds to Morale Check.

---

### Often → No → Worth Augmenting
**Edge ID:** `e2`

> **ANALYSIS**  
> LOW VOLUME DETECTED. Full automation is likely overkill for rare tasks.

> **EVALUATION**  
> Check if a simple template or tool can speed this up instead of building a complex system.

> **EXECUTION**  
> Proceeds to Efficiency Audit.

---

### Enjoy → Yes → Worth Augmenting
**Edge ID:** `e3`

> **ANALYSIS**  
> JOY DETECTED. If you like it, don't automate it away entirely. Enhance it.

> **EVALUATION**  
> Can we make the fun part easier without losing the fun? Like a better mixer for baking.

> **EXECUTION**  
> Loops back to Efficiency Audit.

---

### Enjoy → No → Complex
**Edge ID:** `e4`

> **ANALYSIS**  
> DRUDGERY DETECTED. You hate this task. Let's try to get a machine or system to do it.

> **EVALUATION**  
> Is the task simple enough for a system to understand?

> **EXECUTION**  
> Proceeds to Complexity Threshold.

---

### Worth Augmenting → Yes → Complex
**Edge ID:** `e5`

> **ANALYSIS**  
> POTENTIAL DETECTED. It's worth making this faster.

> **EVALUATION**  
> Now we check if the logic is simple enough to offload completely.

> **EXECUTION**  
> Proceeds to Complexity Threshold.

---

### Worth Augmenting → No → DIY
**Edge ID:** `e6`

> **ANALYSIS**  
> LOW VALUE. Not worth the effort to buy or build tools.

> **EVALUATION**  
> Just do the task manually.

> **EXECUTION**  
> Terminates at DIY.

---

### Complex → Yes → Steps
**Edge ID:** `e7`

> **ANALYSIS**  
> COMPLEXITY CONFIRMED. We need to break this down.

> **EVALUATION**  
> Can we define the exact recipe/procedure?

> **EXECUTION**  
> Proceeds to Process Mapping.

---

### Complex → No → Automate
**Edge ID:** `e8`

> **ANALYSIS**  
> SIMPLE TASK DETECTED. No complexity, no brain required. But simple logic with inaccessible data is still a trap.

> **EVALUATION**  
> Perfect candidate for full automation—IF the data flows through systems, not people. Check: can a script access what it needs, or is someone copy-pasting?

> **EXECUTION**  
> Direct path to Automation. Validate data pipes before committing.

---

### Steps → Yes → Success
**Edge ID:** `e9`

> **ANALYSIS**  
> STEPS DEFINED. We have a recipe.

> **EVALUATION**  
> Now, how do we know if the job is done correctly?

> **EXECUTION**  
> Proceeds to Target Acquisition.

---

### Steps → No → Augment
**Edge ID:** `e10`

> **ANALYSIS**  
> UNDEFINED PROCESS. You can't code or teach what you can't explain. This is the #1 blocker teams hit.

> **EVALUATION**  
> Use tools to help you figure it out as you go. Try: screen recording your work, documenting as you do, or logging every step for a week. The process exists—it's just not written down yet.

> **EXECUTION**  
> Diverts to Augmentation. First augment your understanding, then revisit automation later.

---

### Success → Yes → Judgment
**Edge ID:** `e11`

> **ANALYSIS**  
> CLEAR TARGET. We know what 'Done' looks like.

> **EVALUATION**  
> Does getting there require human intuition or feelings?

> **EXECUTION**  
> Proceeds to Cognitive Load check.

---

### Success → No → Augment
**Edge ID:** `e12`

> **ANALYSIS**  
> SUBJECTIVE OUTCOME. A system can't judge 'Quality' or 'Tone' reliably.

> **EVALUATION**  
> Human must remain in the loop to approve the result.

> **EXECUTION**  
> Diverts to Augmentation.

---

### Judgment → No → Risk
**Edge ID:** `e13`

> **ANALYSIS**  
> NO FEELINGS REQUIRED. Cold hard logic.

> **EVALUATION**  
> Is it dangerous if the logic fails?

> **EXECUTION**  
> Proceeds to Hazard Assessment.

---

### Judgment → Yes → Augment
**Edge ID:** `e14`

> **ANALYSIS**  
> HUMAN TOUCH REQUIRED. The robot is too awkward.

> **EVALUATION**  
> Use AI/Tools to draft, Human to polish and connect.

> **EXECUTION**  
> Diverts to Augmentation.

---

### Risk → No → Automate
**Edge ID:** `e15`

> **ANALYSIS**  
> SAFE TO DEPLOY. Low risk, defined steps, simple logic. All systems go.

> **EVALUATION**  
> Push the button. Let it run. But start with a pilot: one department, one workflow, one week. Prove it works, then scale. Skipping the pilot is how most automation projects fail.

> **EXECUTION**  
> Terminates at Automate. Run the pilot, then roll out.

---

### Risk → Yes → Augment
**Edge ID:** `e16`

> **ANALYSIS**  
> DANGER ZONE. High risk of failure means no unattended systems. But high-risk doesn't mean no-tech—it means supervised tech.

> **EVALUATION**  
> Keep a human in the driver's seat. Use hybrid automation: the system handles grunt work, human approves critical steps. Airlines autopilot most flights, but pilots handle takeoff and landing.

> **EXECUTION**  
> Diverts to Augmentation. Supervised automation, not blind delegation.

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
