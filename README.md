# kuberep - Dependabot POC

This repository is a proof-of-concept to test and demonstrate [Dependabot issue #13042](https://github.com/dependabot/dependabot-core/issues/13042).

## Problem Statement

Kubernetes projects using `k8s-ci-robot` have CI validation rules that reject commit messages containing "@" or "#" symbols. However, many frontend libraries use "@" in their package names (e.g., `@angular/core`, `@mui/material`), causing Dependabot to generate invalid commit messages.

## Example Issue

When Dependabot creates PRs for packages like `@angular/core`, it generates commit messages like:
```
npm: bump @angular/core from 16.0.0 to 16.1.0
```

The "@" symbol causes CI validation to fail in Kubernetes projects.

## Proposed Solution

The issue proposes adding a `substitutions` field to the Dependabot configuration:

```yaml
- package-ecosystem: "npm"
  directory: "/"
  commit-message:
    substitutions:
      - from: "@"
        to: "_at_"
      - from: "#"
        to: "_hash_"
```

This would generate commit messages like:
```
npm: bump _at_angular/core from 16.0.0 to 16.1.0
```

## Testing Setup

This repository contains:
- `package.json` with multiple dependencies using "@" symbols
- `.github/dependabot.yml` configured to update npm dependencies
- Comments showing the proposed substitution syntax

## Usage

1. Enable Dependabot on this repository
2. Observe that PRs are created with "@" symbols in commit messages
3. Test the proposed substitution feature once implemented

## Related Links

- [Original issue](https://github.com/dependabot/dependabot-core/issues/13042)
- [Kueue project issue](https://github.com/kubernetes-sigs/kueue/issues/5773)
- [Example failed PR](https://github.com/kubernetes-sigs/kueue/pull/6748)