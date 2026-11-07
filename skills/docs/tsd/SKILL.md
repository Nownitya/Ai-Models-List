---
name: tsd
description: "Specify low-level binary wire protocols, packet layouts, bitmasks, audio/video codecs, and mathematical algorithms."
---

# Technical Specification Document (TSD) Skill

Standardized engineering skill for creating, updating, and verifying **TSD** documentation conforming to Layer 15 Universal Project Documentation Standard.

## When to Use

* Designing binary wire protocols, packet formats, and MTU packing.
* Specifying cryptographic algorithms, key exchange, and ciphers.
* Documenting mathematical formulas, routing algorithms, or codecs.

---

## 🎯 Core Capabilities

* **Capability 1:** Draws ASCII bit-level packet wire diagrams with exact byte offsets.
* **Capability 2:** Defines magic bytes, sequence numbers, checksums, and payload fields.
* **Capability 3:** Specifies compression algorithms, bitrate targets, and crypto suites.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# Activate this skill for your active coding session
# Follow the structured workflow to generate or review your TSD document
```

### Direct Project Scaffolding
```bash
# Scaffold this document directly into your project
python scripts/scaffold-project-docs.py --target-dir "/path/to/project" --project-name "MyProject"
```

---

## 📋 Document Template & Schema

Refer to the bundled template and real-world production exemplar in this directory:
- **Template:** [`TSD.template.md`](./TSD.template.md)
- **Exemplar:** [`TSD.md`](./TSD.md)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Using variable-endian formats without explicit specification.
* **Anti-Pattern:** Missing checksum or integrity verification in binary payloads.
