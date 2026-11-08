---
name: nx-monorepo-architect
description: Nrwl Nx monorepo management, computation caching, affected task pipelines, and project graph boundaries.
---

# Nx Monorepo Architecture & Pipeline Engine (`/nx-monorepo-architect`)

> **Domain:** 01 Core Workflows  
> **Upstream Authority:** [`nrwl/nx-ai-agents-config`](https://github.com/nrwl/nx-ai-agents-config) (⭐ 30, 87k+ Installs; Main Repo `nrwl/nx` ⭐ 24,100)  
> **Slash Command:** `/nx-monorepo-architect`

---

## When to Use

* When managing enterprise monorepos containing multiple interconnected frontend applications, shared UI libraries, and backend services.
* When optimizing CI/CD build runtimes via local and distributed computation caching (`nx run-many`, `nx affected`).
* When enforcing strict architectural boundaries and dependency constraints between domains using ESLint `@nx/enforce-module-boundaries`.

## Prerequisites

* Node.js v18+ and an Nx workspace (`nx.json`).
* Package manager (pnpm, yarn, or npm).

## Core Capabilities

1. **Project Graph Analysis**: Automatically maps dependencies and imports across all apps and libraries in the repository.
2. **Affected Task Execution**: Runs build, test, and lint tasks exclusively for projects modified in the current git branch.
3. **Computation Caching**: Replays cached build artifacts and test outputs instantaneously when inputs have not changed.
4. **Module Boundary Enforcement**: Prevents circular dependencies and unauthorized cross-domain imports (e.g. backend importing client UI).

## Activation Command

```bash
/nx-monorepo-architect [graph|affected|cache|lint] [--target <build|test|lint>] [--base <main>]
```

## Workflow & Usage Guide

### 1. Run Affected CI Pipeline

```bash
# Execute tests only on projects impacted by recent commits
nx affected --target=test --base=origin/main --head=HEAD --parallel=3
```

### 2. Module Boundary Lint Rule (`.eslintrc.json`)

```json
{
  "rules": {
    "@nx/enforce-module-boundaries": [
      "error",
      {
        "enforceBuildableLibDependency": true,
        "allow": [],
        "depConstraints": [
          {
            "sourceTag": "scope:client",
            "onlyDependOnLibsWithTags": ["scope:shared", "scope:ui"]
          },
          {
            "sourceTag": "scope:server",
            "onlyDependOnLibsWithTags": ["scope:shared", "scope:backend-utils"]
          }
        ]
      }
    ]
  }
}
```

### 3. Inspect Visual Project Graph

```bash
# Open interactive visual architecture dependency graph
nx graph
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Bypassing Nx task runner by executing direct relative script imports across library directories, bypassing caching.
* **Anti-Pattern:** Uncached artifact targets producing non-deterministic outputs (e.g. embedding random UUIDs or build timestamps in build outputs).
* **Warning:** Ensure distributed CI runners share an authenticated remote cache (e.g. Nx Cloud or self-hosted S3/GCS bucket) to maximize cache hit rates.
