---
name: google-maps-platform
description: "Integrate Google Maps SDK, geolocation, routes, and place search."
priority: P2
category: 12-specialized
---

# Google Maps Platform

Integrate Google Maps SDK, geolocation, routes, and place search.

## When to Use
- Adding maps, tracking, or spatial geofencing to web/mobile applications.

## Core Protocol / Capabilities
1. Configure restricted API keys with package name / SHA-1 fingerprinting.
2. Implement lifecycle-aware MapView / Compose GoogleMap composable.
3. Handle location permissions and GPS accuracy degradation.

## Anti-Patterns & Warnings
- Unrestricted API keys.
- Polling location aggressively causing battery drain.
