---
name: browser-use
description: Autonomous web automation and browser agent controller enabling LLMs to navigate, inspect DOM, extract data, click, type, and automate multi-step web workflows.
---

# Browser Use (`browser-use/browser-use`)

> **Priority:** `P0` | **Framework:** `browser-use` | **Domain:** `01-core-workflows` | **Stars:** `⭐ 120k+`

Autonomous web automation and browser agent controller enabling LLMs to navigate, inspect DOM, extract data, click, type, and automate multi-step web workflows.

---

## 🧭 When to Use

* When an agent needs to perform automated interactions in real browsers (Chromium, Firefox, WebKit).
* When scraping dynamic JavaScript-rendered single-page applications (SPAs) or gated workflows.
* When testing end-to-end user journeys (login, form submission, checkout flows) autonomously.
* When synthesizing web research that requires multi-tab navigation and DOM tree analysis.

---

## 🎯 Core Capabilities

1. **Visual & DOM Grounding**: Automatically builds accessibility tree representations with numbered element IDs for precise agent interaction.
2. **Multi-Tab Orchestration**: Manages concurrent browser sessions, popup dialogs, file uploads, and tab switching.
3. **Vision Model Integration**: Supports multimodal screenshots alongside HTML structure for robust element targeting.
4. **Resilient Action Loop**: Features automatic retry on network lag, element re-rendering, and detached DOM frames.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/browser-use
```

### Python SDK Integration
```python
from langchain_openai import ChatOpenAI
from browser_use import Agent
import asyncio

async def main():
    agent = Agent(
        task="Navigate to Hacker News, find the top 3 AI stories, and extract their links",
        llm=ChatOpenAI(model="gpt-4o"),
    )
    result = await agent.run()
    print(result)

asyncio.run(main())
```

---

## 📋 Prerequisites

* Python 3.10+
* Playwright installed (`playwright install chromium`)
* Supported LLM API key (OpenAI, Anthropic, or Google Gemini)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Attempting to click elements without waiting for DOM hydration or network idle.
* **Anti-Pattern:** Hardcoding fragile XPath selectors instead of relying on accessibility trees or text matching.
* **Warning:** Never bypass authentication walls or CAPTCHAs programmatically; respect rate limits and terms of service.

