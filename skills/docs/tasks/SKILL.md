---
name: tasks
description: "Break down epics into atomic engineering tasks (`TASK-xxx`), track sprint story points, and monitor actual effort."
---

# Work Breakdown Structure (WBS) & Task Tracker Skill

Standardized engineering skill for creating, updating, and verifying **TASKS** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Planning sprint tasks and estimating implementation effort.
* Tracking task lifecycle from To Do through Done.
* Assigning ownership across human developers and autonomous agents.

---

## 🎯 Core Capabilities

* **Capability 1:** Structures tasks with unique IDs, descriptions, owners, and hours.
* **Capability 2:** Supports sprint velocity tracking and estimation variance analysis.
* **Capability 3:** Connects each task to its parent feature ID (`FEAT-xxx`).

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your TASKS document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`TASKS.template.md`](./TASKS.template.md)
- **Exemplar:** [`TASKS.md`](./TASKS.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Creating massive multi-day tasks without atomic decomposition.
* **Anti-Pattern:** Marking tasks Done without running verification tests.
