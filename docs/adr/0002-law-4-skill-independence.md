# ADR 0002: Skill Independence vs Project Docs Synthesis (Law 4) (`Ai-Models-List`)

* **Status:** Accepted
* **Date:** 2026-11-06
* **Deciders:** Core Engineering Team
* **Context:** Skills in the catalog originate from distinct upstream creators (obra/superpowers, garrytan/gstack, mattpocock, open-gsd, Google Android). Merging different creators' methodologies into single hybrid files dilutes each framework's specific philosophy and prompts.
* **Decision:**
  1. Enforce strict **Skill Independence**: Upstream skills must remain completely pure and separated by their namespace or creator. They are selectable individually via author-scoped commands.
  2. Enforce **Project Documentation Synthesis** strictly within a project's `docs/` directory: All architectural, product, and sprint records must be cumulatively synthesized into canonical living documents.
* **Consequences:**
  - *Positive:* Preserves unique authoring patterns, personas, and prompts from Superpowers, gstack, Matt Pocock, and GSD.
  - *Positive:* Prevents doc fragmentation within target project codebases.

