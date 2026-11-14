---
name: modern-web-guidance
title: "Google Chrome Modern Web Guidance"
description: "Official modern web platform expertise, best practices, native browser APIs, accessibility patterns, and legacy code scanning stewarded by Chrome, Edge, Firefox, and MDN."
priority: P0
category: 05-ui-ux
source: https://github.com/GoogleChrome/modern-web-guidance-src
documentation: https://developer.chrome.com/docs/modern-web-guidance
license: Apache-2.0
metadata:
  author: Google Chrome Team, Microsoft Edge, Mozilla Firefox, MDN Web Docs
  site: https://developer.chrome.com/docs/modern-web-guidance
  repo: https://github.com/GoogleChrome/modern-web-guidance-src
  npm: modern-web-guidance
---

# Google Chrome Modern Web Guidance by Google Chrome, Edge, Firefox & MDN ([GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src))

Authoritative engineering and execution instructions for `modern-web-guidance` (`P0` Priority).

**Modern Web Guidance** is an open-source initiative and agent skills library stewarded collaboratively by the **Google Chrome team**, **Microsoft Edge**, **Mozilla Firefox**, and **MDN Web Docs**. It embeds up-to-date web platform expertise, Baseline web standards, native browser APIs, accessibility standards, and legacy pattern migration directly into AI coding agents.

Because large language models (LLMs) are trained on vast volumes of historical code, they often default to legacy JavaScript workarounds, bloated third-party dependencies, or outdated CSS patterns even when modern, performant, native browser APIs exist. Modern Web Guidance bridges this gap across 250+ modern web platform features.

---

## When to Use

Activate this skill when:
- Designing, building, refactoring, or optimizing modern web applications, dashboards, or static sites (HTML5, modern CSS, JavaScript, TypeScript, React, Vue, Svelte, Astro).
- Replacing obsolete JavaScript workarounds with high-performance native browser primitives (e.g. `<dialog>`, `popover`, CSS anchor positioning, CSS Grid/Subgrid, Container Queries, `@starting-style`, View Transitions, and scroll-driven animations).
- Auditing existing codebases for legacy web patterns using `npx modern-web-guidance@latest legacy-scan`.
- Implementing web accessibility (a11y), semantic HTML landmarks, ARIA live regions, focus trapping, and user-preference adaptations (`prefers-color-scheme`, `prefers-contrast`, `prefers-reduced-motion`).
- Optimizing Core Web Vitals (LCP, INP, CLS), critical rendering path (CRP), font loading (`preconnect`, `font-display: swap`), and resource priority hints (`fetchpriority="high"`, `loading="lazy"`).
- Implementing WebMCP declarative and imperative tools for AI agents to interact with web forms and client-side actions.

---

## Core Capabilities

- **Local Offline Search & Retrieval Engine**: Instant CLI retrieval of 250+ expert guides across CSS layout, DOM, HTML, accessibility, forms, performance, and WebMCP without requiring API keys or network calls:
  - `npx modern-web-guidance@latest search "<query>"`
  - `npx modern-web-guidance@latest retrieve "<guide-id>"`
- **Legacy Pattern Scanner (`legacy-scan`)**: Deterministic static analysis engine auditing repositories to uncover deprecated JS polyfills, missing `color-scheme` declarations, outdated modal implementations, and legacy CSS workarounds.
- **Top Layer & Native Overlays**: Native `<dialog>` elements with built-in accessibility and focus management, Popover API (`popover="auto"`, `popover="manual"`), light-dismiss behavior, and top-layer CSS animations with `@starting-style` and `transition-behavior: allow-discrete`.
- **Modern CSS Layout & Fluid Typography**: CSS Grid, Subgrid (`grid-template-columns: subgrid`), Container Queries (`@container`), intrinsic sizing (`fit-content`, `min-content`), CSS anchor positioning (`anchor()`, `position-try-fallbacks`), fluid typography with `clamp()`, and balanced typography with `text-wrap: balance` and `text-wrap: pretty`.
- **Native Theming & Color Modes**: Declaring `color-scheme: light dark;` on `:root`, utilizing the modern `light-dark()` color function, and implementing cross-browser standard scrollbar controls (`scrollbar-color`, `scrollbar-width`).
- **Core Web Vitals & Resource Fetching**: Optimizing Largest Contentful Paint (LCP) with `fetchpriority="high"`, preconnecting critical font foundries, non-blocking main-thread yielding (`scheduler.yield()`), and layout shift prevention.
- **WebMCP Agentic Browser Tools**: Exposing web application functionality to AI coding agents via declarative HTML form annotations (`webmcp-tool`) and imperative JavaScript function registration.

---

## Activation Command

```bash
/modern-web-guidance
```

Or scoped alias:
```bash
/ui-modern-web-guidance
```

Execute core CLI operations directly:
```bash
# Search guidance corpus by keyword or concept
npx modern-web-guidance@latest search "responsive dialog modal popover"

# Retrieve full expert guide markdown
npx modern-web-guidance@latest retrieve "dialog,html,css-layout"

# Audit a codebase for legacy patterns
npx modern-web-guidance@latest legacy-scan .

# Install interactively into your agent configuration
npx modern-web-guidance@latest install
```

Or install directly into an active project workspace via repo tooling:
```bash
python scripts/install-to-project.py --skill modern-web-guidance
```

---

## Prerequisites

- Node.js 18+ or polyglot runtime with `npx` capability.
- Modern evergreen browser target (Chrome/Chromium 120+, Edge 120+, Firefox 120+, Safari 17.4+ for Baseline features).
- Web application codebase with HTML, CSS, and JavaScript/TypeScript source files.

---

## Workflow

1. **Scan & Discover**:
   Run `npx modern-web-guidance@latest legacy-scan <path>` to identify legacy patterns, missing color schemes, or obsolete DOM workarounds.
2. **Retrieve Authoritative Guidance**:
   Run `npx modern-web-guidance@latest search "<feature>"` and retrieve the canonical guide with `npx modern-web-guidance@latest retrieve "<id>"`.
3. **Refactor to Native Primitives**:
   - Replace complex custom modal overlays with native `<dialog>` or `popover` elements.
   - Declare `color-scheme: light dark;` on `:root` and use `light-dark(lightColor, darkColor)` instead of duplicating duplicate media query rules.
   - Use standard `scrollbar-color` and `scrollbar-width` alongside webkit fallbacks.
   - Apply `text-wrap: balance` on headlines and `text-wrap: pretty` on paragraphs.
   - Add `fetchpriority="high"` on critical LCP imagery and `preconnect` on critical third-party font foundries.
4. **Verify Accessibility & Baseline Compatibility**:
   - Verify keyboard navigation (`Tab`, `Shift+Tab`, `Escape` for dismissal).
   - Test screen reader announcements and ARIA attributes.
   - Run behavioral tests and verify cross-browser rendering.

---

## Anti-Patterns & Warnings

> [!WARNING]
> - **Never lazy-load LCP images**: Applying `loading="lazy"` to above-the-fold hero images purposefully delays resource fetching and degrades Core Web Vitals.
> - **Never duplicate dark-mode rules without `color-scheme`**: Declaring `@media (prefers-color-scheme: dark)` without setting `color-scheme: light dark;` on `:root` causes native browser controls and scrollbars to render with incorrect light contrast.
> - **Never use heavy JavaScript libraries for simple modals or popovers**: Modern browsers natively support `<dialog>` and `popover` with built-in focus trapping, top layer stacking, and escape light-dismiss.
> - **Never use non-standard scrollbar CSS in isolation**: Do not rely exclusively on `::-webkit-scrollbar` without also declaring modern standard `scrollbar-color` and `scrollbar-width`.
> - **Never disable user focus outlines**: Avoid `outline: none;` without providing an explicit, accessible `:focus-visible` alternative.

---

## Official Upstream References

- **Documentation**: [https://developer.chrome.com/docs/modern-web-guidance](https://developer.chrome.com/docs/modern-web-guidance)
- **GitHub Repository**: [https://github.com/GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src)
- **NPM Package**: [https://www.npmjs.com/package/modern-web-guidance](https://www.npmjs.com/package/modern-web-guidance)

