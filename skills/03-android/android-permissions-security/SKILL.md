---
name: android-permissions-security
description: "Audit permissions and IPC components, identify security gaps, and remediate vulnerabilities."
priority: P0
category: 03-android
---

# Android Permissions Security

Audit permissions and IPC components, identify security gaps, and remediate vulnerabilities.

## When to Use
- Requesting dangerous permissions or implementing Binder IPC interfaces.

## Core Protocol / Capabilities
1. Enforce principle of least privilege.
2. Verify caller identity via `Binder.getCallingUid()`.
3. Implement graceful fallbacks when runtime permissions are denied.

## Anti-Patterns & Warnings
- Requesting background location unnecessarily.
- Assuming permission is granted without checking.
