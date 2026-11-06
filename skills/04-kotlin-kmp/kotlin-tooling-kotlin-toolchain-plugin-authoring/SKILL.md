---
name: kotlin-tooling-kotlin-toolchain-plugin-authoring
title: "kotlin-tooling-kotlin-toolchain-plugin-authoring"
description: "Develop custom Kotlin toolchain plugins."
priority: P3
category: 04-kotlin-kmp
---

# Kotlin Tooling Kotlin Toolchain Plugin Authoring

> **Priority**: `P3` | **Category**: `04-kotlin-kmp`

Develop custom Kotlin toolchain plugins.

## When to Use
- Activate when executing workflows requiring **kotlin-tooling-kotlin-toolchain-plugin-authoring**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
