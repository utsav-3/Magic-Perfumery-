# Security

- Secrets live only in `.env.local` (git-ignored) and your host's environment
  settings. Only `.env.example` is committed, with placeholder values.
- Anything prefixed `NEXT_PUBLIC_` is shipped to the browser — never put a
  secret behind that prefix.
- Security headers are set in `next.config.ts`; add a Content-Security-Policy
  once third-party scripts (analytics, payments) are known.
- CI runs with a read-only token and no secrets. Dependabot opens weekly update PRs.

Report vulnerabilities privately to the maintainers rather than in a public issue.
