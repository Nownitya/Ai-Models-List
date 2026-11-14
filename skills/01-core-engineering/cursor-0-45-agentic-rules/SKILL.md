---
name: cursor-0-45-agentic-rules
description: "Cursor 0.45+ modular rules standard (.cursorrules & .cursor/rules/*.mdc), agent tool permissions, and multi-file atomic edits."
priority: P0
category: 01-core-engineering
---

# Cursor 0.45 Agentic Rules

Modern modular rule architecture and autonomous agent execution protocol for Cursor 0.45+ and Cursor Composer environments.

## When to Use
- Managing repository invariants, language standards, and tool execution boundaries in Cursor.
- Structuring modular rules in `.cursor/rules/*.mdc` with frontmatter file globs rather than monolithic `.cursorrules`.
- Enforcing agent permissions for multi-file workspace modifications and terminal execution.
- Preventing AI regressions across complex frontend, mobile, or backend codebases.

## Core Capabilities & Protocol
1. **Modular `.cursor/rules/*.mdc` Architecture**:
   - Split rules into domain-specific `.mdc` files with YAML frontmatter:
     ```yaml
     ---
     description: "React 19 & Tailwind v4 standards"
     globs: ["web/src/**/*.tsx", "web/src/**/*.ts"]
     alwaysApply: false
     ---
     ```
   - Automatically injects specialized context only when editing matching files, saving up to 85% prompt tokens.
2. **Global Invariant Enforcement**:
   - Place critical non-negotiable repository laws into `alwaysApply: true` rules.
   - Enforce dual-matrix parity, zero-warning builds, and clean Git commits before completion.
3. **Agentic Tool Governance**:
   - Establish explicit read/write boundaries for terminal commands, file alterations, and external package installations.
   - Enforce evidence-before-assertion: require live test execution before marking rules as satisfied.

## Activation Command
```bash
/cursor-0-45-agentic-rules
# Or CLI invocation:
npx skills add getcursor/cursor --skill cursor-0-45-agentic-rules
```

## Prerequisites
- Cursor IDE version 0.45+ or compatible Composer agent environment.
- Project root configured with `.cursor/rules/` directory.

## Anti-Patterns & Warnings
- **Monolithic Bloat**: Avoid dumping 500 lines of disparate rules into a single `.cursorrules` file. Use focused `.mdc` files.
- **Overly Broad Globs**: Never set `globs: ["*"]` or `alwaysApply: true` on niche library guidelines (e.g. SQLite, Compose, Docker).
- **Silent Rule Drifts**: Ensure rules are audited against live test suites and code conventions during every sprint.
