---
name: ml-kit-genai-prompt-api
description: "Send natural-language requests on-device using ML Kit GenAI Prompt API and Gemini Nano."
priority: P1
category: 03-android
---

# Ml Kit Genai Prompt Api

Send natural-language requests on-device using ML Kit GenAI Prompt API and Gemini Nano.

## When to Use
- Summarization, proofreading, or smart reply generation on supported Android devices.

## Core Protocol / Capabilities
1. Check AICore and Gemini Nano availability.
2. Format prompt with prefix caching.
3. Execute request with structured response parsing.

## Anti-Patterns & Warnings
- Assuming Gemini Nano is present on all hardware.
- Unbounded prompt lengths.
