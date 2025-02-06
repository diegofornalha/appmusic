# Documentação das Tarefas

Através da configuração do arquivo `tasks.json`, é possível automatizar a construção de frameworks de mini-programas pré-compilados, como o Taro.

## Fundamentos das Tarefas

> As opções de configuração podem ser consultadas na documentação do [vscode task](https://code.visualstudio.com/docs/editor/tasks)

### Opções de runOn

Na IDE, além da opção `folderOpen`, a configuração `runOn` inclui duas situações adicionais: `appletPreview` e `prodBuild`.

| runOn         | Momento de Execução                         | Tarefa Executada                             |
| ------------- | ------------------------------------------- | -------------------------------------------- |
| folderOpen    | Após a abertura do projeto                  | Instalação das dependências                  |
| appletPreview | Antes da construção do preview do mini-programa | Serviço de desenvolvimento com monitoramento contínuo |
| prodBuild     | Antes da construção do pacote de produção do mini-programa | Construção do pacote de produção             |

### Construção do Pacote de Produção

Funções como visualização móvel, upload do mini-programa e exportação do pacote de código utilizam a construção de produção.  
Para não interromper o fluxo de desenvolvimento, os artefatos das construções de desenvolvimento (dev) e produção (prod) são direcionados para pastas diferentes.  
No arquivo `project.config.json`, a propriedade `miniprogramRoot` define o diretório de construção para o desenvolvimento, enquanto `miniprogramRootProd` define o diretório para a produção.

> Exemplo:

```js
// config/prod.js
export default {
    outputRoot: 'dist-prod'
  ...
}
// config/dev.js
export default {
  outputRoot: 'dist'
  ...
}
```

`project.config.json`

```json
{
    "miniprogramRoot": "dist",
    "miniprogramRootProd": "dist-prod"
}
```

# Problemas Comuns

## Sobre nodejs/npm

Certifique-se de que o ambiente de execução [node](https://nodejs.org/zh-cn/download) esteja instalado. Se você utilizar gerenciadores de pacotes como `yarn` ou `cnpm`, verifique também se estes estão instalados.

## Falha na Execução da Tarefa de Build

Em caso de problemas relacionados a dependências, tente excluir o diretório `node_modules` e execute `npm install` novamente. Após a instalação, clique no botão de compilação para recompilar o mini-programa.
