---
name: receiving-code-review
title: "receiving-code-review"
description: "Process and resolve review feedback."
priority: P1
category: 11-code-review
---

# Receiving Code Review

> **Priority**: `P1` | **Category**: `11-code-review`

Process and resolve review feedback.

## When to Use
- Activate when executing workflows requiring **receiving-code-review**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
