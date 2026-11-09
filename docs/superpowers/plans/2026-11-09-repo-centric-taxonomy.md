# Repo-Centric Taxonomy & Upstream Framework Separation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform SkillDock's categorization architecture from generic buckets into an authentic, repo-centric upstream framework separation (GSD, Superpowers, gstack, Ralph, ECC, Impeccable, Matt Pocock, Android, Kotlin, Karpathy, Second Brain) with dedicated repo filters, metadata badges, and repository suite packs.

**Architecture:** Enrich `data/skills-directory.json` and `scripts/export_matrix_json.py` with an exhaustive upstream repository taxonomy mapping all 274 cataloged skills to their real git repositories and telemetry. Upgrade the React 19 web frontend with a dedicated Upstream Repository selector, repo filter chips, clickable repository badges on both Grid Cards and Dense Rows, and repo-native Starter Pack suites.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS, Python 3.12, TanStack Virtual.

**Spec:** Section 14 (Source Links) of `AI-Coding-Skills-and-Tools-Matrix.md` and repository laws in `AGENTS.md`.

## Global Constraints
- **Law 1: Dual Matrix Parity**: Parity between `.md` and `.csv` matrices must remain 100% verified via `python scripts/sync-matrix.py`.
- **Law 4: Skill Independence**: Never blend or mutate upstream skill contents; preserve pure upstream repo scoping.
- **Widescreen & Legibility**: Retain the `max-w-[1850px]` container and `text-sm`/`text-base` legible typography established in previous milestones.
- **Test Integrity**: All 63/63 unit tests must pass before deployment.

## Review Focus (Design Partner Review / gstack criteria)
1. **Cognitive Clarity**: Can a developer filter all skills belonging exclusively to `open-gsd/gsd-core` or `affaan-m/ecc` with a single click?
2. **Touch & Click Ergonomics**: Are repo filter pills and card badges cleanly clickable with >= 40px hit targets?
3. **Repository Transparency**: Does every skill card display its real GitHub repo (`author/repo`) with upstream star count instead of "Internal Spec" or "Local"?
4. **Performance**: Does virtualized rendering maintain 60fps scrolling when filtering across 100+ repository groupings?
5. **Zero Breaking Changes**: Does existing priority, category, and text search continue to work synergistically with repo filtering?

---

### Task 1: Comprehensive Repository Mapping Engine
**Files:**
- Modify: `scripts/export_matrix_json.py`
- Modify: `data/skills-directory.json`
- Test: `python scripts/sync-matrix.py`

- [ ] **Step 1**: Expand the repository lookup table in `scripts/export_matrix_json.py` to map all skill identifiers to their authentic upstream repositories:
  - `open-gsd/gsd-core` (all GSD skills)
  - `obra/superpowers` (all Superpowers skills)
  - `garrytan/gstack` (all gstack skills)
  - `snarktank/ralph` (Ralph loop skills)
  - `affaan-m/ecc` (Everything Claude Code skills)
  - `pbakaus/impeccable` (Impeccable design skills)
  - `mattpocock/skills` (Matt Pocock skills)
  - `android/skills` (Android skills)
  - `kotlin/kotlin-agent-skills` (Kotlin KMP skills)
  - `nextlevelbuilder/ui-ux-pro-max-skill` (UI/UX Pro Max)
  - `multica-ai/andrej-karpathy-skills` (Karpathy guidelines)
  - `leonxlnx/taste-skill` (Taste skill)
  - `addyosmani/agent-skills` (Addy Osmani skills)
  - `graphify-labs/graphify` (Graphify)
  - `mempalace/mempalace` (MemPalace)
  - `upstash/context7` (Context7)
  - `coderabbitai/skills` (CodeRabbit)
  - `openhands/openhands` (OpenHands)
  - `dietrichgebert/ponytail` (Ponytail)
  - `meta/astryx` (Astryx)
  - `google/skills` & `google-ai-edge/litert` (Google Edge / LiteRT)
- [ ] **Step 2**: Generate repo-level metadata (total skills count, display title, stars) and inject into `web/src/data/matrix.json`.
- [ ] **Step 3**: Run `python scripts/sync-matrix.py` and verify `matrix.json` contains >= 95% repo coverage.

---

### Task 2: Type Definition & Storefront State Updates
**Files:**
- Modify: `web/src/types/index.ts`
- Modify: `web/src/stores/useSkillStore.ts`
- Modify: `web/src/hooks/useFilteredSkills.ts`

- [ ] **Step 1**: Add `selectedRepo: string` to `SkillState` in `useSkillStore.ts`.
- [ ] **Step 2**: Update `useFilteredSkills.ts` to filter by `selectedRepo` when not `'all'`.
- [ ] **Step 3**: Include repo information (`repo`, `repoName`, `repoStars`) in `Skill` interface.

---

### Task 3: Interactive Repository Filter Bar & Selector
**Files:**
- Modify: `web/src/components/filters/FilterToolbar.tsx`

- [ ] **Step 1**: Add a prominent "Browse by Repository / Framework" pill selector for top repos:
  - `All Repos`
  - `GSD Core` (`open-gsd/gsd-core`)
  - `Superpowers` (`obra/superpowers`)
  - `gstack` (`garrytan/gstack`)
  - `ECC` (`affaan-m/ecc`)
  - `Ralph Loop` (`snarktank/ralph`)
  - `Impeccable` (`pbakaus/impeccable`)
  - `Matt Pocock` (`mattpocock/skills`)
  - `Android SDK` (`android/skills`)
  - `Kotlin KMP` (`kotlin/kotlin-agent-skills`)
  - `Karpathy` (`multica-ai/andrej-karpathy-skills`)
- [ ] **Step 2**: Add an "All Repositories ({N})" dropdown next to Categories in the filter toolbar for deep exploration of all 30+ tracked repositories.
- [ ] **Step 3**: Display active repo badge with clear button when a specific repository is selected.

---

### Task 4: Upstream Repository Badges on Cards & Rows
**Files:**
- Modify: `web/src/components/skills/SkillCard.tsx`
- Modify: `web/src/components/skills/CompactSkillRow.tsx`
- Modify: `web/src/components/modals/SkillDrawer.tsx`

- [ ] **Step 1**: On `SkillCard.tsx`, render an interactive GitHub repository pill with star count (e.g. `obra/superpowers ★315k`). Clicking filters to that repo.
- [ ] **Step 2**: On `CompactSkillRow.tsx`, add the repository badge in the row info.
- [ ] **Step 3**: In `SkillDrawer.tsx`, show full repository details with a one-click button "Filter all skills from this repository".

---

### Task 5: Repo-Centric Starter Packs
**Files:**
- Modify: `web/src/data/starterPacks.ts`

- [ ] **Step 1**: Restructure Curated Starter Packs around primary upstream frameworks:
  1. **GSD Autonomous Engine Suite** (open-gsd/gsd-core): Core, Phase Planning, Execution, Verification, Lifecycle Gates.
  2. **Superpowers Harness Suite** (obra/superpowers): Brainstorming, Writing Plans, Executing Plans, TDD, Systematic Debugging, Worktrees.
  3. **gstack YC / Founder Review Suite** (garrytan/gstack): CEO Review, Eng Review, Design Review, QA, Ship, Office Hours.
  4. **ECC & Ralph Loop Suite** (affaan-m/ecc & snarktank/ralph): Autonomous agent loops, Ralph PRD loop, AgentShield, Multi-Agent harness.
  5. **Android & KMP Native Mobile Suite** (android/skills & Kotlin): CameraX, Compose Preview, ANR Triage, Navigation 3, Toolchain.
  6. **Developer Second Brain & Context** (Obsidian, Graphify, MemPalace, Context7): AST graphs, semantic memory, live library docs.

---

### Task 6: Build, Test, Stage, and Deploy to GitHub Pages
**Files:**
- Test: `python -m unittest discover -s tests -p "*.py"`
- Test: `npm --prefix web run build`
- Deploy: `python scripts/deploy-skilldock.py`
- Git: Commit & Push to `origin/main`

- [ ] **Step 1**: Build React 19 app with Vite (`npm --prefix web run build`).
- [ ] **Step 2**: Run Python and frontend test suites to confirm 100% green status.
- [ ] **Step 3**: Execute `python scripts/deploy-skilldock.py` to stage root artifacts.
- [ ] **Step 4**: Commit and push to GitHub `origin/main`.
- [ ] **Step 5**: Verify live deployment on `https://nownitya.github.io/Ai-Models-List/`.
