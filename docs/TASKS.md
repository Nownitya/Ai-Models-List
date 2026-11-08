# TASKS.md — Engineering Task Ledger (`Ai-Models-List`)

> **Atomic Engineering Task Decomposition & Verification Ledger**  
> **Status:** Active / Living Document  
> **Standard:** Layer 15 Universal Project Documentation  
> **Target Project:** `Ai-Models-List`

---

## 1. Task Ledger Summary

| Task ID | Epic / Area | Description | Priority | Status | Verification Gate |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **TASK-001** | Core Parity | Dual Matrix (.md & .csv) synchronization script | P0 | Verified | `python scripts/sync-matrix.py` |
| **TASK-002** | Skills Quality | Law 2 schema auditor & link validator | P0 | Verified | `python scripts/test-skills.py` |
| **TASK-003** | Web Dashboard | Bento redesign & interactive GitHub metrics | P0 | Verified | `tests/test_web_redesign.py` |
| **TASK-004** | Telemetry | Upstream GitHub star & release sync pipeline | P0 | Verified | `tests/test_sync_github_metrics.py` |
| **TASK-005** | Docs Layer 15 | Canonical living specifications synthesis | P0 | Verified | `tests/test_docs_integrity.py` |
| **TASK-006** | Cryptography | Lockfile verification CLI (`verify-lock.py`) | P0 | Verified | `tests/test_verify_lock.py` |
| **TASK-007** | Installer | Preset bundles (`--bundle`) injection support | P0 | Verified | `tests/test_install_to_project.py` |
| **TASK-008** | Web Search | Preset filter & slash command interactive search | P1 | Verified | `tests/test_web_dashboard.py` |
| **TASK-009** | MCP Server | Zero-dependency Model Context Protocol JSON-RPC server | P0 | Verified | `tests/test_mcp_server.py` |
| **TASK-010** | CI Gates | Full test-suite, lockfile & parity CI validation | P0 | Verified | `.github/workflows/ci.yml` |
| **TASK-011** | Routing | Frontier model selection matrix (Claude 3.7, R1, o3-mini) | P1 | Verified | `docs/models/MODEL-ROUTING-MATRIX.md` |
| **TASK-012** | Catalog Expansion | Add meta/astryx, anthropics/skills, google/skills, cloudflare/security-audit-skill, billion-context | P0 | Verified | `scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync_github_metrics.py` |
| **TASK-013** | Catalog Expansion | Add addyosmani/agent-skills, tt-a1i/archify, Egonex-AI/Understand-Anything, juliusbrussee/caveman, ComposioHQ/awesome-claude-skills | P0 | Verified | `scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync_github_metrics.py` |
| **TASK-014** | Catalog Quality Pruning | Remove Adelo31/omniroute (0★), kytheros/strata (1★, stalled), and coderabbitai/antigravity-plugin (subsumed) | P0 | Verified | `scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync_github_metrics.py` |
| **TASK-015** | Catalog Expansion (Batch 1) | Add 11 Tier 1 high-star repos from skills.sh (browser-use, shadcn, orca, sentry, turborepo, vercel-ai, playwright, remotion, cloudflare, supabase, azure) | P0 | Verified | `scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync_github_metrics.py`, `tests` |
| **TASK-016** | Catalog Expansion (Batch 2) | Add 10 Tier 1 high-star repos from skills.sh (emilkowalski, kepano, vercel-labs/skills, vercel-labs/agent-skills, googleworkspace, greensock, trailofbits, expo, addyosmani, stripe) | P0 | Verified | `scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync_github_metrics.py`, `tests` |
| **TASK-017** | Catalog Expansion (Batch 3) | Add 10 Tier 1 high-star repos from skills.sh (heygen, coreyhaines, nutlope, herdr, wshobson, larksuite, jakubkrehel, google-labs-stitch, typesafe-ai, mcollina) | P0 | Verified | `scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync_github_metrics.py`, `tests` |
| **TASK-018** | Catalog Expansion (Batch 4) | Add 10 Tier 1 high-star repos from skills.sh (vercel-agent-browser, copilot, anatomy, brag, claude-video, agent-desktop, gamedev, browser-act, higgsfield, daymade) | P0 | Verified | `scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync_github_metrics.py`, `tests` |
| **TASK-019** | Catalog Expansion (Batch 5 - Complete Bucket 1) | Add final 5 Tier 1 high-star repos from skills.sh (make-interfaces-feel-better, tons-of-skills, benjitaylor, binance, motion-graphics) | P0 | Verified | `scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync_github_metrics.py`, `tests` |
| **TASK-020** | Catalog Expansion (Batch 6 - Bucket 2 High-Impact Tools) | Add 10 high-impact & unique developer tools from Bucket 2 with 2.2M+ installs (firecrawl, convex, scrapegraphai, momentic-ai, extract-design-system, better-auth, review-loop-skill, mastra-ai, design-doc-mermaid, nx-ai-agents-config) | P0 | Verified | `scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync_github_metrics.py`, `tests` |
| **TASK-021** | Catalog Expansion (Batch 7 - Bucket 2 Official Developer Platforms) | Add 9 official developer platforms and ecosystem tools from Bucket 2 (firebase, elevenlabs, solana-foundation, currents-playwright, svelte5, neon-postgres, clerk, prisma, stripe-link) | P0 | Verified | `scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync_github_metrics.py`, `tests` |
| **TASK-020** | Catalog Expansion (Batch 6 - Bucket 2 High-Impact Tools) | Add 10 high-impact & unique developer tools from Bucket 2 with 2.2M+ installs (firecrawl, convex, scrapegraphai, momentic-ai, extract-design-system, better-auth, review-loop-skill, mastra-ai, design-doc-mermaid, nx-ai-agents-config) | P0 | Verified | `scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync_github_metrics.py`, `tests` |
| **TASK-021** | Catalog Expansion (Batch 7 - Bucket 2 Official Developer Platforms) | Add 9 official developer platforms and ecosystem tools from Bucket 2 (firebase, elevenlabs, solana-foundation, currents-playwright, svelte5, neon-postgres, clerk, prisma, stripe-link) | P0 | Verified | `scripts/sync-matrix.py`, `scripts/test-skills.py`, `scripts/sync_github_metrics.py`, `tests` |

---

## 2. Active Epic Breakdown: Roadmap & Catalog Evolution

### Epic H3: Autonomous Agent Ecosystem & Extensibility
- [x] Subtask 9.1: Author unit test `tests/test_mcp_server.py`.
- [x] Subtask 9.2: Implement `scripts/mcp_server.py` & `scripts/mcp-server.py` with 5 tools & 2 resources.
- [x] Subtask 10.1: Expand `.github/workflows/ci.yml` to run full 33-test suite, lockfile verification, and MCP validation.
- [x] Subtask 11.1: Upgrade `docs/models/MODEL-ROUTING-MATRIX.md` with DeepSeek R1, o3-mini, and MCP config.

### TASK-005: Synthesize Canonical Layer 15 Documentation
- [x] Subtask 5.1: Write failing `tests/test_docs_integrity.py`.
- [x] Subtask 5.2: Create canonical `docs/PRD.md`.
- [x] Subtask 5.3: Create canonical `docs/ARCHITECTURE.md`.
- [x] Subtask 5.4: Create canonical `docs/ROADMAP.md`.
- [x] Subtask 5.5: Create canonical `docs/TASKS.md`.
- [x] Subtask 5.6: Create canonical `docs/BRD.md`.
- [x] Subtask 5.7: Create canonical `docs/TRD.md`.
- [x] Subtask 5.8: Create canonical `docs/testing/TEST-STRATEGY.md`.
- [x] Subtask 5.9: Create ADRs `0001-dual-matrix-parity.md` and `0002-law-4-skill-independence.md`.
- [x] Subtask 5.10: Run `tests/test_docs_integrity.py` to confirm 100% green pass.

### TASK-006: Cryptographic Lockfile Verification CLI
- [x] Subtask 6.1: Author unit test `tests/test_verify_lock.py` with CRLF/LF invariance.
- [x] Subtask 6.2: Implement `scripts/verify-lock.py` and `scripts/verify_lock.py`.
- [x] Subtask 6.3: Verify against live `skills-lock.json`.

### TASK-007: Preset Bundles in Project Installer CLI
- [x] Subtask 7.1: Author unit test `tests/test_install_to_project.py`.
- [x] Subtask 7.2: Implement `PRESET_BUNDLES` in `scripts/install-to-project.py`.
- [x] Subtask 7.3: Test dry-run multi-skill installation.

### TASK-008: Interactive Preset Filters on Web Dashboard
- [x] Subtask 8.1: Author unit test `tests/test_web_dashboard.py`.
- [x] Subtask 8.2: Implement preset buttons and slash command handler in `index.html`.
- [x] Subtask 8.3: Verify live dashboard rendering.

### TASK-012: Catalog Expansion & Live Telemetry Synchronization
- [x] Subtask 12.1: Audit requested repositories against existing catalog (confirmed `mattpocock/skills` already present at #1 rank; validated `meta/astryx` as an agent-ready design system fitting Section 05).
- [x] Subtask 12.2: Author 5 standardized Law 2 `SKILL.md` packages with YAML frontmatter, activation commands, prerequisites, capabilities, and anti-patterns.
- [x] Subtask 12.3: Update `AI-Coding-Skills-and-Tools-Matrix.md` and `.csv` enforcing Dual Matrix Parity (Law 1).
- [x] Subtask 12.4: Synchronize live GitHub metrics across 37 upstream repositories (2.8M+ total stars).
- [x] Subtask 12.5: Update `index.html` resolver mappings and bento telemetry fallbacks.
- [x] Subtask 12.6: Run complete test suite and verification gates.

### TASK-013: Production Workflow & Architecture Intelligence Expansion
- [x] Subtask 13.1: Audit candidate repositories (confirmed `pbakaus/impeccable` and `Graphify-Labs/graphify` already present; analyzed `addyosmani/agent-skills` vs Superpowers/Matt Pocock and preserved purity under Law 4).
- [x] Subtask 13.2: Author 5 standardized Law 2 `SKILL.md` packages (`addy-agent-skills`, `archify`, `understand-anything`, `caveman`, `composio-skills`).
- [x] Subtask 13.3: Maintain Dual Matrix Parity across Sections 01, 05, 09, 10, and 14 in `.md` and `.csv`.
- [x] Subtask 13.4: Synchronize live GitHub telemetry across 42 upstream repositories (3.3M+ combined community stars).
- [x] Subtask 13.5: Update `index.html` `nameKeyMap` bindings and bento metrics fallbacks.
- [x] Subtask 13.6: Execute full verification test suite.

### TASK-014: Catalog Quality Pruning & Consolidation
- [x] Subtask 14.1: Prune `Adelo31/omniroute` (0 stars, unvetted clone) and `kytheros/strata` (1 star, stalled beta superseded by MemPalace).
- [x] Subtask 14.2: Consolidate `coderabbitai/antigravity-plugin` (3 stars) into canonical `coderabbitai/skills` (212 stars).
- [x] Subtask 14.3: Remove pruned skill directories from `skills/10-ai-infrastructure/` (leaving 236 active skills).
- [x] Subtask 14.4: Enforce Dual Matrix Parity across `.md` and `.csv` editions (Law 1).
- [x] Subtask 14.5: Re-synchronize GitHub telemetry across 39 verified repositories (Law 1/Live Stats).
- [x] Subtask 14.6: Update web dashboard bento telemetry and pass full test suite.

### TASK-015: Catalog Expansion (Batch 1 High-Star Repositories)
- [x] Subtask 15.1: Create 11 standardized Law 2 `SKILL.md` packages (`browser-use`, `shadcn-ui`, `orca-agent`, `sentry-diagnostics`, `turborepo`, `vercel-ai-sdk`, `playwright-cli`, `remotion-video`, `cloudflare-skills`, `supabase-skills`, `azure-skills`).
- [x] Subtask 15.2: Enforce Dual Matrix Parity across `.md` and `.csv` editions (650 lines MD, 530 rows CSV).
- [x] Subtask 15.3: Sync live GitHub telemetry across 50 upstream repositories (3.82M+ community stars).
- [x] Subtask 15.4: Bind `nameKeyMap` in `index.html` and update hero bento telemetry counters.
- [x] Subtask 15.5: Run full verification test suite and push to origin main.

### TASK-016: Catalog Expansion (Batch 2 High-Star Repositories)
- [x] Subtask 16.1: Author 10 standardized Law 2 `SKILL.md` packages (`emil-design-eng`, `obsidian-markdown`, `find-skills`, `vercel-react-patterns`, `google-workspace-cli`, `gsap-animation`, `trailofbits-security`, `expo-mobile`, `web-quality-a11y`, `stripe-payments`).
- [x] Subtask 16.2: Enforce Dual Matrix Parity across `.md` and `.csv` editions (670 lines MD, 549 rows CSV).
- [x] Subtask 16.3: Sync live GitHub telemetry across 60 upstream repositories (4.06M+ community stars).
- [x] Subtask 16.4: Update `index.html` hero counters (273+ skills, 60 frameworks, 4.0M+ stars) and `nameKeyMap` bindings.
- [x] Subtask 16.5: Verify Layer 15 governance, test gates, and push to origin main.

### TASK-017: Catalog Expansion (Batch 3 High-Star Repositories)
- [x] Subtask 17.1: Author 10 standardized Law 2 `SKILL.md` packages (`hyperframes-media`, `marketing-growth-engine`, `hallmark-frontend-eval`, `herdr-orchestration`, `typescript-tailwind-patterns`, `lark-enterprise-cli`, `typography-layout-polish`, `stitch-design-system`, `typesafe-ai-schemas`, `fastify-backend-perf`).
- [x] Subtask 17.2: Enforce Dual Matrix Parity across `.md` and `.csv` editions (690 lines MD, 569 rows CSV).
- [x] Subtask 17.3: Sync live GitHub telemetry across 70 upstream repositories (4.38M+ community stars).
- [x] Subtask 17.4: Update `index.html` hero counters (283+ skills, 70 frameworks, 4.3M+ stars) and `nameKeyMap` bindings.
- [x] Subtask 17.5: Verify Layer 15 governance, test gates, and push to origin main.

### TASK-018: Catalog Expansion (Batch 4 High-Star Repositories)
- [x] Subtask 18.1: Author 10 standardized Law 2 `SKILL.md` packages (`vercel-agent-browser`, `github-copilot-patterns`, `component-anatomy-specs`, `brag-document-generator`, `video-frame-analysis`, `agent-desktop-gui`, `gamedev-mechanics`, `browser-act-testing`, `higgsfield-visual-media`, `data-viz-html-reports`).
- [x] Subtask 18.2: Enforce Dual Matrix Parity across `.md` and `.csv` editions (710 lines MD, 589 rows CSV).
- [x] Subtask 18.3: Sync live GitHub telemetry across 80 upstream repositories (4.57M+ community stars).
- [x] Subtask 18.4: Update `index.html` hero counters (293+ skills, 80 frameworks, 4.5M+ stars) and `nameKeyMap` bindings.
- [x] Subtask 18.5: Verify Layer 15 governance, test gates, and push to origin main.

### TASK-019: Catalog Expansion (Batch 5 - Complete Bucket 1)
- [x] Subtask 19.1: Author 5 standardized Law 2 `SKILL.md` packages (`interface-feel-polish`, `network-latency-benchmarks`, `stageshow-ui-presentation`, `binance-agentic-wallet`, `motion-sound-effects`).
- [x] Subtask 19.2: Enforce Dual Matrix Parity across `.md` and `.csv` editions (720 lines MD, 599 rows CSV).
- [x] Subtask 19.3: Sync live GitHub telemetry across 85 upstream repositories (4.59M+ community stars).
- [x] Subtask 19.4: Update `index.html` hero counters (298+ skills, 85 frameworks, 4.6M+ stars) and `nameKeyMap` bindings.
- [x] Subtask 19.5: Verify Layer 15 governance, test gates, and push to origin main.

### TASK-020: Catalog Expansion (Batch 6 - Bucket 2 High-Impact & Unique Developer Tools)
- [x] Subtask 20.1: Author 10 standardized Law 2 `SKILL.md` packages (`firecrawl-web-scrape`, `convex-backend-sync`, `scrapegraph-ai-pipeline`, `momentic-visual-testing`, `extract-design-tokens`, `better-auth-patterns`, `continuous-review-loop`, `mastra-agent-framework`, `mermaid-design-generator`, `nx-monorepo-architect`).
- [x] Subtask 20.2: Enforce Dual Matrix Parity across `.md` and `.csv` editions (741 lines MD, 608 rows CSV).
- [x] Subtask 20.3: Sync live GitHub telemetry across 95 upstream repositories.
- [x] Subtask 20.4: Update `index.html` hero counters (308+ skills, 95 frameworks, 4.6M+ stars) and `nameKeyMap` bindings.
- [x] Subtask 20.5: Verify Layer 15 governance, test gates, and push to origin main.

### TASK-021: Catalog Expansion (Batch 7 - Bucket 2 Official Developer Platforms)
- [x] Subtask 21.1: Author 9 standardized Law 2 `SKILL.md` packages (`firebase-agent-suite`, `svelte5-runes-patterns`, `neon-serverless-postgres`, `clerk-auth-identity`, `prisma-orm-patterns`, `stripe-link-checkout`, `currents-playwright-sharding`, `elevenlabs-voice-ai`, `solana-agent-kit`).
- [x] Subtask 21.2: Enforce Dual Matrix Parity across `.md` and `.csv` editions (758 lines MD, 615 rows CSV).
- [x] Subtask 21.3: Sync live GitHub telemetry across 104 upstream repositories.
- [x] Subtask 21.4: Update `index.html` hero counters (317+ skills, 104 frameworks, 4.6M+ stars) and `nameKeyMap` bindings.
- [x] Subtask 21.5: Verify Layer 15 governance, test gates, and push to origin main.









