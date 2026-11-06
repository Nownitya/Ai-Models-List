---
name: grill-me
description: "Interactive interview skill where the agent asks targeted questions to uncover hidden requirements, edge cases, and architectural constraints before planning or coding."
priority: P0
category: 02-matt-pocock
source: https://github.com/mattpocock/skills
---

# Grill-Me (Interactive Requirements Discovery)

Conduct an interactive discovery session to eliminate ambiguity and uncover implicit assumptions.

## When to Use
- Starting a non-trivial feature or project without a complete specification.
- Clarifying user intent when multiple architectural paths exist.
- Resolving trade-offs between speed, scalability, and UX fidelity.

## Protocol
1. Ask one targeted question at a time (or 2-3 tightly related questions).
2. Offer recommended choices with rationale.
3. Incorporate the answers directly into the project's `PRD.md` or `ARCHITECTURE.md`.

