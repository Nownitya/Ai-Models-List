---
name: graphify
description: "Builds a local code and document knowledge graph (AST-based relations, imports, call hierarchies, query subgraphs) for agent codebase comprehension."
priority: P1
category: 10-ai-infrastructure
source: https://github.com/Graphify-Labs/graphify
---

# Graphify (Codebase AST Knowledge Graph)

Index codebases into an AST-backed property graph to allow agents to navigate call relationships and extract subgraphs without reading hundreds of raw files.

## When to Use
- Onboarding to a large or unfamiliar codebase.
- Tracing execution flow, dependencies, and call hierarchies before refactoring.
- Keeping agent context window lightweight by retrieving focused subgraphs.

## Commands
```bash
graphify init .
graphify update .
graphify query "find all callers of authenticateUser"
```
