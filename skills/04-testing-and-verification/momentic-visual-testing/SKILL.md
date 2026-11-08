---
name: momentic-visual-testing
description: AI-driven visual regression testing, session replay analysis, and automated test failure triage with Momentic AI.
---

# Momentic Visual Testing & AI Triage (`/momentic-visual-testing`)

> **Domain:** 04 Testing and Verification  
> **Upstream Authority:** [`momentic-ai/skills`](https://github.com/momentic-ai/skills) (⭐ 17, 137k+ Installs)  
> **Slash Command:** `/momentic-visual-testing`

---

## When to Use

* When traditional E2E assertions break due to benign DOM restructuring, dynamic class names, or minor design updates.
* When executing visual regression scans across responsive breakpoints, dark/light themes, and localized UI states.
* When triaging test failure runs using AI session replays that distinguish true application defects from flaky network glitches.

## Prerequisites

* Momentic AI account and API token (`MOMENTIC_API_KEY`).
* Node.js v18+ test harness (Playwright, Cypress, or Jest).

## Core Capabilities

1. **AI Visual Assertions**: Evaluates visual intent and layout fidelity rather than brittle pixel-by-pixel binary diffs.
2. **Autonomous Step Healing**: Automatically adapts locator strategies when IDs, classes, or DOM hierarchy shift between releases.
3. **Session Replay Diagnostics**: Captures console logs, network waterfalls, and DOM snapshots leading up to test failures.
4. **Flakiness Detection**: Quantifies timing dependencies and asynchronous race conditions across distributed test runs.

## Activation Command

```bash
/momentic-visual-testing [run|assert|triage|heal] [--suite <name>] [--env <url>]
```

## Workflow & Usage Guide

### 1. Visual Assertion in Playwright Test

```typescript
import { test } from '@playwright/test';
import { momenticAssert } from '@momentic/playwright';

test('Verify checkout review screen visual hierarchy', async ({ page }) => {
  await page.goto('/checkout/review');
  await page.waitForLoadState('networkidle');

  // AI-powered visual assertion evaluating layout integrity and missing elements
  await momenticAssert(page, {
    description: "The order total is clearly displayed, promo discount is applied, and the Pay Now button is active and unobstructed.",
    allowDynamicText: ["Order #", "Estimated delivery"],
    threshold: 0.95
  });
});
```

### 2. Autonomous Test Run Triage

```bash
# Triage recent test failures across CI runs
momentic triage --run-id 8921 --slack-notify
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Running visual assertions against unseeded dynamic timestamps or volatile advertising banners without masking rules.
* **Anti-Pattern:** Replacing deterministic unit test logic with visual assertions; visual testing should validate presentation and end-to-end user journeys.
* **Warning:** Ensure staging environments disable non-deterministic animations (`prefers-reduced-motion: reduce`) to ensure consistent visual snapshots.
