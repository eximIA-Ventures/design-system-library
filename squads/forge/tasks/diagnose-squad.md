# Task: Diagnose Squad

> **ID:** diagnose-squad
> **Executor:** bret-victor
> **Phase:** 1 (Analysis & Pattern Detection) of wf-forge
> **Dependencies:** data/pattern-signatures.yaml, checklists/forge-readiness-checklist.md

## Purpose

Analyze a target squad or agent to determine its primary UI pattern (Chat, Canvas, Wizard, or Dashboard) using the BV_DX_001 scoring system. This is the foundation for all subsequent forge phases.

## Input

```yaml
input:
  target_path: "string — path to squad folder or individual agent file"
  # Examples:
  #   "squads/biblical/"           → full squad analysis
  #   "squads/forge/agents/kinneret.md" → single agent analysis
```

## Execution Steps

### Step 1: Validate Readiness
- Run `forge-readiness-checklist.md` against the target
- If any veto condition fails → HALT with error
- If warnings exist → log them and continue

### Step 2: Load Agent Files
- If target is a squad folder → read ALL files in `agents/` subfolder
- If target is a single agent → read that file only
- Also check for:
  - `config.yaml` (squad-level config)
  - `workflows/` folder (workflow files)
  - `templates/` folder (template files)
  - `minds/{agent-id}/` folders (KB files: voice-dna.md, thinking-dna.md, crown-jewels.md)

### Step 3: Score Each Pattern (BV_DX_001)
Load scoring rules from `data/pattern-signatures.yaml` and evaluate:

**For each agent file, score:**

| Pattern | Signal | Weight | How to Detect |
|---------|--------|--------|---------------|
| **CHAT** | voice_dna or persona section | +3 | grep `voice_dna\|voice-dna\|persona:` |
| **CHAT** | conversational commands | +3 | grep `*ask\|*chat\|*advise\|*counsel` |
| **CHAT** | emotional/behavioral states | +2 | grep `emotional_states\|behavioral_states` |
| **CHAT** | multiple agents users talk TO | +2 | count agents with persona > 1 |
| **CANVAS** | sequential build/create workflows | +3 | grep `workflow\|phases\|steps` |
| **CANVAS** | templates producing visual artifacts | +3 | check templates/ folder |
| **CANVAS** | build/compose/create commands | +2 | grep `*build\|*compose\|*create` |
| **CANVAS** | cumulative output phases | +2 | grep `output:\|produces:` in workflows |
| **WIZARD** | elicitation patterns | +3 | grep `elicit\|questions\|assessment` |
| **WIZARD** | scored/evaluated output | +3 | grep `score\|evaluate\|grade\|diagnos` |
| **WIZARD** | assessment/diagnostic commands | +2 | grep `*assess\|*diagnose\|*evaluate` |
| **WIZARD** | linear workflow with defined end | +2 | workflow has clear start→end |
| **DASHBOARD** | analytics/metrics commands | +3 | grep `*analytics\|*metrics\|*track` |
| **DASHBOARD** | state tracking over time | +3 | grep `track\|monitor\|trend\|progress` |
| **DASHBOARD** | report/status/health commands | +2 | grep `*report\|*status\|*health` |
| **DASHBOARD** | data-heavy output | +2 | grep `table\|chart\|metric\|KPI` |

### Step 4: Classify Pattern
- **Primary pattern** = highest score
- **Hybrid** = if two patterns are within 2 points of each other → mark as HYBRID (primary + secondary)
- **Unclassifiable** = if ALL scores < 3 → HALT

### Step 5: Apply Visibility Test (BV_DX_005)
For the detected pattern, answer:
1. What data needs to be VISIBLE that is currently hidden in agent files?
2. What STATE needs to be visible that the user currently can't see?
3. What FLOW needs to be visible that currently exists only in YAML?

### Step 6: Apply Immediacy Test (BV_DX_006)
For the detected pattern, answer:
1. Can agent responses stream in real-time?
2. Can form changes update preview instantly?
3. Can phase transitions be visually immediate?

## Output

```yaml
output:
  file: "forge/{target}/analysis.md"
  format:
    pattern_classification:
      primary: "chat|canvas|wizard|dashboard"
      is_hybrid: false
      secondary: null
      scores:
        chat: 0
        canvas: 0
        wizard: 0
        dashboard: 0
      justification: "Detailed explanation of why each signal matched or didn't"

    agents_analyzed:
      - id: "agent-id"
        name: "Agent Name"
        signals_matched:
          - { pattern: "chat", signal: "has voice_dna", weight: 3 }

    visibility_assessment:
      hidden_data: []
      hidden_state: []
      hidden_flow: []

    immediacy_assessment:
      streaming_possible: true
      instant_preview: true
      visual_transitions: true

    readiness_warnings: []
```

## Error Handling

| Error | Action |
|-------|--------|
| Target path doesn't exist | HALT — "Target not found: {path}" |
| No agent files found | HALT — "No agents to analyze" |
| All pattern scores < 3 | HALT — "Pattern unclassifiable — manual review required" |
| Agent file has invalid YAML | WARN — skip that agent, continue with others |
| Missing minds/ folder | WARN — "KB files not found, pattern detection may be less accurate" |
