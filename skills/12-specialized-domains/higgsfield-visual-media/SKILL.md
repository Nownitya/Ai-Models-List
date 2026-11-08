---
name: higgsfield-visual-media
description: Generative image framing, studio lighting presets, product photoshoot staging, and visual media composition powered by Higgsfield.
---

# Higgsfield Visual Media & Studio Staging (`/higgsfield-visual-media`)

> **Domain:** 12 Specialized Domains  
> **Upstream Authority:** [`higgsfield-ai/skills`](https://github.com/higgsfield-ai/skills) (⭐ 1,914)  
> **Slash Command:** `/higgsfield-visual-media`

---

## When to Use

* When orchestrating AI image generation pipelines with explicit camera lenses (35mm, 50mm, 85mm), aperture settings (f/1.4, f/2.8), and depth of field.
* When structuring studio product photography prompts with professional three-point lighting setups (key, fill, rim/hair light).
* When designing high-CTR social media thumbnails, product mockups, and visual marketing assets with strict brand palette constraints.

## Prerequisites

* Python 3.10+ or Node.js 18+ runtime.
* Higgsfield CLI or generative media API token set:
  ```bash
  pip install higgsfield-media
  export HIGGSFIELD_API_KEY="your_api_key"
  ```

## Core Capabilities

1. **Photographic Parameterization**: Maps natural language briefs into precise optical parameters: focal length, shutter angle, ISO, and bokeh intensity.
2. **Studio Lighting Presets**: Includes declarative lighting rigs: Rembrandt lighting, softbox diffusion, cyber-neon rim lights, and golden hour backlight.
3. **Product Staging Layouts**: Positions hero products on pedestals, floating geometric surfaces, or minimal studio sweeps with realistic cast shadows.
4. **Resolution & Aspect Ratio Targets**: Automatically configures standard aspect ratios: 16:9 (YouTube), 1:1 (Square), 4:5 (Instagram), 9:16 (Shorts/Reels).

## Activation Command

```bash
/higgsfield-visual-media [generate-photoshoot|stage-product|lighting-rig|thumbnail-spec] [--prompt <text>]
```

## Workflow & Usage Guide

### 1. Generating a Studio Product Photoshoot Brief

```json
{
  "project": "smart-watch-launch",
  "camera": {
    "lens": "85mm prime",
    "aperture": "f/2.0",
    "angle": "three-quarters elevated"
  },
  "lighting": {
    "keyLight": "45-degree large softbox 5600K",
    "rimLight": "subtle electric cyan 6500K",
    "fillLight": "white bounce card"
  },
  "environment": {
    "surface": "dark matte textured slate",
    "background": "subtle gradient smoke blur",
    "reflections": "subdued specular highlights"
  }
}
```

### 2. Execution CLI

```bash
higgsfield render --manifest ./photoshoot-brief.json --output ./dist/hero-product.png --quality ultra
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Overloading prompts with conflicting camera styles (e.g. "fisheye lens" combined with "isometric telephoto").
* **Anti-Pattern:** Neglecting cast shadow physics when compositing products onto transparent backgrounds, resulting in floating artifacts.
* **Warning:** Ensure generated imagery complies with advertising truth-in-advertising guidelines and does not misrepresent physical product dimensions.

