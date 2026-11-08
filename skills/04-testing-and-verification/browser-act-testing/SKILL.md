---
name: browser-act-testing
description: Autonomous browser actor simulation, synthetic end-to-end user journeys, session record-and-replay, and journey stress-testing.
---

# Browser Act Synthetic Journey Testing (`/browser-act-testing`)

> **Domain:** 04 Testing and Verification  
> **Upstream Authority:** [`browser-act/skills`](https://github.com/browser-act/skills) (⭐ 6,331)  
> **Slash Command:** `/browser-act-testing`

---

## When to Use

* When simulating realistic synthetic user behaviors (typing speed jitter, mouse path wandering, scroll pauses) for anti-bot tolerance testing.
* When recording complex user journeys in a browser and compiling them into reproducible, automated Playwright/Puppeteer test suites.
* When fuzz-testing web forms, multi-page onboarding wizards, and shopping cart checkouts with stochastic input permutations.

## Prerequisites

* Node.js 18+ or Python 3.10+ runtime.
* Browser Act test runner installed:
  ```bash
  npm install -g @browser-act/runner
  ```
* Chromium browser installed via Playwright:
  ```bash
  npx playwright install chromium
  ```

## Core Capabilities

1. **Humanized Interaction Synthesis**: Simulates Bezier mouse curves, variable keystroke delays, and natural reading scroll pauses.
2. **Session Recording to Test Spec**: Records live browser navigation sessions into structured JSON-RPC or TypeScript test specs.
3. **Stochastic Form Fuzzing**: Automatically generates edge-case boundary inputs (long unicode, SQL injection strings, boundary nulls) on input fields.
4. **Visual Journey Playback**: Replays completed journeys with embedded DOM snapshot overlays and step-by-step latency metrics.

## Activation Command

```bash
/browser-act-testing [record-journey|replay-journey|fuzz-form|stress-test] [--scenario <path>]
```

## Workflow & Usage Guide

### 1. Recording a Synthetic User Journey

```bash
browser-act record --target https://example.com/checkout --output ./scenarios/checkout-journey.json
```

### 2. Replaying with Humanized Delays & Visual Assertions

```bash
browser-act replay ./scenarios/checkout-journey.json \
  --humanize-delays \
  --capture-failures \
  --output-dir ./reports/run-01/
```

### 3. Key Synthetic Journey Metrics Evaluated

* **Time to First Interactive (TTFI)**: Measures friction before users can initiate action.
* **Form Completion Drop-off**: Detects steps where validation errors or unexpected re-renders stall user progress.
* **Network Payload Invariants**: Verifies no sensitive tokens or excessive payload sizes are leaked during form transitions.

## Anti-Patterns & Warnings

* **Anti-Pattern:** Recording tests on ephemeral test data that expires, causing replayed journeys to fail due to stale database state.
* **Anti-Pattern:** Asserting strictly on absolute pixel coordinates instead of semantic element presence.
* **Warning:** Never run automated synthetic payment journeys against live production Stripe/PayPal credentials; always use sandbox test cards.

