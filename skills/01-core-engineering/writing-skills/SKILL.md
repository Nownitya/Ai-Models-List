---
name: writing-skills
title: "writing-skills"
description: "Create and maintain reusable agent skills."
priority: P2
category: 01-core-engineering
---

# Writing Skills

> **Priority**: `P2` | **Category**: `01-core-engineering`

Create and maintain reusable agent skills.

## When to Use
- Activate when executing workflows requiring **writing-skills**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
