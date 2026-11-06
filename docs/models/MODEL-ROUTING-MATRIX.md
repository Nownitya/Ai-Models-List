# Frontier AI Model Selection & Routing Matrix

An authoritative architectural guide for routing engineering tasks to the optimal AI models based on reasoning depth, context capacity, latency budgets, and specialized modalities.

---

## 🧭 Model Selection Decision Flowchart

```mermaid
flowchart TD
    Start["Incoming Engineering Task"] --> Modality{"Requires Real-Time\nVoice or Video?"}
    
    Modality -- Yes --> LiveModel["Gemini 3.8 Live API\n(Low-latency WebSocket PCM)"]
    Modality -- No --> TaskType{"Primary Task Type"}
    
    TaskType -- "Deep Planning &\nArchitecture (P0)" --> PlanModel["Claude 3.7 Sonnet / Gemini 3.8 Pro\n(Goal-backward reasoning & ADRs)"]
    TaskType -- "Surgical TDD &\nBug Hunting (P0)" --> CodeModel["Claude 3.7 Sonnet / OpenAI Codex\n(Strict red-green & falsifiable tests)"]
    TaskType -- "On-Device Mobile\nInference (P1/P2)" --> OnDevice["Gemini Nano / LiteRT-LM (Gemma 2)\n(AICore & on-device zero-cloud)"]
    TaskType -- "High-Speed Batch\nLinting & Scaffolding" --> FastModel["Gemini 3.8 Flash / Claude 3.5 Haiku\n(Sub-second response, high throughput)"]
    TaskType -- "Air-Gapped / Private\nStrict Offline" --> LocalModel["Qwen 2.5 Coder 32B / Gemma 2 27B\n(Local Ollama / vLLM runtime)"]
```

---

## 📊 Frontier Model Capability Matrix

| Model Tier | Flagship Models | Sweet Spot Workflows | Context Window | Best Paired Skills |
| :--- | :--- | :--- | :--- | :--- |
| **Architect & Deep Planner** | **Claude 3.7 Sonnet**<br>`claude-3-7-sonnet` | Complex multi-module architecture, ADR generation, deep code review, Layer 15 documentation. | 200k tokens | `writing-plans`, `domain-modeling`, `code-review`, `to-spec` |
| **Multimodal & Long-Context** | **Gemini 3.8 Pro**<br>`gemini-3.8-pro` | Massive repository indexing, full-video UI inspection, cross-repo dependency analysis. | 1M–2M tokens | `graphify`, `gsd-onboard`, `ui-ux-pro-max`, `camerax` |
| **High-Throughput Daily Driver** | **Gemini 3.8 Flash**<br>`gemini-3.8-flash` | Fast iterative editing, test generation, git commit message authoring, inline documentation. | 1M tokens | `systematic-debugging`, `executing-plans`, `setup-pre-commit` |
| **Real-Time Streaming** | **Gemini 3.8 Live**<br>`gemini-live-api` | Bidirectional real-time voice intercom, live terminal narration, pair programming audio session. | Real-time audio stream | `gemini-live-api-dev`, `VoiceModel`, `Intercom-Alpha` |
| **Code Generation & CLI** | **OpenAI Codex / GPT-4o**<br>`gpt-4o` | General multi-language scripting, Python packaging, terminal automation scripts. | 128k tokens | `codex`, `managing-python-dependencies`, `agent-browser` |
| **On-Device Edge Models** | **Gemini Nano / Gemma 2**<br>`litert-lm` | On-device private summarization, text extraction, edge smart replies with zero cloud latency. | 4k–8k tokens | `ml-kit-genai-prompt-api`, `mlkit-agent-api`, `litert-runtime` |
| **Local Offline Specialist** | **Qwen 2.5 Coder 32B**<br>`ollama / vllm` | Complete offline privacy, air-gapped corporate codebases, zero external data leakage. | 32k–64k tokens | `accidental-data-loss-prevention`, `tdd`, `careful` |

---

## 🎯 Task-to-Model Routing Rules

### 1. Requirements Discovery & Specification (`02 Matt Pocock` & `06 GSD`)
- **Primary**: Claude 3.7 Sonnet or Gemini 3.8 Pro.
- **Why**: High resistance to hallucinating unrequested features; superior adherence to negative constraints ("Do not touch file X").

### 2. Android & Kotlin/KMP Development (`03 Android` & `04 Kotlin/KMP`)
- **Primary**: Gemini 3.8 (Pro/Flash) paired with `Context7` or official Android Skills.
- **Why**: Deep native alignment with modern Android APIs (Navigation 3, Compose multi-backstack, AGP 9, LiteRT).

### 3. UI/UX Design System Synthesis (`05 UI/UX Design`)
- **Primary**: Claude 3.7 Sonnet or Gemini 3.8 Flash paired with `ui-ux-pro-max`.
- **Why**: Flawless generation of cohesive color palettes, typography tokens, and WCAG contrast assertions.

### 4. Security Review & Pre-Commit Audit (`11 Code Review Quality`)
- **Primary**: Claude 3.7 Sonnet or CodeRabbit AST parser.
- **Why**: Ruthless identification of BOLA/IDOR, SQL injection, missing CSRF tokens, and insecure deserialization.

