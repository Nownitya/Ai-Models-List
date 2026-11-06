---
name: gemini-live-api
description: "Build real-time, low-latency bidirectional voice and video streaming applications."
priority: P2
category: 10-ai-infrastructure
---

# Gemini Live Api

Build real-time, low-latency bidirectional voice and video streaming applications.

## When to Use
- Building conversational voice assistants or real-time camera inspection tools.

## Core Protocol / Capabilities
1. Establish WebSocket session using Gemini Live API.
2. Stream raw PCM audio chunks bidirectionally.
3. Handle server voice activity detection (VAD) and function call interruptions.

## Anti-Patterns & Warnings
- Buffering entire audio files before sending.
- Ignoring connection keep-alive timeouts.
