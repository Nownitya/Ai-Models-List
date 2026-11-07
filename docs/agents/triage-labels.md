# Triage Labels Vocabulary

> Authoritative triage taxonomy for Matt Pocock engineering skills (`/triage`, `/to-tickets`) in `Ai-Models-List`.

## Priority Labels
| Label | Description | Criteria |
| :--- | :--- | :--- |
| `p0-critical` | Blocker / Matrix corruption | Broken parity between `.md` and `.csv`, broken CI gate, or critical tool failure |
| `p1-high` | High value / Immediate milestone | New major framework integration, missing Layer 15 core spec, or verification failure |
| `p2-normal` | Regular engineering task | Standard skill addition, prompt template enrichment, minor refactoring |
| `p3-low` | Backlog / Nice-to-have | Minor cosmetic fixes, exploratory spikes, edge-case documentation |

## Workflow & State Labels
| Label | Description |
| :--- | :--- |
| `needs-triage` | Newly created item awaiting evaluation and sizing |
| `needs-info` | Blocked on user clarification, architectural decision, or external spec |
| `ready-for-agent` | Fully specified and ready for autonomous agent execution (`/implement`) |
| `ready-for-human` | Requires manual developer intervention, external credentials, or PR approval |
| `wontfix` | Out of scope, speculative overengineering, or violating repository laws |

## Domain & Component Labels
| Label | Description |
| :--- | :--- |
| `matrix` | Pertains to `AI-Coding-Skills-and-Tools-Matrix.md` and `.csv` |
| `skills` | Pertains to `skills/` packages or `.agents/skills/` runtime |
| `docs` | Pertains to Layer 15 living documentation under `docs/` |
| `tooling` | Pertains to automation scripts under `scripts/` |
| `web-dashboard` | Pertains to `index.html` interactive viewer |

