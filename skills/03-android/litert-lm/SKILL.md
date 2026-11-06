---
name: litert-lm
description: "Run open text LLMs on-device using the LiteRT-LM Kotlin API on CPU or GPU."
priority: P2
category: 03-android
---

# Litert Lm

Run open text LLMs on-device using the LiteRT-LM Kotlin API on CPU or GPU.

## When to Use
- Deploying local Gemma, Qwen, or Llama models on Android.

## Core Protocol / Capabilities
1. Configure LiteRT-LM Gradle dependencies.
2. Initialize Engine asynchronously in background dispatcher.
3. Stream multi-turn responses with `sendMessageAsync`.

## Anti-Patterns & Warnings
- Loading weights on main thread.
- Exceeding device RAM limits.
