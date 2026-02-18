# ds-pack

Empacota um design system existente em um arquivo `.dspack` (zip renomeado).

## Ativação

Ativado via `/ds-pack` no Claude Code.

## Processo

### 1. Coletar caminho

Pergunte ao usuário:
```
📦 ds:pack — Empacotar Design System

Informe o caminho do design system a empacotar:
(ex: ./src/design-system, ./tokens, ./ui)
```

Se o caminho não existir, avise e interrompa.

### 2. Escanear o diretório

Analise o diretório e identifique:
- **Tokens**: `tokens.json`, `tokens.yaml`, `*.css` com variáveis CSS, `tailwind.config.*`
- **Componentes**: `*.tsx`, `*.jsx`, `*.vue` dentro de `atoms/`, `molecules/`, `organisms/`, `templates/`
- **Documentação**: `README.md`, `CHANGELOG.md`, configs do Storybook

### 3. Gerar manifest.json

Crie `{caminho}/manifest.json` com o inventário real do scan:

```json
{
  "name": "{nome-inferido-do-diretório}",
  "version": "1.0.0",
  "description": "",
  "author": "",
  "methodology": "atomic-design",
  "tokens": {
    "files": ["tokens/tokens.json"],
    "format": "dtcg | css-variables | tailwind"
  },
  "components": {
    "atoms": ["Button", "Input", "Label"],
    "molecules": [],
    "organisms": [],
    "templates": []
  },
  "created_at": "{ISO date atual}"
}
```

### 4. Compactar

Use caminhos absolutos para evitar ambiguidade:

```bash
zip -r "{caminho-absoluto-para-design-systems}/{nome}.dspack" "{caminho-absoluto-do-ds}/" \
  -x "*/node_modules/*" \
  -x "*/.git/*" \
  -x "*/dist/*" \
  -x "*/build/*" \
  -x "*/.next/*"
```

> **Windows (sem zip nativo):** use PowerShell:
> ```powershell
> Compress-Archive -Path "{caminho}" -DestinationPath "design-systems/{nome}.dspack"
> ```

### 5. Confirmar

```
✅ Design system empacotado!

  Arquivo: design-systems/{nome}.dspack
  Tamanho: {tamanho}
  Tokens:  {N} arquivo(s)
  Atoms:   {N} | Molecules: {N} | Organisms: {N}

  Para instalar em outro projeto:
    /ds-install design-systems/{nome}.dspack
```

## Regras

- Nunca incluir `node_modules/`, `.git/`, `dist/`, `build/` no pacote
- Sempre gerar `manifest.json` antes de compactar
- Salvar o `.dspack` em `design-systems/` da raiz do projeto atual
- Se `design-systems/` não existir, criar antes de salvar
