---
name: anr-audit-and-fix
description: "Audit codebases for ANR risks and diagnose Application Not Responding stack dumps."
priority: P0
category: 03-android
---

# Anr Audit And Fix

Audit codebases for ANR risks and diagnose Application Not Responding stack dumps.

## When to Use
- Triaging ANR crash reports or auditing thread safety.

## Core Protocol / Capabilities
1. Check main thread for Room database calls, SharedPreference sync, or network I/O.
2. Audit synchronized locks and mutexes for deadlock risks.
3. Migrate blocking calls to `Dispatchers.IO` with structured coroutines.

## Anti-Patterns & Warnings
- Blocking main thread with `.get()` on Futures.
- Sleeping on main thread.
