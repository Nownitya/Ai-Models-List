# ARCHITECTURE.md — System & Pipeline Architecture (`Ai-Models-List`)

> **Authoritative System Architecture Specification**  
> **Status:** Active / Living Document  
> **Standard:** Layer 15 Universal Project Documentation  
> **Target Project:** `Ai-Models-List`

---

## 1. System Overview & Component Diagram

The `Ai-Models-List` platform is structured into five interconnected tiers:

```
+===================================================================================+
|                                    USER INTERFACES                                 |
|  +-------------------------------------+   +------------------------------------+  |
|  | Web Catalog (index.html / GitHub)   |   | Obsidian Knowledge Vault           |  |
|  | Linear/Bento UI + Live Star Radar   |   | Markdown Notes & MOC Graph         |  |
|  +------------------+------------------+   +-----------------+------------------+  |
+=====================|========================================|=====================+
                      |                                        |
+=====================v========================================v=====================+
|                                 CORE KNOWLEDGE MATRICES                             |
|  +----------------------------------+    +--------------------------------------+  |
|  | Markdown Matrix (.md Edition)    |====| CSV Matrix (.csv Edition)            |  |
|  | 16 Sections, 600+ Lines          |    | 480+ Structured Rows                 |  |
|  +------------------+---------------+    +-------------------+------------------+  |
+=====================|========================================|=====================+
                      | (Parity Sync Gate: scripts/sync-matrix)|
+=====================v========================================v=====================+
|                              TELEMETRY & INGESTION PIPELINE                         |
|  +----------------------------------+    +--------------------------------------+  |
|  | GitHub REST Ingestion Engine     |    | Output Artifacts:                    |  |
|  | scripts/sync_github_metrics.py   |--->| - data/github-metrics.json           |  |
|  | 32 Upstream Framework Repos      |    | - docs/LIVE-STATS.md                 |  |
|  | Auto-Commit Daily via CI Cron    |    | - data/live-stats.csv                |  |
|  +----------------------------------+    +--------------------------------------+  |
+===================================================================================+
                                      |
+=====================================v=============================================+
|                               SKILLS EXECUTION HARNESS                             |
|  +----------------------------------+    +--------------------------------------+  |
|  | 228 Cataloged SKILL.md Packages  |    | Active Runtime (.agents/skills/)     |  |
|  | 12 Functional Domain Categories  |    | 88 Verified Engineering Skills       |  |
|  +------------------+---------------+    +-------------------+------------------+  |
|                     |                                        |                     |
|  +------------------v---------------+    +-------------------v------------------+  |
|  | Installer (install-to-project.py)|    | Lockfile Verifier (verify-lock.py)   |  |
|  | Curated Preset Bundles Injection |    | SHA-256 CRLF/LF Normalized Checksums |  |
|  +----------------------------------+    +--------------------------------------+  |
+===================================================================================+
```

---

## 2. Subsystem Specifications

### 2.1 Dual-Matrix Core Engine
* **Source of Truth**: `AI-Coding-Skills-and-Tools-Matrix.md` and `AI-Coding-Skills-and-Tools-Matrix.csv`.
* **Sync Mechanism**: `scripts/sync-matrix.py` parses markdown tables, verifies row counts, validates header alignment across all 16 sections, and exits with code 1 upon drift.
* **Pre-Commit Hook**: Configured in `.git/hooks/pre-commit` to prevent committing drifted matrices.

### 2.2 Telemetry Ingestion Pipeline
* **Fetcher**: `scripts/sync_github_metrics.py` iterates over all unique GitHub repositories in the matrix.
* **Rate-Limit Resilience**: Checks `GITHUB_TOKEN` environment variable; gracefully falls back to unauthenticated public API and caches last-known states in `data/github-metrics.json` if network drops.
* **Formatters**: Generates `docs/LIVE-STATS.md` with Shields.io badges, ranks repositories in `data/live-stats.csv`, and injects top-10 sample tables into `README.md`.

### 2.3 Skills Execution & Lockfile Layer
* **Standard Structure**: Adheres to Law 2 and Agent Skills Specification (`name`, `description`, `When to Use`, `Core Capabilities`, `Prerequisites`, `Anti-Patterns`).
* **Cryptographic Lockfile**: `skills-lock.json` contains SHA-256 digests. Verification via `scripts/verify-lock.py` normalizes `\r\n` to `\n` to ensure Windows/Linux/macOS cross-platform invariance.

### 2.4 Interactive Web Catalog (Bento Architecture)
* **Architecture**: Single-page vanilla HTML5/CSS3 application requiring zero build toolchains or bundlers.
* **Asynchronous Telemetry Fetch**: Queries `data/github-metrics.json` at runtime; falls back gracefully to embedded CSV data if running off-line.
* **Dynamic Search & Filtering**: Client-side filtering across categories, priorities (P0–P3), author presets, and keyboard shortcuts (`/` focus, `Esc` clear).
