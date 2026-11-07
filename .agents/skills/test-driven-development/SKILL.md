---
name: test-driven-development
description: Enforces strict Test-Driven Development (TDD) using the Red-Green-Refactor loop. Use when implementing any new feature, API route, calculation, or bugfix in the Madrasha Management platform before writing production code. Do not use for exploratory spikes or purely visual CSS styling changes.
---

# Test-Driven Development (TDD) Skill

## Purpose
This skill ensures all functional code in the Madrasha Management Software is backed by automated tests written before the implementation code. It prevents regressions, enforces testable architectures, and eliminates speculative coding.

## Positive Triggers
- "write test first"
- "implement feature with tdd"
- "add unit test"
- "test-driven development"
- "fix bug with regression test"

## Negative Triggers
- Do not use for purely visual CSS adjustments or static HTML changes.
- Do not use when only reading logs or documentation.

## The TDD Protocol: Red-Green-Refactor

```
[Write Failing Test] (Red) --> [Minimal Implementation] (Green) --> [Refactor Code] (Clean)
```

### 1. Phase 1: Red (Failing Test First)
1. Identify the specific behavior, validation rule, or calculation to implement.
2. Create or open the test file in `apps/api/src/**/*.test.ts` or `apps/web/src/**/*.test.tsx`.
3. Write a test case that clearly asserts the expected behavior.
4. Execute the test runner:
   ```bash
   npm test
   ```
5. Verify that the test fails for the expected reason (e.g., function undefined, assertion mismatch, missing route), not due to syntax or import crashes.

### 2. Phase 2: Green (Minimal Passing Implementation)
1. Write the minimal amount of production code needed to satisfy the failing test.
2. Do not write ahead or add speculative features.
3. Re-run the test:
   ```bash
   npm test
   ```
4. Confirm that the test now passes cleanly.

### 3. Phase 3: Refactor
1. Review the passing implementation for code cleanliness, type safety, performance, and naming consistency.
2. Remove duplication and improve structure without altering behavior.
3. Re-run tests to confirm zero regressions:
   ```bash
   npm test
   ```

## Rules for Madrasha Management Codebase
- Test Runner: Use Vitest with `happy-dom` for web components and native Vitest for backend services.
- Assertions: Always make assertions specific (avoid generic `toBeDefined()`; prefer `toBe(expectedValue)` or `toEqual(expectedObject)`).
- Zero Emojis: Ensure test descriptions, log messages, and error strings contain zero emojis.
