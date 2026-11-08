---
name: supabase-skills
description: Supabase Postgres database design, pgvector semantic search, row-level security (RLS) policies, edge functions, and client SDK integration.
---

# Supabase Postgres Architecture (`supabase/agent-skills`)

> **Priority:** `P0` | **Framework:** `supabase/agent-skills` | **Domain:** `10-ai-infrastructure` | **Stars:** `⭐ 3.0k+`

Supabase Postgres database design, pgvector semantic search, row-level security (RLS) policies, edge functions, and client SDK integration.

---

## 🧭 When to Use

* When designing relational database schemas on PostgreSQL with strict foreign keys, indexes, and constraints.
* When implementing AI vector search, hybrid retrieval, and cosine similarity with `pgvector`.
* When enforcing multi-tenant authorization and user data isolation directly in SQL using Row-Level Security (RLS).
* When deploying serverless Edge Functions (Deno/TypeScript) for backend operations.

---

## 🎯 Core Capabilities

1. **Row-Level Security (RLS)**: Cryptographically binds database rows to authenticated users (`auth.uid()`), protecting against compromised client queries.
2. **pgvector Semantic Search**: Stores and queries high-dimensional embeddings with HNSW indexing for real-time semantic retrieval.
3. **Database Migrations & Branching**: Manages deterministic schema migrations locally with Docker and syncs seamlessly to production.
4. **Realtime CDC (Change Data Capture)**: Subscribes to database INSERT/UPDATE/DELETE events over WebSockets.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/supabase-skills
```

### PostgreSQL RLS & Vector Schema Example
```sql
-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create documents table with embeddings
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enforce Row-Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only read their own documents"
  ON documents FOR SELECT
  USING (auth.uid() = user_id);
```

### TypeScript Client Query
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

const { data, error } = await supabase
  .from('documents')
  .select('id, content')
  .limit(10);
```

---

## 📋 Prerequisites

* Docker installed for local Supabase emulation (`supabase start`)
* Supabase CLI (`npm install -g supabase`)
* Target database project URL and Service Role / Anon keys

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Leaving tables without Row-Level Security enabled (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`), exposing data to the public anon key.
* **Anti-Pattern:** Running schema modifications directly in the web dashboard SQL editor without committing version-controlled migration files.
