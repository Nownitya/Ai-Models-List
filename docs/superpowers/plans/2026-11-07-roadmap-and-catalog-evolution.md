# Roadmap and Catalog Evolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish canonical Layer 15 project specifications for the `Ai-Models-List` repository, provide cryptographic lockfile verification, add multi-skill preset bundle injection to the installer CLI, and enhance web dashboard discovery.

**Architecture:** Decomposes the catalog evolution into four modular engineering deliverables:
1. Canonical Layer 15 documentation synthesis for `Ai-Models-List` (`docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, `docs/TASKS.md`, `docs/BRD.md`, `docs/TRD.md`, `docs/testing/TEST-STRATEGY.md`, and initial ADRs).
2. A standalone cryptographic lockfile verification CLI (`scripts/verify-lock.py`) with unit tests in `tests/test_verify_lock.py`.
3. Preset bundle support in `scripts/install-to-project.py` (`--bundle <name>`) with unit tests in `tests/test_install_to_project.py`.
4. Preset bundle filters and 1-click slash command navigation in `index.html`.

**Tech Stack:** Python 3.14 (Standard Library: `unittest`, `hashlib`, `json`, `argparse`, `pathlib`), GitHub Flavored Markdown (Layer 15 standard), HTML5/CSS3/Vanilla JS.

**Spec:** [`docs/product/PRD.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/product/PRD.md) and [`docs/architecture/ARCHITECTURE.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/architecture/ARCHITECTURE.md)

## Global Constraints

- **Zero Third-Party Python Dependencies**: Use only Python 3 standard library modules (`unittest`, `hashlib`, `pathlib`, `json`, `argparse`, `shutil`).
- **Law 1: Dual Matrix Parity**: Every change touching matrix items must update both `AI-Coding-Skills-and-Tools-Matrix.md` and `.csv` in the same turn.
- **Law 2: Standardized Skill Structure**: Every skill must have YAML frontmatter, `When to Use`, `Core Capabilities`, `Prerequisites`, and `Anti-Patterns`.
- **Law 3: Layer 15 Project Documentation Standard**: Living documentation in `docs/` must remain synthesized as a single source of truth.
- **Law 4: Skill Independence vs Project Docs Synthesis**: Skills from different creators must never be merged or overwritten.
- **Test Runner**: Run all tests via Python's built-in test runner: `python -m unittest discover tests "test_*.py" -v`.

## Review Focus

1. **Line Ending Platform Normalization**: SHA-256 hash checks on `SKILL.md` could fail across Windows (CRLF) and Unix/Git (LF) checkouts. Verification must normalize line endings (`\r\n` -> `\n`) before hashing or verify raw binary match.
2. **Scaffold Protection Against Existing Files**: Scaffolding Layer 15 documents into `docs/` must never overwrite existing customized files (`docs/product/PRD.md`, `docs/governance/RULES.md`, `AGENTS.md`) without explicit confirmation.
3. **Cross-Creator Preset Disambiguation**: When an install preset includes skills from distinct authors (e.g. `code-review`), the installer must resolve to author-scoped destinations (`mp-code-review`, `gstack-review`) to uphold Law 4.
4. **Resilient Error Handling on Missing Lockfile**: `scripts/verify-lock.py` must return clear exit code 1 with actionable guidance when `skills-lock.json` is missing or corrupt, instead of an unhandled Python traceback.
5. **Web Filter Case and Slash Flexibility**: Web dashboard filter must match both with and without leading slashes (e.g., `superpowers-writing-plans` and `/superpowers-writing-plans`).

---

## Tasks

### Task 1: Scaffolding and Synthesizing Layer 15 Canonical Project Documentation

**Files:**
- Create: `docs/ROADMAP.md`
- Create: `docs/TASKS.md`
- Create: `docs/BRD.md`
- Create: `docs/TRD.md`
- Create: `docs/testing/TEST-STRATEGY.md`
- Create: `docs/adr/0001-dual-matrix-parity.md`
- Create: `docs/adr/0002-law-4-skill-independence.md`
- Modify: `docs/product/PRD.md`
- Modify: `docs/architecture/ARCHITECTURE.md`
- Modify: `docs/IMPLEMENTATION-STATUS.md`
- Test: `tests/test_docs_integrity.py`

**Interfaces:**
- Consumes: Templates in `templates/layer-15/` and rules in `AGENTS.md`.
- Produces: Fully populated, canonical Layer 15 living documentation for `Ai-Models-List`.

- [ ] **Step 1: Write the failing documentation integrity test**

Create `tests/test_docs_integrity.py` asserting that all canonical Layer 15 documents exist, contain project title "Ai-Models-List", and have non-empty required sections.

```python
import unittest
from pathlib import Path

class TestDocsIntegrity(unittest.TestCase):
    def setUp(self):
        self.repo_root = Path(__file__).resolve().parent.parent
        self.docs_dir = self.repo_root / "docs"

    def test_canonical_docs_exist(self):
        required_files = [
            "PRD.md", "ARCHITECTURE.md", "ROADMAP.md", "TASKS.md",
            "BRD.md", "TRD.md", "testing/TEST-STRATEGY.md",
            "adr/0001-dual-matrix-parity.md", "adr/0002-law-4-skill-independence.md"
        ]
        for rel_path in required_files:
            file_path = self.docs_dir / rel_path
            self.assertTrue(file_path.exists(), f"Missing canonical doc: {rel_path}")
            content = file_path.read_text(encoding="utf-8")
            self.assertIn("Ai-Models-List", content, f"Doc {rel_path} missing project name")
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m unittest tests/test_docs_integrity.py`
Expected: FAIL with missing file assertions.

- [ ] **Step 3: Synthesize canonical Layer 15 documentation**

Author the missing Layer 15 documents (`docs/ROADMAP.md`, `docs/TASKS.md`, `docs/BRD.md`, `docs/TRD.md`, `docs/testing/TEST-STRATEGY.md`, and ADRs 0001 & 0002) customizing from `templates/layer-15/` specifically for the `Ai-Models-List` catalog, and update `docs/product/PRD.md` and `docs/architecture/ARCHITECTURE.md` with complete subsystem contracts.

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m unittest tests/test_docs_integrity.py`
Expected: PASS (all canonical docs verified).

- [ ] **Step 5: Commit**

```bash
git add docs/ tests/test_docs_integrity.py
git commit -m "docs: establish canonical Layer 15 project specifications and ADRs"
```

---

### Task 2: Cryptographic Lockfile Verification CLI (`scripts/verify-lock.py`)

**Files:**
- Create: `scripts/verify-lock.py`
- Test: `tests/test_verify_lock.py`

**Interfaces:**
- Consumes: `skills-lock.json` and file contents of `.agents/skills/<name>/SKILL.md`.
- Produces: CLI exit code 0 on verified integrity; exit code 1 on checksum drift, missing files, or schema violations.

- [ ] **Step 1: Write the failing unit tests for lockfile verification**

Create `tests/test_verify_lock.py` testing:
1. `compute_normalized_hash(content)` normalizes CRLF/LF to guarantee cross-platform consistency.
2. `verify_skills_lock(lock_path, skills_root)` returns `(True, [])` when all hashes match.
3. `verify_skills_lock(lock_path, skills_root)` returns `(False, errors)` when a file is modified or missing.

```python
import unittest
from pathlib import Path
from scripts.verify_lock import compute_normalized_hash, verify_skills_lock

class TestVerifyLock(unittest.TestCase):
    def test_normalized_hash_crlf_lf_invariance(self):
        crlf_bytes = b"name: test\r\ndescription: sample\r\n"
        lf_bytes = b"name: test\ndescription: sample\n"
        self.assertEqual(compute_normalized_hash(crlf_bytes), compute_normalized_hash(lf_bytes))

    def test_live_skills_lock_validity(self):
        repo_root = Path(__file__).resolve().parent.parent
        lock_file = repo_root / "skills-lock.json"
        skills_dir = repo_root / ".agents" / "skills"
        is_valid, errors = verify_skills_lock(lock_file, skills_dir)
        self.assertTrue(is_valid, f"Verification failed with errors: {errors}")
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m unittest tests/test_verify_lock.py`
Expected: FAIL with `ModuleNotFoundError: No module named 'scripts.verify_lock'`.

- [ ] **Step 3: Implement `scripts/verify-lock.py` (and importable `scripts/verify_lock.py`)**

Implement:
1. `compute_normalized_hash(content: bytes) -> str`: Normalizes line endings (`b"\r\n"` -> `b"\n"`) and returns SHA-256 hex digest.
2. `verify_skills_lock(lock_file: Path, skills_dir: Path) -> tuple[bool, list[str]]`: Validates JSON schema, verifies each registered skill exists, and compares normalized hash against `computedHash`.
3. CLI argument parsing with `--lock-file`, `--skills-dir`, and `--quiet` flags.

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m unittest tests/test_verify_lock.py`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/verify* tests/test_verify_lock.py
git commit -m "feat: add cryptographic skills lockfile verification tool"
```

---

### Task 3: Preset Bundles & Multi-Skill Injection in `install-to-project.py`

**Files:**
- Modify: `scripts/install-to-project.py`
- Test: `tests/test_install_to_project.py`

**Interfaces:**
- Consumes: `PRESET_BUNDLES` dict mapping bundle names to lists of scoped skill commands.
- Produces: CLI `--bundle <name>` argument enabling 1-command installation of curated toolsets.

- [ ] **Step 1: Write the failing unit tests for preset bundles**

Create `tests/test_install_to_project.py` testing:
1. `PRESET_BUNDLES` contains standard bundles: `superpowers`, `gstack`, `mattpocock`, `docs`, `core-eng`.
2. Resolving bundle `superpowers` yields all 15 authentic Superpowers skills without cross-creator collision.
3. Dry-run installation with `--bundle` resolves all target paths correctly.

```python
import unittest
from scripts.install_to_project import PRESET_BUNDLES, resolve_bundle_skills

class TestInstallPresetBundles(unittest.TestCase):
    def test_bundles_defined(self):
        expected_bundles = ["superpowers", "gstack", "mattpocock", "docs", "core-eng"]
        for b in expected_bundles:
            self.assertIn(b, PRESET_BUNDLES)

    def test_superpowers_bundle_resolution(self):
        skills = resolve_bundle_skills("superpowers")
        self.assertGreaterEqual(len(skills), 12)
        names = [s["name"] for s in skills]
        self.assertIn("writing-plans", names)
        self.assertIn("brainstorming", names)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m unittest tests/test_install_to_project.py`
Expected: FAIL with `ImportError: cannot import name 'PRESET_BUNDLES'`.

- [ ] **Step 3: Implement bundle resolution in `scripts/install-to-project.py`**

1. Define `PRESET_BUNDLES` mapping:
   - `superpowers`: All 15 obra/superpowers skills.
   - `gstack`: All 16 Garry Tan YC review and shipping skills.
   - `mattpocock`: All 16 Matt Pocock skills.
   - `docs`: Layer 15 documentation skills.
   - `core-eng`: TDD, systematic debugging, pre-commit, code review.
2. Add `--bundle` argument to `argparse`.
3. Support `--list-bundles` to display available preset bundles and their constituent skills.

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m unittest tests/test_install_to_project.py`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/install-to-project.py tests/test_install_to_project.py
git commit -m "feat: add curated preset bundles to project installer CLI"
```

---

### Task 4: Interactive Preset Filters & Slash Command Search in Web Dashboard

**Files:**
- Modify: `index.html`
- Test: `tests/test_web_dashboard.py`

**Interfaces:**
- Consumes: Preset definitions and slash command prefixes.
- Produces: Instant filter buttons on the web UI and slash command copy buttons.

- [ ] **Step 1: Write the failing test for web dashboard features**

Create `tests/test_web_dashboard.py` verifying that `index.html`:
1. Contains preset filter buttons for `Superpowers`, `gstack`, `Matt Pocock`, and `Layer 15 Docs`.
2. Contains JavaScript logic matching slash commands with or without leading `/`.
3. Displays total skill count dynamically or in badge.

```python
import unittest
from pathlib import Path

class TestWebDashboard(unittest.TestCase):
    def setUp(self):
        repo_root = Path(__file__).resolve().parent.parent
        self.html_file = repo_root / "index.html"
        self.content = self.html_file.read_text(encoding="utf-8")

    def test_preset_filter_buttons_exist(self):
        self.assertIn('data-preset="superpowers"', self.content)
        self.assertIn('data-preset="gstack"', self.content)
        self.assertIn('data-preset="docs"', self.content)

    def test_slash_command_filter_support(self):
        self.assertIn('filterBySlashCommand', self.content)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m unittest tests/test_web_dashboard.py`
Expected: FAIL with assertion error on missing preset buttons.

- [ ] **Step 3: Update `index.html` with preset filters and slash search**

1. Add preset pill buttons: `[All]`, `[⚡ Superpowers]`, `[🏛️ gstack]`, `[🧠 Matt Pocock]`, `[📑 Docs & Specs]`, `[📱 Android/KMP]`.
2. Add JavaScript function `filterByPreset(presetName)` and `filterBySlashCommand(query)`.
3. Update stats banner with 226 skills and 87 active workspace skills.

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m unittest tests/test_web_dashboard.py`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add index.html tests/test_web_dashboard.py
git commit -m "feat: add preset bundle filters and slash search to web dashboard"
```

---

### Task 5: Full Verification Gate & Master Matrix Parity Sync

**Files:**
- Modify: `AI-Coding-Skills-and-Tools-Matrix.md`
- Modify: `AI-Coding-Skills-and-Tools-Matrix.csv`
- Modify: `docs/IMPLEMENTATION-STATUS.md`

**Interfaces:**
- Consumes: Results of Tasks 1-4.
- Produces: Clean pass across all test suites, dual-matrix parity, and git push.

- [ ] **Step 1: Run complete test suite**

Run: `python -m unittest discover tests "test_*.py" -v`
Expected: All tests PASS.

- [ ] **Step 2: Run skills quality audit**

Run: `python scripts/test-skills.py`
Expected: 0 errors.

- [ ] **Step 3: Run lockfile verification**

Run: `python scripts/verify-lock.py`
Expected: `[OK] All 87 skills in skills-lock.json verified cryptographically.`

- [ ] **Step 4: Verify and sync dual matrix parity**

Run: `python scripts/sync-matrix.py`
Expected: `[OK] Dual-format matrix parity is maintained!`

- [ ] **Step 5: Update documentation status and commit**

Update `docs/IMPLEMENTATION-STATUS.md` with verified evidence of all 4 tasks and push to GitHub origin main:
```bash
git add docs/IMPLEMENTATION-STATUS.md AI-Coding-Skills-and-Tools-Matrix.*
git commit -m "chore: complete roadmap and catalog evolution milestones with full test suite"
git push origin main
```

