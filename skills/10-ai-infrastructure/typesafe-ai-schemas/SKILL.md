---
name: typesafe-ai-schemas
description: Strict JSON schema validation, typed function calling, deterministic structured output invariants, and runtime model guards.
---

# TypeSafe AI Schemas & Invariant Guards (`/typesafe-ai-schemas`)

> **Domain:** 10 AI Infrastructure & Runtime  
> **Upstream Authority:** [`typesafe-ai/skills`](https://github.com/typesafe-ai/skills) (⭐ 2,886)  
> **Slash Command:** `/typesafe-ai-schemas`

---

## When to Use

* When defining strict JSON Schema or Zod / Pydantic schemas for LLM function calling and structured outputs.
* When guarding against hallucinated keys, missing required properties, or out-of-bounds enum values at runtime.
* When building robust retry and repair loops for malformed model responses with automatic JSON-RPC error mapping.

## Prerequisites

* TypeScript 5.0+ or Python 3.10+ runtime.
* Validation engine installed:
  ```bash
  npm install zod @typesafe-ai/schema
  # or
  pip install pydantic typesafe-ai
  ```

## Core Capabilities

1. **Deterministic Structured Outputs**: Converts typed schemas (Zod/Pydantic) into standard JSON Schema drafts compatible with OpenAI, Anthropic, and Gemini structured output modes.
2. **Schema Invariant Checking**: Enforces `additionalProperties: false`, required key non-nullability, and string pattern constraints.
3. **Automated Schema Repair Loops**: Automatically feeds validation errors back to the model with targeted correction hints.
4. **Zero-Overhead Serialization**: Serializes and validates payloads with high throughput and low CPU overhead.

## Activation Command

```bash
/typesafe-ai-schemas [generate-schema|validate-payload|repair-loop|audit] [--schema <file>]
```

## Workflow & Usage Guide

### 1. Defining a Strict Zod Schema for Model Generation

```typescript
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const AnalysisReportSchema = z.object({
  status: z.enum(['SUCCESS', 'WARNING', 'FAILURE']),
  confidence: z.number().min(0).max(1),
  summary: z.string().min(10).max(300),
  findings: z.array(
    z.object({
      ruleId: z.string(),
      severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
      description: z.string()
    })
  ).default([])
}).strict(); // Invariant: No undocumented extra fields allowed

export type AnalysisReport = z.infer<typeof AnalysisReportSchema>;
export const jsonSchema = zodToJsonSchema(AnalysisReportSchema, 'AnalysisReport');
```

### 2. Runtime Guard & Automatic Repair Loop

```typescript
export async function parseWithRepair<T>(
  rawJson: string,
  schema: z.ZodType<T>,
  repairFn: (error: string) => Promise<string>
): Promise<T> {
  try {
    const parsed = JSON.parse(rawJson);
    return schema.parse(parsed);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    const correctedJson = await repairFn(errorMsg);
    return schema.parse(JSON.parse(correctedJson));
  }
}
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Omitting `.strict()` or `additionalProperties: false`, allowing models to emit arbitrary unwanted hallucinations.
* **Anti-Pattern:** Using permissive `z.any()` or `z.unknown()` in tool call argument definitions, defeating type safety.
* **Warning:** Extremely deep recursive schema definitions can exceed model grammar token limits in constrained structured decoding engines.

