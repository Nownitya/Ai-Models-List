---
name: adr
description: "Document significant architectural decisions with context, evaluated options, trade-offs, and compliance verification."
---

# Architecture Decision Record (ADR) Skill

Standardized engineering skill for creating, updating, and verifying **ADR** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Selecting a framework, database, wire protocol, or core library.
* Choosing between competing architectural patterns with trade-offs.
* Recording architectural changes that affect long-term maintainability.

---

## 🎯 Core Capabilities

* **Capability 1:** Enforces standard ADR structure: Context, Options, Decision, Consequences.
* **Capability 2:** Maintains numbered, immutable records in `docs/adr/`.
* **Capability 3:** Specifies mechanical compliance checks for automated CI gating.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your ADR document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`0000-record-architecture-decision.template.md`](./0000-record-architecture-decision.template.md)
- **Exemplar:** [`0021-context-adaptive-tactical-ui-profiles.md`](./0021-context-adaptive-tactical-ui-profiles.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Modifying historical ADR decisions instead of creating superseding records.
* **Anti-Pattern:** Recording decisions without documenting evaluated alternative options.
