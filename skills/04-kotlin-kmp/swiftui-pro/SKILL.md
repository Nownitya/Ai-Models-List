---
name: swiftui-pro
description: "SwiftUI-focused agent skill targeting iOS 26+ and Swift 6.4+: state, navigation, HIG, performance."
priority: P0
category: 04-kotlin-kmp
---

# Swiftui Pro

SwiftUI-focused agent skill targeting iOS 26+ and Swift 6.4+: state, navigation, HIG, performance.

## When to Use
- Building 100% native SwiftUI interfaces in KMP applications.

## Core Protocol / Capabilities
1. Use modern `@Observable` macro for reactive view models.
2. Enforce HIG ergonomics (SF Symbols, 44pt targets, haptic feedback).
3. Eliminate unnecessary view body evaluations.

## Anti-Patterns & Warnings
- Using deprecated `@ObservedObject` in Swift 6.
- Sharing Compose UI to iOS in native apps.
