---
name: branching
description: "Establish Trunk-Based Development workflows, branch naming conventions, PR gates, and release staging procedures."
---

# Git Branching & Release Strategy Skill

Standardized engineering skill for creating, updating, and verifying **BRANCHING** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Setting up git workflows for collaborative human and agent development.
* Configuring branch protection rules and PR review gates.
* Managing release branches and semantic version tagging.

---

## 🎯 Core Capabilities

* **Capability 1:** Visualizes branch gitGraph workflows in Mermaid format.
* **Capability 2:** Standardizes branch naming: `feature/*`, `fix/*`, `release/*`.
* **Capability 3:** Defines strict merge criteria (100% passing tests, 0 regressions).

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your BRANCHING document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`BRANCHING.template.md`](./BRANCHING.template.md)
- **Exemplar:** [`BRANCHING.md`](./BRANCHING.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Allowing long-lived stale branches to drift from main.
* **Anti-Pattern:** Bypassing branch protection or merging without running the full test suite.
