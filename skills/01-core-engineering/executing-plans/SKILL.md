---
name: executing-plans
description: "Execute implementation plans systematically with atomic commits and verification."
priority: P0
category: 01-core-engineering
---

# Executing Plans

Execute implementation plans systematically with atomic commits and verification.

## When to Use
- Carrying out an approved PLAN.md.

## Core Protocol / Capabilities
1. Take one atomic task at a time.
2. Make surgical code edits.
3. Run verification commands and inspect exit codes before committing.

## Anti-Patterns & Warnings
- Skipping verification steps.
- Mixing unrelated tasks in a single commit.
