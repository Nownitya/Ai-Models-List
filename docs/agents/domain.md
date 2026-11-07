# Domain Layout & Architecture Conventions

> Authoritative architectural orientation for Matt Pocock engineering skills (`/codebase-design`, `/domain-modeling`, `/grill-with-docs`, `/implement`) operating in `Ai-Models-List`.

## System Overview
* **Name**: `Ai-Models-List`
* **Purpose**: Master catalog and prompt optimization toolkit for AI coding skills, models, harnesses, and frameworks.
* **Core Governance**: Enforced by 4 Non-Negotiable Repository Laws documented in [`AGENTS.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/AGENTS.md).

## Living Documentation Map (Layer 15)
* **Product Requirements**: [`docs/product/PRD.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/product/PRD.md)
* **System Architecture**: [`docs/architecture/ARCHITECTURE.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/architecture/ARCHITECTURE.md)
* **Delivery Roadmap**: [`docs/ROADMAP.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/ROADMAP.md)
* **Task Backlog**: [`docs/TASKS.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/TASKS.md)
* **Architecture Decision Records (ADRs)**: [`docs/adr/`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/adr/)
* **Implementation Evidence**: [`docs/IMPLEMENTATION-STATUS.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/IMPLEMENTATION-STATUS.md)
* **Domain Glossary**: [`GLOSSARY.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/GLOSSARY.md)

## Verification Gates & Commands
* Dual Matrix Parity Check: `python scripts/sync-matrix.py`
* Skills Quality Audit: `python scripts/test-skills.py`
* Local Agent Parity Audit: `python scripts/sync-local-agents.py --status`
* Pre-Commit Validation: `.git/hooks/pre-commit` (runs automatically on `git commit`)
