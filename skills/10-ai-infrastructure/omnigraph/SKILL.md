---
name: omnigraph
description: "Object-storage native context and knowledge graph database with Git-style branching, typed ontologies, Apache Arrow, DataFusion, and native MCP support."
priority: P1
category: 10-ai-infrastructure
---

# Omnigraph — Object-Storage Native Knowledge Graph

> **Priority:** `P1` | **Category:** `10-ai-infrastructure`
> **Repository:** https://github.com/ModernRelay/omnigraph | **Stars:** 2,300+

An open-source, high-performance graph database built in Rust designed for object storage (S3, GCS, MinIO). Features zero-copy Apache Arrow / DataFusion query execution, typed domain ontologies, and Git-like branching for agent context.

---

## When to Use

* Storing massive persistent codebase knowledge graphs, dependency hierarchies, and agent memory on serverless cloud object storage.
* Requiring Git-style branching of context graphs (e.g. creating isolated context snapshots per PR or agent session).
* Running vector + graph hybrid queries with native Model Context Protocol (MCP) tool integration.

---

## Prerequisites & Setup

* Rust 1.80+ or precompiled Docker image.
* S3-compatible storage backend (MinIO, AWS S3, Cloudflare R2).
* Native MCP server exposes query and branch endpoints directly to coding agents.

---

## Core Capabilities & Protocol

1. **Git-Like Branching**: Create, merge, and rollback graph context branches:
   ```bash
   omnigraph branch create feature-auth-refactor
   ```
2. **High-Throughput Analytics**: Leverages Apache DataFusion and Arrow for sub-millisecond graph traversals.
3. **Typed Ontology Enforcement**: Enforces domain entity types and relationships, preventing corrupt or orphaned nodes in long-running agent workflows.

---

## Anti-Patterns & Warnings

* **Excessive small mutations**: Group entity additions into batch commits to optimize S3 object write costs and latency.
* **Untyped graph nodes**: Always define schemas for domain entities to maintain query predictability.
