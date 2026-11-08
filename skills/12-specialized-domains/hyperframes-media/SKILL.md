---
name: hyperframes-media
description: Programmatic video framing, scene orchestration, and AI-driven media rendering workflows powered by Hyperframes.
---

# Hyperframes Media Orchestration (`/hyperframes-media`)

> **Domain:** 12 Specialized Domains  
> **Upstream Authority:** [`heygen-com/hyperframes`](https://github.com/heygen-com/hyperframes) (⭐ 80,586)  
> **Slash Command:** `/hyperframes-media`

---

## When to Use

* When orchestrating multi-scene generative video compositions, text-to-video timelines, and dynamic audio-visual assets.
* When structuring declarative media manifests with keyframed transitions, avatar overlays, and responsive subtitle tracks.
* When automating programmatic batch video rendering pipelines across marketing, documentation, or social workflows.

## Prerequisites

* Node.js 18+ or Python 3.10+ runtime environment.
* Hyperframes CLI or SDK installed:
  ```bash
  npm install -g @heygen/hyperframes-cli
  # or
  pip install hyperframes
  ```
* Valid media render credentials or API token set in `HYPERFRAMES_API_KEY`.

## Core Capabilities

1. **Declarative Scene Manifests**: Define multi-layer video sequences with exact durations, aspect ratios, and visual layers.
2. **Dynamic Avatar & Voice Track Synthesis**: Bind synthetic actors and speech transcripts to keyframe audio cues.
3. **Automated Captions & Lower Thirds**: Generate accessible, animated text overlays synced with audio timestamps.
4. **Programmatic Media Pipeline**: Render and export MP4/WebM binaries directly from CI/CD runners or backend workers.

## Activation Command

```bash
/hyperframes-media [render|compose|template|inspect] [--output <path>]
```

## Workflow & Usage Guide

### 1. Authoring a Declarative Scene Manifest

Create `scene-composition.json`:

```json
{
  "version": "1.0",
  "resolution": { "width": 1920, "height": 1080, "fps": 30 },
  "timeline": [
    {
      "id": "scene-intro",
      "duration": 4.5,
      "layers": [
        { "type": "background", "source": "assets/bg-gradient.mp4", "loop": true },
        { "type": "avatar", "actorId": "anna_presenter", "voiceId": "en-US-JennyNeural" },
        { "type": "title", "text": "AI Coding Skills Masterclass", "style": "slide-in-up" }
      ]
    }
  ]
}
```

### 2. Validating & Rendering

```bash
hyperframes validate scene-composition.json
hyperframes render scene-composition.json --output dist/intro.mp4 --quality high
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Hardcoding uncompressed raw video assets inside the repo; always store assets in CDN buckets and reference via signed URLs.
* **Anti-Pattern:** Triggering long renders synchronously in request handlers; always dispatch video rendering to asynchronous job queues.
* **Warning:** Ensure all voice models and video likenesses comply with platform synthetic media policies and ethical guidelines.

