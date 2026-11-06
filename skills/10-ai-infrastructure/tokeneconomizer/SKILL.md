---
name: tokeneconomizer
title: "TokenEconomizer"
description: "Experience-driven coding-agent cost control. Learns repository-specific micro-skills from repeated sessions, prunes tools that remain unused, and detects recurring failure loops to suggest a redirect. Local learning data; supports Claude Code, Codex, GitHub Copilot CLI and Pi, with experimental OpenCode support. Evaluate on repeated work in the same repository; savings are workload-dependent."
priority: P1
category: 10-ai-infrastructure
---

# Tokeneconomizer

> **Priority**: `P1` | **Category**: `10-ai-infrastructure`

Experience-driven coding-agent cost control. Learns repository-specific micro-skills from repeated sessions, prunes tools that remain unused, and detects recurring failure loops to suggest a redirect. Local learning data; supports Claude Code, Codex, GitHub Copilot CLI and Pi, with experimental OpenCode support. Evaluate on repeated work in the same repository; savings are workload-dependent.

## When to Use
- Activate when executing workflows requiring **TokenEconomizer**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
