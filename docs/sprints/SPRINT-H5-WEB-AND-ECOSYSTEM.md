# SPRINT-H5-WEB-AND-ECOSYSTEM.md — Sprint Tracking & Execution Checklist

> **Sprint Horizon:** Milestone H5: Web Dashboard & Ecosystem Experience Overhaul  
> **Methodology:** Inline Execution Protocol (`/executing-plans`)  
> **Source Audit:** [`docs/reports/AUDIT-AND-ENG-REVIEW.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/reports/AUDIT-AND-ENG-REVIEW.md)  
> **Target Deploy:** `index.html` (GitHub Pages: `https://nownitya.github.io/Ai-Models-List/`)  
> **Date:** 2026-11-09  

---

## 📊 Sprint Overview & Velocity Tracker

```
SPRINT STATUS DASHBOARD:
┌──────────────┬──────────────────────────────────────────┬───────────┬──────────────┐
│ Wave         │ Focus Area                               │ Points    │ Status       │
├──────────────┼──────────────────────────────────────────┼───────────┼──────────────┤
│ Sprint 5.1   │ Core Data, Filter & Scoped Command Parity│ 8 pts     │ [x] DONE     │
│ Sprint 5.2   │ UI/UX, Performance, Search & a11y        │ 13 pts    │ [x] DONE     │
│ Sprint 5.3   │ Developer Ergonomics & Stack Builder     │ 8 pts     │ [x] DONE     │
├──────────────┼──────────────────────────────────────────┼───────────┼──────────────┤
│ TOTAL        │ 12 Architectural Remediation Tasks       │ 29 pts    │ COMPLETED    │
└──────────────┴──────────────────────────────────────────┴───────────┴──────────────┘
```

---

## 🏃 Sprint 5.1: Core Data, Filtering & Scoped Command Parity

*Focus: Eliminating architectural bugs, synchronizing CLI scoped commands, and harmonizing categorization.*

- [x] **TASK-023.1: Fix Ecosystem Filter Mapping (`ecosystemCategoryMap`)** `[3 pts]`
  - **Flaw Addressed:** Flaw #1 (Ecosystem preset bug).
  - **Contract:** Clicking "☁️ Cloud & Backend" must display all cloud technologies (`cloudflare`, `supabase`, `neon`, `firebase`, `azure`, `prisma`, `better-auth`, `clerk`, `convex`, `fastify`).
  - **Verification:** Assert active count $\ge 10$ and all cloud cards match when `data-ecosystem="cloud"` is selected.
  - **Status:** `[x] DONE`

- [x] **TASK-023.2: Synchronize CLI Scoped Commands (`PREFIX_MAP`) on Web Cards** `[2 pts]`
  - **Flaw Addressed:** Flaw #2 (Slash command desynchronization with CLI).
  - **Contract:** Card pill and copy actions must output the canonical scoped command (e.g. `/mp-code-review`, `/gstack-review`, `/core-code-review`, `/workflow-firebase-agent-suite`) matching `scripts/install_to_project.py`.
  - **Verification:** Copied command must be directly accepted by `python scripts/install-to-project.py --skill <cmd>` with 0 ambiguity prompts.
  - **Status:** `[x] DONE`

- [x] **TASK-023.3: Automated Telemetry Resolution with Fallback** `[2 pts]`
  - **Flaw Addressed:** Flaw #3 (Brittle hardcoded `nameKeyMap`).
  - **Contract:** `resolveMetric()` must perform direct normalized lookup and fuzzy key matching, falling back smoothly without silent dropouts.
  - **Verification:** 100% of the 104 tracked upstream repositories resolve their live GitHub stars, release tags, and license badges.
  - **Status:** `[x] DONE`

- [x] **TASK-023.4: Category Button Taxonomy Alignment** `[1 pt]`
  - **Flaw Addressed:** Flaw #11 (Category button divergence).
  - **Contract:** Category filter bar displays clear, canonical domain categories with proper tooltips.
  - **Verification:** Every category filter maps 1:1 to cataloged skills.
  - **Status:** `[x] DONE`

---

## ⚡ Sprint 5.2: UI/UX, Performance, Search & a11y Overhaul

*Focus: Transforming search responsiveness, eliminating DOM bloat, and meeting WCAG 2.1 AA accessibility standards.*

- [x] **TASK-024.1: Debounced Multi-Token Search Engine** `[3 pts]`
  - **Flaw Addressed:** Flaw #5 (Synchronous exact-match search).
  - **Contract:** Input listener wrapped in 150ms debounce; search splits query into words (`q.split(/\s+/)`) and matches all tokens across `name`, `why`, `category`, `scopedCmd`, and `author/repo`.
  - **Verification:** Searching `agent test` returns agent testing skills; typing does not drop frames.
  - **Status:** `[x] DONE`

- [x] **TASK-024.2: Batch Rendering & Lazy Pagination to Eliminate DOM Bloat** `[3 pts]`
  - **Flaw Addressed:** Flaw #4 (Unbounded 6,500+ DOM element rendering).
  - **Contract:** Initial render displays 36 cards using `DocumentFragment`. A modern "Load More" / auto-scroll trigger appends subsequent 24-card slices.
  - **Verification:** Page load and filter render time $< 30\text{ms}$; DOM node count reduced by $>70\%$ on initial load.
  - **Status:** `[x] DONE`

- [x] **TASK-024.3: Full WCAG 2.1 AA Accessibility & Keyboard Trapping** `[3 pts]`
  - **Flaw Addressed:** Flaw #6 (Semantic elements, ARIA dialogs, focus trapping).
  - **Contract:** Card titles converted to semantic interactive elements; modals have `role="dialog"`, `aria-modal="true"`, and focus trapping; `/` shortcut ignores active form controls.
  - **Verification:** Keyboard navigation (`Tab`, `Enter`, `Escape`) fully navigates and operates all modals without focus leaks.
  - **Status:** `[x] DONE`

- [x] **TASK-024.4: Deterministic Multi-Key Sorting Engine** `[2 pts]`
  - **Flaw Addressed:** Flaw #7 (Fragile date comparison and arbitrary default order).
  - **Contract:** Sorting applies Primary Sort $\rightarrow$ Secondary (Priority P0 $\rightarrow$ P3) $\rightarrow$ Tertiary (Name A-Z).
  - **Verification:** Stable, non-jumping card order across all browser engines.
  - **Status:** `[x] DONE`

- [x] **TASK-024.5: Mobile Layout & Bento Real Estate Optimization** `[2 pts]`
  - **Flaw Addressed:** Flaw #10 (Mobile Bento 620px space cannibalization).
  - **Contract:** On screens $\le 640\text{px}$, Bento hero renders as a compact $2\times 2$ grid; modals have `max-height: 85vh` with internal scrollbar.
  - **Verification:** Interactive search bar appears above the fold on mobile viewports.
  - **Status:** `[x] DONE`

---

## 🛠️ Sprint 5.3: Developer Ergonomics, Stack Builder & Verification

*Focus: Turning the web catalog into an actionable developer launchpad.*

- [x] **TASK-025.1: Copyable CLI Installation Command on Cards & Inspector** `[3 pts]`
  - **Flaw Addressed:** Flaw #9 (Missing CLI installation command).
  - **Contract:** Cards and inspection modal feature a 1-click **"Copy Install CLI"** action generating:
    `python scripts/install-to-project.py --skill <scoped-name>`
  - **Verification:** One-click copy with tactile toast feedback; command tested in terminal.
  - **Status:** `[x] DONE`

- [x] **TASK-025.2: Interactive Priority Taxonomy Guide & Modal** `[2 pts]`
  - **Flaw Addressed:** Flaw #8 (Opaque priority taxonomy).
  - **Contract:** Clicking priority pill or info icon opens Priority Guide modal detailing P0 (Essential), P1 (High), P2 (Medium), P3 (Optional) contracts.
  - **Verification:** Modal opens cleanly from any card pill with full keyboard accessibility.
  - **Status:** `[x] DONE`

- [x] **TASK-025.3: "My Agent Stack" Basket & Custom Bundle Generator** `[3 pts]`
  - **Flaw Addressed:** Flaw #12 (Lack of multi-skill stack builder).
  - **Contract:** Floating stack basket allows users to pin skills, view selection counter, and 1-click copy combined CLI install command or export JSON.
  - **Verification:** Selecting 3 skills and clicking "Copy Stack Command" produces valid multi-skill CLI string.
  - **Status:** `[x] DONE`

---

## 🧪 Sprint Verification & Sign-Off Criteria

Before closing Sprint H5, all changes must pass:
1. `python scripts/sync-matrix.py` (Law 1 Parity Gate).
2. `python scripts/test-skills.py` (Law 2 Quality & Links Gate).
3. `python scripts/verify-lock.py` (Cryptographic Lockfile Gate).
4. `python -m unittest discover tests` (Unit test suite including `test_web_dashboard.py`).
5. `python scripts/sync-obsidian.py` (Obsidian Vault Parity Gate).

