---
name: caveman
description: "High-density token compression skill and proxy for AI coding agents. Cuts input and output tokens by 33% to 65% by enforcing concise, telegraphic communication ('caveman voice') that eliminates conversational filler while preserving 100% of technical code, reasoning substance, and factual correctness."
---

# Caveman: High-Density Token Compression Skill

## When to Use
- When operating in token-constrained environments or running long-horizon agent loops where conversational chatter bloats context windows and increases API expenses.
- When you want direct, no-nonsense answers without conversational preamble ("Certainly, I would be happy to help you with that..."), filler transitions, or repetitive summaries.
- When conducting rapid prototyping, terminal debugging, or high-throughput batch task execution.
- When user commands `/caveman`, "caveman mode", "talk like caveman", "be brief", or "save tokens".

## Core Capabilities
1. **Telegraphic Substance Preservation**: Strips redundant pleasantries, boilerplate greetings, and narrative filler while retaining every variable name, stack trace, code snippet, and mathematical invariant.
2. **Multi-Tier Compression Modes**:
   - `/caveman` (Standard): Grammatically lean, direct answers (cuts tokens by ~33%–50%).
   - `/caveman ultra`: Ultra-condensed telegraphic syntax focusing strictly on key terms and code changes (cuts tokens by ~60%+).
   - `/caveman wenyan` (`/megacave`): Classical high-density character encoding for maximum token frugality.
3. **Session Persistence**: Remains active throughout the agent conversation until explicitly toggled off with `stop caveman` or `normal mode`.
4. **Proxy & Host Compatibility**: Works as a native agent skill or transparent local HTTP proxy compatible with Claude Code, Antigravity CLI, Codex, OpenCode, and 30+ agent harnesses.

## Installation / Activation Command
```bash
# Global CLI / Proxy setup
npx @caveman-ai/cli@latest

# Activate inside active agent session
/caveman

# Check active compression status
/caveman status

# Deactivate and return to normal prose
stop caveman
```

## Prerequisites
- Node.js 22.13+ (for proxy daemon) or standard agent skill loader.
- Compatible with Claude Code, Antigravity CLI, Codex, Cursor, and Gemini CLI.

## Anti-Patterns / Warnings
- **Never sacrifice code accuracy for brevity**: Code syntax, imports, types, and logic MUST remain complete, valid, and fully tested. Only natural language conversational framing is compressed.
- **Do not use for formal client-facing deliverables**: Caveman mode is optimized for terminal developer efficiency and token economy, not for polished customer documentation, PRD sign-offs, or executive memos.
- **Do not omit safety checks**: High-risk operations (e.g. database drops, file deletions) must still demand explicit confirmation regardless of compression tier.
