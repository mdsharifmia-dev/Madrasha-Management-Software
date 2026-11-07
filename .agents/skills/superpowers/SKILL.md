---
name: superpowers
description: Obra/Superpowers software engineering methodology orchestrator for the Madrasha Management platform. Enforces disciplined skill invocation, structured brainstorming, plan authoring, test-driven development (TDD), 4-phase systematic debugging, and rigorous verification before completion. Use when architecting, developing, debugging, or verifying software features. Do not use for trivial single-word queries or simple documentation lookups.
---

# Superpowers Engineering Protocol

## Purpose
This skill crystallizes the obra/superpowers methodology into the Madrasha Management codebase. It enforces engineering rigor across all agent workflows: eliminating guesswork, mandating test-first development, conducting 4-phase systematic debugging, and requiring verifiable evidence before declaring any task complete.

## Positive Triggers
- "superpowers"
- "using-superpowers"
- "brainstorm architecture"
- "write implementation plan"
- "execute plan"
- "test-driven development"
- "tdd"
- "systematic debugging"
- "find and fix bug"
- "verify before completion"

## Negative Triggers
- Do not use for simple documentation reading or one-off text questions.
- Do not use for routine git status checks.

## Core Superpowers Pillars

```
Brainstorming --> Writing Plans --> Executing Plans (TDD) --> Systematic Debugging --> Verification
```

### 1. Skill Invocation Discipline (`using-superpowers`)
- When a task begins, identify and invoke the relevant skills before generating code or taking action.
- Process skills take precedence:
  - Creative feature request: invoke `brainstorming`.
  - Bug report or failure: invoke `systematic-debugging`.
  - Feature implementation: invoke `test-driven-development`.
  - Task completion: invoke `verification-before-completion`.

### 2. Structured Brainstorming (`brainstorming`)
- Before writing code or entering deep implementation:
  - Clarify the user intent and problem statement.
  - Formulate 2 to 3 distinct architectural approaches (e.g., modular vs consolidated, reactive vs synchronous).
  - Compare tradeoffs: complexity, maintainability, performance, security, and edge cases.
  - Present recommendations with clear rationale.

### 3. Plan Authoring (`writing-plans`)
- Construct actionable, step-by-step implementation plans:
  - Define prerequisites, environmental dependencies, and file touches.
  - Detail exact files to be created, edited, or removed.
  - Include verification commands for every individual step.
  - Structure tasks so that failure at any step halts progress immediately.

### 4. Plan Execution (`executing-plans`)
- Execute plans methodically, step-by-step:
  - Keep changes surgical and confined within workspace boundaries.
  - Run verification immediately after each step.
  - Maintain a clean commit history with conventional commit messages.

### 5. Test-Driven Development (`test-driven-development`)
- Strictly enforce the Red-Green-Refactor loop:
  1. Red: Write a failing unit, integration, or end-to-end test that defines the expected behavior. Run the test and confirm it fails for the correct reason.
  2. Green: Write the minimal implementation code required to make the test pass. Verify the test passes.
  3. Refactor: Clean up implementation, eliminate duplication, improve types and readability, ensuring all tests continue to pass.

### 6. Systematic Debugging (`systematic-debugging`)
- Resolve bugs using a 4-phase diagnostic process instead of speculative trial-and-error:
  - Phase 1: Investigation & Evidence Gathering: Inspect error logs, stack traces, and environment configuration.
  - Phase 2: Hypothesis Formulation: Identify the root mechanism causing the failure. Formulate a testable hypothesis.
  - Phase 3: Surgical Remediation: Apply the smallest necessary fix that directly addresses the root cause without side effects.
  - Phase 4: Regression Prevention: Write an automated test reproducing the original issue and verify it now passes.

### 7. Verification Before Completion (`verification-before-completion`)
- Absolute standard: Evidence before assertions always.
- Never declare a task resolved, passing, or complete without:
  1. Running the test suite (`npm test`).
  2. Running the build check (`npm run build`).
  3. Running the automated browser and button audit (`npm run qa:audit`).
  4. Inspecting the actual command output and verifying 0 errors.

## Compliance Standards
- Zero Emojis: Strictly prohibit any emoji characters in code, tests, documentation, commit messages, and chat responses.
- Project Containment: All operations and file changes must remain strictly inside `/home/sharif/projects/Madrasha Management Software`.
- Zero Trust: Never hardcode passwords, tokens, or personal identifiers.
