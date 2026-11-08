---
name: mastra-agent-framework
description: Mastra TypeScript AI agent framework, graph workflows, tool calling, memory management, and evals.
---

# Mastra TypeScript AI Agent Framework (`/mastra-agent-framework`)

> **Domain:** 09 Autonomous Agent Architectures  
> **Upstream Authority:** [`mastra-ai/skills`](https://github.com/mastra-ai/skills) (⭐ 102, 95k+ Installs; Main Repo `mastra-ai/mastra` ⭐ 12,500)  
> **Slash Command:** `/mastra-agent-framework`

---

## When to Use

* When engineering production-ready TypeScript AI applications, agents, and deterministic multi-step workflows.
* When coordinating typed tool executions with schema validation (Zod) and LLM function calling.
* When managing persistent conversational memory, semantic message threading, and RAG vector search pipelines.

## Prerequisites

* TypeScript v5.0+ and Node.js v20+.
* `@mastra/core` package installed.

## Core Capabilities

1. **Deterministic Workflow Graphs**: Chains steps with branch conditions, parallel fan-outs, suspended execution, and human-in-the-loop approvals.
2. **Schema-Enforced Tools**: Declares tools with Zod input/output validation, automatic error propagation, and typed returns.
3. **Multi-Model Routing**: Swappable LLM clients supporting OpenAI, Anthropic, Gemini, Groq, and local models.
4. **Agent Memory & Vector Stores**: Native support for LibSQL, PostgreSQL (pgvector), Pinecone, and Qdrant.

## Activation Command

```bash
/mastra-agent-framework [init|agent|workflow|tool|eval] [--name <agent-name>]
```

## Workflow & Usage Guide

### 1. Define Agent with Tool Calling (`src/mastra/agent.ts`)

```typescript
import { Agent } from "@mastra/core";
import { createTool } from "@mastra/core";
import { z } from "zod";

const weatherTool = createTool({
  id: "get-weather",
  description: "Fetches current temperature and conditions for a city",
  inputSchema: z.object({
    city: z.string().describe("City name"),
  }),
  outputSchema: z.object({
    temperature: z.number(),
    condition: z.string(),
  }),
  execute: async ({ context }) => {
    return { temperature: 22, condition: "Sunny" };
  },
});

export const researchAgent = new Agent({
  name: "Research Assistant",
  instructions: "You are a helpful assistant that uses available tools to answer technical questions.",
  model: {
    provider: "ANTHROPIC",
    name: "claude-3-5-sonnet-20241022",
  },
  tools: { weatherTool },
});
```

### 2. Multi-Step Agentic Workflow

```typescript
import { Workflow, Step } from "@mastra/core";
import { z } from "zod";

const crawlStep = new Step({
  id: "crawl-docs",
  execute: async ({ context }) => {
    return { docs: ["Section 1", "Section 2"] };
  },
});

const summarizeStep = new Step({
  id: "summarize",
  execute: async ({ context }) => {
    return { summary: "Documentation processed successfully." };
  },
});

export const docPipeline = new Workflow({ name: "doc-pipeline" })
  .step(crawlStep)
  .then(summarizeStep)
  .commit();
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Defining unconstrained tool schemas without type validations (`z.any()`), leading to malformed LLM tool call payloads.
* **Anti-Pattern:** Placing unbounded recursive loops inside autonomous agent execution paths without step counter exit gates.
* **Warning:** Production agent deployments must implement rate-limiting and budget controls across API provider tokens.
