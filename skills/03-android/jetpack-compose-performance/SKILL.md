---
name: jetpack-compose-performance
description: "Diagnose recomposition overhead, dropped frames, and Compose UI jank."
priority: P0
category: 03-android
---

# Jetpack Compose Performance

Diagnose recomposition overhead, dropped frames, and Compose UI jank.

## When to Use
- Optimizing list scrolling, animations, or high-frequency UI updates.

## Core Protocol / Capabilities
1. Inspect Compose compiler metrics (unstable parameters).
2. Use `remember` and `derivedStateOf` for expensive computations.
3. Profile frame rendering with Layout Inspector and Perfetto.

## Anti-Patterns & Warnings
- Allocating lambdas inside composables without `remember`.
- Reading state too high in the tree.
