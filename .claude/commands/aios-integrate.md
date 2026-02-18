# /aios-integrate — Gerenciador de Artefatos AIOS

Voce e um assistente especializado em integrar, atualizar, remover, listar, exportar e verificar artefatos AIOS (agents e squads).

## Instrucoes

Quando o usuario executar `/aios-integrate`, siga este fluxo:

### 0. Auto-Detect Inbox

**Antes de exibir o menu**, verifique se a pasta `.aios-core/inbox/` existe e contem artefatos:

1. Verifique se `.aios-core/inbox/` existe
2. Se existir, liste arquivos `.md` (agents) e pastas com `squad.yaml` (squads) dentro dela
3. Se houver artefatos, exiba notificacao antes do menu:

```
📥 Inbox: {N} artefato(s) detectado(s)!

  1. agent-helper.md — Agent detectado
  2. my-squad/ — Squad detectado

Deseja integrar agora? (s/n)
```

- Se **sim**: Execute integracao batch (mesmo fluxo da opcao 1 com batch mode) para todos os artefatos do inbox. Apos integracao bem-sucedida de cada artefato, mova-o para `.aios-core/inbox/.processed/` (criar pasta se nao existir) para evitar re-processamento.
- Se **nao**: Continue para o menu principal normalmente.

**Se a pasta nao existir ou estiver vazia**, pule direto para o menu.

### 1. Pergunte a acao desejada

Apresente as opcoes:
1. **Integrar artefato externo** — Importar um agent ou squad (suporta dry-run e batch)
2. **Atualizar artefato instalado** — Atualizar agent/squad com nova versao
3. **Remover artefato** — Desinstalar agent/squad com limpeza completa
4. **Listar artefatos instalados** — Mostrar agents e squads com filtros
5. **Exportar artefatos** — Empacotar artefatos em .zip para compartilhamento
6. **Health check** — Verificar integridade de todos os artefatos instalados
7. **Inbox** — Ver e integrar artefatos da pasta inbox

---

## Procedimentos Comuns

Rotinas compartilhadas por multiplas acoes. Referencie estas secoes quando indicado nos fluxos.

### Deteccao de Tipo de Artefato

Ao receber um arquivo/pasta, determine o tipo:
- Se contem `agent:` com campos `name`, `id`, `persona` → e um **Agent**
- Se contem `name`, `version`, `components`, `slashPrefix` → e um **Squad**
- Se nenhum match → rejeitar com erro: "Formato nao reconhecido. Esperado agent (.md com `agent:`) ou squad (pasta com squad.yaml)."

### Validacao por Schema

Valide artefatos usando os schemas reais em `.aios-core/schemas/`.

**Para Agent** (schema: `.aios-core/schemas/agent-v3-schema.json`):

1. **Campos required** (ERRORS se ausentes):
   - Top-level: `agent`, `persona`, `commands`
   - Dentro de `agent`: `name`, `id`, `title`, `icon`
   - Dentro de `persona`: `role`

2. **Patterns** (ERRORS se invalidos):
   - `agent.id` deve seguir `^[a-z][a-z0-9-]*$` (kebab-case, comeca com letra)

3. **Enums** (WARNINGS se fora do set):
   - `communication.tone` em `["pragmatic","conceptual","analytical","supportive","precise"]`
   - `persona_profile.archetype` — verificar se e string nao vazia

4. **Tipos** (ERRORS se tipo errado):
   - `commands` deve ser array
   - `agent.name`, `agent.id`, `agent.title` devem ser strings
   - `agent.icon` deve ser string
   - `dependencies` deve ser object (se presente)

5. **Comandos** (WARNINGS):
   - Cada command deve ter `name` e `description`
   - `visibility` deve ser `full`, `quick` ou `key` (se presente)

**Para Squad** (schema: `.aios-core/schemas/squad-schema.json`):

1. **Campos required** (ERRORS): `name`, `version`
2. **Patterns** (ERRORS):
   - `name` deve seguir `^[a-z0-9-]+$` (kebab-case)
   - `version` deve seguir semver
3. **Componentes** (WARNINGS):
   - `components.agents` deve ser array (se presente)
   - `components.tasks` deve ser array (se presente)
   - `slashPrefix` deve ser kebab-case (se presente)

**Relatorio de validacao:**
```
Validacao: {artifact-name}
  ERRORS (bloqueiam integracao):
    - [E001] Campo required ausente: agent.id
    - [E002] Pattern invalido: agent.id "My Agent" (esperado: kebab-case)
  WARNINGS (informativos):
    - [W001] Campo opcional ausente: communication.tone
    - [W002] Enum desconhecido: archetype "Unknown"
  Resultado: N errors, M warnings
```

Se ERRORS > 0: bloquear operacao e mostrar erros.
Se apenas WARNINGS: prosseguir com avisos.

**Fallback:** Se os arquivos de schema nao forem encontrados em `.aios-core/schemas/`, usar validacao minima (campos required apenas) e exibir aviso: "Schemas nao encontrados. Usando validacao minima."

### Deteccao de Idioma

Para determinar o idioma de output (usado no Auto-Explain):

1. Verificar campo `language` em `.aios-core/core-config.yaml` (se existir)
2. Verificar campo `language` em `.claude/CLAUDE.md` (se existir)
3. Inferir do conteudo predominante de `.claude/CLAUDE.md`:
   - Se contem predominantemente palavras em portugues (de, para, quando, como, com) → PT
   - Se contem predominantemente palavras em ingles (the, for, when, how, with) → EN
4. Default: PT (portugues)

**Tabela de traducao para headers do Auto-Explain:**

| PT | EN |
|----|-----|
| O que e | What is it |
| Como ativar | How to activate |
| Comandos disponiveis | Available commands |
| Quando usar | When to use |
| Exemplo pratico | Practical example |
| Dependencias | Dependencies |
| Agents incluidos | Included agents |
| Workflow tipico | Typical workflow |
| Componentes | Components |

Dados extraidos do artefato (nomes de comandos, roles, IDs) permanecem sempre no idioma original — nao traduza identificadores tecnicos.

### Operacoes CSV Padronizadas

O manifest `.aios-core/manifests/agents.csv` usa **8 colunas**:

```csv
id,name,archetype,icon,version,status,file_path,when_to_use
```

| Coluna | Descricao | Exemplo |
|--------|-----------|---------|
| `id` | ID unico kebab-case | `dev` |
| `name` | Nome da persona | `Dex` |
| `archetype` | Arquetipo da persona | `Builder` |
| `icon` | Emoji | `💻` |
| `version` | Versao semver | `2.1.0` |
| `status` | Status atual | `active` / `deprecated` / `experimental` |
| `file_path` | Caminho relativo do agent | `.aios-core/development/agents/dev.md` |
| `when_to_use` | Descricao de uso (pode ser multiline, quoted) | `"Use for code implementation..."` |

**Regras de parse:**
- Campos com virgulas ou newlines devem estar entre aspas duplas (`"..."`)
- `when_to_use` frequentemente contem multiline — parsear respeitando RFC 4180 (CSV com campos quoted)
- Primeira linha e sempre o header — nunca tratar como dado

**Adicionar entrada:**
```csv
{id},{name},{archetype},{icon},{version},{status},{file_path},"{when_to_use}"
```

**Remover entrada:** Deletar a linha inteira cujo campo `id` corresponde.

**Atualizar entrada:** Substituir a linha inteira cujo campo `id` corresponde pela nova versao.

---

## 2. Integrar Artefato Externo

Quando o usuario escolher integrar:

1. Peca o **caminho ou URL** do artefato (arquivo `.md`/`.yaml` para agent, ou pasta para squad)
2. Detecte o modo de integracao:
   - **Arquivo unico** (`.md` com `agent:`) → integracao normal
   - **Pasta com multiplos `.md` contendo `agent:`** → **batch mode** (Feature 9)
   - **Arquivo `.json`/`.yaml` com campo `batch:` listando paths** → **batch mode**
   - **Arquivo `.zip`** → extrair para temp, depois processar conteudo
   - **Arquivo `.tar.gz`** → extrair para temp, depois processar conteudo
3. Pergunte o modo de execucao:
   - **Executar** (default) — integrar normalmente
   - **Dry-run** — mostrar preview sem criar/modificar arquivos (Feature 8)
4. Leia e analise o artefato usando **Deteccao de Tipo** (Procedimentos Comuns)
5. Execute **Validacao por Schema** (Procedimentos Comuns)
6. Se validacao OK (sem ERRORS), prossiga com a integracao

### Modo Dry-Run (Feature 8)

Quando dry-run estiver ativo, mostre tudo que **seria** feito sem executar:

```
🔍 Dry-Run: {artifact-name}

  [NEW] .codex/agents/{id}.md (estimado: ~N KB)
  [NEW] .antigravity/agents/{id}.md (estimado: ~N KB)
  [NEW] .agent/workflows/{id}.md (estimado: ~N KB)
  [NEW] .claude/commands/{id}-{cmd}.md (x M arquivos)
  [APPEND] .aios-core/manifests/agents.csv (+1 linha)

  Validacao: 0 errors, N warnings
  [CONFLICT] Nenhum / ID "{id}" ja existe no manifest

  Nenhum arquivo foi criado ou modificado.
```

Para batch dry-run, mostrar preview consolidado de todos os artefatos.

### Modo Batch (Feature 9)

Quando batch detectado:

1. Listar todos os artefatos encontrados:
   ```
   Artefatos detectados (batch):
     1. agent-a.md → Agent "dev-helper" (v1.0.0)
     2. agent-b.md → Agent "code-reviewer" (v1.0.0)
     3. invalid.md → [ERRO] Formato nao reconhecido
   ```
2. Pedir confirmacao para prosseguir
3. Integrar sequencialmente; se um falhar validacao, **pular e continuar** com os demais
4. Relatorio consolidado:
   ```
   Batch completo:
     Sucesso: N artefatos integrados
     Falha: M artefatos (listados abaixo)
       - invalid.md: Formato nao reconhecido
     Total: N+M processados
   ```

**Edge cases batch:**
- IDs duplicados no batch → rejeitar a duplicata, integrar o primeiro encontrado
- Pasta vazia ou sem artefatos validos → "No valid artifacts found in {path}"
- Combinavel com dry-run (preview do batch completo sem executar)

### Fluxo Agent

Crie automaticamente todos os arquivos de integracao:

```
.codex/agents/{id}.md          — Copia do agent para IDE discovery
.antigravity/agents/{id}.md    — Workflow activation file
.agent/workflows/{id}.md       — Workflow file
```

Registre no manifest `.aios-core/manifests/agents.csv` adicionando uma linha com as 8 colunas:
```csv
{id},{name},{archetype},{icon},{version},{status},{file_path},"{when_to_use}"
```

Extraia os valores dos campos do artefato:
- `id` ← `agent.id`
- `name` ← `agent.name`
- `archetype` ← `persona_profile.archetype` (ou "Custom" se ausente)
- `icon` ← `agent.icon`
- `version` ← inferir de metadata ou usar "1.0.0" se ausente
- `status` ← "active"
- `file_path` ← caminho relativo onde o source foi copiado
- `when_to_use` ← `agent.whenToUse` (ou inferir de `persona.role`)

Para cada `command` definido no agent (na secao `commands`), crie um slash command em `.claude/commands/`:
- Nome do arquivo: `{agent-id}-{command-name}.md`
- Conteudo:

```markdown
# /{agent-id}-{command-name}

Ative o agent @{agent-name} e execute o comando `*{command-name}`.

## Contexto
- Agent: {agent-name} ({agent-title})
- Comando: *{command-name}
- Descricao: {command-description}

## Instrucoes
1. Leia o agent definition em `.codex/agents/{id}.md`
2. Assuma a persona do agent
3. Execute o comando `*{command-name}` conforme definido no agent
```

### Fluxo Squad

1. Copie a pasta completa do squad para `./squads/{squad-name}/`
2. Leia o `squad.yaml` para identificar os agents do squad
3. Para cada agent listado em `components.agents`:
   - Registre no `.aios-core/manifests/agents.csv` (8 colunas)
   - Crie os arquivos de integracao (mesmos do fluxo agent acima)
4. Para cada task listada em `components.tasks`, crie slash commands baseados no `slashPrefix`:
   - Nome: `{slashPrefix}-{task-name}.md`
   - Conteudo: Instrucoes para executar a task do squad

Ao finalizar, mostre um relatorio:
```
✓ Artefato integrado: {name}
  Tipo: Agent/Squad
  Arquivos criados:
    - .codex/agents/{id}.md
    - .antigravity/agents/{id}.md
    - .agent/workflows/{id}.md
    - .claude/commands/{command}.md (x N)
  Manifest atualizado: agents.csv (+1 entrada, 8 colunas)
```

### Auto-Explain: Guia de Uso

Imediatamente apos exibir o relatorio de integracao, gere automaticamente um **Guia de Uso** educativo do artefato integrado. O guia e obrigatorio — nao pergunte ao usuario se deseja; sempre gere.

**Deteccao de idioma:** Use a rotina **Deteccao de Idioma** (Procedimentos Comuns) para determinar se o guia deve ser em PT ou EN.

**Regras gerais:**
1. Use o idioma detectado para headers e texto explicativo
2. Tom educativo e acessivel — como se estivesse ensinando alguem a usar pela primeira vez
3. Maximo ~40 linhas
4. Use APENAS dados reais extraidos do artefato — nunca invente comandos, campos ou comportamentos
5. Omita secoes para as quais nao ha dados disponiveis no artefato
6. Use tabelas markdown para comandos e agents

**Para Agent** — gere as seguintes secoes (quando os dados existirem):

| Secao | O que mostrar | Fonte dos dados |
|-------|---------------|-----------------|
| **O que e / What is it** | Descricao do papel do agent em 1-2 frases | `persona.role` + `agent.whenToUse` |
| **Como ativar / How to activate** | Sintaxe de ativacao (`@{id}`) e tom de interacao | `agent.id`, `persona_profile.archetype`, `communication.tone` |
| **Comandos disponiveis / Available commands** | Tabela com nome, descricao e exemplo de uso | `commands[]` filtrados por `visibility` = `quick` ou `key` |
| **Quando usar / When to use** | Situacoes praticas em que o agent e util | `agent.whenToUse` ou inferido de `persona.role` |
| **Exemplo pratico / Practical example** | Um cenario realista de uso com saudacao e primeiro comando | `greeting_levels.named` + primeiro comando disponivel |
| **Dependencias / Dependencies** | Contagem por categoria (tasks, templates, checklists) | `dependencies` (se existir) |

Formato de saida para Agent (exemplo em PT — adaptar headers conforme idioma):
```markdown
## 📖 Guia de Uso: {agent-name}

### O que e
{descricao baseada em persona.role e whenToUse}

### Como ativar
Chame `@{id}` para ativar. {tom de interacao baseado em archetype/tone}

### Comandos disponiveis
| Comando | Descricao |
|---------|-----------|
| `*{cmd}` | {descricao} |

### Quando usar
{situacoes praticas}

### Exemplo pratico
> Usuario: @{id} ola
> Agent: {saudacao named}
> Usuario: *{primeiro-comando}

### Dependencias
{N} tasks, {N} templates, {N} checklists
```

**Para Squad** — gere as seguintes secoes (quando os dados existirem):

| Secao | O que mostrar | Fonte dos dados |
|-------|---------------|-----------------|
| **O que e / What is it** | Descricao do squad em 1-2 frases | `description` do squad |
| **Agents incluidos / Included agents** | Tabela com agent, papel e como ativar | `components.agents[]` |
| **Comandos disponiveis / Available commands** | Tabela com comandos usando o prefixo do squad | `components.tasks[]` com `slashPrefix` |
| **Workflow tipico / Typical workflow** | Sequencia de uso recomendada | Inferido de `components.workflows[]` ou composicao dos agents |
| **Componentes / Components** | Resumo quantitativo | Contagem de agents, tasks, workflows, templates |

Formato de saida para Squad (exemplo em PT):
```markdown
## 📖 Guia de Uso: {squad-name}

### O que e
{descricao do squad}

### Agents incluidos
| Agent | Papel | Ativacao |
|-------|-------|----------|
| {name} | {role} | `@{id}` |

### Comandos disponiveis
| Comando | Descricao |
|---------|-----------|
| `/{prefix}-{task}` | {descricao} |

### Workflow tipico
{sequencia de uso recomendada}

### Componentes
{N} agents, {N} tasks, {N} workflows, {N} templates
```

---

## 3. Atualizar Artefato Instalado

Quando o usuario escolher atualizar:

1. **Listar artefatos instalados** — Leia `.aios-core/manifests/agents.csv` e mostre lista numerada:
   ```
   Artefatos instalados:
     1. 💻 dev (Dex) v2.1.0 — active
     2. ✅ qa (Quinn) v2.1.0 — active
     3. 🏛️ architect (Aria) v2.1.0 — active
     ...
   ```

2. **Perguntar qual atualizar** — Por numero ou ID

3. **Pedir caminho da nova versao** — Arquivo `.md` do agent atualizado

4. **Validar nova versao** — Executar **Validacao por Schema** (Procedimentos Comuns)

5. **Verificar compatibilidade:**
   - Se `agent.id` mudou entre versoes → **REJEITAR**: "O ID do artefato mudou de '{old}' para '{new}'. Remova o antigo e integre o novo separadamente."
   - Se versao nova < versao atual → **AVISAR**: "Downgrade detectado: {old_ver} → {new_ver}. Deseja continuar?" (permitir se confirmado)

6. **Mostrar diff resumido:**
   ```
   Diff: {agent-name} ({old_ver} → {new_ver})

     MODIFIED:
       - persona.role: "old value" → "new value"
       - commands: +2 adicionados, -1 removido, 3 inalterados
     ADDED:
       - dependencies.tools (novo campo)
     REMOVED:
       - autoClaude.legacy (campo removido)
     UNCHANGED: 15 campos

     Customizacoes preservadas:
       - agent.customization (merge da versao local)
   ```

7. **Pedir confirmacao** para prosseguir

8. **Executar atualizacao:**
   - Preservar `agent.customization` da versao local (merge no novo arquivo)
   - Sobrescrever os 3 arquivos:
     - `.codex/agents/{id}.md`
     - `.antigravity/agents/{id}.md`
     - `.agent/workflows/{id}.md`
   - Atualizar entrada no `agents.csv` (substituir linha inteira)
   - Slash commands:
     - Comandos novos → criar slash commands
     - Comandos removidos → deletar slash commands `{id}-{cmd-removido}.md`
     - Comandos inalterados → manter como estao

9. **Para squads:**
   - Agents adicionados na nova versao → executar integracao completa (fluxo Agent)
   - Agents removidos na nova versao → executar remocao limpa (fluxo Remover)
   - Agents mantidos → atualizar normalmente

10. **Relatorio:**
    ```
    ✓ Artefato atualizado: {name} ({old_ver} → {new_ver})
      Arquivos atualizados: 3
      Slash commands: +N criados, -M removidos, K mantidos
      Customizacoes preservadas: agent.customization
      Manifest atualizado: agents.csv
    ```

**Compativel com dry-run:** Se o usuario pedir dry-run, mostrar todo o diff e acoes planejadas sem executar.

---

## 4. Remover Artefato

Quando o usuario escolher remover:

1. **Listar artefatos instalados** — Mesma lista numerada da secao Atualizar

2. **Perguntar qual remover** — Por numero ou ID

3. **Preview obrigatorio** — Antes de qualquer confirmacao, mostre exatamente o que sera deletado:
   ```
   Preview de remocao: {icon} {name} ({id})

     Arquivos a deletar:
       - .codex/agents/{id}.md
       - .antigravity/agents/{id}.md
       - .agent/workflows/{id}.md
       - .claude/commands/{id}-cmd1.md
       - .claude/commands/{id}-cmd2.md
       (total: N arquivos)

     Manifest:
       - Remover linha do agents.csv (id: {id})

     Dependencias:
       - Nenhuma / {M} agents referenciam este artefato
   ```

4. **Verificar dependencias:**
   - Se o agent faz parte de um squad → avisar: "Este agent pertence ao squad '{squad-name}'. Deseja remover o squad inteiro ou apenas este agent?"
   - Se outros agents dependem deste (referenciam em `dependencies`) → avisar: "Os seguintes agents dependem de '{id}': {list}. A remocao pode quebrar essas dependencias."

5. **Pedir confirmacao explicita** — "Confirma a remocao de {name} ({id})? (s/n)"

6. **Executar remocao:**

   **Para Agent:**
   - Deletar os 3 arquivos do agent: `.codex/agents/{id}.md`, `.antigravity/agents/{id}.md`, `.agent/workflows/{id}.md`
   - Deletar todos os slash commands `{id}-*.md` em `.claude/commands/`
   - Remover linha do `agents.csv`

   **Para Squad:**
   - Deletar pasta `./squads/{squad-name}/`
   - Para cada agent do squad: executar remocao completa (3 arquivos + slash commands + CSV)
   - Deletar slash commands do squad: `{slashPrefix}-*.md` em `.claude/commands/`

7. **Edge cases:**
   - Arquivos ja parcialmente ausentes → pular sem erro, notar no relatorio ("arquivo nao encontrado, pulado")
   - Agent parte de squad → oferecer opcao de remover squad inteiro

8. **Relatorio pos-remocao:**
   ```
   ✓ Artefato removido: {name} ({id})
     Arquivos deletados: N
     Arquivos nao encontrados (pulados): M
     Slash commands removidos: K
     Manifest atualizado: agents.csv (-1 entrada)
   ```

---

## 5. Listar Artefatos Instalados

Quando o usuario escolher listar:

1. **Perguntar filtros opcionais:**
   - **Tipo:** agent / squad / todos (default: todos)
   - **Status:** active / deprecated / experimental / todos (default: todos)
   - **Busca por nome:** texto livre (substring case-insensitive em `name`, `id`, `when_to_use`)
   - Se o usuario disser apenas "listar" sem especificar filtros, usar defaults (todos)

2. **Ler e parsear `.aios-core/manifests/agents.csv`** com as 8 colunas

3. **Aplicar filtros** no resultado

4. **Verificar squads** em `./squads/` para identificar agents que pertencem a squads

5. **Formato de saida:**

```
📋 Artefatos AIOS Instalados
   Filtros: {tipo}, {status}, busca: "{texto}" (ou "sem filtros")

  Agents:
    💻 dev (Dex) v2.1.0 — Builder — active
       Uso: Use for code implementation, debugging, refactoring...
       Comandos: *develop, *implement, *fix

    ✅ qa (Quinn) v2.1.0 — Guardian — active
       Uso: Use for comprehensive test architecture review...
       Comandos: *qa-gate, *review

  Squads:
    🎯 etl-squad v1.2.0 — ETL Pipeline Squad
       Agents: extractor, transformer, loader
       Prefix: /etl-*

  Resumo:
    Total: N agents (A ativos, D deprecated, E experimental), M squads
```

**Edge cases:**
- CSV vazio (sem agents) → "Nenhum artefato instalado."
- Filtro sem resultados → "Nenhum artefato encontrado com os filtros aplicados."
- `when_to_use` multiline → exibir apenas primeira linha/frase, truncar com "..."

---

## 6. Exportar Artefatos

Quando o usuario escolher exportar:

1. **Listar artefatos disponiveis** e perguntar qual exportar

2. **Coletar arquivos** do artefato selecionado:

   **Para Agent:**
   - Agent definition: `.codex/agents/{id}.md`
   - Slash commands: `.claude/commands/{id}-*.md`
   - Tasks referenciadas (se existirem em `dependencies.tasks`)
   - Templates referenciados (se existirem em `dependencies.templates`)
   - Checklists referenciados (se existirem em `dependencies.checklists`)

   **Para Squad:**
   - Pasta completa: `./squads/{squad-name}/`
   - Slash commands do squad: `.claude/commands/{slashPrefix}-*.md`

3. **Gerar `_manifest-entry.csv`** — Arquivo com a entrada do manifest para re-importacao:
   ```csv
   id,name,archetype,icon,version,status,file_path,when_to_use
   {dados do agent}
   ```
   Incluir este arquivo dentro do pacote exportado.

4. **Empacotar:**
   - **Preferido:** `zip -r {artifact-name}-export.zip {files}`
   - **Fallback:** Se `zip` nao disponivel (`which zip` falha), usar `tar -czf {artifact-name}-export.tar.gz {files}` com aviso: "Comando `zip` nao encontrado. Usando tar.gz como fallback."

5. **Salvar** na pasta atual

6. **Relatorio:**
   ```
   ✓ Exportado: ./{artifact-name}-export.zip
     Conteudo: N arquivos, M KB
     Inclui: _manifest-entry.csv (para re-importacao)
     Arquivos:
       - agents/{id}.md
       - commands/{id}-cmd1.md
       - commands/{id}-cmd2.md
       - _manifest-entry.csv
     Para importar em outro projeto: /aios-integrate → Integrar → caminho do .zip
   ```

**Na importacao (Integrar):** Detectar e aceitar tanto `.zip` quanto `.tar.gz`. Extrair para pasta temporaria e processar o conteudo normalmente. Se `_manifest-entry.csv` existir no pacote, usar seus dados como base para o registro no manifest.

---

## 7. Health Check

Quando o usuario escolher health check, executar **6 verificacoes** e gerar relatorio consolidado.

### Verificacao 1: Manifest → Disco

Para cada entrada no `agents.csv`, verificar que os 3 arquivos de integracao existem:
- `.codex/agents/{id}.md`
- `.antigravity/agents/{id}.md`
- `.agent/workflows/{id}.md`

Resultado por agent: PASS / MISSING (listar arquivos ausentes)

### Verificacao 2: Disco → Manifest (Orfaos)

Listar arquivos em `.codex/agents/` que **nao** tem entrada correspondente no `agents.csv`.
Orfaos indicam integracao incompleta ou remocao parcial.

### Verificacao 3: Slash Commands

Para cada arquivo `.claude/commands/{agent-id}-*.md`:
- Extrair `{agent-id}` do nome do arquivo
- Verificar que existe um agent com esse ID no manifest
- Slash commands orfaos → MISSING

### Verificacao 4: Dependencias

Para cada agent instalado que possui campo `dependencies`:
- Verificar que tasks referenciadas existem em `.aios-core/development/tasks/`
- Verificar que templates referenciados existem em `.aios-core/development/templates/`
- Verificar que checklists referenciados existem em `.aios-core/development/checklists/`
- Dependencias ausentes → MISSING

### Verificacao 5: Schema Compliance

Executar **Validacao por Schema** (Procedimentos Comuns) em cada agent instalado.
- Ler o agent source de `file_path` no CSV
- Validar contra o schema
- Reportar ERRORS e WARNINGS por agent

**Edge case:** Se schemas nao encontrados em `.aios-core/schemas/` → pular esta verificacao com aviso: "Schemas nao encontrados. Verificacao 5 pulada."

### Verificacao 6: Squad Integrity

Para cada squad em `./squads/`:
- `squad.yaml` parsea corretamente → PASS / FAIL
- Agents listados em `components.agents` existem no manifest → PASS / MISSING
- Tasks tem slash commands correspondentes → PASS / MISSING

### Relatorio Health Check

```
🏥 Health Check — Artefatos AIOS

  1. Manifest → Disco
     ✓ dev — PASS
     ✓ qa — PASS
     ✗ custom-agent — MISSING: .antigravity/agents/custom-agent.md

  2. Orfaos (Disco → Manifest)
     ✓ Nenhum orfao encontrado

  3. Slash Commands
     ✓ Todos os slash commands tem agent valido

  4. Dependencias
     ✓ dev — PASS (12 tasks, 3 templates, 2 checklists)
     ⚠ custom-agent — MISSING: tasks/custom-task.md

  5. Schema Compliance
     ✓ dev — 0 errors, 0 warnings
     ⚠ custom-agent — 0 errors, 2 warnings

  6. Squad Integrity
     (nenhum squad instalado)

  Overall: 2 issues found (1 MISSING, 1 WARNING)
```

**Edge cases:**
- Sem agents (CSV vazio) → "No artifacts to check. O manifest esta vazio."
- Schema files ausentes → pular check 5 com aviso
- Sem squads → indicar "(nenhum squad instalado)" no check 6

---

## 8. Inbox

Quando o usuario escolher inbox (opcao 7), ou quando quiser gerenciar a pasta inbox manualmente:

### Funcionalidade

1. **Verificar inbox:**
   ```
   📥 Inbox — .aios-core/inbox/

   {Se pasta nao existe}:
     Pasta inbox nao encontrada. Criando...
     ✓ Pasta .aios-core/inbox/ criada.

     Para usar: Copie artefatos (.md de agents ou pastas de squads) para .aios-core/inbox/
     Depois execute /aios-integrate e eles serao detectados automaticamente.

   {Se pasta existe e vazia}:
     Inbox vazio. Nenhum artefato para integrar.

   {Se pasta existe com artefatos}:
     Artefatos no inbox:
       1. agent-helper.md — Agent "helper" (detectado)
       2. code-reviewer.md — Agent "code-reviewer" (detectado)
       3. etl-squad/ — Squad (detectado)
       4. invalid.txt — ⚠️ Formato nao reconhecido (sera ignorado)

     Opcoes:
       1. Integrar todos ({N} artefatos validos)
       2. Selecionar quais integrar
       3. Dry-run (preview sem integrar)
       4. Limpar inbox (mover tudo para .processed/)
       5. Voltar ao menu principal
   ```

2. **Integrar do inbox:**
   - Execute integracao batch (mesmo fluxo da secao 2 com batch mode)
   - Para cada artefato integrado com sucesso, mova para `.aios-core/inbox/.processed/`
   - Artefatos que falharem permanecem no inbox

3. **Relatorio:**
   ```
   📥 Inbox — Relatorio

     Processados: {N} artefatos
     Integrados: {N} ✓
     Falhas: {N} ✗
     Ignorados: {N} (formato invalido)

     Movidos para .processed/: {N} arquivos

     Artefatos restantes no inbox: {N}
   ```

### Estrutura do Inbox

```
.aios-core/inbox/
├── agent-helper.md          ← Artefatos pendentes
├── code-reviewer.md
├── etl-squad/
│   └── squad.yaml
└── .processed/              ← Artefatos ja integrados (auto-criado)
    ├── old-agent.md
    └── old-squad/
```

### Regras do Inbox

- A pasta `.aios-core/inbox/` e criada automaticamente na primeira vez que o usuario acessa a opcao 7
- Artefatos processados sao movidos para `.aios-core/inbox/.processed/` (nao deletados)
- Arquivos com formato nao reconhecido sao ignorados silenciosamente na integracao (listados no relatorio)
- O auto-detect (secao 0) roda toda vez que `/aios-integrate` e executado
- Dry-run funciona normalmente para artefatos do inbox
- IDs duplicados seguem a mesma regra: perguntar se quer atualizar

---

## Validacoes

Resumo das validacoes aplicadas em cada operacao:

| Operacao | Validacoes |
|----------|-----------|
| Integrar | Schema compliance, ID duplicado no manifest, dependencias |
| Atualizar | Schema compliance, ID match entre versoes, compatibilidade de versao |
| Remover | Verificar dependencias quebradas, confirmar arquivos existentes |
| Health Check | Todas as 6 verificacoes |
| Inbox | Deteccao de tipo, schema compliance (mesmo da integracao) |

**Regra de ID duplicado:** Antes de integrar, verificar se `agent.id` ja existe no manifest. Se sim, informar e perguntar:
- "O agent '{id}' ja esta instalado (v{version}). Deseja **atualizar** para a nova versao?"
- Se sim → redirecionar para fluxo de Atualizar
- Se nao → cancelar integracao

**Validacao de dependencias:** Se o agent/squad referencia tasks ou templates em `dependencies`, verificar se existem nos paths esperados. Se nao existirem, exibir WARNING (nao bloquear).

---

## Paths de Referencia

| Artefato | Path |
|----------|------|
| Agent definitions | `.codex/agents/` |
| Agent workflows | `.agent/workflows/` |
| Agent activation | `.antigravity/agents/` |
| Agent manifest (8 colunas) | `.aios-core/manifests/agents.csv` |
| Manifest schema | `.aios-core/manifests/schema/manifest-schema.json` |
| Squad folders | `./squads/` |
| Slash commands | `.claude/commands/` |
| Agent schema | `.aios-core/schemas/agent-v3-schema.json` |
| Squad schema | `.aios-core/schemas/squad-schema.json` |
| Tasks | `.aios-core/development/tasks/` |
| Templates | `.aios-core/development/templates/` |
| Checklists | `.aios-core/development/checklists/` |
| Inbox | `.aios-core/inbox/` |
| Inbox processed | `.aios-core/inbox/.processed/` |
