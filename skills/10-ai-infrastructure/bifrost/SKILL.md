---
name: bifrost
description: "Ultra-fast AI gateway (<200µs overhead at 5k RPS) acting as LLM gateway, MCP gateway, and agent router with semantic caching, failover, virtual keys, and MCP Code Mode."
priority: P0
category: 10-ai-infrastructure
---

# Maxim Bifrost — High-Performance AI & MCP Gateway

> **Priority:** `P0` | **Category:** `10-ai-infrastructure`
> **Repository:** https://github.com/maximhq/bifrost | **Stars:** 9,500+

An open-source, ultra-low latency (<200µs at 5,000 RPS) gateway built for LLMs, agent frameworks, and Model Context Protocol (MCP) servers. Provides unified OpenAI-compatible routing for 10,000+ models, semantic caching, budget quotas, and groundbreaking MCP Code Mode.

---

## When to Use

* Serving as the single gateway proxying Claude Code, Cursor, Codex, and internal agent fleets.
* Reducing token costs through cluster-wide semantic caching and prompt deduplication.
* Managing MCP server governance: routing tool calls, enforcing rate limits, and converting MCP tools to code snippets via MCP Code Mode.

---

## Prerequisites & Installation

* Docker or lightweight binary deployment.
* Run Bifrost Gateway:
  ```bash
  docker run -p 8080:8080 maximhq/bifrost:latest
  ```

---

## Core Capabilities & Workflow

1. **MCP Code Mode**: Converts heavy MCP tool schemas into executable lightweight code signatures, reducing agent context window overhead by up to 90%.
2. **Sub-200µs Routing Overhead**: Written in high-performance Go/Rust for wire-speed LLM reverse proxying.
3. **Semantic Caching**: Recognizes semantically identical agent queries and returns cached responses, dramatically slashing LLM token bills.
4. **Adaptive Failover & Cost Budgets**: Enforces strict spending ceilings and automatically cascades from overloaded models to fallback providers.

---

## Anti-Patterns & Warnings

* **Bypassing the gateway in scripts**: Route all developer agents through Bifrost's port to preserve audit trails and budget caps.
* **Disabling semantic cache on non-deterministic tasks**: Keep cache disabled for creative writing or temperature > 0.7 tasks.
