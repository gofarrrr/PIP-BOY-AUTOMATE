import { FlowNode, FlowEdge } from './types';

// Grid Layout Strategy for AI Strategy Chart:
// X=50: Central Decision Spine
// X=15: Physical/Efficiency Left Side
// X=85: Digital/Competitive Right Side
// Y-Axis expanded for clear spacing

export const STRATEGY_NODES: FlowNode[] = [
    // Entry Point
    {
        id: 'atoms',
        label: 'Do you move\natoms?',
        type: 'decision',
        x: 50,
        y: 5,
        color: 'blue',
        description: {
            why: "MARKET CLASSIFICATION: Are you in the bits business or the atoms business? If you physically show up somewhere—fix things, touch people, move objects—you're moving atoms. AI cannot do that part. If your work is files, documents, and digital deliverables, you're in bits territory where AI is commoditizing everything.",
            evaluate: "Can a customer in another country receive your service? If not, you're in atoms. Plumber, dentist, HVAC technician, moving company—these are atoms. Marketing agency, software consultancy, design firm, content production—these are bits.",
            read: "First fork: physical vs digital. This determines whether AI is a tailwind or a hurricane."
        }
    },
    {
        id: 'contestable',
        label: 'Can customers\neasily switch?',
        type: 'decision',
        x: 55,
        y: 30,
        color: 'blue',
        description: {
            why: "CONTESTABILITY CHECK: A market is contestable when buyers can easily evaluate alternatives and switch. Digital services are highly contestable—I can hire a marketing agency in Hong Kong tomorrow. Physical services are not—I cannot hire a plumber in Hong Kong to fix my pipes.",
            evaluate: "Two tests: (1) Can your customers easily compare your output to competitors? (2) Is switching to a competitor low-friction? If yes to both, you're in a contestable market. AI is about to intensify competition dramatically.",
            read: "Contestability determines whether AI will crush margins or just improve your efficiency."
        }
    },
    {
        id: 'layer1',
        label: 'Do you sell\ncognitive production?',
        type: 'decision',
        x: 40,
        y: 55,
        color: 'blue',
        description: {
            why: "VALUE CHAIN LAYER: There are three layers of business work. Layer 1 is tokenizable cognition—drafting, analysis, coding, reports. This is collapsing toward zero cost. Layer 2 is judgment and accountability—someone has to own the outcome. Layer 3 is physical execution. If you primarily bill for Layer 1 work, you're vulnerable.",
            evaluate: "What % of your revenue comes from deliverables (drafts, reports, code, campaigns) vs. outcomes (decisions, accountability, relationships)? If most of your billings are tied to producing cognitive work, you're selling Layer 1.",
            read: "Layer 1 is being commoditized. Layer 2 and 3 are not—yet."
        }
    },
    {
        id: 'midtier',
        label: 'Mid-size with\nestablished overhead?',
        type: 'decision',
        x: 40,
        y: 85,
        color: 'blue',
        description: {
            why: "SIZE TRAP ANALYSIS: The middle tier is where firms are actually in trouble. Think the marketing agency with 40 employees, the IT consultancy that's been around 15 years, the design firm with a reputation for being reliable. These firms are getting squeezed from both directions—from below by tiny AI-native teams, from above by giants with distribution advantages.",
            evaluate: "Do you have 20-100 employees? Offices? Legacy costs from a pre-AI era? If yes, you're in the squeeze zone. A team of 3 with good AI tools can now produce work nearly indistinguishable from yours. Giants have distribution you can't match.",
            read: "Mid-tier is the danger zone. You must choose a direction."
        }
    },
    {
        id: 'distribution',
        label: 'Have distribution\nmoats?',
        type: 'decision',
        x: 75,
        y: 55,
        color: 'blue',
        description: {
            why: "MOAT ASSESSMENT: Distribution moats include embedded client relationships, bundled offerings, platform status, brand recognition. These are not automatically eroded by AI. If anything, they become more valuable as the production layer commoditizes. Distribution is becoming scarce. Are you sitting on it?",
            evaluate: "Do clients come to you because they have no alternative? Are you embedded in their workflows? Do you have a platform, an ecosystem, contracts that create switching costs? If yes, your moat is real.",
            read: "Distribution protects you. Without it, you're in the commodity business."
        }
    },
    {
        id: 'can_lean',
        label: 'Can you cut to\na core team?',
        type: 'decision',
        x: 25,
        y: 115,
        color: 'blue',
        description: {
            why: "RADICAL RESTRUCTURING: Path one for mid-tier firms is to get radically lean. Cut headcount. Cut overhead. Rebuild around a small core team that uses AI to produce at the level your current staff produces. You're racing against 3-person startups—act like it.",
            evaluate: "Can you cut 60-80% of your team and maintain output quality using AI? Is leadership willing to make that call? Do you have the technical capability to rebuild AI-native? This is painful but survivable.",
            read: "Getting lean is brutal but viable. The alternative may be worse."
        }
    },
    {
        id: 'can_pivot',
        label: 'Can you shift to\nselling judgment?',
        type: 'decision',
        x: 55,
        y: 115,
        color: 'blue',
        description: {
            why: "VALUE STACK SHIFT: Path two is moving up the stack. Stop selling first layer cognitive production. Start selling second layer judgment, accountability, quality assurance. This means changing what you charge for—not deliverables, but outcomes.",
            evaluate: "Do you have senior people who can credibly sell judgment and taste? Can you restructure pricing from 'we deliver X' to 'we ensure Y quality'? Your AI investments should support senior people doing high-judgment work, not junior people producing more drafts.",
            read: "Moving up the stack requires repositioning, not just tooling."
        }
    },
    // Outcome Nodes
    {
        id: 'efficiency',
        label: 'EFFICIENCY\nPLAY',
        type: 'outcome',
        x: 15,
        y: 25,
        color: 'green',
        description: {
            why: "TAILWIND POSITION: AI is your friend here. It lowers administrative burdens, automates scheduling, dispatch, invoicing, customer communications. It does NOT expose you to brutal competition because your market isn't contestable. You're protected by atoms.",
            evaluate: "Focus AI investment on: (1) Back-office automation—scheduling, dispatch, invoicing. (2) Customer experience—every call answered, quotes instant. (3) Don't mistake efficiency tools for strategic transformation. You're a plumber. Just do better plumbing.",
            read: "Don't over-transform. AI is a tool here, not a strategy. Use it for overhead reduction and move on."
        }
    },
    {
        id: 'get_lean',
        label: 'GET\nLEAN',
        type: 'outcome',
        x: 5,
        y: 115,
        color: 'yellow',
        description: {
            why: "SURVIVAL MODE: You're choosing to race to the bottom—but owning that race. Cut to a 3-10 person core team. Every person must be AI-fluent. Every deliverable must leverage AI to the maximum. Your cost structure must match the startups eating your lunch.",
            evaluate: "Execution checklist: (1) Identify your 10% of people who can work AI-native. (2) Restructure around them. (3) Automate or eliminate everything else. (4) Price aggressively. (5) Win on speed and cost, not reputation. This is not a partial measure—half-lean is just dying slowly.",
            read: "If you can't beat the lean players, become one. No middle ground."
        }
    },
    {
        id: 'move_up',
        label: 'MOVE UP\nSTACK',
        type: 'outcome',
        x: 55,
        y: 145,
        color: 'yellow',
        description: {
            why: "DIFFERENTIATION PLAY: You're choosing to compete on judgment, not production. Your value proposition shifts from 'we make things' to 'we ensure things are right.' This is the accountability layer—someone has to sign off, own the outcome, take the liability.",
            evaluate: "Execution checklist: (1) Restructure pricing to value-based, not deliverable-based. (2) Invest in tools that help senior people do more judgment work. (3) Stop hiring junior producers—AI replaced them. (4) Build reputation around quality assurance, not volume.",
            read: "Sell taste, not tokens. Own outcomes, not outputs."
        }
    },
    {
        id: 'build_moats',
        label: 'BUILD\nMOATS',
        type: 'outcome',
        x: 90,
        y: 80,
        color: 'yellow',
        description: {
            why: "STARTUP SURVIVAL: Pure cognitive production is a depreciating asset. If your value prop is 'we use AI to produce X cheaper and faster,' you're in the commodity business. Every other AI-native startup makes the same claim. Margins will compress as models get cheaper.",
            evaluate: "Run toward defensibility: (1) Distribution—embed in workflows, create switching costs. (2) Second-layer bottlenecks—compliance, audit infrastructure, human-in-the-loop review. (3) Accountability wrappers—own the liability around AI outputs. (4) Workflow orchestration that makes you sticky.",
            read: "Build what's hard to copy. Production isn't it."
        }
    },
    {
        id: 'invest_talent',
        label: 'INVEST IN\nTALENT',
        type: 'outcome',
        x: 85,
        y: 25,
        color: 'green',
        description: {
            why: "GIANT'S GAME: Your moat protects you. Embedded relationships, bundled offerings, platform status, brand—none of these are automatically eroded by AI. The threat is not external disruption. It's internal: startups will hire away your best people by offering speed and upside you can't match.",
            evaluate: "AI investment = talent investment: (1) Give your teams AI-native tools. (2) Enable internal innovation at startup speed. (3) Convince top talent they have a future here. (4) The slow death is death by a thousand cuts—ankle biters stealing your best people and nibbling your edges.",
            read: "Your risk is squandering advantage through internal stagnation. Move faster than you're comfortable with."
        }
    },
    {
        id: 'death_trap',
        label: '[!] DEATH\nTRAP',
        type: 'outcome',
        x: 35,
        y: 145,
        color: 'red',
        description: {
            why: "WARNING: You're stuck in the middle with no viable path. You can't get lean (unwilling or unable to cut), you can't move up (no judgment to sell), and you're selling commoditized cognitive work in a contestable market. This is the squeeze that kills mid-tier firms.",
            evaluate: "The death trap is investing in AI to make your current model 20% more efficient. That's not enough to compete with 3-person teams. You're just dying slower. Harder truth: if you can't choose lean or up-stack, you may need to exit, merge, or niche down dramatically.",
            read: "The middle is not a strategy. Choose a direction or the market will choose for you."
        }
    }
];

export const STRATEGY_EDGES: FlowEdge[] = [
    // atoms -> efficiency (Yes - physical) 
    {
        id: 's1', from: 'atoms', to: 'efficiency', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "PHYSICAL BUSINESS DETECTED. You move atoms. AI cannot replace what you do—it can only make your back office more efficient.",
            evaluate: "Skip the AI transformation hype. Focus on operational efficiency: scheduling, dispatch, invoicing, customer comms.",
            read: "Proceeds to Efficiency Play."
        }
    },
    // atoms -> contestable (No - digital)
    {
        id: 's2', from: 'atoms', to: 'contestable', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "DIGITAL BUSINESS DETECTED. You work in bits, not atoms. Now we need to check if your market is contestable.",
            evaluate: "Digital doesn't automatically mean vulnerable—it depends on how easy it is for customers to compare and switch.",
            read: "Proceeds to Contestability Check."
        }
    },
    // contestable -> efficiency (No - protected)
    {
        id: 's3', from: 'contestable', to: 'efficiency', label: 'No', pathType: 'curved', controlPoints: [[35, 28]],
        labelPosition: 0.5,
        description: {
            why: "LOW CONTESTABILITY. Even though you're digital, switching costs are high. Maybe you're embedded, maybe you have lock-in, maybe comparison is difficult. You're protected.",
            evaluate: "AI is still useful for efficiency, but you're not facing the brutal competitive pressure of contestable markets.",
            read: "Proceeds to Efficiency Play."
        }
    },
    // contestable -> layer1 (Yes - exposed)
    {
        id: 's4', from: 'contestable', to: 'layer1', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "HIGH CONTESTABILITY CONFIRMED. Customers can compare you easily and switch. AI is about to intensify competition dramatically in your space.",
            evaluate: "The question now is what you're actually selling. Which layer of value?",
            read: "Proceeds to Layer Analysis."
        }
    },
    // layer1 -> distribution (No - selling judgment)
    {
        id: 's5', from: 'layer1', to: 'distribution', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "JUDGMENT-BASED VALUE. You're already selling Layer 2 work—accountability, decisions, taste, quality assurance. This is not being commoditized (yet).",
            evaluate: "Your position is stronger, but we need to check if you have distribution to protect it long-term.",
            read: "Proceeds to Moat Assessment."
        }
    },
    // layer1 -> midtier (Yes - selling production)
    {
        id: 's6', from: 'layer1', to: 'midtier', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "PRODUCTION-BASED VALUE. You're selling Layer 1 work—deliverables, drafts, analysis, code. This is being commoditized. A 3-person team can now match your output.",
            evaluate: "Your vulnerability level depends on your size. Startups have flexibility. Giants have moats. Mid-tier has neither.",
            read: "Proceeds to Size Assessment."
        }
    },
    // midtier -> distribution (No - not mid-tier)
    {
        id: 's7', from: 'midtier', to: 'distribution', label: 'No', pathType: 'curved', controlPoints: [[65, 70]],
        labelPosition: 0.5,
        description: {
            why: "NOT IN THE SQUEEZE ZONE. You're either small enough to be nimble or large enough to have structural advantages. Let's check which.",
            evaluate: "Startups and giants have viable paths. Mid-tier doesn't.",
            read: "Proceeds to Moat Assessment."
        }
    },
    // midtier -> can_lean (Yes - mid-tier squeeze)
    {
        id: 's8', from: 'midtier', to: 'can_lean', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "MID-TIER SQUEEZE CONFIRMED. 20-100 employees, legacy overhead, selling commoditizing work in a contestable market. You're getting crushed from both directions.",
            evaluate: "You have two paths. Path one: get radically lean and race the startups. Path two: move up the value stack to judgment work.",
            read: "Proceeds to Path Selection: Lean Option."
        }
    },
    // distribution -> invest_talent (Yes - giant with moats)
    {
        id: 's9', from: 'distribution', to: 'invest_talent', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "MOAT CONFIRMED. You have distribution that protects you. Embedded relationships, platform status, brand. AI is upside for you, not threat.",
            evaluate: "Your risk is internal: talent leaving, innovation stalling, death by a thousand cuts from ankle biters.",
            read: "Proceeds to Talent Investment."
        }
    },
    // distribution -> build_moats (No - startup without moats)
    {
        id: 's10', from: 'distribution', to: 'build_moats', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "NO MOAT YET. You're likely an AI-native startup or small firm. You can move fast, but pure cognitive production is a depreciating asset.",
            evaluate: "You need to build defensibility before the commodity trap catches you.",
            read: "Proceeds to Moat Building."
        }
    },
    // can_lean -> get_lean (Yes)
    {
        id: 's11', from: 'can_lean', to: 'get_lean', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "LEAN PATH CHOSEN. You have the ability and willingness to radically restructure. This is painful but survivable.",
            evaluate: "Execute ruthlessly. Half measures mean dying slower.",
            read: "Proceeds to Get Lean outcome."
        }
    },
    // can_lean -> can_pivot (No)
    {
        id: 's12', from: 'can_lean', to: 'can_pivot', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "LEAN PATH BLOCKED. You can't or won't cut to a core team. Let's check if you can move up the value stack instead.",
            evaluate: "If you can't get lean, you must differentiate. The middle is not survivable.",
            read: "Proceeds to Path Selection: Up-Stack Option."
        }
    },
    // can_pivot -> move_up (Yes)
    {
        id: 's13', from: 'can_pivot', to: 'move_up', label: 'Yes',
        labelPosition: 0.5,
        description: {
            why: "UP-STACK PATH CHOSEN. You have the senior talent and positioning to shift from selling production to selling judgment.",
            evaluate: "This requires genuine repositioning, not just adding AI tools to your current model.",
            read: "Proceeds to Move Up Stack outcome."
        }
    },
    // can_pivot -> death_trap (No)
    {
        id: 's14', from: 'can_pivot', to: 'death_trap', label: 'No',
        labelPosition: 0.5,
        description: {
            why: "NO VIABLE PATH. You can't get lean. You can't move up. You're stuck in the middle selling commoditized work. This is the death trap.",
            evaluate: "Hard truth time: consider exit, merger, dramatic niche-down, or accept slow decline.",
            read: "Proceeds to Death Trap warning."
        }
    }
];

// Node labels for display
export const STRATEGY_NODE_LABELS: Record<string, string> = {
    atoms: 'Physical Business',
    contestable: 'Market Contestability',
    layer1: 'Value Layer',
    midtier: 'Size Assessment',
    distribution: 'Distribution Moats',
    can_lean: 'Lean Option',
    can_pivot: 'Pivot Option',
    efficiency: 'Efficiency Play',
    get_lean: 'Get Lean',
    move_up: 'Move Up Stack',
    build_moats: 'Build Moats',
    invest_talent: 'Invest in Talent',
    death_trap: 'Death Trap'
};



export interface TacticalInsight {
    id: string;
    title: string;
    icon: string;
    trigger: string; // Description of why this unlocked
    concept: string; // The "Mental Model"
    warning: string; // The "Trap"
    advice: string; // The "Action"
}

export const TACTICAL_INSIGHTS: Record<string, TacticalInsight> = {
    sommelier: {
        id: 'sommelier',
        title: 'THE SOMMELIER STRATEGY',
        icon: '🍷',
        trigger: 'TRACK: Digital + Judgment',
        concept: "The Sommelier solves Choice Overload. When data is cheap (infinite wine info), the value shifts to *confidence* in the choice. You aren't selling the wine; you're selling the relief of not having to choose.",
        warning: "Don't sell 'better data' or 'more analysis'. That's the commodity you're trying to escape.",
        advice: "Shift your billing model. Stop charging for the 'deliverable' (the bottle) and start charging for the 'selection' (the cure for anxiety)."
    },
    nurse_navigator: {
        id: 'nurse_navigator',
        title: 'THE NURSE NAVIGATOR',
        icon: '🧭',
        trigger: 'TRACK: Service + Coordination',
        concept: "The Nurse Navigator solves Coordination Gaps. In a fragmented system (hospital), the value isn't the treatment (commodity); it's the *translation* between siloed specialists. You are the API layer between incompatible human systems.",
        warning: "Don't try to be the specialist. The specialist is being automated. Be the glue.",
        advice: "Focus on 'Journey Management'. Your product is the seamless experience across the fragmented mess of vendors your client uses."
    },
    coordination_tax: {
        id: 'coordination_tax',
        title: 'COORDINATION WITHOUT CONSENSUS',
        icon: '🔗',
        trigger: 'TRACK: Mid-tier + Lean',
        concept: "Traditional coordination requires meetings (high tax) or standards (impossible consensus). AI allows 'Coordination without Consensus' by ingesting messy, unstructured updates from everyone and aligning them automatically.",
        warning: "Stop trying to get everyone to use the same dashboard. They won't.",
        advice: "Build an 'Ingestion Layer' that accepts messy inputs (voice notes, emails, slack) and uses AI to update the central source of truth. Destroy the status meeting."
    },
    reskilling_fallacy: {
        id: 'reskilling_fallacy',
        title: 'THE RESKILLING FALLACY',
        icon: '⚠️',
        trigger: 'TRACK: Physical + Efficiency',
        concept: "The trap is learning to do the *task* faster (e.g., typing) just as the task is disappearing. Real security comes from learning to manage the *constraint* that remains (e.g., liability/risk).",
        warning: "Don't retrain your team on 'Prompt Engineering' for tasks that shouldn't exist.",
        advice: "Audit your training. If you're teaching people to drive the tractor better, stop. Teach them to manage the fleet of autonomous tractors."
    },
    vibe_coding: {
        id: 'vibe_coding',
        title: 'THE VIBE CODING TRAP',
        icon: '🎭',
        trigger: 'TRACK: Digital + Contestable + Production',
        concept: "'Vibe Coding' is producing impressive-looking outputs (code, copy, art) that lack structural logic. It works for a demo but fails in production. It creates a 'Debt Spiral' where you own code you don't understand.",
        warning: "If you can't debug it, you don't own it. You are renting it from the AI.",
        advice: " enforces 'Explanation Gates'. No AI code ships unless the human can explain *why* it works. Shift from 'Coder' to 'Code Auditor'."
    },
    maginot_line: {
        id: 'maginot_line',
        title: 'THE MAGINOT LINE',
        icon: '🏰',
        trigger: 'TRACK: Protected Market',
        concept: "You feel safe because of your moat (distribution/regulation). But AI doesn't attack your wall; it drains the ocean around it. It changes the context so much that your wall becomes irrelevant.",
        warning: "Your moat protects you from *competitors*, not from *obsolescence*.",
        advice: "Use your safety to attack yourself. Spin out a 'Red Team' whose only job is to figure out how to make your core product unnecessary."
    }
};


