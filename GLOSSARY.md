# GLOSSARY.md — AI Skills, Agent Tooling & Architecture Terms

Canonical domain terms and definitions to ensure humans and AI agents share an unambiguous vocabulary.

---

## Priority Classifications

- **P0 (Essential)**: Indispensable capabilities that form the baseline of an effective coding agent toolkit. Priority for immediate loading or active availability.
- **P1 (High Value)**: Strongly recommended capabilities that dramatically enhance code quality, architecture planning, or multi-agent orchestration.
- **P2 (Medium Value)**: Specialized workflows, integrations, or alternative tooling activated on an as-needed basis for specific stacks or tasks.
- **P3 (Optional / Specialized)**: Niche frameworks, experimental tools, or domain-restricted modules (e.g., Automotive parked apps, Wear OS widgets, Display Glasses).

---

## Agent Frameworks & Architectures

- **Agent Skills**: An open, portable standard format (`SKILL.md` with YAML metadata and Markdown instructions) for extending AI coding assistants with specialized domain knowledge.
- **GSD (Get Stuff Done)**: An autonomous phase-based delivery engine structuring development into Discuss → Plan → Execute → Verify → Ship waves with strict verification checkpoints.
- **Ralph Loop**: An autonomous, PRD-driven iterative development harness executing single atomic stories sequentially with test gates.
- **Superpowers**: An agentic skills framework emphasizing red-green-refactor TDD, systematic root-cause debugging, and subagent delegation.
- **gstack**: An engineering and product command suite created by Garry Tan focusing on CEO/design/eng reviews, QA, and release hardening.
- **ECC (Everything Claude Code)**: A multi-agent engineering system providing specialized agents, skills, hooks, and security scanning adapters.

---

## Infrastructure & Memory Systems

- **Graphify**: Codebase knowledge graph system utilizing AST analysis to map dependencies, call hierarchies, and execution flow into queryable subgraphs.
- **Context7**: Version-aware external documentation retrieval service providing up-to-date API references and code examples directly to agents.
- **MemPalace**: A local-first persistent semantic memory system indexing project artifacts, decision logs, and agent conversation transcripts across sessions.
- **OmniRoute**: An AI gateway providing model provider abstraction, fallbacks, and intelligent routing across multiple LLM backends.
- **TokenEconomizer**: Cost and context-efficiency system that learns repository-specific micro-skills and prunes unused tools to prevent context exhaustion.

---

## Design & Engineering Tooling

- **UI/UX Pro Max**: Design-intelligence system featuring 79 styles, 192 reasoning rules, and 22 technology-stack playbooks (including Jetpack Compose and SwiftUI).
- **Impeccable**: A design vocabulary and review toolkit for auditing UI accessibility, performance, visual polish, and responsive behavior.
- **KMP**: Kotlin Multiplatform — cross-platform logic sharing across Android, iOS, Desktop, and Server without sacrificing native UI.
- **ADK**: Google Agent Development Kit for building, testing, and deploying enterprise agent workflows.

