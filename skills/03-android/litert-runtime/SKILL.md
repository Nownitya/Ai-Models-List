---
name: litert-runtime
description: "Run on-device TensorFlow Lite model inference using the LiteRT CompiledModel API on CPU and GPU."
priority: P2
category: 03-android
---

# Litert Runtime

Run on-device TensorFlow Lite model inference using the LiteRT CompiledModel API on CPU and GPU.

## When to Use
- Executing computer vision, audio classification, or embedding models locally.

## Core Protocol / Capabilities
1. Load `.tflite` model via `CompiledModel`.
2. Reuse pre-allocated `TensorBuffer` instances.
3. Configure GPU delegate with fallback to CPU.

## Anti-Patterns & Warnings
- Re-allocating buffers every inference turn.
- Running heavy inference on UI thread.
