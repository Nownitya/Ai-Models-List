---
name: handoff
title: "handoff"
description: "Transfer project context between sessions and agents."
priority: P1
category: 01-core-engineering
---

# Handoff

> **Priority**: `P1` | **Category**: `01-core-engineering`

Transfer project context between sessions and agents.

## When to Use
- Activate when executing workflows requiring **handoff**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
