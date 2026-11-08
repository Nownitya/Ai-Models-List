---
name: composio-skills
description: "Unified MCP Gateway and curated registry connecting AI coding assistants (Claude Code, Antigravity, Cursor, Codex) to 1,000+ external SaaS tools, APIs, and services (Slack, GitHub, Jira, Gmail, Calendar, Linear) with built-in OAuth authentication, RBAC, and audit logs."
---

# Composio Skills & MCP Gateway

## When to Use
- When your coding agent needs to perform real-world actions across external tools and SaaS platforms (e.g., sending emails, creating Jira tickets, triggering GitHub actions, managing Notion docs, querying Salesforce).
- When you need a unified Model Context Protocol (MCP) gateway rather than manually configuring individual MCP servers for dozens of third-party APIs.
- When browsing or installing from a curated catalog of 1,000+ production-grade agent skills across developer productivity, sales, marketing, and operations.
- When enterprise governance, user authentication (OAuth 2.0 / API keys), and security audit logs are required for agent tool calls.

## Core Capabilities
1. **Unified MCP Gateway**: Provides a single consolidated MCP server endpoint connecting agents to 1,000+ SaaS toolkits without individual local server overhead.
2. **Built-in Authentication & Session Management**: Manages OAuth flows, refresh tokens, and scoped API keys securely in the cloud or self-hosted backend.
3. **Connect-Apps Plugin**: Installs native agent commands (e.g., `/connect-apps:setup`, `/connect-apps:auth`) enabling zero-friction agent integration.
4. **Curated Skill Repository**: Catalogs hundreds of domain-specialized workflow skills including changelog generators, competitor extractors, and canvas designers.
5. **Role-Based Access & Audit Trails**: Restricts high-risk actions (e.g., production database writes or repository deletion) behind explicit confirmation policies.

## Installation / Activation Command
```bash
# Install the connect-apps plugin in Claude Code / Antigravity
claude --plugin-dir ./connect-apps-plugin

# Setup and authenticate with Composio MCP Gateway
/connect-apps:setup

# Browse and install curated skills via npx
npx skills add ComposioHQ/awesome-claude-skills
```

## Prerequisites
- Free or Enterprise Composio account API key (`dashboard.composio.dev`).
- Node.js 18+ or Python 3.10+ (depending on execution harness).
- Compatible MCP client (Claude Code, Antigravity CLI, Codex, Cursor, Gemini CLI).

## Anti-Patterns / Warnings
- **Do not hardcode production API secrets**: Always use the managed authentication broker or secure environment variables.
- **Avoid granting unbounded destructive permissions**: Enforce confirmation checks before allowing agents to execute write/delete actions on customer-facing SaaS systems.
- **Do not bypass local project workflows**: Use Composio for external service orchestration; keep repository-local build, test, and git operations within standard project scripts.

