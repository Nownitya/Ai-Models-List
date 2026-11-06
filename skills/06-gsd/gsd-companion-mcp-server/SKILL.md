---
name: gsd-companion-mcp-server
title: "GSD companion MCP server"
description: "Companion MCP server provides GSD interface operations; OpenCode integration is documented in current release notes."
priority: P1
category: 06-gsd
---

# Gsd Companion Mcp Server

> **Priority**: `P1` | **Category**: `06-gsd`

Companion MCP server provides GSD interface operations; OpenCode integration is documented in current release notes.

## When to Use
- Activate when executing workflows requiring **GSD companion MCP server**.
- Follow project architecture rules and verify compatibility before loading.

## Core Capabilities & Protocol
1. **Initialize Context**: Load relevant contracts, tests, and documentation.
2. **Execute Action**: Perform surgical, task-specific implementations following standards.
3. **Validate Result**: Run verification commands and assert expected behavior.

## Anti-Patterns & Warnings
- Speculative changes without verifiable acceptance criteria.
- Loading duplicate overlapping tools simultaneously causing context degradation.
