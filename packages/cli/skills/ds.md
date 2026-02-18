# ds

Assistente central do Design System Manager. Apresenta um menu interativo e guia o usuário pela operação desejada.

## Ativação

Ativado via `/ds` no Claude Code.

## Menu Principal

Ao ser ativado, sempre apresente:

```
🎨 Design System Manager

Projeto: {nome do package.json ou nome do diretório}
DS ativo: {nome do DS ativo em design-systems/manifest.json, ou "nenhum"}

O que deseja fazer?

  1. 📦 Empacotar   — empacotar um DS existente em .dspack
  2. 📥 Instalar    — instalar um .dspack neste projeto
  3. 📋 Listar      — ver DSs instalados e disponíveis
  4. 🎨 Aplicar     — aplicar o DS ativo no projeto
  5. ❓ Ajuda       — ver dicas e comandos diretos

  0. Sair

Digite o número da opção:
```

## Opção 1 — Empacotar

Execute o fluxo completo de `/ds-pack`:

### Passo 1 — Caminho do DS
```
📦 Empacotar Design System

Informe o caminho do design system:
(ex: ./src/design-system, ./tokens, ./ui)
```

### Passo 2 — Confirmar inventário
Escaneie o diretório e exiba o que foi encontrado:
```
Encontrado em {caminho}:

  Tokens:      {N} arquivo(s) — {lista}
  Atoms:       {N} componente(s)
  Molecules:   {N} componente(s)
  Organisms:   {N} componente(s)

  Nome sugerido: {nome-inferido}
  Versão:        1.0.0

Confirmar e empacotar? (s/n)
```

### Passo 3 — Empacotar e salvar
```bash
zip -r "design-systems/{nome}.dspack" "{caminho-absoluto}/" \
  -x "*/node_modules/*" -x "*/.git/*" -x "*/dist/*" -x "*/build/*"
```

### Resultado
```
✅ Empacotado!

  design-systems/{nome}.dspack — {tamanho}

  Próximo passo:
    2 → Instalar em outro projeto
    0 → Sair

Digite:
```

---

## Opção 2 — Instalar

Execute o fluxo completo de `/ds-install`:

### Passo 1 — Selecionar arquivo
Escaneie `design-systems/*.dspack` e liste:
```
📥 Instalar Design System

Arquivos disponíveis:
  1. eximia-default.dspack
  2. meu-ds.dspack
  3. Informar outro caminho...

Selecione:
```

### Passo 2 — Validar
```
Validando {nome}.dspack...
  ✅ Arquivo válido
  ✅ manifest.json encontrado
  Nome: {nome} | Versão: {versão}

Instalar? (s/n)
```

### Passo 3 — Extrair e atualizar manifest
```bash
unzip -o "{caminho-absoluto}.dspack" -d "design-systems/{nome}/"
```
Atualizar `design-systems/manifest.json` fazendo merge no array `installed`.

### Resultado
```
✅ Instalado!

  {nome} v{versão} — ativo

  Próximo passo:
    4 → Aplicar no projeto
    0 → Sair

Digite:
```

---

## Opção 3 — Listar

Execute o fluxo de `/ds-list` e exiba:

```
📋 Design Systems — {projeto}

Instalados:
  ✅ eximia-default  v1.0.0  (ativo)
  ○  meu-ds          v2.1.0

Disponíveis para instalar:
  📦 outro-ds.dspack

─────────────────────────
  1 → Empacotar   2 → Instalar   4 → Aplicar   0 → Sair

Digite:
```

---

## Opção 4 — Aplicar

Execute o fluxo completo de `/ds-apply`:

### Passo 1 — Verificar DS ativo
Ler `design-systems/manifest.json → active`.
Se nenhum ativo, mostrar opção 3 antes de continuar.

### Passo 2 — Detectar stack (silencioso)
Antes de perguntar qualquer coisa, leia `package.json` e a estrutura de diretórios.

### Passo 3 — Wizard contextual
```
🎨 Aplicar DS — {nome} v{versão}

Stack detectada: {framework} + {css-approach}
Componentes:     {pasta-detectada}

O que aplicar?
  1. Apenas tokens  ({formato} → {arquivo-destino})
  2. Apenas componentes ({N} atoms, {N} molecules, {N} organisms)
  3. Tudo
  4. Interativo (arquivo por arquivo)

Selecione:
```

### Passo 4 — Preview antes de aplicar
```
Será aplicado:

  Tokens:
    → {arquivo-destino} {novo | mesclar com existente}

  Componentes:
    → {pasta}/atoms/     ({N} arquivos)
    → {pasta}/molecules/ ({N} arquivos)

Confirmar? (s/n)
```

### Passo 5 — Aplicar e confirmar
Executar. Se conflito de arquivo:
```
⚠️  {arquivo} já existe.
    Sobrescrever? (s = este | t = todos | n = pular)
```

### Resultado
```
✅ DS aplicado!

  {N} token(s) → {destino}
  {N} componente(s) → {pasta}

  ⚠️  Revise os imports antes de commitar.

  0 → Sair

Digite:
```

---

## Opção 5 — Ajuda

```
❓ Design System Manager — Ajuda

Comandos diretos (atalhos):
  /ds-pack    → empacotar diretamente
  /ds-install → instalar diretamente
  /ds-list    → listar diretamente
  /ds-apply   → aplicar diretamente

Formato .dspack:
  → Arquivo zip com manifest.json na raiz
  → Estrutura Atomic Design (atoms/molecules/organisms/templates)
  → Tokens em DTCG JSON, CSS vars ou Tailwind config

Pasta design-systems/:
  → Ignorada pelo git (cada dev instala localmente)
  → manifest.json rastreia DSs instalados e DS ativo

  0 → Voltar ao menu

Digite:
```

---

## Regras Gerais

- Sempre ler `design-systems/manifest.json` ao iniciar para exibir estado atual
- Após cada operação, sempre oferecer próximo passo sugerido ou retorno ao menu
- Nunca sobrescrever arquivos sem confirmação explícita
- Detectar stack **antes** de exibir opções de aplicação
- Se `design-systems/` não existir, orientar: `npm install @eximia-ventures/ds`
