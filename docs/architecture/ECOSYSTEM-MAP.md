# ECOSYSTEM-MAP.md — Visual Architecture & Framework Topology

> **Status:** Authoritative Ecosystem Blueprint  
> **Repository:** `Ai-Models-List`  
> **Catalog Scope:** 317+ Skills | 104 Upstream Repositories | 4.60M+ Community Stars | 12 Domains  
> **Date:** 2026-11-09  

---

## 🧭 Executive Architecture Topology

The `Ai-Models-List` platform functions as a standardized multi-agent runtime ecosystem, cataloging, synchronizing, and serving production-grade AI agent skills to coding assistants. The system guarantees cryptographic integrity, dual-matrix parity, and framework isolation across 104 open-source projects.

```mermaid
flowchart TB
    subgraph Upstream["🌐 Upstream Open-Source Ecosystem (104 Repositories | 4.60M+ Stars)"]
        direction TB
        UP_ANTHROPIC["Anthropic / Claude Code\n(anthropics/courses, claude-code)"]
        UP_GOOGLE["Google / Android Official\n(android-dev, genai, mediapipe)"]
        UP_COMMUNITY["Pioneering Creators\n(Matt Pocock, obra/superpowers, gstack)"]
        UP_INFRA["Modern Infra & Fullstack\n(Cloudflare, Supabase, Neon, Fastify, Mastra)"]
    end

    subgraph TelemetryEngine["⚙️ Ingestion & Telemetry Pipeline"]
        direction TB
        SCRAPER["GitHub Telemetry Scraper\n(scripts/fetch_github_metrics.py)"]
        SYNCHRONIZER["Dual-Matrix Synchronizer\n(scripts/sync-matrix.py)"]
        INDEXER["Lookup Index Generator\n(scripts/generate_skills_directory.py)"]
        LOCKFILE["Cryptographic Lockfile Engine\n(skills-lock.json / verify-lock.py)"]
    end

    subgraph CoreStorage["📦 Core Storage & Single Source of Truth"]
        direction LR
        MD_MATRIX[("AI-Coding-Skills-Matrix.md\n(GFM Master)")]
        CSV_MATRIX[("AI-Coding-Skills-Matrix.csv\n(Tabular Master)")]
        METRICS_JSON[("data/github-metrics.json\n(Live Telemetry)")]
        LOOKUP_JSON[("data/skills-directory.json\n(1,043 Slugs)")]
    end

    subgraph Distribution["🚀 Multi-Surface Distribution Layer"]
        direction TB
        WEB_APP["Interactive PWA Catalog\n(index.html + sw.js + manifest.json)"]
        CLI_TOOL["Installer & Scaffolder CLI\n(install-to-project.py / new-skill.py)"]
        MCP_SERVER["Stdio MCP Server\n(scripts/mcp-server.py)"]
        OBSIDIAN["Knowledge Vault Sync\n(scripts/sync-obsidian.py)"]
    end

    Upstream --> SCRAPER
    SCRAPER --> METRICS_JSON
    MD_MATRIX <==> SYNCHRONIZER <==> CSV_MATRIX
    CoreStorage --> INDEXER --> LOOKUP_JSON
    CoreStorage --> Distribution
    Distribution --> Developers["👨‍💻 AI Coding Agents & Engineers\n(Antigravity, Claude Code, Cursor, Windsurf)"]
```

---

## 🏛️ The 12 Functional Domains (Taxonomy Map)

```mermaid
mindmap
  root((AI Skills Catalog))
    01 Core Engineering
      TDD & Testing
      Clean Architecture
      Systematic Debugging
      Performance Benchmarking
    02 Matt Pocock Spec
      Office Hours YC
      Grilling & Stress-Testing
      Domain Modeling
      To-Tickets Decomposition
    03 Android Native
      Navigation 3
      Jetpack Compose
      CameraX & Media3
      Play Policy Compliance
    04 Kotlin Multiplatform
      KMP SPM Migration
      Kotlin Toolchains
      JPA Persistence Traps
      Native Performance
    05 UI & UX Design
      UI-UX Pro Max
      Tailwind CSS v4
      Generative UI Widgets
      Tactile Feedback Profiles
    06 GSD Framework
      Discuss Phase
      Plan Backward Verification
      Execute Atomic Commits
      Milestone Closeout
    07 Memory & Context
      MemPalace Knowledge Graph
      Context7 Version Docs
      Graphify AST Subgraphs
      Token Economizer
    08 Cloud & Data
      Cloudflare Workers
      Supabase & Neon PG
      Firebase Agent Suite
      GCP BigQuery & Dataflow
    09 Testing & QA
      Momentic Visual Tests
      Playwright E2E
      Adversarial QA Stress
      API Contract Gating
    10 Frontend Fullstack
      Svelte 5 Runes
      React 19 & Next.js
      Astro Static Web
      Nx Monorepos
    11 Code Review Quality
      CodeRabbit Automation
      Guard Continuous Invariant
      Safety Gates
      Receiving Code Review
    12 Specialized Agents
      Mastra TypeScript Agent
      Firecrawl Web Scraping
      Better Auth Patterns
      Browser Automation
```

---

## 🔄 Multi-Agent Runtime Execution Hierarchy

```mermaid
flowchart TD
    Host["🤖 AI Coding Host Environment\n(Antigravity, Claude Code, Cursor, Windsurf, VS Code)"]
    
    subgraph AgentHarness["Agent Harness Architecture"]
        Runner["Agent Core / Planner Loop"]
        ContextManager["Context & Token Window Budget"]
        RulesEngine["Repository Laws Engine\n(AGENTS.md, repo-laws.md, ponytail.md)"]
    end

    subgraph ProtocolLayer["Protocol & Tooling Layer"]
        MCP["MCP Server Protocol\n(scripts/mcp-server.py)"]
        LocalCLI["Developer CLI Tools\n(install-to-project.py, new-skill.py)"]
        DirectSkill["Local Skills Registry\n(.agents/skills/*)"]
    end

    subgraph SkillExecution["Runtime Skill Execution"]
        SkillFrontmatter["YAML Contract Validation\n(name, description, activation)"]
        WorkflowSteps["Deterministic Step-by-Step Directives"]
        VerificationGate["Evidence-Before-Assertion Gate"]
    end

    Host --> AgentHarness
    AgentHarness --> ProtocolLayer
    ProtocolLayer --> SkillExecution
    SkillExecution --> Codebase["📁 Target Software Codebase"]
```

---

## 📋 Layer 15 Universal Project Documentation Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor Engineer as Engineer / Agent
    participant Matrix as Dual Matrix (MD & CSV)
    participant Scaffolder as Scaffolder CLI (new-skill.py)
    participant QualityGate as Verification Engine
    participant Docs as Layer 15 Project Docs
    participant GitHub as Remote Origin (Git)

    Engineer->>Scaffolder: Run new-skill.py --name <name> --category <cat>
    Scaffolder->>Matrix: Append row to MD & CSV in single turn (Law 1)
    Scaffolder->>Docs: Scaffold SKILL.md with standard YAML (Law 2)
    Scaffolder->>Matrix: Regenerate data/skills-directory.json
    Engineer->>QualityGate: Run sync-matrix.py & test-skills.py
    QualityGate-->>Engineer: 100% Parity & Structure Passed
    Engineer->>Docs: Update TASKS.md & IMPLEMENTATION-STATUS.md (Law 3)
    Engineer->>QualityGate: Run verify-lock.py & unit tests
    QualityGate-->>Engineer: 47/47 Tests Passed cleanly
    Engineer->>GitHub: Push signed release commit
```

---

## 📊 Domain Catalog Reference

| Domain Index | Canonical Domain Name | Upstream Anchor Projects | Active Skills | Default Scoped Prefix |
| :---: | :--- | :--- | :---: | :--- |
| `01` | Core Engineering | `obra/superpowers`, `garrytan/gstack` | 24 | `/core-` or `/superpowers-` |
| `02` | Matt Pocock Workflow | `mattpocock/skills` | 18 | `/mp-` |
| `03` | Android Native | `google/android-skills` | 32 | `/android-` |
| `04` | Kotlin & KMP | `JetBrains/kotlin`, `google/kmp` | 14 | `/kotlin-` |
| `05` | UI/UX & Design | `nextlevelbuilder/ui-ux-pro-max` | 21 | `/ui-` |
| `06` | GSD (Get Stuff Done) | `gsd-labs/gsd` | 38 | `/gsd-` |
| `07` | Memory & Context | `mempalace`, `graphify`, `context7` | 16 | `/mem-` |
| `08` | Cloud & Data Platforms | `cloudflare`, `supabase`, `neon`, `firebase` | 28 | `/cloud-` |
| `09` | Testing & Verification | `momentic`, `playwright`, `superpowers` | 22 | `/test-` |
| `10` | Frontend & Fullstack | `sveltejs`, `vercel/next.js`, `tailwind` | 34 | `/front-` |
| `11` | Code Review & Quality | `coderabbitai`, `superpowers-review` | 26 | `/review-` |
| `12` | Specialized Agents | `mastra-ai`, `firecrawl`, `better-auth` | 44 | `/special-` |

