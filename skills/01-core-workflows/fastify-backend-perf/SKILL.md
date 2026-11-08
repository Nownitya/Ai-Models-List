---
name: fastify-backend-perf
description: High-throughput Node.js backend architecture, low-overhead routing, schema compilation, and Pino structured logging by Matteo Collina.
---

# Fastify High-Performance Backend Architecture (`/fastify-backend-perf`)

> **Domain:** 01 Core Engineering Workflows  
> **Upstream Authority:** [`mcollina/skills`](https://github.com/mcollina/skills) (⭐ 1,963)  
> **Slash Command:** `/fastify-backend-perf`

---

## When to Use

* When engineering high-throughput microservices, API gateways, or AI proxy servers in Node.js / TypeScript.
* When optimizing route matching performance with Fastify's Radix tree router and `fast-json-stringify` response serialization.
* When implementing asynchronous structured logging with Pino and clean plugin encapsulation with `fastify-plugin`.

## Prerequisites

* Node.js 18+ or 20+ LTS runtime.
* Fastify and core ecosystem libraries installed:
  ```bash
  npm install fastify fastify-plugin pino
  npm install -D @types/node typescript
  ```

## Core Capabilities

1. **Schema-Driven Serialization**: Uses pre-compiled JSON schemas to achieve 2x faster JSON serialization compared to `JSON.stringify`.
2. **Encapsulated Plugin Architecture**: Isolates decorators, hooks, and database connectors cleanly using `fastify-plugin`.
3. **Structured Zero-Overhead Logging**: Native Pino logger integration with asynchronous stream piping and redaction rules.
4. **Graceful Shutdown & Lifecycle Hooks**: Robust handling of `onRequest`, `preHandler`, `onResponse`, and `onClose` hooks for zero-downtime restarts.

## Activation Command

```bash
/fastify-backend-perf [scaffold-server|benchmark|add-plugin|audit-hooks] [--port <number>]
```

## Workflow & Usage Guide

### 1. Minimal High-Throughput Fastify Server

```typescript
import Fastify from 'fastify';

const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    redact: ['req.headers.authorization', 'req.headers.cookie']
  }
});

// Compiled schema for response acceleration & validation
const healthSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        timestamp: { type: 'string' },
        uptime: { type: 'number' }
      },
      required: ['status', 'timestamp', 'uptime']
    }
  }
};

server.get('/health', { schema: healthSchema }, async (request, reply) => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
```

### 2. Encapsulated Plugin Pattern

```typescript
import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';

const dbPlugin: FastifyPluginAsync = async (fastify, options) => {
  // Decorate fastify instance
  fastify.decorate('db', { query: async () => [] });
  fastify.addHook('onClose', async (instance) => {
    // Graceful database disconnection
  });
};

export default fp(dbPlugin, { name: 'db-plugin' });
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Using blocking synchronous code (e.g. `fs.readFileSync`) inside Fastify route handlers, stalling the Node.js event loop.
* **Anti-Pattern:** Omitting route validation and response schemas, forfeiting Fastify's speed advantages and request safety.
* **Warning:** Ensure plugins intended for global scope are properly wrapped with `fastify-plugin`; otherwise Fastify's encapsulation will restrict their visibility.
