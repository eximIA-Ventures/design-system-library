# ds-apply

Aplica o design system ativo no projeto atual — tokens e/ou componentes.

## Ativação

Ativado via `/ds-apply` no Claude Code.

## Processo

### 1. Identificar DS ativo

Leia `design-systems/manifest.json` → campo `active`.

Se `active` for `null` ou o manifest não existir:
```
❌ Nenhum DS ativo. Use /ds-list para ver os disponíveis.
```
Interromper.

### 2. Detectar stack do projeto

**Antes de qualquer pergunta**, analise o projeto:

- Leia `package.json` → dependências (`react`, `vue`, `tailwindcss`, `next`, etc.)
- Verifique se existem: `tailwind.config.*`, `src/styles/`, `src/components/`, `app/`, `components/`
- Determine:
  - Framework: React | Vue | Svelte | Vanilla | Next.js | Nuxt
  - CSS approach: Tailwind | CSS Modules | CSS vars | styled-components
  - Pasta de componentes: `src/components/` | `components/` | `app/components/` | outro

### 3. Ler manifest do DS

Leia `design-systems/{active}/manifest.json` para saber o que o DS oferece (tokens e componentes disponíveis).

### 4. Wizard de aplicação

Com a stack já detectada, apresente o wizard com informações contextuais:

```
🎨 ds:apply — {nome} v{versão}

Stack detectada: {framework} + {css-approach}
Componentes serão copiados para: {pasta-detectada}

O que deseja aplicar?
  1. Apenas tokens ({formato-detectado}: {arquivo-destino})
  2. Apenas componentes ({N} atoms, {N} molecules, {N} organisms)
  3. Tudo (tokens + componentes)
  4. Modo interativo (escolher arquivo por arquivo)

Selecione:
```

### 5. Aplicar tokens

Baseado na stack detectada, copie para o destino correto:

| Stack | Arquivo de destino |
|-------|--------------------|
| Tailwind | mesclar com `tailwind.config.*` (preservar configurações existentes) |
| CSS vars | `src/styles/tokens.css` (ou equivalente encontrado) |
| DTCG JSON | `src/tokens/tokens.json` |

> **Nunca sobrescrever** sem mostrar diff e pedir confirmação se o arquivo já existir.

### 6. Aplicar componentes

Se o destino detectado for diferente do padrão, confirme:

```
Pasta de componentes detectada: {pasta}
Confirma? (s/n ou informe outro caminho)
```

Copie mantendo a estrutura Atomic Design:
```
{pasta}/
├── atoms/
├── molecules/
├── organisms/
└── templates/
```

Se já existirem arquivos com o mesmo nome, pergunte antes de sobrescrever:
```
⚠️  Button.tsx já existe. Sobrescrever? (s/n/todos)
```

### 7. Confirmar

```
✅ Design System aplicado!

  DS: {nome} v{versão}

  Tokens:
    → {arquivo-destino}

  Componentes copiados:
    → {pasta}/atoms/     ({N} arquivos)
    → {pasta}/molecules/ ({N} arquivos)
    → {pasta}/organisms/ ({N} arquivos)

  ⚠️  Revise os imports antes de commitar.
      Alguns caminhos podem precisar de ajuste manual.
```

## Regras

- Detectar stack **antes** de exibir o wizard (para mostrar opções contextuais)
- Nunca sobrescrever arquivos sem confirmação
- Mesclar tokens com configurações existentes quando possível
- Seguir Atomic Design: atoms → molecules → organisms → templates
- Não aplicar tokens de um framework incompatível (ex: Tailwind tokens em projeto sem Tailwind)
