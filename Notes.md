# Módulo 05: Primeiro projeto com ReactJS

## Criando projeto do zero

* Vimos como o comando:
<pre>
yarn create-react-app module_name
</pre>

cria uma pasta com o nome do app e toda a estrutura de pastas e arquivos para começarmos a desenvolver o nosso app sem precisarmos configurar explicitamente o webpack e o babel;

* Após a criação da estrutura, deletamos uma série de arquivos que não iremos utilizar nesse projeto ou que vamos escrever do zero, como:

  - PWA - Progressive Web Application: deletamos o arquivo `server_workers.js` e o código dentro de `App.js` que faz referência a esse arquivo;
  - Todos os arquivos com extensão "css" dentro da pasta `src`;
  - Em `/public/index.html`, deletamos os comentários e as linhas de código que fazem referência a `server workers`;
  - Deletamos o arquivo de testes;

* Abrindo o arquivo `package.json`, vemos como inicializar o nosso app em modo de desenvolvimento: `yarn start`;

## ESLint, Prettier & EditorConfig

* Baixar para VScode os plugins do Eslint e do EditorConfig;
* Gerar um arquivo do EditorConfig e realizar configuração:
<pre>
root = true

[*]
end_of_line = lf
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
</pre>

Executar o comando:
<pre>

</pre>
para instalar os pacotes de desenvolvimento e executar comando para configuração do ESlint.

<pre>
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    "prettier",
    "prettier/react"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    "prettier"
  ],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [
      "warn",
      { extensions: [".js", ".jsx"] }
    ],
    "import/prefer-default-export": "off"
  },
};
</pre>

* Configurar o arquivo `/prettierrc`:
<pre>
{
  "trailingComma": "es5"
}
</pre>

## Roteamento no React

* Criamos as seguintes pastas/arquivos
  - src/pages/Main/index.js
  - src/pages/Repository/index.js

* Instalamos o módulo "react-dom-router";

* Criamos o arquivo `/src/routes.js` onde serão definidas as rotas da nossa SPA;

* Devemos importar o `React` e as seguintes funcionalidades de `react-dom-router`:
  - BrowserRouter
  - Switch
  - Route

* Criamos um stateless functional component chamado Routes e que retorna o roteamos da aplicação;

* Em Route, usamos:
  - path;
  - component;
  - exact;

## Styled Components

* Importamos a biblioteca `styled-components` que permite a estilização dos componentes de forma isolada; i.e., sem afetar o restante da aplicação;

* Em `./src/pages/Main/` criamos o arquivo `styles.js` com os estilos que serão aplicados à componente `Main`;

* Importamos default de `syled-components` e usamos o objeto para definir o estilo
<pre>
import styled from "styled-components";

export const Title = styled.h1`
  color: #fff;
`;
</pre>

## Criando Estilos Globais

* Criamos o arquivo `./src/styles/global.js`;

* Importamos a função `createGlobalStyle` de `styled-components`;

* Exportamos o estilo usando a função anterior

<pre>
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #route {
    min-height: 100%;
  }

  body {
    background-color: #7159c1;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
</pre>

## Estilizando página Main

* Nessa aula foi feita a estilização do componente Main no arquivo `styles.js`;
* Atenção especial para o `flexbox` e para o método `attrs` do styled components que pode ser usado para definir propriedades do componente;
* No exemplo, definimos o SubmitButton como sendo do tipo `submit` introduzindo o seguinte código
<pre>
const SubmitButton = styled.button.attrs({
  type: "submit"
})`
CSS vai aqui...
`
</pre>

## Adicionando Repositórios

* Buscamos informações da API do Github a partir da requisição originária do nosso formulário;
* A lógica do React para atualizar o valor do input, submeter o formulário, etc, não apresentou nenhuma novidade;
* Vale destacar que usamos a biblioteca `axios` para fazer requisições à API: uma vantagem em relação ao `fetch` é podermos adicionar uma base URL às nossas requisições;
* O destaque da aula foi o CSS! Vale a pena olhar como ficou o código de `styles.js`;

## Navegação de rotas

* Usamos o `Link` component da biblioteca `react-router-dom` para fazer a navegação entre páginas;
* Isso faz com que a página não seja recarregada qdo u usuário clicar no link, diferentemente de qdo usamos a anchor tag do HTML;
* As seguintes funções foram úteis para codificar e decodificar o nome dos repositórios na URL:
  - `encodeURIComponent`
  - `decodeURIComponent`

## Carregando dados da API

* Fazemos duas requisições:
  - ao repositório;
  - as issues abertas do repositório;

* Vimos como usar o _await_ com o _Promise.all_ para enviar todas as requisições ao mesmo tempo ao invés de enviá-las sequencialmente;

* Podemos filtrar as issues abertas usando o params do axios

<pre>
api.get(url, {
  params: {
    state: "open",
    per_page: 5,
  }
});
</pre>

## Definindo PropTypes

* Definimos PropTypes como uma propriedade estática da nossa classe (i.e., compartilhada por todas as instâncias);

<pre>
import PropTypes from "prop-types";

class Repository extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string
      })
    }).isRequired,
  }

}
</pre>

## Exibindo repositório

* Uma verdadeira aula de CSS! Sem grandes novidades em termos de _React_.

## Exibindo issues

* Uma verdadeira aula de CSS! Sem grandes novidades em termos de _React_.





