---
name: android-intent-security
description: "Secure Android components and handle Intents safely to prevent privilege escalation."
priority: P0
category: 03-android
---

# Android Intent Security

Secure Android components and handle Intents safely to prevent privilege escalation.

## When to Use
- Configuring Activities, Receivers, and Services in AndroidManifest.xml.

## Core Protocol / Capabilities
1. Set `android:exported="false"` unless explicitly required.
2. Validate caller UID and signing certificate before trusting Extras.
3. Avoid PendingIntent redirection vulnerabilities.

## Anti-Patterns & Warnings
- Exporting sensitive broadcast receivers without permissions.
- Deserializing untrusted Parcelables blindly.
