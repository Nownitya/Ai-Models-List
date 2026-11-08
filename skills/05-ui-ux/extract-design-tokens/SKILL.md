---
name: extract-design-tokens
description: Automated extraction of design tokens, color swatches, typography scales, and CSS variables from live websites.
---

# Design Token & System Extractor (`/extract-design-tokens`)

> **Domain:** 05 UI UX Design  
> **Upstream Authority:** [`arvindrk/extract-design-system`](https://github.com/arvindrk/extract-design-system) (⭐ 272, 131k+ Installs)  
> **Slash Command:** `/extract-design-tokens`

---

## When to Use

* When onboarding an unstandardized codebase and needing to reverse-engineer an existing design system into clean design tokens.
* When extracting typography hierarchies, color palettes, border radii, and spacing scales from live web applications or Figma exports.
* When synchronizing design token standards between engineering codebases (Tailwind config, CSS variables) and design tools.

## Prerequisites

* Node.js v18+ runtime.
* Headless browser environment (Puppeteer or Playwright).

## Core Capabilities

1. **Computed Style Mining**: Traverses DOM nodes to sample and cluster recurring color hex codes, line heights, and font weights.
2. **Palette Clustering**: Automatically identifies primary brand colors, neutral grayscale scales, semantic alert hues, and background shades.
3. **Typography Scale Normalization**: Groups pixel font sizes into modular type scales (`sm`, `base`, `lg`, `xl`, `2xl`, etc.).
4. **Multi-Format Export**: Generates Tailwind CSS configuration (`tailwind.config.js`), CSS Variables (`:root {}`), Style Dictionary JSON, and Figma Tokens format.

## Activation Command

```bash
/extract-design-tokens [extract|analyze|export] <url-or-css> [--format <tailwind|css|json>]
```

## Workflow & Usage Guide

### 1. Extract Tokens from Live Site

```bash
# Extract design tokens from live staging web application
npx extract-design-tokens https://app.example.com --format tailwind --output ./tokens.json
```

### 2. Export Generated CSS Variables

```css
:root {
  /* Color Palette */
  --color-brand-primary: #3b82f6;
  --color-brand-accent: #10b981;
  --color-surface-bg: #0f172a;
  --color-surface-card: #1e293b;
  --color-text-main: #f8fafc;
  --color-text-muted: #94a3b8;

  /* Typography Scale */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;

  /* Spacing & Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Blindly adopting every single color variant extracted without merging near-identical hex values (e.g., `#1f2937` and `#1f2938`).
* **Anti-Pattern:** Extracting styles solely from landing pages; always include authenticated dashboard views to capture stateful component tokens.
* **Warning:** Ensure dynamic CSS classes (e.g. CSS-in-JS hashes) are stripped to prevent fragile selector naming in exported configs.
