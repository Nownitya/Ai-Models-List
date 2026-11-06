---
name: verification-before-completion
description: "Verify builds, tests, and deliverables with live execution proof before claiming done."
priority: P0
category: 01-core-engineering
---

# Verification Before Completion

Verify builds, tests, and deliverables with live execution proof before claiming done.

## When to Use
- Concluding any task, story, or PR.

## Core Protocol / Capabilities
1. Execute the target test suite (`./gradlew test`, `pytest`, `npm test`).
2. Verify clean compilation without warnings.
3. Inspect git status to ensure zero accidental untracked changes.

## Anti-Patterns & Warnings
- Claiming 'all tests passed' without executing them.
- Relying on old cached test runs.
