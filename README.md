# package.json

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Package manager

This project uses [pnpm](https://pnpm.io) instead of npm. The required version is
pinned in the `packageManager` field of `package.json`, and project settings live in
`pnpm-workspace.yaml` (pnpm 12 no longer reads the `pnpm` field or non-registry
settings from `.npmrc`).

```sh
# Get the pinned pnpm version
corepack enable

# Or install pnpm globally
npm install -g pnpm
```

Always install from the committed lockfile, so the resolution this project was
verified with is the one you get:

```sh
pnpm install --frozen-lockfile
```

## TypeScript

This project ships two compilers, and `type-check` runs both:

| Package | Version | Used by |
| --- | --- | --- |
| `typescript` | 5.9.3 | `vue-tsc` and `typescript-eslint` |
| `typescript-native` (`npm:typescript@7`) | 7.0.2 | `type-check:ts7`, the native Go compiler |

TypeScript 7 is the native port: it exposes only `lib/version.cjs` and an `unstable/*`
API, so `typescript/lib/tsc` (the compiler as a library) no longer exists and it cannot
resolve `.vue` modules. `vue-tsc` patches that library and `typescript-eslint` imports the
classic compiler API, so both still need TypeScript 5. pnpm resolves a package's
`typescript` peer from the workspace root, so a single project cannot provide two
versions; `typescript` therefore stays on 5.9.3 as the toolchain's provider, and
TypeScript 7 runs as `typescript-native` over every TypeScript-only project
(`vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `e2e/**`) via
`tsconfig.ts7.json`.

Drop the split once `vue-tsc` and `typescript-eslint` support the native port: remove
`typescript-native`, `tsconfig.ts7.json` and the `type-check:ts7` script, and point
`typescript` at 7.x. See `odd/tasks/typescript-7.md` for the evidence behind this shape.

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
pnpm exec playwright install

# When testing on CI, must build the project first
pnpm run build

# Runs the end-to-end tests
pnpm run test:e2e
# Runs the tests only on Chromium
pnpm run test:e2e -- --project=chromium
# Runs the tests of a specific file
pnpm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
pnpm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm run lint
```
