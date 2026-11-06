---
name: domain-modeling
description: "Create robust, decoupled domain models and explicit business rules."
priority: P0
category: 01-core-engineering
---

# Domain Modeling

Create robust, decoupled domain models and explicit business rules.

## When to Use
- Structuring core business entities, data contracts, and invariants.

## Core Protocol / Capabilities
1. Isolate domain types from framework dependencies (Android/iOS UI, ORMs).
2. Use value objects and immutable data classes.
3. Enforce invariants in factory methods or constructors.

## Anti-Patterns & Warnings
- Coupling domain models to database schemas or UI widgets.
- Exposing mutable state directly.
