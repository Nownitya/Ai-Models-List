---
name: kotlin-tooling-kotlin-toolchain
description: "Manage modern Kotlin toolchains, JVM targets, and compiler flags across KMP modules."
priority: P0
category: 04-kotlin-kmp
---

# Kotlin Tooling Kotlin Toolchain

Manage modern Kotlin toolchains, JVM targets, and compiler flags across KMP modules.

## When to Use
- Configuring Gradle build scripts or updating Kotlin versions.

## Core Protocol / Capabilities
1. Declare explicit `jvmToolchain(21)`.
2. Standardize compiler options across `commonMain`, `androidMain`, `iosMain`.
3. Enable strict explicit API mode where applicable.

## Anti-Patterns & Warnings
- Mismatched JVM targets across modules.
- Relying on system JDK defaults.
