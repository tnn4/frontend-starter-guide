# Frontend Starter Guide

By: tnn4

This guide should help you set up a starter npm project. Follow this in order and I will attempt to explain things clearly. If something is still unclear, do what one of my wise Professors suggested: "Google it! (or any search engine).

## Quick Start

Run development server
```bash
npm run dev-server
```

Build
```sh
# development
npm run build:dev

# production/ release
npm run build:prod
```

## Install/uninstall npm packages

list npm packages
```sh
npm list [-g]
```

```sh
npm install <npm-package>
```

Install for development  only
```sh
npm install --save-dev <npm-package>
```

uninstall
```sh
npm uninstall <npm-package>
```