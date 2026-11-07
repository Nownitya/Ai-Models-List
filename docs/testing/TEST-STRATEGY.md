# TEST-STRATEGY.md — Quality Verification & Test Pyramid (`Ai-Models-List`)

> **Authoritative Test Engineering Strategy & CI Gates**  
> **Status:** Active / Living Document  
> **Standard:** Layer 15 Universal Project Documentation  
> **Target Project:** `Ai-Models-List`

---

## 1. Test Pyramid & Verification Taxonomy

```
                   / \
                  /   \     E2E / Deployment Smoke Test (HTTP 200 on Pages)
                 /-----\
                /       \   Integration & Parity Gates (sync-matrix, test-skills)
               /---------\
              /           \ Unit Test Suites (test_*.py via Python unittest)
             +-------------+
```

---

## 2. Test Suites & Gates

### Tier 1: Unit Tests (`tests/`)
Executed via standard test runner: `python -m unittest discover tests "test_*.py" -v`.
* `test_matrix_parity.py`: Verifies Markdown to CSV section parity and metrics extraction.
* `test_sync_github_metrics.py`: Tests repo normalization, star formatting, fallback logic, and README update blocks.
* `test_web_metrics.py` & `test_web_redesign.py`: Tests Bento grid elements, radar strip, sorting logic, and design tokens in `index.html`.
* `test_docs_integrity.py`: Validates existence and Layer 15 compliance of all canonical living documents.
* `test_verify_lock.py`: Validates cryptographic SHA-256 lockfile checks with CRLF/LF invariance.
* `test_install_to_project.py`: Tests preset bundle resolution and dry-run execution.

### Tier 2: Static Quality & Parity Linters (`scripts/`)
* `python scripts/sync-matrix.py`: Law 1 parity validator.
* `python scripts/test-skills.py`: Law 2 schema and link validator.
* `python scripts/verify-lock.py`: Cryptographic lockfile validator.

### Tier 3: Pre-Commit & Continuous Integration (CI)
* `.git/hooks/pre-commit`: Executes `sync-matrix.py` prior to creating local commits.
* `.github/workflows/ci.yml`: Automated GitHub Actions runner validating test suites and matrix parity on push.
* `.github/workflows/sync-metrics.yml`: Daily automated cron updating live GitHub telemetry.
