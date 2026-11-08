---
name: vercel-agent-browser
description: Headless browser agent automation, DOM inspection, semantic accessibility tree navigation, and interactive web journeys by Vercel Labs.
---

# Vercel Agent Browser Automation (`/vercel-agent-browser`)

> **Domain:** 01 Core Engineering Workflows  
> **Upstream Authority:** [`vercel-labs/agent-browser`](https://github.com/vercel-labs/agent-browser) (⭐ 46,833)  
> **Slash Command:** `/vercel-agent-browser`

---

## When to Use

* When automating headless browser interactions, authenticated user flows, and dynamic client-side rendering tests.
* When navigating websites using semantic accessibility trees (`axTree`) rather than brittle CSS or XPath selectors.
* When executing multi-step form fills, screenshot captures, and end-to-end journey verifications within agent harnesses.

## Prerequisites

* Node.js 18+ or Python 3.10+ runtime.
* Headless browser dependencies installed:
  ```bash
  npm install -g @vercel/agent-browser
  npx playwright install chromium
  ```
* Display or virtual framebuffer (Xvfb) configured for Linux environments if running non-headless.

## Core Capabilities

1. **Accessibility Tree Navigation**: Interacts with web pages by understanding ARIA roles, labels, and bounding boxes.
2. **Deterministic Step Execution**: Waits for network idle, DOM hydration, and element visibility before dispatching input events.
3. **Multi-Tab & Frame Isolation**: Manages complex sub-frame interactions, modals, and cross-origin iframe navigation.
4. **Har & Screenshot Telemetry**: Captures network traces, console logs, and visual evidence artifacts for failed interactions.

## Activation Command

```bash
/vercel-agent-browser [browse|extract|record|test-flow] [--url <url>] [--session <id>]
```

## Workflow & Usage Guide

### 1. Launching an Autonomous Navigation Session

```typescript
import { AgentBrowser } from '@vercel/agent-browser';

const browser = new AgentBrowser({
  headless: true,
  viewport: { width: 1280, height: 800 }
});

await browser.open('https://example.com/login');
await browser.fillRole('textbox', 'Email', 'engineer@example.com');
await browser.fillRole('textbox', 'Password', process.env.SECRET_PASS);
await browser.clickRole('button', 'Sign In');
await browser.waitForUrl('**/dashboard');
```

### 2. Semantic Accessibility Tree Querying

```bash
agent-browser inspect https://example.com --tree --depth 3
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Hardcoding fragile absolute pixel offsets or dynamic obfuscated class names (`.css-1a2b3c`).
* **Anti-Pattern:** Polling with fixed sleep timers instead of explicit DOM event waiters (`waitForSelector`, `waitForNetworkIdle`).
* **Warning:** Never use agent browser to bypass anti-bot mechanisms, CAPTCHAs, or violate website Terms of Service.
