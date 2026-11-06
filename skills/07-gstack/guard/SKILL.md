---
name: guard
title: "guard"
description: "Apply safety guardrails."
priority: P1
category: 07-gstack
---

# Guard

> **Priority**: `P1` | **Category**: `07-gstack`

Apply safety guardrails.

## When to Use
- Activate when executing workflows requiring **guard**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
