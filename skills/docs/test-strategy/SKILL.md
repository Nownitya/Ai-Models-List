---
name: test-strategy
description: "Architect test pyramids, coverage targets, MockK/Turbine patterns, automated CI gating, and Definition of Done checklists."
---

# Test Strategy & Verification Architecture Skill

Standardized engineering skill for creating, updating, and verifying **TEST-STRATEGY** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Establishing the testing framework and verification architecture.
* Defining unit, integration, and E2E test coverage targets.
* Configuring Definition of Done gates to prevent regressions.

---

## 🎯 Core Capabilities

* **Capability 1:** Defines test pyramid distributions (e.g. 70% Unit, 20% Integration, 10% E2E).
* **Capability 2:** Specifies framework choices (pytest, JUnit5, Playwright, Testcontainers).
* **Capability 3:** Provides factual DoD checklists for PR and milestone sign-offs.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your TEST-STRATEGY document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`TEST-STRATEGY.template.md`](./TEST-STRATEGY.template.md)
- **Exemplar:** [`TEST-STRATEGY.md`](./TEST-STRATEGY.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Relying solely on unit tests while neglecting real integration boundaries.
* **Anti-Pattern:** Tolerating flaky tests or disabled test assertions in CI.
