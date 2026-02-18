# ds-apply

Integra o design system instalado ao projeto — registra como ativo e prepara o contexto para o Brad Frost e o @dev implementarem.

**Este skill NÃO modifica código do projeto.**
A aplicação real (tokens no tailwind, componentes no src/) é responsabilidade do Brad Frost (`design:design-system`) e do @dev.

## Ativação

Ativado via `/ds-apply` no Claude Code.

## O que faz

1. Define o DS como ativo em `design-systems/manifest.json`
2. Valida a estrutura do DS (tokens, componentes, metodologia)
3. Gera um resumo de contexto para o Brad Frost e o @dev
4. Informa os próximos passos

## Processo

### 1. Identificar DS

Se o usuário passou argumento (`/ds-apply eximia-default`), usar esse.
Se não, ler `design-systems/manifest.json` e listar instalados:

```
🎨 ds:apply — Integrar Design System

DSs instalados:
  1. eximia-default  v1.0.0  (ativo)
  2. meu-ds          v2.1.0

Qual integrar? (Enter para usar o ativo)
```

### 2. Validar estrutura do DS

Verificar em `design-systems/{nome}/`:
- `manifest.json` existe e é válido
- Pasta `tokens/` ou arquivos de token presentes
- Estrutura Atomic Design presente (`atoms/`, `molecules/`, etc.) — se tiver componentes

Reportar o que foi encontrado:
```
Validando eximia-default...
  ✅ manifest.json  — v1.0.0, Atomic Design
  ✅ tokens/        — 3 arquivo(s): tokens.json, tokens.css, tokens.tw.js
  ✅ atoms/         — 12 componente(s)
  ✅ molecules/     — 8 componente(s)
  ✅ organisms/     — 4 componente(s)
  ⚠️  templates/   — vazio
```

### 3. Definir como ativo

Atualizar `design-systems/manifest.json`:
```json
{
  "active": "eximia-default"
}
```

### 4. Gerar contexto de handoff

Criar `design-systems/.ds-context.md` com as informações que o Brad Frost e o @dev precisam:

```markdown
# DS Ativo: eximia-default v1.0.0

## Localização
design-systems/eximia-default/

## Tokens disponíveis
- tokens/tokens.json    — W3C DTCG format
- tokens/tokens.css     — CSS custom properties
- tokens/tokens.tw.js   — Tailwind config

## Componentes disponíveis
Atoms (12):     Button, Input, Label, Badge, Icon, ...
Molecules (8):  FormField, SearchBar, Card, ...
Organisms (4):  Header, Sidebar, AuthForm, ...
Templates (0):  —

## Metodologia
Atomic Design (Brad Frost)

## Para o Brad Frost (@design-system)
Use `design-systems/eximia-default/` como fonte de tokens e componentes.
Não gere tokens novos — reutilize os existentes.

## Para o @dev
Importe componentes de `design-systems/eximia-default/components/`.
Tokens CSS disponíveis em `design-systems/eximia-default/tokens/tokens.css`.
```

### 5. Confirmar integração

```
✅ Design System integrado!

  DS ativo: eximia-default v1.0.0
  Local:    design-systems/eximia-default/
  Contexto: design-systems/.ds-context.md

  Próximos passos:
    → Brad Frost aplicará os tokens e componentes no projeto
    → @dev implementará os componentes conforme o DS

  Para iniciar: @brad-frost *setup ou *build {componente}
```

## Regras

- NÃO copiar arquivos para `src/` ou qualquer pasta do projeto
- NÃO modificar `tailwind.config.*`, `package.json` ou qualquer arquivo de configuração do projeto
- NÃO instalar dependências
- Apenas registrar, validar e preparar contexto
- O arquivo `.ds-context.md` é o único output gerado fora de `design-systems/`
