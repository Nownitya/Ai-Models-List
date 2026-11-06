---
name: test-driven-development
description: "Strict Red-Green-Refactor development cycle ensuring robust regression protection."
priority: P0
category: 01-core-engineering
---

# Test Driven Development

Strict Red-Green-Refactor development cycle ensuring robust regression protection.

## When to Use
- Implementing new business logic, domain algorithms, or bug fixes.

## Core Protocol / Capabilities
1. RED: Write a unit test asserting the expected behavior and verify that it fails.
2. GREEN: Write the minimal production code necessary to pass the test.
3. REFACTOR: Clean up duplicated code while keeping the test suite green.

## Anti-Patterns & Warnings
- Writing production code before unit tests.
- Writing tests that assert trivial implementation details.
