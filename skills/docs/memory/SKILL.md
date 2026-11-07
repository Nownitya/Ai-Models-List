---
name: memory
description: "Preserve cross-session institutional knowledge, architectural decisions, recurring traps, and technical debt ledgers."
---

# Project Memory & Context Skill

Standardized engineering skill for creating, updating, and verifying **MEMORY** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Recording critical decisions and context that AI agents frequently forget.
* Tracking known technical debt items with remediation plans.
* Documenting platform idiosyncrasies and hardware quirks.

---

## 🎯 Core Capabilities

* **Capability 1:** Maintains an append-only historical decision log.
* **Capability 2:** Catalogs active technical debt with severity and estimated effort.
* **Capability 3:** Provides quick context priming for new agents entering the repository.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your MEMORY document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`MEMORY.template.md`](./MEMORY.template.md)
- **Exemplar:** [`MEMORY.md`](./MEMORY.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Allowing the memory file to become an unorganized dumping ground.
* **Anti-Pattern:** Leaving resolved technical debt items marked active.
