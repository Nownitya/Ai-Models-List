---
name: video-frame-analysis
description: Computer vision video frame extraction, timeline scene sampling, multimodal visual inspection, and automated video QA analysis.
---

# Video Frame Analysis & Visual Inspection (`/video-frame-analysis`)

> **Domain:** 12 Specialized Domains  
> **Upstream Authority:** [`bradautomates/claude-video`](https://github.com/bradautomates/claude-video) (⭐ 20,152)  
> **Slash Command:** `/video-frame-analysis`

---

## When to Use

* When inspecting video recordings of UI test runs to diagnose transient animation glitches, layout flickering, or dropped frames.
* When extracting keyframes at uniform intervals (e.g. 1 frame/sec) or dynamic scene change boundaries for multimodal LLM analysis.
* When verifying video generation outputs (Remotion, Hyperframes) for visual artifacts, audio-sync drift, or watermark errors.

## Prerequisites

* FFmpeg installed and available on system PATH:
  ```bash
  # Windows via winget
  winget install Gyan.FFmpeg
  # Linux
  sudo apt-get install ffmpeg
  ```
* Python 3.10+ with image processing libraries:
  ```bash
  pip install pillow opencv-python-headless
  ```

## Core Capabilities

1. **Intelligent Keyframe Sampling**: Samples video streams using scene change detection filters (`select='gt(scene,0.3)'`) or uniform timestamps.
2. **Contact Sheet & Timeline Strip Generation**: Compiles extracted frames into high-resolution visual contact sheets for quick human/LLM triage.
3. **OCR & Subtitle Inspection**: Extracts on-screen text coordinates to verify subtitle alignment and brand logo placements.
4. **Perceptual Difference Tracking**: Computes frame-to-frame delta metrics to pinpoint exactly which second a UI glitch occurred.

## Activation Command

```bash
/video-frame-analysis [extract-frames|contact-sheet|detect-scenes|inspect-glitch] [--input <video-path>] [--fps <number>]
```

## Workflow & Usage Guide

### 1. Extracting Scene Changes with FFmpeg

```bash
# Extract frames on significant scene changes
ffmpeg -i recorded-flow.mp4 -vf "select='gt(scene,0.4)',scale=640:-1" -vsync vfr frames/scene_%03d.png
```

### 2. Generating an Inspection Contact Sheet

```bash
# Combine frames into a single 4x4 matrix image
ffmpeg -i recorded-flow.mp4 -vf "fps=1,scale=320:-1,tile=4x4" -frames:v 1 contact-sheet.png
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Dumping thousands of full-resolution 4K frames into agent context, causing massive memory spikes and token exhaustion.
* **Anti-Pattern:** Relying solely on static screenshots for evaluating interactive UI motion and micro-interactions.
* **Warning:** Ensure recorded videos do not capture sensitive user passwords, auth tokens, or private PII during screen recording sessions.

