---
name: systematic-debugging
description: Structured 4-phase root cause debugging methodology. Use when encountering runtime errors, test failures, broken API endpoints, or unexpected behavior before proposing or applying code fixes. Do not use for implementing new features from scratch.
---

# Systematic Debugging Skill

## Purpose
This skill replaces speculative trial-and-error patching with a rigorous 4-phase root cause diagnosis methodology. It ensures that bugs in the Madrasha Management platform are understood deeply before any code modifications are made.

## Positive Triggers
- "fix bug"
- "debug runtime error"
- "investigate test failure"
- "unhandled exception"
- "systematic debugging"
- "root cause analysis"

## Negative Triggers
- Do not use for implementing new features or greenfield design.
- Do not use for static design token updates.

## The 4-Phase Diagnostic Process

```
Phase 1: Investigate --> Phase 2: Hypothesize --> Phase 3: Surgical Fix --> Phase 4: Verify & Prevent
```

### Phase 1: Investigation & Evidence Gathering
1. Capture the exact error message, stack trace, and HTTP status code.
2. Identify reproduction conditions: specific input parameters, user role, tenant ID, or device environment.
3. Check daemon server logs:
   - Backend API log: `tail -n 50 apps/api/...`
   - Frontend web console: DevTools / Playwright console logs.
4. Locate the exact source file and line number where the exception originated.

### Phase 2: Mechanism Analysis & Hypothesis
1. Trace the data flow leading to the failing line.
2. Identify which invariant was violated (e.g., null dereference, unhandled asynchronous rejection, type mismatch, missing database relation).
3. Formulate a single clear hypothesis:
   - "The error occurs because X passes null when Y expects an object."
4. Verify the hypothesis by checking actual state without guessing.

### Phase 3: Surgical Remediation
1. Design the minimal targeted modification required to fix the root cause.
2. Avoid broad refactors or unrelated code changes during a bugfix.
3. Preserve existing code style, documentation, and error handling patterns.
4. Ensure no new edge cases are introduced.

### Phase 4: Regression Prevention & Verification
1. Write an automated unit or integration test reproducing the exact failure scenario.
2. Confirm the test fails before the fix (Red) and passes with the fix (Green).
3. Run the full test suite (`npm test`) to confirm zero regressions.
4. Run the button click auditor (`npm run qa:audit`) to confirm UI stability.

## Rules for Madrasha Management Codebase
- Never commit speculative fixes or console log noise.
- Ensure all error logs and comments are free of emojis.
