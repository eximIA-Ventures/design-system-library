# Squad Forge

> Making the invisible visible — transforms squads, agents, and clones into visual interactive platforms.

## Overview

Squad Forge takes any squad, agent, or clone from the Arsenal and materializes it into a visual, interactive platform. Instead of interacting via CLI commands, end users get a polished web interface.

## Agents

| Tier | Agent | DNA Source | Role |
|------|-------|-----------|------|
| **Orchestrator** | `bret-victor` | Bret Victor | Diagnoses UI pattern, orchestrates the entire forge process |
| **Tier 0** | `design-system` | Brad Frost | Design system, tokens, components (external agent from design squad) |
| **Tier 1** | `kinneret` | Kinneret Yifrah + Torrey Podmajersky | UX Writing, microcopy, Voice Chart, platform narrative |
| **Tier 1** | `wes-bush` | Wes Bush + Tod Golding + Sangeet Paul Choudary | PLG architecture, onboarding, multi-tenant, platform strategy |

## Platform Patterns

Every squad maps to one of 4 visual patterns:

| Pattern | Best For | Stack |
|---------|----------|-------|
| **Chat** | Squads where users TALK TO agents | Vercel AI SDK + Shadcn Chat |
| **Canvas** | Squads where users BUILD step-by-step | React DnD/Konva + Shadcn |
| **Wizard** | Squads with assessments, diagnostics, scoring | React Hook Form + Zod + Shadcn |
| **Dashboard** | Squads with metrics, analytics, monitoring | Tremor/Recharts + TanStack Table |

## Usage

```bash
# Forge a squad into a platform
@bret-victor *forge biblical

# Diagnose only (no build)
@bret-victor *diagnose biblical

# See available patterns
@bret-victor *patterns
```

## Workflow: wf-forge

```
Phase 0: Quick Wizard ───── bret-victor (3 questions max, then autonomous)
Phase 1: Analysis ───────── bret-victor (pattern detection + capability mapping)
Phase 2: Strategy ───────── wes-bush (PLG, onboarding, multi-tenant)
Phase 3: Design System ──── design-system/Brad Frost (tokens, components)
Phase 4: UX Writing ─────── kinneret (voice chart, microcopy, narrative)
Phase 5: Spec ───────────── @pm + @architect (PRD + tech spec)
Phase 6: Build ──────────── @dev (implementation)
Phase 7: QA ─────────────── @qa (validation)
Phase 8: Deploy ─────────── @devops (publication)
```

## Output Structure

```
forge/{target}/
├── wizard-config.yaml       # Phase 0
├── analysis.md              # Phase 1
├── strategy.md              # Phase 2
├── design/                  # Phase 3
│   ├── tokens.yaml
│   └── component-inventory.md
├── microcopy.md             # Phase 4
├── spec/                    # Phase 5
│   ├── prd.md
│   ├── tech-spec.md
│   └── api-design.md
├── qa-report.md             # Phase 7
└── deployment.md            # Phase 8
```

## Key Frameworks

- **Bret Victor**: Inventing on Principle, Direct Manipulation, Progressive Disclosure
- **Kinneret Yifrah**: Microcopy patterns (300+ UI elements), Voice & Tone methodology
- **Torrey Podmajersky**: Voice Chart (5 dimensions), 11 UX Text Patterns
- **Wes Bush**: ProductLed System (9 components), MOAT Framework, Bowling Alley
- **Tod Golding**: Multi-Tenant SaaS Patterns (Silo/Pool/Bridge)
- **Sangeet Paul Choudary**: Platform Canvas, Core Interaction Loop, MVP Platform
- **Brad Frost**: Atomic Design, Design Tokens, Component Architecture

## Version

- **v1.0.0** — Initial squad creation with 3 agents + 1 external + 1 workflow
