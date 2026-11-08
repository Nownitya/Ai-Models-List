---
name: stageshow-ui-presentation
description: Stageshow interactive UI demo orchestration, live presentation states, slide deck code bridges, and conference demo engineering.
---

# Stageshow Interactive UI Presentation (`/stageshow-ui-presentation`)

> **Domain:** 05 UI UX Design  
> **Upstream Authority:** [`benjitaylor/skills`](https://github.com/benjitaylor/skills) (⭐ 2,487)  
> **Slash Command:** `/stageshow-ui-presentation`

---

## When to Use

* When engineering interactive live product demos, keynotes, conference talks, and executive product reviews.
* When binding keyboard clicker shortcuts (Next, Prev, Reset, Step) directly to frontend component state transitions.
* When isolating presentation states from live backend network dependencies to prevent live-demo conference Wi-Fi failures.

## Prerequisites

* Web frontend (Next.js, Vite, React, or Svelte).
* Knowledge of keyboard event listeners or gamepad presentation remotes.

## Core Capabilities

1. **State Step Sequencer**: Step-by-step state machine allowing speakers to progress UI transitions linearly or jump to bookmarks.
2. **Offline Mock Fallbacks**: Automatically intercepts network requests and serves deterministic mock payloads if connectivity drops.
3. **Presenter Mode Overlays**: Displays private presenter speaker notes, upcoming state previews, and elapsed timers on dual screens.
4. **Cinematic Viewport Camera Rigs**: Pans and zooms smoothly to focal points on key UI elements during feature reveals.

## Activation Command

```bash
/stageshow-ui-presentation [scaffold-deck|step-sequencer|mock-fallback|presenter-view] [--deck <name>]
```

## Workflow & Usage Guide

### 1. Declaring a Stageshow Step Machine

```typescript
export interface DemoStep {
  stepId: number;
  title: string;
  cameraZoom: number; // e.g. 1.0 = full screen, 1.4 = focused component
  stateSnapshot: Record<string, unknown>;
  speakerNotes: string;
}

export const demoSteps: DemoStep[] = [
  {
    stepId: 1,
    title: "Empty Dashboard State",
    cameraZoom: 1.0,
    stateSnapshot: { orders: [], status: 'idle' },
    speakerNotes: "Notice the zero-state onboarding prompt designed to reduce churn."
  },
  {
    stepId: 2,
    title: "Simulated Webhook Ingestion",
    cameraZoom: 1.25,
    stateSnapshot: { orders: [{ id: 'ord_1', total: '$149.00' }], status: 'live' },
    speakerNotes: "Clicking next triggers real-time optimistic UI update."
  }
];
```

### 2. Global Hotkey Controller

* **Right Arrow / Space**: Advance to next state.
* **Left Arrow**: Rewind to previous state.
* **Key `R`**: Reset demo to initial baseline state.
* **Key `P`**: Toggle dual-screen presenter view.

## Anti-Patterns & Warnings

* **Anti-Pattern:** Relying on live third-party production APIs during live stage presentations without hard-coded offline fallback data.
* **Anti-Pattern:** Uncached web fonts or heavyweight 4K videos that fail to buffer on congested conference networks.
* **Warning:** Always test high-DPI scaling on presentation projectors (often 1080p 60Hz) to prevent accidental layout truncation.
