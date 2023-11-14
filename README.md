# Frontend Starter Guide

By: tnn4

This guide should help you set up a startup a frontend project for the web with `html/css`, `npm`, `webpack`,  `React` and more. This is going to be very dense and complex, but that's the nature of web development.  If something is still unclear, do what one of my wise Professors suggested: "Google it! (or any search engine).

### Index:
- [npm](#npm)
- [webpack](#webpack)
- [babel](#babel)
- [React](#react)
- [development](#development)
- [tips](#tips)
- [faq](#faq)
- [troubleshooting](#troubleshooting)

# NPM

## Install NPM which comes with Node and npx
[top](#index)

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

NPM strongly recommends installing with [nvm](https://github.com/nvm-sh/nvm) for easier versioning:

[install nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
```sh
# download and install nvm
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# verify installation
# nvm is not a sourced shell function, not binary
> command -v nvm

# get the latest node version
> nvm install node

# the nodejs package includes npm as well
> which npm
> npm --version
```

## Create the project folder

`npm init`

Input required information

## Install required dependencies (npm packages)

[NPM](https://www.npmjs.com/) packages are libraries, or code others write to give your app more functionality [wiki](https://en.wikipedia.org/wiki/Npm).

These are npm packages that are recommended for every project:
- [typescript](https://www.typescriptlang.org/) [npm](https://www.npmjs.com/package/typescript) - adds type checking to javascript
- [eslint](https://eslint.org/) [npm](https://www.npmjs.com/package/eslint) - static code analyzer for identifying problems javascript or typescript
- [prettier](https://prettier.io/) [npm](https://www.npmjs.com/package/prettier) - opinionated code formatter for javascript
- [jsdoc](https://www.npmjs.com/package/jsdoc) - api documentation generator for javascript

TIP! Typescript is better to use by default unless you have very good reasons. Microsoft invested a lot of time developing it to make the developer experience for JS better.

TIP! It is recommended you get typescript globally: `npm install -g typescript` to use typescript compiler `tsc` globally, because we'll likely be using it for every project.

Install the npm dependencies:
```bash
# typescript - adds strict static typing to javascript, makes debuggin easier
# eslint     - static code analyzer for identifying problems javascript or typescript
# prettier   - opinionated code formatter for javascript
# jsdoc      - documentation generator
npm install typescript eslint prettier jsdoc
```
## The `package.json` file makes dependency management easier and automatically building a project possible

Why do we need this file?
The project is made up of a diverse set of many components that must be combined and structured together into a functional whole. Running the individual files in the project don't work. These components are part of a system. They cannot function in a vaccuum. We call this building the project. The `package.json` file tells `npm` what is required to build.

Another way to explain `building projects`:
To "do a build" in software development means "to create from source code identifiable software assembly which someone or something can use" [(src)](https://www.quora.com/What-does-it-mean-to-do-a-build-in-software-development).


The `package.json` file ensures your project has all the information about libraries and tools it needs to work. You're likely going to be installing a lot more than a few libraries for your future projects so this file is very important. It's written in [JSON](https://www.json.org/) a very common data-interchange format which is relatively easy to read for both humans and computers (make no mistake, that is a gargantuan feat).

`npm` will read the `package.json` file to build the project. 

### npm install

`npm install --save-dev <package>`

`--save-dev` vs `--save`?
[see](https://stackoverflow.com/questions/22891211/what-is-the-difference-between-save-and-save-dev)

- `--save-dev` is used to save the package for development purpose. Example: unit tests, minification..
- `--save` is used to save the package required for the application to run.

## Add scripts to the `package.json` file to make building the project easier

WARN! Most npm scripts and tutorials assume you're using bash and have [git] on Linux and MacOS are common systems for web development, if you're on Windows(don't you feel discriminated?), your default shell is powershell so you need to [switch shell](https://stackoverflow.com/questions/23243353/how-to-set-shell-for-npm-run-scripts-in-windows) to bash and you need to install [git](https://git-scm.com/)

We can write shell commands manually everytime but we need to run scripts to make building the project easier

How? We add a `script` [object](https://www.quora.com/What-is-an-object-in-programming)/[dictionary](https://en.wikibooks.org/wiki/A-level_Computing/AQA/Paper_1/Fundamentals_of_data_structures/Dictionaries) to the `package.json`.


Where every key is a script name and the value is the shell command to be run:
```bash
$ npm run <script-name> #RUNS shell-command
```

e.g.
```bash
$ npm run lint:check # eslint .
$ npm run lint:fix   # eslint . --fix
...
$ npm run start      # npm run serve
```

[example package.json](https://github.com/MichaelCurrin/node-project-template/blob/master/package.json)
```json
// package.json 
// WARN! json cannot have comments, we put these here for educational purposes

{
    // other json
    ...

    "scripts": {
      "comment_SETUP": "-- SETUP--",
      "//01": "run: $ npm run setup # once first",
      "setup-dir": "mkdir -p build && mkdir -p src && touch src/index.html src/index.js src/style.css",
      "setup-deps": "npm install typescript && npm install eslint && npm install prettier",
      "comment_LINT": "-- LINT --",
      "lint:check": "eslint .",
      "lint:fix": "eslint . --fix",
      "comment_BUILD": " -- BUILD --",
      "build": "mkdir -p build && cp src/*.js build && cp src/*.html build",
      "comment_TEST": "-- TEST --",
      "test": "echo 'TODO: add your test runners",
      "serve": "echo TODO: add your serve command",
      "comment_VERSION": "-- VERSION --",
      "preversion": "git fetch --tags && npm run lint:check && npm test",
      "version": "npm run build",
      "postversion": "git push --follow-tags"
    },
    ...
    // more json
}


```

Here's how to use these:
- first run the setup scripts
```bash
# make the proper project structure
$ npm run setup-dir
# install required dependencies
$ npm run setup-deps
```
- run test scripts
- run build

# Webpack

## Set up your bundler for building

Install Webpack
```bash
$ npm install webpack webpack-cli --save-dev 
```

For frontend projects. We'll need a bundler.
We'll use [webpack](https://webpack.js.org/). It's the most complex, but it's also the most powerful. Since we're in this for the long term we might as well learn it now.

[Why webpack?](https://webpack.js.org/concepts/why-webpack/) browser support is incomplete for modules and bundling is still faster and currently recommended over these early module implementations.

What is webpack's configuration file? [`webpack.config.js`](https://webpack.js.org/concepts/configuration/#introductory-configuration) Note how it is a javascript file unlike `package.json`. Webpack's configuration is an actual program.

You can write the configuration file in [`typescript`](https://webpack.js.org/configuration/configuration-languages/)

See [how do bundlers work?](https://github.com/ronami/minipack) to better understand the purpose of a bundler.

Q | A
--- | ---
What does `dist` mean? | [distributable](https://stackoverflow.com/questions/22842691/what-is-the-meaning-of-the-dist-directory-in-open-source-projects)
What is tree shaking? | eliminating dead code

Webpack Defaults

property | path | description
--- | --- | ---
`entry` | `./src/index.js` | Webpack uses this module  to start building its dependency, graph, you can specify multiple entry points
`output` | `./dist/main.js` | Webpack emits _bundles_ to this location

Now that we have webpack we need to modify our `package.json`.

```diff
// package.json 
// WARN! json cannot have comments, we put these here for educational purposes

{
    // other json
    

    "scripts": {
      // ...
      "comment_BUILD": " -- BUILD --",
-     "build": "mkdir -p build && cp src/*.js build && cp src/*.html build",
+     "build": "webpack",
+     "comment_BUILD2": "you can use a different config if you wish, the default is webpack.config.js"
+     "build-with-target-config: "webpack --config target.config.js"
      // ...
    },
    
    // more json
}
```

Create a `webpack.config.js`:

`PS> New-Item -Path . -Name webpack.config.js -ItemType "file"`

`> touch webpack.config.js `

with the contents:
```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'bundle.js', // you can change this
  },
};
```

Now that we've learned the hard way, here's a more scalable [way](https://webpack.js.org/configuration/#set-up-a-new-webpack-project):

FYI! Why and what is [npx](https://www.npmjs.com/package/npx)? npx helps us avoid versioning, dependency issues and installing unnecessary packages

npm vs npx?
- npm is used for managing packages and comes with Node and npx
- NPM = npm + node + npx
- npm does not execute packages
- npx is used for executing packages you want to try out without installing, npx is included with npm

```bash
npx webpack init
npm install -g pnpm
```
Q | A | comment
--- | --- | ---
JS solution? | typescript | use ts when given the chance
webpack server | yes | use this for client-side
simplify html creation? | yes | The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. [see](https://webpack.js.org/plugins/html-webpack-plugin/)
add PWA support? | no | ignore for now [see](https://webpack.js.org/guides/progressive-web-application/)
CSS solution? | CSS only |
Postcss? | no | Ignore for now.  PostCSS is a software development tool that uses JavaScript-based plugins to automate routine CSS operations. [see](https://github.com/postcss/postcss) PostCSS or Post Processing your CSS takes your existing CSS and extends it. [see](https://www.reddit.com/r/css/comments/3v7erp/comment/cxla04k/?utm_source=share&utm_medium=web2x&context=3)
Do you want to extract CSS for every file | Only for production | [see](https://stackoverflow.com/questions/51820966/what-is-the-intention-of-extract-all-css-in-a-single-file)
Pick a package manager | `pnpm` | `pnpm` is faster because it stores `node_modules` in a monorepo(central place) instead of strewn around your disk [see](https://www.reddit.com/r/node/comments/144xqd8/is_pnpm_really_leaves_up_to_its_hype_are_yarn_npm/)

Loaders are plugins for Webpack that are used for preprocessing files before they are bundled by webpack.

Install loaders with:
```bash
npm i babel-loader style-loader css-loader --save-dev
```
# Babel

## Get Babel for generating compatible Javascript

Why do we need Babeljs? We need Babel because the modern Javascript we write now is not compatible with older browsers. One of the most important things you need to understand about the web is that there a lot of different versions of browsers running on many different platforms and that many of them are older. Compatibility and standardization is one of the most difficult and important problems of the web. Babeljs solves this issue because it is a compiler that compiles(transforms) our modern Javascript code to the compatible version. Without Babeljs we wouldn't be able to write programs for older platforms, and there a lot of them out there.

[Why the name Babel?](https://en.wikipedia.org/wiki/Tower_of_Babel) The Tower of Babel narrative in the Bible is an origin myth and parable meant to explain why the world's peoples speak different languages. 

Babel works by using '`plugins`' which extend its core package to transform and compile the code you give it. preset-env is such a plugin that compiles down ES6+ (That is, versions of JavaScript that implement ECMAscript 2015 and newer standards) to ES5 standards-compatible JavaScript. 

```bash
> npm i @babel/core @babel/preset-env @babel/preset-react
```

# React 
[top](#index)

This is _the_ frontend library developed by the folks at Facebook to bild frontend applications. React simplifies the develpment process but you have to learn how it works and how to use it  first. This is an entire topic unto itself.



Install react
```bash
npm install react react-dom --save
```
EDIT: We'll be using React with typescript so: [see](https://stackoverflow.com/questions/39557999/cannot-find-module-react)
```bash
npm install react react-dom @types/react @types/react-dom --save
```

We're going to need [jsx, tsx](https://stackoverflow.com/questions/64343698/what-is-the-difference-between-js-tsx-and-jsx-in-react) which is basically a language that allow HTML to be embedded within the file. `jsx` and `tsx` files are not valid Javascript. The browser only understands Javascript so `jsx/tsx` must be transformed into valid code. Babel and Typescript (tsc) can compile `jsx/tsx` into Javascript.

Create `index.html` at the root of your project:
```html
<!DOCTYPE html>
<html lang="en">
  
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>React App</title>
        <script defer src="main.js"></script>
    </head>
    
    <body>
        <div id="app"></div>
    </body>

</html>
```

Create `index.tsx` which is the entry point for Webpack. WARN! Some tutorials show old React. See [React upgrade guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis) 


```diff
- import React from "react";
- import ReactDOM from "react-dom";
import App from "./App";

- ReactDOM.render(<App />, document.getElementById('root'));


+ import { createRoot } from 'react-dom/client';
+ const container = document.getElementById('app');
+ const root = createRoot(container!);
+ root.render(<App />);
```

In `webpack.config.json`:
```diff
...
const config = {
    // Set your entry point
-   entry: './src/index.ts',
+   entry: '.src/index.tsx'
    ...
}
```

Create `App.tsx` which is the entry point for the React app.
```diff
- import React from 'react';
- 
- class App extends React.Component {
-     render() {
-         return (
-             <div>Welcome to React!</div>
-         );
-     }
- }

- export default App;

// Use new functional style
+import * as React from 'react';
+
+function MyButton() {
+  return (
+    <button>
+      I'm a button
+    </button>
+  );
+}
+  
+export default function MyApp() {
+  return (
+    <div>
+      <h1>Welcome to my app</h1>
+      <MyButton />
+    </div>
+  );
+}
```

Changed `tsconfig.json`:
```diff
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "allowJs": true,
+   "jsx": "react-jsx",
+   "moduleResolution": "Node"
  },
  "files": ["src/index.tsx"]
}

```
[tsconfig moduleResolution](https://www.typescriptlang.org/tsconfig#moduleResolution)
see: --jsx flag not set, https://stackoverflow.com/questions/64356404/getting-error-ts17004-cannot-use-jsx-unless-the-jsx-flag-is-provided
see: https://github.com/vitejs/vite/issues/13129


# Development

## Build
```bash
npm run build:dev
```

## Run and watch

`webpack watch` automatically recompiles your code after every code change, very useful for immediate feedback

`webpack watch` vs `webpack-dev-server`: [see]( webpack-dev-server uses webpack's watch mode by default according to its documentation)
-  `webpack-dev-server` uses `webpack`'s `watch` mode by default according to its documentation
- `webpack-dev-server --hot` adds the `HotModuleReplacementPlugin` to the webpack configuration, which will essentially allow you to only reload the component that is changed instead of doing a full page refresh

watch 
```bash
# this is  redundant if you are usng webpack-dev-server
npm run watch
```

hot-reload
```bash
npm run dev-server # webpack-dev-server --mode development --open --hot
```



## Troubleshooting
[top](#index)

Error | Solution
--- | ---
Import declarations may only appear at top level of modules | Add `type=module` --> `<script type="module" src="appthatimports.js"></script>` 
Document is undefined [see](https://stackoverflow.com/questions/32126003/node-js-document-is-not-defined) | document is part of the browser API not Node API
ReferenceError: require is not defined in ES module scope, you can use import instead | https://stackoverflow.com/questions/69099763/referenceerror-require-is-not-defined-in-es-module-scope-you-can-use-import-in
--jsx is not set | [see](https://stackoverflow.com/questions/50432556/cannot-use-jsx-unless-the-jsx-flag-is-provided)

---
### __dirname is not defined

ReferenceError: __dirname is not defined in ES module scope | [see](https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/) [2](https://stackoverflow.com/questions/64383909/dirname-is-not-defined-error-in-node-14-version)

Import Nodejs `path` module and `fileURLTOPath` from `url` module
```js
import path from 'path';
import { fileURLToPath } from 'url';

```

```js
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
```
Use `__dirname` as usual
```js
console.log(__dirname);
```

import node path instead of require [see]( https://stackoverflow.com/questions/41553291/can-you-import-nodes-path-module-using-import-path-from-path)

If using Typescript:
Install node types
```bash
npm install --save-dev @types/node
```
---

HtmlWebpackPlugin is not a constructor

### --jsx flag needs to be provided
`tsxonfig.json`
```diff
{
  "compilerOptions": {
+   "jsx": "react-jsx"
  }

}

```

## Tips
[top](#index)

- [change value of imported variables](https://stackoverflow.com/questions/48168601/change-the-value-of-imported-variable-in-es6)
- `npm install` aliases: `npm i, npm add` [see](https://docs.npmjs.com/cli/v6/commands/npm-install)
- `npm uninstall` aliases: `remove, rm, r, un, unlink` [see](https://docs.npmjs.com/cli/v6/commands/npm-uninstall)

clean node_modules
```bash
rm -rf node_modules
npm install
```

## FAQ
[top](#index)


Q | A
--- | ---
ESM (ECMAScript Modules) vs Commonjs? | [see](https://www.reddit.com/r/node/comments/zgred2/common_js_vs_es_modules_and_why/) stick with ESM if you can, webpack uses `package.json`: "type":"commonjs"
what are @prefix on npm packages? |  they are 'scoped packages' which allow npm packages to be namespaced, it makes it clear which packages are official,  e.g. For example, the package name `http` is already taken in the main repository, but Angular is able to have `@angular/http` as well. [see](https://stackoverflow.com/questions/36667258/what-is-the-meaning-of-the-at-prefix-on-npm-packages)

`package.json`
```diff

```

Reference:
- https://www.freecodecamp.org/news/how-to-set-up-a-front-end-development-project/
