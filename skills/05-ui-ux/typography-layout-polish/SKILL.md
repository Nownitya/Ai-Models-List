---
name: typography-layout-polish
description: Better typography scales, fluid font sizing, optical margin alignment, visual rhythm, and tactile layout polish by Jakub Krehel.
---

# Typography & Layout Polish (`/typography-layout-polish`)

> **Domain:** 05 UI UX Design  
> **Upstream Authority:** [`jakubkrehel/skills`](https://github.com/jakubkrehel/skills) (⭐ 11,517)  
> **Slash Command:** `/typography-layout-polish`

---

## When to Use

* When establishing typographic systems, fluid type scales (`clamp()`), and harmonious heading/body ratios.
* When refining line lengths (45–75 characters per line), vertical rhythm, and line-heights across viewports.
* When fixing typography blunders: loose tracking on large headings, un-spaced small caps, or orphan words in responsive text containers.

## Prerequisites

* Modern CSS / Tailwind CSS / Styled Components environment.
* High-quality web font setup (system font stacks, Inter, Geist, or variable web fonts).

## Core Capabilities

1. **Fluid Typography Scales**: Implements mathematical type scales using CSS `clamp()` without sudden media query jumps.
2. **Optical Text Polishing**: Applies CSS `text-wrap: balance` for headings, `text-wrap: pretty` for body text, and negative letter-spacing on display types.
3. **Vertical Rhythm & Grid Baseline**: Aligns component paddings, card gutters, and line-heights to an 4px/8px spatial rhythm grid.
4. **Number & Monospace Formatting**: Applies `font-variant-numeric: tabular-nums` for data tables, metrics counters, and dashboards.

## Activation Command

```bash
/typography-layout-polish [audit|fluid-scale|balance-headings|tabular-nums] [--target <css-or-html>]
```

## Workflow & Usage Guide

### 1. Fluid Typography Scale Formula

```css
:root {
  /* Major Second (1.125) mobile -> Perfect Fourth (1.333) desktop */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lg: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.35rem + 0.75vw, 2rem);
  --text-2xl: clamp(2rem, 1.75rem + 1.25vw, 3rem);
  --text-display: clamp(2.5rem, 2rem + 2.5vw, 4.5rem);
}
```

### 2. Optical Polish Checklist for Headings & Display

* **Tracking**: Tighter tracking on display text (`letter-spacing: -0.025em` on h1/h2; `-0.035em` on display).
* **Line Height**: Tighter line height on large text (h1: `line-height: 1.1`; h2: `line-height: 1.2`; body: `line-height: 1.6`).
* **Text Wrap**: Add `text-wrap: balance` to prevent orphan words on the final line of headings.
* **Metrics & Tables**: Always enable `font-variant-numeric: tabular-nums` to prevent layout jitter on live counters.

## Anti-Patterns & Warnings

* **Anti-Pattern:** Setting line heights in fixed pixel units rather than unit-less multipliers (e.g. `1.5` instead of `24px`).
* **Anti-Pattern:** Excessively long line lengths (>80 characters per line) on widescreen monitors that cause reading fatigue.
* **Warning:** Avoid applying `text-wrap: balance` to long body paragraphs; it has a performance cost and can cause layout recalculations.
