---
name: google-skills
description: Google's official open collection of Agent Skills for Google developer platforms, Cloud infrastructure, and AI engineering (23k+ stars).
---

# Google Agent Skills — Official Google Developer Skills Suite

> **Priority**: `P0` | **Category**: `10-ai-infrastructure` | **Upstream**: [`google/skills`](https://github.com/google/skills) (23k+ ⭐)

Google's official public repository for Agent Skills delivers specialized capabilities, tools, and best-practice workflows for Google developer platforms, including Google Cloud Platform (GCP), Vertex AI, Gemini API, Android, Chrome extensions, and Firebase.

---

## When to Use

- Building and deploying cloud-native AI agents on Google Cloud infrastructure.
- Integrating Google GenAI SDK (`google-genai`), Vertex AI reasoning engines, or Gemini Live streaming.
- Developing Android apps using Google's official Android, Navigation 3, and Compose capabilities.

---

## Core Capabilities & Protocols

1. **Google Cloud & Vertex AI Integration**:
   - Automated scaffolding, deployment, and evaluation of multi-turn conversational agents with ADK (Agent Development Kit).
2. **Gemini Multimodal Mastery**:
   - Verified patterns for function calling, structured JSON output, prefix caching, and multimodal video/audio parsing.
3. **Enterprise Security & IAM**:
   - Best practices for workload identity federation, credential management, and least-privilege service account configurations.

---

## Installation / Activation Command

```bash
# Install Google Agent Skills using Google Agents CLI
npx @google/agents-cli skills add google/skills

# Alternatively use with Antigravity
agy skills install google/skills
```

---

## Prerequisites

- Node.js 18+ or Python 3.10+.
- Active Google Cloud project (for cloud deployments) or Gemini API key.

---

## Anti-Patterns / Warnings

- **Do NOT commit hardcoded GCP service account keys**: Use Workload Identity Federation or environment variables (`GOOGLE_APPLICATION_CREDENTIALS`).
- **Do NOT load unneeded cloud modules**: Activate only the specific Google skills needed for your project (e.g. `gemini-api`, `android-cli`) to conserve context tokens.

