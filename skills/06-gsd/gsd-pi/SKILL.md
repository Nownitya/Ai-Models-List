---
name: gsd-pi
title: "GSD Pi"
description: "Pi-specific integration/package for using GSD in the Pi coding agent. It is a host/runtime integration, not a separate planning methodology."
priority: P2
category: 06-gsd
---

# Gsd Pi

> **Priority**: `P2` | **Category**: `06-gsd`

Pi-specific integration/package for using GSD in the Pi coding agent. It is a host/runtime integration, not a separate planning methodology.

## When to Use
- Activate when executing workflows requiring **GSD Pi**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
