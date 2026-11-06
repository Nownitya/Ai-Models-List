---
name: requesting-code-review
title: "requesting-code-review"
description: "Prepare implementation changes for independent review."
priority: P1
category: 01-core-engineering
---

# Requesting Code Review

> **Priority**: `P1` | **Category**: `01-core-engineering`

Prepare implementation changes for independent review.

## When to Use
- Activate when executing workflows requiring **requesting-code-review**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
