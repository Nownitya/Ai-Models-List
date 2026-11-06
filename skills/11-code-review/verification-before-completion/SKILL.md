---
name: verification-before-completion
title: "verification-before-completion"
description: "Run builds, tests and checks before declaring work complete."
priority: P0
category: 11-code-review
---

# Verification Before Completion

> **Priority**: `P0` | **Category**: `11-code-review`

Run builds, tests and checks before declaring work complete.

## When to Use
- Activate when executing workflows requiring **verification-before-completion**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
