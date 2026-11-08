---
name: gamedev-mechanics
description: Game development physics simulations, custom shaders, tactile game-feel heuristics, camera rigs, and interactive 3D math.
---

# Game Development & Physics Mechanics (`/gamedev-mechanics`)

> **Domain:** 12 Specialized Domains  
> **Upstream Authority:** [`gamedev-skills/awesome-gamedev-agent-skills`](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) (⭐ 7,621)  
> **Slash Command:** `/gamedev-mechanics`

---

## When to Use

* When engineering 2D/3D game physics, collision detection (AABB, SAT, raycasting), and rigid-body constraints in Godot, Unity, or Three.js.
* When tuning "game feel": coyote time, jump buffering, screen shake, hit stop (freeze frames), and squash-and-stretch particle effects.
* When authoring custom GLSL / WGSL fragment shaders, lighting models, and camera follow interpolation curves.

## Prerequisites

* Game development engine or WebGL/WebGPU runtime (e.g. Godot 4.x, Unity, Unreal, Three.js, or PixiJS).
* Foundational 3D linear algebra (vectors, matrices, quaternions, dot/cross products).

## Core Capabilities

1. **Platformer Kinematics & Game Feel**: Implements responsive character controllers with coyote time, jump cut, and acceleration friction curves.
2. **Deterministic Collision Detection**: Computes ray-box intersections, swept sphere tests, and continuous collision detection (CCD).
3. **Camera Rig & Screen Shake**: Smooth damping camera follow scripts with trapezoidal deadzones and rotational trauma dampening.
4. **Shader & Particle VFX**: Declarative shader templates for dissolve effects, stylized water, rim lighting, and GPU particle emitters.

## Activation Command

```bash
/gamedev-mechanics [scaffold-controller|camera-shake|sat-collision|shader-template] [--engine <godot|unity|three>]
```

## Workflow & Usage Guide

### 1. Responsive Platformer Kinematics (GDScript / TypeScript)

```typescript
// Essential Game-Feel Variables: Coyote Time & Jump Buffering
interface CharacterPhysics {
  velocity: { x: number; y: number };
  coyoteTimer: number;    // Grace period (e.g. 0.15s) after walking off edge
  jumpBufferTimer: number;// Queue jump input (e.g. 0.1s) before hitting ground
  isGrounded: boolean;
}

export function updatePhysics(char: CharacterPhysics, dt: number, jumpPressed: boolean) {
  // Update timers
  if (char.isGrounded) char.coyoteTimer = 0.15;
  else char.coyoteTimer -= dt;

  if (jumpPressed) char.jumpBufferTimer = 0.1;
  else char.jumpBufferTimer -= dt;

  // Execute Jump if buffered and coyote valid
  if (char.coyoteTimer > 0 && char.jumpBufferTimer > 0) {
    char.velocity.y = -14.0; // Jump impulse
    char.coyoteTimer = 0;
    char.jumpBufferTimer = 0;
  }
}
```

### 2. Rotational Camera Shake Trauma Function

```typescript
// Non-linear trauma decay creates visceral, punchy impacts
export function getTraumaOffset(trauma: number): number {
  const shake = Math.pow(Math.min(1.0, trauma), 2); // Quadratic falloff
  return (Math.random() * 2 - 1) * shake * 15; // Max 15px displacement
}
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Binding movement physics directly to frame rate without multiplying by delta time (`dt`), causing speed differences across monitor refresh rates.
* **Anti-Pattern:** Linear screen shake with zero rotational component; rotational trauma feels significantly more organic and impactful.
* **Warning:** Continuous collision detection (CCD) is computationally expensive; reserve CCD for high-speed projectiles and use discrete AABB for static geometry.

