---
name: ralph-loop
description: "Execute PRD-driven atomic stories autonomously in tight test-validated loops."
priority: P1
category: 09-autonomous-agents
---

# Ralph Loop

Execute PRD-driven atomic stories autonomously in tight test-validated loops.

## When to Use
- Running autonomous iterative development through repeated cycles.

## Core Protocol / Capabilities
1. Read current atomic story from `tasks/ralph/prd.json`.
2. Implement changes surgically.
3. Execute automated tests; loop until green.
4. Append execution evidence to `tasks/ralph/progress.txt`.

## Anti-Patterns & Warnings
- Unbounded infinite execution loops.
- Skipping DoD criteria.
