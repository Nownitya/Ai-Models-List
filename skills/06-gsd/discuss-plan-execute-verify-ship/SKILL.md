---
name: discuss-plan-execute-verify-ship
title: "Discuss → Plan → Execute → Verify → Ship"
description: "Core milestone lifecycle documented by current GSD Core; use its current command names and phase workflow rather than relying on legacy command lists."
priority: P0
category: 06-gsd
---

# Discuss → Plan → Execute → Verify → Ship

> **Priority**: `P0` | **Category**: `06-gsd`

Core milestone lifecycle documented by current GSD Core; use its current command names and phase workflow rather than relying on legacy command lists.

## When to Use
- Activate when executing workflows requiring **Discuss → Plan → Execute → Verify → Ship**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
