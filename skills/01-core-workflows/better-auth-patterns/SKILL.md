---
name: better-auth-patterns
description: Better Auth modern TypeScript authentication, passkeys/WebAuthn, 2FA, session management, and RBAC.
---

# Better Auth Authentication & Identity Patterns (`/better-auth-patterns`)

> **Domain:** 01 Core Workflows  
> **Upstream Authority:** [`better-auth/skills`](https://github.com/better-auth/skills) (⭐ 228, 131k+ Installs; Main Repo `better-auth/better-auth` ⭐ 15,200)  
> **Slash Command:** `/better-auth-patterns`

---

## When to Use

* When implementing secure, framework-agnostic TypeScript authentication in Next.js, Nuxt, SvelteKit, Astro, or Express.
* When adding Passkey (WebAuthn), Two-Factor Authentication (TOTP), Magic Links, or Social OAuth providers.
* When configuring fine-grained Role-Based Access Control (RBAC), multi-tenant organizations, and session cookie rotation.

## Prerequisites

* TypeScript v5.0+ and Node.js v18+.
* Database adapter (Prisma, Drizzle, Kysely, or raw SQL).

## Core Capabilities

1. **Type-Safe Auth Engine**: End-to-end typed user sessions, accounts, verifications, and plugins.
2. **Modern Credential Support**: Passkeys, WebAuthn, TOTP two-factor codes, passwordless email OTPs, and traditional passwords with Argon2/bcrypt.
3. **Multi-Tenant Organizations**: Built-in team management, invitations, member roles, and permission gates.
4. **Framework Adapters**: Zero-config middleware for Next.js App Router, Remi, SvelteKit, and Hono.

## Activation Command

```bash
/better-auth-patterns [setup|plugin|schema|middleware] [--provider <name>]
```

## Workflow & Usage Guide

### 1. Configure Better Auth Server Instance (`lib/auth.ts`)

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { twoFactor, passkey, organization } from "better-auth/plugins";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [
    twoFactor(),
    passkey(),
    organization(),
  ],
});
```

### 2. Client Authentication Hook Usage

```typescript
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient();

export async function signInWithPasskey() {
  const { data, error } = await authClient.signIn.passkey();
  if (error) {
    console.error("Passkey sign-in failed:", error.message);
    return;
  }
  console.log("Authenticated user:", data.user);
}
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Storing sensitive session tokens in client-accessible `localStorage`; always enforce `HttpOnly`, `SameSite=Lax`, and `Secure` cookie flags.
* **Anti-Pattern:** Skipping database index creation on session tokens and user ID foreign keys, degrading auth throughput under load.
* **Warning:** In development over `http://localhost`, passkey WebAuthn relies on relaxed browser origins; production deployments require valid HTTPS certificates.
