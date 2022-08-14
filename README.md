![example workflow](https://github.com/TarCode/shoppie-service/actions/workflows/node.js.yml/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Shoppie REST API service

REST API service for the Shoppie shopping list app. Includes [eslint](https://eslint.org) and [prettier](https://prettier.io) for linting/code formatting, [nodemon](https://github.com/remy/nodemon) for automatic server restarting, and [Jest](https://jestjs.io) for testing.

<img src="https://media.giphy.com/media/KxtMLfh8k8GEJHpBVi/giphy.gif" />

## Getting Started

### Install dependencies

```
npm install
```

### Running in development

```
npm run dev
```

### Running in production

```
npm start
```

Runs on `localhost:8080` by default but can be configured using the `PORT` environment variable.
You should also be running a MongoDB server either locally or with Docker and the environment variable `MONGO_URI` should be set in a `.env` file or in your console environment

### Running tests

```
npm test

# Watch repo
npm run test:watch
```

### Linting

```
npm run lint

# fix issues
npm run lint:fix
```
