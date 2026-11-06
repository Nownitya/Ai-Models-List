---
name: token-economizer
description: "Experience-driven coding-agent cost and context control via micro-skill learning and tool pruning."
priority: P1
category: 10-ai-infrastructure
---

# Token Economizer

Experience-driven coding-agent cost and context control via micro-skill learning and tool pruning.

## When to Use
- Managing token costs and preventing context window bloat in repeated repository sessions.

## Core Protocol / Capabilities
1. Analyze agent tool usage patterns.
2. Prune inactive tools from prompt context.
3. Inject learned repository micro-skills.

## Anti-Patterns & Warnings
- Pruning tools that are required for emergency recovery.
- Discarding failure logs prematurely.
