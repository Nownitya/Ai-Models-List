# ARCHITECTURE.md — System & Directory Architecture

High-level architecture and subsystem organization for the `Ai-Models-List` repository.

```
                           +--------------------------------------+
                           |  AI Coding Skills & Tools Matrix     |
                           +------------------+-------------------+
                                              |
                     +------------------------+------------------------+
                     |                                                 |
         +-----------v------------+                       +------------v-----------+
         | Master Markdown Matrix | <=== Parity Sync ===> |   Master CSV Matrix    |
         | (.md Edition)          |                       |   (.csv Edition)       |
         +-----------+------------+                       +------------+-----------+
                     |                                                 |
                     +------------------------+------------------------+
                                              |
        +-------------------------------------+-------------------------------------+
        |                                     |                                     |
+-------v---------+                  +--------v--------+                   +--------v--------+
| Skills Library  |                  | Prompts Toolkit |                   | Governance Docs |
| (12 Domains)    |                  | (Optimization)  |                   | (Layer 15)      |
+-------+---------+                  +--------+--------+                   +--------+--------+
        |                                     |                                     |
        +-- 01-core-engineering               +-- prompt-framework                  +-- RULES.md
        +-- 02-matt-pocock                    +-- role-prompts                      +-- AGENTS.md
        +-- 03-android                        +-- code-quality                      +-- PRD.md
        +-- 04-kotlin-kmp                                                           +-- GLOSSARY.md
        +-- 05-ui-ux
        +-- ... (to 12-specialized)
```

## Subsystem Details
1. **Master Matrix Layer**: Dual-format core (`.md` and `.csv`) providing table-of-contents, priorities (P0–P3), rationales, and official repository links.
2. **Skills Library Layer**: Modular directory layout where each skill contains an actionable `SKILL.md` file following the Agent Skills specification.
3. **Prompt Optimization Layer**: Reusable system prompts, reasoning scratchpads, and execution guides to maximize agent model reasoning fidelity.
4. **Governance Layer**: Compliance with the Universal Project Documentation Standard, enforcing dual-matrix sync and verification gates.
