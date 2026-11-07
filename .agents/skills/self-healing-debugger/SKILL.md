---
name: self-healing-debugger
description: Diagnoses, isolates, and automatically applies surgical bug fixes for runtime exceptions, broken button handlers, API mismatches, or state mutations detected during automated audits. Use when an error has been captured and needs automated root cause analysis, code patching, and test verification without human intervention. Do not use for speculative feature development.
---

# Self-Healing Debugger Skill

## Purpose
This skill provides an automated, autonomous repair mechanism. When the button auditor or feature validator flags an error, failure, or unexpected state, the Self-Healing Debugger analyzes the failure, traces the exact code defect, writes a surgical fix, and re-executes tests to verify resolution with zero regressions.

## Positive Triggers
- "fix broken button"
- "heal runtime error"
- "diagnose and fix test failure"
- "automatic bug repair"
- "solve detected software issue"

## Negative Triggers
- Do not use for rewriting entire files when a 2-line fix is sufficient.
- Do not use for introducing speculative features not in the specification.

## 4-Phase Self-Healing Protocol

### Phase 1: Failure Capture & Reproduction
1. Extract error messages, stack traces, component hierarchies, and relevant props/state.
2. Formulate a minimal reproduction test or script that fails consistently in the current environment.

### Phase 2: Root Cause Analysis
1. Inspect the source file and line indicated in the stack trace.
2. Determine if the bug originates from:
   - Undefined variable / null pointer dereference.
   - Missing or misnamed event handler (e.g., `onClick` missing or referencing undefined function).
   - Incomplete state update or missing re-render trigger.
   - Unhandled promise rejection / missing async try-catch block.
   - Type error or schema mismatch.

### Phase 3: Surgical Code Repair
1. Formulate the smallest possible patch that fixes the defect cleanly.
2. Adhere strictly to existing code style, naming conventions, and project standards.
3. Apply the edit using targeted tool operations.
4. Ensure no extraneous changes or unintended edits are introduced.

### Phase 4: Verification & Regression Gate
1. Execute the reproduction test to verify it now passes.
2. Run the full unit and feature test suite (`npm test`).
3. Run the button auditor to ensure no new regressions were introduced.
4. Confirm resolution and document the fix in the audit ledger.
