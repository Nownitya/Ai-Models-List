---
name: anthropic-skills
description: Anthropic's official public repository for Claude Code Agent Skills (188k+ stars) across engineering workflows, document creation, and tool orchestration.
---

# Anthropic Agent Skills — Official Claude Code Skills Suite

> **Priority**: `P0` | **Category**: `10-ai-infrastructure` | **Upstream**: [`anthropics/skills`](https://github.com/anthropics/skills) (188k+ ⭐)

Anthropic's official public repository for Agent Skills provides standard skill definitions, system prompts, multi-turn tool calling protocols, and domain reasoning rubrics specifically designed for Claude Code, Claude 3.7 Sonnet, and Claude 3.5 Haiku.

---

## When to Use

- Configuring native agent workflows inside Anthropic Claude Code, Cursor, or Antigravity.
- Building custom domain skills following Anthropic's official Agent Skills schema and guidelines.
- Leveraging battle-tested prompts for code refactoring, test generation, and architectural design.

---

## Core Capabilities & Protocols

1. **Official Claude Code Skill Standard**:
   - Universal specification and reference implementation for `SKILL.md` packages.
2. **Production-Grade Reasoning Scaffolds**:
   - Tuned for extended thinking models (Claude 3.7 Sonnet) with multi-step goal decomposition.
3. **Multi-Agent Orchestration**:
   - Clear protocols for primary agent delegation, tool calling safety boundaries, and human-in-the-loop checkpoints.

---

## Installation / Activation Command

```bash
# Add official Anthropic skills to Claude Code
npx @anthropic-ai/claude-code skills add anthropics/skills

# Inspect available official skills
npx @anthropic-ai/claude-code skills list
```

---

## Prerequisites

- Anthropic Claude Code CLI or compatible agent harness.
- Node.js 18+ or Python 3.10+.

---

## Anti-Patterns / Warnings

- **Do NOT blend upstream skill contracts**: Keep Anthropic skills distinct from other creator frameworks to preserve prompt fidelity (Law 4).
- **Never bypass tool permission gates**: Always respect Claude Code's sandbox constraints and bash execution approval prompts.

