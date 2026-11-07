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
| **TASK-005** | Docs Layer 15 | Canonical living specifications synthesis | P0 | In Progress | `tests/test_docs_integrity.py` |
| **TASK-006** | Cryptography | Lockfile verification CLI (`verify-lock.py`) | P0 | Pending | `tests/test_verify_lock.py` |
| **TASK-007** | Installer | Preset bundles (`--bundle`) injection support | P0 | Pending | `tests/test_install_to_project.py` |
| **TASK-008** | Web Search | Preset filter & slash command interactive search | P1 | Pending | `tests/test_web_dashboard.py` |

---

## 2. Active Epic Breakdown: Roadmap & Catalog Evolution

### TASK-005: Synthesize Canonical Layer 15 Documentation
- [x] Subtask 5.1: Write failing `tests/test_docs_integrity.py`.
- [x] Subtask 5.2: Create canonical `docs/PRD.md`.
- [x] Subtask 5.3: Create canonical `docs/ARCHITECTURE.md`.
- [x] Subtask 5.4: Create canonical `docs/ROADMAP.md`.
- [x] Subtask 5.5: Create canonical `docs/TASKS.md`.
- [ ] Subtask 5.6: Create canonical `docs/BRD.md`.
- [ ] Subtask 5.7: Create canonical `docs/TRD.md`.
- [ ] Subtask 5.8: Create canonical `docs/testing/TEST-STRATEGY.md`.
- [ ] Subtask 5.9: Create ADRs `0001-dual-matrix-parity.md` and `0002-law-4-skill-independence.md`.
- [ ] Subtask 5.10: Run `tests/test_docs_integrity.py` to confirm 100% green pass.

### TASK-006: Cryptographic Lockfile Verification CLI
- [ ] Subtask 6.1: Author unit test `tests/test_verify_lock.py` with CRLF/LF invariance.
- [ ] Subtask 6.2: Implement `scripts/verify-lock.py` and `scripts/verify_lock.py`.
- [ ] Subtask 6.3: Verify against live `skills-lock.json`.

### TASK-007: Preset Bundles in Project Installer CLI
- [ ] Subtask 7.1: Author unit test `tests/test_install_to_project.py`.
- [ ] Subtask 7.2: Implement `PRESET_BUNDLES` in `scripts/install-to-project.py`.
- [ ] Subtask 7.3: Test dry-run multi-skill installation.

### TASK-008: Interactive Preset Filters on Web Dashboard
- [ ] Subtask 8.1: Author unit test `tests/test_web_dashboard.py`.
- [ ] Subtask 8.2: Implement preset buttons and slash command handler in `index.html`.
- [ ] Subtask 8.3: Verify live dashboard rendering.
