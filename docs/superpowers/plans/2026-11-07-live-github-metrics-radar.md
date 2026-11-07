# Live GitHub Metrics Radar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement automated, 100% free live tracking of GitHub Stars, release versions, last commit activity, and license metadata for all upstream skill repositories across Markdown tables, CSV exports, and the interactive web viewer.

**Architecture:** A decoupled, four-tier pipeline:
1. `scripts/sync-github-metrics.py` parses all upstream GitHub repository URLs from `AI-Coding-Skills-and-Tools-Matrix.md`, fetches live metadata from GitHub REST API with multi-tier token resolution and cache fallback, and writes `data/github-metrics.json`.
2. Dual Matrix parity integration: automatically generates/updates the Live Upstream Skills Radar section in `AI-Coding-Skills-and-Tools-Matrix.md` and `.csv` in strict compliance with Law 1.
3. Automated GitHub Actions workflow (`.github/workflows/sync-metrics.yml`) executing daily via free cron + `workflow_dispatch` with zero cost.
4. Interactive Web Dashboard (`index.html`) dynamically enriching skill cards with star badges, version tags, and "Sort by Stars" / "Sort by Activity" dropdown controls.

**Tech Stack:** Python 3 (Standard Library: `urllib.request`, `json`, `re`, `argparse`, `unittest`, `pathlib`), GitHub Actions CI/CD (free tier), HTML5/CSS3/Vanilla JS (GitHub Pages).

**Spec:** [`docs/product/PRD.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/product/PRD.md) and [`docs/architecture/ARCHITECTURE.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/architecture/ARCHITECTURE.md)

## Global Constraints

- **Zero Cost & Zero Subscriptions**: Must use exclusively free tools: GitHub Actions public quota, GitHub API `GITHUB_TOKEN`, Shields.io, and Python standard library.
- **Law 1: Dual Matrix Parity**: Any changes to markdown tables must be mirrored in `.csv` format; verified by `python scripts/sync-matrix.py`.
- **Law 2: Standardized Skill Structure**: All tests pass `python scripts/test-skills.py` with 0 errors.
- **Offline / Rate-Limit Resilience**: The script must never crash on network outage or API rate limiting; it must fall back gracefully to `data/github-metrics.json` cache.
- **Token Resolution Hierarchy**: (1) `GITHUB_TOKEN` / `GH_TOKEN` env var -> (2) `git credential fill` -> (3) Unauthenticated public API -> (4) Local cached metrics.

## Review Focus

1. **GitHub API Rate-Limit Handling**: Unauthenticated calls allow 60 requests/hour; when running locally without a token or if 403 Forbidden is returned, the script must gracefully preserve cached data rather than aborting.
2. **Case Normalization of Repository Slugs**: `AvdLee/SwiftUI-Agent-Skill` vs `avdlee/swiftui-agent-skill` must map to a single normalized canonical key.
3. **Dual Matrix Parity Invariant**: When generating Markdown table columns (Repo, Stars, Version, License, Last Updated), CSV columns must match row-for-row.
4. **Skip-CI Triggering in GitHub Actions**: Automated metric update commits by GitHub Actions must include `[skip ci]` in the commit message to prevent recursive infinite CI trigger loops.
5. **Fast Local Web Fallback**: If `index.html` is opened directly via `file://` where fetch of `data/github-metrics.json` is blocked by browser CORS, it must fall back gracefully to inline matrix data without UI breakage.

---

## Tasks

### Task 1: Upstream Repository Parser & Live Metrics Collector Script (`scripts/sync-github-metrics.py`)

**Files:**
- Create: `scripts/sync-github-metrics.py`
- Create: `data/github-metrics.json`
- Test: `tests/test_sync_github_metrics.py`

**Interfaces:**
- Consumes: GitHub URLs extracted from `AI-Coding-Skills-and-Tools-Matrix.md`.
- Produces: `data/github-metrics.json` mapping `owner/repo` to `{stars, forks, version, last_updated, license, url}`.

- [ ] **Step 1: Write the failing unit tests for metric extraction and normalization**

Create `tests/test_sync_github_metrics.py` verifying:
1. `extract_github_repos(markdown_text)` extracts all distinct valid GitHub repository slugs.
2. `normalize_repo_key(slug)` handles case normalization properly.
3. `format_star_count(count)` formats numbers nicely (e.g. `298982` -> `298.9k`).
4. Mocked API response correctly builds the metric data structure.

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m unittest tests/test_sync_github_metrics.py`
Expected: FAIL with `ModuleNotFoundError: No module named 'scripts.sync_github_metrics'`.

- [ ] **Step 3: Implement `scripts/sync-github-metrics.py`**

Implement:
1. Multi-tier GitHub token resolution (`os.environ`, `git credential fill`, anonymous).
2. URL extraction regex parsing `https://github.com/<owner>/<repo>`.
3. Parallel / sequential batch querying of GitHub REST API `/repos/{owner}/{repo}` and `/repos/{owner}/{repo}/tags` with retry and timeout.
4. Cache saving to `data/github-metrics.json`.
5. CLI arguments: `--dry-run`, `--limit`, `--output`, `--update-matrices`.

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m unittest tests/test_sync_github_metrics.py`
Expected: PASS.

- [ ] **Step 5: Run live metric collection and verify generated `data/github-metrics.json`**

Run: `python scripts/sync-github-metrics.py`
Expected: Clean collection of metrics for all 31 upstream repositories saved to `data/github-metrics.json`.

- [ ] **Step 6: Commit**

```bash
git add scripts/sync-github-metrics.py data/github-metrics.json tests/test_sync_github_metrics.py
git commit -m "feat: add upstream GitHub metrics collection engine and test suite"
```

---

### Task 2: Live Upstream Skills Radar Matrix Integration (Dual Matrix Parity)

**Files:**
- Modify: `AI-Coding-Skills-and-Tools-Matrix.md`
- Modify: `AI-Coding-Skills-and-Tools-Matrix.csv`
- Modify: `scripts/sync-github-metrics.py` (add `--update-matrices` logic)
- Test: `tests/test_matrix_parity.py`

**Interfaces:**
- Consumes: `data/github-metrics.json`.
- Produces: Enriched Section in `AI-Coding-Skills-and-Tools-Matrix.md` and `.csv` ranking skills by star count, release version, and last updated date.

- [ ] **Step 1: Write the failing parity verification test**

Create `tests/test_matrix_parity.py` asserting:
1. `python scripts/sync-matrix.py` returns exit code 0.
2. The Radar table in Markdown and CSV contains identical repository count and columns.

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m unittest tests/test_matrix_parity.py`
Expected: Run parity check and observe behavior.

- [ ] **Step 3: Implement table generation in `scripts/sync-github-metrics.py`**

Add `--update-matrices` command to:
1. Sort all upstream repositories descending by star count.
2. Generate GitHub Flavored Markdown table with columns: `Rank | Repository | Stars | Version | License | Last Updated | Category`.
3. Generate exact matching CSV rows.
4. Insert or update the dedicated "Live Upstream Radar" section in both `.md` and `.csv`.

- [ ] **Step 4: Run generator and verify dual matrix parity**

Run: `python scripts/sync-github-metrics.py --update-matrices`
Run: `python scripts/sync-matrix.py`
Expected: `[OK] Dual-format matrix parity is maintained!`

- [ ] **Step 5: Commit**

```bash
git add AI-Coding-Skills-and-Tools-Matrix.* scripts/sync-github-metrics.py tests/test_matrix_parity.py
git commit -m "feat: integrate live upstream skills radar into dual matrix workbooks"
```

---

### Task 3: Automated Daily GitHub Actions Workflow (`.github/workflows/sync-metrics.yml`)

**Files:**
- Create: `.github/workflows/sync-metrics.yml`
- Test: Manual workflow test simulation via local script run.

**Interfaces:**
- Consumes: Scheduled cron (`0 0 * * *`) and `workflow_dispatch`.
- Produces: Daily automated commit to `origin/main` whenever star counts or versions update.

- [ ] **Step 1: Create `.github/workflows/sync-metrics.yml`**

Workflow specification:
- Name: `Sync Upstream Metrics`
- On: `schedule: - cron: '0 0 * * *'`, `workflow_dispatch`, `push: paths: ['AI-Coding-Skills-and-Tools-Matrix.md']`
- Steps:
  1. Checkout repository with `fetch-depth: 0`.
  2. Setup Python 3.12/3.13.
  3. Run `python scripts/sync-github-metrics.py --update-matrices` with `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}`.
  4. Run `python scripts/sync-matrix.py` validation gate.
  5. Commit and push if diff exists, using `[skip ci]` in commit message.

- [ ] **Step 2: Validate workflow YAML syntax**

Check YAML syntax and steps to ensure no deprecated action versions or unbound tokens.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/sync-metrics.yml
git commit -m "ci: add automated daily GitHub Actions workflow for upstream metrics sync"
```

---

### Task 4: Interactive Web Dashboard Star Sorting & Version Badges (`index.html`)

**Files:**
- Modify: `index.html`
- Test: `tests/test_web_metrics.py`

**Interfaces:**
- Consumes: `data/github-metrics.json`.
- Produces: Live star counters (`⭐ 298k`), version pills (`v7.0.2`), and "Sort by Stars" dropdown in web viewer.

- [ ] **Step 1: Write test for web dashboard metrics integration**

Create `tests/test_web_metrics.py` asserting:
1. `index.html` contains sort option for "Stars (High to Low)".
2. `index.html` contains code loading `data/github-metrics.json`.
3. Metric pills are styled and display correctly on cards.

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m unittest tests/test_web_metrics.py`
Expected: FAIL with missing elements.

- [ ] **Step 3: Update `index.html`**

Implement:
1. Fetch `data/github-metrics.json` at page initialization.
2. Add Sort dropdown with options: "Default", "Most Starred ⭐", "Recently Updated 🕒", "Alphabetical".
3. Render star badge (`⭐ 313k`) and version pill (`v7.0.2`) on corresponding cards matching upstream repos.
4. Add Shields.io badge fallback for offline or direct view.

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m unittest tests/test_web_metrics.py`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add index.html tests/test_web_metrics.py
git commit -m "feat: add live star counters, version pills, and star sorting to web viewer"
```

---

### Task 5: End-to-End Test Suite, Parity Verification & Git Push

**Files:**
- Modify: `docs/IMPLEMENTATION-STATUS.md`
- Test: All test suites.

**Interfaces:**
- Consumes: All completed tasks.
- Produces: 100% test pass, clean git tree, and remote sync.

- [ ] **Step 1: Run comprehensive test discovery**

Run: `python -m unittest discover tests "test_*.py" -v`
Expected: ALL TESTS PASS.

- [ ] **Step 2: Run skills audit**

Run: `python scripts/test-skills.py`
Expected: 0 errors.

- [ ] **Step 3: Verify dual matrix parity**

Run: `python scripts/sync-matrix.py`
Expected: `[OK] Dual-format matrix parity is maintained!`

- [ ] **Step 4: Update `docs/IMPLEMENTATION-STATUS.md` and push to GitHub**

Record live metrics radar deliverable in `docs/IMPLEMENTATION-STATUS.md` and push to `origin/main`.
```bash
git add docs/IMPLEMENTATION-STATUS.md
git commit -m "docs: update implementation status with live GitHub metrics radar deliverable"
git push origin main
```

