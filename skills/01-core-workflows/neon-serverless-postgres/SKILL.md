---
name: neon-serverless-postgres
description: Neon Serverless Postgres CLI, instant database branching, schema migrations, and connection pooling.
---

# Neon Serverless Postgres & Database Branching (`/neon-serverless-postgres`)

> **Domain:** 01 Core Workflows  
> **Upstream Authority:** [`neondatabase/agent-skills`](https://github.com/neondatabase/agent-skills) (⭐ 111, 5.2k+ Installs)  
> **Slash Command:** `/neon-serverless-postgres`

---

## When to Use

* When developing applications backed by Neon Serverless PostgreSQL with instantaneous copy-on-write database branching.
* When executing risk-free database migrations on isolated staging branches before applying changes to production.
* When configuring serverless connection pooling via PgBouncer or the Neon Serverless Driver over WebSockets / HTTP.

## Prerequisites

* Neon account and API key (`NEON_API_KEY`).
* Neon CLI installed (`npm install -g neonctl`) or Neon SDK.

## Core Capabilities

1. **Instant Database Branching**: Clones schema and data instantaneously using storage-level copy-on-write pointers.
2. **Ephemeral CI Test Databases**: Spins up isolated database branches per pull request and tears them down upon PR merge.
3. **Scale-to-Zero Compute**: Automatically suspends idle compute nodes, reducing idle operational costs.
4. **Serverless Connection Pooling**: Native connection pooling capable of handling tens of thousands of concurrent edge function connections.

## Activation Command

```bash
/neon-serverless-postgres [branch|create|migrate|pool] [--project <id>] [--name <branch-name>]
```

## Workflow & Usage Guide

### 1. Create Staging Branch via Neon CLI

```bash
# Create isolated database branch from main production branch
neonctl branches create --name feature-user-profiles --project-id ep-spring-bird-12345
```

### 2. Connect from Edge / Serverless Function (TypeScript)

```typescript
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Configure WebSockets for non-browser edge environments if needed
if (!globalThis.WebSocket) {
  neonConfig.webSocketConstructor = ws;
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function getUserById(userId: string) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT id, name, email FROM users WHERE id = $1', [userId]);
    return rows[0];
  } finally {
    client.release();
  }
}
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Connecting serverless functions directly to raw Postgres endpoints without connection pooler strings (`-pooler` suffix in hostname).
* **Anti-Pattern:** Leaving orphaned ephemeral PR branches active indefinitely, consuming storage quotas.
* **Warning:** Compute cold starts occur after scaling to zero; use keep-alive pings or pre-warmed compute endpoints for ultra-low latency requirements.

