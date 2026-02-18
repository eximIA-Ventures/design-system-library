# read-ds-manifest

**Executor:** bret-victor (chamada interna durante Phase 0)
**Trigger:** Usuário seleciona "Use DS from design-systems/" no wizard

## Objetivo

Ler `design-systems/manifest.json` do projeto sendo forjado, listar os DSs instalados e retornar o `ds_library_ref` para o `wizard-config.yaml`.

## Processo

### 1. Verificar existência

```
Verificar: design-systems/manifest.json
```

**Se não existir:**
```
⚠️  Nenhum DS encontrado em design-systems/

Para usar um DS existente:
  1. Instale @eximia-ventures/ds: npm install @eximia-ventures/ds
  2. Instale um DS: /ds-install {arquivo.dspack}

Deseja continuar com um DS padrão (Shadcn/ui)? (s/n)
```
- Se sim → retornar `ds_library_ref: null`, `framework: "shadcn"`
- Se não → aguardar usuário instalar DS e retornar ao wizard

### 2. Ler manifest

```json
// design-systems/manifest.json
{
  "installed": [
    { "name": "eximia-default", "version": "1.0.0", "path": "design-systems/eximia-default/" },
    { "name": "meu-ds", "version": "2.1.0", "path": "design-systems/meu-ds/" }
  ],
  "active": "eximia-default"
}
```

### 3. Apresentar opções

```
DSs instalados neste projeto:

  1. ✅ eximia-default  v1.0.0  (ativo)
  2.    meu-ds          v2.1.0

Qual deseja usar no forge? (Enter para usar o ativo)
```

### 4. Retornar resultado

Preencher no `wizard-config.yaml`:

```yaml
design_system:
  framework: "existing"
  ds_library_ref: "design-systems/eximia-default/"  # caminho do DS selecionado
```

## Output

```yaml
ds_library_ref: "design-systems/{nome-selecionado}/"
framework: "existing"
```

## Regras

- Se `active` está definido no manifest, pré-selecionar como padrão
- Se apenas 1 DS instalado, selecionar automaticamente (sem pergunta)
- Se manifest existe mas `installed` está vazio, tratar como "não encontrado"
- Nunca bloquear o forge — sempre oferecer fallback para Shadcn como alternativa
