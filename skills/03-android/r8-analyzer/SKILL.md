---
name: r8-analyzer
description: "Audit and optimize R8 keep rules to shrink APK size and optimize runtime execution."
priority: P0
category: 03-android
---

# R8 Analyzer

Audit and optimize R8 keep rules to shrink APK size and optimize runtime execution.

## When to Use
- Configuring release builds, ProGuard rules, or troubleshooting missing class crashes.

## Core Protocol / Capabilities
1. Analyze mapping files and usage reports.
2. Remove overly broad `-keep class com.example.** { *; }` rules.
3. Verify reflection-accessed classes are preserved safely.

## Anti-Patterns & Warnings
- Disabling R8 minification to bypass crashes.
- Keeping entire packages unnecessarily.
