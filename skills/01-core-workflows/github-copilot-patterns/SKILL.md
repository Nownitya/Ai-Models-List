---
name: github-copilot-patterns
description: Official GitHub Copilot engineering patterns, context window steering, prompt customization, and multi-stage Docker workflows.
---

# GitHub Copilot Engineering Patterns (`/github-copilot-patterns`)

> **Domain:** 01 Core Engineering Workflows  
> **Upstream Authority:** [`github/awesome-copilot`](https://github.com/github/awesome-copilot) (⭐ 40,903)  
> **Slash Command:** `/github-copilot-patterns`

---

## When to Use

* When engineering `.github/copilot-instructions.md` configuration files to steer model responses across a repository.
* When authoring custom prompt templates, slash commands, and specialized domain modes inside GitHub Copilot Workspace and Chat.
* When constructing multi-stage Dockerfiles and containerization manifests with optimal layer caching and security baselines.

## Prerequisites

* Git repository configured with GitHub Copilot access.
* GitHub CLI (`gh`) with Copilot extension installed:
  ```bash
  gh extension install github/gh-copilot
  ```

## Core Capabilities

1. **Repository-Level Instruction Steering**: Standardizes `.github/copilot-instructions.md` with explicit architectural rules and coding standards.
2. **Multi-Stage Container Architecture**: Generates hardened, unprivileged Docker build stages with zero compiler baggage in production images.
3. **Context Anchor Tuning**: Structures `@workspace` index references, path filters, and few-shot examples for high-signal completions.
4. **Automated Review & Explain Prompts**: Reusable prompts for explaining legacy algorithms, debugging race conditions, and drafting PR descriptions.

## Activation Command

```bash
/github-copilot-patterns [scaffold-instructions|multi-stage-docker|tune-prompts] [--scope <directory>]
```

## Workflow & Usage Guide

### 1. Hardened Multi-Stage Dockerfile Pattern

```dockerfile
# syntax=docker/dockerfile:1.4
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

### 2. Copilot Instructions Architecture (`.github/copilot-instructions.md`)

* **Repository Invariants**: TypeScript strict mode, functional composition, error return objects rather than throw.
* **Testing Guidelines**: Vitest / Playwright preferred; mock external network calls at the boundary.
* **Formatting Conventions**: Prettier / ESLint standard configuration; no trailing commas in JSON.

## Anti-Patterns & Warnings

* **Anti-Pattern:** Running Docker containers as `root`; always define and switch to a non-privileged `USER` in production stages.
* **Anti-Pattern:** Leaking `.env` files or API secrets into Docker build contexts without `.dockerignore`.
* **Warning:** Avoid overwhelming `.github/copilot-instructions.md` with redundant boilerplate; keep instructions dense, high-signal, and factual.

