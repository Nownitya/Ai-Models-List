---
name: understand-anything
description: "AI-powered codebase and knowledge-base understanding suite. Analyzes projects via multi-agent pipelines to build interactive visual knowledge graphs, dependency tours, domain business-process maps, and Karpathy-pattern LLM wiki graphs for Claude Code, Codex, Antigravity, and Cursor."
---

# Understand Anything: Codebase & Knowledge-Base Intelligence

## When to Use
- When onboarding onto a large, complex codebase (50k–500k+ lines) and needing an interactive visual map of subsystems, files, functions, and call graphs.
- When you need to explain technical architecture and business domain logic to stakeholders through guided visual tours.
- When exploring Karpathy-pattern LLM knowledge bases or documentation wikis to uncover hidden conceptual connections and community clusters.
- When performing architectural refactoring, dependency auditing, or PR impact analysis (`/understand-diff`).

## Core Capabilities
1. **Interactive Visual Dashboard**: Generates a browser-based, pan/zoom force-directed knowledge graph allowing users to click nodes, inspect plain-English explanations, and search dependencies.
2. **Domain Business Logic Mapping**: Translates raw code structures into high-level business domains, user flows, and operational steps (`/understand-domain`).
3. **Guided Onboarding Tours**: Automatically synthesizes architectural walkthroughs ordered by dependency graph topological sorts, walking developers through core concepts sequentially (`/understand-onboard`).
4. **Karpathy LLM-Wiki Knowledge Graph**: Parses markdown wikilinks, indexes, and categories into clustered knowledge networks with semantic entity discovery (`/understand-knowledge`).
5. **Interactive Natural Language Queries**: Chat directly with your codebase graph to trace execution paths and query component responsibilities (`/understand-chat`).

## Installation / Activation Command
```bash
# Claude Code Plugin installation
claude plugin add Egonex-AI/Understand-Anything

# Standalone CLI execution
npx understand-anything@latest

# Slash command triggers
/understand           # Full codebase analysis & graph generation
/understand-dashboard # Open local web visualizer
/understand-onboard   # Generate step-by-step onboarding walkthrough
/understand-domain    # Map code to business processes
/understand-knowledge # Parse Karpathy LLM wiki into knowledge graph
```

## Prerequisites
- Node.js 18+ and pnpm / npm.
- Modern web browser for viewing local dashboard visualization (`localhost:3000`).
- LLM API key (Claude, Gemini, or OpenAI) for deep semantic analysis and plain-English tour synthesis.

## Anti-Patterns / Warnings
- **Do not replace AST compiler checks with visual graphs**: Visual graphs illustrate structure and intent; always verify type safety and interface contracts with unit tests and compiler runs.
- **Complementary to Graphify**: Use Graphify for lightweight, local AST subgraphs piped directly into agent context windows during coding; use Understand Anything for visual exploration, onboarding tours, and human architectural alignment.
- **Avoid running full re-indexing on minor edits**: Use incremental diff modes (`/understand-diff`) rather than re-analyzing multi-hundred-thousand-line repositories on single-file changes.

