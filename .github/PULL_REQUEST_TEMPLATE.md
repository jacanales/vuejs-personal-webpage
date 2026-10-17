## 📝 Summary

<!-- 1-3 bullets: what this PR does and why. -->

## 🎫 Related Ticket

<!-- Optional. Link the full Jira URL (e.g. https://jacd.atlassian.net/browse/JACD-123)
or a GitHub issue (`Closes #123`) when one exists, and drop it entirely when none
does. A URL is one click for the reviewer; a bare key forces a search. Chores,
typo fixes and one-off adjustments need no ticket; the review is the record.
Reference only, never invent one. -->

## 🏷️ PR Type

<!-- Check exactly ONE and add the matching `type:*` label to this PR. -->

- [ ] 🐛 Bug fix (`type:bug`)
- [ ] ✨ New feature (`type:feature`)
- [ ] 📚 Documentation only (`type:docs`)
- [ ] ♻️ Code refactoring (`type:refactor`)
- [ ] 🔧 Maintenance/tooling (`type:chore`)
- [ ] 💥 Breaking change (`type:breaking-change`)

## 📦 Changes

<!-- One row per file or logical group. Split unrelated work into separate commits and list them separately. -->

| File | Change |
|------|--------|
| `path/to/file` | What changed |

## 📸 Screenshots

<!-- Delete this section when the change is not visual. Desktop and mobile,
because the page is a single screen and it has to hold at both. -->

| Desktop | Mobile |
|---------|--------|
| _attach_ | _attach_ |

## 🧪 Test Plan

<!-- Check only what you actually ran. An unchecked box is honest; an invented
tick is not. Delete the rows that cannot apply. -->

- [ ] `pnpm test:unit --run` passes (Vitest, the component contract)
- [ ] `pnpm type-check` passes (`tsc` 7 plus `vue-tsc`)
- [ ] `pnpm build` passes
- [ ] `pnpm lint` leaves no errors on the changed files
- [ ] `pnpm install --frozen-lockfile` resolves, when dependencies changed (the CI job in `check-deps.yml`)
- [ ] 🖱️ Manually tested the affected functionality in a browser
- [ ] Contrast checked on the rendered page when text sits over the photograph
- [ ] Checks skipped, with the reason:

## ✅ Checklist

- [ ] Commits follow Conventional Commits (`type(scope): description`, English only)
- [ ] Exactly one `type:*` label when the repo provides them
- [ ] No `Co-Authored-By` trailers or AI attribution
- [ ] 📄 Documentation updated if behavior changed (`README.md`, `odd/tasks/`, or the help text the change belongs to)
- [ ] 🔐 No credentials, tokens or key material added to the diff
- [ ] The diff carries no local-only output (`dist/`, `.impeccable/`, `.vitest/`)

## 💬 Notes

<!-- Optional: context for reviewers, follow-ups, known limitations, what is
deliberately not done in this PR. -->
