---
name: features
description: "Maintain immutable feature registries (`FEAT-xxx`) with lifecycle status, priority, ownership, and verification test links."
---

# Feature Inventory & Status Matrix Skill

Standardized engineering skill for creating, updating, and verifying **FEATURES** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Cataloging all planned, active, and verified features in a project.
* Connecting requirements to automated tests and PR evidence.
* Tracking feature lifecycle transitions without losing historical context.

---

## 🎯 Core Capabilities

* **Capability 1:** Enforces immutable `FEAT-xxx` IDs across specs, code, and tests.
* **Capability 2:** Tracks explicit lifecycle status: Planned, In Progress, In Review, Verified.
* **Capability 3:** Links each feature directly to its automated verification test path.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your FEATURES document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`FEATURES.template.md`](./FEATURES.template.md)
- **Exemplar:** [`FEATURES.md`](./FEATURES.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Renaming or reusing feature IDs across different capabilities.
* **Anti-Pattern:** Marking a feature Verified without providing factual test evidence.
