# Task: Map Capabilities

> **ID:** map-capabilities
> **Executor:** bret-victor
> **Phase:** 1 (Analysis & Pattern Detection) of wf-forge
> **Dependencies:** tasks/diagnose-squad.md (must run first), data/pattern-signatures.yaml
> **Source:** BV_DX_003 (Capability-to-Feature Mapping)
> **Inspiration:** "A tool addresses human needs by amplifying human capabilities."
> [SOURCE: https://worrydream.com/ABriefRantOnTheFutureOfInteractionDesign/]

## Purpose

Transform agent capabilities (commands, workflows, knowledge) into a structured feature map that defines what the forged platform will contain. Each agent command becomes a feature, each input becomes a form, each output becomes a screen.

## Input

```yaml
input:
  target_path: "string — path to squad folder or individual agent file"
  pattern_classification: "object — output from diagnose-squad task"
  # The pattern classification determines HOW capabilities map to UI elements
```

## Execution Steps

### Step 1: Extract Commands from All Agents
For each agent file, find all commands (lines matching `*command-name`):

```yaml
extraction:
  commands:
    - agent_id: "agent-id"
      command: "*command-name"
      description: "what this command does"
      inputs: ["list of required inputs"]
      output: "what the command produces"
      dependencies: ["prerequisite commands or state"]
```

### Step 2: Map Commands → Features (BV_DX_003)

Apply the mapping rules for each command:

| Agent Capability | Platform Feature |
|-----------------|-----------------|
| command name | feature name |
| command inputs | form fields |
| command output | result view / screen |
| command dependencies | feature prerequisites |

**Example (Biblical Squad):**

| Agent | Command | Feature | Input → Form | Output → View |
|-------|---------|---------|--------------|---------------|
| yeshua | *ask | Chat with Yeshua | Text input + send button | Chat bubble with agent avatar |
| moshe | *legislate | Law Analysis | Topic selector + context field | Structured analysis view |
| shlomo | *judge | Wisdom Ruling | Situation description textarea | Decision card with reasoning |

### Step 3: Map Inputs → Forms
For each command input, determine the appropriate form element:

| Input Type | Form Element |
|-----------|-------------|
| free text (short) | Text input |
| free text (long) | Textarea |
| selection from options | Select / Radio group |
| multiple selections | Checkbox group / Multi-select |
| file/document | File upload |
| structured data | Multi-field form |
| none (no input) | Button trigger only |

### Step 4: Map Outputs → Screens
For each command output, determine the appropriate view:

| Output Type | Screen Element |
|------------|---------------|
| text response | Chat bubble / Text card |
| structured report | Report view with sections |
| scored assessment | Score card with visualization |
| data table | Data table with sorting/filtering |
| document | Document viewer / Download |
| multi-step result | Step-by-step result view |

### Step 5: Map Handoffs → Navigation
For each inter-agent handoff or workflow transition:

| Handoff Type | Navigation Element |
|-------------|-------------------|
| agent → agent | Tab / sidebar navigation |
| phase → phase | Step indicator / progress bar |
| command → command | Button / link action |
| workflow start | Entry point / CTA |
| workflow end | Summary / completion screen |

### Step 6: Generate Capability Map
Compile all mappings into a structured capability map.

## Output

```yaml
output:
  file: "forge/{target}/analysis.md"  # appended to diagnose-squad output
  format:
    capability_map:
      total_agents: 0
      total_commands: 0
      total_features: 0
      total_screens: 0

      features:
        - id: "feature-id"
          name: "Feature Name"
          source_agent: "agent-id"
          source_command: "*command-name"
          pattern_fit: "chat|canvas|wizard|dashboard"
          input:
            type: "text|selection|file|structured|none"
            fields:
              - name: "field-name"
                type: "text|textarea|select|checkbox|file"
                required: true
                options: []  # if select/checkbox
          output:
            type: "text|report|score|table|document|multi-step"
            view: "chat-bubble|report-view|score-card|data-table|document-viewer"
          prerequisites: []
          priority: "core|secondary|nice-to-have"

      navigation:
        type: "tabs|sidebar|wizard-steps|dashboard-sections"
        sections:
          - name: "Section Name"
            features: ["feature-id-1", "feature-id-2"]
            agent: "agent-id"

      screens:
        - id: "screen-id"
          name: "Screen Name"
          route: "/path"
          features: ["feature-id-1"]
          layout: "single-column|two-column|full-width"
```

## Priority Classification

Features are classified by priority:

| Priority | Criteria |
|----------|---------|
| **core** | Primary command of primary agent(s), essential for pattern |
| **secondary** | Supporting commands, enhance core experience |
| **nice-to-have** | Utility commands, can be deferred to v2 |

## Error Handling

| Error | Action |
|-------|--------|
| Agent has no commands | WARN — "Agent {id} has no extractable commands, skipping" |
| Command has no clear input | Default to "none" (button trigger) |
| Command has no clear output | Default to "text" (generic text response) |
| Duplicate feature names | Suffix with agent id: "feature-name (agent-id)" |
