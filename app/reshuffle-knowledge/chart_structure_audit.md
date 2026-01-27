# Chart Structure Audit – Analysis

## Content Density Overview

| Chart | File Size | Nodes | Outcomes | Extra Content |
|-------|-----------|-------|----------|---------------|
| **Task** | 15.6 KB | 7 decision | 3 | 2 tactics (augmenting only) |
| **Strategy** | 25.7 KB | 7 decision | 6 | 8 tactical insights |
| **Knowledge** | 27.4 KB | 5 decision | 6 | frameworks embedded in nodes |

**Total**: ~69 KB of chart content

---

## Bloat Analysis

### 🟢 What's Working Well

1. **Three-part description structure** (`why`, `evaluate`, `read`) is consistent
2. **Tactical Insights** in Strategy chart are separate objects—good for scaling
3. **Task chart** is leanest—good balance of depth vs. readability

### 🟡 Areas of Concern

1. **Long paragraphs in `why` fields** (especially after adding stats)
   - `midtier.why` = 400+ chars
   - `build_moats.why` = 350+ chars
   - `death_trap.why` = 350+ chars
   - **Risk**: Drawer content becomes a wall of text

2. **Knowledge chart has embedded frameworks** inside node descriptions
   - `sop_complete` has `wwwwFramework` array
   - `maturity` has `promptingHill` object
   - **Risk**: Complex nested data harder to read/maintain

3. **Inconsistent use of `tactics` array**
   - Only `augmenting` node uses it in Task chart
   - Strategy uses separate `TACTICAL_INSIGHTS` (better pattern)
   - **Opportunity**: Standardize on one pattern

---

## Structural Options

### Option A: No Change (Monitor Only)
**Case for**: Content hasn't reached true bloat yet. Users may skim anyway.

**Verdict**: ✅ Reasonable if we're not adding more stats soon.

---

### Option B: Extract Stats to Separate "Evidence" Section
**Case for**: Keeps core descriptions tight. Stats shown as collapsible.

**Implementation**:
```typescript
description: {
  why: "...",        // Keep short
  evaluate: "...",
  read: "...",
  evidence: [        // NEW - collapsible stats
    { source: "McKinsey", stat: "Workflow redesign = #1 EBIT factor" },
    { source: "MIT", stat: "Only 5% of AI pilots reach production" }
  ]
}
```

**Verdict**: 🟡 Moderate effort. Good separation of concerns.

---

### Option C: Add "Sub-Nodes" for Deep Dives
**Case for**: Keeps main flow simple. Complex content lives in optional branches.

**Example for Task chart**:
```
risk → (click to expand) → implementation_checklist
automate → (click to expand) → operator_requirements
```

**Verdict**: 🟡 Major structural change. Needs UI work.

---

### Option D: Move Tactical Content to Knowledge Chart
**Case for**: Strategy chart focuses on decisions. Knowledge chart houses "how-to".

**Implementation**:
- `service_layer` and `ai_operator` insights → become Knowledge nodes
- Strategy outcomes link to Knowledge for deep dives

**Verdict**: 🟢 Clean separation. No new UI needed.

---

## Recommendation

**For now**: **Option A** (no change) with **Option B** queued if we add more stats.

**Rationale**:
1. Current content is dense but not unusable
2. We just added new content—let it breathe
3. Option D is architecturally cleanest if we need to grow

**Future trigger for change**: If any single node's `why` field exceeds 500 characters, it's time to extract.

---

## Quick Win Ideas (No Structural Change)

1. **Tighten stat wording** - "IBM: 75% fail" instead of "IBM reports 75% of AI solutions don't deliver expected ROI"
2. **Move examples to `evaluate`** - Keep `why` conceptual, `evaluate` tactical
3. **Add character limits** - Lint rule: `why` < 400 chars, `evaluate` < 300 chars

---

## Next Steps
- [ ] Review with user
- [ ] If approved, tighten stat wording in next session
- [ ] Monitor drawer UX for feedback
