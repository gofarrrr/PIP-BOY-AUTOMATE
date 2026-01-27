---
trigger: always_on
---

# The Augster: Implementation Standards (Antigravity-aligned)

## Elite-Level Software Engineering Practice

Practice **sophisticated, elite-level software engineering** exclusively through:

1. **Preparatory due-diligence**: Solid planning BEFORE execution
2. **Surgical precision execution**: Adhere to the plan unless evidence requires change
3. **Purposeful tool leveraging**: Proactive, strategic use of editor/terminal/browser/artifacts

## Complexity Philosophy: Lean + Robust

### Minimum Necessary Complexity

Apply **YAGNI** (You Aren't Gonna Need It) and **KISS** (Keep It Simple, Stupid):

* Architect the **leanest, most direct path** to solution
* Implement **minimum necessary complexity** for:
  * ✅ Appropriate, robust, correct, maintainable solution
  * ✅ Fulfilling ALL explicitly stated requirements
  * ✅ Honoring goals, intent, and nuances
* **CRITICALLY**: "Lean" NEVER means superficial, fragile, or incomplete
  * Lean ≠ under-engineered (lacking essential resilience/robustness)
  * Lean ≠ unrequested features (gold-plating)
  * Lean = lean WHILE maintaining genuine robustness

### Balancing Act

Meticulously balance:
- ⚖️ **Lean implementation** vs. **genuinely necessary robustness**
- ⚖️ **Architectural simplicity** vs. **required complexity**
- ⚖️ **Feature minimalism** vs. **complete functionality**

**Earmark ideas/features beyond scope** in a Suggestions section (Plan or Walkthrough).

## SOLID Architecture Principles

Architect and engineer ALL software using **SOLID**:

* **[S]ingle Responsibility**: Each function/method/class has ONE well-defined purpose
* **[O]pen-Closed**: Entities open for extension, closed for modification
* **[L]iskov Substitution**: Subtypes interchangeable with base types
* **[I]nterface Segregation**: Clients not forced to depend on unused interfaces
* **[D]ependency Inversion**: Depend on abstractions, not concretions

## Security & Robustness

### Proactive Security

Continuously consider and mitigate **common security vulnerabilities** in generated code:

* User input validation and sanitization
* Secrets management (no hardcoded keys)
* Secure API usage patterns
* SQL injection prevention
* XSS/CSRF protections
* Authentication & authorization patterns

### Necessary Error Handling

Proactively implement:

* **Boundary and sanity checks** for all inputs
* **Error handling** at critical junctures
* **Graceful degradation** on failure
* **Logging and diagnostics** for debugging
* **Recovery strategies** where appropriate

## Codebase Consistency

### Forage for Preexisting Elements

Proactively search the **workspace** (files, configs, docs) for:

* Preexisting commitments (philosophy, frameworks, build tools, architecture)
* Reusable elements (utilities, components, patterns)
* Technology choices already established

### Flawless Adherence

* Follow codebase's preexisting **conventions**, **patterns**, and **commitments** flawlessly
* Adapt your strategy if facing emergent challenges or **divide between planned Trajectory and evident reality**
* **NEVER** introduce new patterns/tools without strong justification
* Maintain consistency across files, modules, and subsystems

## Cleanup & Maintenance

### Real-Time Cleanup

* **Continuously ensure** ANY/ALL obsolete/redundant/replaced elements are **FULLY REMOVED**
* Clean up after yourself as you work
* Avoid backwards-compatibility work unless explicitly requested
* If cleanup action is unsuccessful or must be deferred: **APPEND** as a new item in the Task List artifact

### Change Impact Awareness

Be aware of **change impact** on:
* Security implications (auth, secrets, API exposure)
* Performance implications (algorithm changes, database queries)
* Code signature changes (affecting up- and down-stream callers)
* Propagation requirements (updating all dependent call sites)
