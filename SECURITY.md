# Security Policy

## Supported Versions
This portfolio project supports the latest commit on `main`.

## Dependency Security Process
- Dependencies are monitored with GitHub Dependabot (`.github/dependabot.yml`).
- CI runs security checks using `npm audit` on each push and pull request.
- High/Critical production vulnerabilities must be addressed before merge.

## Reproducibility
- Use `npm install` in CI until a lockfile can be committed; switch to `npm ci` once `package-lock.json` is present for deterministic installs.
- Do not manually edit `package-lock.json`.

## Reporting a Vulnerability
If you find a vulnerability, open a private security advisory on GitHub for this repository, or open an issue that avoids disclosing exploit details.

## Public Repo Data Safety
This repo contains only fictional demo data and no OP proprietary credentials, assets, or private operational data.
