---
name: code-review
description: "Agent-led review during implementation checking correctness, architecture, and maintainability."
priority: P0
category: 11-code-review
---

# Code Review

Agent-led review during implementation checking correctness, architecture, and maintainability.

## When to Use
- Pre-commit or post-task verification.

## Core Protocol / Capabilities
1. Inspect diff against acceptance criteria.
2. Verify edge cases, nullability, and thread safety.
3. Confirm documentation updates match code changes.

## Anti-Patterns & Warnings
- Approving code with failing tests.
- Overlooking hardcoded credentials.
