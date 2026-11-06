# Contributing to {{PROJECT_NAME}}

Thank you for your interest in contributing to **{{PROJECT_NAME}}**! This guide outlines our development workflow, coding standards, and branch policies.

---

## 🧭 Code of Conduct
All contributors are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior to `{{SECURITY_CONTACT_EMAIL}}`.

---

## 🌿 Branching & Development Workflow
We follow Trunk-Based Development with short-lived feature branches:
1. Create branch from `main`: `feature/{{SHORT_NAME}}` or `fix/{{SHORT_NAME}}`.
2. Ensure all pre-commit hooks pass locally:
   ```bash
   {{PRE_COMMIT_COMMAND}}
   ```
3. Run local unit & integration tests:
   ```bash
   {{TEST_COMMAND}}
   ```
4. Open a Pull Request with a clear summary against `main`.

---

## 🧪 Definition of Done (DoD)
Before any PR is merged, it must meet:
- [ ] 100% passing tests (`{{TEST_COMMAND}}`).
- [ ] No regressions in test coverage.
- [ ] Documentation updated in `docs/` (Layer 15).
- [ ] Clean linting and static analysis report.
- [ ] Code review approved by at least 1 maintainer.
