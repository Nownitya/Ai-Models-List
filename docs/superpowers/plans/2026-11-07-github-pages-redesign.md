# GitHub Pages Interactive Catalog Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the GitHub Pages interactive catalog (`index.html`) into an elite, developer-first, Linear/Bento-style web application adhering to `ui-taste` and `ui-ux-pro-max` principles, with high information density, live upstream telemetry, and tactile ergonomics.

**Architecture:** Redesigns `index.html` across four distinct UI layers:
1. **Design Tokens & Theme**: Professional dark-mode design system with radial gradients, glassmorphism, glowing accents, and monospaced telemetry.
2. **Hero Telemetry & Upstream Radar Strip**: Bento-style live stats (226 Skills, 30 Upstream Repos, 1.8M+ Stars, 100% Parity) and horizontal radar strip showcasing top upstream frameworks (`mattpocock/skills`, `obra/superpowers`, `affaan-m/ecc`, etc.).
3. **Ecosystem Preset Navigator**: 1-click curated filter pills (`⚡ Superpowers`, `🏛️ gstack`, `🧠 Matt Pocock`, `🚀 GSD Core`, `📑 Layer 15 Docs`, `🤖 Agents`, `📱 Android/KMP`).
4. **Card Component & Tactical Ergonomics**: High-density cards featuring category badges, 1-click slash command copy, live star counters, version pills, and prompt snippet modals.

**Tech Stack:** HTML5, CSS3 (CSS Variables, Flexbox/Grid, Backdrop Filter, SVG Icons), Vanilla JavaScript (ES6+, Fetch API, Clipboard API).

**Spec:** [`docs/product/PRD.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/product/PRD.md) and [`docs/architecture/ARCHITECTURE.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/architecture/ARCHITECTURE.md)

## Global Constraints

- **Single-File Zero-Dependency Architecture**: `index.html` must remain a standalone, self-contained file with embedded CSS and JS (zero build steps, zero external npm dependencies, runs directly on GitHub Pages).
- **Anti-UI-Slop Principles**: No unnecessary white space, no low-contrast text (strict WCAG AAA contrast on dark backgrounds), zero decorative emoji chrome where SVG vector icons fit, strictly monospaced digits.
- **Offline / Local Fallback**: When opened via `file://` or offline, it must render smoothly using inline fallback data without unhandled exceptions.
- **Test-Driven Verification**: Every feature must have unit test assertions in `tests/test_web_metrics.py` and `tests/test_web_redesign.py`.
- **Dual Matrix Parity**: Must preserve 100% parity with `AI-Coding-Skills-and-Tools-Matrix.md` and `.csv`.

## Review Focus

1. **Information Density vs Clutter**: Cards must balance rich telemetry (Stars, Version, Category, Priority, Slash Command) with clean whitespace and scannable visual hierarchy.
2. **Search Keyboard Navigation**: Hitting `/` anywhere on the page must focus the search input, and `Escape` must clear search or dismiss open modals.
3. **Mobile Viewport Ergonomics**: On mobile devices (<640px), the Bento grid must gracefully stack into 1 column with touch hitboxes >=44px.
4. **Copy Feedback Tactility**: 1-click `/cmd` copy must provide instant visual feedback (toast notification + temporary button state change <150ms).
5. **Dynamic Star Sorting Accuracy**: Sorting by "Most Starred ⭐" must properly parse numeric star counts and float the top frameworks to the top.

---

## Tasks

### Task 1: Bento Design System & CSS Tokens Architecture

**Files:**
- Modify: `index.html`
- Test: `tests/test_web_redesign.py`

**Interfaces:**
- Consumes: CSS custom properties (`--bg`, `--card-bg`, `--accent`, `--gold`, `--cyan`, `--emerald`, `--font-mono`).
- Produces: Polished dark Linear/Bento theme with glowing borders and glassmorphism.

- [x] **Step 1: Write failing test for redesign tokens and structure**

Create `tests/test_web_redesign.py` asserting:
1. `index.html` contains the new Bento hero layout elements (`bento-grid`, `hero-stat-card`).
2. `index.html` contains ecosystem preset buttons (`data-ecosystem`).
3. `index.html` contains the Live Radar Spotlight strip (`radar-strip`).

- [x] **Step 2: Run test to verify it fails**

Run: `python -m unittest tests/test_web_redesign.py`
Expected: FAIL with missing elements.

- [x] **Step 3: Implement Design Tokens & Bento Layout CSS in `index.html`**

Update the `<style>` block in `index.html`:
1. Add modern CSS variables: `--bg-gradient`, `--card-glow`, `--border-subtle`, `--accent-cyan`, `--accent-gold`, `--accent-emerald`, `--font-mono`.
2. Implement Bento grid layout for hero telemetry.
3. Implement glassmorphism modal styles and responsive breakpoints.

- [x] **Step 4: Run test to verify step completion**

Run: `python -m unittest tests/test_web_redesign.py`

---

### Task 2: Live Radar Strip & Hero Telemetry Integration

**Files:**
- Modify: `index.html`
- Test: `tests/test_web_redesign.py`

**Interfaces:**
- Consumes: `data/github-metrics.json` repository statistics.
- Produces: Live stats banner (226 Skills, 30 Repos, 1.8M+ Stars, 100% Parity) and horizontal trending radar spotlight.

- [x] **Step 1: Implement Hero Bento Cards & Radar Strip Markup**

Add HTML markup in `index.html`:
1. Live Pulse Header Badge: `● Live Upstream Radar: 30 Repositories, 1.8M+ Stars`.
2. 4 Bento Telemetry Cards:
   - Total Skills: `226`
   - Upstream Frameworks: `30`
   - Total Community Stars: `1.8M+`
   - Parity & Quality Gates: `100%`
3. Horizontal Radar Spotlight Strip rendering the top 5 starred repositories (`mattpocock/skills`, `obra/superpowers`, `affaan-m/ecc`, `ponytail`, `graphify`).

- [x] **Step 2: Verify test pass**

Run: `python -m unittest tests/test_web_redesign.py`

---

### Task 3: Ecosystem Preset Navigator & Search Toolbar

**Files:**
- Modify: `index.html`
- Test: `tests/test_web_redesign.py`

**Interfaces:**
- Consumes: User click on ecosystem tabs or typing in search.
- Produces: Instant filtering by ecosystem preset without manual keyword typing.

- [x] **Step 1: Implement Ecosystem Tab Bar & JavaScript Filters**

Add ecosystem preset buttons:
- `[All Ecosystems]`
- `[⚡ Superpowers]` (`08-superpowers`)
- `[🏛️ gstack]` (`07-gstack`)
- `[🧠 Matt Pocock]` (`02-matt-pocock`)
- `[🚀 GSD Core]` (`06-gsd`)
- `[🤖 Agents]` (`09-autonomous-agents`)
- `[📑 Layer 15 Docs]` (`docs`)
- `[📱 Android & KMP]` (`03-android`, `04-kotlin-kmp`)

Add JS function `filterByEcosystem(ecosystemKey)` integrating with priority and search text.

- [x] **Step 2: Verify test pass**

Run: `python -m unittest tests/test_web_redesign.py`

---

### Task 4: High-Density Card Component & Interactive Modal Refactoring

**Files:**
- Modify: `index.html`
- Test: `tests/test_web_metrics.py` and `tests/test_web_redesign.py`

**Interfaces:**
- Consumes: Filtered skills with live metrics.
- Produces: Sleek cards with 1-click `/cmd` copy, star counter, version tags, and prompt injection modals.

- [x] **Step 1: Refactor `render()` Card Generation**

Update card HTML:
1. Header: Category badge + Monospaced `/cmd` button (with SVG copy icon) + Priority Pill.
2. Body: Bold Skill Title + Clear descriptive why.
3. Telemetry Footer: Luminous Star Pill (`⭐ 317k`), Release Tag Pill (`🏷️ v1.3.2`), and Last Active date.
4. Actions: "Prompt Snippet" (opens modal), "Copy /Cmd" (1-click copy with toast), "Source Folder" (direct GitHub link).

- [x] **Step 2: Run all web tests to verify pass**

Run: `python -m unittest tests/test_web_*.py`
Expected: ALL PASS.

---

### Task 5: End-to-End Verification, Parity Check & Git Push

**Files:**
- Modify: `docs/IMPLEMENTATION-STATUS.md`
- Test: Full unit test suite (`python -m unittest discover tests "test_*.py" -v`).

- [x] **Step 1: Run comprehensive test discovery**

Run: `python -m unittest discover tests "test_*.py" -v`
Expected: ALL TESTS PASS.

- [x] **Step 2: Run skills audit and matrix parity**

Run: `python scripts/test-skills.py`
Run: `python scripts/sync-matrix.py`
Expected: 0 errors, Dual parity maintained.

- [x] **Step 3: Update documentation status and commit**

Update `docs/IMPLEMENTATION-STATUS.md` and push to GitHub origin main:
```bash
git add index.html tests/ docs/
git commit -m "feat(ui): complete GitHub Pages redesign with Bento layout, radar strip, and ecosystem navigator"
git push origin main
```
