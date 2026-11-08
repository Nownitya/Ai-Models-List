---
name: clerk-auth-identity
description: Clerk identity management, multi-tenant organizations, webhook signature verification, and session tokens.
---

# Clerk Identity & Multi-Tenant Authentication (`/clerk-auth-identity`)

> **Domain:** 01 Core Workflows  
> **Upstream Authority:** [`clerk/skills`](https://github.com/clerk/skills) (⭐ 93)  
> **Slash Command:** `/clerk-auth-identity`

---

## When to Use

* When implementing enterprise user authentication, B2B multi-tenant organization workspaces, and role-based permissions in React/Next.js.
* When verifying Svix webhook events from Clerk (e.g., `user.created`, `organizationMembership.updated`) with cryptographic signature checks.
* When protecting server API routes, Server Actions, and client components using Clerk session claims.

## Prerequisites

* Clerk account and API keys (`CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`).
* Node.js v18+ runtime.

## Core Capabilities

1. **Drop-in UI & Components**: Pre-styled `<SignIn />`, `<SignUp />`, `<UserProfile />`, and `<OrganizationSwitcher />` components.
2. **B2B Organization Workspaces**: Complete multi-tenant support with member invitations, role hierarchies, and organization switching.
3. **Cryptographic Webhook Verification**: Verifies incoming Svix headers (`svix-id`, `svix-timestamp`, `svix-signature`) to prevent spoofing.
4. **Middleware Session Protection**: Universal edge middleware (`clerkMiddleware`) enforcing route protection rules.

## Activation Command

```bash
/clerk-auth-identity [setup|middleware|webhook|orgs] [--framework <nextjs|react|express>]
```

## Workflow & Usage Guide

### 1. Route Protection Middleware (`middleware.ts`)

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
  '/'
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

### 2. Cryptographic Webhook Handler (`app/api/webhooks/route.ts`)

```typescript
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response('Error verifying webhook', { status: 400 });
  }

  if (evt.type === 'user.created') {
    console.log('New user registered:', evt.data.id);
  }

  return new Response('Webhook received', { status: 200 });
}
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Bypassing Svix webhook signature verification, exposing database syncing endpoints to malicious HTTP spoofing.
* **Anti-Pattern:** Trusting unverified client-side user metadata for critical backend authorization decisions.
* **Warning:** Ensure clock skew on server infrastructure stays within 5 minutes to prevent valid webhook signatures from expiring.

