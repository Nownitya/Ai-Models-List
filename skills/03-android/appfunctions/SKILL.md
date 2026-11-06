---
name: appfunctions
description: "Expose app workflows so system shortcuts and on-device AI agents can discover and execute them."
priority: P1
category: 03-android
---

# Appfunctions

Expose app workflows so system shortcuts and on-device AI agents can discover and execute them.

## When to Use
- Enabling agentic tool calling and system integration for app actions.

## Core Protocol / Capabilities
1. Annotate functions with `@AppFunctionDeclaration`.
2. Define serializable inputs with `@AppFunctionSerializable`.
3. Implement `AppFunctionService` entry point.

## Anti-Patterns & Warnings
- Exposing side-effecting operations without user confirmation.
- Inaccurate function descriptions.
