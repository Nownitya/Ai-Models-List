---
name: vercel-react-patterns
description: Vercel Labs production React composition patterns, Server Components architecture, web design guidelines, and performance practices.
---

# Vercel React Patterns & Design (`vercel-labs/agent-skills`)

> **Priority:** `P0` | **Framework:** `vercel-labs/agent-skills` | **Domain:** `05-ui-ux` | **Stars:** `⭐ 33k+`

Vercel Labs production React composition patterns, Server Components architecture, web design guidelines, and performance practices.

---

## 🧭 When to Use

* When architecting React Server Components (RSC) and Client Components boundaries in Next.js.
* When structuring compound component APIs with clean slot composition.
* When optimizing web performance (minimizing hydration payload, preventing layout shifts).
* When establishing design consistency across responsive web applications.

---

## 🎯 Core Capabilities

1. **RSC Boundary Optimization**: Pushes client state to leaf nodes while streaming server-rendered markup directly to users.
2. **Compound Component Composition**: Provides flexible component slots (`Header`, `Content`, `Footer`) over rigid prop drilling.
3. **Suspense & Streaming**: Implements progressive fallback skeletons during asynchronous data loading.
4. **Accessible Micro-Interactions**: Enforces focus management, keyboard accessibility, and contrast compliance.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/vercel-react-patterns
```

### Server Component Composition Pattern
```tsx
import { Suspense } from "react";
import { UserProfileSkeleton } from "@/components/skeletons";

export default async function DashboardPage() {
  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Suspense fallback={<UserProfileSkeleton />}>
        <AsyncUserProfile />
      </Suspense>
    </main>
  );
}

async function AsyncUserProfile() {
  const user = await fetchUserData();
  return <div className="card p-6 bg-slate-900">{user.name}</div>;
}
```

---

## 📋 Prerequisites

* React 18+ or React 19, Next.js 14/15 App Router
* TypeScript 5.0+

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Marking entire layout roots with `'use client'`, destroying server-rendering advantages.
* **Anti-Pattern:** Fetching data inside `useEffect()` on the client when it could be resolved server-side.
