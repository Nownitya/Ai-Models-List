---
name: firecrawl-web-scrape
description: Web scraping, crawling, and clean LLM-ready markdown extraction with Firecrawl CLI.
---

# Firecrawl Web Scraping & Crawl Pipeline (`/firecrawl-web-scrape`)

> **Domain:** 01 Core Workflows  
> **Upstream Authority:** [`firecrawl/cli`](https://github.com/firecrawl/cli) (⭐ 678, 663k+ Installs; Parent `mendableai/firecrawl` ⭐ 23,400)  
> **Slash Command:** `/firecrawl-web-scrape`

---

## When to Use

* When converting raw websites, documentation portals, or dynamic Single Page Applications (SPAs) into clean, structured Markdown for LLM ingestion.
* When executing deep crawls across subpages with configurable max depth, URL prefix filtering, and robots.txt compliance.
* When bypassing aggressive anti-bot protections, JavaScript hydration walls, or PDF/document parsing hurdles in agent pipelines.

## Prerequisites

* Firecrawl API key (`FIRECRAWL_API_KEY`) or a self-hosted Firecrawl instance.
* Node.js v18+ or Python 3.10+ runtime.

## Core Capabilities

1. **Clean Markdown Extraction**: Strips navigations, cookie banners, tracking scripts, and HTML boilerplate into pure semantic Markdown.
2. **Recursive Domain Crawling**: Discovers and indexes nested documentation routes, emitting structured JSON or multi-file archives.
3. **Structured Data Extraction (LLM Extraction)**: Uses JSON Schema definitions to pull structured fields (e.g. pricing tiers, API signatures) directly from live pages.
4. **Dynamic JS Hydration**: Employs headless browser rendering to capture client-side hydrated content and interactive tabs.

## Activation Command

```bash
/firecrawl-web-scrape [scrape|crawl|extract] <url> [--depth <n>] [--output <path>]
```

## Workflow & Usage Guide

### 1. Scrape a Dynamic Page to Markdown

```bash
# Scrape single URL to clean markdown
firecrawl scrape "https://docs.example.com/api/v2" --output api-v2.md
```

### 2. Deep Crawl an Entire Documentation Portal

```typescript
import FirecrawlApp from '@mendable/firecrawl-js';

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function crawlDocumentation(baseUrl: string) {
  const crawlResponse = await app.crawlUrl(baseUrl, {
    limit: 50,
    scrapeOptions: {
      formats: ['markdown'],
      onlyMainContent: true
    }
  });

  if (!crawlResponse.success) {
    throw new Error(`Failed to crawl: ${crawlResponse.error}`);
  }

  return crawlResponse.data;
}
```

### 3. Structured Data Extraction

```typescript
const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    pricing: { type: "array", items: { type: "string" } },
    features: { type: "array", items: { type: "string" } }
  },
  required: ["title", "pricing"]
};

const extracted = await app.scrapeUrl("https://example.com/pricing", {
  formats: ["extract"],
  extract: { schema }
});
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Unbounded recursive crawling without domain prefix filters, accidentally crawling external social media links.
* **Anti-Pattern:** Scraping high-volume dynamic endpoints synchronously within HTTP request handlers; always offload deep crawls to background workers.
* **Warning:** Adhere to target site terms of service and robots.txt directives; use polite rate-limiting (`delayMs`) to prevent target IP rate-limiting.
