---
name: emil-design-eng
description: Emil Kowalski's Apple-grade design engineering, fluid micro-interactions, animation vocabulary, gesture physics, and craft polish.
---

# Emil Kowalski Design Engineering (`emilkowalski/skills`)

> **Priority:** `P0` | **Framework:** `emilkowalski/skills` | **Domain:** `05-ui-ux` | **Stars:** `⭐ 54k+`

Emil Kowalski's Apple-grade design engineering, fluid micro-interactions, animation vocabulary, gesture physics, and craft polish.

---

## 🧭 When to Use

* When polishing UI components to Apple-grade fluidity and tactile feedback.
* When fine-tuning spring physics, dampening ratios, drag gestures, and interactive layout transitions.
* When eliminating awkward visual jumps, layout thrashing, and unchoreographed element entrances.
* When auditing web animations for frame-rate drops and CPU/GPU composition bottlenecks.

---

## 🎯 Core Capabilities

1. **Fluid Spring Dynamics**: Designs animations based on realistic physics (mass, stiffness, damping) rather than rigid bezier curves.
2. **Gesture & Interruptibility**: Ensures all animations can be interrupted mid-flight by user touch or mouse drag without jarring resets.
3. **Choreographed Hierarchy**: Coordinates staggered reveals, focal points, and exit transitions for spatial continuity.
4. **Layout Projection**: Leverages FLIP and CSS transforms to avoid expensive DOM layout recalibrations.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/emil-design-eng
```

### Framer Motion Spring Example
```tsx
import { motion } from "framer-motion";

export function FluidCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl"
    >
      <h3 className="text-white font-medium">Tactile Interaction</h3>
    </motion.div>
  );
}
```

---

## 📋 Prerequisites

* React 18+, Next.js, or Vite
* Framer Motion (`framer-motion`) or Tailwind CSS animation plugins

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Animating layout properties (`width`, `height`, `top`, `margin`) directly instead of `transform` and `opacity`.
* **Anti-Pattern:** Using linear easings or excessive bounce that distracts from user tasks.
* **Anti-Pattern:** Un-interruptible animations that lock user interaction.
