# Feature: run the build's TypeScript on TS 7, keep the toolchain on TS 5

Branch: `dependabot/npm_and_yarn/npm_and_yarn-f83e48cb7c`. Risk: item 5 (delivery/environment: build toolchain and CI).

## Specs

S1. TypeScript 7 must be installed and must execute during the build, not merely be declared.

S2. `pnpm run lint`, `pnpm run build` and `pnpm run test:unit` must keep passing. The lint stack may stay on TypeScript 5 for now.

S3. The workaround that keeps the legacy-API consumers working must be explicit, documented in the repository, and removable in one place.

## Tasks

| ID | Spec | Route | Commit |
| --- | --- | --- | --- |
| T1 | S1 | inline | same commit |
| T2 | S2 | inline | same commit |
| T3 | S3 | inline | same commit |

## Log

L1 (user request, verbatim):

> Quiero que subas Typescript también a la versión 7. Aplica el workaround que sea necesario para seguir pasando el linter de momento con ts 5, pero que la build y el código ejecutado ya sea en ts7

L2 (evidence, hard constraint): `typescript@7.0.2` is the native Go port. Its `package.json` has no `main`, no `types`, and:

```json
"bin": { "tsc": "./bin/tsc" },
"exports": {
  ".": "./lib/version.cjs",
  "./unstable/sync": "./dist/api/sync/api.js",
  "./unstable/async": "./dist/api/async/api.js",
  ...
}
```

`lib/tsc.js` exists but is only a launcher:

```js
import getExePath from "#getExePath";
const exe = getExePath();
try { process.execve(exe, [exe, ...process.argv.slice(2)]); } catch {}
```

So there is no compiler-as-a-library and no `./lib/tsc` export.

L3 (evidence, why the toolchain cannot run on TS 7):

- `vue-tsc@3.3.13` calls `require.resolve('typescript/lib/tsc')` and patches it to type-check `<script>` blocks. On TS 7 that throws `ERR_PACKAGE_PATH_NOT_EXPORTED`.
- `typescript-eslint@8.71.2` declares peer `typescript: ">=4.8.4 <6.1.0"` and imports `ts.createSourceFile`, `ts.Program`, etc.
- Native `tsc` 7 cannot resolve `.vue` modules at all. Probe:

```
src/use.ts(1,18): error TS2307: Cannot find module './Comp.vue' or its corresponding type declarations.
```

The native port has no language-service extension API, so no `vue-tsc` equivalent can exist for it yet.

L4 (evidence, why "two TypeScript versions in one project" does not work): pnpm's `overrides` with a parent selector and `packageExtensions` adding `typescript` as a dependency both leave the *provider* unchanged. In a single project the `typescript` peer is resolved from the workspace root, so every consumer sees the same copy. Measured:

- `overrides: {'vue-tsc>typescript': 'npm:typescript@6.0.3'}` → `vue-tsc@3.3.13(typescript@7.0.2)` in the lockfile, `type-check` still crashes, and `strictPeerDependencies` silently stops reporting the conflict. Rejected: it disarms a real check.
- `packageExtensions` adding `typescript: 6.0.3` to 9 consumers → after a fully clean install, `ERR_PNPM_PEER_DEP_ISSUES` still names all of them against `7.0.2`.

L5 (decision): use the mapping the request itself describes. `typescript` (5.9.3) stays the single peer provider and is what `vue-tsc` and `typescript-eslint` load; TypeScript 7 is installed as `typescript-native: npm:typescript@^7.0.2` and drives a new native gate, `type-check:ts7`, over every TypeScript-only project (vite/vitest/playwright configs and `e2e/**`). `pnpm run build` runs both gates.

L6 (decision, determinism): the `typescript-native` alias and `typescript` both declare a `tsc` bin, and pnpm resolved the collision to the alias (`.bin/tsc` → 7.0.2) without promising that precedence. The gate therefore calls `node ./node_modules/typescript-native/lib/tsc.js` explicitly instead of relying on `.bin/tsc`, so a future install cannot silently downgrade the gate back to TS 5.

L7 (finding, corrects a premise in the request): "el código ejecutado en TS 7" has no separate effect. Vite 8/Rolldown transpiles with oxc and never loads the `typescript` package, so the TypeScript version cannot change emitted output. Measured: the production bundle hash is identical before and after this change (`dist/assets/index-D8BN5nm0.js` both times). TypeScript only decides *which compiler type-checks*.

## Verification evidence

Clean `node_modules`, pnpm 12.14.0, Node 24.21.0:

| Check | Result |
| --- | --- |
| `pnpm install --frozen-lockfile` | exit 0 |
| `pnpm run type-check:ts7` (native TS 7.0.2) | exit 0 |
| `pnpm run type-check` (ts7 + vue-tsc) | exit 0 |
| `pnpm run build` | exit 0 |
| `eslint .` | exit 0 |
| `pnpm run test:unit -- --run` | 6/6 passed |

The gate is not a no-op: appending `const _proof: number = "not a number"` to `vite.config.ts` produced RED

```
vite.config.ts(22,7): error TS2322: Type 'string' is not assignable to type 'number'.
```

and GREEN again once reverted. `vue-tsc` was confirmed to resolve `node_modules/.pnpm/typescript@5.9.3/.../lib/tsc.js`.

## Residual limitation and the alternative

The application surface (`src/**`, which imports `.vue`) is still type-checked by TS 5 through `vue-tsc`, because TS 7 cannot read `.vue` at all. TypeScript 7 owns the config and `e2e` surface today.

If the requirement is instead that the package literally named `typescript` be 7.x, the only sound layout is a second pnpm workspace project (e.g. `tools/toolchain`) holding `typescript@5.9.3`, `vue-tsc` and the eslint stack, with `resolvePeersFromWorkspaceRoot: false`. That splits the dependency manifest and moves `eslint.config.js`, which is why it was not done unasked.
