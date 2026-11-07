---
name: Ai-Models-List
description: "Master engineering, architecture, and catalog governance skill for the Ai-Models-List repository. Enforces Dual Matrix Parity, Standardized Skill Structure, Layer 15 Project Documentation Standard, and Skill Independence across creators (Superpowers, gstack, Matt Pocock, GSD, Google Android, Docs)."
---

# Ai-Models-List Master Engineering Skill

Authoritative engineering, catalog governance, and skill optimization instructions for **Ai-Models-List** (The Definitive AI Coding Skills, Models & Agent Engineering Catalog).

## When to Use

Activate this skill whenever:
* Adding, modifying, auditing, or removing any AI skill, model, framework, prompt, or tool.
* Maintaining dual matrix parity between `AI-Coding-Skills-and-Tools-Matrix.md` and `AI-Coding-Skills-and-Tools-Matrix.csv`.
* Authoring or refactoring skills in `skills/` or `.agents/skills/`.
* Running verification gates (`scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync-local-agents.py`).
* Generating or updating project documentation under `docs/` using the Layer 15 Universal Project Documentation Standard.
* Deploying updates to GitHub or GitHub Pages (`scripts/github-push.ps1`).

---

## 🏛️ Non-Negotiable Repository Laws

### Law 1: Dual Matrix Parity
Any addition, modification, or removal of an AI skill, model, framework, or tool **MUST** be applied simultaneously to:
1. `AI-Coding-Skills-and-Tools-Matrix.md` (Markdown format)
2. `AI-Coding-Skills-and-Tools-Matrix.csv` (CSV format)
Never update one without updating the other in the exact same turn or commit. Validate parity with:
```bash
python scripts/sync-matrix.py
```

### Law 2: Standardized Skill Structure
Every skill package in `skills/<category>/<skill-name>/` or `.agents/skills/<skill-name>/`:
- Must have a root `SKILL.md` with standard YAML frontmatter (`name`, `description`).
- Must document **When to Use**, **Core Capabilities** (or **Workflow**), **Installation / Activation Command**, **Prerequisites**, and **Anti-Patterns / Warnings** (or **Rules**).
- Prompts and templates must be clearly delimited with `<system>`, `<user>`, or fenced blocks.
Validate compliance with:
```bash
python scripts/test-skills.py
```

### Law 3: Layer 15 Universal Project Documentation Standard
Maintain the single-source-of-truth living documentation under `docs/`:
- Keep `docs/IMPLEMENTATION-STATUS.md` updated with factual, verified evidence.
- Maintain `GLOSSARY.md` for any new acronyms or agent protocols.
- Scaffold target project documentation suites using:
```bash
python scripts/scaffold-project-docs.py --target <path>
```

### Law 4: Skill Independence vs Project Docs Synthesis
- **Skill Independence (Never Merge Skills Across Creators)**:
  Skills from different upstream creators or repositories (`obra/superpowers`, `garrytan/gstack`, `mattpocock`, `open-gsd`, `google/android`) **MUST** remain separate, distinct, and pure. Never merge, blend, or overwrite different framework skills together even if they share similar names (such as `code-review`, `debugging`, or `tdd`). Each skill must preserve its author's unique methodology, prompts, and workflow, selectable individually using its repository-scoped `/` slash command.
- **Project Documentation Synthesis (`docs/` Merging Only)**:
  The rule of cumulative merging and updating applies **strictly to the `docs/` folder** created for a specific project. Within `docs/`, new findings, requirements, sprint reports, and test evidence must be synthesized and merged into canonical living documents without fragmentation.

---

## 🛠️ Verification & Synchronization Commands

| Command | Purpose | Verification Gate |
| :--- | :--- | :--- |
| `python scripts/sync-matrix.py` | Verify & synchronize `.md` and `.csv` matrices | Must output `[OK] Master Matrix Parity Verified` |
| `python scripts/test-skills.py` | Audit all skills for YAML, Law 2 sections, links | Must report `0 errors` |
| `python scripts/sync-local-agents.py` | Synchronize skills with local agent config | Bidirectional sync with collision safety |
| `python scripts/scaffold-project-docs.py` | Scaffold 28 Layer 15 documents into target project | Layer 15 documentation setup |
| `.\scripts\github-push.ps1` | Validate gates, commit atomic changes, push to GitHub | Clean origin push with CI/CD trigger |

---

## ⚡ Agent Self-Review Gate
Before presenting any work or concluding a turn:
- [ ] Were both `.md` and `.csv` updated if matrix entries changed?
- [ ] Does `python scripts/sync-matrix.py` report 0 parity drift?
- [ ] Does `python scripts/test-skills.py` report 0 errors?
- [ ] Are skills across different creators preserved as independent units?
- [ ] Is there any unverified hallucination or broken reference link?
