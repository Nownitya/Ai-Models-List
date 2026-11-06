# AGENTS.md — Agent Operating Instructions & Repository Laws

> Authoritative operating guide for AI coding assistants working in the `Ai-Models-List` repository.

---

## 🏛️ Non-Negotiable Laws

### Law 1: Dual Matrix Parity
Any addition, modification, or removal of an AI skill, model, framework, or tool **MUST** be applied simultaneously to:
1. `AI-Coding-Skills-and-Tools-Matrix.md` (Markdown format)
2. `AI-Coding-Skills-and-Tools-Matrix.csv` (CSV format)

Never update one file without updating the other in the exact same turn or commit. Validate parity with `python scripts/sync-matrix.py`.

### Law 2: Standardized Skill Structure
When adding or documenting a skill in `skills/<category>/<skill-name>/`:
- The root document must be `SKILL.md` with standard YAML frontmatter (`name`, `description`).
- Document **When to Use**, **Core Capabilities**, **Installation / Activation Command**, **Prerequisites**, and **Anti-patterns / Warnings**.
- If prompts or few-shots are relevant, place them in a `prompts/` subfolder or section inside the skill directory.

### Law 3: Layer 15 Universal Project Documentation
Follow the Universal Project Documentation Standard:
- Update `docs/IMPLEMENTATION-STATUS.md` with factual, verified evidence.
- Maintain `GLOSSARY.md` for any new acronyms or specialized agent concepts.
- Comply with the self-review quiz before claiming a change is complete.

---

## 🧭 Directory Map

| Path | Purpose |
| :--- | :--- |
| `AI-Coding-Skills-and-Tools-Matrix.md` | Master workbook in GitHub Flavored Markdown |
| `AI-Coding-Skills-and-Tools-Matrix.csv` | Master workbook in comma-separated values format |
| `prompts/` | Curated prompts for AI model and agent optimization |
| `skills/` | Functional category folders (01-core to 12-specialized) |
| `docs/` | Governance, product, architecture, and verification documentation |
| `scripts/` | Tooling for GitHub CLI push and matrix synchronization |

---

## ⚡ Agent Self-Review Gate
Before presenting changes or completing a task, verify:
- [ ] Were both `.md` and `.csv` matrices updated if skills were added/changed?
- [ ] Are all external links documented in `14 Source Links` accurate?
- [ ] Are all prompt templates tested and formatted with clear delimiters (`<system>`, `<user>`, etc.)?
- [ ] Is there any unverified hallucination or dead link?

