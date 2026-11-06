---
name: code-review-skill
title: "code-review skill"
description: "Perform agent-led review during implementation."
priority: P0
category: 11-code-review
---

# Code Review Skill

> **Priority**: `P0` | **Category**: `11-code-review`

Perform agent-led review during implementation.

## When to Use
- Activate when executing workflows requiring **code-review skill**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
