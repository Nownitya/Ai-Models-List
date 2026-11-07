#!/usr/bin/env python3
"""
setup-skills-docs.py — Assembles skills/docs with all markdown files, folders,
templates, exemplars, and individual SKILL.md packages conforming to Law 2.
"""

import os
import shutil
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILLS_DOCS_DIR = REPO_ROOT / "skills" / "docs"
EXAMPLES_DIR = REPO_ROOT / "docs" / "examples" / "layer-15"
TEMPLATES_DIR = REPO_ROOT / "templates" / "layer-15"

# List of doc-specific sub-skills to generate with Law 2 compliance
DOC_SKILLS = {
    "prd": {
        "name": "prd",
        "title": "Product Requirements Document (PRD) Skill",
        "description": "Author, refine, and verify Product Requirements Documents with user personas, epic user stories, Gherkin acceptance criteria, and non-functional requirements.",
        "template": "03-product-scope/PRD.template.md",
        "exemplar": "specifications/PRD.md",
        "priority": "P0",
        "when_to_use": [
            "Initiating a new product, service, or major capability.",
            "Translating ambiguous customer requests into crisp, testable requirements.",
            "Defining epic user stories with Gherkin acceptance criteria (Given/When/Then).",
            "Setting performance, latency, memory, and availability NFR budgets."
        ],
        "core_capabilities": [
            "Executes structured user story framing: As a <role>, I want <action>, So that <benefit>.",
            "Generates Gherkin scenarios for automated testing and acceptance gating.",
            "Establishes latency, throughput, CPU, and memory non-functional budgets.",
            "Provides clear priority tagging (P0, P1, P2) for phased delivery sequencing."
        ],
        "anti_patterns": [
            "Vague acceptance criteria (e.g. 'Must be fast' instead of '< 50ms p95 latency').",
            "Conflating product requirements with low-level implementation details.",
            "Skipping edge cases (offline state, error recovery, network partition)."
        ]
    },
    "architecture": {
        "name": "architecture",
        "title": "System Architecture Specification Skill",
        "description": "Design, document, and evaluate system architectures using C4 diagrams, clean boundaries, data flow paths, and subsystem contracts.",
        "template": "04-architecture-engineering/ARCHITECTURE.template.md",
        "exemplar": "specifications/ARCHITECTURE.md",
        "priority": "P0",
        "when_to_use": [
            "Designing a new system, service boundary, or component architecture.",
            "Refactoring complex monolithic systems into clean, decoupled modules.",
            "Defining inter-service communication protocols and data invariants.",
            "Preparing technical blueprints before sprint execution."
        ],
        "core_capabilities": [
            "Renders C4 context, container, and component Mermaid diagrams.",
            "Enforces Clean Architecture and Domain-Driven Design boundaries.",
            "Defines synchronous command vs asynchronous event routing protocols.",
            "Documents trade-offs and cross-cutting concerns (caching, logging, resilience)."
        ],
        "anti_patterns": [
            "Allowing domain logic to directly import external frameworks or presentation layers.",
            "Missing failure boundary definitions and circuit breakers.",
            "Documenting an idealized architecture without checking actual repository code."
        ]
    },
    "brd": {
        "name": "brd",
        "title": "Business Requirements Document (BRD) Skill",
        "description": "Formulate commercial objectives, stakeholder matrices, ROI targets, KPI scorecards, and regulatory compliance invariants.",
        "template": "02-business-strategy/BRD.template.md",
        "exemplar": "specifications/BRD.md",
        "priority": "P1",
        "when_to_use": [
            "Justifying new engineering initiatives to business stakeholders.",
            "Defining measurable commercial KPIs, cost reduction goals, and onboarding speeds.",
            "Analyzing multi-stakeholder needs (customers, operators, compliance, leadership).",
            "Setting financial budgets and licensing boundaries."
        ],
        "core_capabilities": [
            "Structures commercial objectives into quantifiable disruption metrics.",
            "Builds comprehensive KPI scorecards with baseline vs target metrics.",
            "Performs stakeholder impact analysis across user segments.",
            "Documents regulatory constraints (GDPR, HIPAA, FCC, safety standards)."
        ],
        "anti_patterns": [
            "Setting non-measurable KPIs without clear verification methods.",
            "Ignoring unit economics and monthly cloud infrastructure budgets.",
            "Neglecting compliance and regulatory standards during early planning."
        ]
    },
    "mrd": {
        "name": "mrd",
        "title": "Market Requirements Document (MRD) Skill",
        "description": "Analyze market pain points, TAM/SAM/SOM market sizing, competitor positioning, and commercial product positioning.",
        "template": "02-business-strategy/MRD.template.md",
        "exemplar": "specifications/MRD.md",
        "priority": "P2",
        "when_to_use": [
            "Evaluating market feasibility and competitive landscape for new products.",
            "Identifying market gaps and competitor deficiencies.",
            "Defining value proposition and market segment sizing."
        ],
        "core_capabilities": [
            "Synthesizes market problem statements and total addressable market (TAM).",
            "Creates competitive positioning matrices comparing key features and pricing.",
            "Defines customer personas and adoption barriers."
        ],
        "anti_patterns": [
            "Assuming competitor capabilities without factual market evidence.",
            "Over-estimating market sizing without segmentation."
        ]
    },
    "trd": {
        "name": "trd",
        "title": "Technical Requirements Document (TRD) Skill",
        "description": "Specify target runtime platforms, OS/API constraints, toolchains, CPU/RAM budgets, and binary size limits.",
        "template": "04-architecture-engineering/TRD.template.md",
        "exemplar": "specifications/TRD.md",
        "priority": "P1",
        "when_to_use": [
            "Defining platform support matrices across mobile, server, web, and desktop.",
            "Setting hard resource budgets (RAM, CPU, binary size, network packet payloads).",
            "Specifying compiler flags, toolchains, and runtime minimum requirements."
        ],
        "core_capabilities": [
            "Maintains platform compatibility matrices with min vs target API levels.",
            "Sets strict resource allocations and automated enforcement mechanisms.",
            "Defines network transport payload and bandwidth constraints."
        ],
        "anti_patterns": [
            "Omitting enforcement mechanisms for resource budgets.",
            "Ignoring platform version deprecation and compatibility fallbacks."
        ]
    },
    "srd": {
        "name": "srd",
        "title": "Software Requirements Document (SRD) Skill",
        "description": "Specify subsystem behaviors, internal state machine transitions, network resilience, and typed error taxonomies.",
        "template": "04-architecture-engineering/SRD.template.md",
        "exemplar": "specifications/SRD.md",
        "priority": "P1",
        "when_to_use": [
            "Specifying low-level software subsystems and stateful components.",
            "Documenting deterministic state transitions and error recovery actions.",
            "Designing network retry policies, exponential backoff, and offline queues."
        ],
        "core_capabilities": [
            "Defines explicit state transition diagrams and invariant checks.",
            "Builds typed error taxonomies with recovery actions for every error code.",
            "Specifies offline storage buffer limits and persistence strategies."
        ],
        "anti_patterns": [
            "Allowing untyped exceptions or vague error codes.",
            "Omitting offline queue bounds and eviction policies."
        ]
    },
    "ssd": {
        "name": "ssd",
        "title": "System Specification Document (SSD) Skill",
        "description": "Decompose modules, specify concurrency threading models, coroutine dispatchers, and memory lifecycle constraints.",
        "template": "04-architecture-engineering/SSD.template.md",
        "exemplar": "specifications/SSD.md",
        "priority": "P2",
        "when_to_use": [
            "Designing multi-threaded or asynchronous concurrent systems.",
            "Allocating tasks across UI, IO, and Computation dispatchers.",
            "Handling OS lifecycle callbacks and low-memory pressure events."
        ],
        "core_capabilities": [
            "Defines dispatcher pool sizes, allowed tasks, and prohibited tasks.",
            "Specifies thread safety guarantees, locks, and atomic primitives.",
            "Establishes clean lifecycle hooks for graceful startup and shutdown."
        ],
        "anti_patterns": [
            "Performing blocking disk or network operations on main/UI threads.",
            "Ignoring OS low-memory warnings or lingering background leaks."
        ]
    },
    "tsd": {
        "name": "tsd",
        "title": "Technical Specification Document (TSD) Skill",
        "description": "Specify low-level binary wire protocols, packet layouts, bitmasks, audio/video codecs, and mathematical algorithms.",
        "template": "04-architecture-engineering/TSD.template.md",
        "exemplar": "specifications/TSD.md",
        "priority": "P2",
        "when_to_use": [
            "Designing binary wire protocols, packet formats, and MTU packing.",
            "Specifying cryptographic algorithms, key exchange, and ciphers.",
            "Documenting mathematical formulas, routing algorithms, or codecs."
        ],
        "core_capabilities": [
            "Draws ASCII bit-level packet wire diagrams with exact byte offsets.",
            "Defines magic bytes, sequence numbers, checksums, and payload fields.",
            "Specifies compression algorithms, bitrate targets, and crypto suites."
        ],
        "anti_patterns": [
            "Using variable-endian formats without explicit specification.",
            "Missing checksum or integrity verification in binary payloads."
        ]
    },
    "design": {
        "name": "design",
        "title": "Technical & UX Design Document Skill",
        "description": "Craft interaction workflows, sequence diagrams, tactile feedback profiles, and ergonomic screen layout specifications.",
        "template": "04-architecture-engineering/DESIGN.template.md",
        "exemplar": "specifications/DESIGN.md",
        "priority": "P1",
        "when_to_use": [
            "Designing complex user interactions, sequence flows, and screen transitions.",
            "Specifying multi-mode UI profiles (e.g. normal vs tactical/emergency mode).",
            "Defining optimistic UI state updates and asynchronous synchronization."
        ],
        "core_capabilities": [
            "Generates Mermaid sequence diagrams for user and backend interactions.",
            "Specifies ergonomic touch targets, contrast ratios, and haptic feedback.",
            "Defines local-first optimistic rendering with server acknowledgment."
        ],
        "anti_patterns": [
            "Over-complicating user flows with unnecessary modal interruptions.",
            "Failing to design for high-stress, low-visibility, or glove-wearing contexts."
        ]
    },
    "features": {
        "name": "features",
        "title": "Feature Inventory & Status Matrix Skill",
        "description": "Maintain immutable feature registries (`FEAT-xxx`) with lifecycle status, priority, ownership, and verification test links.",
        "template": "03-product-scope/FEATURES.template.md",
        "exemplar": "specifications/FEATURES.md",
        "priority": "P0",
        "when_to_use": [
            "Cataloging all planned, active, and verified features in a project.",
            "Connecting requirements to automated tests and PR evidence.",
            "Tracking feature lifecycle transitions without losing historical context."
        ],
        "core_capabilities": [
            "Enforces immutable `FEAT-xxx` IDs across specs, code, and tests.",
            "Tracks explicit lifecycle status: Planned, In Progress, In Review, Verified.",
            "Links each feature directly to its automated verification test path."
        ],
        "anti_patterns": [
            "Renaming or reusing feature IDs across different capabilities.",
            "Marking a feature Verified without providing factual test evidence."
        ]
    },
    "roadmap": {
        "name": "roadmap",
        "title": "Product & Engineering Roadmap Skill",
        "description": "Structure multi-horizon delivery milestones with strict exit criteria, phase gates, and scope boundaries.",
        "template": "03-product-scope/ROADMAP.template.md",
        "exemplar": "specifications/ROADMAP.md",
        "priority": "P0",
        "when_to_use": [
            "Sequencing project milestones from foundation (v1.0) to scale (v3.0).",
            "Setting strict Definition of Done exit gates for milestone transitions.",
            "Communicating timelines and capability horizons to teams and agents."
        ],
        "core_capabilities": [
            "Visualizes milestone horizons with Mermaid flowcharts.",
            "Defines clear exit criteria for each milestone release gate.",
            "Separates core baseline scope from future horizon exploratory tasks."
        ],
        "anti_patterns": [
            "Moving to subsequent milestones before passing the current exit gate.",
            "Bloating early milestones with speculative, unverified features."
        ]
    },
    "rules": {
        "name": "rules",
        "title": "Repository Rules & Invariants Skill",
        "description": "Define and enforce non-negotiable architectural laws, coding standards, dependency restrictions, and prohibited patterns.",
        "template": "05-ai-governance/RULES.template.md",
        "exemplar": "specifications/RULES.md",
        "priority": "P0",
        "when_to_use": [
            "Establishing repository invariants before multi-agent or team development.",
            "Enforcing architectural boundary rules (e.g. no UI imports in domain logic).",
            "Documenting prohibited patterns and automated CI pre-commit gates."
        ],
        "core_capabilities": [
            "Formulates clear, numbered non-negotiable rules for AI agents and humans.",
            "Enforces commit hygiene, secret scanning, and branch policies.",
            "Provides automated verification commands for CI enforcement."
        ],
        "anti_patterns": [
            "Creating rules that cannot be mechanically verified by CI or linters.",
            "Ignoring broken invariants or treating rules as optional suggestions."
        ]
    },
    "branching": {
        "name": "branching",
        "title": "Git Branching & Release Strategy Skill",
        "description": "Establish Trunk-Based Development workflows, branch naming conventions, PR gates, and release staging procedures.",
        "template": "05-ai-governance/BRANCHING.template.md",
        "exemplar": "specifications/BRANCHING.md",
        "priority": "P1",
        "when_to_use": [
            "Setting up git workflows for collaborative human and agent development.",
            "Configuring branch protection rules and PR review gates.",
            "Managing release branches and semantic version tagging."
        ],
        "core_capabilities": [
            "Visualizes branch gitGraph workflows in Mermaid format.",
            "Standardizes branch naming: `feature/*`, `fix/*`, `release/*`.",
            "Defines strict merge criteria (100% passing tests, 0 regressions)."
        ],
        "anti_patterns": [
            "Allowing long-lived stale branches to drift from main.",
            "Bypassing branch protection or merging without running the full test suite."
        ]
    },
    "memory": {
        "name": "memory",
        "title": "Project Memory & Context Skill",
        "description": "Preserve cross-session institutional knowledge, architectural decisions, recurring traps, and technical debt ledgers.",
        "template": "05-ai-governance/MEMORY.template.md",
        "exemplar": "specifications/MEMORY.md",
        "priority": "P1",
        "when_to_use": [
            "Recording critical decisions and context that AI agents frequently forget.",
            "Tracking known technical debt items with remediation plans.",
            "Documenting platform idiosyncrasies and hardware quirks."
        ],
        "core_capabilities": [
            "Maintains an append-only historical decision log.",
            "Catalogs active technical debt with severity and estimated effort.",
            "Provides quick context priming for new agents entering the repository."
        ],
        "anti_patterns": [
            "Allowing the memory file to become an unorganized dumping ground.",
            "Leaving resolved technical debt items marked active."
        ]
    },
    "tasks": {
        "name": "tasks",
        "title": "Work Breakdown Structure (WBS) & Task Tracker Skill",
        "description": "Break down epics into atomic engineering tasks (`TASK-xxx`), track sprint story points, and monitor actual effort.",
        "template": "05-ai-governance/TASKS.template.md",
        "exemplar": "specifications/TASKS.md",
        "priority": "P0",
        "when_to_use": [
            "Planning sprint tasks and estimating implementation effort.",
            "Tracking task lifecycle from To Do through Done.",
            "Assigning ownership across human developers and autonomous agents."
        ],
        "core_capabilities": [
            "Structures tasks with unique IDs, descriptions, owners, and hours.",
            "Supports sprint velocity tracking and estimation variance analysis.",
            "Connects each task to its parent feature ID (`FEAT-xxx`)."
        ],
        "anti_patterns": [
            "Creating massive multi-day tasks without atomic decomposition.",
            "Marking tasks Done without running verification tests."
        ]
    },
    "adr": {
        "name": "adr",
        "title": "Architecture Decision Record (ADR) Skill",
        "description": "Document significant architectural decisions with context, evaluated options, trade-offs, and compliance verification.",
        "template": "04-architecture-engineering/adr/0000-record-architecture-decision.template.md",
        "exemplar": "adr/0021-context-adaptive-tactical-ui-profiles.md",
        "priority": "P1",
        "when_to_use": [
            "Selecting a framework, database, wire protocol, or core library.",
            "Choosing between competing architectural patterns with trade-offs.",
            "Recording architectural changes that affect long-term maintainability."
        ],
        "core_capabilities": [
            "Enforces standard ADR structure: Context, Options, Decision, Consequences.",
            "Maintains numbered, immutable records in `docs/adr/`.",
            "Specifies mechanical compliance checks for automated CI gating."
        ],
        "anti_patterns": [
            "Modifying historical ADR decisions instead of creating superseding records.",
            "Recording decisions without documenting evaluated alternative options."
        ]
    },
    "test-strategy": {
        "name": "test-strategy",
        "title": "Test Strategy & Verification Architecture Skill",
        "description": "Architect test pyramids, coverage targets, MockK/Turbine patterns, automated CI gating, and Definition of Done checklists.",
        "template": "06-testing-and-reports/TEST-STRATEGY.template.md",
        "exemplar": "testing/TEST-STRATEGY.md",
        "priority": "P0",
        "when_to_use": [
            "Establishing the testing framework and verification architecture.",
            "Defining unit, integration, and E2E test coverage targets.",
            "Configuring Definition of Done gates to prevent regressions."
        ],
        "core_capabilities": [
            "Defines test pyramid distributions (e.g. 70% Unit, 20% Integration, 10% E2E).",
            "Specifies framework choices (pytest, JUnit5, Playwright, Testcontainers).",
            "Provides factual DoD checklists for PR and milestone sign-offs."
        ],
        "anti_patterns": [
            "Relying solely on unit tests while neglecting real integration boundaries.",
            "Tolerating flaky tests or disabled test assertions in CI."
        ]
    },
    "sprint-closeout": {
        "name": "sprint-closeout",
        "title": "Sprint Closeout & Outcome Report Skill",
        "description": "Generate rigorous sprint closeout reports detailing velocity, delivered stories, PR evidence, and retrospectives.",
        "template": "06-testing-and-reports/SPRINT-CLOSEOUT-REPORT.template.md",
        "exemplar": "reports/2026-10-18-Sprint-36-Closeout-Report.md",
        "priority": "P1",
        "when_to_use": [
            "Closing a development sprint and reporting delivered value.",
            "Documenting delivered story points, pass rates, and PR links.",
            "Conducting engineering retrospectives (what went well, what to improve)."
        ],
        "core_capabilities": [
            "Computes velocity delivered vs planned story points.",
            "Compiles factual verification evidence across passing test runs.",
            "Records actionable retrospective learnings for future sprint cycles."
        ],
        "anti_patterns": [
            "Closing sprints with unverified or partially completed stories.",
            "Omitting links to PRs or automated test execution evidence."
        ]
    },
    "milestone-verification": {
        "name": "milestone-verification",
        "title": "Milestone DoD Verification Report Skill",
        "description": "Produce production sign-off reports auditing functional criteria, latency benchmarks, security scans, and stability.",
        "template": "06-testing-and-reports/MILESTONE-VERIFICATION.template.md",
        "exemplar": "reports/2026-10-18-v3.0.0-beta1-Milestone-Verification-Report.md",
        "priority": "P1",
        "when_to_use": [
            "Conducting release readiness assessments before production deployment.",
            "Auditing all milestone exit criteria across functional, perf, and security.",
            "Securing formal sign-off approvals from architects and product leads."
        ],
        "core_capabilities": [
            "Builds comprehensive verification scorecards across all quality domains.",
            "Validates zero high/critical vulnerabilities and benchmark compliance.",
            "Provides signed release approval records for audit trails."
        ],
        "anti_patterns": [
            "Approving releases with outstanding critical security vulnerabilities.",
            "Accepting subjective opinions instead of empirical benchmark data."
        ]
    },
    "benchmark-report": {
        "name": "benchmark-report",
        "title": "Performance & Field Benchmark Report Skill",
        "description": "Conduct stress tests, measure throughput/latency/memory, and author empirical performance benchmark reports.",
        "template": "06-testing-and-reports/BENCHMARK-REPORT.template.md",
        "exemplar": "testing/field-reports/RangeBenchmark.md",
        "priority": "P2",
        "when_to_use": [
            "Benchmarking system throughput, latency, memory consumption, or radio RF.",
            "Validating that performance budgets specified in TRD are satisfied.",
            "Diagnosing regressions or stress limits under peak load."
        ],
        "core_capabilities": [
            "Documents test hardware configuration, tooling, and test parameters.",
            "Records mean, p95, and p99 metrics with Pass/Fail status.",
            "Surfaces bottleneck analysis and optimization recommendations."
        ],
        "anti_patterns": [
            "Benchmarking on non-reproducible or un-isolated hardware environments.",
            "Reporting only mean latency without p95 and p99 percentiles."
        ]
    }
}

def generate_sub_skill_markdown(key, meta):
    name = meta["name"]
    title = meta["title"]
    desc = meta["description"]
    prio = meta["priority"]
    when_to_use = "\n".join(f"* {item}" for item in meta["when_to_use"])
    capabilities = "\n".join(f"* **Capability {i+1}:** {cap}" for i, cap in enumerate(meta["core_capabilities"]))
    anti_patterns = "\n".join(f"* **Anti-Pattern:** {ap}" for ap in meta["anti_patterns"])

    return f"""---
name: {name}
description: "{desc}"
---

# {title}

Standardized engineering skill for creating, updating, and verifying **{name.upper()}** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

{when_to_use}

---

## 🎯 Core Capabilities

{capabilities}

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your {name.upper()} document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`{Path(meta['template']).name}`](./{Path(meta['template']).name})
- **Exemplar:** [`{Path(meta['exemplar']).name}`](./{Path(meta['exemplar']).name})

---

## ⚠️ Anti-Patterns & Warnings

{anti_patterns}
"""

def generate_master_docs_skill():
    return """---
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
"""

def main():
    print(f"[*] Setting up skills/docs at: {SKILLS_DOCS_DIR}")
    SKILLS_DOCS_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Copy 15 root specification files from docs/examples/layer-15/specifications/
    specs_src = EXAMPLES_DIR / "specifications"
    if specs_src.exists():
        for f in specs_src.glob("*.md"):
            shutil.copy2(f, SKILLS_DOCS_DIR / f.name)
            print(f"  [OK] Copied root spec: {f.name}")

    # 2. Copy adr/ subfolder
    adr_dst = SKILLS_DOCS_DIR / "adr"
    adr_dst.mkdir(parents=True, exist_ok=True)
    for f in (EXAMPLES_DIR / "adr").glob("*"):
        if f.is_file():
            shutil.copy2(f, adr_dst / f.name)
    shutil.copy2(TEMPLATES_DIR / "04-architecture-engineering" / "adr" / "0000-record-architecture-decision.template.md", adr_dst / "0000-record-architecture-decision.template.md")
    print("  [OK] Copied adr/ subfolder and template")

    # 3. Copy architecture/ subfolder
    arch_dst = SKILLS_DOCS_DIR / "architecture"
    arch_dst.mkdir(parents=True, exist_ok=True)
    for f in (EXAMPLES_DIR / "architecture").glob("*"):
        if f.is_file():
            shutil.copy2(f, arch_dst / f.name)
    print("  [OK] Copied architecture/ visualizers")

    # 4. Copy reports/ subfolder
    reports_dst = SKILLS_DOCS_DIR / "reports"
    reports_dst.mkdir(parents=True, exist_ok=True)
    for f in (EXAMPLES_DIR / "reports").glob("*"):
        if f.is_file():
            shutil.copy2(f, reports_dst / f.name)
    shutil.copy2(TEMPLATES_DIR / "06-testing-and-reports" / "SPRINT-CLOSEOUT-REPORT.template.md", reports_dst / "SPRINT-CLOSEOUT-REPORT.template.md")
    shutil.copy2(TEMPLATES_DIR / "06-testing-and-reports" / "MILESTONE-VERIFICATION.template.md", reports_dst / "MILESTONE-VERIFICATION.template.md")
    print("  [OK] Copied reports/ subfolder (13 reports + templates)")

    # 5. Copy testing/ subfolder
    testing_dst = SKILLS_DOCS_DIR / "testing"
    (testing_dst / "field-reports").mkdir(parents=True, exist_ok=True)
    shutil.copy2(EXAMPLES_DIR / "testing" / "TEST-STRATEGY.md", testing_dst / "TEST-STRATEGY.md")
    shutil.copy2(EXAMPLES_DIR / "testing" / "field-reports" / "RangeBenchmark.md", testing_dst / "field-reports" / "RangeBenchmark.md")
    shutil.copy2(TEMPLATES_DIR / "06-testing-and-reports" / "TEST-STRATEGY.template.md", testing_dst / "TEST-STRATEGY.template.md")
    shutil.copy2(TEMPLATES_DIR / "06-testing-and-reports" / "BENCHMARK-REPORT.template.md", testing_dst / "field-reports" / "BENCHMARK-REPORT.template.md")
    print("  [OK] Copied testing/ strategy and benchmarks")

    # 6. Copy templates/ subfolder
    templates_dst = SKILLS_DOCS_DIR / "templates"
    if templates_dst.exists():
        shutil.rmtree(templates_dst)
    shutil.copytree(TEMPLATES_DIR, templates_dst)
    print("  [OK] Copied all 29 templates into skills/docs/templates/")

    # 7. Generate Master SKILL.md for skills/docs/
    master_skill_file = SKILLS_DOCS_DIR / "SKILL.md"
    with open(master_skill_file, "w", encoding="utf-8") as f:
        f.write(generate_master_docs_skill())
    print("  [OK] Generated master SKILL.md in skills/docs/")

    # 8. Generate specialized sub-skills for each document standard
    for key, meta in DOC_SKILLS.items():
        sub_skill_dir = SKILLS_DOCS_DIR / key
        sub_skill_dir.mkdir(parents=True, exist_ok=True)

        # Write sub-skill SKILL.md
        sub_skill_file = sub_skill_dir / "SKILL.md"
        with open(sub_skill_file, "w", encoding="utf-8") as f:
            f.write(generate_sub_skill_markdown(key, meta))

        # Copy corresponding template
        tmpl_src = TEMPLATES_DIR / meta["template"]
        if tmpl_src.exists():
            shutil.copy2(tmpl_src, sub_skill_dir / tmpl_src.name)

        # Copy corresponding exemplar if exists
        ex_src = EXAMPLES_DIR / meta["exemplar"]
        if ex_src.exists():
            shutil.copy2(ex_src, sub_skill_dir / ex_src.name)

        print(f"  [OK] Generated specialized sub-skill: skills/docs/{key}/")

    print("\n[DONE] Successfully assembled skills/docs with all markdown files, folders, and specialized sub-skills.")

if __name__ == "__main__":
    main()
