# /aios-help — Guia de Comandos AIOS

Voce e um assistente que ajuda o usuario a navegar pelos comandos e skills disponiveis no AIOS Framework.

## Instrucoes

Quando o usuario executar `/aios-help`, apresente o menu principal:

### Menu Principal

```
📚 AIOS Help — Guia de Comandos

Escolha uma opcao:

  1. Quick reference (cheatsheet)
  2. Detalhes de uma skill
  3. "O que devo usar para...?" (busca por situacao)
  4. Workflow completo (passo a passo)

  0. Sair

Digite o numero da opcao:
```

Aguarde a resposta do usuario antes de prosseguir.

---

## Opcao 1: Quick Reference (Cheatsheet)

Exiba a tabela completa de skills:

```
📋 AIOS Skills — Quick Reference

┌──────────────────┬──────────────────────────────────────────────────┐
│ Skill            │ O que faz                                        │
├──────────────────┼──────────────────────────────────────────────────┤
│ /aios-integrate  │ Gerenciar artefatos (agents/squads)              │
│                  │   Integrar, atualizar, remover, listar,          │
│                  │   exportar, health check, inbox                  │
├──────────────────┼──────────────────────────────────────────────────┤
│ /aios-story      │ Ciclo de vida de stories                         │
│                  │   Criar, validar, desenvolver, QA gate,          │
│                  │   status, proxima acao                           │
├──────────────────┼──────────────────────────────────────────────────┤
│ /aios-epic       │ Gestao de epics                                  │
│                  │   Criar (greenfield/brownfield), executar,       │
│                  │   status dashboard, listar                       │
├──────────────────┼──────────────────────────────────────────────────┤
│ /aios-qa         │ QA toolkit completo                              │
│                  │   Quick scan, QA gate, QA loop, gerar testes,   │
│                  │   risk profile, security scan, browser check    │
├──────────────────┼──────────────────────────────────────────────────┤
│ /aios-publish    │ Release management                               │
│                  │   Release completo, version bump, pre-push gate,│
│                  │   npm publish                                    │
├──────────────────┼──────────────────────────────────────────────────┤
│ /aios-bootstrap  │ Setup de projeto                                 │
│                  │   Greenfield, brownfield discovery, team setup,  │
│                  │   GitHub config, doctor                          │
├──────────────────┼──────────────────────────────────────────────────┤
│ /aios-help       │ Este guia                                        │
│                  │   Quick reference, detalhes, busca, workflows   │
└──────────────────┴──────────────────────────────────────────────────┘

Dica: Use /aios-help opcao 2 para ver detalhes de qualquer skill.
```

Depois pergunte: "Deseja ver detalhes de alguma skill ou voltar ao menu? (numero/0)"

---

## Opcao 2: Detalhes de uma Skill

1. **Liste as skills:**
   ```
   📖 Detalhes — Selecione uma skill:

     1. /aios-integrate
     2. /aios-story
     3. /aios-epic
     4. /aios-qa
     5. /aios-publish
     6. /aios-bootstrap

   Selecione (ou 0 para voltar):
   ```

2. **Exiba detalhes completos da skill selecionada:**

   **Para /aios-integrate:**
   ```
   📖 /aios-integrate — Gerenciador de Artefatos

   Descricao: Gerencia o ciclo de vida de artefatos AIOS (agents e squads).

   Opcoes do menu:
     1. Integrar artefato externo — Importar agent/squad (.md, .zip, pasta)
     2. Atualizar artefato — Atualizar versao mantendo customizacoes
     3. Remover artefato — Desinstalar com limpeza completa
     4. Listar artefatos — Dashboard com filtros por tipo/status
     5. Exportar artefatos — Empacotar em .zip para compartilhar
     6. Health check — Verificar integridade de tudo
     7. Inbox — Integrar artefatos da pasta .aios-core/inbox/

   Quando usar:
     - Adicionou um novo agent e quer ativar no projeto
     - Precisa verificar se todos artefatos estao integros
     - Quer compartilhar um agent com outro projeto
     - Tem artefatos na pasta inbox esperando integracao

   Agents envolvidos: Nenhum especifico (operacional)
   ```

   **Para /aios-story:**
   ```
   📖 /aios-story — Operacoes de Story

   Descricao: Gerencia o ciclo de vida completo de stories (criar → validar → desenvolver → QA).

   Opcoes do menu:
     1. Criar nova story — @sm cria a partir de epic/PRD
     2. Validar story — @po aplica checklist 10 pontos
     3. Desenvolver story — @dev implementa (YOLO/Interactive/Pre-Flight)
     4. QA Gate — @qa executa 7 checks de qualidade
     5. Ver status — Dashboard da story
     6. Proxima acao — Auto-detecta fase e sugere

   Quando usar:
     - Inicio de sprint: criar stories do epic
     - Story escrita: validar antes de desenvolver
     - Story pronta: iniciar desenvolvimento
     - Codigo pronto: rodar QA gate
     - Perdido: usar opcao 6 para saber o proximo passo

   Ciclo: Draft → Ready → InProgress → InReview → Done
   Agents: @sm (criar), @po (validar), @dev (desenvolver), @qa (QA)
   ```

   **Para /aios-epic:**
   ```
   📖 /aios-epic — Gestao de Epics

   Descricao: Cria e gerencia epics que agrupam stories relacionadas.

   Opcoes do menu:
     1. Criar epic — Greenfield (novo) ou brownfield (existente)
     2. Executar epic — Roda Story Development Cycle para cada story
     3. Ver status — Dashboard com progresso por story
     4. Listar epics — Tabela de todos os epics do projeto

   Quando usar:
     - Inicio de projeto: criar epic principal
     - Projeto existente: brownfield discovery + epic
     - Acompanhamento: ver progresso do epic
     - Planejamento: listar e priorizar epics

   Agents: @pm (criar/executar), @architect (brownfield)
   ```

   **Para /aios-qa:**
   ```
   📖 /aios-qa — QA Toolkit

   Descricao: Suite completa de ferramentas de qualidade.

   Opcoes do menu:
     1. Quick scan — Testes + lint rapido
     2. QA Gate completo — 7 checks formais com veredicto
     3. QA Loop — Ciclo review → fix → re-review (max 5x)
     4. Gerar testes — Criar testes para story ou arquivo
     5. Risk profile — Avaliar risco em 5 dimensoes
     6. Security scan — OWASP Top 10 check
     7. Browser console check — Erros no frontend

   Quando usar:
     - Antes de commit: quick scan (opcao 1)
     - Story pronta: QA gate formal (opcao 2)
     - QA reprovou: QA loop para iterar (opcao 3)
     - Sem testes: gerar automaticamente (opcao 4)
     - Feature critica: avaliar risco (opcao 5)
     - Antes de deploy: security scan (opcao 6)
     - Bug no frontend: browser check (opcao 7)

   Agent principal: @qa (com @dev no QA loop)
   ```

   **Para /aios-publish:**
   ```
   📖 /aios-publish — Release Management

   Descricao: Gerencia versionamento, changelog e publicacao.

   Opcoes do menu:
     1. Release completo — Version + changelog + tag + push + publish
     2. Version bump — Analise de commits e bump
     3. Pre-push quality gate — Checks antes do push
     4. Publish npm — Preview tag → promote latest

   Quando usar:
     - Sprint finalizado: release completo (opcao 1)
     - Quer saber a proxima versao: version bump (opcao 2)
     - Antes de push: quality gate (opcao 3)
     - Publicar pacote: npm publish (opcao 4)

   Agent: @devops (exclusivo para push/publish)
   Padrao: Conventional Commits (feat→MINOR, fix→PATCH, breaking→MAJOR)
   ```

   **Para /aios-bootstrap:**
   ```
   📖 /aios-bootstrap — Setup de Projeto

   Descricao: Configura projetos novos ou integra AIOS em projetos existentes.

   Opcoes do menu:
     1. Novo projeto (greenfield) — Setup do zero com stack wizard
     2. Projeto existente (brownfield) — Discovery 10 fases
     3. Configurar team — Presets de agents
     4. Setup GitHub — CI/CD, branch protection, CodeRabbit
     5. Doctor — Verificar CLIs, auth, deps

   Quando usar:
     - Projeto novo: greenfield (opcao 1)
     - Entrando em projeto existente: brownfield (opcao 2)
     - Configurar agents: team preset (opcao 3)
     - Precisa CI/CD: GitHub setup (opcao 4)
     - Algo nao funciona: doctor (opcao 5)

   Agents: @pm (greenfield), @architect + @qa + @analyst (brownfield), @devops (GitHub)
   ```

---

## Opcao 3: "O que devo usar para...?" (Busca por Situacao)

1. **Pergunte a situacao:**
   ```
   🔍 Busca por Situacao

   Descreva o que voce quer fazer:
     (ex: "criar um projeto novo", "rodar testes", "publicar versao")
   ```

2. **Mapeie a situacao para skills:**

   Use esta tabela de mapeamento (busca por keywords):

   | Situacao / Keywords | Skill | Opcao |
   |---------------------|-------|-------|
   | criar projeto, projeto novo, setup, iniciar | /aios-bootstrap | 1 |
   | projeto existente, legacy, tech debt, discovery | /aios-bootstrap | 2 |
   | configurar agents, team, squad | /aios-bootstrap | 3 |
   | CI/CD, GitHub Actions, branch protection | /aios-bootstrap | 4 |
   | verificar ambiente, doctor, problema | /aios-bootstrap | 5 |
   | criar story, nova story | /aios-story | 1 |
   | validar story, checklist | /aios-story | 2 |
   | desenvolver, implementar, codar | /aios-story | 3 |
   | QA, quality gate, revisar codigo | /aios-story | 4 ou /aios-qa | 2 |
   | status story, ver story | /aios-story | 5 |
   | proximo passo, o que fazer | /aios-story | 6 |
   | criar epic, novo epic | /aios-epic | 1 |
   | executar epic, rodar epic | /aios-epic | 2 |
   | status epic, progresso | /aios-epic | 3 |
   | testes, rodar testes, lint | /aios-qa | 1 |
   | QA loop, re-review, iterar | /aios-qa | 3 |
   | gerar testes, criar testes | /aios-qa | 4 |
   | risco, risk, avaliar | /aios-qa | 5 |
   | security, seguranca, OWASP | /aios-qa | 6 |
   | browser, console, frontend | /aios-qa | 7 |
   | release, versao, publicar, deploy | /aios-publish | 1 |
   | version bump, bump | /aios-publish | 2 |
   | pre-push, antes push | /aios-publish | 3 |
   | npm publish, publicar pacote | /aios-publish | 4 |
   | integrar agent, importar, novo agent | /aios-integrate | 1 |
   | atualizar agent | /aios-integrate | 2 |
   | remover agent | /aios-integrate | 3 |
   | listar agents, quais agents | /aios-integrate | 4 |
   | exportar, compartilhar agent | /aios-integrate | 5 |
   | health check, integridade | /aios-integrate | 6 |
   | inbox | /aios-integrate | 7 |

3. **Exiba a recomendacao:**
   ```
   💡 Recomendacao

   Para "{situacao descrita}":

     Skill: /aios-{skill}
     Opcao: {N} — {descricao}

     Como usar: Execute /aios-{skill} e selecione opcao {N}

   Deseja executar agora? (s/n)
   ```

4. **Se multiplas skills forem relevantes:**
   ```
   💡 Encontrei {N} opcoes relevantes:

     1. /aios-qa opcao 2 — QA Gate completo (mais formal)
     2. /aios-story opcao 4 — QA Gate via story (com contexto da story)

   Qual prefere? (numero ou 0 para voltar)
   ```

---

## Opcao 4: Workflow Completo (Passo a Passo)

1. **Liste workflows comuns:**
   ```
   🗺️ Workflows AIOS — Passo a Passo

   Workflows disponiveis:
     1. Projeto novo do zero (greenfield completo)
     2. Entrar em projeto existente (brownfield)
     3. Ciclo de desenvolvimento de story
     4. Sprint completo (epic → stories → QA → release)
     5. Sessao de QA rapida
     6. Release de versao

   Selecione (ou 0 para voltar):
   ```

2. **Exiba o passo a passo do workflow selecionado:**

   **Workflow 1 — Projeto novo:**
   ```
   🗺️ Workflow: Projeto Novo (Greenfield)

   Passo a passo:

     1. /aios-bootstrap → opcao 1 (Greenfield)
        Configurar projeto, stack, framework

     2. /aios-bootstrap → opcao 3 (Team)
        Selecionar preset de agents

     3. /aios-bootstrap → opcao 4 (GitHub)
        Configurar CI/CD e protecao

     4. /aios-epic → opcao 1 (Criar epic)
        Definir primeiro epic do projeto

     5. /aios-story → opcao 1 (Criar story)
        Criar primeira story do epic

     6. /aios-story → opcao 2 (Validar)
        Validar a story criada

     7. /aios-story → opcao 3 (Desenvolver)
        Implementar a story

     8. /aios-qa → opcao 2 (QA Gate)
        Verificar qualidade

     9. /aios-publish → opcao 1 (Release)
        Publicar primeira versao

   Tempo estimado: Variavel (depende da complexidade)

   Deseja iniciar pelo passo 1? (s/n)
   ```

   **Workflow 2 — Brownfield:**
   ```
   🗺️ Workflow: Projeto Existente (Brownfield)

   Passo a passo:

     1. /aios-bootstrap → opcao 5 (Doctor)
        Verificar ambiente e pre-requisitos

     2. /aios-bootstrap → opcao 2 (Brownfield)
        Executar discovery (10 fases, analise completa)

     3. /aios-bootstrap → opcao 3 (Team)
        Configurar agents para o projeto

     4. /aios-epic → opcao 2 (Executar)
        Executar o epic gerado pelo discovery

     5. /aios-story → opcao 6 (Proxima acao)
        Seguir as stories priorizadas

   Deseja iniciar pelo passo 1? (s/n)
   ```

   **Workflow 3 — Ciclo de Story:**
   ```
   🗺️ Workflow: Ciclo de Desenvolvimento de Story

   Passo a passo:

     1. /aios-story → opcao 1 (Criar)
        Criar story a partir do epic/PRD

     2. /aios-story → opcao 2 (Validar)
        Validar com checklist 10 pontos

     3. /aios-story → opcao 3 (Desenvolver)
        Implementar (escolher modo: YOLO/Interactive/Pre-Flight)

     4. /aios-qa → opcao 1 (Quick scan)
        Verificacao rapida antes do QA formal

     5. /aios-story → opcao 4 (QA Gate)
        QA Gate formal com 7 checks

     6. Se FAIL: /aios-qa → opcao 3 (QA Loop)
        Iterar ate aprovacao

     7. /aios-publish → opcao 3 (Pre-push)
        Quality gate antes do push

   Deseja iniciar pelo passo 1? (s/n)
   ```

   **Workflow 4 — Sprint completo:**
   ```
   🗺️ Workflow: Sprint Completo

   Passo a passo:

     1. /aios-epic → opcao 3 (Status)
        Ver estado atual do epic

     2. /aios-epic → opcao 2 (Executar)
        Executar epic (processa stories automaticamente)

     3. Para cada story no epic:
        a. /aios-story → opcao 6 (Proxima acao) — auto-detecta
        b. Seguir sugestao (validar/desenvolver/QA)

     4. /aios-qa → opcao 5 (Risk profile)
        Avaliar risco do sprint

     5. /aios-publish → opcao 1 (Release)
        Publicar versao do sprint

   Deseja iniciar pelo passo 1? (s/n)
   ```

   **Workflow 5 — Sessao QA:**
   ```
   🗺️ Workflow: Sessao de QA Rapida

   Passo a passo:

     1. /aios-qa → opcao 1 (Quick scan)
        Testes + lint rapido

     2. /aios-qa → opcao 6 (Security)
        Verificacao OWASP

     3. /aios-qa → opcao 2 (QA Gate)
        QA Gate formal

     4. Se issues: /aios-qa → opcao 3 (QA Loop)
        Iterar fixes

     5. /aios-qa → opcao 7 (Browser)
        Verificar console do frontend (se aplicavel)

   Deseja iniciar pelo passo 1? (s/n)
   ```

   **Workflow 6 — Release:**
   ```
   🗺️ Workflow: Release de Versao

   Passo a passo:

     1. /aios-qa → opcao 1 (Quick scan)
        Verificar testes estao passando

     2. /aios-publish → opcao 3 (Pre-push)
        Quality gate pre-push

     3. /aios-publish → opcao 1 (Release completo)
        Version bump + changelog + tag + push + publish

   Deseja iniciar pelo passo 1? (s/n)
   ```

---

## Regras Gerais

### Navegacao
- Apos cada operacao, sempre pergunte se quer voltar ao menu principal
- "0" em qualquer menu volta ao menu anterior
- Se o usuario pedir para executar, abra a skill correspondente

### Tom
- Educativo e acessivel
- Sempre mostre exemplos praticos
- Sugira o workflow mais provavel baseado no contexto do projeto

### Deteccao de Contexto
- Se `.aios-core/` nao existe → Sugerir /aios-bootstrap primeiro
- Se nenhum epic existe → Sugerir /aios-epic opcao 1
- Se epics existem mas sem stories → Sugerir /aios-story opcao 1
- Se stories InProgress → Sugerir /aios-qa ou /aios-story opcao 6
