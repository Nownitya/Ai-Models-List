---
name: selection-guidance
title: "Selection guidance"
description: "Graphify answers: how is this codebase connected and where does execution/reuse flow? Context7 answers: how does this external library/API work in its current version? MemPalace/Strata answer: what durable knowledge should persist across sessions? Choose memory products based on privacy, retrieval quality, local-first needs and integrations."
priority: P0
category: 10-ai-infrastructure
---

# Selection Guidance

> **Priority**: `P0` | **Category**: `10-ai-infrastructure`

Graphify answers: how is this codebase connected and where does execution/reuse flow? Context7 answers: how does this external library/API work in its current version? MemPalace/Strata answer: what durable knowledge should persist across sessions? Choose memory products based on privacy, retrieval quality, local-first needs and integrations.

## When to Use
- Activate when executing workflows requiring **Selection guidance**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
