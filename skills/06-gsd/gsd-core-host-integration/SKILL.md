---
name: gsd-core-host-integration
title: "GSD Core host integration"
description: "Current Core supports multiple coding-agent runtimes through its host-integration interface; runtime support and installation mode are version-dependent."
priority: P0
category: 06-gsd
---

# Gsd Core Host Integration

> **Priority**: `P0` | **Category**: `06-gsd`

Current Core supports multiple coding-agent runtimes through its host-integration interface; runtime support and installation mode are version-dependent.

## When to Use
- Activate when executing workflows requiring **GSD Core host integration**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
