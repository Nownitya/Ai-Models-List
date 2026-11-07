# PRD — AI Coding Skills and Tools Matrix (`Ai-Models-List`)

> **Authoritative Product Requirements Document**  
> **Status:** Active / Living Document  
> **Standard:** Layer 15 Universal Project Documentation  
> **Target Project:** `Ai-Models-List`

---

## 1. Executive Summary & Vision

`Ai-Models-List` is the authoritative, version-controlled open-source matrix, interactive catalog, and agent toolchain repository. It systematically catalogs, benchmarks, and provides prompt optimization for over 228 AI coding skills, agent harnesses, memory frameworks, and developer tools across 12 functional domains.

The platform serves as both a reference catalog with real-time upstream telemetry and an automated delivery harness providing instantaneous cryptographic skill injection into developer repositories.

---

## 2. Target Personas & Stakeholders

| Persona | Role | Primary Goal | Key Pain Points |
| :--- | :--- | :--- | :--- |
| **P-1: Solo AI Engineer** | Full-stack / Mobile developer | Leverage curated skills across Claude Code, Gemini, Antigravity, and Cursor | Scattered fragmented prompts, outdated skills, manual copy-pasting |
| **P-2: Harness Architect** | Multi-agent framework builder | Integrate standardized memory, review, and verification agent loops | Lack of standardized `SKILL.md` contracts and upstream version tracking |
| **P-3: Engineering Lead** | Staff / Principal Lead | Enforce rigorous quality standards (TDD, red-green refactoring, Layer 15 docs) | Inconsistent prompt adherence, hallucinated tools, lack of auditability |

---

## 3. Core Functional Requirements (FR)

* **FR-01: Dual-Format Matrix Parity**:
  Maintain strict synchronization between `AI-Coding-Skills-and-Tools-Matrix.md` and `AI-Coding-Skills-and-Tools-Matrix.csv` across all 16 canonical sections, verified via CI gate.
* **FR-02: Universal Catalog Coverage**:
  Organize 228+ skills across 12 functional categories (`01-core-engineering` through `12-specialized`) plus master project docs specifications.
* **FR-03: Realtime Upstream GitHub Telemetry**:
  Automatically query 32+ upstream GitHub repositories daily for community stars, latest release versions, licenses, and push dates using unauthenticated/authenticated GitHub APIs with graceful zero-drift fallback.
* **FR-04: Interactive Web Catalog & Radar**:
  Provide an ergonomic, high-taste static web dashboard (`index.html`) hosted via GitHub Pages with Bento hero telemetry, live radar strip, instant search, priority filtering, and 1-click prompt injection modals.
* **FR-05: Skill Injection & Verification Tooling**:
  Provide automated Python CLI utilities (`install-to-project.py`, `verify-lock.py`, `sync-matrix.py`, `test-skills.py`) requiring zero external pip dependencies.

---

## 4. Non-Functional Requirements (NFR)

* **NFR-01: Zero External Python Dependencies**: All automation scripts and tests must run exclusively on standard Python 3.10+ standard libraries (`urllib`, `json`, `hashlib`, `unittest`, `argparse`, `pathlib`).
* **NFR-02: Sub-Second Client Performance**: Web dashboard must load under 1.0s on 3G connections and render 240+ cards with instant (<50ms) search filtering.
* **NFR-03: Cryptographic Integrity**: Lockfile `skills-lock.json` must enforce SHA-256 integrity across local agents with platform-independent CRLF/LF normalization.
* **NFR-04: Documentation Single Source of Truth**: All living documentation in `docs/` must remain cumulatively merged under Layer 15 standards.

---

## 5. Success Metrics & Verification Gates

1. **Parity Gate**: `python scripts/sync-matrix.py` returns exit code 0 on every commit.
2. **Quality Gate**: `python scripts/test-skills.py` verifies 100% of `SKILL.md` files pass Law 2 structure.
3. **Unit Test Gate**: `python -m unittest discover tests "test_*.py"` passes 100% of test suites.
4. **Availability Gate**: `https://nownitya.github.io/Ai-Models-List/` delivers HTTP 200 with zero build cost on GitHub Pages.
