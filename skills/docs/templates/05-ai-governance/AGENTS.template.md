# AGENTS.md — Agent Operating Instructions & Invariants

> **Authoritative Guide for AI Coding Agents Operating in {{PROJECT_NAME}}**

---

## 🏛️ Non-Negotiable Laws

### Law 1: Test-First & No Mocking Real Business Logic
Never claim a feature is complete without running real tests with verified factual evidence.

### Law 2: Dual Matrix & Documentation Parity
Any architectural modification or skill addition must be updated across all indexes simultaneously.

### Law 3: Atomic Git Commits with Conventional Syntax
Every commit must be small, cohesive, and follow Conventional Commits format:
`feat(scope): message`, `fix(scope): message`, `docs(scope): message`.

---

## 🧭 Repository Navigation

| Path | Purpose |
| :--- | :--- |
| `src/` | Primary source code |
| `tests/` | Automated test suite |
| `docs/` | Universal Project Documentation (Layer 15) |
| `scripts/` | Tooling and automation scripts |

---

## ⚡ Agent Self-Review Gate
Before presenting output to user, verify:
- [ ] Did all tests pass without errors?
- [ ] Were relevant markdown docs updated?
- [ ] Are there any unverified hallucinations or dead links?
