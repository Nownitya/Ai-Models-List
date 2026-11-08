---
name: vercel-ai-sdk
description: Unified TypeScript and JavaScript AI SDK for building streaming chat interfaces, generative UI, structured object generation, and multi-agent tool execution.
---

# Vercel AI SDK (`vercel/ai`)

> **Priority:** `P0` | **Framework:** `vercel/ai` | **Domain:** `10-ai-infrastructure` | **Stars:** `⭐ 27k+`

Unified TypeScript and JavaScript AI SDK for building streaming chat interfaces, generative UI, structured object generation, and multi-agent tool execution.

---

## 🧭 When to Use

* When building full-stack AI web applications in Next.js, React, Svelte, Vue, or Node.js.
* When streaming text responses and generative UI components directly from server to client.
* When executing typed function calling (tools) with Zod schema validation.
* When generating structured JSON objects with mathematical schema enforcement.

---

## 🎯 Core Capabilities

1. **Provider-Agnostic Interface**: Write once and switch between OpenAI, Anthropic, Google Gemini, Mistral, Groq, or self-hosted models without code rewrites.
2. **`streamText` & `generateText`**: First-class streaming text responses with backpressure handling and WebSocket/HTTP chunking.
3. **`generateObject` with Zod**: Enforces type-safe structured data extraction matching exact Zod schemas.
4. **Interactive UI Hooks**: Pre-built client hooks (`useChat`, `useCompletion`, `useAssistant`) managing message state, streaming tokens, and retry mechanisms.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/vercel-ai-sdk
```

### Server Route (`app/api/chat/route.ts`)
```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: 'You are an expert AI engineering assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}
```

### Type-Safe Structured Object Generation
```typescript
import { generateObject } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

const { object } = await generateObject({
  model: anthropic('claude-3-7-sonnet-20250219'),
  schema: z.object({
    summary: z.string(),
    actionItems: z.array(z.string()),
    priority: z.enum(['low', 'medium', 'high', 'urgent']),
  }),
  prompt: 'Analyze meeting transcript and extract next steps...',
});
```

---

## 📋 Prerequisites

* Node.js 18+ or Edge Runtime
* `@ai-sdk/openai`, `@ai-sdk/anthropic`, or `@ai-sdk/google` provider packages
* Zod (`zod`) for schema validation

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Buffering full responses on the server instead of streaming tokens to the client.
* **Anti-Pattern:** Passing unsanitized user prompts to tools without input validation.
