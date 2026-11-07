---
name: speckit
description: Enforces and executes the GitHub Spec Kit and Spec-Driven Development (SDD) methodology for the Madrasha Management platform. Use when designing new modules, defining architectural standards, drafting specifications, breaking down tasks, or implementing features according to formal specifications. Do not use for quick ad-hoc commands or single-line typo fixes.
---

# Spec-Kit (Spec-Driven Development) Skill

## Purpose
This skill establishes strict Spec-Driven Development (SDD) across all engineering workflows in the Madrasha Management Software. It guarantees zero "YOLO" coding by enforcing that every non-trivial feature, architectural shift, or domain extension is defined, planned, and validated through formal artifacts before implementation begins.

## Positive Triggers
- "speckit"
- "spec-driven development"
- "create spec for [feature]"
- "plan architecture for [module]"
- "break down tasks for implementation"
- "implement according to spec"
- Commands: `/speckit.constitution`, `/speckit.specify`, `/speckit.clarify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.analyze`, `/speckit.checklist`, `/speckit.implement`, `/speckit.converge`

## Negative Triggers
- Do not use for single-line typo or syntax fixes.
- Do not use for exploratory queries or reading logs.
- Do not use for ad-hoc git status checks.

## Spec-Kit Workflow Stages

```
Constitution --> Specify --> Clarify --> Plan --> Tasks --> Implement --> Converge
```

### Stage 1: Constitution (`.specify/memory/constitution.md`)
- Establish immutable principles and technical standards:
  - Multi-tenancy isolation by `institutionId`.
  - Zero hardcoded secrets and environment variable isolation.
  - WCAG AA high-contrast visual standards (UI/UX Pro Max).
  - Absolute zero-emoji policy across all code, tests, docs, and communication.
  - Strict zero-female representation policy for mockups, illustrations, and UI avatars.

### Stage 2: Feature Specification (`specs/<feature-name>/spec.md`)
- Draft clear functional requirements from user stories.
- Specify user scenarios with Given/When/Then acceptance criteria.
- Structure data contracts, schemas, and API request/response formats in clean YAML blocks.
- Document edge cases, boundary conditions, and role-based permissions.

### Stage 3: Clarification (`/speckit.clarify`)
- Scan specification for ambiguities, conflicting requirements, or missing details.
- Formulate up to 5 concise, targeted questions to resolve uncertainties before technical design.

### Stage 4: Architectural Plan (`specs/<feature-name>/plan.md`)
- Define architectural components, database schema changes (Prisma/PostgreSQL), and backend routes.
- Define frontend state management, view routing, component hierarchy, and responsiveness.
- Document technical debt avoidance, performance budgets, and security posture.

### Stage 5: Task Decomposition (`specs/<feature-name>/tasks.md`)
- Deconstruct the plan into a sequenced checklist of atomic, verifiable tasks:
  - Phase 1: Data Models, Migrations, and Validation Schemas.
  - Phase 2: Service Layer, Business Logic, and Unit Tests (TDD).
  - Phase 3: REST API Controllers and Integration Tests.
  - Phase 4: Frontend UI Components, Design System Tokens, and State Bindings.
  - Phase 5: End-to-End Audits, Accessibility Checks, and Button Click Auditing.
- Each task must follow the markdown format:
  ```markdown
  - [ ] Task [ID]: Specific actionable description with target file paths
  ```

### Stage 6: Consistency & Quality Analysis (`/speckit.analyze`, `/speckit.checklist`)
- Cross-reference `spec.md`, `plan.md`, and `tasks.md`.
- Ensure 100% requirements coverage with zero orphaned tasks or missing specs.
- Evaluate security, UX, performance, and accessibility against quality checklists.

### Stage 7: Surgical Implementation (`/speckit.implement`)
- Execute checklist tasks sequentially.
- Follow Test-Driven Development (TDD): write failing test first, make it pass, refactor.
- Mark completed tasks as `[X]` in `tasks.md`.
- Keep diffs surgical without speculative features or broken style conventions.

### Stage 8: Convergence & Verification (`/speckit.converge`)
- Audit codebase against the initial specification and plan.
- Run all automated test suites (`npm test`) and Playwright audits (`npm run qa:audit`).
- Append any residual gaps to `tasks.md` and complete them before marking the feature done.

## Project Domain Standards
When creating specifications for Madrasha Management Software, adhere to:
- Financial Ledger: All cash flow entries must support dual vouchers (Receipt `#RC-...` and Voucher `#VC-...`) with fund balances.
- Academic & Attendance: Support both Islamic curriculum departments (Hifz, Kitab) and general education streams.
- Multi-Tenancy: Every query and transaction must enforce tenant boundaries via Prisma middleware or explicit tenant filters.
- Zero Emojis: Maintain pure professional markdown with clean headers, tables, code blocks, and diagrams.
