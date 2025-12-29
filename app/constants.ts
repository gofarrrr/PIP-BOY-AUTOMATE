import { FlowNode, FlowEdge } from './types';

// Grid Layout Strategy:
// X=50: Central Logic Spine
// X=20: Efficiency/Automation Left Flank
// X=80: Human/Manual Right Flank
// Y-Axis expanded for better spacing (approx 25-30 units per step)

export const NODES: FlowNode[] = [
  {
    id: 'often',
    label: 'Do I do this\ntask often?',
    type: 'decision',
    x: 50,
    y: 5,
    color: 'blue',
    description: {
      why: "FREQUENCY ANALYSIS: One-off tasks rarely justify the setup time for a system. We are looking for the daily grind, the weekly report, the recurring chore. Time wasters hide in plain sight—track where your hours actually go.",
      evaluate: "Check your calendar or to-do list, dweller. If it eats hours every week, it's a target. If it's once a year, move on. Pro tip: log your time for a week—you'll be surprised.",
      read: "Start here. The path splits based on volume."
    }
  },
  {
    id: 'enjoy',
    label: 'Do I enjoy\nit?',
    type: 'decision',
    x: 80,
    y: 20,
    color: 'blue',
    description: {
      why: "MORALE CHECK: Even inefficient tasks have value if they maintain sanity or joy. Don't automate away your hobbies or the parts of work you love.",
      evaluate: "Does doing this task drain your energy or restore it? Be honest.",
      read: "If you love it, maybe keep it—unless it's inefficient."
    }
  },
  {
    id: 'augmenting',
    label: 'Worth\nAugmenting?',
    type: 'decision',
    x: 20,
    y: 20,
    color: 'blue',
    description: {
      why: "EFFICIENCY AUDIT: Can a tool do the heavy lifting? A dishwasher augments dishwashing; a spellchecker augments writing. The question isn't 'automate or not'—it's 'what layer of help makes sense here?'",
      evaluate: "Can you buy a tool, build a template, or use software to cut the time in half? Look for leverage. Start simple: can a dashboard, filter, or aggregator help? You don't need AI for everything.",
      read: "Mid-tier decision. Leads to hybrid workflows. Small tools often beat big systems."
    }
  },
  {
    id: 'complex',
    label: 'Is it\ncomplex?',
    type: 'decision',
    x: 50,
    y: 45,
    color: 'blue',
    description: {
      why: "COMPLEXITY THRESHOLD: High complexity creates fragile systems. But complexity isn't just logic—it's also data. Dealing with angry customers is complex; filing a standard form is simple. A task with simple logic but data trapped in emails is still complex.",
      evaluate: "Two checks: (1) Does the task change every time? (2) Is the information you need scattered—in spreadsheets, inboxes, or people's heads? If data is trapped, that's hidden complexity.",
      read: "Complex tasks push towards Augmentation or Manual work."
    }
  },
  {
    id: 'steps',
    label: 'Know the\nsteps?',
    type: 'decision',
    x: 50,
    y: 75,
    color: 'blue',
    description: {
      why: "PROCESS MAPPING: You cannot delegate what you can't explain. Ambiguity is the enemy of efficiency. If the 'process' lives only in your head or varies by mood, no system can replicate it.",
      evaluate: "Can you write a checklist so precise a stranger could follow it without questions? Better yet: does a log or record of this process exist somewhere? If it's undocumented, you have work to do first.",
      read: "If you don't know the steps, you can't build the machine. Document first, automate second."
    }
  },
  {
    id: 'success',
    label: 'Clear success\ncriteria?',
    type: 'decision',
    x: 50,
    y: 105,
    color: 'blue',
    description: {
      why: "TARGET ACQUISITION: A system needs to know when to stop. 'Write a good email' is vague; 'Send the PDF invoice' is clear. Without measurable success criteria, you can't evaluate if automation is working.",
      evaluate: "Is the result objective (Pass/Fail, Number, Timestamp) or subjective (Good/Bad)? Better question: do you track outcomes for this task? If you can't measure success, you can't automate reliably.",
      read: "Subjective outcomes force you back to manual oversight. Clear metrics unlock automation."
    }
  },
  {
    id: 'judgment',
    label: 'Needs\njudgment?',
    type: 'decision',
    x: 50,
    y: 135,
    color: 'blue',
    description: {
      why: "COGNITIVE LOAD: Tasks requiring empathy, taste, negotiation, or ethics need a human soul.",
      evaluate: "Does it involve reading the room, making an aesthetic choice, or handling a sensitive crisis?",
      read: "Judgment calls act as a hard stop for pure automation."
    }
  },
  {
    id: 'risk',
    label: 'Risk?',
    type: 'decision',
    x: 20,
    y: 135,
    color: 'blue',
    description: {
      why: "HAZARD ASSESSMENT: If the system fails, is it a minor annoyance or a catastrophe? Don't let a robot hold the baby. Risk isn't just technical—it's organizational. Even low-risk automation fails if leadership doesn't support it or the team resists change.",
      evaluate: "Three checks: (1) What's the worst-case if this breaks? (2) Does your organization have the appetite for this change? (3) Will the team embrace or sabotage it? Technical risk is obvious; organizational risk is silent and deadly.",
      read: "Final safety check before deployment. Green light means go."
    }
  },
  // Outcomes
  {
    id: 'automate',
    label: 'AUTOMATE',
    type: 'outcome',
    x: 20,
    y: 170,
    color: 'green',
    description: {
      why: "SYSTEM ONLINE: The holy grail. The machine works while you sleep. Perfect for data entry, payments, or cleaning floors. But reaching this outcome doesn't mean you're done—implementation can still fail.",
      evaluate: "Final checklist: (1) Systems connected, data accessible? (2) Team ready for the change? (3) ROI realistic? If yes, delegate completely. If any answer is shaky, start with a pilot—automate one instance first, prove it works, then scale.",
      read: "The ultimate goal for low-risk, high-frequency, boring tasks. Run a pilot before you commit."
    }
  },
  {
    id: 'augment',
    label: 'AUGMENT',
    type: 'outcome',
    x: 80,
    y: 105,
    color: 'yellow',
    description: {
      why: "POWER ARMOR: You are the pilot; the tech is the suit. Writing with AI, calculating with spreadsheets, building with power tools. But augmentation isn't one thing—it's a spectrum of human-machine collaboration.",
      evaluate: "Pick your level: (1) INFORMATION: Dashboards, alerts, summaries—tech gathers, you decide. (2) ANALYSIS: Pattern detection, anomalies flagged—tech highlights, you investigate. (3) RECOMMENDATIONS: AI suggests actions—you approve or override. (4) HYBRID: Automation handles routine, escalates edge cases to you.",
      read: "Best for complex, high-value work requiring human oversight. Match the augmentation level to your task's judgment requirements."
    }
  },
  {
    id: 'diy',
    label: 'DO IT YOURSELF',
    type: 'outcome',
    x: 5,
    y: 45,
    color: 'red',
    description: {
      why: "MANUAL OVERRIDE: Sometimes, the old ways are best. Don't overengineer a sandwich. If the task is rare, the tools are expensive, or the process keeps changing, manual work is the rational choice.",
      evaluate: "Just do the work. It builds character and keeps your skills sharp. Sometimes 'inefficiency' is the point—human touch, learning opportunity, relationship building.",
      read: "The default state when tech is too risky, costly, or unnecessary. No shame in DIY."
    }
  }
];

export const EDGES: FlowEdge[] = [
  // 1. Often -> Yes -> Enjoy
  {
    id: 'e1', from: 'often', to: 'enjoy', label: 'Yes',
    labelPosition: 0.5,
    description: {
      why: "HIGH VOLUME DETECTED. If you do it often, we must check if you actually like doing it.",
      evaluate: "Is this a chore, a necessary evil, or a hobby?",
      read: "Proceeds to Morale Check."
    }
  },
  // 2. Often -> No -> Worth Augmenting
  {
    id: 'e2', from: 'often', to: 'augmenting', label: 'No',
    labelPosition: 0.5,
    description: {
      why: "LOW VOLUME DETECTED. Full automation is likely overkill for rare tasks.",
      evaluate: "Check if a simple template or tool can speed this up instead of building a complex system.",
      read: "Proceeds to Efficiency Audit."
    }
  },

  // 3. Enjoy -> Yes -> Augmenting
  {
    id: 'e3', from: 'enjoy', to: 'augmenting', label: 'Yes', pathType: 'curved', controlPoints: [[50, 35]], // Dipped curve
    labelPosition: 0.5,
    description: {
      why: "JOY DETECTED. If you like it, don't automate it away entirely. Enhance it.",
      evaluate: "Can we make the fun part easier without losing the fun? Like a better mixer for baking.",
      read: "Loops back to Efficiency Audit."
    }
  },
  // 4. Enjoy -> No -> Complex
  {
    id: 'e4', from: 'enjoy', to: 'complex', label: 'No',
    labelPosition: 0.5,
    description: {
      why: "DRUDGERY DETECTED. You hate this task. Let's try to get a machine or system to do it.",
      evaluate: "Is the task simple enough for a system to understand?",
      read: "Proceeds to Complexity Threshold."
    }
  },

  // 5. Worth Augmenting -> Yes -> Complex
  {
    id: 'e5', from: 'augmenting', to: 'complex', label: 'Yes',
    labelPosition: 0.5,
    description: {
      why: "POTENTIAL DETECTED. It's worth making this faster.",
      evaluate: "Now we check if the logic is simple enough to offload completely.",
      read: "Proceeds to Complexity Threshold."
    }
  },
  // 6. Worth Augmenting -> No -> DIY
  {
    id: 'e6', from: 'augmenting', to: 'diy', label: 'No',
    labelPosition: 0.5,
    description: {
      why: "LOW VALUE. Not worth the effort to buy or build tools.",
      evaluate: "Just do the task manually.",
      read: "Terminates at DIY."
    }
  },

  // 7. Complex -> Yes -> Steps
  {
    id: 'e7', from: 'complex', to: 'steps', label: 'Yes',
    labelPosition: 0.5,
    description: {
      why: "COMPLEXITY CONFIRMED. We need to break this down.",
      evaluate: "Can we define the exact recipe/procedure?",
      read: "Proceeds to Process Mapping."
    }
  },
  // 8. Complex -> No -> Automate
  {
    id: 'e8', from: 'complex', to: 'automate', label: 'No', pathType: 'curved', controlPoints: [[0, 60], [0, 150]], // Sweep left
    labelPosition: 0.6,
    description: {
      why: "SIMPLE TASK DETECTED. No complexity, no brain required. But simple logic with inaccessible data is still a trap.",
      evaluate: "Perfect candidate for full automation—IF the data flows through systems, not people. Check: can a script access what it needs, or is someone copy-pasting?",
      read: "Direct path to Automation. Validate data pipes before committing."
    }
  },

  // 9. Steps -> Yes -> Success
  {
    id: 'e9', from: 'steps', to: 'success', label: 'Yes',
    labelPosition: 0.5,
    description: {
      why: "STEPS DEFINED. We have a recipe.",
      evaluate: "Now, how do we know if the job is done correctly?",
      read: "Proceeds to Target Acquisition."
    }
  },
  // 10. Steps -> No -> Augment
  {
    id: 'e10', from: 'steps', to: 'augment', label: 'No', pathType: 'curved', controlPoints: [[80, 75]], // Go right
    labelPosition: 0.5,
    description: {
      why: "UNDEFINED PROCESS. You can't code or teach what you can't explain. This is the #1 blocker teams hit.",
      evaluate: "Use tools to help you figure it out as you go. Try: screen recording your work, documenting as you do, or logging every step for a week. The process exists—it's just not written down yet.",
      read: "Diverts to Augmentation. First augment your understanding, then revisit automation later."
    }
  },

  // 11. Success -> Yes -> Judgment
  {
    id: 'e11', from: 'success', to: 'judgment', label: 'Yes',
    labelPosition: 0.5,
    description: {
      why: "CLEAR TARGET. We know what 'Done' looks like.",
      evaluate: "Does getting there require human intuition or feelings?",
      read: "Proceeds to Cognitive Load check."
    }
  },
  // 12. Success -> No -> Augment
  {
    id: 'e12', from: 'success', to: 'augment', label: 'No',
    labelPosition: 0.5,
    description: {
      why: "SUBJECTIVE OUTCOME. A system can't judge 'Quality' or 'Tone' reliably.",
      evaluate: "Human must remain in the loop to approve the result.",
      read: "Diverts to Augmentation."
    }
  },

  // 13. Judgment -> No -> Risk
  {
    id: 'e13', from: 'judgment', to: 'risk', label: 'No',
    labelPosition: 0.5,
    description: {
      why: "NO FEELINGS REQUIRED. Cold hard logic.",
      evaluate: "Is it dangerous if the logic fails?",
      read: "Proceeds to Hazard Assessment."
    }
  },
  // 14. Judgment -> Yes -> Augment
  {
    id: 'e14', from: 'judgment', to: 'augment', label: 'Yes', pathType: 'curved', controlPoints: [[80, 135]], // Go right from judgment
    labelPosition: 0.5,
    description: {
      why: "HUMAN TOUCH REQUIRED. The robot is too awkward.",
      evaluate: "Use AI/Tools to draft, Human to polish and connect.",
      read: "Diverts to Augmentation."
    }
  },

  // 15. Risk -> No -> Automate
  {
    id: 'e15', from: 'risk', to: 'automate', label: 'No',
    labelPosition: 0.5,
    description: {
      why: "SAFE TO DEPLOY. Low risk, defined steps, simple logic. All systems go.",
      evaluate: "Push the button. Let it run. But start with a pilot: one department, one workflow, one week. Prove it works, then scale. Skipping the pilot is how most automation projects fail.",
      read: "Terminates at Automate. Run the pilot, then roll out."
    }
  },
  // 16. Risk -> Yes -> Augment
  {
    id: 'e16', from: 'risk', to: 'augment', label: 'Yes', pathType: 'curved', controlPoints: [[50, 120]], // Curve under success, over judgment? No, through gap.
    labelPosition: 0.5,
    description: {
      why: "DANGER ZONE. High risk of failure means no unattended systems. But high-risk doesn't mean no-tech—it means supervised tech.",
      evaluate: "Keep a human in the driver's seat. Use hybrid automation: the system handles grunt work, human approves critical steps. Airlines autopilot most flights, but pilots handle takeoff and landing.",
      read: "Diverts to Augmentation. Supervised automation, not blind delegation."
    }
  },
];
