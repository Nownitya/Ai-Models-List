---
name: schema-mapping
description: "Analyze, map, and document transformations across heterogeneous database schemas."
priority: P3
category: 12-specialized
---

# Schema Mapping

Analyze, map, and document transformations across heterogeneous database schemas.

## When to Use
- Executing complex ETL/ELT migrations across 3+ tables.

## Core Protocol / Capabilities
1. Extract source and target schemas.
2. Define field-by-field type mapping and transformation logic.
3. Produce a formal Mapping Manifesto with validation checks.

## Anti-Patterns & Warnings
- Silent truncation of numeric types.
- Ignoring timezone differences in timestamps.
