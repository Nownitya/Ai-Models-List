---
name: subagent-driven-development
title: "subagent-driven-development"
description: "Delegate independent implementation tasks to subagents."
priority: P1
category: 01-core-engineering
---

# Subagent Driven Development

> **Priority**: `P1` | **Category**: `01-core-engineering`

Delegate independent implementation tasks to subagents.

## When to Use
- Activate when executing workflows requiring **subagent-driven-development**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
