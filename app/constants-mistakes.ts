import { FlowNode, FlowEdge } from './types';

// Grid Layout Strategy for AI Adoption Mistakes Chart:
// X=50: Central Decision Spine (diagnostic questions)
// X=15: Solution Outcomes Left Side
// X=85: Success/Progress Right Side
// Y-Axis: Top to Bottom flow through the 7 mistakes

export const MISTAKES_NODES: FlowNode[] = [
    // ============ ENTRY ============
    {
        id: 'struggling',
        label: 'AI Adoption\\nStruggling?',
        type: 'decision',
        x: 50,
        y: 5,
        color: 'blue',
        description: {
            why: "ADOPTION HEALTH CHECK: Most organizations are stuck between AI promise and AI reality. The gap between what media promises and what actually works on the ground creates frustration. Some leaders become skeptical and cautious; others expect agents to be silver bullets. Both responses indicate struggle.",
            evaluate: "Symptoms of struggle: (1) Pilots that never reach production. (2) Tools purchased but unused. (3) Leadership excitement without employee buy-in—or vice versa. (4) No clear ROI from AI investments. If any of these resonate, you're struggling.",
            read: "Start here. If adoption is smooth and delivering value, you're on track. If not, let's diagnose."
        }
    },

    // ============ MISTAKE 1: SINGLE DIRECTION ============
    {
        id: 'direction',
        label: 'Leadership &\\nTeams Aligned?',
        type: 'decision',
        x: 50,
        y: 25,
        color: 'blue',
        description: {
            why: "ALIGNMENT CHECK: AI adoption fails when it's purely top-down OR purely bottoms-up. Top-down: leaders mandate AI without understanding day-to-day realities. Bottoms-up: enthusiastic employees build demos that never reach production because no one owns productization.",
            evaluate: "Two failure modes: (1) TOP-DOWN ONLY: Leaders excited, employees fearful or skeptical. Mandates without details. (2) BOTTOMS-UP ONLY: Great demos, no resources to productize. Innovation as 'side gig'. Neither direction alone works.",
            read: "First diagnostic. Both directions must be active and connected."
        }
    },

    // ============ MISTAKE 2: NO GOVERNANCE ============
    {
        id: 'governance',
        label: 'Clear AI\\nGovernance?',
        type: 'decision',
        x: 50,
        y: 45,
        color: 'blue',
        description: {
            why: "GOVERNANCE CHECK: 'Everyone should work on AI' often means 'no one is responsible for AI.' Haphazard adoption leads to duplicated efforts, wasted resources, and frustrated employees who don't know what's permitted or already solved.",
            evaluate: "Warning signs: (1) Peers doing same work don't know what's permissive. (2) No central policy document. (3) When asked 'who owns AI?', people say 'the CEO' because they don't know. (4) Zero or minimal AI tools approved after 2+ years.",
            read: "Second diagnostic. Clear ownership and policy are foundational."
        }
    },

    // ============ MISTAKE 3: UNREALISTIC EXPECTATIONS ============
    {
        id: 'expectations',
        label: 'Realistic\\nExpectations?',
        type: 'decision',
        x: 50,
        y: 65,
        color: 'blue',
        description: {
            why: "EXPECTATIONS CHECK: The gap between demo and production is often 10x. A working prototype in days becomes a quarter of work for enterprise-grade deployment. People expect AI to be near-perfect—better than humans—but current tech isn't there.",
            evaluate: "Reality check: (1) Do stakeholders understand demo ≠ production? (2) Can leadership tolerate errors? One company winced at 'one mistake per week'—that's unrealistic for current AI. (3) Do people expect turnkey value without training time?",
            read: "Third diagnostic. Misaligned expectations kill good initiatives."
        }
    },

    // ============ MISTAKE 4: POOR DATA ACCESS ============
    {
        id: 'data_ready',
        label: 'Data\\nAccessible?',
        type: 'decision',
        x: 50,
        y: 85,
        color: 'blue',
        description: {
            why: "DATA CHECK: Internal data is the only thing that differentiates successful AI adoption. But most organizations have documents scattered across dozens of places, trapped in email, or only in 'Bob's head.' One company spent a quarter just collecting documents—the actual system took two weeks.",
            evaluate: "Data readiness test: (1) Are key documents consolidated in accessible systems? (2) Is tribal knowledge documented? (3) Can you describe a business process without talking to one specific person? If 'only Bob knows,' it's not agent-ready.",
            read: "Fourth diagnostic. Data access is AI's Achilles heel."
        }
    },

    // ============ MISTAKE 5: WRONG BUILD/BUY ============
    {
        id: 'vendor_strategy',
        label: 'Smart Vendor\\nStrategy?',
        type: 'decision',
        x: 50,
        y: 105,
        color: 'blue',
        description: {
            why: "BUILD/BUY CHECK: Both extremes fail. Some organizations build everything in-house, reinventing what vendors already solved better. Others buy everything vendors promise, spending thousands on tools that don't deliver. Linear pilot-after-pilot burns a year with zero deployed tools.",
            evaluate: "Warning signs: (1) Building capabilities that exist commercially. (2) Buying based on marketing decks without vetting. (3) Sequential pilots that take a quarter each. (4) Zero approved tools after years of exploration.",
            read: "Fifth diagnostic. Strategic vendor selection accelerates adoption."
        }
    },

    // ============ MISTAKE 6: SILOED COMMUNICATION ============
    {
        id: 'sharing',
        label: 'Cross-Team\\nSharing?',
        type: 'decision',
        x: 50,
        y: 125,
        color: 'blue',
        description: {
            why: "COMMUNICATION CHECK: Even small companies show employees unaware of what peers are doing with AI—what's permitted, what's already built, what's working. Large organizations are worse. Silos create duplicated work and leave value on the table.",
            evaluate: "Sharing test: (1) Is there one place where AI work is communicated? (2) Can employees find what tools are approved? (3) Are AI successes celebrated and shared? (4) Do practitioners across teams know each other?",
            read: "Sixth diagnostic. Knowledge sharing multiplies AI value."
        }
    },

    // ============ MISTAKE 7: WAITING ============
    {
        id: 'urgency',
        label: 'Acting with\\nUrgency?',
        type: 'decision',
        x: 50,
        y: 145,
        color: 'blue',
        description: {
            why: "URGENCY CHECK: 'Let's wait for the tech to mature' sounds rational but is often fatal. There's a steep learning curve—infrastructure, culture, skills, vendor relationships. Waiting 6-12 months means losing experimentation time competitors won't wait for.",
            evaluate: "The wrong lesson: Recognizing current limitations but using it as excuse to halt. The right lesson: Build readiness NOW—data, governance, skills, culture—so you're ready when capabilities arrive. Capabilities double every ~7 months.",
            read: "Seventh diagnostic. Preparation beats waiting."
        }
    },

    // ============ SOLUTION OUTCOMES ============
    {
        id: 'bidirectional',
        label: 'SOLUTION:\\nBIDIRECTIONAL',
        type: 'outcome',
        x: 15,
        y: 25,
        color: 'yellow',
        description: {
            why: "FIX: MERGE TOP-DOWN AND BOTTOMS-UP. Leadership provides vision, resources, and strategic direction. Employees provide ground truth, use cases, and adoption. Both must be in the loop from the start—leadership in details, employees in strategy.",
            evaluate: "Implementation: (1) Leaders must understand day-to-day complexity and costs. (2) Employees need bandwidth allocation—not 10% weekly side-gigs. (3) Super-users should shape decisions, not just execute them. (4) Both sides must buy in before productization.",
            read: "Connect the two directions. Neither works alone."
        }
    },
    {
        id: 'ai_council',
        label: 'SOLUTION:\\nAI COUNCIL',
        type: 'outcome',
        x: 15,
        y: 45,
        color: 'yellow',
        description: {
            why: "FIX: DEDICATED OWNERSHIP AND CLEAR POLICY. A team or council that owns AI adoption—not as 10% of someone's time, but as a real mandate. Cross-functional, dotted to leadership, with authority to set policy proportional to company size and risk.",
            evaluate: "Implementation: (1) Dedicated AI team or council—not just 'everyone do AI'. (2) Written AI policy: what's permitted, what's approved, what's the vision. (3) Central repository for approved tools and learnings. (4) Revise policy as tech evolves—especially for agents.",
            read: "Clear ownership stops chaos. Even a one-pager policy beats nothing."
        }
    },
    {
        id: 'calibrate',
        label: 'SOLUTION:\\nCALIBRATE',
        type: 'outcome',
        x: 15,
        y: 65,
        color: 'yellow',
        description: {
            why: "FIX: SET REALISTIC EXPECTATIONS. Acknowledge demo-to-production gaps publicly. Communicate error tolerance honestly. Invest training time—both for fine-tuning systems AND for employees learning tools. Value accumulates after setup costs.",
            evaluate: "Implementation: (1) Plan 10x buffer from demo to production. (2) Set explicit error tolerance before deployment. (3) Budget training time—few hours minimum per tool. (4) Don't expect turnkey—pay the learning tax upfront.",
            read: "Calibrated expectations survive contact with reality."
        }
    },
    {
        id: 'data_first',
        label: 'SOLUTION:\\nDATA FIRST',
        type: 'outcome',
        x: 15,
        y: 85,
        color: 'yellow',
        description: {
            why: "FIX: INVEST IN DATA INFRASTRUCTURE NOW. Don't wait until you need an agent to realize your data is scattered. The incentive is high—get your RAG in place, consolidate knowledge, document tribal processes. This work has to happen anyway.",
            evaluate: "Implementation: (1) Audit where documents live—consolidate. (2) Interview 'Bob' and document what only he knows. (3) Build or buy a good RAG system. (4) Make data accessible through APIs and integrations. This is prep work for agent readiness.",
            read: "Data prep is the best use of time while waiting for agents to mature."
        }
    },
    {
        id: 'build_buy',
        label: 'SOLUTION:\\nBUILD/BUY\\nFRAMEWORK',
        type: 'outcome',
        x: 15,
        y: 105,
        color: 'yellow',
        description: {
            why: "FIX: STRUCTURED VENDOR EVALUATION. Don't build what exists commercially. Don't buy based on marketing. Vet vendors carefully—interview their customers. Learn from service providers before building in-house. Cascade pilots, don't serialize them.",
            evaluate: "Implementation: (1) Check if capability exists before building. (2) Interview vendor customers, not just sales. (3) Run parallel or cascaded pilots, not sequential. (4) Define evaluation criteria upfront. (5) Get super-users involved in vendor selection.",
            read: "Strategic sourcing beats both extremes."
        }
    },
    {
        id: 'ai_network',
        label: 'SOLUTION:\\nAI NETWORK',
        type: 'outcome',
        x: 15,
        y: 125,
        color: 'yellow',
        description: {
            why: "FIX: CREATE INTERNAL AI COMMUNITY. One place for AI communication—can be as simple as a Slack channel. Celebrate and share wins publicly. Build a network of champions and practitioners who learn from each other. Positive reinforcement beats mandates.",
            evaluate: "Implementation: (1) Single channel/portal for AI discussion. (2) Publicly celebrate employees who share AI wins. (3) Connect practitioners across teams. (4) Curate approved tools and learnings centrally. Quotes from practitioners are worth gold.",
            read: "Breaking silos multiplies adoption. Simple fixes work."
        }
    },
    {
        id: 'start_now',
        label: 'SOLUTION:\\nSTART NOW',
        type: 'outcome',
        x: 15,
        y: 145,
        color: 'yellow',
        description: {
            why: "FIX: ACT NOW, PREPARE FOR LATER. Don't wait for perfect tech. Use the time to build: data infrastructure, governance, culture, skills, vendor relationships. When agent capabilities arrive, you'll be ready. Competitors won't wait for you to catch up.",
            evaluate: "Implementation: (1) Doing something beats doing nothing—even wrong choices teach. (2) Build agent readiness: data, policies, governance. (3) Experiment with current capabilities to build muscles. (4) Capabilities double every ~7 months—the future is close.",
            read: "Preparation is the right response to uncertainty. Waiting is not."
        }
    },

    // ============ SUCCESS EXIT ============
    {
        id: 'on_track',
        label: '✓ ON\\nTRACK',
        type: 'outcome',
        x: 85,
        y: 75,
        color: 'green',
        description: {
            why: "HEALTHY ADOPTION: You've avoided the common pitfalls. Leadership and teams are aligned. Governance is clear. Expectations are realistic. Data is accessible. Vendor strategy is smart. Teams share learnings. You're acting with urgency.",
            evaluate: "Maintenance mode: (1) Keep iterating—AI evolves fast. (2) Revisit governance for agent-readiness. (3) Continue celebrating and sharing wins. (4) Stay vigilant for new bottlenecks. Success today doesn't guarantee success tomorrow.",
            read: "Congratulations—but don't get complacent. AI adoption is continuous."
        }
    }
];

export const MISTAKES_EDGES: FlowEdge[] = [
    // Entry split
    {
        id: 'm1', from: 'struggling', to: 'direction', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "STRUGGLE CONFIRMED. Let's diagnose which of the 7 common mistakes is holding you back.",
            evaluate: "We'll check alignment, governance, expectations, data, vendors, communication, and urgency.",
            read: "Proceeds to first diagnostic: Alignment."
        }
    },
    {
        id: 'm2', from: 'struggling', to: 'on_track', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "NO STRUGGLE DETECTED. Your AI adoption is healthy and delivering value.",
            evaluate: "Keep iterating. AI evolves fast—what works today may need updating.",
            read: "Terminates at On Track."
        }
    },

    // Mistake 1: Direction
    {
        id: 'm3', from: 'direction', to: 'bidirectional', label: 'One-Sided',
        labelPosition: 0.5,
        description: {
            why: "SINGLE DIRECTION DETECTED. Either top-down mandates without ground truth, or bottoms-up innovation without resources.",
            evaluate: "You need both directions connected and empowered.",
            read: "Terminates at Bidirectional solution."
        }
    },
    {
        id: 'm4', from: 'direction', to: 'governance', label: 'Both',
        labelPosition: 0.5,
        description: {
            why: "ALIGNMENT HEALTHY. Both leadership and teams are engaged.",
            evaluate: "Let's check if there's clear governance.",
            read: "Proceeds to Governance check."
        }
    },

    // Mistake 2: Governance
    {
        id: 'm5', from: 'governance', to: 'ai_council', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "GOVERNANCE GAP. No clear ownership, policy, or coordination.",
            evaluate: "Establish dedicated AI ownership and written policy.",
            read: "Terminates at AI Council solution."
        }
    },
    {
        id: 'm6', from: 'governance', to: 'expectations', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "GOVERNANCE HEALTHY. Clear ownership and policy exists.",
            evaluate: "Let's check if expectations are calibrated.",
            read: "Proceeds to Expectations check."
        }
    },

    // Mistake 3: Expectations
    {
        id: 'm7', from: 'expectations', to: 'calibrate', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "EXPECTATIONS MISALIGNED. Gap between promise and reality causing frustration.",
            evaluate: "Calibrate: acknowledge demo ≠ production, set error tolerance, invest training time.",
            read: "Terminates at Calibrate solution."
        }
    },
    {
        id: 'm8', from: 'expectations', to: 'data_ready', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "EXPECTATIONS HEALTHY. Stakeholders understand current limitations and timelines.",
            evaluate: "Let's check data accessibility.",
            read: "Proceeds to Data check."
        }
    },

    // Mistake 4: Data
    {
        id: 'm9', from: 'data_ready', to: 'data_first', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "DATA GAP. Knowledge scattered, tribal, or inaccessible.",
            evaluate: "Invest in data consolidation, documentation, and RAG infrastructure.",
            read: "Terminates at Data First solution."
        }
    },
    {
        id: 'm10', from: 'data_ready', to: 'vendor_strategy', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "DATA HEALTHY. Knowledge is consolidated and accessible.",
            evaluate: "Let's check vendor strategy.",
            read: "Proceeds to Vendor check."
        }
    },

    // Mistake 5: Vendors
    {
        id: 'm11', from: 'vendor_strategy', to: 'build_buy', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "VENDOR STRATEGY GAP. Either building everything or buying blindly.",
            evaluate: "Establish structured evaluation: vet vendors, cascade pilots, involve super-users.",
            read: "Terminates at Build/Buy Framework solution."
        }
    },
    {
        id: 'm12', from: 'vendor_strategy', to: 'sharing', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "VENDOR STRATEGY HEALTHY. Smart build vs buy decisions.",
            evaluate: "Let's check cross-team communication.",
            read: "Proceeds to Sharing check."
        }
    },

    // Mistake 6: Sharing
    {
        id: 'm13', from: 'sharing', to: 'ai_network', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "SHARING GAP. Teams siloed, duplicating work, unaware of each other.",
            evaluate: "Create internal AI community: single channel, celebrate wins, connect practitioners.",
            read: "Terminates at AI Network solution."
        }
    },
    {
        id: 'm14', from: 'sharing', to: 'urgency', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "SHARING HEALTHY. Teams communicate and learn from each other.",
            evaluate: "Final check: are you acting with appropriate urgency?",
            read: "Proceeds to Urgency check."
        }
    },

    // Mistake 7: Urgency
    {
        id: 'm15', from: 'urgency', to: 'start_now', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "URGENCY GAP. Waiting for tech to mature instead of preparing now.",
            evaluate: "Act now: build readiness, experiment, prepare infrastructure for when capabilities arrive.",
            read: "Terminates at Start Now solution."
        }
    },
    {
        id: 'm16', from: 'urgency', to: 'on_track', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "URGENCY HEALTHY. You're acting, experimenting, preparing.",
            evaluate: "You've passed all diagnostics. Your adoption is healthy.",
            read: "Terminates at On Track."
        }
    }
];

// Node labels for display
export const MISTAKES_NODE_LABELS: Record<string, string> = {
    struggling: 'Adoption Health',
    direction: 'Alignment Check',
    governance: 'Governance Check',
    expectations: 'Expectations Check',
    data_ready: 'Data Check',
    vendor_strategy: 'Vendor Check',
    sharing: 'Sharing Check',
    urgency: 'Urgency Check',
    bidirectional: 'Bidirectional',
    ai_council: 'AI Council',
    calibrate: 'Calibrate',
    data_first: 'Data First',
    build_buy: 'Build/Buy Framework',
    ai_network: 'AI Network',
    start_now: 'Start Now',
    on_track: 'On Track'
};
