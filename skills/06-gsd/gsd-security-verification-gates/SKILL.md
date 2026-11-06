---
name: gsd-security-verification-gates
title: "GSD security / verification gates"
description: "Use plan/verify gates, API coverage decisions, human checkpoints and lifecycle guards; check exact behavior in the installed release."
priority: P0
category: 06-gsd
---

# Gsd Security / Verification Gates

> **Priority**: `P0` | **Category**: `06-gsd`

Use plan/verify gates, API coverage decisions, human checkpoints and lifecycle guards; check exact behavior in the installed release.

## When to Use
- Activate when executing workflows requiring **GSD security / verification gates**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
