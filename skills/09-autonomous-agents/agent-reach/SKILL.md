---
name: agent-reach
description: "Give AI agents eyes to read and search the entire internet across Twitter/X, Reddit, YouTube transcripts, GitHub, Bilibili, and XiaoHongShu via one unified CLI and MCP server with zero API keys."
priority: P0
category: 09-autonomous-agents
---

# Agent-Reach — Universal Social & Web Intelligence for Agents

> **Priority:** `P0` | **Category:** `09-autonomous-agents`
> **Repository:** https://github.com/Panniantong/Agent-Reach | **Stars:** 111,000+

An open-source intelligence and web-reach engine for AI agents. Provides unified search, scraping, and transcript extraction across modern social platforms (Twitter/X, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu) via a single CLI and MCP server without requiring paid developer API subscriptions.

---

## When to Use

* Researching trending developer sentiment, community complaints, or library feedback on Reddit and Twitter/X.
* Extracting full timestamped video transcripts from YouTube and Bilibili tutorials for code synthesis.
* Monitoring real-time open-source discussions, GitHub issues, and developer ecosystem developments.
* Equipping Claude Code, Cursor, or Antigravity agents with internet search capabilities.

---

## Prerequisites & Installation

* Python 3.10+ runtime.
* Installation:
  ```bash
  pip install agent-reach
  ```
* MCP Server Configuration:
  ```json
  "agent-reach": {
    "command": "agent-reach",
    "args": ["mcp"]
  }
  ```

---

## Core Capabilities & Protocol

1. **Multi-Platform Search**: Unified syntax to search queries across multiple platforms simultaneously:
   ```bash
   agent-reach search "React 19 Server Actions vs TanStack" --platforms twitter,reddit,github
   ```
2. **Video Transcript Extraction**: Instant download and formatting of YouTube / Bilibili subtitles into structured markdown chapters with timestamps.
3. **Structured Discussion Parsing**: Extracts threaded discussions, top upvoted replies, and author reputation without rendering heavy browser DOMs.
4. **MCP Tool Integration**: Exposes `search_social`, `get_post_comments`, and `get_video_transcript` tools natively to any MCP agent.

---

## Anti-Patterns & Warnings

* **Aggressive rate limits**: Avoid uncontrolled rapid polling across social endpoints; implement sensible caching and request jitter.
* **Respect site terms**: Intended for public research and information extraction; do not scrape private or gated communities.
