---
name: design-taste-frontend
title: "design-taste-frontend (taste-skill)"
description: "Anti-slop frontend web design skill for AI coding agents: art direction, reference images, hero entrances, quiet micro-interactions, and automated browser-check finish gates."
priority: P1
category: 05-ui-ux
source: https://github.com/Leonxlnx/taste-skill
---

# Design Taste Frontend (Taste Skill)

> **Priority**: `P1` | **Category**: `05-ui-ux` | **Upstream**: [`Leonxlnx/taste-skill`](https://github.com/Leonxlnx/taste-skill) (111k+ ⭐)

Anti-slop frontend design intelligence system for AI coding agents. Elevates AI-generated web interfaces to the professional standard of `figma.com` and `x.ai`: authentic voice, intentional hierarchy, one section per screen, real photography, quiet micro-interactions, and automated browser-check finish gates.

---

## When to Use

- Building, designing, redesigning, or polishing frontend web pages, landing pages, SaaS dashboards, or developer portals.
- Working in static HTML/CSS, React, Next.js, Vue, Svelte, Astro, or Tailwind CSS.
- When an AI-generated page looks generic, templated, crowded, or "AI-slop".
- Reviewing visual balance, font pairings, section heights, and content margins against world-class benchmarks.

---

## Core Capabilities & The 9 House Rules

The nine non-negotiable house rules of `taste-skill`:

1. **No Captions or Descriptions Under Visuals**: License credits belong in a single subtle footer line, never beneath visual heroes.
2. **Every Visual Renders Flawlessly**: Zero empty grounds or broken layout boxes at 1440px, 1024px, 768px, and 390px viewports.
3. **One Section Per Screen**: The hero alone commands the first screen; subsequent sections are exactly one or two screens tall at 1440x900. No second section header peeking over the fold.
4. **Equal Content Margins**: Strict left and right alignment and balanced optical margins across all viewports.
5. **Tactile Micro-Animations**:
   - Linked cards lift 2px with gentle transition.
   - Photos zoom 1.02–1.03× subtly within their bounding frame.
   - Underlines draw smoothly on hover.
   - Interactive card loops cycle in 2.5–4s.
   - Zero aggressive 3D card tilt, spinning carousels, or arbitrary timed auto-tabs.
6. **Authentic Imagery & Typography**: Real photography and authentic UI screenshots over generic abstract illustrations or stock 3D renders.
7. **Full-Color Product Icons**: Use genuine vector product logos and clean visual diagrams (hubs, processors, data pipelines) instead of drawn faux icons.
8. **Art Direction Decides Effects**: Shader effects, 3D canvases, and particle systems are reserved strictly for technical subjects (AI, developer tools, fintech, gaming). Local businesses, agencies, and studios receive authentic photography.
9. **Realistic Copy & Clean Layouts**: Street and district only for physical addresses; `.example` for demo contact emails; authentic domain-specific copy over placeholder "Lorem ipsum".

---

## Installation & Activation

Install via open Agent Skills:
```bash
npx skills add https://github.com/Leonxlnx/taste-skill
```

Or activate directly within an AI assistant session:
```bash
/design-taste-frontend
```

---

## Prerequisites

- **Runtime**: Node.js 22+ (recommended).
- **Browser Automation (for finish gate)**: Chromium, Google Chrome, or Microsoft Edge.
- **Optional**: `ffmpeg` (for video assets).

---

## Anti-Patterns & Warnings

- **AI-Slop Clutter**: Packing 4 cards with rainbow gradients and floating blobs onto a single viewport.
- **Unearned 3D / Shaders**: Slapping WebGL particles or heavy three.js scenes onto non-technical websites (e.g. bakeries, hotels).
- **Arbitrary Section Peek**: Permitting the top 40px of the next section to poke into the initial fold.
- **Decorative Emojis as Icons**: Using emoji symbols in place of vector SVG iconography.
