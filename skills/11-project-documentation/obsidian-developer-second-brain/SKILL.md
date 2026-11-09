---
name: obsidian-developer-second-brain
description: "Universal Obsidian Developer Second Brain architecture: 4 integration modes, Git-first separation, Dataview dashboards, and automated vault sync."
---

# Obsidian Developer Second Brain by Steph Ango / Obsidian Community ([obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases))

Authoritative engineering and execution instructions for establishing a local-first, markdown-native **Developer Second Brain** with Obsidian across any software engineering project (`P0` Priority).

---

## When to Use

Activate this skill when:
- Establishing a local knowledge graph, documentation hub, or personal second brain for software development.
- Integrating a Git repository with an Obsidian vault safely (without corrupting code, lockfiles, or pre-commit hooks).
- Orchestrating Obsidian community plugins (`dataview`, `smart-connections`, `obsidian-git`, `omnisearch`, `templater`, `kanban`, `tasks`, `excalidraw`) for developer productivity.
- Eliminating context fragmentation between source code, PRDs, ADRs, sprint checklists, and AI agent transcripts.

---

## Core Capabilities

1. **4 Universal Integration Modes**:
   - **Mode 1 (Automated Sync Script)**: Pre-commit / release script one-way push (`python scripts/sync-obsidian.py`). Safest for cryptographic lockfiles.
   - **Mode 2 (Directory Junction / Symlink)**: Zero-copy live two-way editing (`mklink /J` or `ln -s`) linking `docs/` directly into the vault.
   - **Mode 3 (Git-Submodule Vault)**: Distributed monorepo vault tracking project docs as submodules with `obsidian-git`.
   - **Mode 4 (Headless AI Agent Bridge)**: Obsidian Local REST API / MCP server allowing AI coding agents to search and read notes.
2. **Dataview Project Dashboards**: Auto-aggregates active projects, pending sprint tasks, and Architecture Decision Records (ADRs).
3. **Smart Connections Semantic AI**: Local vector embeddings indexing codebase architecture notes to reveal cross-project connections.
4. **Automated Templating**: 1-click Templater generation of Layer 15 PRDs, ADRs, and Sprint closeout reports.

---

## Activation Command

```bash
/doc-obsidian-developer-second-brain
```

Or install directly into an active project workspace:
```bash
python scripts/install-to-project.py --skill doc-obsidian-developer-second-brain
```

---

## Prerequisites

- Obsidian v1.6+ installed locally (Desktop or Mobile).
- Git repository with Layer 15 documentation (`docs/` directory).
- Python 3.10+ for running synchronization scripts.

---

## Workflow

1. **Vault Structure Setup**: Ensure the vault follows the `01_Projects/<Domain>/<Project-Name>` standard.
2. **Configure Integration Mode**: Select Mode 1 (automated sync script) for high-governance projects or Mode 2 (symlink) for rapid solo prototyping.
3. **Deploy Dataview Dashboard**: Paste the standard project dashboard into your vault's `INDEX.md`:
   ```dataview
   TABLE platform, priority, status, file.mtime AS "Updated"
   FROM "01_Projects"
   SORT file.mtime DESC
   ```
4. **Wire Pre-Commit Sync**: Add `python scripts/sync-obsidian.py` to your git pre-commit hook or release pipeline.
5. **Verify Parity**: Run `python scripts/sync-matrix.py` and `python scripts/test-skills.py`.

---

## Anti-Patterns & Warnings

> [!WARNING]
> - **Never edit active code, lockfiles (`skills-lock.json`), or dual-matrix files directly inside Obsidian**: Git is the single source of truth. Always make code and lockfile edits in your IDE and sync downstream.
> - **Never use proprietary cloud databases for project documentation**: Keep all technical decisions in plain-text GitHub-Flavored Markdown (`.md`) to guarantee file-over-app longevity.
> - **Never mix unrelated project notes**: Keep project documentation strictly organized under `01_Projects/<Domain>/<Project-Name>`.

---

## Reference Documentation
- [Universal Obsidian Architecture Guide](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/integrations/OBSIDIAN-DEVELOPER-SECOND-BRAIN.md)
- [Plugin Orchestration & Dataview Guide](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/integrations/OBSIDIAN-PLUGINS-FOR-DEVELOPERS.md)
