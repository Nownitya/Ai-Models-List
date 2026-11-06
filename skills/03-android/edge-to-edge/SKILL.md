---
name: edge-to-edge
description: "Modernize app layouts with Android edge-to-edge support and insets handling."
priority: P1
category: 03-android
---

# Edge To Edge

Modernize app layouts with Android edge-to-edge support and insets handling.

## When to Use
- Updating UI for Android 15/16+ edge-to-edge enforcement.

## Core Protocol / Capabilities
1. Enable edge-to-edge with `enableEdgeToEdge()`.
2. Apply window insets padding (`WindowInsets.safeDrawing`, `WindowInsets.ime`).
3. Verify status and navigation bar scrim legibility.

## Anti-Patterns & Warnings
- Hardcoding system bar heights.
- Overlapping interactive buttons with navigation bar.
