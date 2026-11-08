---
name: convex-backend-sync
description: Convex reactive backend functions, real-time query subscriptions, mutations, and client state sync.
---

# Convex Reactive Backend & State Sync (`/convex-backend-sync`)

> **Domain:** 01 Core Workflows  
> **Upstream Authority:** [`convex/agent-skills`](https://github.com/convex/agent-skills) (⭐ 69, 666k+ Installs)  
> **Slash Command:** `/convex-backend-sync`

---

## When to Use

* When developing full-stack TypeScript applications requiring zero-latency real-time backend updates and reactive UI subscriptions.
* When replacing REST/GraphQL polling architectures with push-based database synchronization.
* When authoring transactional mutations, database indexing schemes, or scheduled cron background tasks in Convex.

## Prerequisites

* Node.js v18+ and a Convex project (`npx convex dev`).
* Convex client package (`convex` npm dependency).

## Core Capabilities

1. **Reactive Live Queries**: Subscribes UI components to database queries that push automatic differential updates on any mutation.
2. **ACID Transactional Mutations**: Executes atomic multi-document writes with automatic conflict rollback.
3. **Internal & HTTP Actions**: Runs third-party API calls, LLM completions, or long-running tasks without blocking database transactions.
4. **Scheduled Background Jobs**: Native scheduling for deferred task execution, recurring cron routines, and vector embedding pipelines.

## Activation Command

```bash
/convex-backend-sync [init|query|mutation|action|schema] [--table <name>]
```

## Workflow & Usage Guide

### 1. Define Typed Schema (`convex/schema.ts`)

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    channelId: v.string(),
    author: v.string(),
    content: v.string(),
    metadata: v.optional(v.record(v.string(), v.any())),
  }).index("by_channel", ["channelId"]),
});
```

### 2. Implement Reactive Query & Mutation (`convex/messages.ts`)

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listByChannel = query({
  args: { channelId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
      .order("desc")
      .take(50);
  },
});

export const send = mutation({
  args: { channelId: v.string(), author: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("messages", {
      channelId: args.channelId,
      author: args.author,
      content: args.content,
    });
    return id;
  },
});
```

### 3. Consume in React Frontend

```tsx
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function ChatFeed({ channelId }: { channelId: string }) {
  const messages = useQuery(api.messages.listByChannel, { channelId });
  const sendMessage = useMutation(api.messages.send);

  if (messages === undefined) return <div>Connecting to live stream...</div>;

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg._id}><strong>{msg.author}:</strong> {msg.content}</div>
      ))}
    </div>
  );
}
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Calling external third-party network APIs inside `query` or `mutation` handlers; always isolate external I/O inside `action` functions.
* **Anti-Pattern:** Omitting database indexes for high-frequency queries, leading to full-table scans that consume excessive execution quotas.
* **Warning:** Database mutations in Convex are transactional and optimistic; heavy long-running computation should be offloaded to background actions.
