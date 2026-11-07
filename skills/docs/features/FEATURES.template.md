# Feature Inventory & Status Matrix — {{PROJECT_NAME}}

> **Tracking Standard:** Every feature has an immutable ID (`FEAT-xxx`), owner, status, and automated test link.

---

## 📋 Feature Register

| Feature ID | Category | Feature Name | Priority | Status | Verification Test |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `FEAT-001` | Core | {{FEAT_001_NAME}} | P0 | Verified | `tests/core/test_auth.py` |
| `FEAT-002` | Core | {{FEAT_002_NAME}} | P0 | In Progress | `tests/core/test_sync.py` |
| `FEAT-003` | Protocol | {{FEAT_003_NAME}} | P1 | Planned | `tests/protocol/test_wire.py` |
| `FEAT-004` | UI | {{FEAT_004_NAME}} | P1 | In Review | `tests/ui/test_dashboard.py` |
| `FEAT-005` | Security | {{FEAT_005_NAME}} | P0 | Verified | `tests/security/test_crypto.py` |

---

## Status Legend
- **Planned:** In backlog; specifications ready.
- **In Progress:** Actively under branch development.
- **In Review:** Pull request open; undergoing code & security review.
- **Verified:** 100% test pass recorded with factual evidence.
- **Deprecated:** Superseded by a newer architectural pattern.
