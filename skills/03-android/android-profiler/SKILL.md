---
name: android-profiler
description: "Record and analyze Android performance data (CPU, memory, Perfetto traces)."
priority: P0
category: 03-android
---

# Android Profiler

Record and analyze Android performance data (CPU, memory, Perfetto traces).

## When to Use
- Investigating app startup latency, memory leaks, or thermal throttling.

## Core Protocol / Capabilities
1. Capture system traces using Perfetto.
2. Analyze main thread slices for jank and Binder transactions.
3. Diagnose heap churn and Low Memory Killer (LMK) triggers.

## Anti-Patterns & Warnings
- Guessing performance bottlenecks without traces.
- Profiling debug builds instead of release/profile.
