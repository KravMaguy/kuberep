# Testing Instructions for Dependabot Issue #13042

## Quick Setup

This repository is now ready to test the Dependabot commit message sanitization issue.

## How to Test

1. **Enable Dependabot** on this repository:
   - Go to repository Settings > Security & Analysis
   - Enable "Dependabot security updates" and "Dependabot version updates"

2. **Wait for Dependabot PRs** to be created automatically, or trigger manually:
   - Dependabot will scan the `package.json` file
   - It will create PRs for outdated dependencies like `@angular/core`, `@mui/material`, etc.

3. **Observe the commit messages** in the generated PRs:
   - They will contain "@" symbols (e.g., "npm: bump @angular/core from 16.0.0 to 16.1.0")
   - These messages would fail CI validation in Kubernetes projects

4. **Test the proposed solution** (once implemented):
   - Uncomment the `substitutions` section in `.github/dependabot.yml`
   - Verify that new PRs use sanitized commit messages (e.g., "npm: bump _at_angular/core from 16.0.0 to 16.1.0")

## Package Dependencies with "@" Symbols

The `package.json` includes these packages that will trigger the issue:
- `@angular/core` - Angular framework core
- `@angular/common` - Angular common utilities  
- `@mui/material` - Material-UI components
- `@types/node` - TypeScript definitions
- `@babel/core` - Babel JavaScript compiler
- `@vue/cli` - Vue.js CLI tools
- `@testing-library/react` - React testing utilities
- `@types/jest` - Jest TypeScript definitions
- `@typescript-eslint/eslint-plugin` - TypeScript ESLint plugin

## Expected Behavior

### Current Behavior (Problem)
Commit messages like: `npm: bump @angular/core from 16.0.0 to 16.1.0`

### Desired Behavior (After Fix)  
Commit messages like: `npm: bump _at_angular/core from 16.0.0 to 16.1.0`

## References

- [Dependabot Core Issue #13042](https://github.com/dependabot/dependabot-core/issues/13042)
- [Kueue Project Issue #5773](https://github.com/kubernetes-sigs/kueue/issues/5773)
- [Example Failed PR](https://github.com/kubernetes-sigs/kueue/pull/6748)