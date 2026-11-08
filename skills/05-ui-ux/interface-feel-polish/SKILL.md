---
name: interface-feel-polish
description: Interface feel heuristics, tactile micro-physics, spring dynamics, and subtle sensory feedback by Jakub Krehel.
---

# Interface Feel & Tactile Micro-Physics (`/interface-feel-polish`)

> **Domain:** 05 UI UX Design  
> **Upstream Authority:** [`jakubkrehel/make-interfaces-feel-better`](https://github.com/jakubkrehel/make-interfaces-feel-better) (⭐ 3,938)  
> **Slash Command:** `/interface-feel-polish`

---

## When to Use

* When transforming stiff, robotic web or mobile interfaces into fluid, tactile digital experiences.
* When tuning spring physics (stiffness, damping, mass) for sheet drawers, modals, toggles, and button presses.
* When eliminating awkward visual jumps by applying momentum-preserving gestures and continuous velocity transfers.

## Prerequisites

* Modern animation library (Framer Motion, Motion One, GSAP, or CSS Spring variables).
* Touch or mouse input handling setup.

## Core Capabilities

1. **Spring Dynamics & Physics Tuning**: Replaces arbitrary ease-in-out cubics with damped spring oscillations (`stiffness: 400`, `damping: 30`, `mass: 0.8`).
2. **Press & Release Tactile Feedback**: Adds subtle scale compression (`scale: 0.97`) and elevation drops on pointer down with zero input latency.
3. **Velocity Preservation**: Carries user swipe momentum seamlessly into drawer and card dismiss animations.
4. **Haptic & Visual Alignment**: Synchronizes subtle visual pulses with native mobile haptic feedback patterns (light impact).

## Activation Command

```bash
/interface-feel-polish [audit|spring-presets|press-states|drag-physics] [--target <component>]
```

## Workflow & Usage Guide

### 1. Tactile Button Interaction (Framer Motion)

```typescript
import { motion } from 'framer-motion';

export const TactileButton = ({ children, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
    onClick={onClick}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow"
  >
    {children}
  </motion.button>
);
```

### 2. Spring Physics Parameter Presets

* **Snappy Trigger (Buttons, Toggles)**: `{ stiffness: 500, damping: 28, mass: 0.5 }`
* **Fluid Sheet (Bottom Drawers, Modals)**: `{ stiffness: 350, damping: 32, mass: 1.0 }`
* **Bouncy Accent (Badges, Notifications)**: `{ stiffness: 450, damping: 18, mass: 0.8 }`

## Anti-Patterns & Warnings

* **Anti-Pattern:** Over-damping or creating slow, floaty animations (>400ms) that make the interface feel sluggish and unresponsive.
* **Anti-Pattern:** Linear transitions without easing curves on spatial movements, creating jarring, mechanical starts and stops.
* **Warning:** Always respect user accessibility preferences (`@media (prefers-reduced-motion: reduce)`) by disabling non-essential motion.
