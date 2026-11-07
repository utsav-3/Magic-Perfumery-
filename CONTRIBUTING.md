# Contributing

1. `npm run setup` (once), then branch from `main`: `git switch -c feat/short-name`.
2. Follow the rules in [AGENTS.md](AGENTS.md).
3. Run `npm run verify` before pushing; CI runs the same gate plus build and E2E.
4. Open a PR using the template. User-facing changes get a line in
   `CHANGELOG.md` under **Unreleased**.

Commit messages: imperative mood, ≤ 72-char subject (`Add note pyramid to product page`).
