---
name: docs
description: "Universal Project Documentation Standard (Layer 15) master skill. Provides authoritative guidelines, schemas, and 29 reusable templates for authoring PRD, BRD, MRD, Architecture, TRD, SRD, SSD, TSD, Design, Features, Roadmap, Rules, Branching, Memory, Tasks, ADRs, Test Strategy, and Sprint/Milestone Reports."
---

# Universal Project Documentation Standard (Layer 15) Master Skill

Master engineering skill for creating, updating, and verifying institutional-quality project documentation for software systems built by human engineers and AI coding assistants.

---

## When to Use

Activate this skill whenever:
* Initializing documentation for a new software project, repository, or milestone.
* Authoring or refining any core specification document (PRD, BRD, MRD, Architecture, TRD, SRD, SSD, TSD, Design, Roadmap, Features).
* Enforcing repository governance, branching policies, invariant rules, and persistent agent memory.
* Conducting sprint closeout reviews, milestone release DoD verification, or benchmark field tests.

---

## 📂 Bundled Document Suite & Sub-Skills

This skill directory bundles all authentic Layer 15 markdown specifications, templates, exemplars, and specialized sub-skills:

### 1. Product & Strategy
* **[`prd`](./prd/SKILL.md)**: Product Requirements Document with user stories and Gherkin acceptance criteria.
* **[`brd`](./brd/SKILL.md)**: Business Requirements Document with commercial KPIs and stakeholder analysis.
* **[`mrd`](./mrd/SKILL.md)**: Market Requirements Document with market sizing and competitor positioning.
* **[`features`](./features/SKILL.md)**: Immutable feature register (`FEAT-xxx`) and status tracker.
* **[`roadmap`](./roadmap/SKILL.md)**: Phased delivery horizons with strict exit gates.

### 2. Architecture & Engineering
* **[`architecture`](./architecture/SKILL.md)**: System Architecture Document with C4 Mermaid diagrams and boundaries.
* **[`design`](./design/SKILL.md)**: Technical & UX Design Document with sequence flows and UI profiles.
* **[`trd`](./trd/SKILL.md)**: Technical Requirements Document with platform support and performance budgets.
* **[`srd`](./srd/SKILL.md)**: Software Requirements Document with subsystem state machines and error taxonomies.
* **[`ssd`](./ssd/SKILL.md)**: System Specification Document with threading models and coroutine dispatchers.
* **[`tsd`](./tsd/SKILL.md)**: Technical Specification Document with wire protocol binary layouts and algorithms.
* **[`adr`](./adr/SKILL.md)**: Architecture Decision Records with options, consequences, and compliance gates.

### 3. Governance & Quality
* **[`rules`](./rules/SKILL.md)**: Non-negotiable repository laws, coding conventions, and automated checks.
* **[`branching`](./branching/SKILL.md)**: Trunk-Based Development, branch naming, and protected main flow.
* **[`memory`](./memory/SKILL.md)**: Cross-session persistent context, historical decisions, and technical debt.
* **[`tasks`](./tasks/SKILL.md)**: Work Breakdown Structure (WBS) with task estimations and sprint status.
* **[`test-strategy`](./test-strategy/SKILL.md)**: Test pyramid, coverage targets, and Definition of Done (DoD).
* **[`sprint-closeout`](./sprint-closeout/SKILL.md)**: Sprint velocity, delivered features, and retrospective reports.
* **[`milestone-verification`](./milestone-verification/SKILL.md)**: Milestone release verification scorecard.
* **[`benchmark-report`](./benchmark-report/SKILL.md)**: Empirical stress testing, latency, and performance benchmarks.

---

## 🛠️ Instant Scaffolding CLI

Instantiate all 28 Layer 15 project documents into any target directory:
```bash
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## ⚡ Agent Verification Gate
Before marking any documentation task complete:
- [ ] Are all requirements and acceptance criteria testable and unambiguous?
- [ ] Are architecture diagrams rendered in valid Mermaid syntax?
- [ ] Does the document synchronize factually with the repository code?
- [ ] Are all external links, API routes, and feature IDs valid?
