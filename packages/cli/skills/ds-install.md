# ds-install

Instala um arquivo `.dspack` no projeto atual, extraindo seu conteúdo em `design-systems/`.

## Ativação

Ativado via `/ds-install {caminho}` no Claude Code.

## Processo

### 1. Identificar o arquivo

- **Com argumento**: `ds:install ./caminho/arquivo.dspack` — usar o caminho informado
- **Sem argumento**: listar arquivos `design-systems/*.dspack` e perguntar qual instalar

Se nenhum `.dspack` for encontrado, orientar o usuário a usar `ds:pack` ou obter um arquivo `.dspack`.

### 2. Validar o .dspack

Antes de extrair, verifique:

```bash
# Verificar se é um zip válido
unzip -t "{caminho-do-dspack}"
```

Verificações:
- O arquivo existe no caminho informado
- É um zip válido (unzip -t não retorna erro)
- Contém `manifest.json` na raiz (`unzip -l` mostra o índice)
- O `manifest.json` tem `name` e `version`

Se qualquer verificação falhar, avise o usuário com a causa e interrompa.

### 3. Verificar conflito

Leia `design-systems/manifest.json`. Se o DS já estiver na lista `installed`:

```
⚠️  {nome} v{versão-atual} já está instalado.
   Substituir pela versão {versão-nova}? (s/n)
```

Se não, prosseguir.

### 4. Extrair

```bash
# Extrair para design-systems/{nome}/ a partir do caminho absoluto do .dspack
unzip -o "{caminho-absoluto-do-dspack}" -d "design-systems/{nome}/"
```

### 5. Atualizar manifest.json do projeto

Leia `design-systems/manifest.json`, faça merge no array `installed` (não substitua), e salve:

```json
{
  "version": "1.0.0",
  "installed": [
    {
      "name": "{nome}",
      "version": "{versão}",
      "path": "design-systems/{nome}/",
      "installed_at": "{ISO date atual}"
    }
  ],
  "active": "{nome}"
}
```

> Se já havia outros DSs em `installed`, mantê-los. Apenas adicionar (ou atualizar) o novo.
> Definir `active` como o DS recém-instalado.

### 6. Confirmar

```
✅ Design System instalado!

  Nome:    {nome}
  Versão:  {versão}
  Local:   design-systems/{nome}/
  Status:  ativo

  Próximo passo:
    /ds-apply → aplicar tokens e componentes no projeto
```

## Regras

- Sempre validar o zip antes de extrair
- Nunca sobrescrever instalação existente sem confirmação
- Fazer merge no array `installed`, nunca sobrescrever o manifest inteiro
- Definir o DS recém-instalado como `active` automaticamente
