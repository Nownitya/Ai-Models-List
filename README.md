# AI Models & Skills Matrix

> Master catalog, structured repository, and prompt optimization toolkit for AI coding skills, agent harnesses, developer tools, and language model workflows.

[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Standards](https://img.shields.io/badge/Docs-Universal%20Standard%2015-orange.svg)](docs/governance/RULES.md)

---

## 🌟 Overview

**Ai-Models-List** is an authoritative inventory and engineering directory containing:
1. **The Complete Skills & Tools Matrix** in two synchronized master formats:
   - 📄 [**Markdown Edition**](AI-Coding-Skills-and-Tools-Matrix.md) (`AI-Coding-Skills-and-Tools-Matrix.md`)
   - 📊 [**CSV Edition**](AI-Coding-Skills-and-Tools-Matrix.csv) (`AI-Coding-Skills-and-Tools-Matrix.csv`)
2. **Category-Wise Skill Folders** (`skills/`): Modular directories housing specific skill documentation, installation instructions, and best practice playbooks across 12 distinct functional domains.
3. **AI Optimization Prompts** (`prompts/`): High-efficiency system prompts, reasoning architectures, few-shot templates, and verification gates designed to extract maximum performance from LLMs (Gemini, Claude, GPT, etc.).
4. **Universal Project Documentation Standard (Layer 15)**: Standardized architecture, governance rules, security checklists, and self-review gates.

---

## 🔒 Golden Rule: Matrix Dual-Format Synchronization

> [!IMPORTANT]
> **Strict Invariant**: Any addition, update, or deprecation of a skill, model, prompt, or tool **MUST** be recorded simultaneously in **BOTH**:
> 1. `AI-Coding-Skills-and-Tools-Matrix.md`
> 2. `AI-Coding-Skills-and-Tools-Matrix.csv`
>
> Neither file may diverge from the other. Use the validation script in `scripts/sync-matrix.py` to check parity.

---

## 📊 Top Upstream Skills by Community Stars (Live Sample)

> Synchronized automatically from [**`docs/LIVE-STATS.md`**](docs/LIVE-STATS.md) and [`data/github-metrics.json`](data/github-metrics.json) via `.github/workflows/sync-metrics.yml`.

<!-- START_LIVE_STATS -->
| Rank | Framework / Repository | Stars | Release | License | Last Active | Live Badge |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| 1 | [**mattpocock/skills**](https://github.com/mattpocock/skills) | **⭐ 318k** | `v1.3.2` | `MIT` | 2026-11-05 | ![Stars](https://img.shields.io/github/stars/mattpocock/skills?style=flat&label=stars) |
| 2 | [**obra/superpowers**](https://github.com/obra/superpowers) | **⭐ 314k** | `v7.0.2` | `MIT` | 2026-11-03 | ![Stars](https://img.shields.io/github/stars/obra/superpowers?style=flat&label=stars) |
| 3 | [**affaan-m/ECC**](https://github.com/affaan-m/ECC) | **⭐ 299k** | `v2.2.3` | `MIT` | 2026-11-06 | ![Stars](https://img.shields.io/github/stars/affaan-m/ECC?style=flat&label=stars) |
| 4 | [**multica-ai/andrej-karpathy-skills**](https://github.com/multica-ai/andrej-karpathy-skills) | **⭐ 231k** | `latest` | `Other` | 2026-04-20 | ![Stars](https://img.shields.io/github/stars/multica-ai/andrej-karpathy-skills?style=flat&label=stars) |
| 5 | [**anthropics/skills**](https://github.com/anthropics/skills) | **⭐ 189k** | `latest` | `Other` | 2026-11-06 | ![Stars](https://img.shields.io/github/stars/anthropics/skills?style=flat&label=stars) |
| 6 | [**DietrichGebert/ponytail**](https://github.com/DietrichGebert/ponytail) | **⭐ 186k** | `v5.3.3` | `MIT` | 2026-10-29 | ![Stars](https://img.shields.io/github/stars/DietrichGebert/ponytail?style=flat&label=stars) |
| 7 | [**nextlevelbuilder/ui-ux-pro-max-skill**](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | **⭐ 147k** | `v2.15.0` | `MIT` | 2026-11-07 | ![Stars](https://img.shields.io/github/stars/nextlevelbuilder/ui-ux-pro-max-skill?style=flat&label=stars) |
| 8 | [**Graphify-Labs/graphify**](https://github.com/Graphify-Labs/graphify) | **⭐ 144k** | `v1.0.0` | `Apache-2.0` | 2026-11-08 | ![Stars](https://img.shields.io/github/stars/Graphify-Labs/graphify?style=flat&label=stars) |
| 9 | [**garrytan/gstack**](https://github.com/garrytan/gstack) | **⭐ 141k** | `v1.97.0.0` | `MIT` | 2026-11-08 | ![Stars](https://img.shields.io/github/stars/garrytan/gstack?style=flat&label=stars) |
| 10 | [**openai/codex**](https://github.com/openai/codex) | **⭐ 134k** | `winget-test-rust-v0.106.0-alpha.9` | `Apache-2.0` | 2026-11-08 | ![Stars](https://img.shields.io/github/stars/openai/codex?style=flat&label=stars) |
<!-- END_LIVE_STATS -->

👉 *Full 31 upstream frameworks ranked with live versions and telemetry in [**`docs/LIVE-STATS.md`**](docs/LIVE-STATS.md) and interactive catalog at [**`https://nownitya.github.io/Ai-Models-List/`**](https://nownitya.github.io/Ai-Models-List/).*

---

## 📚 Priority Classification Guide

| Priority | Level | Definition & Activation Policy |
| :--- | :--- | :--- |
| **P0** | **Essential** | Prioritize for the main toolkit. Core daily drivers for coding, debugging, planning, and verification. |
| **P1** | **High** | Strongly recommended for regular engineering workflows and multi-agent systems. |
| **P2** | **Medium** | Keep available and activate on-demand when specific project needs arise. |
| **P3** | **Optional** | Specialized or experimental capabilities; install only for relevant stacks (e.g. XR, TV, Automotive). |

---

## 📁 Repository Structure

```text
Ai-Models-List/
├── AI-Coding-Skills-and-Tools-Matrix.md      # Master workbook (Markdown format)
├── AI-Coding-Skills-and-Tools-Matrix.csv     # Master workbook (CSV format)
├── README.md                                 # Project overview and navigation
├── AGENTS.md                                 # Agent operating instructions & governance laws
├── GLOSSARY.md                               # Canonical domain vocabulary & terminology
├── LICENSE                                   # MIT License
├── docs/                                     # Universal Documentation Standard (Layer 15)
│   ├── architecture/
│   │   └── ARCHITECTURE.md                  # System & catalog architecture
│   ├── governance/
│   │   ├── RULES.md                          # Repository maintenance and synchronization rules
│   │   └── DECISION.md                       # Architectural decision record
│   ├── product/
│   │   ├── PRD.md                            # Product Requirements Document
│   │   ├── ROADMAP.md                        # Delivery phases and milestones
│   │   └── FEATURES.md                       # Feature catalog and status
│   └── testing/
│       └── TEST-STRATEGY.md                  # Verification and linting strategy
├── prompts/                                  # AI Optimization Prompts
│   ├── prompt-optimization-framework.md      # Engineering principles for prompt tuning
│   ├── agent-role-prompts.md                 # Specialized role prompts (Planner, Reviewer, etc.)
│   └── code-quality-prompts.md               # TDD, refactoring, security & debugging prompts
├── skills/                                   # Category-Wise Skill Libraries
│   ├── 01-core-engineering/                 # Brainstorming, TDD, debugging, verification
│   ├── 02-matt-pocock/                       # Grill-me, to-spec, to-tickets, codebase-design
│   ├── 03-android/                           # Compose, Navigation 3, Profiler, ANR, R8
│   ├── 04-kotlin-kmp/                        # Toolchains, SPM, native build, SwiftUI Pro
│   ├── 05-ui-ux/                             # UI/UX Pro Max, Impeccable, UI Taste
│   ├── 06-gsd/                               # Get Stuff Done planning & execution engine
│   ├── 07-gstack/                            # Garry Tan gstack engineering workflows
│   ├── 08-superpowers/                       # Superpowers agent workflows
│   ├── 09-autonomous-agents/                 # Ralph, OpenHands, Codex, MemPalace, ECC
│   ├── 10-ai-infrastructure/                 # Graphify, Context7, OmniRoute, Gemini APIs
│   ├── 11-code-review/                       # CodeRabbit, OpenCodeReview, verification
│   └── 12-specialized/                       # Maps, GCP pipelines, BigQuery, data tools
└── scripts/
    ├── github-push.sh                        # GitHub CLI publishing & sync script (Bash)
    ├── github-push.ps1                       # GitHub CLI publishing & sync script (PowerShell)
    └── sync-matrix.py                        # Parity validator for .md and .csv matrices
```

---

## 🚀 GitHub CLI Publishing (`github-push.sh` / `.ps1`)

To push this repository to your GitHub account using the GitHub CLI:

### Option A: Using Bash (`github-push.sh`)
```bash
bash scripts/github-push.sh
```

### Option B: Using PowerShell (`github-push.ps1`)
```powershell
.\scripts\github-push.ps1
```

The script will:
1. Verify `gh` CLI authentication.
2. Initialize the Git repository and commit all assets if not yet initialized.
3. Check if the remote repository `Ai-Models-List` exists under your account.
4. Create the repository on GitHub if needed and push the `main` branch cleanly.

---

## 🛠️ Matrix Contents Summary

- **01 Core Engineering**: 26 foundational skills (brainstorming, writing-plans, systematic-debugging, TDD, verification).
- **02 Matt Pocock Skills**: 21 practical developer-centric skills (grill-me, to-spec, to-tickets, codebase-design).
- **03 Android Development**: 36 official Android skills (adaptive layouts, Compose performance, ANR audit, Security).
- **04 Kotlin / KMP**: Kotlin toolchain, native build performance, SwiftUI Pro & Expert integrations.
- **05 UI/UX Design**: UI/UX Pro Max (79 styles, 22 stack playbooks), Impeccable (24 design commands), UI Taste.
- **06 GSD (Get Stuff Done)**: Phase-driven milestone lifecycle (Discuss → Plan → Execute → Verify → Ship).
- **07 gstack**: 17 product and quality engineering commands by Garry Tan.
- **08 Superpowers**: Systematic development and debugging frameworks.
- **09 Autonomous Agents**: Ralph Loop, Codex, OpenHands, MemPalace (long-term memory), ECC (Everything Claude Code).
- **10 AI Infrastructure**: Graphify (codebase AST graphs), Context7 (versioned external docs), OmniRoute, Gemini API.
- **11 Code Review Quality**: CodeRabbit, OpenCodeReview, pre-commit validation.
- **12 Optional Specialized**: GCP data pipelines, Spark, BigQuery, Maps, and specialized database tooling.
- **15 Universal Project Documentation Standard**: The comprehensive documentation register, engineering rules, self-review quiz, and security checklist.

---

## 📄 License
This repository is open-sourced under the [MIT License](LICENSE).

