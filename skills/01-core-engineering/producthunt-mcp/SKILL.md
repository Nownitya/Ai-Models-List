---
name: producthunt-mcp
description: "Official Product Hunt Model Context Protocol (MCP) server for discovering trending AI products, querying leaderboards, analyzing market alternatives, and drafting launches."
priority: P1
category: 01-core-engineering
---

# Product Hunt MCP — Official Product & Market Intelligence

> **Priority:** `P1` | **Category:** `01-core-engineering`
> **Endpoint:** `https://mcp.producthunt.com/mcp` | **Protocol:** Streamable HTTP

The official Product Hunt Model Context Protocol (MCP) server enabling AI assistants to search new launches, analyze product profiles, compare market competitors, fetch historical leaderboards, and draft upcoming launches directly from repository documentation.

---

## When to Use

* Conducting competitive research on emerging AI developer tools, frameworks, and coding agents.
* Finding top-ranked solutions across categories (AI code editors, testing, LLMs, vibe coding, databases).
* Drafting and staging a Product Hunt launch from your project's `README.md` and website assets.

---

## Installation & Configuration

### 1. Claude Desktop (`claude_desktop_config.json`)
```json
{
  "mcpServers": {
    "producthunt": {
      "url": "https://mcp.producthunt.com/mcp"
    }
  }
}
```

### 2. Cursor / Antigravity / Claude Code
Configure the remote MCP server URL as `https://mcp.producthunt.com/mcp`. Authentication uses secure browser OAuth ("Sign in with Product Hunt") with zero manual API keys required.

---

## Core Capabilities & Protocol

1. **Leaderboard & Discovery**: Fetch daily, weekly, monthly, and yearly top-voted products across any tech category.
2. **Competitive Analysis**: Compare alternative tools, read user reviews, pricing tiers, and maker commentary.
3. **Automated Launch Preparation**: Parses repository `README.md` to generate taglines, descriptions, makers list, and preview launch drafts.

---

## Anti-Patterns & Warnings

* **Using unverified community wrappers**: Always connect directly to the official Streamable HTTP endpoint `https://mcp.producthunt.com/mcp`.
* **Automated spam submission**: Product Hunt requires human review; use MCP to draft and preview launches before submitting.
