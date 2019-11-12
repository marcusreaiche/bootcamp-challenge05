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

