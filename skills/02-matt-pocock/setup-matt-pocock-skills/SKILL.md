---
name: setup-matt-pocock-skills
description: "Foundational setup skill for Matt Pocock's engineering workflow: inspects repository, establishes issue tracker conventions, defines triage vocabulary, and scaffolds docs/agents configuration."
---

# Setup Matt Pocock Skills (`setup-matt-pocock-skills`)

Authoritative instructions for the **`setup-matt-pocock-skills`** configuration skill from [`mattpocock/skills`](https://github.com/mattpocock/skills).

`setup-matt-pocock-skills` is the foundational **Getting Started** workflow you run once per repository before utilizing any other engineering skills in Matt Pocock's toolkit (such as `/to-spec`, `/to-tickets`, `/triage`, `/implement`, or `/codebase-design`).

---

## When to Use

Activate this skill when:
* Onboarding a new repository to Matt Pocock's AI pairing and engineering workflow.
* Configuring or updating the project's issue tracker backend (GitHub Issues, GitLab, or local Markdown backlog).
* Standardizing triage and task labeling vocabulary (`p0-critical`, `needs-triage`, `ready-for-agent`, etc.).
* Documenting the domain architectural layout so downstream skills do not guess file structures.

---

## Core Capabilities & Workflow

When executed, the agent performs a structured 4-step setup protocol:

### 1. Repository & Remote Inspection
* Reads the Git remote (`git remote -v`) to identify the upstream repository owner and name.
* Detects available command-line issue trackers (e.g. `gh` for GitHub, `glab` for GitLab).

### 2. Issue Tracker Configuration (`docs/agents/issue-tracker.md`)
* Establishes how issues/tickets are queried, created, and updated.
* Defines primary tracker commands (`gh issue list`, `gh issue create`, `gh issue view`) and specifies the local Markdown fallback (`docs/TASKS.md` or `.scratch/issues/`).

### 3. Triage Taxonomy Configuration (`docs/agents/triage-labels.md`)
* Establishes canonical priority tiers:
  * `p0-critical`: Blockers, parity breaks, data corruption risks.
  * `p1-high`: Core architectural features and milestone blockers.
  * `p2-normal`: Standard engineering tickets and skill additions.
  * `p3-low`: Minor refinements and non-blocking spikes.
* Establishes workflow states: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`.

### 4. Domain & Architecture Mapping (`docs/agents/domain.md`)
* Maps out where requirements (`docs/PRD.md`), architecture (`docs/ARCHITECTURE.md`), and ADRs (`docs/adr/`) live.
* Injects the `## Matt Pocock Skills Configuration` reference block into `AGENTS.md` (or `CLAUDE.md`).

---

## Installation & Activation Command

Run directly in the coding agent chat:
```text
/setup-matt-pocock-skills
```

Or install the upstream package using the portable skills CLI:
```bash
npx skills@latest add mattpocock/skills
```

---

## Prerequisites

* Git repository initialized with a valid remote.
* GitHub CLI (`gh`) installed and authenticated if targeting GitHub Issues.
* Existing project rules file (`AGENTS.md` or `CLAUDE.md`) to receive configuration links.

---

## Anti-Patterns & Warnings

* **Anti-Pattern 1: Hardcoding Issue Tracker Assumptions**
  Never assume all repositories use GitHub Issues without inspecting `docs/agents/issue-tracker.md`. Always check the configured tracker backend first.
* **Anti-Pattern 2: Overwriting Custom Governance Laws**
  When injecting configuration blocks into `AGENTS.md`, append surgical reference links; never overwrite existing project laws or architecture rules.
* **Anti-Pattern 3: Skipping Triage Label Verification**
  Never invent arbitrary ad-hoc labels during `/to-tickets` that conflict with the team's established vocabulary in `docs/agents/triage-labels.md`.
