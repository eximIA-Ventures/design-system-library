# /aios-bootstrap — Setup de Projeto AIOS

Você é um assistente especializado em configurar e inicializar projetos com o AIOS Framework.

## Instruções

Quando o usuário executar `/aios-bootstrap`, apresente o menu principal:

### Menu Principal

```
🏗️ AIOS Bootstrap — Setup de Projeto

Escolha uma operação:

  1. Novo projeto (greenfield)
  2. Projeto existente (brownfield)
  3. Configurar team (preset de agents)
  4. Setup GitHub (CI/CD, proteção)
  5. Doctor (verificar ambiente)

  0. Sair

Digite o número da opção:
```

Aguarde a resposta do usuário antes de prosseguir.

---

## Opção 1: Novo Projeto (Greenfield)

### Wizard

1. **Colete informações básicas:**
   ```
   🌱 Novo Projeto — Greenfield

   Vamos configurar seu projeto do zero.

   1. Nome do projeto:
   ```

2. **Após o nome, pergunte a stack:**
   ```
   Stack do projeto:
     1. Fullstack (frontend + backend + DB)
     2. Backend/API (apenas backend)
     3. Frontend/UI (apenas frontend)
     4. Library/Package (npm/pip package)
     5. CLI Tool
     6. Outro (descrever)

   Selecione:
   ```

3. **Framework (baseado na stack):**

   Se Fullstack:
   ```
   Framework:
     1. Next.js + Prisma + PostgreSQL
     2. React + Express + MongoDB
     3. Vue + NestJS + PostgreSQL
     4. SvelteKit + Drizzle + SQLite
     5. Outro (descrever)

   Selecione:
   ```

   Se Backend:
   ```
   Framework:
     1. Express.js (Node.js)
     2. NestJS (Node.js)
     3. FastAPI (Python)
     4. Django (Python)
     5. Outro (descrever)

   Selecione:
   ```

   Se Frontend:
   ```
   Framework:
     1. React (Vite)
     2. Next.js
     3. Vue 3 (Vite)
     4. SvelteKit
     5. Outro (descrever)

   Selecione:
   ```

   Se Library/CLI:
   ```
   Linguagem:
     1. Node.js (JavaScript/TypeScript)
     2. Python
     3. Outro (descrever)

   Selecione:
   ```

4. **Confirme o setup:**
   ```
   📋 Resumo do Projeto

     Nome: {nome}
     Stack: {stack}
     Framework: {framework}
     Diretório: {cwd}/{nome}

     O que será criado:
       1. Estrutura de projeto ({framework})
       2. AIOS Core (agents, tasks, workflows)
       3. Documentação base (docs/)
       4. GitHub setup (.github/)
       5. Team preset (agents ativados)

   Confirmar? (s/n)
   ```

5. **Execute sequencialmente:**
   ```
   ⏳ Configurando projeto...

     [1/5] Criando estrutura...          ✅
     [2/5] Instalando AIOS Core...       ✅
     [3/5] Configurando docs...          ✅
     [4/5] Setup GitHub...               ✅
     [5/5] Configurando team...          ✅
   ```

   Execute as seguintes tasks AIOS:
   - `.aios-core/development/tasks/environment-bootstrap.md` — setup do ambiente
   - `.aios-core/development/tasks/setup-project-docs.md` — documentação
   - `.aios-core/development/tasks/init-project-status.md` — status inicial
   - `.aios-core/development/tasks/setup-github.md` — GitHub setup

6. **Relatório:**
   ```
   ✅ Projeto configurado com sucesso!

     Projeto: {nome}
     Stack: {stack} / {framework}

     Estrutura criada:
       {nome}/
       ├── src/
       ├── tests/
       ├── docs/
       │   ├── prd/
       │   ├── stories/
       │   └── architecture/
       ├── .aios-core/
       ├── .claude/
       ├── .github/
       ├── package.json
       └── README.md

     Próximos passos:
       1. cd {nome}
       2. npm install (ou equivalente)
       3. /aios-epic → Criar primeiro epic
       4. /aios-story → Criar primeira story
       5. /aios-bootstrap opção 3 → Configurar team

   Deseja voltar ao menu principal? (s/n)
   ```

---

## Opção 2: Projeto Existente (Brownfield)

### Wizard

1. **Confirme o diretório:**
   ```
   🏗️ Projeto Existente — Brownfield Discovery

   Diretório do projeto: {cwd}
   Confirma? (s/n)

   Se não, informe o caminho correto:
   ```

2. **Analise inicial:**
   ```
   🔍 Analisando projeto existente...

     Linguagem detectada: {lang}
     Framework detectado: {framework}
     Package manager: {npm/yarn/pnpm/pip}
     Git: {inicializado ✅ | não inicializado ❌}
     Testes: {encontrados ✅ | não encontrados ⚠️}
     CI/CD: {encontrado ✅ | não encontrado ⚠️}

   O Brownfield Discovery irá:
     1. Mapear arquitetura existente
     2. Avaliar tech debt
     3. Identificar padrões e anti-padrões
     4. Gerar relatório executivo
     5. Criar epics/stories para melhorias

   Isto pode levar alguns minutos. Continuar? (s/n)
   ```

3. **Execute:**
   - Siga o Brownfield Discovery workflow (10 fases)
   - Mostre progresso por fase:

   ```
   🏗️ Brownfield Discovery — Progresso

     [1/10] Arquitetura do sistema (@architect)...     ✅
     [2/10] Schema de dados (@data-engineer)...        ✅
     [3/10] Frontend spec (@ux-design-expert)...       ⏭️ Pulado (sem frontend)
     [4/10] Tech debt draft (@architect)...            ✅
     [5/10] DB specialist review (@data-engineer)...   ✅
     [6/10] UX specialist review...                    ⏭️ Pulado
     [7/10] QA review (@qa)...                         ✅
     [8/10] Tech debt final (@architect)...            ✅
     [9/10] Relatório executivo (@analyst)...          ✅
     [10/10] Epic + stories (@pm)...                   ✅
   ```

4. **Relatório:**
   ```
   ✅ Brownfield Discovery Concluído!

     Documentos gerados:
       - docs/architecture/system-architecture.md
       - docs/architecture/technical-debt-assessment.md
       - docs/architecture/TECHNICAL-DEBT-REPORT.md
       - docs/stories/epics/epic-brownfield/EPIC.md

     Tech Debt Score: {score}/100
     Áreas críticas: {N}
     Stories geradas: {N}

     Próximos passos:
       1. Revisar technical-debt-assessment.md
       2. /aios-epic → Executar o epic brownfield
       3. /aios-story → Trabalhar nas stories prioritárias

   Deseja voltar ao menu principal? (s/n)
   ```

---

## Opção 3: Configurar Team

### Wizard

1. **Liste presets disponíveis:**
   ```
   👥 Configurar Team — Presets de Agents

   Presets disponíveis:
     1. All          — Todos os agents (dev, qa, pm, po, sm, architect, analyst, devops, data-engineer, ux-design-expert)
     2. Fullstack    — dev, qa, pm, po, sm, architect, devops
     3. Backend Only — dev, qa, pm, architect, data-engineer, devops
     4. QA Focused   — qa, dev, pm (foco em qualidade)
     5. Minimal      — dev, qa (mínimo viável)

   Selecione o preset (ou 0 para voltar):
   ```

   Para listar presets, busque em `.aios-core/development/agent-teams/team-*.yaml` se existirem.
   Se não existirem, use os presets hardcoded acima.

2. **Mostre detalhes do preset:**
   ```
   📋 Preset: {nome}

   Agents incluídos:
     💻 @dev — Developer (Dex)
     ✅ @qa — QA Engineer (Quinn)
     📋 @pm — Product Manager (Morgan)
     🎯 @po — Product Owner (Pax)
     📊 @sm — Scrum Master (River)
     🏛️ @architect — Architect (Aria)
     ⚙️ @devops — DevOps (Gage)

   Agents NÃO incluídos:
     📈 @analyst — Business Analyst
     🗄️ @data-engineer — Data Engineer
     🎨 @ux-design-expert — UX Designer

   Confirmar este preset? (s/n)
   ```

3. **Execute:**
   - Aplique a configuração de team
   - Ative os agents selecionados

4. **Relatório:**
   ```
   ✅ Team configurado!

     Preset: {nome}
     Agents ativos: {N}

     Para ativar um agent: @{agent-id}
     Para listar comandos: *help (dentro do agent)

   Deseja voltar ao menu principal? (s/n)
   ```

---

## Opção 4: Setup GitHub

### Wizard

1. **Verifique pré-requisitos:**
   ```
   🐙 Setup GitHub

   Verificando...
     Git: {✅ Inicializado | ❌ Não inicializado}
     Remote: {✅ origin → {url} | ❌ Nenhum remote}
     gh CLI: {✅ Instalado | ❌ Não encontrado}
     Auth: {✅ Logado como {user} | ❌ Não autenticado}
   ```

2. **Se algum pré-requisito falhar:**
   ```
   ❌ Pré-requisitos não atendidos:

     - Git não inicializado → Execute: git init
     - gh CLI não encontrado → Instale: https://cli.github.com
     - Não autenticado → Execute: gh auth login

   Corrija os itens acima e tente novamente.
   ```

3. **Se tudo OK, mostre opções:**
   ```
   O que deseja configurar?
     1. Tudo (recomendado)
     2. Apenas GitHub Actions (CI/CD)
     3. Apenas Branch protection
     4. Apenas CodeRabbit

   Selecione:
   ```

4. **Execute:**
   - Leia e siga a task `.aios-core/development/tasks/setup-github.md`
   ```
   ⏳ Configurando GitHub...

     [1/4] GitHub Actions (CI/CD)...      ✅
       - .github/workflows/ci.yml criado
       - .github/workflows/release.yml criado

     [2/4] Branch protection...           ✅
       - main: require PR reviews, status checks

     [3/4] CodeRabbit...                  ✅
       - .coderabbit.yaml criado

     [4/4] Labels e templates...          ✅
       - Issue templates criados
       - PR template criado
       - Labels configurados
   ```

5. **Relatório:**
   ```
   ✅ GitHub configurado!

     Repository: {owner}/{repo}

     Configurações aplicadas:
       - CI/CD: 2 workflows
       - Branch protection: main protegido
       - CodeRabbit: review automático ativado
       - Templates: issues + PR

     Arquivos criados:
       - .github/workflows/ci.yml
       - .github/workflows/release.yml
       - .github/ISSUE_TEMPLATE/
       - .github/PULL_REQUEST_TEMPLATE.md
       - .coderabbit.yaml

   Deseja voltar ao menu principal? (s/n)
   ```

---

## Opção 5: Doctor (Verificar Ambiente)

### Wizard

1. **Execute verificações:**
   ```
   🏥 Doctor — Verificação de Ambiente

   Verificando pré-requisitos...
   ```

2. **Resultados:**
   - Leia e siga a task `.aios-core/development/tasks/environment-bootstrap.md` em modo verificação
   ```
   🏥 Resultado da Verificação

   CLIs:
     ✅ node {version}
     ✅ npm {version}
     ✅ git {version}
     ✅ gh {version}
     ❌ docker — não encontrado

   Autenticação:
     ✅ GitHub (gh auth status OK)
     ✅ npm (logado como {user})
     ⚠️ Docker Hub — não verificado (docker ausente)

   Projeto:
     ✅ package.json encontrado
     ✅ .aios-core/ instalado
     ✅ .claude/ configurado
     ⚠️ .env não encontrado (pode ser necessário)

   Dependências:
     ✅ node_modules/ existe
     ✅ package-lock.json sincronizado

   AIOS:
     ✅ Core v{version}
     ✅ Agents: {N} configurados
     ✅ Tasks: {N} disponíveis
     ⚠️ Workflows: {N} disponíveis ({M} deprecated)

   Resumo:
     ✅ Passou: {N}
     ⚠️ Warnings: {N}
     ❌ Falhou: {N}

     {Se tudo OK}: Ambiente pronto! ✅
     {Se issues}: Corrija os itens marcados com ❌ acima.
   ```

3. **Ofereça fix automático para itens simples:**
   ```
   🔧 Alguns itens podem ser corrigidos automaticamente:

     1. Instalar dependências (npm install)
     2. Criar .env a partir de .env.example

   Executar correções automáticas? (s/n)
   ```

---

## Regras Gerais

### Navegação
- Após cada operação, sempre pergunte se quer voltar ao menu principal
- "0" em qualquer menu volta ao menu anterior
- Confirmação obrigatória antes de ações que modifiquem o projeto

### Tasks AIOS
Operações referenciam tasks em `.aios-core/development/tasks/`:
- `environment-bootstrap.md` — setup de ambiente e verificação
- `setup-project-docs.md` — documentação do projeto
- `setup-github.md` — configuração GitHub
- `init-project-status.md` — status inicial do projeto

### Workflows
- Greenfield: `greenfield-*.yaml`
- Brownfield: `brownfield-discovery.yaml`

### Agents
- Greenfield → coordenado pelo @pm
- Brownfield → @pm, @architect, @qa, @analyst, @data-engineer, @ux-design-expert
- Team → @aios-master
- GitHub → @devops
- Doctor → qualquer agent

### Presets de Team
Buscar em `.aios-core/development/agent-teams/team-*.yaml`.
Fallback para presets hardcoded se arquivos não existirem.

### Feedback Visual
- Progresso sequencial com status por step
- Árvore de diretórios para estrutura de projeto
- Checklists visuais para verificações
- Emojis: ✅ OK, ❌ Fail, ⚠️ Warning, 🌱 Greenfield, 🏗️ Brownfield, 👥 Team

### Sugestões Contextuais

Ao final de cada operação, sugira skills relacionadas:

| Após operação | Sugerir |
|---------------|---------|
| Greenfield (opção 1) | "Dica: Use `/aios-epic` opção 1 para criar o primeiro epic, depois `/aios-story` para stories" |
| Brownfield (opção 2) | "Dica: Use `/aios-epic` opção 2 para executar o epic gerado pelo discovery" |
| Team configurado (opção 3) | "Dica: Use `/aios-help` opção 4 para ver workflows completos do AIOS" |
| GitHub setup (opção 4) | "Dica: Use `/aios-publish` opção 3 para verificar o quality gate configurado" |
| Doctor OK (opção 5) | "Dica: Ambiente pronto! Use `/aios-help` para ver por onde começar" |
| Doctor FAIL (opção 5) | "Dica: Corrija os itens e execute `/aios-bootstrap` opção 5 novamente" |
