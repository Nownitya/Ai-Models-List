---
name: ponytail-review
description: "Quality review of a change: is the logic right, is it safe, does it hold under real load, is risky code tested, is it fast enough, and is every line needed. Reads connected code, not only the diff. Use for review this, code review, review the last commit, review my PR, is this over-engineered, /ponytail-review."
priority: P1
category: 09-autonomous-agents
---

# Ponytail Review — Pragmatic Senior Code Review

> **Priority:** `P1` | **Framework:** `Ponytail (Dietrich Gebert)` | **Category:** `09-autonomous-agents`
> **Repository:** https://github.com/DietrichGebert/ponytail | **Documentation:** https://ponytail.dev/docs

Review a change like the senior developer who will be paged when it breaks.
Order of importance: **correct, safe, holds under load, tested, fast, lean.**
Lean still matters: every extra line must be read, tested, and fixed later.

---

## When to Use

* Reviewing pull requests, staged changes, uncommitted diffs, or specific commits.
* When asked: `"review this"`, `"code review"`, `"review my PR"`, `"is this over-engineered"`, or `/ponytail-review`.
* Auditing whether a change introduces bloat, redundant dependencies, or unneeded abstractions.

---

## Prerequisites & Input Context

* Target diff or file scope: uncommitted/staged changes, a git branch, a PR, or specific file paths. (If unspecified, review uncommitted changes, or HEAD commit).
* Knowledge of expected system scale/load (single-user script vs. high-concurrency multi-tenant service).

---

## Core Capabilities & Review Workflow

### Step 1: Understand First
* Read the diff, then the code it touches: callers of every changed function, functions it calls, tests, and configuration.
* Trace the real data flow: where data comes in, what is stored, what goes out.
* A change can break code it does not touch. When a signature or return value changes, grep every caller.
* State the expected load assumed during review.

### Step 2: The 6 Review Pillars
1. **Bug:** Wrong result, crash, unhandled edge cases (empty, zero, last item, rounding, time zones), broken callers, partial fixes in callers leaving shared core broken.
2. **Risk:** Security vulnerabilities (injection, weak randomness, hardcoded secrets, missing auth/input validation), data loss (swallowed errors, wrong write order, missing transactions).
3. **Scale:** Check-then-write race conditions, unbounded memory growth, N+1 queries, O(n^2) bottlenecks on large input, unshared per-process state.
4. **Missing Test:** Risky new logic (branch, parser, money, security, data write, bug fix) with no test asserting expected behavior.
5. **Speed:** Big slowdowns in hot paths. Small wins are optional suggestions.
6. **Lean (Anti-Bloat):**
   - *Delete:* Dead code, unused options, speculative features.
   - *Reuse:* Reusing existing helpers in the repository (name exact path).
   - *Stdlib/Native:* Replacing dependencies with standard library or native platform capabilities.
   - *YAGNI:* Removing abstractions with only one implementation or unused config.
   - *Merge:* Consolidating near-identical clones.
   - *Split:* Splitting functions mixing unrelated responsibilities (split by job, never merely for line-count golf).

### Step 3: Verification Before Reporting
* Every finding must have a concrete, reproducible failure case: `"this input/situation leads to this wrong result."`.
* Propose the smallest fix that works, prioritizing fixes that delete code.
* Deliberate shortcuts marked with `shortcut: <limit>, <trigger>` are noted decisions, not bugs (unless current load exceeds the limit).

### Step 4: Structured Output Format
1. **What this change does:** 2-3 sentences explaining business & functional impact.
2. **Ranked Findings:**
   - **Must fix:** Bug, security, data loss, breaks at expected load.
   - **Should fix:** Risky code without tests, real slowness, duplication, mixed responsibilities, dead code.
   - **Nice to have:** Small speed-ups, shorter idiomatic forms.
3. **Verdict:** `Verdict: Ship.` or `Verdict: Fix <N> first.`
4. **Lean Metric:** `Lean: -<N> lines possible.`
5. **Not checked:** Scope boundaries or unverified edge cases.

---

## Anti-Patterns & Warnings

* **No style nits or vague opinions:** Do not debate formatting, syntax taste, or vague hypothetical worries without a reproducible failure case.
* **No speculative suggestions:** Never recommend adding generic abstractions, extra layers, or configuration frameworks.
