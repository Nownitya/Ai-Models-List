---
name: component-anatomy-specs
description: Design system component anatomy contracts, visual bounding boxes, semantic hierarchy specifications, and layout contracts.
---

# Component Anatomy Specifications (`/component-anatomy-specs`)

> **Domain:** 05 UI UX Design  
> **Upstream Authority:** [`wheresryan22/anatomy`](https://github.com/wheresryan22/anatomy) (⭐ 25,776)  
> **Slash Command:** `/component-anatomy-specs`

---

## When to Use

* When breaking down complex UI components into explicit anatomical parts (root, container, slot, icon, label, badge, dismiss action).
* When defining structural layout contracts, touch targets (minimum 44x44px), spacing gutters, and responsive overflow behaviors.
* When authoring component specification documents for cross-functional alignment between product designers and frontend engineers.

## Prerequisites

* Modern frontend framework (React, Vue, Svelte, or Jetpack Compose).
* Knowledge of headless UI primitives (Radix UI, React Aria, Ark UI) or native mobile slot architecture.

## Core Capabilities

1. **Explicit Anatomy Modeling**: Identifies primary, secondary, and optional child element slots with strict parent-child contracts.
2. **State & Spatial Matrix**: Maps spatial dimensions across states: Default, Hover, Focus-Visible, Active, Disabled, Loading, and Error.
3. **Accessibility Roles & Tokens**: Documents required ARIA attributes (`aria-expanded`, `aria-controls`, `aria-describedby`) per anatomical node.
4. **Token Binding Manifest**: Maps every border radius, color, shadow, and typographic scale directly to design tokens.

## Activation Command

```bash
/component-anatomy-specs [decompose|spec-sheet|audit-tokens|slot-map] [--component <name>]
```

## Workflow & Usage Guide

### 1. Component Anatomy Breakdown Example (`DialogModal`)

```markdown
# DialogModal Component Anatomy Contract

| Node Index | Anatomical Part | HTML Tag | Role / ARIA | Token Binding |
| :---: | :--- | :--- | :--- | :--- |
| `01` | **Overlay Backdrop** | `<div>` | `aria-hidden="true"` | `--color-backdrop-blur` |
| `02` | **Container Shell** | `<dialog>` | `role="dialog" aria-modal="true"` | `--surface-card`, `--radius-xl` |
| `03` | **Header Slot** | `<header>` | Semantic header | `--spacing-4`, `--border-subtle` |
| `04` | **Title Node** | `<h2>` | `id="modal-title"` | `--font-title-md`, `--color-text-high` |
| `05` | **Dismiss Button** | `<button>` | `aria-label="Close dialog"` | `--touch-min-44px` |
| `06` | **Body Container** | `<section>` | Scrollable container | `--spacing-6`, `--font-body-base` |
| `07` | **Footer Action Bar**| `<footer>` | Semantic footer | `--spacing-4`, `--flex-end-gap-2` |
```

### 2. Touch Target & Spatial Invariants

* **Minimum Interactive Size**: 44x44px bounding box for all touch triggers on mobile viewports.
* **Focus Ring Gap**: Minimum 2px offset between focus outline and interactive element boundary.

## Anti-Patterns & Warnings

* **Anti-Pattern:** Conflating component visual structure with business logic; anatomy must remain purely presentational and headless.
* **Anti-Pattern:** Neglecting the `loading` skeleton state in anatomical specifications, causing jarring layout shifts (CLS).
* **Warning:** Ensure modal overlays trap keyboard focus properly and restore focus to trigger buttons on dismiss.
