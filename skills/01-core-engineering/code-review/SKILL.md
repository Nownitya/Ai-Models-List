---
name: code-review
title: "code-review"
description: "Review implementation quality, correctness and maintainability."
priority: P0
category: 01-core-engineering
---

# Code Review

> **Priority**: `P0` | **Category**: `01-core-engineering`

Review implementation quality, correctness and maintainability.

## When to Use
- Activate when executing workflows requiring **code-review**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
