---
name: ponytail-debt
description: "List every shortcut: comment (and older ponytail: ones) as a debt ledger. One-shot report, changes nothing. Use for ponytail debt, what did ponytail defer, list the shortcuts, /ponytail-debt."
priority: P2
category: 09-autonomous-agents
---

# Ponytail Debt — Shortcut & Deferral Ledger

> **Priority:** `P2` | **Framework:** `Ponytail (Dietrich Gebert)` | **Category:** `09-autonomous-agents`
> **Repository:** https://github.com/DietrichGebert/ponytail | **Documentation:** https://ponytail.dev/docs

Collects deliberate shortcut comments into a prioritized technical debt ledger so deferred work never silently rots into permanent obscurity.

---

## When to Use

* Tracking deferred tasks, temporary bridges, or bounded shortcuts across a project.
* When asked: `"ponytail debt"`, `"what did ponytail defer"`, `"list the shortcuts"`, or `/ponytail-debt`.
* Prior to release milestones to verify if any shortcut ceiling has been exceeded.

---

## Prerequisites & Conventions

* Standard comment format:
  ```
  // shortcut: <ceiling/limit>, <upgrade trigger>
  # shortcut: <ceiling/limit>, <upgrade trigger>
  /* shortcut: <ceiling/limit>, <upgrade trigger> */
  ```
* Also recognizes legacy `ponytail:` comment tags or user-specified custom markers (`/ponytail-debt TODO`).

---

## Core Capabilities & Scan Workflow

### 1. Repository Scan
Grep the repository excluding `.git`, build outputs, dependencies, and gitignored folders:
```bash
git grep --no-index --exclude-standard -nE '(#|//|/[*]) ?(shortcut|ponytail):'
```

### 2. Ledger Parsing & Categorization
* Extract `<file>:<line>`, description, ceiling/limit, and upgrade trigger.
* Flag `no-trigger` risks: any shortcut comment lacking an upgrade trigger is highlighted as a high-risk rotting item.
* Optional blame lookup: attach git author via `git blame -L<line>,<line>` when requested.

### 3. Output Format
* Grouped by file:
  `<file>:<line>, <what was simplified>. ceiling: <limit>. upgrade: <trigger>.`
* Summary line:
  `<N> markers, <M> with no trigger.` (or `No shortcut debt. Clean ledger.`)
* Optional export: On request, writes ledger to `PONYTAIL-DEBT.md`.

---

## Anti-Patterns & Warnings

* **Modifying source files:** This is a read-only audit skill; do not alter or remove markers without explicit instruction.
* **Missing upgrade triggers:** Creating shortcuts without specifying their ceiling and revisiting condition.
