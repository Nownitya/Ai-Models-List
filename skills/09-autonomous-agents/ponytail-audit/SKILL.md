---
name: ponytail-audit
description: "Quality audit of a whole repo: bugs, security holes, what breaks under real load, risky code without tests, slow paths, and what to delete, merge or split. Ranked, each finding explained in plain English. One-shot report. Use for audit this codebase, review the whole repo, find bloat, what can I delete, /ponytail-audit."
priority: P1
category: 09-autonomous-agents
---

# Ponytail Audit — Repository Quality & Bloat Audit

> **Priority:** `P1` | **Framework:** `Ponytail (Dietrich Gebert)` | **Category:** `09-autonomous-agents`
> **Repository:** https://github.com/DietrichGebert/ponytail | **Documentation:** https://ponytail.dev/docs

Audit the whole repository like the senior developer who just inherited it and will be paged when it breaks.
Order of importance: **correct, safe, holds under load, tested, fast, lean.**
One-shot comprehensive report; changes nothing.

---

## When to Use

* Onboarding to a new or inherited codebase.
* Performing an architectural health check, tech debt inventory, or pre-release audit.
* When asked: `"audit this codebase"`, `"review the whole repo"`, `"find bloat"`, `"what can I delete"`, or `/ponytail-audit`.

---

## Prerequisites & Discovery

* Read access to the target repository or directory tree.
* Discovery of key files: README, build configs, package manifests, entry points (main, routes, handlers, jobs, CLI commands), and tests.

---

## Core Capabilities & Audit Workflow

### Step 1: Map First
* Identify scope: specific directory, module, or entire repository.
* Establish assumed system load (single-user tool vs. high-throughput production service).
* Trace main flows end-to-end: entry points, user input, auth, money/billing, state persistence, background workers, and shared caches.
* Big repository: go deep where failures cost the most. Explicitly declare unread sections.

### Step 2: The 6 Audit Dimensions
1. **Bug:** Logic errors, unhandled boundary cases, broken caller contracts, duplicated conflicting business rules.
2. **Risk:** Security vulnerabilities, hardcoded credentials, injection vectors, data loss from swallowed exceptions or lack of transactions.
3. **Scale:** Race conditions, unindexed database queries, unbounded collections, concurrency bottlenecks.
4. **Missing Test:** Critical paths (money, auth, security, state transitions) lacking automated assertions.
5. **Speed:** High-impact latency bottlenecks in primary execution paths.
6. **Lean (Bloat & Debt Elimination):**
   - *Dead code:* Unused files, dead routes, obsolete flags and configs.
   - *Duplication:* Duplicate helpers across modules (nominate canonical version).
   - *Dependency bloat:* External packages that can be dropped in favor of stdlib or native APIs.
   - *Speculative design:* Unused interfaces, single-implementation factories, redundant passthrough wrappers.

### Step 3: Verification Checks
* Before reporting code as dead or unused, grep the entire tree including dynamic references, configs, and tests.
* Validate that reported issues have concrete failure conditions.
* Distinguish between unmanaged debt and tracked shortcuts (`shortcut: <limit>, <trigger>`).

### Step 4: Audit Output Format
1. **What this repo does:** 2-3 sentences describing architecture and assumed load.
2. **Ranked Findings (Max 20):** Grouped into **Must fix**, **Should fix**, and **Nice to have**.
3. **Verdict:** Health verdict (`Healthy` or prioritized fixes).
4. **Lean Metrics:** `Lean: -<N> lines, -<M> dependencies possible.`
5. **Not checked:** Scope boundaries left unexamined.

---

## Anti-Patterns & Warnings

* **Speculative refactoring:** Do not suggest restructuring healthy, working code without clear bug, risk, or scale reasons.
* **Unverified dead code claims:** Never claim code is dead without comprehensive multi-pattern grep checks.
