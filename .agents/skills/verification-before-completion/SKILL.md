---
name: verification-before-completion
description: Enforces strict empirical verification before declaring any task, bugfix, or feature complete in the Madrasha Management platform. Use whenever concluding code modifications, before committing changes, or before notifying the user of completion. Do not use at the initial brainstorming stage.
---

# Verification Before Completion Skill

## Purpose
This skill establishes an uncompromising verification standard: "Evidence before assertions always." An agent must never state that a feature is functional, a bug is fixed, or a test passes without executing verification commands and inspecting the output for zero errors.

## Positive Triggers
- "verify work"
- "verify before completion"
- "confirm task is done"
- "final verification before commit"
- "audit before reporting"

## Negative Triggers
- Do not use during the initial planning or brainstorming phase.
- Do not use when no code changes have been made yet.

## The 5 Verification Gates

```
Gate 1: TypeScript Check --> Gate 2: Test Suite --> Gate 3: QA Button Audit --> Gate 4: Zero-Emoji Check --> Gate 5: Evidence Confirmation
```

### Gate 1: Static Type Check & Build
Execute the production build to ensure clean TypeScript compilation across both apps (`apps/api` and `apps/web`):
```bash
npm run build
```
Verify:
- Exit code is 0.
- Zero TypeScript diagnostics errors.
- Bundler completes successfully.

### Gate 2: Automated Unit & Integration Tests
Run the entire Vitest suite across all workspaces:
```bash
npm test
```
Verify:
- All test suites pass.
- 0 failed tests, 0 unhandled promise rejections.

### Gate 3: End-to-End & Button Click Audit
Run the automated Playwright crawler against the running web application:
```bash
npm run qa:audit
```
Verify:
- Discovers and clicks all interactive elements.
- Confirms 0 broken handlers and 0 runtime exceptions.

### Gate 4: Zero-Emoji & Standards Compliance
Verify that no emojis were introduced into code, tests, documentation, or commit messages:
```bash
python3 -c "
import glob
for path in glob.glob('.agents/skills/**/*.md', recursive=True) + glob.glob('apps/**/*.{ts,tsx,js,json}', recursive=True):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    emojis = [c for c in content if ord(c) > 0x1F000]
    if emojis:
        print(f'Error: Emoji found in {path}: {emojis}')
"
```

### Gate 5: Evidence Confirmation
- Check the actual terminal output for each command.
- Never state "Tests are passing" without pasting or citing the exact summary metrics (e.g., "11 passed, 61 passed, 0 failed").
- Only after all gates pass may the changes be committed to Git and reported to the user.
