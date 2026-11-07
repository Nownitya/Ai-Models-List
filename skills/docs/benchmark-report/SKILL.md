---
name: benchmark-report
description: "Conduct stress tests, measure throughput/latency/memory, and author empirical performance benchmark reports."
---

# Performance & Field Benchmark Report Skill

Standardized engineering skill for creating, updating, and verifying **BENCHMARK-REPORT** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Benchmarking system throughput, latency, memory consumption, or radio RF.
* Validating that performance budgets specified in TRD are satisfied.
* Diagnosing regressions or stress limits under peak load.

---

## 🎯 Core Capabilities

* **Capability 1:** Documents test hardware configuration, tooling, and test parameters.
* **Capability 2:** Records mean, p95, and p99 metrics with Pass/Fail status.
* **Capability 3:** Surfaces bottleneck analysis and optimization recommendations.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your BENCHMARK-REPORT document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`BENCHMARK-REPORT.template.md`](./BENCHMARK-REPORT.template.md)
- **Exemplar:** [`RangeBenchmark.md`](./RangeBenchmark.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Benchmarking on non-reproducible or un-isolated hardware environments.
* **Anti-Pattern:** Reporting only mean latency without p95 and p99 percentiles.
