---
name: motion-sound-effects
description: Motion graphics sound design, audio-motion alignment, UI foley effects, and web audio synthesis by Barty Bart.
---

# Motion Graphics Sound Effects & UI Foley (`/motion-sound-effects`)

> **Domain:** 12 Specialized Domains  
> **Upstream Authority:** [`barty-bart/motion-graphics`](https://github.com/barty-bart/motion-graphics) (⭐ 1,117)  
> **Slash Command:** `/motion-sound-effects`

---

## When to Use

* When designing audio-motion alignment for product intro videos, micro-interactions, logo reveals, and tactile UI feedback.
* When synthesizing low-latency web audio sound effects (clicks, pops, whooshes, chime confirms) using the Web Audio API without heavy audio files.
* When editing and synchronizing video audio stems with keyframe animation peaks (impact frames, camera zooms).

## Prerequisites

* Modern web browser with Web Audio API support, or audio editing software (Audacity, Reaper, FFmpeg).
* Audio assets in lightweight formats (MP3, AAC, or WebM Opus).

## Core Capabilities

1. **Procedural Web Audio Synthesis**: Generates crisp, synthetic UI clicks and notification chimes using oscillators without external audio assets.
2. **Audio-Motion Keyframe Alignment**: Maps sound peaks (transients) to video keyframe velocity inflection points.
3. **Dynamic Volume & Mute Governance**: Respects global audio muting, user volume preferences, and tab backgrounding automatically.
4. **Foley & Risers Library Curation**: Curates lightweight UI sound libraries: whoosh transitions, mechanical clicks, and celebration fanfares.

## Activation Command

```bash
/motion-sound-effects [synthesize-click|align-timeline|audit-audio|export-foley] [--sound <type>]
```

## Workflow & Usage Guide

### 1. Zero-Asset Procedural Click Sound via Web Audio API

```typescript
export function playSyntheticClick() {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}
```

### 2. Audio-Visual Alignment Checklist

* **Transient Lead Time**: Audio transient should occur 1 frame (16ms–33ms) *before* or exactly on the visual contact frame.
* **Frequency Hygiene**: Keep UI sound effects in the 800Hz–2500Hz range to prevent harsh bass rumble on laptop/phone speakers.
* **Opt-in Only**: Never play sound on web page initial load without explicit user interaction (browser autoplay policy compliance).

## Anti-Patterns & Warnings

* **Anti-Pattern:** Autoplaying loud background music on page load, driving users to immediately close the tab.
* **Anti-Pattern:** Long decaying reverbs on repetitive UI actions (e.g. typing or toggling), creating cacophonous audio mud.
* **Warning:** Always provide a persistent mute toggle in the navigation header for any web application utilizing sound effects.
