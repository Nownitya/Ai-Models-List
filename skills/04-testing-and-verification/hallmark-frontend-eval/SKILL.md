---
name: hallmark-frontend-eval
description: Automated frontend design fidelity evaluation, pixel-level visual regression, and AI component assessment by Hassan El Mghari.
---

# Hallmark Frontend Evaluation (`/hallmark-frontend-eval`)

> **Domain:** 04 Testing and Verification  
> **Upstream Authority:** [`nutlope/hallmark`](https://github.com/nutlope/hallmark) (⭐ 50,287)  
> **Slash Command:** `/hallmark-frontend-eval`

---

## When to Use

* When evaluating generated frontend components against high-fidelity Figma designs or reference screenshots.
* When executing visual regression testing across breakpoints (mobile, tablet, desktop) to detect layout drift.
* When auditing responsive spacing, color contrast ratios, font rendering, and border-radius consistency before production merge.

## Prerequisites

* Chromium/Playwright or Puppeteer environment configured for headless screenshot capture:
  ```bash
  npx playwright install chromium
  ```
* Hallmark evaluation harness or visual comparison tooling installed:
  ```bash
  npm install -g @hallmark/eval
  ```

## Core Capabilities

1. **Pixel & Perceptual Diffing**: Computes exact pixel mismatches and structural similarity index (SSIM) between target and reference renders.
2. **Design System Adherence**: Verifies whether rendered CSS styles strictly map to tokenized variables (Tailwind tokens or CSS variables).
3. **Multi-Viewport Consistency**: Automatically captures and audits standard viewports: 375px (mobile), 768px (tablet), 1280px (desktop), 1920px (ultrawide).
4. **Interactive State Verification**: Audits hover, focus-visible, active, disabled, and empty states for UI controls.

## Activation Command

```bash
/hallmark-frontend-eval [compare|audit-component|regression-suite] [--reference <path>] [--target <url-or-html>]
```

## Workflow & Usage Guide

### 1. Running a Visual Regression Audit

```bash
# Capture screenshots and generate visual diff report
hallmark compare \
  --reference ./design-tokens/hero-reference.png \
  --target http://localhost:3000 \
  --threshold 0.05 \
  --output ./reports/visual-diff.html
```

### 2. Automated Component Scoring Rubric

* **Layout & Geometry (30%)**: Flexbox/grid alignment, container padding, margin collapse, and aspect ratio fidelity.
* **Typography & Hierarchy (25%)**: Font family loading, font weight, line-height, letter-spacing, and truncation handling.
* **Color & Contrast (25%)**: Foreground/background WCAG AA compliance (4.5:1 for body, 3:1 for large text).
* **Interactive State Polish (20%)**: Focus ring presence, transition timing curves, and elevation changes.

## Anti-Patterns & Warnings

* **Anti-Pattern:** Running visual regression tests on un-mocked dynamic content (e.g. live clocks, randomized avatars) causing flaky diffs.
* **Anti-Pattern:** Setting perceptual diff thresholds too loose (>15%), allowing significant layout breakage to pass CI unnoticed.
* **Warning:** Ensure font rendering differences across operating systems (macOS font smoothing vs Windows ClearType) are normalized in headless Docker runners.

