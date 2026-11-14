---
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
