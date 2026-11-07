---
name: prd
description: "Author, refine, and verify Product Requirements Documents with user personas, epic user stories, Gherkin acceptance criteria, and non-functional requirements."
---

# Product Requirements Document (PRD) Skill

Standardized engineering skill for creating, updating, and verifying **PRD** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Initiating a new product, service, or major capability.
* Translating ambiguous customer requests into crisp, testable requirements.
* Defining epic user stories with Gherkin acceptance criteria (Given/When/Then).
* Setting performance, latency, memory, and availability NFR budgets.

---

## 🎯 Core Capabilities

* **Capability 1:** Executes structured user story framing: As a <role>, I want <action>, So that <benefit>.
* **Capability 2:** Generates Gherkin scenarios for automated testing and acceptance gating.
* **Capability 3:** Establishes latency, throughput, CPU, and memory non-functional budgets.
* **Capability 4:** Provides clear priority tagging (P0, P1, P2) for phased delivery sequencing.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your PRD document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`PRD.template.md`](./PRD.template.md)
- **Exemplar:** [`PRD.md`](./PRD.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Vague acceptance criteria (e.g. 'Must be fast' instead of '< 50ms p95 latency').
* **Anti-Pattern:** Conflating product requirements with low-level implementation details.
* **Anti-Pattern:** Skipping edge cases (offline state, error recovery, network partition).
