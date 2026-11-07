---
name: button-click-auditor
description: Systematically crawls, clicks, and audits all interactive buttons, tabs, dropdowns, modal triggers, and form submits in the web application using automated browser and headless DOM testing. Use when validating that all buttons have working handlers, do not trigger JavaScript errors, and respond correctly to user interaction. Do not use for testing non-interactive static pages.
---

# Button Click Auditor Skill

## Purpose
This skill enables an autonomous agent to crawl, catalog, and interactively click every button and interactive trigger across all modules of the Madrasha Management platform. It monitors and catches runtime exceptions, broken state handlers, missing `onClick` bindings, and unhandled promise rejections.

## Positive Triggers
- "audit all buttons"
- "check every button in the software"
- "verify UI clicks"
- "find broken buttons or missing click handlers"
- "test modal and dropdown triggers"

## Negative Triggers
- Do not use for writing production UI components.
- Do not use for non-interactive content reviews.

## Core Audit Methodology

### 1. Element Discovery Phase
The auditor scans the rendered DOM for:
- All `<button>` elements.
- All elements with role="button".
- All clickable navigation links (`<a>` tags with href or click handlers).
- All dropdown toggle triggers, modal openers, and close buttons.
- All action triggers in data tables (e.g., Receipt Print, Voucher Slip, Edit, Delete, View).

### 2. Interaction Execution Phase
For each discovered button:
1. Ensure the element is visible and interactive (not disabled by design unless under specific testing scenarios).
2. Attach a global error listener (`window.onerror` and `window.addEventListener('unhandledrejection')`).
3. Trigger the click event with a clean user-event dispatch.
4. Capture any state mutation (e.g., active tab change, modal visibility, counter increment, API request).
5. If a modal opens, locate its close button or cancel action and verify dismissal.
6. Verify no red console errors or uncaught exceptions were logged.

### 3. Verification Checklist
- [ ] Every sidebar navigation item opens its corresponding module view without errors.
- [ ] Top bar quick actions (Theme Toggle, Language Dropdown, Alert Bell, Impersonation Back button) function smoothly.
- [ ] Table row actions trigger their intended preview, receipt modal, or drawer without blanking out the screen.
- [ ] Form submit buttons validate required fields or submit payloads without crashing.
- [ ] Pagination controls advance pages and update ledger counts correctly.

### 4. Output Artifacts
When the audit finishes, the auditor produces an audit summary containing:
- Total buttons discovered.
- Total buttons successfully clicked without errors.
- List of any failing buttons with selector, text label, module path, and exact error stack.
