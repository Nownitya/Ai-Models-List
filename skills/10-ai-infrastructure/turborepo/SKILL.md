---
name: turborepo
description: High-performance monorepo build orchestration, multi-package task pipeline caching, and dependency graph optimization.
---

# Turborepo Build Orchestration (`vercel/turborepo`)

> **Priority:** `P1` | **Framework:** `vercel/turborepo` | **Domain:** `10-ai-infrastructure` | **Stars:** `⭐ 31k+`

High-performance monorepo build orchestration, multi-package task pipeline caching, and dependency graph optimization.

---

## 🧭 When to Use

* When managing large JavaScript/TypeScript monorepos with multiple apps and shared packages.
* When scaling CI/CD build and test times using incremental computation and remote caching.
* When organizing shared component design systems, utility libraries, and backend APIs with clean dependency boundaries.

---

## 🎯 Core Capabilities

1. **Incremental Computation**: Never rebuilds or retests unchanged code; caches inputs and outputs deterministically.
2. **Task Graph Parallelization**: Schedules tasks in topological order across maximum available CPU cores.
3. **Remote Caching**: Shares build artifact caches across all team members and CI/CD runners to reduce build times by up to 85%.
4. **Environment Variable Hashing**: Automatically tracks environment variables influencing build outputs to prevent stale cache hits.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/turborepo
```

### Configuration (`turbo.json`)
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"]
    },
    "lint": {}
  }
}
```

### Monorepo Task Execution
```bash
# Run build across all workspaces in parallel
turbo run build

# Run tests only for changed packages against main
turbo run test --filter=...[origin/main]
```

---

## 📋 Prerequisites

* Node.js 18+ or Bun
* Monorepo workspace package manager (`pnpm`, `npm`, `yarn`, or `bun`)
* Root `turbo.json` configuration file

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Omitting output directories in `turbo.json`, causing Turborepo to cache empty states.
* **Anti-Pattern:** Leaking unhashed filesystem state or non-deterministic build timestamps into artifacts.

