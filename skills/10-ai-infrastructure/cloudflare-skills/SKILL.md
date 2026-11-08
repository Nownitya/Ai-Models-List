---
name: cloudflare-skills
description: Cloudflare Workers edge compute, serverless deployment, Wrangler CLI configuration, KV/D1 database bindings, and global edge caching.
---

# Cloudflare Workers & Edge Infrastructure (`cloudflare/skills`)

> **Priority:** `P0` | **Framework:** `cloudflare/skills` | **Domain:** `10-ai-infrastructure` | **Stars:** `⭐ 3.3k+`

Cloudflare Workers edge compute, serverless deployment, Wrangler CLI configuration, KV/D1 database bindings, and global edge caching.

---

## 🧭 When to Use

* When deploying low-latency APIs and serverless microservices to Cloudflare's global edge network (300+ cities).
* When managing edge state using Cloudflare KV (key-value), D1 (serverless SQLite), Vectorize (vector search), or R2 (object storage).
* When configuring routing rules, custom domain SSL, rate limiting, and web security headers via `wrangler.toml` or `wrangler.jsonc`.

---

## 🎯 Core Capabilities

1. **Edge Runtime Execution**: Sub-millisecond cold starts on V8 isolates with zero server provisioning.
2. **D1 Serverless Database**: Query global SQLite relational databases from Workers with native SQL dialect.
3. **KV & Vectorize Search**: Ultra-fast edge key-value caching and semantic vector indexing for AI retrieval.
4. **Wrangler CLI Integration**: Local simulation, environment secret management, and one-click global deployment.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/cloudflare-skills
```

### Worker Implementation (`src/index.ts`)
```typescript
export interface Env {
  DB: D1Database;
  CACHE_KV: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/health") {
      return Response.json({ status: "healthy", region: request.cf?.colo });
    }

    const { results } = await env.DB.prepare("SELECT id, name FROM users LIMIT 10").all();
    return Response.json(results);
  },
};
```

### CLI Commands
```bash
# Start local development server with miniflare
npx wrangler dev

# Execute migrations on production D1 database
npx wrangler d1 migrations apply my-database --remote

# Deploy to global edge
npx wrangler deploy
```

---

## 📋 Prerequisites

* Node.js 18+
* Cloudflare account & API token
* Wrangler CLI installed (`npm install -g wrangler`)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Attempting to use Node.js native binary C++ add-ons on the V8 edge runtime without polyfills.
* **Anti-Pattern:** Committing raw API secrets or private tokens in `wrangler.toml` instead of using `wrangler secret put`.

