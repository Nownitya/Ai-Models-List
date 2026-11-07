---
name: rules
description: "Define and enforce non-negotiable architectural laws, coding standards, dependency restrictions, and prohibited patterns."
---

# Repository Rules & Invariants Skill

Standardized engineering skill for creating, updating, and verifying **RULES** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Establishing repository invariants before multi-agent or team development.
* Enforcing architectural boundary rules (e.g. no UI imports in domain logic).
* Documenting prohibited patterns and automated CI pre-commit gates.

---

## 🎯 Core Capabilities

* **Capability 1:** Formulates clear, numbered non-negotiable rules for AI agents and humans.
* **Capability 2:** Enforces commit hygiene, secret scanning, and branch policies.
* **Capability 3:** Provides automated verification commands for CI enforcement.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your RULES document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`RULES.template.md`](./RULES.template.md)
- **Exemplar:** [`RULES.md`](./RULES.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Creating rules that cannot be mechanically verified by CI or linters.
* **Anti-Pattern:** Ignoring broken invariants or treating rules as optional suggestions.
