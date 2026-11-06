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
