---
name: trd
description: "Specify target runtime platforms, OS/API constraints, toolchains, CPU/RAM budgets, and binary size limits."
---

# Technical Requirements Document (TRD) Skill

Standardized engineering skill for creating, updating, and verifying **TRD** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Defining platform support matrices across mobile, server, web, and desktop.
* Setting hard resource budgets (RAM, CPU, binary size, network packet payloads).
* Specifying compiler flags, toolchains, and runtime minimum requirements.

---

## 🎯 Core Capabilities

* **Capability 1:** Maintains platform compatibility matrices with min vs target API levels.
* **Capability 2:** Sets strict resource allocations and automated enforcement mechanisms.
* **Capability 3:** Defines network transport payload and bandwidth constraints.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your TRD document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`TRD.template.md`](./TRD.template.md)
- **Exemplar:** [`TRD.md`](./TRD.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Omitting enforcement mechanisms for resource budgets.
* **Anti-Pattern:** Ignoring platform version deprecation and compatibility fallbacks.
