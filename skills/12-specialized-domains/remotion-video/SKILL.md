---
name: remotion-video
description: Programmatic video creation and rendering using React, enabling dynamic motion graphics, audio visualization, video compositing, and automated MP4 rendering.
---

# Remotion Video Engine (`remotion-dev/skills`)

> **Priority:** `P1` | **Framework:** `remotion-dev/skills` | **Domain:** `12-specialized-domains` | **Stars:** `⭐ 6.5k+`

Programmatic video creation and rendering using React, enabling dynamic motion graphics, audio visualization, video compositing, and automated MP4 rendering.

---

## 🧭 When to Use

* When generating automated customer onboarding videos, personalized product teasers, or dynamic social clips from data.
* When animating UI components, text transitions, charts, or maps using familiar React code and CSS/Tailwind.
* When rendering server-side video pipelines on cloud functions (AWS Lambda, GCP Cloud Run) or Docker containers.

---

## 🎯 Core Capabilities

1. **React Component Animation**: Build complex video animations using standard React components, hooks (`useCurrentFrame`, `useVideoConfig`), and spring physics.
2. **Deterministic Frame-by-Frame Rendering**: Eliminates dropped frames and timing jitter; guarantees pixel-perfect MP4/WebM/GIF outputs.
3. **Audio-Driven Visuals**: Native APIs (`@remotion/media-utils`) to extract waveform frequencies and synchronize animations to audio beats.
4. **Cloud Scalability**: Render 1-hour videos in minutes by splitting rendering tasks across hundreds of parallel Lambda workers.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/remotion-video
```

### Video Composition Example
```tsx
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const TitleSequence: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill className="bg-slate-950 flex items-center justify-center">
      <h1 style={{ transform: `scale(${scale})`, opacity }} className="text-white text-6xl font-bold font-sans">
        {title}
      </h1>
    </AbsoluteFill>
  );
};
```

### CLI Rendering
```bash
# Preview video in interactive browser player
npx remotion preview

# Render composition to MP4
npx remotion render src/index.ts TitleSequence out/video.mp4
```

---

## 📋 Prerequisites

* Node.js 18+, React 18+
* FFmpeg installed locally or provided via `@remotion/compositor`

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Using non-deterministic values (e.g. `Math.random()` or `Date.now()`) during frame rendering without seeded PRNG.
* **Anti-Pattern:** Relying on unbuffered external network video assets during high-speed parallel rendering passes.
