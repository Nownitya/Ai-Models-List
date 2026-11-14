---
name: lemo-opuscar
description: "A toolbox of 99 procedural film, motion graphics, and animation styles made entirely in code for Claude Code and agentic filmmakers using Three.js, WebGL, Canvas, and FFmpeg."
priority: P1
category: 05-ui-ux
---

# Lemo Opuscar — Agentic Creative Coding & Film Styles

> **Priority:** `P1` | **Category:** `05-ui-ux`
> **Repository:** https://github.com/lemomo-ai/lemo-opuscar | **Stars:** 15,900+

A creative coding and agentic filmmaking toolbox for Claude Code, Codex, and generative agents. Contains 99 procedural film styles generated purely through code (Three.js, WebGL, HTML5 Canvas, GLSL shaders, and FFmpeg) by Claude Opus with zero diffusion video models.

---

## When to Use

* Building generative motion graphics, interactive hero animations, visual branding, or procedural films in code.
* Developing video generation pipelines without heavyweight GPU diffusion models or expensive video API costs.
* Generating programmatic visual styles for web games, dynamic landing pages, and interactive data visualization.

---

## Prerequisites & Dependencies

* Node.js runtime with `three`, `canvas`, or browser rendering environment.
* `ffmpeg` installed on the system PATH for frame concatenation and video export.
* Claude Code or modern coding agent with canvas execution capabilities.

---

## Core Capabilities & Workflow

1. **Select Style Preset**: Choose from 99 curated styles across categories (retro futurism, brutalist typography, organic particle systems, vaporwave, glitch, fluid dynamics, architectural wireframes).
2. **Execute Procedural Canvas Script**: Render scenes frame-by-frame via HTML5 Canvas or WebGL headless contexts.
3. **Assemble Video with FFmpeg**:
   ```bash
   ffmpeg -r 30 -f image2 -s 1920x1080 -i frames/%05d.png -vcodec libx264 -crf 18 -pix_fmt yuv420p output.mp4
   ```
4. **Style Customization**: Tweak GLSL shaders, camera orbits, particle physics, and color palettes through declarative parameter blocks.

---

## Anti-Patterns & Warnings

* **CPU-bound rendering without frame budgeting**: High-resolution GLSL simulations can spike CPU/RAM if frame dimensions and particle counts are unbounded.
* **Missing FFmpeg binary**: Ensure FFmpeg is accessible in the execution environment before triggering batch video compilations.
