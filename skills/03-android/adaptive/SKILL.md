---
name: adaptive
description: "Build responsive Jetpack Compose UIs that adapt smoothly across phone, tablet, foldable, desktop, TV, and Automotive form factors."
priority: P0
category: 03-android
source: https://developer.android.com/tools/agents/android-skills/browse
---

# Adaptive Android UI (Jetpack Compose)

Design and update Compose layouts to adapt fluidly to varying window size classes, input modalities, and folding postures.

## When to Use
- Implementing multi-pane layouts (list-detail, supporting pane).
- Handling window resizing, folding/unfolding, and display rotation without losing UI state.
- Supporting keyboard shortcuts, mice/trackpads, and touch targets dynamically.

## Key APIs
- `androidx.compose.material3.adaptive`: `calculateWindowSizeClass()`, `ListDetailPaneScaffold`.
- Navigation 3 Scenes for multi-pane orchestration.
- Compose Flexbox and Grid APIs for responsive component sizing.
