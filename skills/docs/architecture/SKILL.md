---
name: architecture
description: "Design, document, and evaluate system architectures using C4 diagrams, clean boundaries, data flow paths, and subsystem contracts."
---

# System Architecture Specification Skill

Standardized engineering skill for creating, updating, and verifying **ARCHITECTURE** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Designing a new system, service boundary, or component architecture.
* Refactoring complex monolithic systems into clean, decoupled modules.
* Defining inter-service communication protocols and data invariants.
* Preparing technical blueprints before sprint execution.

---

## 🎯 Core Capabilities

* **Capability 1:** Renders C4 context, container, and component Mermaid diagrams.
* **Capability 2:** Enforces Clean Architecture and Domain-Driven Design boundaries.
* **Capability 3:** Defines synchronous command vs asynchronous event routing protocols.
* **Capability 4:** Documents trade-offs and cross-cutting concerns (caching, logging, resilience).

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your ARCHITECTURE document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`ARCHITECTURE.template.md`](./ARCHITECTURE.template.md)
- **Exemplar:** [`ARCHITECTURE.md`](./ARCHITECTURE.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Allowing domain logic to directly import external frameworks or presentation layers.
* **Anti-Pattern:** Missing failure boundary definitions and circuit breakers.
* **Anti-Pattern:** Documenting an idealized architecture without checking actual repository code.
