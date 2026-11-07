---
name: srd
description: "Specify subsystem behaviors, internal state machine transitions, network resilience, and typed error taxonomies."
---

# Software Requirements Document (SRD) Skill

Standardized engineering skill for creating, updating, and verifying **SRD** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Specifying low-level software subsystems and stateful components.
* Documenting deterministic state transitions and error recovery actions.
* Designing network retry policies, exponential backoff, and offline queues.

---

## 🎯 Core Capabilities

* **Capability 1:** Defines explicit state transition diagrams and invariant checks.
* **Capability 2:** Builds typed error taxonomies with recovery actions for every error code.
* **Capability 3:** Specifies offline storage buffer limits and persistence strategies.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your SRD document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`SRD.template.md`](./SRD.template.md)
- **Exemplar:** [`SRD.md`](./SRD.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Allowing untyped exceptions or vague error codes.
* **Anti-Pattern:** Omitting offline queue bounds and eviction policies.
