---
name: kotlin-tooling-cocoapods-spm-migration
description: "Migrate KMP iOS dependency integration from CocoaPods to Swift Package Manager."
priority: P1
category: 04-kotlin-kmp
---

# Kotlin Tooling Cocoapods Spm Migration

Migrate KMP iOS dependency integration from CocoaPods to Swift Package Manager.

## When to Use
- Modernizing Xcode integration and eliminating ruby dependency managers.

## Core Protocol / Capabilities
1. Configure SPM export in `build.gradle.kts`.
2. Generate XCFramework or Swift package manifest.
3. Link package cleanly in Xcode project.

## Anti-Patterns & Warnings
- Mixing CocoaPods and SPM simultaneously.
- Committing generated framework binaries.
