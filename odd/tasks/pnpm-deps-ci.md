# Feature: restore CI, update every dependency, migrate npm -> pnpm

Branch: `dependabot/npm_and_yarn/npm_and_yarn-f83e48cb7c`. Risk: item 5 (delivery/environment: CI, dependencies, package manager).

## Specs

S1. The CI of this branch must pass again. Root cause observed: `npm install` fails with `ERESOLVE` because `vite@8.3.4` conflicts with `vite-plugin-vue-devtools@8.0.5` peer `^6.0.0 || ^7.0.0-0`.

S2. Every npm dependency declared in `package.json` must be updated to its latest published version, and `package.json` ranges must keep matching that latest version.

S3. Every GitHub Action used under `.github/workflows` must be updated to its latest published major.

S4. npm must be replaced by pnpm: `pnpm-lock.yaml` committed, `package-lock.json` removed, `packageManager` pinned, CI installing with pnpm, and every documented/Makefile command using pnpm.

S5. After the change, `pnpm install --frozen-lockfile` + `pnpm run build` (type-check and vite build), `pnpm run lint` and `pnpm run test:unit` must succeed from a clean install.

## Tasks

| ID | Spec | Route | Commit |
| --- | --- | --- | --- |
| T1 | S1 | inline | reproduced only, no commit |
| T2 | S4, S1 | inline | `chore(deps)!: migrate to pnpm and update every dependency` |
| T3 | S2 | inline | `chore(deps)!: migrate to pnpm and update every dependency` |
| T4 | S3 | inline | `ci: install with pnpm, bump actions, target Node 24 LTS` |
| T5 | S5 | inline | verified only, no commit |
| T6 | S1-S5 | inline | own commit (`docs(odd): record pnpm migration and dependency upgrade`) |

## Log

L1 (user request, verbatim):

> The changes in this branch are breaking the CI. Please fix them, and use this branch also to update all the dependencies we are using in this repository, not just npm, but also github actions.
>
> Replace npm by a more secure alternative like pnpm

L2 (evidence): `npm install` on the branch fails:

```
npm error code ERESOLVE
npm error While resolving: vite-plugin-vue-devtools@8.0.5
npm error Found: vite@8.3.4
npm error Could not resolve dependency:
npm error peer vite@"^6.0.0 || ^7.0.0-0" from vite-plugin-vue-devtools@8.0.5
```

`vite-plugin-vue-devtools@8.2.1` on the registry advertises `vite: ^6.0.0 || ^7.0.0 || ^8.0.0`, so the fix is inside S2/S3 territory rather than a downgrade of vite.

L3 (decision): CI Node runtime moves to the active LTS (24) and `@tsconfig/node20` becomes `@tsconfig/node24`, because the repo already runs Node 24 locally and Node 22 is in maintenance.

L4 (decision, pnpm 12 config home): pnpm 12 reads project settings from `pnpm-workspace.yaml`, not the `package.json` `pnpm` field nor `.npmrc` (except registry/auth). Two settings live there: `allowBuilds: {'@parcel/watcher': true}` — the only dependency of the tree with a build script, required because pnpm fails the install with `ERR_PNPM_IGNORED_BUILDS` under `strictDepBuilds` — and `strictPeerDependencies: true`, which is what turns this branch's failure class (`vite@8.3.4` vs `vite-plugin-vue-devtools@8.0.5` peer `^6 || ^7`) into an install error instead of a late build error.

L5 (evidence): `pnpm add -D typescript@7.0.2` breaks the toolchain:

```
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './lib/tsc' is not defined by "exports" in .../typescript/package.json
    at resolveTscPath (.../vue-tsc/index.js:73:43)
```

vue-tsc 3.3.13 still patches the classic compiler's `lib/tsc`, so TypeScript stays on `~5.9.3` (latest 5.x). TypeScript 7 is blocked by vue-tsc, not by this repository.

L6 (decision, removed dependencies): `npm-run-all@4.1.5` is deprecated and ships the same `run-p`/`run-s` binaries as `npm-run-all2@9.0.3`, which makes the `run-p` resolution ambiguous under pnpm; `@rushstack/eslint-patch` is not imported by any config (it was only needed by legacy `eslintrc`). Both were removed and nothing references them (`grep` over `src`, `e2e`, configs).

L7 (decision, `dist/`): `dist/` is a tracked deploy artifact whose hashed JS/CSS are not tracked, so it is already inconsistent on this branch. `pnpm run build` rewrites `dist/index.html`; that output was reverted and kept out of these commits, since deploy still runs through `make build`.

L8 (pre-existing local noise): `pnpm run lint` only fails on an untracked local `.next/` Turbopack artifact directory (152 errors, all under `.next/`). With `.next` excluded, eslint exits 0. `.next` was added to `.gitignore`; the eslint config already ignores every other build output.

## Verification evidence

Clean `node_modules`, `pnpm 12.14.0`, Node 24.21.0:

| Check | Command | Result |
| --- | --- | --- |
| install | `pnpm install --frozen-lockfile` | exit 0 |
| build | `pnpm run build` (vue-tsc + vite build) | exit 0 |
| lint | `pnpm exec eslint . --ignore-pattern .next` | exit 0 |
| unit | `pnpm run test:unit -- --run` | 2 files / 6 tests passed |
| e2e discovery | `pnpm exec playwright test --list` | 3 tests listed, config parses |

The e2e suite itself was not executed (browsers not installed locally; CI does not run e2e either). That is the only unrun check.
