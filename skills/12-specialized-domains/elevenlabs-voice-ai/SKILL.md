---
name: elevenlabs-voice-ai
description: ElevenLabs generative voice, speech synthesis, voice cloning, and real-time low-latency audio streaming.
---

# ElevenLabs Generative Voice & Audio Streaming (`/elevenlabs-voice-ai`)

> **Domain:** 12 Specialized Domains  
> **Upstream Authority:** [`elevenlabs/skills`](https://github.com/elevenlabs/skills) (⭐ 539)  
> **Slash Command:** `/elevenlabs-voice-ai`

---

## When to Use

* When synthesizing expressive, human-quality text-to-speech (TTS) across multiple languages, accents, and emotional inflections.
* When building conversational voice agents requiring real-time WebSocket audio streaming with low latency (<250ms).
* When managing voice clones, sound effect synthesis, and audio dubbing pipelines in AI applications.

## Prerequisites

* ElevenLabs API key (`ELEVENLABS_API_KEY`).
* Node.js v18+ or Python 3.10+ runtime.

## Core Capabilities

1. **Text-to-Speech (TTS) Synthesis**: High-fidelity speech generation with adjustable stability, similarity boost, and style exaggeration.
2. **Real-Time WebSocket Streaming**: Bi-directional audio streaming optimized for interactive conversational voice agents.
3. **Sound Effect & Foley Generation**: Text-to-sound effect synthesis generating environmental ambience and UI audio cues.
4. **Voice Cloning & Profiles**: Programmatic custom voice cloning and speaker verification embeddings.

## Activation Command

```bash
/elevenlabs-voice-ai [tts|stream|sfx|voices] [--voice <id>] [--text <prompt>]
```

## Workflow & Usage Guide

### 1. Low-Latency Audio Streaming (TypeScript)

```typescript
import { ElevenLabsClient } from "elevenlabs";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function streamSpeech(text: string, voiceId: string = "21m00Tcm4TlvDq8ikWAM") {
  const audioStream = await elevenlabs.generate({
    stream: true,
    voice: voiceId,
    text: text,
    model_id: "eleven_turbo_v2_5",
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.8,
      style: 0.2,
      use_speaker_boost: true,
    },
  });

  return audioStream;
}
```

### 2. Generative Sound Effect

```typescript
export async function createSoundEffect(prompt: string, durationSec: number = 2.5) {
  const audio = await elevenlabs.textToSoundEffects.convert({
    text: prompt,
    duration_seconds: durationSec,
    prompt_influence: 0.3,
  });
  return audio;
}
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Buffering entire audio clips in memory before playback in conversational agents; always use chunked streaming.
* **Anti-Pattern:** Hardcoding voice IDs without fallback mechanisms when custom voices are modified or deleted.
* **Warning:** Ensure appropriate consent is acquired before cloning voices, adhering to synthetic media ethics and platform terms of service.

