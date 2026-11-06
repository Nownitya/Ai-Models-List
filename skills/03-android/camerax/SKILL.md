---
name: camerax
description: "Implement modern Android camera functionality using Jetpack CameraX."
priority: P1
category: 03-android
---

# Camerax

Implement modern Android camera functionality using Jetpack CameraX.

## When to Use
- Building photo capture, video recording, or barcode/ML scanning.

## Core Protocol / Capabilities
1. Bind Preview, ImageCapture, and ImageAnalysis to lifecycle.
2. Handle device rotation and sensor orientation correctly.
3. Process ImageProxy frames asynchronously without dropping camera frames.

## Anti-Patterns & Warnings
- Holding ImageProxy instances open indefinitely.
- Using legacy Camera1/Camera2 APIs directly.
