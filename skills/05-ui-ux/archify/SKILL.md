---
name: archify
description: "Turn any idea, plan, code, or architecture into explorable, interactive diagrams (architecture, sequence, workflow, data flow, ERD, state/lifecycle) rendered as standalone self-contained HTML with dark/light themes, animations, and image/SVG/WebM export."
---

# Archify: Interactive Architecture & System Diagram Skill

## When to Use
- When you need to visualize system architectures, microservice boundaries, API request/response flows, data pipelines, database schemas (ERDs), or state machine lifecycles.
- When generating visual explainers for technical documentation, PRDs, ADRs, or onboarding guides.
- When transforming Mermaid code, system specifications, or codebase evidence into explorable, animated standalone HTML diagrams.
- When user asks to "make a diagram", "visualize architecture", "turn this into an interactive page", or "做成一页 / 用页面讲".

## Core Capabilities
1. **Interactive Standalone HTML Diagrams**: Produces single-file, zero-dependency HTML visualizations featuring zoom, pan, dark/light themes, node inspection, and motion.
2. **Multi-Diagram Taxonomies**:
   - **Architecture & System Topology**: High-level component interactions, tiers, and service boundaries.
   - **Sequence & Protocol Flows**: Multi-party asynchronous message exchanges, webhooks, and retry loops.
   - **Workflow & Pipeline**: CI/CD stages, ETL jobs, and execution waves.
   - **State & Lifecycle**: Finite state machines, connection lifecycles, and transaction stages.
   - **ERD & Data Models**: Database tables, foreign keys, cardinality, and field types.
3. **Evidence-Backed Code Inspection**: Analyzes repository source files, imports, and configuration schemas to generate ground-truth accurate diagrams rather than speculative abstractions.
4. **Export Engine**: One-click raster/vector export to SVG, PNG, WebM, or JSON candidates for reproducible iteration.

## Installation / Activation Command
```bash
# Skills CLI (Claude Code, Cursor, Codex, Antigravity, Gemini CLI)
npx skills add tt-a1i/archify

# Run standalone CLI
npx archify@latest

# Slash command trigger
/archify
```

## Prerequisites
- Node.js 18+ (for local CLI rendering).
- Modern web browser for viewing exported standalone HTML diagrams.
- Works natively with Claude Code, Antigravity CLI, Codex, Cursor, and OpenCode.

## Anti-Patterns / Warnings
- **Do not use for operational dashboards**: Archify is designed for structural, architectural, and educational diagrams, not for real-time telemetry streaming or Grafana-style metric graphing.
- **Avoid single-node over-clustering**: Do not collapse hundreds of functions into a single giant spaghetti diagram; decompose by subsystem or execution tier.
- **Never fabricate unverified connections**: Always inspect codebase evidence before asserting inter-service relationships or API call contracts.

