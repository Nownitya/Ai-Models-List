---
name: gemini-api
description: "Integrate official Google GenAI SDK (`google-genai`) for multimodal, structured output, and agents."
priority: P2
category: 10-ai-infrastructure
---

# Gemini Api

Integrate official Google GenAI SDK (`google-genai`) for multimodal, structured output, and agents.

## When to Use
- Building cloud AI features, streaming chat, or tool calling in Python/TypeScript.

## Core Protocol / Capabilities
1. Initialize `Client()` with API key or Vertex credentials.
2. Use structured output schemas with Pydantic/Zod.
3. Configure system instructions and safety filters.

## Anti-Patterns & Warnings
- Using deprecated `google.generativeai` package.
- Hardcoding API keys in source files.
