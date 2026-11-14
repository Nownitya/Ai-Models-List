---
name: playwright-cli
description: End-to-end browser testing, tracing, snapshot comparison, and headless browser automation CLI for Chromium, Firefox, and WebKit.
---

# Playwright Test & Automation Framework (`microsoft/playwright`)

> **Priority:** `P0` | **Framework:** `microsoft/playwright` | **Domain:** `04-testing-and-verification` | **Stars:** `⭐ 71k+`

End-to-end browser testing, tracing, snapshot comparison, and headless browser automation CLI for Chromium, Firefox, and WebKit.

---

## 🧭 When to Use

* When running automated regression and acceptance tests against real web applications.
* When recording network traffic (HAR files) and capturing interactive visual trace dumps.
* When auditing web accessibility (a11y) and responsive viewport layouts.
* When verifying live UI deployments before landing releases.

---

## 🎯 Core Capabilities

1. **Multi-Browser Parity**: Tests run against native rendering engines: Chromium, Firefox, and WebKit across desktop and mobile viewports.
2. **Auto-Waiting & Resilience**: Automatically waits for elements to be actionable before clicking or typing, eliminating arbitrary `sleep()` timeouts.
3. **Trace Viewer**: Deep inspection tool recording screenshots, DOM snapshots, network requests, and console logs per test step.
4. **Code Generation**: Interactive recorder (`playwright codegen`) that outputs TypeScript/Python test scripts based on live user clicks.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/playwright-cli
```

### Test Script Example (`tests/auth.spec.ts`)
```typescript
import { test, expect } from '@playwright/test';

test('login and dashboard access flow', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByLabel('Email address').fill('dev@example.com');
  await page.getByLabel('Password').fill('SecurePassword123!');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
});
```

### CLI Execution
```bash
# Run tests in headless mode across all engines
npx playwright test

# Debug test failure with interactive trace viewer
npx playwright show-trace trace.zip

# Record actions into executable test script
npx playwright codegen http://localhost:3000
```

---

## 📋 Prerequisites

* Node.js 18+ or Python 3.9+
* Playwright browsers installed (`npx playwright install --with-deps`)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Using manual timeouts (`await page.waitForTimeout(5000)`) instead of locator-based web assertions (`await expect(locator).toBeVisible()`).
* **Anti-Pattern:** Writing tests dependent on order of execution or shared test state.

