---
name: gsap-animation
description: GreenSock Animation Platform (GSAP) professional timeline sequencing, ScrollTrigger scroll-driven animations, SVG morphing, and high-performance DOM motion.
---

# GSAP Motion & ScrollTrigger (`greensock/gsap-skills`)

> **Priority:** `P1` | **Framework:** `greensock/gsap-skills` | **Domain:** `05-ui-ux` | **Stars:** `⭐ 18k+`

GreenSock Animation Platform (GSAP) professional timeline sequencing, ScrollTrigger scroll-driven animations, SVG morphing, and high-performance DOM motion.

---

## 🧭 When to Use

* When building cinematic web experiences, interactive product showcases, and marketing hero sections.
* When synchronizing complex multi-stage animations with sub-millisecond precision using timelines.
* When pinning, scrubbing, or triggering animations based on viewport scroll position with `ScrollTrigger`.
* When animating SVG vector paths, morphing shapes, and canvas/WebGL elements.

---

## 🎯 Core Capabilities

1. **Deterministic Timelines**: Chain and nest animations with precise offsets (`+=0.2`, `<`) without callback hell.
2. **ScrollTrigger Integration**: Tie element movement, pin sections, and scrub progress directly to the user's scrollbar.
3. **GPU-Accelerated Performance**: Automatically optimizes transforms, will-change hints, and sub-pixel antialiasing.
4. **React & Next.js Hooks**: Clean integration via `@gsap/react` (`useGSAP`) preventing memory leaks and orphaned tweens.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/gsap-animation
```

### React GSAP Timeline with ScrollTrigger
```tsx
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=500",
        scrub: 1,
        pin: true,
      },
    });

    tl.from(".hero-title", { y: 100, opacity: 0, duration: 1 })
      .to(".hero-image", { scale: 1.2, rotation: 5, duration: 2 }, "<");
  }, { scope: container });

  return (
    <div ref={container} className="hero-container h-screen flex flex-col items-center justify-center">
      <h1 className="hero-title text-6xl font-bold">Unmatched Motion</h1>
      <div className="hero-image w-64 h-64 bg-cyan-500 rounded-3xl mt-8" />
    </div>
  );
}
```

---

## 📋 Prerequisites

* Node.js 18+, React or Vanilla JavaScript
* `gsap` package installed (`npm install gsap @gsap/react`)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Creating ScrollTrigger instances without calling `ctx.revert()` or using `useGSAP()`, causing severe memory leaks on unmount.
* **Anti-Pattern:** Over-animating every element, inducing cognitive fatigue and motion sickness.
