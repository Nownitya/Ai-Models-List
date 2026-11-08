---
name: stitch-design-system
description: Google Labs Stitch design-md UI scaffolding, declarative design system bridge, screen generation, and token compilation.
---

# Stitch Design System Bridge (`/stitch-design-system`)

> **Domain:** 05 UI UX Design  
> **Upstream Authority:** [`google-labs-code/stitch-skills`](https://github.com/google-labs-code/stitch-skills) (⭐ 8,693)  
> **Slash Command:** `/stitch-design-system`

---

## When to Use

* When transforming natural language prompts or markdown design specifications (`design.md`) into structured component contracts.
* When synchronizing design tokens across Figma, web frontend code, and Android/iOS native design systems via Google Labs Stitch.
* When compiling design specifications into reproducible component variants with deterministic CSS custom properties.

## Prerequisites

* Google Labs Stitch CLI or MCP server configured:
  ```bash
  npm install -g @google-labs/stitch-cli
  ```
* Valid Stitch workspace API key in `STITCH_API_KEY` (or local standalone mock mode enabled).

## Core Capabilities

1. **Design Markdown Parsing**: Reads `DESIGN.md` files detailing color palettes, typography scales, spacing grids, and elevation rules.
2. **Deterministic Token Generation**: Emits CSS variables, Tailwind configuration presets, and Android Jetpack Compose `Color`/`Typography` definitions.
3. **Screen Variant Synthesis**: Generates high-fidelity HTML/CSS responsive screen prototypes from structured markdown briefs.
4. **Design System Consistency Audit**: Compares implementation code against authoritative `DESIGN.md` design system rules.

## Activation Command

```bash
/stitch-design-system [compile-tokens|scaffold-screen|audit-spec|export] [--input <path>] [--output <path>]
```

## Workflow & Usage Guide

### 1. Authoring a `DESIGN.md` Specification

```markdown
# Design System Specification

## Colors
- Primary: #3b82f6 (Accent Blue)
- Secondary: #10b981 (Success Emerald)
- Surface: #090d16 (Deep Slate)
- Border: #1e293b (Subtle Navy)

## Typography
- Display: Inter Tight, 700 weight, -0.025em tracking
- Body: Inter, 400 weight, 1.5 line-height
- Mono: JetBrains Mono, 500 weight, tabular-nums

## Spacing
- Base unit: 4px (Grid: 4, 8, 12, 16, 24, 32, 48, 64)
```

### 2. Compiling Tokens to Web and Mobile Formats

```bash
stitch compile-tokens --spec ./DESIGN.md --target tailwind --output ./tailwind.config.ts
stitch compile-tokens --spec ./DESIGN.md --target compose --output ./android/app/src/main/ui/Theme.kt
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Hardcoding arbitrary hex color values in component styles instead of referencing Stitch token variables.
* **Anti-Pattern:** Modifying compiled design token outputs manually; always update the canonical `DESIGN.md` source spec.
* **Warning:** Ensure responsive breakpoint tokens match across both web and native mobile client configurations.
