---
name: skill-repair
title: "skill-repair"
description: "Diagnose and repair broken skills."
priority: P2
category: 01-core-engineering
---

# Skill Repair

> **Priority**: `P2` | **Category**: `01-core-engineering`

Diagnose and repair broken skills.

## When to Use
- Activate when executing workflows requiring **skill-repair**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
