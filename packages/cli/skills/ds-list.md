# ds-list

Lista os design systems instalados e disponíveis no projeto atual.

## Ativação

Ativado via `/ds-list` no Claude Code.

## Processo

### 1. Verificar design-systems/

Se a pasta `design-systems/` não existir:
```
❌ design-systems/ não encontrado.
   Execute: npm install @eximia-ventures/ds
```
Interromper.

### 2. Ler manifest.json

Leia `design-systems/manifest.json`.

Se não existir ou `installed` estiver vazio, pular para o passo 3.

### 3. Escanear .dspack disponíveis

Listar arquivos `design-systems/*.dspack` — estes estão disponíveis mas não instalados.

### 4. Exibir resultado

```
🎨 Design Systems — {nome-do-projeto}

Instalados:
  ✅ eximia-default  v1.0.0  (ativo)
  ○  meu-ds          v2.1.0

Disponíveis (não instalados):
  📦 outro-ds.dspack

─────────────────────────────────
  /ds-install {nome}  → instalar
  /ds-pack            → empacotar um DS existente
  /ds-apply           → aplicar o DS ativo no projeto
```

Se não houver nada instalado nem disponível:
```
🎨 Design Systems — {nome-do-projeto}

Nenhum DS encontrado.

  /ds-pack    → empacotar um design system existente
  /ds-install → instalar um arquivo .dspack
```

## Regras

- Marcar o DS ativo com `(ativo)`
- Mostrar `.dspack` disponíveis separadamente dos instalados
- Nome do projeto vem do `package.json` (campo `name`) ou do nome do diretório atual
