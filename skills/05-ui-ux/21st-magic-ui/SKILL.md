---
name: 21st-magic-ui
description: "21st.dev design engineering component marketplace, AI UI generation, and Magic MCP server for modern React, Tailwind CSS, and shadcn-ui agents."
priority: P0
category: 05-ui-ux
---

# 21st.dev Magic UI & MCP Server (`21st-dev/cli`)

> **Priority:** `P0` | **Framework:** `21st-dev/cli` | **Domain:** `05-ui-ux` | **Stars:** `⭐ 5.4k+`

21st.dev (`@21st-dev/cli`) is the premier open-source design engineering component marketplace, AI component generator, and Model Context Protocol (MCP) server for modern AI coding assistants (Claude Code, Cursor, Antigravity, Codex, Windsurf). It equips agents with the knowledge and tools to search 12,000+ curated React, Tailwind CSS, and shadcn-ui components, generate interactive UI, and install production code directly into workspaces.

---

## When to Use

Activate this skill when:
- Sourcing, searching, and installing production-grade UI components, micro-interactions, and design templates.
- Integrating the 21st Model Context Protocol (MCP) server (`https://21st.dev/api/mcp`) into coding assistants.
- Generating modern, responsive React/Tailwind UI components and layouts with AI.
- Sourcing brand vector logos (SVGs) and extracting design tokens directly into client projects.
- Preventing AI assistants from hallucinating outdated, unstyled, or broken UI implementations.

---

## Core Capabilities

1. **Universal Component Catalog Search**:
   - Query 12,000+ community and expert components (`21st search "<query>"`) covering pricing tables, hero sections, navigation bars, bento grids, and particle shaders.
   - Inspect dependencies, props, and live preview metadata before installation.
2. **Deterministic 1-Click Component Installation**:
   - Install atomic components directly into your project: `21st add <component-slug>`.
   - Automatically handles TypeScript types, Tailwind CSS classes, and required peer packages (Radix UI, Framer Motion, Lucide).
3. **Magic Model Context Protocol (MCP) Server**:
   - Connects directly to `https://21st.dev/api/mcp`.
   - Equips LLM agents with native tools to search the registry, fetch component source code, and download clean SVG assets programmatically.
4. **AI Component Prototyping & Generation**:
   - Rapidly scaffold novel UI components aligned with your project's existing theme and Tailwind configuration.
5. **Universal Agent Skill Auto-Installation**:
   - Installs agent instructions into local coding environments via `npx @21st-dev/cli install-skill` (or `21st skills install --global`).

---

## Activation Command

### Interactive Activation
```bash
/21st-magic-ui
# Or scoped UI command:
/ui-21st-magic-ui
```

### Equipping Your Agent (Skill Installation)
```bash
# Recommended 1-line installation to train your active AI coding agent:
npx @21st-dev/cli install-skill

# Or install globally via CLI:
21st skills install --global

# Or via Linux Foundation open standard:
npx skills add 21st-dev/skill
```

### CLI Installation & Common Workflows
```bash
# Install 21st CLI globally:
npm install -g @21st-dev/cli

# Login and configure credentials:
21st login

# Search component catalog:
21st search "pricing table"
21st search "animated navbar"

# Install component directly to project:
21st add pricing-table-01

# Configure 21st MCP for your editor:
21st init --client claude
21st init --client cursor
```

### MCP Server Configuration (`claude.json` / `settings.json`)
```json
{
  "mcpServers": {
    "21st": {
      "command": "npx",
      "args": ["-y", "@21st-dev/cli", "mcp"]
    }
  }
}
```

---

## Prerequisites

- Node.js 18+ and npm / pnpm / bun.
- Modern frontend project using React, Tailwind CSS, and TypeScript.
- Optional 21st.dev account for publishing custom components or team registries.

---

## Anti-Patterns & Warnings

> [!WARNING]
> - **Monolithic UI Bloat**: Never install entire heavy UI libraries when a single atomic component (`21st add <slug>`) satisfies the requirement.
> - **Unverified Theme Alignment**: Always inspect installed component tokens to ensure compatibility with your project's `tailwind.config.js` and CSS variables.
> - **Accessibility Oversight**: Verify keyboard focus states (`tabindex`, `:focus-visible`) and ARIA roles when adding complex animated or floating widgets.

