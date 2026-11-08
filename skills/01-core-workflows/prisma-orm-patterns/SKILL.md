---
name: prisma-orm-patterns
description: Prisma ORM schema modeling, type-safe queries, database migrations, and relation filters.
---

# Prisma ORM Architecture & Migration Patterns (`/prisma-orm-patterns`)

> **Domain:** 01 Core Workflows  
> **Upstream Authority:** [`prisma/skills`](https://github.com/prisma/skills) (⭐ 79)  
> **Slash Command:** `/prisma-orm-patterns`

---

## When to Use

* When designing relational database schemas and relationships (1-to-1, 1-to-many, many-to-many) with Prisma ORM.
* When executing deterministic schema migrations (`prisma migrate dev`, `prisma migrate deploy`) across staging and production.
* When authoring type-safe queries, nested writes, and pagination without writing vulnerable raw SQL strings.

## Prerequisites

* TypeScript v5.0+ and Node.js v18+.
* `@prisma/client` and `prisma` CLI installed.

## Core Capabilities

1. **Declarative Schema Modeling**: Defines models, enums, composite keys, and indexing directives in `schema.prisma`.
2. **Type-Safe Query Generation**: Automatically outputs strict TypeScript types for all database operations with compile-time checks.
3. **Migration Engine**: Generates timestamped SQL migration files and manages shadow databases for conflict detection.
4. **Nested Transactions & Relations**: Executes atomic transactions (`$transaction`) and relational eager loading (`include`, `select`).

## Activation Command

```bash
/prisma-orm-patterns [generate|migrate|studio|seed] [--schema <path>]
```

## Workflow & Usage Guide

### 1. Prisma Schema Modeling (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  ADMIN
  EDITOR
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@index([authorId])
}
```

### 2. Transactional Query with Nested Writes

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUserWithInitialPost(email: string, title: string) {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        posts: {
          create: [{ title, published: true }],
        },
      },
      include: { posts: true },
    });
    return user;
  });
}
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Instantiating multiple `new PrismaClient()` instances in Next.js hot-reloading dev environments, exhausting connection limits.
* **Anti-Pattern:** Running `prisma db push` in production environments; always use `prisma migrate deploy` for reproducible migrations.
* **Warning:** Use `select` or `omit` to avoid fetching large text or blob fields across unbounded list queries.

