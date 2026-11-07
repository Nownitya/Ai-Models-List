# ADR 0001: Dual Matrix Parity Enforcement (Law 1) (`Ai-Models-List`)

* **Status:** Accepted
* **Date:** 2026-11-06
* **Deciders:** Core Engineering Team
* **Context:** The catalog is accessed both by human developers reading rich Markdown on GitHub and by programmatic pipelines, spreadsheets, and agents parsing tabular data.
* **Decision:** Enforce absolute dual parity between `AI-Coding-Skills-and-Tools-Matrix.md` and `AI-Coding-Skills-and-Tools-Matrix.csv` across all 16 canonical sections.
* **Consequences:**
  - *Positive:* Eliminates data divergence; automated scripts and web dashboards can rely on either representation.
  - *Positive:* Pre-commit hook and CI gate catch accidental single-file modifications before landing.
  - *Trade-off:* Every addition or modification requires updating both files simultaneously.
