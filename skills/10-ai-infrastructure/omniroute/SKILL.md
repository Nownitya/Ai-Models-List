---
name: omniroute
description: "Route requests across multiple AI model providers through a common gateway with automatic fallback."
priority: P2
category: 10-ai-infrastructure
---

# Omniroute

Route requests across multiple AI model providers through a common gateway with automatic fallback.

## When to Use
- Building multi-provider AI resilience or routing queries based on latency/cost.

## Core Protocol / Capabilities
1. Configure OmniRoute gateway endpoints.
2. Define primary and fallback model routes.
3. Monitor provider error rates and failover switches.

## Anti-Patterns & Warnings
- Single point of provider failure in production.
- Mismatched parameter schemas across models.
