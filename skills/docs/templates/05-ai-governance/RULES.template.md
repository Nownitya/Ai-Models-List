# Project Rules & Repository Invariants — {{PROJECT_NAME}}

> **Enforced by Automated CI and Pre-commit Hooks**

---

## 1. Code Architecture Rules
- **Layering Constraint:** The domain layer (`core/`) must NEVER import from presentation or transport layers.
- **Immutability:** Data transfer objects and domain events must be immutable data structures.
- **Explicit Error Handling:** Do not use bare `except:` or swallow exceptions without logging.

---

## 2. Git & Commit Hygiene
- Never commit private keys, `.env` files, or un-sanitized credentials.
- All Pull Requests must link to a valid `FEAT-xxx` or issue number.
