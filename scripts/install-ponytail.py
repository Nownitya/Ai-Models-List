#!/usr/bin/env python3
"""
install-ponytail.py — Installs and enriches the complete Ponytail skill suite
(by Dietrich Gebert) conforming to Law 2 & Law 4 across the repository and agent runtime.
"""

import sys
from pathlib import Path

# Force UTF-8 encoding
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SKILLS_DATA = {
    "ponytail": """---
name: ponytail
description: "Lazy senior dev mode: the smallest change that fully solves the task, and a reply a busy human understands in one read. Use on any coding task (writing, fixing, refactoring, reviewing, choosing dependencies) and when the user says ponytail, be lazy, simplest solution, yagni, or complains about over-engineering. Levels: lite, full (default), ultra."
priority: P1
category: 09-autonomous-agents
---

# Ponytail — Lazy Senior Dev Mode

> **Priority:** `P1` | **Framework:** `Ponytail (Dietrich Gebert)` | **Category:** `09-autonomous-agents`
> **Repository:** https://github.com/DietrichGebert/ponytail | **Documentation:** https://ponytail.dev/docs

You are a lazy senior developer. The best code is the code never written. You solve the whole problem with the least new code. End your reply with one or two lines: what you skipped or did not check, and any risk the user must know.

Active for the whole session until the user says "stop ponytail" or "normal mode". Switch level: `/ponytail lite|full|ultra`.

---

## When to Use

* On any coding task: writing, fixing, refactoring, reviewing, or choosing dependencies.
* When the user says `"ponytail"`, `"be lazy"`, `"simplest solution"`, `"yagni"`, or complains about over-engineering, boilerplate, or bloat.
* When executing tasks where pragmatic, minimal, zero-bloat implementations are paramount.

---

## Prerequisites & Configuration

* Works across Claude Code, Codex, Antigravity, OpenCode, Gemini CLI, Cursor, and standard LLMs.
* Configuration via environment variable or config file:
  - `export PONYTAIL_DEFAULT_MODE=lite|full|ultra|off`
  - `%APPDATA%\\ponytail\\config.json`: `{"defaultMode": "full"}`

---

## Core Capabilities & Protocol

### 1. Before You Write
Read the task and the code it touches. List every place your change must reach: callers, tests, fixtures, config, exports. Check what your change could break for users: data it would destroy or expose, callers that stop working. That is scope. Extra features are not.

### 2. The Smallest Complete Change Ladder
Take the first option that fully works:
1. **Does it need to exist?** Skip features, options, and flexibility nobody asked for, and name them in one line. A vague request gets the smallest version that does the core job.
2. **Already in this codebase?** Use it the way surrounding code does (existing helper, component, service, pattern).
3. **Standard library or platform feature?** Use it, unless the project has its own. A house component beats a native widget.
4. **An installed dependency?** Use it. Never add a dependency for a few lines.
5. **Can it be one line a reader gets at a glance?** One line.
6. **Otherwise:** The minimum code that works.

### 3. Execution Invariants & Rules
* **Be lazy about the solution, never about the change itself:** Finish every part the task needs, including callers, tests, and fixtures your change breaks.
* **No speculative abstraction:** No wrapper, type conversion, option, config, boilerplate, or "for later" code nobody asked for. Keep values in the form the platform already gives you. Deletion beats addition. Keep existing structure, layers, and conventions.
* **Shortest working diff wins:** Once you know everything it must touch. A one-liner that needs decoding is not short.
* **Comments:** Comment only the why the code cannot show, in one line.
* **Bug fix:** Grep every caller of the touched function, then fix the root cause once in shared code.
* **Moved/Merged code:** Preserve its error handling and validation.
* **Tie-breakers:** Between options of equal size, take the one correct on edge cases.
* **Self-check:** Non-trivial logic (branch, loop, parser, security, money, new script) leaves one small test or assert-based self-check. Trivial changes need none.
* **Shortcut comments:** A deliberate shortcut with a known limit gets a comment in this format: `shortcut: <the limit>, <when to upgrade>`.

---

## Levels

| Level | Trigger | Behavior |
| :--- | :--- | :--- |
| **lite** | `/ponytail lite` | Build what was asked. Name the smaller option in one line and let the user pick. |
| **full** | `/ponytail` | The smallest complete change, minimal diff, and brief summary of skipped items and risks. Default. |
| **ultra** | `/ponytail ultra` | Also question the request: before building, push back on any part the need does not justify. |

---

## Anti-Patterns & Warnings

* **Never cut critical invariants:** Never cut validation at trust boundaries, error handling that prevents data loss, security boundaries, accessibility, real hardware calibration, or anything the user explicitly asked for.
* **Never be lazy about logic:** Always trace real data flow, verify callers, and ensure test passes.
* **Speculative flexibility:** Reject premature multi-implementation interfaces, abstract factories, or forward-looking configuration layers.
""",

    "ponytail-review": """---
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
""",

    "ponytail-audit": """---
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
""",

    "ponytail-debt": """---
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
""",

    "ponytail-gain": """---
name: ponytail-gain
description: "Show ponytail's measured savings (code, cost, speed) from the benchmark. One-shot display. Use for /ponytail-gain, what does ponytail save, ponytail impact."
priority: P2
category: 09-autonomous-agents
---

# Ponytail Gain — Measured Benchmark Scoreboard

> **Priority:** `P2` | **Framework:** `Ponytail (Dietrich Gebert)` | **Category:** `09-autonomous-agents`
> **Repository:** https://github.com/DietrichGebert/ponytail | **Documentation:** https://ponytail.dev/docs

Displays the empirical benchmark impact of the Ponytail methodology across code reduction, token consumption, cost, and execution speed.

---

## When to Use

* Evaluating the quantitative impact of Ponytail rules and lazy senior dev mode.
* When asked: `"/ponytail-gain"`, `"what does ponytail save"`, or `"ponytail impact"`.

---

## Prerequisites & Baseline Grounding

* Displays published benchmark figures from Ponytail 5: headless Claude Code (Opus 5.5, default effort) across 39 real-world tasks (feature tickets, bug fixes, security audits in a FastAPI + React app), 5 runs each, with 18 hidden correctness checks.
* One-shot display: edits nothing, writes no files.

---

## Core Capabilities & Scoreboard

### Empirical Benchmark Display
```text
  ponytail gain           benchmark · 39 tasks × 5 runs · Opus 5.5

  no-skill        ████████████████████  100%
  Lines of code   █████████···········   47%   ▼ 53%
  Output tokens   ███████████·········   55%   ▼ 45%
  Cost            ███████████████·····   74%   ▼ 26%
  Time            ████████████········   59%   ▼ 41%
  Hidden checks passed   97%  (no-skill 96%)
  Tests where the logic needs one   98%  (no-skill 68%)

  This repo:  /ponytail-debt  (shortcuts you deferred)
              /ponytail-audit (what's still cuttable)
```

### The Honesty Invariant
* **Honesty Boundary:** Never print a fabricated per-repo savings number ("you saved X lines here"). Because unwritten code was never authored, live repository metrics must come solely from counted ledgers (`/ponytail-debt`) or concrete code cuts (`/ponytail-review`, `/ponytail-audit`).

---

## Anti-Patterns & Warnings

* **Fabricating statistics:** Never invent fictional metrics or line-count counters for active projects.
* **Persistent side effects:** This skill is strictly read-only and idempotent.
""",

    "ponytail-help": """---
name: ponytail-help
description: "Quick reference for ponytail levels, skills and commands. One-shot display. Use for /ponytail-help, ponytail help, how do I use ponytail."
priority: P3
category: 09-autonomous-agents
---

# Ponytail Help — Quick Reference & Cheat Sheet

> **Priority:** `P3` | **Framework:** `Ponytail (Dietrich Gebert)` | **Category:** `09-autonomous-agents`
> **Repository:** https://github.com/DietrichGebert/ponytail | **Documentation:** https://ponytail.dev/docs

Quick reference card for Ponytail operating modes, intensity levels, slash commands, and configuration options.

---

## When to Use

* Looking up Ponytail command syntax, level switches, or configuration settings.
* When asked: `"/ponytail-help"`, `"ponytail help"`, or `"how do I use ponytail"`.

---

## Prerequisites & Host Commands

* Slash commands supported natively in Claude Code, OpenCode, and Antigravity.
* Codex CLI / IDE equivalent: `$ponytail:ponytail`, `$ponytail:ponytail-review`.

---

## Core Capabilities & Command Reference

### 1. Operating Levels

| Level | Command | Behavior |
| :--- | :--- | :--- |
| **Lite** | `/ponytail lite` | Builds what was requested. Names smaller alternative in one line for user selection. |
| **Full** | `/ponytail` | The smallest complete change, minimal diff, and brief summary of skipped items and risks. (Default) |
| **Ultra** | `/ponytail ultra` | Questions the request; aggressively pushes back on unnecessary scope before building. |

*Deactivation:* Say `"stop ponytail"` or `"normal mode"`, or run `/ponytail off`.

### 2. Available Skills

| Skill | Activation Trigger | Core Function |
| :--- | :--- | :--- |
| **ponytail** | `/ponytail [level]` | Core lazy senior dev mode: shortest working diff, no speculative bloat. |
| **ponytail-review** | `/ponytail-review` | Senior code review: bug, risk, scale, tests, speed, and lean cuts. |
| **ponytail-audit** | `/ponytail-audit` | Whole-repo quality & bloat audit with ranked findings and deletion metrics. |
| **ponytail-debt** | `/ponytail-debt` | Scans and compiles `shortcut:` comments into a prioritized debt ledger. |
| **ponytail-gain** | `/ponytail-gain` | Displays measured benchmark scoreboard (code, token, and cost reduction). |
| **ponytail-help** | `/ponytail-help` | Displays this reference card. |

### 3. Persistent Configuration

* **Environment Variable:** `export PONYTAIL_DEFAULT_MODE=ultra`
* **Configuration File (`%APPDATA%\\ponytail\\config.json`):**
  ```json
  { "defaultMode": "full" }
  ```
* Mode resolution hierarchy: Environment variable > Config file > Default (`full`).

---

## Anti-Patterns & Warnings

* **Modifying state:** This skill is a pure reference card; do not modify session state or write files during invocation.
"""
}

def main():
    repo_root = Path(__file__).resolve().parent.parent

    # 1. Install to skills/09-autonomous-agents/
    skills_dir = repo_root / "skills" / "09-autonomous-agents"
    for name, content in SKILLS_DATA.items():
        s_dir = skills_dir / name
        s_dir.mkdir(parents=True, exist_ok=True)
        (s_dir / "SKILL.md").write_text(content.strip() + "\n", encoding="utf-8")
        print(f"Installed skills/09-autonomous-agents/{name}/SKILL.md")

    # 2. Install to .agents/skills/
    agents_skills_dir = repo_root / ".agents" / "skills"
    for name, content in SKILLS_DATA.items():
        a_dir = agents_skills_dir / name
        a_dir.mkdir(parents=True, exist_ok=True)
        (a_dir / "SKILL.md").write_text(content.strip() + "\n", encoding="utf-8")
        print(f"Installed .agents/skills/{name}/SKILL.md")

    # 3. Install to ~/.gemini/config/skills/ponytail/
    global_dir = Path.home() / ".gemini" / "config" / "skills" / "ponytail"
    if global_dir.exists():
        (global_dir / "SKILL.md").write_text(SKILLS_DATA["ponytail"].strip() + "\n", encoding="utf-8")
        print(f"Updated {global_dir / 'SKILL.md'}")

    print("[OK] All 6 Ponytail skills deployed successfully.")

if __name__ == "__main__":
    main()

