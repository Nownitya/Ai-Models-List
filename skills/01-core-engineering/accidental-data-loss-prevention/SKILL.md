---
name: accidental-data-loss-prevention
description: "Prevent destructive operations and accidental data loss across filesystem, git, and databases."
priority: P0
category: 01-core-engineering
---

# Accidental Data Loss Prevention

Prevent destructive operations and accidental data loss across filesystem, git, and databases.

## When to Use
- Any command with irreversible side-effects (`DROP`, `TRUNCATE`, `rm -rf`, force push).

## Core Protocol / Capabilities
1. Stop and request explicit user confirmation.
2. Verify target directory or database target.
3. Ensure a restorable snapshot or backup exists.

## Anti-Patterns & Warnings
- Running destructive cleanup scripts without asking.
- Force pushing to protected branches.
