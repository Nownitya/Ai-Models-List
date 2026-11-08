---
name: data-viz-html-reports
description: Data visualization discipline, charting ergonomics, color scales, and self-contained interactive HTML executive report generators.
---

# Data Visualization & HTML Report Engineering (`/data-viz-html-reports`)

> **Domain:** 05 UI UX Design  
> **Upstream Authority:** [`daymade/claude-code-skills`](https://github.com/daymade/claude-code-skills) (⭐ 1,522)  
> **Slash Command:** `/data-viz-html-reports`

---

## When to Use

* When authoring standalone, zero-external-dependency interactive HTML executive reports with embedded responsive charts.
* When choosing appropriate chart types (never use un-ordered pie charts for >5 categories; prefer ordered horizontal bars or area charts).
* When designing accessible color palettes with perceptually uniform sequential and diverging colormaps (e.g. Viridis, Plasma, ColorBrewer).

## Prerequisites

* Modern web browser to view generated reports.
* Optional charting libraries for complex interactions (Chart.js, Vega-Lite, D3.js, or SVG/Canvas primitives).

## Core Capabilities

1. **Self-Contained Report Scaffolding**: Emits single-file HTML reports with inline CSS, embedded SVG charts, and zero external CDN script locks.
2. **Data-Ink Ratio Optimization**: Strips redundant grid lines, chart junk, 3D skeuomorphism, and low-contrast labels (Tufte principles).
3. **Ergonomic Chart Taxonomy**: Maps metric types (distribution, time-series, composition, correlation) to optimal visualization structures.
4. **Colorblind-Safe Palettes**: Verifies colormaps against Protanopia, Deuteranopia, and Tritanopia color vision deficiencies.

## Activation Command

```bash
/data-viz-html-reports [scaffold-report|audit-chart|palette-picker|embed-svg] [--data <json-or-csv>] [--output <file.html>]
```

## Workflow & Usage Guide

### 1. Generating a Self-Contained SVG Metric Chart

```html
<!-- Inline Responsive Sparkline SVG -->
<svg viewBox="0 0 300 80" class="sparkline-chart" preserveAspectRatio="none">
  <defs>
    <linearGradient id="grad-accent" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.0"/>
    </linearGradient>
  </defs>
  <polygon points="0,80 0,45 50,30 100,55 150,20 200,40 250,15 300,10 300,80" fill="url(#grad-accent)"/>
  <polyline points="0,45 50,30 100,55 150,20 200,40 250,15 300,10" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
</svg>
```

### 2. Chart Decision Heuristics Matrix

* **Comparison over Time (<7 points)**: Vertical column chart.
* **Continuous Trend (>10 points)**: Clean line chart with shaded confidence interval area.
* **Categorical Ranking (>5 items)**: Ordered horizontal bar chart (longest bar at top).
* **Correlation**: Scatter plot with trendline regression.

## Anti-Patterns & Warnings

* **Anti-Pattern:** Using 3D bar or pie charts; 3D perspective distorts relative geometric areas and impairs accurate data interpretation.
* **Anti-Pattern:** Truncating the Y-axis zero baseline on bar charts, artificially exaggerating trivial differences.
* **Warning:** Ensure interactive charts provide text table fallbacks (`aria-describedby`) for screen readers to comply with WCAG accessibility standards.
