---
name: freellmapi
description: "Unified AI gateway routing across 87 free LLM providers and 1,313 endpoints via a single OpenAI-compatible /v1 endpoint with smart routing, automatic failover, and encrypted keys."
priority: P1
category: 10-ai-infrastructure
---

# FreeLLMAPI — Unified Free LLM Gateway

> **Priority:** `P1` | **Category:** `10-ai-infrastructure`
> **Repository:** https://github.com/tashfeenahmed/freellmapi | **Stars:** 52,000+

Aggregates 10.1 billion tokens per month across 87 free LLM providers and 1,313 free model endpoints behind a single, drop-in OpenAI-compatible `/v1` endpoint.

---

## When to Use

* Running agent experiments, multi-agent swarms, or continuous testing without incurring proprietary API bills.
* Needing automatic failover across free-tier providers (Groq, Together, HuggingFace, Cloudflare, DeepInfra, etc.).
* Routing background evaluators, summarizers, or low-priority agent reasoning steps.

---

## Prerequisites & Setup

* Local deployment via Docker or Node.js runtime.
* Set standard client configuration:
  ```bash
  OPENAI_BASE_URL="http://localhost:8000/v1"
  OPENAI_API_KEY="free-llm-token"
  ```
* For personal experimentation and developer benchmarking only.

---

## Core Capabilities & Protocol

1. **Drop-in /v1 Compatibility**: Works seamlessly with any OpenAI SDK, LangChain, LlamaIndex, Claude Code, or Codex by changing `base_url`.
2. **Dynamic Failover & Load Balancing**: When rate limits (HTTP 429) occur, automatically cascades to alternative providers serving the same or equivalent architecture (e.g. Llama 3.3 70B, DeepSeek R1, Qwen 2.5 Coder).
3. **Encrypted In-Flight Credentials**: Stores credentials in memory or encrypted vaults; routes calls without persistent token logging.
4. **Endpoint Virtualization**: Presents uniform model names (`free-llama-3-70b`, `free-deepseek-r1`) mapping transparently to the healthiest upstream backend.

---

## Anti-Patterns & Warnings

* **Do not use for production critical SLA services**: Free tiers have volatile rate limits and varying latencies; reserve for development, research, and non-blocking tasks.
* **Sensitive user data**: Do not route unanonymized enterprise PII or HIPAA data through third-party free endpoints.
