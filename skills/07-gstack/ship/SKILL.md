---
name: ship
title: "ship"
description: "Prepare changes for release."
priority: P1
category: 07-gstack
---

# Ship

> **Priority**: `P1` | **Category**: `07-gstack`

Prepare changes for release.

## When to Use
- Activate when executing workflows requiring **ship**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
