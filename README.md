# Shop

This is a project that simulates a online shop. It has an API that lists the products and has a frontend that shows the products and lets you add them to the cart. The checkout is not working currently.

## Overview

The API is made with nodejs with hapi. The web is made with NextJS, React and Typescript. You can read more about each in `apps/api/README.md` or `apps/web/README.md`

## Get started

To get the project running on your machine, you can do the following:
```
git clone https://github.com/madewithlove/technical-assignment-full-stack-engineer-velkan14.git
cd technical-assignment-full-stack-engineer-velkan14/
yarn install
yarn dev
```
Now go to [localhost:3000](http://localhost:3000/)

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `api`: a [Hapi](https://hapi.dev) api
- `web`: another [Next.js](https://nextjs.org) app
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Install packages

Use `yarn workspace {workspace} add {package}` to add packages to the specific workspace

### Develop

To develop all apps, run the following command:

```
yarn install
yarn dev
```

