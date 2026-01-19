import { TACTICAL_INSIGHTS, TacticalInsight } from '../constants-strategy';

/**
 * matches the user's diagnostic path to a specific "Reshuffle" Tactical Insight.
 * Logic is based on the "Reshuffle Nuance Analysis" artifact.
 */
export function getRelevantInsight(pathDecisions: Record<string, string>): TacticalInsight | null {
    // 1. THE SOMMELIER STRATEGY
    // Trigger: Digital Business + Selling Judgment (Value Shift)
    // You are not selling the commodity (wine/data), you are selling confidence.
    if (
        pathDecisions['atoms'] === 'no' &&
        pathDecisions['layer1'] === 'no'
    ) {
        return TACTICAL_INSIGHTS['sommelier'];
    }

    // 2. THE VIBE CODING TRAP
    // Trigger: Digital + Contestable + Selling Production (Layer 1)
    // You are generating output that looks good but has no structural logic.
    if (
        pathDecisions['atoms'] === 'no' &&
        pathDecisions['contestable'] === 'yes' &&
        pathDecisions['layer1'] === 'yes'
    ) {
        return TACTICAL_INSIGHTS['vibe_coding'];
    }

    // 3. THE RESKILLING FALLACY
    // Trigger: Physical Business + Efficiency Play
    // You are optimizing tools (typing) for a task that is disappearing.
    if (
        pathDecisions['atoms'] === 'yes'
    ) {
        return TACTICAL_INSIGHTS['reskilling_fallacy'];
    }

    // 4. COORDINATION WITHOUT CONSENSUS
    // Trigger: Mid-tier + Getting Lean
    // You need to cut coordination tax (meetings) to survive.
    if (
        pathDecisions['midtier'] === 'yes' &&
        pathDecisions['can_lean'] === 'yes'
    ) {
        return TACTICAL_INSIGHTS['coordination_tax'];
    }

    // 5. THE MAGINOT LINE
    // Trigger: Protected Market (Moats)
    // You feel safe, but the context is changing around you.
    if (
        pathDecisions['distribution'] === 'yes' ||
        (pathDecisions['contestable'] === 'no' && pathDecisions['atoms'] === 'no')
    ) {
        return TACTICAL_INSIGHTS['maginot_line'];
    }

    // Default Fallback: Nurse Navigator (for any complex service coordination)
    // If none of the above specific traps/strategies apply, but they came through a service path
    return TACTICAL_INSIGHTS['nurse_navigator'];
}
