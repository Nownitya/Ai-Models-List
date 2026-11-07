---
name: ssd
description: "Decompose modules, specify concurrency threading models, coroutine dispatchers, and memory lifecycle constraints."
---

# System Specification Document (SSD) Skill

Standardized engineering skill for creating, updating, and verifying **SSD** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Designing multi-threaded or asynchronous concurrent systems.
* Allocating tasks across UI, IO, and Computation dispatchers.
* Handling OS lifecycle callbacks and low-memory pressure events.

---

## 🎯 Core Capabilities

* **Capability 1:** Defines dispatcher pool sizes, allowed tasks, and prohibited tasks.
* **Capability 2:** Specifies thread safety guarantees, locks, and atomic primitives.
* **Capability 3:** Establishes clean lifecycle hooks for graceful startup and shutdown.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your SSD document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`SSD.template.md`](./SSD.template.md)
- **Exemplar:** [`SSD.md`](./SSD.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Performing blocking disk or network operations on main/UI threads.
* **Anti-Pattern:** Ignoring OS low-memory warnings or lingering background leaks.
