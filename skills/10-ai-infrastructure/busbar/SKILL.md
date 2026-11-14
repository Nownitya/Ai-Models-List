---
name: busbar
description: "Execution control plane for AI agents in Rust. Governs every model request, MCP tool call, and Agent-to-Agent (A2A) delegation while keeping native protocols intact."
priority: P1
category: 10-ai-infrastructure
---

# Busbar — AI Agent Execution Control Plane

> **Priority:** `P1` | **Category:** `10-ai-infrastructure`
> **Repository:** https://github.com/GetBusbar/busbar | **Stars:** 200+

An enterprise-grade execution control plane for autonomous AI agents written in Rust. Governs model requests, MCP tool calls, and Agent-to-Agent (A2A) delegations with zero protocol translation loss: six native LLM protocols in, six native LLM protocols out.

---

## When to Use

* Implementing strict zero-trust governance over agent swarms, subagent delegations, and tool invocations.
* Enforcing circuit breakers, request retries, and rate limits across heterogeneous model providers (Anthropic, OpenAI, Bedrock, Gemini).
* Auditing every tool execution before it touches production databases or cloud infrastructure.

---

## Prerequisites & Installation

* Rust toolchain or Docker container.
* Configuration via YAML policy manifest:
  ```yaml
  policies:
    - action: "mcp:database:drop_table"
      verdict: "deny"
    - action: "mcp:*"
      rate_limit: "60/min"
  ```

---

## Core Capabilities & Protocol

1. **Native Protocol Fidelity**: Unlike gateways that force everything into OpenAI schema lossily, preserves native streaming, reasoning tags, and function schemas for Claude, Gemini, and OpenAI.
2. **Agent-to-Agent (A2A) Guardrails**: Restricts recursion depth, token cascades, and malicious prompt injections across delegated subagents.
3. **Low-Latency Rust Core**: Negligible latency overhead on high-throughput streaming connections.

---

## Anti-Patterns & Warnings

* **Overly permissive wildcard policies**: Never whitelist `mcp:*` with write permissions in untrusted environments.
* **Single point of failure**: Deploy Busbar in high-availability clusters with health checks.
