---
name: gsd-capability-framework
title: "GSD capability framework"
description: "Optional capabilities extend GSD workflows; evaluate only the capabilities required by the project."
priority: P1
category: 06-gsd
---

# Gsd Capability Framework

> **Priority**: `P1` | **Category**: `06-gsd`

Optional capabilities extend GSD workflows; evaluate only the capabilities required by the project.

## When to Use
- Activate when executing workflows requiring **GSD capability framework**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
