---
name: currents-playwright-sharding
description: Playwright test sharding, parallel CI optimization, flaky test mitigation, and Currents dashboard orchestration.
---

# Currents Playwright Sharding & CI Optimization (`/currents-playwright-sharding`)

> **Domain:** 04 Testing and Verification  
> **Upstream Authority:** [`currents-dev/playwright-best-practices-skill`](https://github.com/currents-dev/playwright-best-practices-skill) (⭐ 418)  
> **Slash Command:** `/currents-playwright-sharding`

---

## When to Use

* When Playwright test suites take longer than 15 minutes in CI and need intelligent multi-machine sharding to run under 3 minutes.
* When identifying, tagging, and quarantining non-deterministic flaky tests without masking underlying product bugs.
* When streaming real-time test run metrics, artifacts (traces, videos, screenshots), and error analytics to the Currents dashboard.

## Prerequisites

* Playwright test configuration (`playwright.config.ts`).
* Currents API key or GitHub Actions / GitLab CI parallel matrix setup.

## Core Capabilities

1. **Optimal Test Sharding**: Dynamically balances test specs across parallel worker containers based on historical execution duration.
2. **Flakiness Detection & Quarantine**: Flags intermittently failing tests across commits, preventing false-positive CI build blockades.
3. **Artifact Streaming**: Uploads Playwright traces, network HAR logs, and failure screenshots directly to cloud storage.
4. **CI Matrix Generation**: Configures GitHub Actions and GitLab CI job matrices for automated fan-out and fan-in aggregation.

## Activation Command

```bash
/currents-playwright-sharding [shard|config|flaky-audit|ci-matrix] [--workers <n>]
```

## Workflow & Usage Guide

### 1. Hardened Playwright Config (`playwright.config.ts`)

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? '50%' : undefined,
  reporter: process.env.CI ? [
    ['html', { open: 'never' }],
    ['@currents/playwright']
  ] : 'list',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

### 2. GitHub Actions Parallel Sharding Matrix (`.github/workflows/e2e.yml`)

```yaml
jobs:
  e2e:
    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Unbounded retry counts (`retries: 5`) masking underlying race conditions and multiplying cloud compute costs.
* **Anti-Pattern:** Static alphabetical test sharding where one shard gets all slow E2E flows and finishes 10x slower than other shards.
* **Warning:** Ensure staging databases and auth states are seeded hermetically per worker container to avoid parallel test collisions.

