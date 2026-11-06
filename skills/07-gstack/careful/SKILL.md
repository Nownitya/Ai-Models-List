---
name: careful
description: "Guardrail mode: protect against destructive, risky, or irreversible operations."
priority: P0
category: 07-gstack
---

# Careful

Guardrail mode: protect against destructive, risky, or irreversible operations.

## When to Use
- Executing commands with potential production or data risk.

## Core Protocol / Capabilities
1. Prompt user before running high-risk commands.
2. Enforce dry-run mode where available.
3. Confirm backup availability.

## Anti-Patterns & Warnings
- Bypassing safety checks.
- Running unvetted batch scripts.
