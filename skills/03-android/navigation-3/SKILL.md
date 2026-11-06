---
name: navigation-3
description: "Recommended practices for setting up and using Jetpack Navigation 3 in Compose."
priority: P0
category: 03-android
---

# Navigation 3

Recommended practices for setting up and using Jetpack Navigation 3 in Compose.

## When to Use
- Building single-activity Compose navigation with multi-backstack support.

## Core Protocol / Capabilities
1. Configure Navigation 3 dependencies (`androidx.navigation3`).
2. Implement typed route definitions.
3. Manage multi-pane Scenes and back-press dispatchers.

## Anti-Patterns & Warnings
- String-based route parsing.
- Hardcoding activity transitions.
