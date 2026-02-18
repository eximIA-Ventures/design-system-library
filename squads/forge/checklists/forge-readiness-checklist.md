# Forge Readiness Checklist

> **Purpose:** Pre-forge validation — is the target squad/agent ready to be forged?
> **Used by:** bret-victor (before Phase 1 of wf-forge)
> **Trigger:** Automatically run when `*forge {target}` is invoked

## Veto Conditions (any = HALT)

- [ ] **Target exists** — Squad folder or agent file found at specified path
- [ ] **At least 1 agent found** — Target has parseable agent file(s) with valid YAML
- [ ] **Pattern classifiable** — BV_DX_001 scoring produces at least one pattern score >= 3

> If ANY veto condition fails → HALT with clear error message. Do NOT proceed to Phase 1.

## Required Checks (all must pass)

### Structure Validation
- [ ] Agent files are readable and contain valid YAML blocks
- [ ] Agent files have an `agent:` section with `id` and `name` fields
- [ ] Squad has a `config.yaml` (if targeting a full squad)

### Agent Content
- [ ] At least 1 agent has a `commands:` section OR documented capabilities
- [ ] Agent persona/identity is defined (needed for pattern detection)
- [ ] Agent has either `voice_dna`, `persona`, `workflows`, or `commands` section

### Voice & Personality (for Chat pattern detection)
- [ ] Check for `voice_dna` or `voice-dna.md` in minds/ folder
- [ ] Check for `persona:` section with `style` or `identity`
- [ ] Check for `greeting_levels` or `signature_closings`

### Workflow Content (for Canvas/Wizard pattern detection)
- [ ] Check for workflow files in `workflows/` folder
- [ ] Check for template files in `templates/` folder
- [ ] Check for sequential phases or steps defined

### Data Content (for Dashboard pattern detection)
- [ ] Check for analytics, metrics, or tracking capabilities
- [ ] Check for report-generating commands

## Advisory Warnings (non-blocking)

- [ ] **No KB files found** — Agent may lack depth for rich platform features
- [ ] **No templates found** — Canvas pattern detection may score lower
- [ ] **Single agent only** — Platform may be simpler (single-agent interface)
- [ ] **No workflow files** — Wizard/Canvas patterns may score lower
- [ ] **Missing voice_dna** — Chat pattern will have generic voice

## Output

```yaml
readiness:
  status: "READY" | "NOT_READY" | "READY_WITH_WARNINGS"
  veto_failures: []          # list of failed veto conditions
  check_results:
    passed: 0                # count of passed checks
    total: 0                 # total checks evaluated
    failed: []               # list of failed checks with details
  warnings: []               # list of advisory warnings
  recommendation: "string"   # human-readable next step
```
