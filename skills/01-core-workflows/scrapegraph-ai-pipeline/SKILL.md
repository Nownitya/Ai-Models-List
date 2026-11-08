---
name: scrapegraph-ai-pipeline
description: Graph-based AI web scraping pipelines, structured LLM extraction, and layout-independent web data mining.
---

# ScrapeGraphAI Graph-Based Web Extraction (`/scrapegraph-ai-pipeline`)

> **Domain:** 01 Core Workflows  
> **Upstream Authority:** [`scrapegraphai/just-scrape`](https://github.com/scrapegraphai/just-scrape) (⭐ 75, 245k+ Installs; Parent `ScrapeGraphAI/Scrapegraph-ai` ⭐ 16,800)  
> **Slash Command:** `/scrapegraph-ai-pipeline`

---

## When to Use

* When traditional CSS/XPath selector-based web scrapers fail due to frequent markup or class name churn.
* When extracting complex structured data (tables, nested catalogs, product specs) from diverse, unknown web layouts using LLM prompt graphs.
* When synthesizing information across multiple sequential web pages without writing custom DOM parsing logic.

## Prerequisites

* Python 3.10+ and `scrapegraphai` library installed.
* API key for LLM provider (OpenAI, Anthropic, Gemini, or local Ollama endpoint).

## Core Capabilities

1. **SmartScraperGraph**: Single-page autonomous extraction pipeline converting prompt requests directly into validated Pydantic models.
2. **SearchGraph**: Combines live search engine queries with multi-site content scraping and factual synthesis.
3. **OmniScraperGraph**: Handles multimodal inputs including images, PDF documents, and rendered web frames.
4. **Resilient Graph Pipelines**: Fallback nodes that automatically retry alternative parsing strategies when DOM elements shift.

## Activation Command

```bash
/scrapegraph-ai-pipeline [scrape|search|script] --url <target> --prompt <query>
```

## Workflow & Usage Guide

### 1. Smart Scraper Pipeline Execution (Python)

```python
from scrapegraphai.graphs import SmartScraperGraph

graph_config = {
    "llm": {
        "model": "gemini/gemini-1.5-flash",
        "api_key": "YOUR_API_KEY",
    },
    "verbose": True,
    "headless": True
}

smart_scraper = SmartScraperGraph(
    prompt="Extract all AI model names, release dates, context window sizes, and pricing tiers into a structured list.",
    source="https://example.com/models-directory",
    config=graph_config
)

result = smart_scraper.run()
print(result)
```

### 2. Multi-Step Search and Extract Graph

```python
from scrapegraphai.graphs import SearchGraph

search_graph = SearchGraph(
    prompt="Find the latest financial results and revenue guidance for Nvidia for Q3 2026.",
    config=graph_config
)

summary = search_graph.run()
print(summary)
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Using costly large frontier models (e.g. Claude 3.5 Sonnet or GPT-4o) for high-frequency bulk extraction when smaller flash models suffice.
* **Anti-Pattern:** Running headless scrapers synchronously in the primary event loop, blocking web servers.
* **Warning:** Ensure dynamic target sites with infinite scroll or heavy animation are configured with sufficient wait timeouts (`headless_options`).
