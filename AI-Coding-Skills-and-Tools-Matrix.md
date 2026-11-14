# AI Coding Skills and Tools Matrix

> Markdown edition of the complete workbook. This document preserves the workbook’s 16-sheet order, skill/tool priorities, descriptions, source links, project-documentation standard, and review checklists. The Excel workbook remains unchanged.

## Table of Contents

- [00 Read Me](#00-read-me)
- [01 Core Engineering](#01-core-engineering)
- [02 Matt Pocock](#02-matt-pocock)
- [03 Android Development Skills](#03-android-development-skills)
- [04 Kotlin KMP](#04-kotlin-kmp)
- [05 UI UX Design](#05-ui-ux-design)
- [06 GSD](#06-gsd)
- [07 gstack](#07-gstack)
- [08 Superpowers](#08-superpowers)
- [09 Autonomous Agents](#09-autonomous-agents)
- [10 AI Infrastructure](#10-ai-infrastructure)
- [11 Code Review Quality](#11-code-review-quality)
- [12 Optional Specialized](#12-optional-specialized)
- [13 Priority Summary](#13-priority-summary)
- [14 Source Links](#14-source-links)
- [15 Universal Project Documentation Standard](#15-universal-project-documentation-standard)

## How to read priorities

| Priority | Meaning |
|---|---|
| P0 | Essential; prioritize for the main toolkit. |
| P1 | High; strongly recommended. |
| P2 | Medium; keep available and activate when needed. |
| P3 | Optional; install only for relevant projects or experiments. |

Priority does not mean every skill should stay permanently loaded. Activate the smallest useful set for the current project. Compatibility, model/provider support, licensing, and current repository contents should be checked before installation.

## 00 Read Me

| Field | Details |
| --- | --- |
| Purpose | Master inventory of AI coding skills, frameworks, agent tools and specialized capabilities. |
| Priority P0 | Essential capability; prioritize for the main toolkit. |
| Priority P1 | High value; strongly recommended. |
| Priority P2 | Medium value; enable when the workflow needs it. |
| Priority P3 | Optional; install only for relevant projects. |
| Important | Priority does not mean every skill should remain permanently loaded. Activate only what the current project needs. |
| Compatibility | Verify current repository contents, exact skill names, licensing and Antigravity compatibility before installation. Model-agnostic skills run through the selected coding assistant/model; distinguish assistant compatibility from model-provider support. |
| Avoid duplication | GSD, Superpowers, gstack and general engineering skills overlap. Assign clear responsibilities and avoid loading duplicate workflows. |
| Suggested focus | Android/Kotlin/KMP, core engineering, project planning, UI/UX, testing, debugging, security and code review. |
| Project documentation | See 15_Project_Docs for the reusable project documentation standard, engineering quality checklist, AI self-review and security checklist. |
| Newly reviewed tools | Graphify = codebase relationship graph; Context7 = current external library documentation (complementary). MemPalace = persistent project/conversation memory. GSD Core + GSD Pi = core workflow + Pi host integration. Impeccable = UI design critique/audit/polish. Claude Marketplace = Complete 530 Claude Marketplace plugins matrix (312 Claude Code compatible) with verified GitHub sources and install commands. |
| Tool distinction | Graphify = codebase relationship graph; Context7 = current external library docs; MemPalace = persistent project/conversation memory; GSD Pi = Pi integration for GSD Core. |

## 01 Core Engineering

- **Reference / skill format:** https://agentskills.io/
- **Superpowers repository:** https://github.com/obra/superpowers
- **Matt Pocock skills repository:** https://github.com/mattpocock/skills
- **Addy Osmani Agent Skills repository:** https://github.com/addyosmani/agent-skills

| Skill | Priority | Why |
| --- | --- | --- |
| addy-agent-skills | P0 | Production-grade engineering skills suite by Addy Osmani (113k+ stars). Encodes senior engineering workflows across 9 lifecycle commands (/spec, /plan, /build, /build auto, /test, /constraints, /review, /webperf, /code-simplify, /ship), Web Vitals performance optimization, Chrome DevTools browser testing, and doubt-driven development. |
| brainstorming | P0 | Explore requirements, alternatives and implementation approaches before coding. |
| find-skills | P1 | Discover relevant skills dynamically for different tasks. |
| writing-plans | P0 | Create structured and actionable implementation plans. |
| executing-plans | P0 | Execute implementation plans systematically. |
| systematic-debugging | P0 | Identify root causes instead of guessing. |
| diagnosing-bugs | P0 | Investigate and resolve software defects. |
| test-driven-development | P0 | Follow red-green-refactor and write tests before implementation. |
| code-review | P0 | Review implementation quality, correctness and maintainability. |
| requesting-code-review | P1 | Prepare implementation changes for independent review. |
| receiving-code-review | P1 | Process review feedback and improve implementation. |
| verification-before-completion | P0 | Verify builds, tests and deliverables before claiming completion. |
| domain-modeling | P0 | Create robust domain models and business rules. |
| subagent-driven-development | P1 | Delegate independent implementation tasks to subagents. |
| dispatching-parallel-agents | P2 | Run independent agent tasks in parallel. |
| using-git-worktrees | P1 | Isolate parallel development tasks safely. |
| finishing-a-development-branch | P1 | Complete, validate and integrate development branches. |
| setup-pre-commit | P1 | Configure automated code-quality checks. |
| accidental-data-loss-prevention | P0 | Prevent destructive operations and accidental data loss. |
| git-guardrails-claude-code | P1 | Protect Git operations in supported Claude Code environments; host-specific. |
| writing-for-agents | P1 | Create clear instructions and documentation for coding agents. |
| writing-skills | P2 | Create and maintain reusable agent skills. |
| skill-repair | P2 | Diagnose and repair broken skills. |
| handoff | P1 | Transfer project context between sessions and agents. |
| prototype | P1 | Validate ideas and technical approaches before full implementation. |
| scaffold-exercises | P3 | Create guided implementation exercises. |
| karpathy-guidelines | P1 | Third-party Karpathy-inspired principles: Think Before Coding, Simplicity First, Surgical Changes and Goal-Driven Execution. Encourages explicit assumptions, minimal solutions, request-scoped edits and verifiable success criteria; includes a portable Agent Skill plus documented Claude Code and Cursor integrations. |
| playwright-cli | P0 | End-to-end browser testing, tracing, snapshot comparison, and headless browser automation CLI for Chromium, Firefox, and WebKit. |
| obsidian-markdown | P0 | Steph Ango's (kepano) Obsidian markdown bases, file-over-app principles, knowledge vault architecture, and CLI workflows. |
| google-workspace-cli | P1 | Google Workspace agent automation CLI for managing Gmail, Google Drive, Docs, Sheets, and Calendar tasks programmatically. |
| `typescript-tailwind-patterns` | **TypeScript & Tailwind Patterns** | `P1` | `/typescript-tailwind-patterns` | Advanced TypeScript typing acrobatics, strict branded primitives, and CVA Tailwind token design. |
| `lark-enterprise-cli` | **Lark & Feishu Enterprise CLI** | `P1` | `/lark-enterprise-cli` | Official Lark Suite and Feishu enterprise automation CLI for Docs, Drive, and Bitable. |
| `fastify-backend-perf` | **Fastify Backend Architecture** | `P1` | `/fastify-backend-perf` | High-throughput Node.js Fastify backend architecture, schema compilation, and Pino structured logging. |
| `vercel-agent-browser` | **Vercel Agent Browser** | `P1` | `/vercel-agent-browser` | Vercel Labs headless browser agent automation, DOM inspection, and semantic accessibility navigation. |
| `github-copilot-patterns` | **GitHub Copilot Patterns** | `P1` | `/github-copilot-patterns` | Official GitHub Copilot engineering patterns, instruction steering, and multi-stage Docker workflows. |
| `brag-document-generator` | **Brag Document Generator** | `P1` | `/brag-document-generator` | Automated engineering accomplishment tracking, sprint achievement synthesis, and PR evidence compilation. |
| `firecrawl-web-scrape` | **Firecrawl Web Scraper** | `P1` | `/firecrawl-web-scrape` | Clean LLM-ready markdown extraction, dynamic JS crawler, and structured data parsing. |
| `convex-backend-sync` | **Convex Backend State Sync** | `P1` | `/convex-backend-sync` | Convex reactive database queries, transactional mutations, client state sync, and scheduled jobs. |
| `scrapegraph-ai-pipeline` | **ScrapeGraphAI Pipeline** | `P1` | `/scrapegraph-ai-pipeline` | Graph-based AI web scraping pipelines, LLM-driven structured extraction, and layout-independent web data mining. |
| `better-auth-patterns` | **Better Auth Identity & 2FA** | `P1` | `/better-auth-patterns` | Modern TypeScript authentication, passkeys/WebAuthn, 2FA, session management, and RBAC. |
| `nx-monorepo-architect` | **Nx Monorepo Architecture** | `P1` | `/nx-monorepo-architect` | Nrwl Nx monorepo management, computation caching, affected task pipelines, and project graph boundaries. |
| `firebase-agent-suite` | **Firebase Agent Suite** | `P1` | `/firebase-agent-suite` | Google Firebase backend suite, Firestore security rules audit, Cloud Functions, and Firebase Auth. |
| `svelte5-runes-patterns` | **Svelte 5 Runes Patterns** | `P1` | `/svelte5-runes-patterns` | Svelte 5 runes reactivity ($state, $derived, $effect), SvelteKit SSR hydration, and modern component architecture. |
| `neon-serverless-postgres` | **Neon Serverless Postgres** | `P1` | `/neon-serverless-postgres` | Neon Serverless Postgres CLI, instant database branching, schema migrations, and connection pooling. |
| `clerk-auth-identity` | **Clerk Auth & Identity** | `P1` | `/clerk-auth-identity` | Clerk identity management, multi-tenant organizations, webhook signature verification, and session tokens. |
| `prisma-orm-patterns` | **Prisma ORM Patterns** | `P1` | `/prisma-orm-patterns` | Prisma ORM schema modeling, type-safe queries, database migrations, and relation filters. |
| `stripe-link-checkout` | **Stripe Link 1-Click Checkout** | `P1` | `/stripe-link-checkout` | Stripe Link 1-click checkout, payment credentials auto-fill, identity verification, and Link CLI automation. |
| `obsidian-developer-second-brain` | **Obsidian Developer Second Brain** | `P0` | `/obsidian-developer-second-brain` | Universal Obsidian Developer Second Brain architecture: 4 integration modes, Git-first separation, Dataview dashboards, and automated vault sync. |
| `claude-3-7-hybrid-reasoning` | **Claude 3.7 Hybrid Reasoning** | `P0` | `/claude-3-7-hybrid-reasoning` | Dynamic thinking budget allocation, calibrated step-by-step reasoning tokens, chain-of-thought verification, and fallback guards for Claude 3.7 Sonnet. |
| `cursor-0-45-agentic-rules` | **Cursor 0.45 Agentic Rules** | `P0` | `/cursor-0-45-agentic-rules` | Cursor 0.45+ modular rules standard (.cursorrules & .cursor/rules/*.mdc), agent tool permissions, and multi-file atomic edits. |

## 02 Matt Pocock

- **Repository:** https://github.com/mattpocock/skills
- **Official site:** https://aihero.dev/

| Skill | Priority | Why |
| --- | --- | --- |
| grill-me | P0 | Ask detailed questions to uncover requirements and assumptions. |
| grill-with-docs | P1 | Explore requirements using supporting documentation. |
| to-spec | P0 | Convert discussions into technical specifications. |
| to-tickets | P0 | Break specifications into actionable development tasks. |
| implement | P0 | Implement well-defined engineering tasks. |
| tdd | P0 | Apply test-driven development practices. |
| diagnosing-bugs | P0 | Systematically investigate bugs. |
| code-review | P0 | Review code against requirements and engineering standards. |
| codebase-design | P0 | Maintain a well-structured and maintainable codebase. |
| domain-modeling | P0 | Build reliable domain models. |
| improve-codebase-architecture | P1 | Identify and implement architectural improvements. |
| research | P1 | Research technical solutions and documentation. |
| prototype | P1 | Explore implementation approaches. |
| wayfinder | P1 | Navigate and organize large implementation tasks. |
| resolving-merge-conflicts | P1 | Resolve Git conflicts safely. |
| handoff | P1 | Preserve context between development sessions. |
| ask-matt | P2 | Get guidance on choosing an appropriate engineering workflow. |
| setup-matt-pocock-skills | P1 | Configure the skills collection. |
| triage | P2 | Prioritize issues and incoming work. |
| teach | P2 | Explain technical concepts and workflows. |
| writing-great-skills | P2 | Build reusable and effective agent skills. |
| Repository | Reference | https://github.com/mattpocock/skills |
| Verification note | Check current repository contents before assuming each listed name exists as an installable skill. |  |

## 03 Android Development Skills

- **Official Android Skills documentation:** https://developer.android.com/tools/agents/android-skills/browse
- **Official Android Skills repository:** https://github.com/android/skills
- **Android developer documentation:** https://developer.android.com/
> Official Android skills found in your installation log (36 unique skills)

| Skill | Priority | Why |
| --- | --- | --- |
| android-cli | P0 | Create Android projects, run apps on devices, manage virtual devices and inspect UI. |
| adaptive | P0 | Build responsive Compose UIs that adapt to window sizes, device types and input methods. |
| navigation-3 | P0 | Apply recommended practices for setting up and using Navigation 3. |
| jetpack-compose-performance | P0 | Diagnose recomposition overhead, dropped frames, UI jank and Compose performance problems. |
| android-profiler | P0 | Record and analyze Android performance data to diagnose bottlenecks, jank and memory leaks. |
| anr-audit-and-fix | P0 | Audit codebases for ANR risks and diagnose Application Not Responding stack dumps. |
| r8-analyzer | P0 | Audit and optimize R8 configuration to improve app performance and release behavior. |
| android-intent-security | P0 | Secure Android components and handle Intents safely to prevent privilege escalation and unauthorized access. |
| android-permissions-security | P0 | Audit permissions and IPC components, identify security gaps and remediate vulnerabilities. |
| testing-setup | P0 | Set up a comprehensive testing strategy covering unit, UI and screenshot tests. |
| agp-9-upgrade | P1 | Plan and execute upgrades to Android Gradle Plugin 9. |
| edge-to-edge | P1 | Modernize app layouts with Android edge-to-edge support. |
| migrate-xml-views-to-jetpack-compose | P1 | Plan and implement migration from legacy XML Views to Jetpack Compose. |
| camerax | P1 | Migrate camera functionality to CameraX and apply CameraX best practices. |
| appfunctions | P1 | Expose app workflows to the Android system so on-device AI agents can discover and execute them. |
| navigation-event | P1 | Use NavigationEvent to intercept back gestures and support Predictive Back animations. |
| ml-kit-genai-prompt-api | P1 | Send natural-language requests on-device using the ML Kit GenAI Prompt API and Gemini Nano. |
| mlkit-agent-api | P2 | Build autonomous on-device agentic workflows using the ML Kit GenAI Agent API and Gemini Nano. |
| litert-lm | P2 | Run open text LLMs on-device using the LiteRT-LM Kotlin API on CPU or GPU. |
| litert-runtime | P2 | Run on-device TensorFlow Lite model inference using the LiteRT CompiledModel API. |
| media3-cast-integration | P2 | Integrate Google Cast support into Android apps using Media3. |
| play-billing-library-version-upgrade | P2 | Upgrade the Google Play Billing Library to access newer features and supported versions. |
| play-policy-insights | P1 | Audit apps against Google Play policies, including permissions, account deletion and data safety. |
| restore-credentials | P2 | Implement Credential Manager Restore Credentials for silent sign-in on a new device. |
| verified-email | P2 | Implement secure, OTP-less email verification using Credential Manager. |
| engage-sdk-integration | P2 | Integrate Play Engage SDK to publish content clusters and engage users on Google Play. |
| glance-appwidget-updates-and-memory | P2 | Manage Glance AppWidget state updates, background sync and RemoteViews bitmap memory limits. |
| glance-canonical-layouts | P2 | Build home-screen widgets using recommended Jetpack Glance canonical layouts. |
| android-for-cars-parked-apps | P3 | Adapt supported video, game and browser apps for parked-app experiences in Android Auto and Android Automotive OS. |
| leanback-to-compose-tv-migration | P3 | Migrate Android TV interfaces from the legacy Leanback toolkit to Compose for TV. |
| wear-compose-m3 | P3 | Build Wear OS interfaces with Compose Material 3, including scaffolding, layouts and migrations. |
| wear-widgets | P3 | Build, migrate, update and verify Wear OS widgets using Glance Wear and Remote Compose. |
| display-glasses-with-jetpack-compose-glimmer | P3 | Build projected Android XR apps for display glasses using Jetpack Compose Glimmer. |
| projected-hardware | P3 | Access projected Android XR hardware such as cameras and microphones. |
| ink-app-builder | P2 | Build freehand drawing surfaces with Jetpack Ink and Compose, including stylus input, erasing and persistence. |
| ink-custom-brush-builder | P3 | Create custom Jetpack Ink BrushFamily styles, tips, textures and dynamic brush behaviors. |
| expo-mobile | P1 | Official Expo React Native mobile development workflows, custom dev clients, native module configuration, and OTA update pipelines. |


## 04 Kotlin KMP

- **Kotlin / Swift documentation:** https://kotlinlang.org/docs/home.html · https://www.swift.org/documentation/
- **Kotlin Agent Skills repository:** https://github.com/Kotlin/kotlin-agent-skills

| Skill | Priority | Why |
| --- | --- | --- |
| kotlin-tooling-kotlin-toolchain | P0 | Manage modern Kotlin toolchains. |
| kotlin-tooling-agp9-migration | P1 | Migrate and troubleshoot Android Gradle Plugin 9. |
| kotlin-tooling-java-to-kotlin | P1 | Migrate Java code to Kotlin. |
| kotlin-tooling-native-build-performance | P1 | Optimize Kotlin/Native build performance. |
| kotlin-tooling-immutable-collections-0-5-x-migration | P2 | Handle immutable collections migration. |
| kotlin-tooling-cocoapods-spm-migration | P1 | Manage Kotlin Multiplatform iOS dependency integration. |
| kotlin-tooling-gradle-to-kotlin-toolchain-project | P2 | Modernize Gradle toolchain project configuration. |
| kotlin-tooling-gradle-to-kotlin-toolchain-plugin | P2 | Modernize Gradle toolchain plugin configuration. |
| kotlin-tooling-kotlin-toolchain-plugin-authoring | P3 | Develop custom Kotlin toolchain plugins. |
| swiftui-pro (twostraws) | P0 | SwiftUI-focused agent skill targeting iOS 26+ and Swift 6.4+: modern API usage, navigation, layout, animations, state management, performance, accessibility/VoiceOver and deprecated API pitfalls. Uses the open Agent Skills format; install with npx skills add https://github.com/twostraws/swiftui-agent-skill --skill swiftui-pro. Compatible with Claude Code, Codex, Gemini, Cursor and other Agent Skills hosts. Model-agnostic: guidance is executed by the connected coding model; requires a host that supports Agent Skills. MIT licensed. |
| swiftui-expert-skill (AvdLee) | P0 | Broad SwiftUI expert reference skill for state/data flow, @Observable, view composition, performance, lists/identity, navigation/sheets, Swift Charts, animations, macOS, Liquid Glass, accessibility, image optimization and current SDK migrations. Also includes Python/xctrace tooling to record and analyse Instruments traces (Time Profiler, Hangs, Animation Hitches, SwiftUI updates and cause graph). Agent Skills + portable Agent Plugin; supports Claude Code, Codex, Gemini CLI, Cursor, pi and other compatible hosts. Install: npx skills@latest add https://github.com/avdlee/swiftui-agent-skill --skill swiftui-expert-skill. Model-agnostic; MIT licensed; Xcode/xctrace needed for trace tooling. |
| Repository to verify | Reference | https://github.com/Kotlin/kotlin-agent-skills |
| Verification note | Confirm repository availability and exact skill IDs before installing; treat this source as unverified until checked. |  |

## 05 UI UX Design

- **Meta Astryx design system repository:** https://github.com/meta/astryx
- **Archify repository:** https://github.com/tt-a1i/archify
- **UI/UX Pro Max repository:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **Taste Skill (tasteskill) repository:** https://github.com/Leonxlnx/taste-skill
- **Unslop repository:** https://github.com/heydamir/unslop
- **Impeccable repository / documentation:** https://github.com/pbakaus/impeccable · https://impeccable.style/docs
- **Apple Human Interface Guidelines:** https://developer.apple.com/design/human-interface-guidelines/
- **Google Chrome Modern Web Guidance:** https://developer.chrome.com/docs/modern-web-guidance · https://github.com/GoogleChrome/modern-web-guidance-src

| Skill / Capability | Priority | Why |
| --- | --- | --- |
| archify | P0 | Turn any idea, plan, code, or architecture into explorable, interactive diagrams (architecture, sequence, workflow, data flow, ERD, state/lifecycle) rendered as standalone self-contained HTML with dark/light themes, animations, and image/SVG/WebM export (94k+ stars). |
| astryx | P0 | Meta's agent-ready, fully customizable open-source React design system (14.5k+ stars). Evolved over 8 years powering thousands of apps inside Meta; features 150+ accessible StyleX-powered components, token-based theming (defineTheme), source ejection (swizzle), and built-in Model Context Protocol (MCP) server & CLI (@astryxdesign/cli) designed specifically to prevent AI coding assistants from hallucinating UI styles and layout tokens. |
| ui-ux-pro-max | P0 | Comprehensive UI/UX design-intelligence skill and CLI. Generates project-specific design systems and provides searchable guidance: 79 UI styles (50 active), 192 industry/product reasoning rules and palettes, 74 font pairings, 25 chart types, 119 UX guidelines, and 22 stack-specific playbooks including Jetpack Compose and SwiftUI. Supports Antigravity, Claude Code, Codex CLI, Gemini CLI, OpenCode, Cursor, GitHub Copilot, Windsurf, Kiro and many others. Install with npm install -g ui-ux-pro-max-cli, then uipro init --ai antigravity (or the relevant host). Python 3.x required for local search script. Model-agnostic skill: works through the connected coding assistant/model; it is not an LLM or model API. MIT-licensed core is open source; separate Premium offering adds brand identity, logo, banners/slides, custom iconography, image-generation integrations and enterprise token architecture. Search/guidance does not automatically build or visually QA the product; review output and verify implementation against platform guidelines. |
| impeccable | P1 | Design command toolkit for coding agents: critique UX, audit accessibility/performance/responsive behavior, polish and harden interfaces, and detect common UI quality issues. Complements UI/UX Pro Max and native platform guidelines. |
| ui-taste | P1 | Uizze UI Taste and related UI/UX agent skills. FREE: install/use the ui-taste skill from uizze.sh; the GitHub repo also provides free ui-design, anti-ui-slop and ui-radar skills, plus GitHub-native image-to-ui and uizze-ui packages. Skills work locally without a Uizze account or MCP. PAID: authenticated Uizze MCP at https://uizze.com/mcp provides find_ui_references and find_ui_materials for real app screens, flows, design systems, fonts, icons and materials. Website reference browsing is free without an account. LIMITATIONS: UI Taste/iOS Design are distributed separately from the GitHub skill packages; paid MCP exposes only two retrieval tools and may return no matches; the skills are guidance and playbooks, not a design editor or guaranteed visual QA. Third-party reference assets and branding are not automatically licensed for reuse; retain individual MIT/Apache notices. |
| ios-design | P0 | Build platform-native iOS interfaces using Apple platform conventions. |
| taste-skill | P1 | Anti-slop frontend web design skill for AI coding agents (Leonxlnx/taste-skill, 111k+ stars). Enforces figma.com/x.ai quality bar: plain authentic voice, one section per screen, equal edges, real photography, hero entrances (data-enter), quiet micro-interactions, shader/3D effects reserved strictly for tech/developer tooling, and automated browser-check finish gates. Works across React, Next.js, Vue, Svelte, Astro, Tailwind, or static HTML/CSS. Install with npx skills add https://github.com/Leonxlnx/taste-skill. |
| unslop | P1 | Anti-slop UI redline and design refactoring skill (heydamir/unslop). Audits vibecoded or AI-generated interfaces to eliminate common slop tells (purple/indigo gradients, floating glow blobs, emoji-heavy labels, shouty marketing copy, erratic spacing). Executes a structured 9-pass design review (spacing, color, icons, copy, typography, layout, details, visuals, motion) replacing cheap decorative effects with quiet chrome and domain-crafted UI. Install with npx skills add https://github.com/heydamir/unslop. |
| compose-preview | P1 | Validate Compose UI concepts and layouts visually. |
| prototype | P1 | Explore different UI concepts before implementation. |
| design-consultation | P2 | Develop design systems and design direction. |
| Impeccable capability note | Reference | 24 design commands covering steering, critique/audit, finish/polish and planning/context setup; supports many coding agents including Antigravity per repository README. Hook availability varies by host; the detector can also run in terminal/CI. |
| shadcn-ui | P0 | Accessible, composable Tailwind CSS and Radix UI component library patterns for architecting production-grade design systems and user interfaces. |
| emil-design-eng | P0 | Emil Kowalski's Apple-grade design engineering, fluid micro-interactions, animation vocabulary, gesture physics, and craft polish. |
| vercel-react-patterns | P0 | Vercel Labs production React composition patterns, Server Components architecture, web design guidelines, and performance practices. |
| gsap-animation | P1 | GreenSock Animation Platform (GSAP) professional timeline sequencing, ScrollTrigger scroll-driven animations, SVG morphing, and high-performance DOM motion. |
| `typography-layout-polish` | **Typography & Layout Polish** | `P1` | `/typography-layout-polish` | Fluid type scales (clamp()), optical margin alignment, visual rhythm, and tabular numbers. |
| `stitch-design-system` | **Stitch Design System Bridge** | `P1` | `/stitch-design-system` | Google Labs Stitch design-md UI scaffolding, screen generation, and token compilation bridge. |
| `component-anatomy-specs` | **Component Anatomy Specs** | `P1` | `/component-anatomy-specs` | Design system component anatomy contracts, visual bounding boxes, and layout contracts. |
| `data-viz-html-reports` | **Data Viz & HTML Reports** | `P1` | `/data-viz-html-reports` | Data visualization discipline, charting ergonomics, color scales, and self-contained interactive HTML reports. |
| `interface-feel-polish` | **Interface Feel & Tactile Physics** | `P1` | `/interface-feel-polish` | Interface feel heuristics, tactile micro-physics, spring dynamics, and subtle sensory feedback. |
| `stageshow-ui-presentation` | **Stageshow UI Presentation** | `P1` | `/stageshow-ui-presentation` | Stageshow interactive UI demo orchestration, live presentation states, and slide deck code bridges. |
| `extract-design-tokens` | **Design Token Extractor** | `P1` | `/extract-design-tokens` | Automated extraction of design tokens, color swatches, typography scales, and CSS variables from live websites. |
| `modern-web-guidance` | **Google Chrome Modern Web Guidance** | `P0` | `/modern-web-guidance` | Google Chrome & web standards stewardship (Chrome, Edge, Firefox, MDN) providing 250+ modern web platform best practices, native browser APIs (dialog, popover, CSS anchor positioning, subgrid, container queries, view transitions), accessibility patterns, WebMCP agentic tools, and automated legacy code scanning (legacy-scan). |


## 06 GSD

- **Current official repository:** https://github.com/open-gsd/gsd-core (default branch: next)
- **Current documentation:** https://github.com/open-gsd/gsd-core/tree/next/docs
- **GSD Pi integration:** https://github.com/open-gsd/gsd-pi
- **Version note:** The repository default branch is next. Its package manifest and README/release-note versions can represent different versioning surfaces; verify the actual npm release and installer output before pinning.

| Workflow / Capability | Priority | Why |
| --- | --- | --- |
| gsd-new-project | P0 | Initialize a new project with GSD. |
| gsd-onboard | P0 | Onboard an existing codebase; map and understand the current project. |
| Discuss → Plan → Execute → Verify → Ship | P0 | Core milestone lifecycle documented by current GSD Core; use its current command names and phase workflow rather than relying on legacy command lists. |
| GSD Core host integration | P0 | Current Core supports multiple coding-agent runtimes through its host-integration interface; runtime support and installation mode are version-dependent. |
| GSD companion MCP server | P1 | Companion MCP server provides GSD interface operations; OpenCode integration is documented in current release notes. |
| GSD Pi | P2 | Pi-specific integration/package for using GSD in the Pi coding agent. It is a host/runtime integration, not a separate planning methodology. |
| GSD capability framework | P1 | Optional capabilities extend GSD workflows; evaluate only the capabilities required by the project. |
| GSD security / verification gates | P0 | Use plan/verify gates, API coverage decisions, human checkpoints and lifecycle guards; check exact behavior in the installed release. |
| Legacy command inventory | Reference | Earlier workbook command names may be version-specific or legacy. Do not assume every listed command exists in current GSD Core; use current official command/reference docs. |

## 07 gstack

- **Repository / documentation:** https://github.com/garrytan/gstack

| Workflow / Command | Priority | Why |
| --- | --- | --- |
| office-hours | P1 | Challenge and refine product ideas. |
| plan-ceo-review | P1 | Review product strategy and priorities. |
| plan-eng-review | P0 | Review technical architecture. |
| plan-design-review | P1 | Review interface direction. |
| autoplan | P2 | Combine planning workflows. |
| design-consultation | P1 | Establish visual design direction. |
| design-review | P1 | Evaluate UI quality. |
| review | P0 | Review implementation for bugs. |
| qa | P0 | Perform browser-based quality assurance. |
| ship | P1 | Prepare changes for release. |
| land-and-deploy | P2 | Complete deployment workflows. |
| investigate | P1 | Investigate bugs and production problems. |
| careful | P0 | Protect against risky operations. |
| guard | P1 | Apply safety guardrails. |
| benchmark | P2 | Benchmark application behavior. |
| retro | P2 | Review and improve development processes. |
| document-release | P2 | Prepare release documentation. |
| Repository | Reference | https://github.com/garrytan/gstack |
| Verification note | Verify current command names and Antigravity compatibility. Treat host integration as version-dependent. |  |

## 08 Superpowers

- **Repository:** https://github.com/obra/superpowers

| Skill / Workflow | Priority | Why |
| --- | --- | --- |
| brainstorming | P0 | Explore requirements and design options. |
| writing-plans | P0 | Create implementation plans. |
| executing-plans | P0 | Execute structured implementation plans. |
| test-driven-development | P0 | Enforce TDD. |
| systematic-debugging | P0 | Perform root-cause debugging. |
| subagent-driven-development | P1 | Delegate independent development tasks. |
| requesting-code-review | P1 | Request code review. |
| receiving-code-review | P1 | Address review feedback. |
| using-git-worktrees | P1 | Isolate development tasks. |
| finishing-a-development-branch | P1 | Complete Git workflows. |
| Repository | Reference | https://github.com/obra/superpowers |
| Verification note | Some workflows overlap with Core Engineering and GSD. Avoid loading duplicate implementations unnecessarily. |  |

## 09 Autonomous Agents

- **Understand Anything documentation / repository:** https://understand-anything.com · https://github.com/Egonex-AI/Understand-Anything
- **Ralph repository:** https://github.com/snarktank/ralph
- **OpenHands documentation / repository:** https://docs.openhands.dev/ · https://github.com/OpenHands/OpenHands
- **Codex documentation / repository:** https://developers.openai.com/codex/ · https://github.com/openai/codex
- **Ponytail documentation / repository:** https://ponytail.dev/docs · https://github.com/DietrichGebert/ponytail
- **Harness² repository:** https://github.com/google-research/harness2
- **MemPalace repository:** https://github.com/MemPalace/mempalace
- **T3 Code documentation / repository:** https://github.com/pingdotgg/t3code
- **Everything Claude Code (ECC) website / repository:** https://ecc.tools · https://github.com/affaan-m/ecc

| Tool / Framework | Priority | Why |
| --- | --- | --- |
| understand-anything | P0 | AI-powered codebase and knowledge-base understanding suite (91k+ stars). Multi-agent pipeline analyzes repositories to build interactive visual knowledge graphs, dependency tours, domain business-process maps, and Karpathy-pattern LLM wiki graphs for Claude Code, Codex, Antigravity, and Cursor. |
| Ralph Loop | P1 | Execute PRD-driven tasks autonomously through repeated iterations; use bounded iterations and test gates. |
| Wiggum CLI | P2 | Explore structured autonomous development; verify the exact project and host support. |
| OpenHands | P2 | Run independent autonomous software-development agents. |
| Codex | P1 | Perform complex coding and repository tasks. |
| Ponytail | P1 | Evaluate its coding workflow and implementation approach; verify exact project, features and Antigravity compatibility. |
| Harness² | P3 | Explore research on agent harness design and evaluation; not a standard daily coding plugin. |
| MemPalace | P1 | Persistent local-first memory for project files and agent conversation history; supports semantic/hybrid retrieval, wake-up/context recall, MCP integration and configurable storage backends. Use for durable cross-session knowledge, not source-code relationship mapping. |
| MemPalace data-governance note | P1 | Before indexing private repositories or agent transcripts, define allowed data scope, retention/deletion, local/server backend, embedding model downloads and access controls. |
| T3 Code | P2 | Open-source agent-harness control surface with mobile (iOS/Android), web and desktop clients for monitoring and controlling local coding-agent sessions. Supports Claude Code, Codex, Cursor, Grok Build, OpenCode and Google Antigravity. Useful for remote session access and orchestration visibility; it does not replace the coding agents themselves. |
| Repository - Ralph | Reference | https://github.com/snarktank/ralph |
| Repository - OpenHands | Reference | https://github.com/OpenHands/OpenHands |
| Repository - Codex | Reference | https://github.com/openai/codex |
| Repository - Ponytail | Reference | https://github.com/DietrichGebert/ponytail |
| Repository - Harness² | Reference | https://github.com/google-research/harness2 |
| Repository - MemPalace | Reference | https://github.com/MemPalace/mempalace |
| Safety note | P0 | Use isolated branches/worktrees, iteration limits, build/test gates and human approval before merges or deployments. |
| Repository - T3 Code | Reference | https://github.com/pingdotgg/t3code |
| Everything Claude Code (ECC) | P1 | Broad open-source agent-harness engineering system: 71 specialized agents, 314 skills, rules, hooks, memory/continuous learning, workflow automation and AgentShield security scanning. Covers planning → TDD/implementation → review → verification → memory/improvement. Best-supported on Claude Code; native plugin paths for Codex and Qoder; adapters exist for Cursor, OpenCode, Gemini, Zed, GitHub Copilot, Antigravity and others, but feature parity varies—check platform support matrix before relying on hooks/memory/automation. Multi-harness guided installer supports Claude Code, Codex and Kimi Code; advanced adapters have separate install paths. MIT licensed. Model/provider configuration depends on host; ECC is not a model and does not supply one. Potential overlap with GSD, Superpowers, gstack, MemPalace and security/review tools—select capabilities rather than loading everything. |
| browser-use | P0 | Autonomous web automation and browser agent controller enabling LLMs to navigate, inspect DOM, extract data, click, type, and automate multi-step web workflows. |
| orca-agent | P0 | Multi-agent computer-use CLI and orchestration framework for executing local terminal, desktop, and API actions autonomously. |
| `herdr-orchestration` | **Herdr Multi-Agent Orchestration** | `P1` | `/herdr-orchestration` | Multi-agent fleet orchestration, distributed task dispatch, and consensus coordination. |
| `agent-desktop-gui` | **Agent Desktop GUI** | `P1` | `/agent-desktop-gui` | Native desktop agent orchestration, operating system window management, and GUI interaction. |


| `mastra-agent-framework` | **Mastra Agent Framework** | `P1` | `/mastra-agent-framework` | Mastra TypeScript AI agent framework, graph workflows, tool calling, memory management, and evals. |

## 10 AI Infrastructure

> 10 AI Infrastructure
- **Gemini API documentation / SDK:** https://ai.google.dev/gemini-api/docs · https://github.com/googleapis/python-genai
- **Graphify repository / docs:** https://github.com/Graphify-Labs/graphify · https://docs.graphify.com/
- **Context7 website / repository:** https://context7.com/ · https://github.com/upstash/context7
- **Agent Skills specification repository:** https://github.com/agentskills/agentskills · https://agentskills.io/
- **Billion-Context repository:** https://github.com/ranxianglei/billion-context
- **Anthropic Agent Skills repository:** https://github.com/anthropics/skills
- **Google Agent Skills repository:** https://github.com/google/skills
- **Awesome Claude Skills & Composio MCP Gateway:** https://composio.dev/ · https://github.com/ComposioHQ/awesome-claude-skills
- **Caveman repository:** https://github.com/juliusbrussee/caveman

| Tool / Service | Priority | Why | Official repository / source | Research / reference |
| --- | --- | --- | --- | --- |
| composio-skills | P0 | Unified MCP Gateway and curated registry of 1,000+ agent skills (79k+ stars). Connects AI coding assistants (Claude Code, Antigravity, Cursor, Codex) to 1,000+ external SaaS tools, APIs, and services (Slack, GitHub, Jira, Gmail, Calendar, Linear) with built-in OAuth authentication, RBAC, and audit logs. | https://github.com/ComposioHQ/awesome-claude-skills | https://composio.dev/ |
| caveman | P1 | High-density token compression skill and proxy for AI coding agents (118k+ stars). Cuts input and output tokens by 33% to 65% by enforcing concise, telegraphic communication ('caveman voice') that eliminates conversational filler while preserving 100% of technical code, reasoning substance, and factual correctness. | https://github.com/juliusbrussee/caveman | https://caveman-ai.com/ |
| billion-context | P1 | Context-compression engine for month-long single agent sessions (billions of tokens). Employs semantic context compaction allowing small 100K-token context windows to sustain prolonged development cycles while reducing token consumption by up to 5x. | https://github.com/ranxianglei/billion-context |  |
| atlassian-mcp | P0 | Official Atlassian Model Context Protocol (MCP) server for Claude Code and coding agents. Provides unified context across Jira issues, Confluence documentation, and Bitbucket pull requests with live issue transition and comment workflows. | https://github.com/atlassian/atlassian-mcp-server | https://support.atlassian.com/ |
| huggingface-skills | P1 | Hugging Face model hub and inference integration skills for Claude Code. Enables search, evaluation, fine-tuning scripts, and API orchestration across open-source weights and datasets. | https://github.com/huggingface/skills | https://huggingface.co/docs |
| anthropic-skills | P0 | Anthropic's official public repository for Claude Code Agent Skills (188k+ stars). Provides production-grade system prompts, multi-turn tool calling workflows, architectural reasoning scaffolds, and specialized domain skills tailored for Claude 3.7 Sonnet and Claude 3.5 Haiku. | https://github.com/anthropics/skills | https://docs.anthropic.com/ |
| google-skills | P0 | Google's official open collection of Agent Skills for Google developer platforms, Cloud infrastructure, and AI engineering (23k+ stars). Complements android/skills and google/agents-cli with cross-ecosystem tools for Gemini, Vertex AI, and Workspace. | https://github.com/google/skills | https://ai.google.dev/ |
| Gemini API | P2 | Integrate Gemini APIs into applications and development workflows. |  |  |
| Gemini Live API | P2 | Build real-time Gemini applications. |  |  |
| Gemini Omni Flash API | P3 | Explore Gemini multimodal capabilities. |  |  |
| Graphify | P1 | Builds a local code/document knowledge graph (AST-based code relations, imports/calls, query/path/explain) so agents can navigate relationships and retrieve focused subgraphs instead of repeatedly scanning files. It is codebase-structure intelligence, not a live external library-docs service. |  |  |
| Context7 | P1 | Retrieves current, version-aware documentation and code examples for external libraries/frameworks. Useful when implementing APIs or confirming current library usage. Complementary to Graphify, not redundant. |  |  |
| Repository - Graphify | Reference | https://github.com/Graphify-Labs/graphify |  |  |
| Graphify documentation | Reference | https://docs.graphify.com/ |  |  |
| Context7 website | Reference | https://context7.com/ |  |  |
| Context7 repository | Reference | https://github.com/upstash/context7 |  |  |
| Selection guidance | P0 | Graphify answers: how is this codebase connected and where does execution/reuse flow? Context7 answers: how does this external library/API work in its current version? MemPalace answers: what durable knowledge should persist across sessions? Choose memory products based on privacy, retrieval quality, local-first needs and integrations. |  |  |
| TokenEconomizer | P1 | Experience-driven coding-agent cost control. Learns repository-specific micro-skills from repeated sessions, prunes tools that remain unused, and detects recurring failure loops to suggest a redirect. Local learning data; supports Claude Code, Codex, GitHub Copilot CLI and Pi, with experimental OpenCode support. Evaluate on repeated work in the same repository; savings are workload-dependent. | https://github.com/microsoft/TokenEconomizer | https://arxiv.org/abs/2610.22732 |
| Google Agents CLI | P1 | Google CLI + seven agent skills for building, scaffolding, coding, evaluating, deploying, publishing and observing AI agents on Google Cloud using ADK. It is a toolkit for coding assistants, not a coding agent/model. Works with Antigravity CLI, Claude Code, Codex and other coding agents; framework is ADK by default, while ADK model configuration supports Gemini natively and other providers via LiteLLM (documented examples: OpenAI GPT-4o, Anthropic Claude Sonnet, and Ollama-hosted Llama). Local create/run/eval can use Gemini AI Studio API key; cloud deployment needs Google Cloud. Useful when developing AI agents, not required for normal Android app coding. | https://github.com/google/agents-cli |  |
| agent-skills-spec | P0 | Open specification and reference toolchain (skills-ref) for Agent Skills across Anthropic Claude Code, Cursor, Codex, Gemini CLI, and Antigravity. Defines the universal SKILL.md format, metadata schema, and 3-stage progressive disclosure protocol (Discovery → Activation → Execution) with built-in validation CLI. | https://github.com/agentskills/agentskills | https://agentskills.io/ |
| turborepo | P1 | High-performance monorepo build orchestration, multi-package task pipeline caching, and dependency graph optimization. |
| vercel-ai-sdk | P0 | Unified TypeScript and JavaScript AI SDK for building streaming chat interfaces, generative UI, structured object generation, and multi-agent tool execution. |
| cloudflare-skills | P0 | Cloudflare Workers edge compute, serverless deployment, Wrangler CLI configuration, KV/D1 database bindings, and global edge caching. |
| supabase-skills | P0 | Supabase Postgres database design, pgvector semantic search, row-level security (RLS) policies, edge functions, and client SDK integration. |
| azure-skills | P1 | Microsoft Azure enterprise cloud architecture, AKS Kubernetes deployment, Azure AI Foundry SDK integration, cost optimization, and diagnostic monitoring. |
| `typesafe-ai-schemas` | **TypeSafe AI Schemas** | `P1` | `/typesafe-ai-schemas` | Strict JSON schema validation, typed function calling, and structured output invariant guards. |


## 11 Code Review Quality

> 11 Code Review Quality
- **Cloudflare Security Audit Skill repository:** https://github.com/cloudflare/security-audit-skill
- **CodeRabbit documentation:** https://docs.coderabbit.ai/
- **CodeRabbit skills repository:** https://github.com/coderabbitai/skills

| Tool / Capability | Priority | Why |
| --- | --- | --- |
| semgrep-security | P0 | Semgrep SAST security rule scanner and MCP marketplace for Claude Code (19.5k+ installs). Detects OWASP Top 10 vulnerabilities, hardcoded secrets, and semantic anti-patterns with instant autofix suggestions. |
| greptile-codebase | P1 | Full-codebase semantic intelligence plugin and API for Claude Code (56.6k+ installs). Generates deep architectural context, symbol call graphs, and historical PR reasoning across entire multi-repo codebases. |
| sourcegraph-search | P1 | Sourcegraph Cody and universal code search plugin for Claude Code. Performs regex, structural, and cross-repository symbol indexing to uncover architectural patterns across enterprise codebases. |
| cloudflare-security-audit | P0 | Cloudflare's official coding-agent skill for multi-phase security audits (65k+ stars). Conducts automated vulnerability analysis, surface scanning, and machine-readable risk reporting across dependencies, API routes, authentication gates, and edge workers with independently verified proofs. |
| CodeRabbit | P1 | Automate pull request reviews and identify bugs, security risks and missing tests across GitHub PRs and Google Antigravity. |
| Open Code Review | P2 | Explore additional automated code-review workflows; verify exact product/repository before adoption. |
| code-review skill | P0 | Perform agent-led review during implementation. |
| requesting-code-review | P1 | Prepare changes for independent review. |
| receiving-code-review | P1 | Process and resolve review feedback. |
| verification-before-completion | P0 | Run builds, tests and checks before declaring work complete. |
| setup-pre-commit | P1 | Catch formatting and quality issues before commits. |
| Verification note | CodeRabbit is a review service/integration, not a general-purpose coding skill. Check pricing, permissions and repository access. |  |
| sentry-diagnostics | P0 | Developer-first error tracking, distributed tracing, crash dump analysis, and performance monitoring diagnostics for applications and AI agents. |
| trailofbits-security | P0 | Trail of Bits high-assurance code security, sharp edges detection, supply-chain risk auditing, and static analysis verification. |
| web-quality-a11y | P0 | Addy Osmani's web accessibility (a11y), Core Web Vitals optimization, semantic HTML auditing, and frontend quality engineering. |
| `hallmark-frontend-eval` | **Hallmark Frontend Evaluation** | `P1` | `/hallmark-frontend-eval` | Automated frontend design fidelity evaluation, pixel-level visual regression, and AI component assessment. |
| `browser-act-testing` | **Browser Act Synthetic Testing** | `P1` | `/browser-act-testing` | Autonomous browser actor simulation, synthetic end-to-end user journeys, and session replay testing. |
| `network-latency-benchmarks` | **Network Latency Benchmarks** | `P1` | `/network-latency-benchmarks` | Network latency analysis, DNS/TCP/TLS handshake profiling, TTFB breakdown, and API benchmarking. |
| `continuous-review-loop` | **Continuous Review Loop** | `P1` | `/continuous-review-loop` | Continuous autonomous code review iteration, diff analysis, and auto-remediation convergence loops. |
| `momentic-visual-testing` | **Momentic Visual Testing** | `P1` | `/momentic-visual-testing` | AI-driven visual regression testing, session replay analysis, and automated test failure triage. |
| `currents-playwright-sharding` | **Currents Playwright Sharding** | `P1` | `/currents-playwright-sharding` | Playwright test sharding, parallel CI optimization, flaky test mitigation, and Currents dashboard orchestration. |


## 12 Optional Specialized

> 12 Optional Specialized
- **Google Maps Platform documentation:** https://developers.google.com/maps
- **Google Maps GitHub organization:** https://github.com/googlemaps
- **Python Packaging documentation:** https://packaging.python.org/
- **Python Packaging Authority:** https://github.com/pypa
- **Google Cloud documentation:** https://cloud.google.com/docs
- **Google Cloud repositories:** https://github.com/GoogleCloudPlatform

| Skill / Capability | Priority | Why |
| --- | --- | --- |
| datadog-observability | P1 | Official Datadog agent observability plugin for Claude Code. Pulls live APM traces, error tracking, infrastructure metrics, and monitors directly into coding assistant sessions for defect triage. |
| posthog-analytics | P1 | Official PostHog product analytics, session replay analysis, and feature flag management plugin for Claude Code. Verifies event taxonomy and queries user funnel telemetry. |
| astronomer-airflow | P1 | Astronomer Apache Airflow and data engineering agent skills for Claude Code. Scaffolds DAGs, validates task dependencies, and diagnoses pipeline runtime errors. |
| google-maps-platform | P2 | Add Google Maps and location functionality. |
| agent-browser | P2 | Automate browser workflows. |
| managing-python-dependencies | P2 | Maintain Python tooling and dependencies. |
| kotlin-backend-jpa-entity-mapping | P3 | Develop Kotlin Spring/JPA backends. |
| cloud-databases-onboarding | P3 | Configure cloud databases. |
| gcp-dataflow | P3 | Develop Dataflow pipelines. |
| gcp-spark | P3 | Develop Spark workloads. |
| gcp-spark-troubleshooting | P3 | Diagnose Spark problems. |
| gcp-spark-observability | P3 | Monitor Spark workloads. |
| gcp-pipeline-orchestration | P3 | Orchestrate data pipelines. |
| gcp-data-pipelines | P3 | Develop data pipelines. |
| bigquery-data-transfer-service | P3 | Manage BigQuery data transfers. |
| dataform-bigquery | P3 | Manage BigQuery transformations. |
| dbt-bigquery | P3 | Develop dbt models. |
| notebook-guidance | P3 | Work with notebooks. |
| building-data-apps | P3 | Build data applications. |
| ml-best-practices | P3 | Apply machine-learning engineering practices. |
| schema-mapping | P3 | Map data schemas. |
| data-autocleaning | P3 | Clean datasets. |
| dak-setup | P3 | Specialized environment setup. |
| graphify | P2 | Visualize codebase relationships. |
| remotion-video | P1 | Programmatic video creation and rendering using React, enabling dynamic motion graphics, audio visualization, video compositing, and automated MP4 rendering. |
| stripe-payments | P0 | Official Stripe payment integrations, Checkout sessions, webhook verification, subscription lifecycles, and API upgrades. |
| `hyperframes-media` | **Hyperframes Media** | `P1` | `/hyperframes-media` | Declarative generative video framing, media automation, and scene composition manifests. |
| `marketing-growth-engine` | **Marketing Growth Engine** | `P1` | `/marketing-growth-engine` | Technical SEO audits, conversion rate optimization (CRO), and copywriting heuristics. |
| `video-frame-analysis` | **Video Frame Analysis** | `P1` | `/video-frame-analysis` | Computer vision video frame extraction, timeline scene sampling, and automated video QA inspection. |
| `gamedev-mechanics` | **GameDev Physics & Mechanics** | `P1` | `/gamedev-mechanics` | Game development physics simulations, custom shaders, tactile game-feel heuristics, and 3D math. |
| `higgsfield-visual-media` | **Higgsfield Visual Media** | `P1` | `/higgsfield-visual-media` | Generative image framing, studio lighting presets, product photoshoot staging, and visual media composition. |
| `binance-agentic-wallet` | **Binance Agentic Wallet** | `P1` | `/binance-agentic-wallet` | Binance agentic wallet management, transaction signing, liquidity queries, and blockchain workflows. |
| `motion-sound-effects` | **Motion Sound Effects & Foley** | `P1` | `/motion-sound-effects` | Motion graphics sound design, audio-motion alignment, UI foley effects, and web audio synthesis. |


## 13 Priority Summary

| Priority | Meaning | Recommended action |
| --- | --- | --- |
| P0 | Essential | Prioritize for the main toolkit; enable when relevant. |
| P1 | High | Strongly recommended for regular workflows. |
| P2 | Medium | Keep available and activate when needed. |
| P3 | Optional | Install only for relevant projects or experiments. |
| Operating principle | Modular setup | Do not permanently load every skill. Activate the smallest useful set for each project. |
| Primary focus | Android / Kotlin / KMP | Prioritize Android, Kotlin/KMP, Core Engineering, GSD, UI/UX, testing, debugging, security and code review. |

## 14 Source Links

> 📊 **Live Community Radar**: See [docs/LIVE-STATS.md](docs/LIVE-STATS.md) for real-time GitHub Stars, release tags, and maintenance activity across all upstream repositories.

| Category / Tool | Official Website / Documentation | GitHub Repository | Notes |
| --- | --- | --- | --- |
| Agent Skills Specification | https://agentskills.io/ | https://github.com/agentskills/agentskills | Official open specification, documentation, and skills-ref reference toolchain for Agent Skills (27k+ stars). |
| Matt Pocock Skills | https://aihero.dev/ | https://github.com/mattpocock/skills | Skills collection. |
| Android Skills | https://developer.android.com/tools/agents/android-skills/browse | https://github.com/android/skills | Official Android skills browse page and repository. |
| Kotlin Agent Skills | https://kotlinlang.org/docs/home.html | https://github.com/Kotlin/kotlin-agent-skills | Kotlin language docs and agent skills repository. |
| UI/UX Pro Max | https://uupm.cc/ | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | Official site and GitHub source; MIT-licensed open-source core. CLI installs across multiple coding assistants; model-agnostic skill guidance. Stack coverage includes Jetpack Compose and SwiftUI; Premium is a separate paid offering. |
| Impeccable | https://impeccable.style/docs | https://github.com/pbakaus/impeccable | Design vocabulary and UI review skill. |
| Apple Human Interface Guidelines | https://developer.apple.com/design/human-interface-guidelines/ |  | Official iOS design guidance; no single skill repository. |
| GSD Core | https://github.com/open-gsd/gsd-core/tree/next | https://github.com/open-gsd/gsd-core | Current OpenGSD core repo; active default branch next. Verify the published npm version before pinning. |
| gstack | https://github.com/garrytan/gstack#readme | https://github.com/garrytan/gstack | Workflow toolkit; verify host compatibility. |
| Superpowers | https://github.com/obra/superpowers#readme | https://github.com/obra/superpowers | Agentic skills framework and development methodology. |
| Ralph Loop | https://github.com/snarktank/ralph#readme | https://github.com/snarktank/ralph | Autonomous PRD-driven coding loop. |
| OpenHands | https://docs.openhands.dev/ | https://github.com/OpenHands/OpenHands | Autonomous coding agent platform. |
| OpenAI Codex | https://developers.openai.com/codex/ | https://github.com/openai/codex | Official Codex documentation and code repository. |
| Ponytail | https://ponytail.dev/docs | https://github.com/DietrichGebert/ponytail | Agent skill/rules for smaller, safer implementations; host support varies. |
| Harness² | https://github.com/google-research/harness2#readme | https://github.com/google-research/harness2 | Google Research project; not an officially supported Google product. |
| CodeRabbit | https://docs.coderabbit.ai/ | https://github.com/coderabbitai/skills | Canonical skills/plugin repository with GitHub PR and Antigravity review support. |
| Gemini API | https://ai.google.dev/gemini-api/docs | https://github.com/googleapis/python-genai | Official API docs and Python SDK; other languages have separate SDK repositories. |
| Google Maps Platform | https://developers.google.com/maps | https://github.com/googlemaps | Official docs and GitHub organization. |
| Python Packaging | https://packaging.python.org/ | https://github.com/pypa | Packaging docs and Python Packaging Authority repositories. |
| Google Cloud | https://cloud.google.com/docs | https://github.com/GoogleCloudPlatform | Service-specific documentation and repositories. |
| ML best practices | https://developers.google.com/machine-learning | https://github.com/google | Broad ML references; use a framework-specific repository for implementation. |
| Wiggum CLI | Not verified | Not verified | Exact product/repository was not established. |
| Open Code Review | Not verified | Not verified | Ambiguous label; identify the exact project before adding a source link. |
| GSD Pi | https://github.com/open-gsd/gsd-core/tree/next | https://github.com/open-gsd/gsd-pi | Pi integration for GSD Core; runtime-specific host integration, not a separate GSD framework. |
| MemPalace | https://github.com/MemPalace/mempalace#readme | https://github.com/MemPalace/mempalace | Persistent local-first memory for project sources and agent conversations; MCP and configurable storage backends. |
| Graphify | https://docs.graphify.com/ | https://github.com/Graphify-Labs/graphify | Local code/document knowledge graph; AST-based structural indexing and graph queries. Cloud offering is separate. |
| Context7 | https://context7.com/ | https://github.com/upstash/context7 | Version-aware library/framework docs retrieval; complementary to codebase graph tools. |
| T3 Code | https://github.com/pingdotgg/t3code | https://github.com/pingdotgg/t3code | Open-source agent-harness control surface; mobile, web and desktop control for supported local coding agents. |
| TokenEconomizer | https://github.com/microsoft/TokenEconomizer | https://arxiv.org/abs/2610.22732 |  |
| Uizze GitHub repository | https://github.com/uizze/uizze | Free agent skills, licensing map and distribution details |  |
| Uizze UI Taste on Skills.sh | https://www.skills.sh/site/uizze.sh/ui-taste | UI Taste listing; skill is free, hosted MCP retrieval is paid |  |
| Google Agents CLI | https://google.github.io/agents-cli/ | https://github.com/google/agents-cli | Coding-agent toolkit for Google ADK agent development; compatible hosts include Antigravity CLI, Claude Code, Codex and other coding agents. ADK supports Gemini and alternative model providers via LiteLLM. |
| SwiftUI Pro (twostraws) | https://github.com/twostraws/swiftui-agent-skill | https://github.com/twostraws/swiftui-agent-skill | MIT Agent Skill; focused SwiftUI correctness, modern APIs, accessibility and performance. Host/model-agnostic; supports Claude Code, Codex, Gemini and compatible Agent Skills clients. |
| SwiftUI Expert (AvdLee) | https://github.com/avdlee/swiftui-agent-skill | https://github.com/AvdLee/SwiftUI-Agent-Skill | MIT Agent Skill + portable Agent Plugin; SwiftUI reference library plus executable xctrace record/analyse tooling. Host/model-agnostic; Xcode required for Instruments trace tooling. |
| Everything Claude Code (ECC) | https://ecc.tools | https://github.com/affaan-m/ecc | MIT agent-harness engineering system with agents, skills, hooks, rules, memory, workflows and AgentShield. Claude Code is strongest supported host; Codex/Qoder native paths; other adapters have limited/variable feature parity. Model provider is determined by host configuration. |
| Karpathy Guidelines | https://github.com/multica-ai/andrej-karpathy-skills | https://github.com/multica-ai/andrej-karpathy-skills | Third-party Karpathy-inspired four-principle coding guide; skill metadata declares MIT. Includes portable Agent Skill plus documented Claude Code plugin and Cursor rule. README's plugin install commands point to forrestchang/andrej-karpathy-skills; verify intended install source. |
| Taste Skill (Leonxlnx) | https://tasteskill.dev | https://github.com/Leonxlnx/taste-skill | Anti-slop frontend design skill with browser verification, art direction, and 111k+ stars. |
| Unslop (heydamir) | https://heydamir.design/unslop | https://github.com/heydamir/unslop | Anti-AI-slop UI redline and design refactoring agent skill across 9 structured passes. |
| Google Chrome Modern Web Guidance | https://developer.chrome.com/docs/modern-web-guidance | https://github.com/GoogleChrome/modern-web-guidance-src | Official cross-browser modern web platform guidance and agent skills stewarded by Chrome, Edge, Firefox, and MDN with local search, retrieval, and legacy code scanning CLI. |
| Meta Astryx | https://github.com/meta/astryx | https://github.com/meta/astryx | Meta's agent-ready open-source React design system with built-in MCP server and CLI (14.5k+ stars). |
| Billion-Context | https://github.com/ranxianglei/billion-context | https://github.com/ranxianglei/billion-context | Context-compression plugin for month-long single agent sessions and token savings (4.5k+ stars). |
| Anthropic Agent Skills | https://docs.anthropic.com/ | https://github.com/anthropics/skills | Anthropic's official public repository for Claude Code Agent Skills (188k+ stars). |
| Claude Marketplace Plugins (Complete 530 Catalog) | https://claude.com/marketplace/plugins | https://github.com/anthropics/claude-plugins-official | Complete 530 Claude Marketplace plugins directory (312 Claude Code compatible) with official GitHub source links, install commands, and verification parity. See Claude-Marketplace-Plugins-Matrix.md and Claude-Marketplace-Plugins-Matrix.csv. |
| Google Agent Skills | https://ai.google.dev/ | https://github.com/google/skills | Google's official open collection of Agent Skills for Google developer platforms (23k+ stars). |
| Cloudflare Security Audit Skill | https://github.com/cloudflare/security-audit-skill | https://github.com/cloudflare/security-audit-skill | Cloudflare's coding-agent skill for multi-phase security audits with machine-readable findings (65k+ stars). |
| Addy Osmani Agent Skills | https://addyosmani.com/ | https://github.com/addyosmani/agent-skills | Production-grade engineering skills across 9 lifecycle commands, Web Vitals, and doubt-driven development (113k+ stars). |
| Archify | https://archify.si/ | https://github.com/tt-a1i/archify | Interactive architecture, system design, workflow, and sequence diagrams in standalone HTML (94k+ stars). |
| Understand Anything | https://understand-anything.com/ | https://github.com/Egonex-AI/Understand-Anything | Interactive visual codebase & knowledge-base intelligence suite with onboarding tours (91k+ stars). |
| Composio Skills & MCP Gateway | https://composio.dev/ | https://github.com/ComposioHQ/awesome-claude-skills | Unified MCP Gateway connecting agents to 1,000+ external SaaS integrations and curated skill registry (79k+ stars). |
| Caveman | https://caveman-ai.com/ | https://github.com/juliusbrussee/caveman | High-density telegraphic token compression skill and proxy cutting 33%–65% tokens without losing code precision (118k+ stars). |
| browser-use | https://browser-use.com/ | https://github.com/browser-use/browser-use | Autonomous browser agent and web interaction controller (120k+ stars). |
| shadcn-ui | https://ui.shadcn.com/ | https://github.com/shadcn/ui | Accessible component architecture and design system standard (127k+ stars). |
| orca-agent | https://useorca.com/ | https://github.com/stablyai/orca | Multi-agent orchestration CLI and computer-use engine (118k+ stars). |
| sentry-diagnostics | https://sentry.io/ | https://github.com/getsentry/sentry | Developer-first error tracking, crash reporting, and tracing platform (45k+ stars). |
| turborepo | https://turbo.build/repo | https://github.com/vercel/turborepo | High-performance monorepo build system and task caching (31k+ stars). |
| vercel-ai-sdk | https://sdk.vercel.ai/docs | https://github.com/vercel/ai | Unified TypeScript/JavaScript AI SDK for streaming and tool calling (27k+ stars). |
| playwright-cli | https://playwright.dev/ | https://github.com/microsoft/playwright-cli | Microsoft cross-browser end-to-end testing and automation CLI (15k+ stars). |
| remotion-video | https://www.remotion.dev/ | https://github.com/remotion-dev/skills | Programmatic video creation and motion graphics in React (6.5k+ stars). |
| cloudflare-skills | https://developers.cloudflare.com/workers/ | https://github.com/cloudflare/skills | Cloudflare Workers, Wrangler CLI, KV, and edge infrastructure skills (3.3k+ stars). |
| supabase-skills | https://supabase.com/docs | https://github.com/supabase/agent-skills | Supabase Postgres database best practices, pgvector, and auth workflows (3k+ stars). |
| azure-skills | https://azure.microsoft.com/ | https://github.com/microsoft/azure-skills | Microsoft Azure cloud migration, AKS, AI Foundry, and diagnostics (1.6k+ stars). |
| emil-design-eng | https://emilkowal.ski/ | https://github.com/emilkowalski/skills | Apple design engineering, fluid micro-interactions, and animation vocabulary (54k+ stars). |
| obsidian-markdown | https://stephango.com/file-over-app | https://github.com/kepano/obsidian-skills | Obsidian markdown architecture, file-over-app principles, and knowledge bases (50k+ stars). |
| find-skills | https://skills.sh/ | https://github.com/vercel-labs/skills | Vercel Labs canonical skill discovery engine for agent skill catalogs (38k+ stars). |
| vercel-react-patterns | https://vercel.com/ | https://github.com/vercel-labs/agent-skills | Vercel React composition patterns, Server Components, and web design guidelines (33k+ stars). |
| google-workspace-cli | https://developers.google.com/workspace | https://github.com/googleworkspace/cli | Google Workspace agent automation CLI for Gmail, Drive, Docs, and Sheets (32k+ stars). |
| gsap-animation | https://gsap.com/ | https://github.com/greensock/gsap-skills | GreenSock GSAP professional timeline sequencing and ScrollTrigger motion (18k+ stars). |
| trailofbits-security | https://www.trailofbits.com/ | https://github.com/trailofbits/skills | Trail of Bits high-assurance code security, sharp edges, and supply-chain auditing (8k+ stars). |
| expo-mobile | https://expo.dev/ | https://github.com/expo/skills | Official Expo React Native mobile development workflows and dev clients (4k+ stars). |
| web-quality-a11y | https://addyosmani.com/ | https://github.com/addyosmani/web-quality-skills | Addy Osmani web accessibility (a11y), Core Web Vitals, and quality engineering (3k+ stars). |
| stripe-payments | https://stripe.com/docs | https://github.com/stripe/ai | Official Stripe payment integrations, Checkout sessions, and subscription lifecycles (2k+ stars). |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | **⭐ 80.5k** | `latest` | `Other` | 2026-11-08 |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | **⭐ 59.0k** | `latest` | `Other` | 2026-11-08 |
| [nutlope/hallmark](https://github.com/nutlope/hallmark) | **⭐ 50.2k** | `latest` | `MIT` | 2026-11-08 |
| [herdrdev/herdr](https://github.com/herdrdev/herdr) | **⭐ 49.1k** | `latest` | `MIT` | 2026-11-08 |
| [wshobson/agents](https://github.com/wshobson/agents) | **⭐ 42.2k** | `latest` | `MIT` | 2026-11-08 |
| [larksuite/cli](https://github.com/larksuite/cli) | **⭐ 18.0k** | `latest` | `MIT` | 2026-11-08 |
| [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | **⭐ 11.5k** | `latest` | `MIT` | 2026-11-08 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | **⭐ 8.6k** | `latest` | `Apache-2.0` | 2026-11-08 |
| [typesafe-ai/skills](https://github.com/typesafe-ai/skills) | **⭐ 2.8k** | `latest` | `MIT` | 2026-11-08 |
| [mcollina/skills](https://github.com/mcollina/skills) | **⭐ 1.9k** | `latest` | `MIT` | 2026-11-08 |
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | **⭐ 46.8k** | `latest` | `MIT` | 2026-11-08 |
| [github/awesome-copilot](https://github.com/github/awesome-copilot) | **⭐ 40.9k** | `latest` | `MIT` | 2026-11-08 |
| [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy) | **⭐ 25.8k** | `latest` | `MIT` | 2026-11-08 |
| [latent-spaces/brag](https://github.com/latent-spaces/brag) | **⭐ 20.7k** | `latest` | `MIT` | 2026-11-08 |
| [bradautomates/claude-video](https://github.com/bradautomates/claude-video) | **⭐ 20.2k** | `latest` | `MIT` | 2026-11-08 |
| [vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) | **⭐ 18.9k** | `latest` | `MIT` | 2026-11-08 |
| [gamedev-skills/awesome-gamedev-agent-skills](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) | **⭐ 7.6k** | `latest` | `MIT` | 2026-11-08 |
| [browser-act/skills](https://github.com/browser-act/skills) | **⭐ 6.3k** | `latest` | `MIT` | 2026-11-08 |
| [higgsfield-ai/skills](https://github.com/higgsfield-ai/skills) | **⭐ 1.9k** | `latest` | `MIT` | 2026-11-08 |
| [daymade/claude-code-skills](https://github.com/daymade/claude-code-skills) | **⭐ 1.5k** | `latest` | `MIT` | 2026-11-08 |
| [jakubkrehel/make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better) | **⭐ 3.9k** | `latest` | `MIT` | 2026-11-08 |
| [jeremylongshore/tons-of-skills-marketplace](https://github.com/jeremylongshore/tons-of-skills-marketplace) | **⭐ 2.9k** | `latest` | `MIT` | 2026-11-08 |
| [benjitaylor/skills](https://github.com/benjitaylor/skills) | **⭐ 2.5k** | `latest` | `MIT` | 2026-11-08 |
| [binance/binance-skills-hub](https://github.com/binance/binance-skills-hub) | **⭐ 1.2k** | `latest` | `MIT` | 2026-11-08 |
| [barty-bart/motion-graphics](https://github.com/barty-bart/motion-graphics) | **⭐ 1.1k** | `latest` | `MIT` | 2026-11-08 |


| [firecrawl/cli](https://github.com/firecrawl/cli) | **⭐ 678** (663k+ Installs) | `latest` | `AGPL-3.0` | 2026-11-08 |
| [convex/agent-skills](https://github.com/convex/agent-skills) | **⭐ 69** (666k+ Installs) | `latest` | `Apache-2.0` | 2026-11-08 |
| [scrapegraphai/just-scrape](https://github.com/scrapegraphai/just-scrape) | **⭐ 75** (245k+ Installs) | `latest` | `MIT` | 2026-11-08 |
| [momentic-ai/skills](https://github.com/momentic-ai/skills) | **⭐ 17** (137k+ Installs) | `latest` | `MIT` | 2026-11-08 |
| [arvindrk/extract-design-system](https://github.com/arvindrk/extract-design-system) | **⭐ 272** (131k+ Installs) | `latest` | `MIT` | 2026-11-08 |
| [better-auth/skills](https://github.com/better-auth/skills) | **⭐ 228** (131k+ Installs) | `latest` | `MIT` | 2026-11-08 |
| [2dmurali/review-loop-skill](https://github.com/2dmurali/review-loop-skill) | **⭐ 7** (110k+ Installs) | `latest` | `MIT` | 2026-11-08 |
| [mastra-ai/skills](https://github.com/mastra-ai/skills) | **⭐ 102** (95k+ Installs) | `latest` | `Apache-2.0` | 2026-11-08 |
| [spillwavesolutions/design-doc-mermaid](https://github.com/spillwavesolutions/design-doc-mermaid) | **⭐ 182** (92k+ Installs) | `latest` | `MIT` | 2026-11-08 |
| [nrwl/nx-ai-agents-config](https://github.com/nrwl/nx-ai-agents-config) | **⭐ 30** (87k+ Installs) | `latest` | `MIT` | 2026-11-08 |

| [firebase/agent-skills](https://github.com/firebase/agent-skills) | **⭐ 505** (5.9k+ Installs) | `latest` | `Apache-2.0` | 2026-11-08 |
| [elevenlabs/skills](https://github.com/elevenlabs/skills) | **⭐ 539** | `latest` | `MIT` | 2026-11-08 |
| [solana-foundation/solana-dev-skill](https://github.com/solana-foundation/solana-dev-skill) | **⭐ 589** | `latest` | `Apache-2.0` | 2026-11-08 |
| [currents-dev/playwright-best-practices-skill](https://github.com/currents-dev/playwright-best-practices-skill) | **⭐ 418** | `latest` | `MIT` | 2026-11-08 |
| [sveltejs/ai-tools](https://github.com/sveltejs/ai-tools) | **⭐ 337** | `latest` | `MIT` | 2026-11-08 |
| [neondatabase/agent-skills](https://github.com/neondatabase/agent-skills) | **⭐ 111** (5.2k+ Installs) | `latest` | `Apache-2.0` | 2026-11-08 |
| [clerk/skills](https://github.com/clerk/skills) | **⭐ 93** | `latest` | `MIT` | 2026-11-08 |
| [prisma/skills](https://github.com/prisma/skills) | **⭐ 79** | `latest` | `Apache-2.0` | 2026-11-08 |
| [stripe/link-cli](https://github.com/stripe/link-cli) | **⭐ 894** (1.3k+ Installs) | `latest` | `MIT` | 2026-11-08 |

## 15 Universal Project Documentation Standard

- **Purpose:** Reusable documentation baseline for software projects built by humans and AI agents.
- **Operating principle:** Create only applicable documents; keep every document synchronized with implementation and verified evidence.
- **Priority key:** P0 = every project \| P1 = most serious projects \| P2 = only when applicable
- **Repository layout:** See the Repository Structure section below; omit irrelevant folders rather than creating empty files.

### Documentation register

| Layer | Document / Directory | Priority | Purpose / Key contents | Applicability |
| --- | --- | --- | --- | --- |
| 01 · Foundation | README.md | P0 | Project overview, setup, features, supported platforms, build/test commands and links to key docs. | Every project |
| 01 · Foundation | LICENSE | P0 | Defines the project license and permitted use; select an appropriate license before public distribution. | Every project; especially open-source |
| 01 · Foundation | CONTRIBUTING.md | P1 | Contribution workflow, coding standards, issue/PR expectations and local development steps. | Open-source or multi-contributor projects |
| 01 · Foundation | CHANGELOG.md | P1 | Human-readable record of notable changes by release/version. | Projects with releases |
| 01 · Foundation | SECURITY.md | P1 | Supported versions, vulnerability reporting channel and responsible disclosure expectations. | Public or security-sensitive projects |
| 01 · Foundation | CODE_OF_CONDUCT.md | P2 | Community participation and conduct expectations. | Open-source communities |
| 02 · Business & strategy | MRD.md | P2 | Market problem, target segments, competitor landscape, opportunity and positioning. | When market validation or commercial strategy matters |
| 02 · Business & strategy | BRD.md | P1 | Business objectives, outcomes/KPIs, constraints, stakeholders, costs, risks and compliance needs. | Most product/business projects |
| 03 · Product & scope | PRD.md | P0 | Product vision, users, use cases, functional/non-functional requirements, UX flows and acceptance criteria. | Every product project |
| 03 · Product & scope | ROADMAP.md | P0 | Phases, milestones, sequencing, release gates and scope boundaries. | Every project with phased delivery |
| 03 · Product & scope | FEATURES.md | P0 | Stable feature IDs and status: planned, in progress, implemented, verified, blocked or deprecated. | Every project |
| 03 · Product & scope | PERSONAS.md | P2 | User segments, needs, contexts and accessibility considerations. | When multiple user groups matter |
| 04 · Architecture & engineering | ARCHITECTURE.md | P0 | System context, components, boundaries, data flows, dependencies, architectural patterns and diagrams. | Every project |
| 04 · Architecture & engineering | TRD.md | P1 | Platforms, OS/API targets, toolchains, hardware constraints, performance budgets and technical limits. | Most non-trivial projects |
| 04 · Architecture & engineering | SRD.md | P1 | Detailed software requirements, subsystem behavior, interfaces, error states and fallback behavior. | Medium/large or regulated projects |
| 04 · Architecture & engineering | SSD.md | P2 | Module/class decomposition, runtime interactions, state machines, threading and lifecycle behavior. | Complex systems |
| 04 · Architecture & engineering | TSD.md | P2 | Low-level algorithms, data formats, wire protocols, binary layouts and mathematical specifications. | Protocol-, hardware- or algorithm-heavy systems |
| 04 · Architecture & engineering | API-SPECIFICATION.md | P2 | API endpoints/contracts, schemas, auth, errors, versioning and examples; link to OpenAPI when used. | Projects exposing or consuming important APIs |
| 04 · Architecture & engineering | DATA-MODEL.md | P1 | Entities, relationships, ownership, persistence, validation, migrations and retention rules. | Projects with persistent or shared data |
| 04 · Architecture & engineering | adr/ | P1 | Numbered, append-only Architecture Decision Records: status, context, decision, consequences and alternatives. | Projects making consequential architecture choices |
| 05 · AI governance | AGENTS.md | P0 | Agent entry point: project context, non-negotiable rules, workflow, verification commands and links to detailed guidance. | Every AI-assisted project |
| 05 · AI governance | docs/governance/RULES.md | P0 | Coding conventions, architecture laws, dependency rules, security constraints and prohibited patterns. | Every AI-assisted project |
| 05 · AI governance | docs/governance/SPRINT-RULES.md | P1 | Story sizing, branch/commit expectations, implementation gates and sprint completion rules. | Projects using sprint-based agent execution |
| 05 · AI governance | docs/governance/BRANCHING.md | P1 | Branch naming, branch protection, merge strategy, release branches and hotfix lifecycle. | Team or multi-agent Git workflows |
| 05 · AI governance | docs/governance/MEMORY.md | P1 | Curated durable project learnings, recurring pitfalls and validated workarounds; avoid stale transient logs. | Long-running AI-assisted projects |
| 05 · AI governance | GLOSSARY.md | P0 | Canonical domain terms, abbreviations and definitions to keep human and agent language consistent. | Every domain-heavy project; recommended for all |
| 05 · AI governance | docs/governance/AI-WORKFLOW.md | P1 | Agent roles, handoffs, tool permissions, context-loading rules, review responsibilities and escalation paths. | Projects using multiple or autonomous agents |
| 06 · Execution | tasks/ralph/prd.json | P1 | Machine-readable atomic stories with IDs, priority, target files, acceptance criteria and pass state. | When using Ralph or compatible automation |
| 06 · Execution | tasks/ralph/progress.txt | P1 | Append-only execution journal: story progress, commits, commands, test evidence and blockers. | When using Ralph or automated execution |
| 06 · Execution | SPRINT-PLAN.md / sprint plans | P2 | Sprint goals, scope, dependencies, owners/agents and exit criteria. | Sprint-based projects |
| 06 · Execution | docs/IMPLEMENTATION-STATUS.md | P0 | Truthful status of features and subsystems, with evidence and known gaps; distinguish implemented from verified. | Every project |
| 07 · Quality & security | docs/testing/TEST-STRATEGY.md | P0 | Test pyramid, test types, environments, coverage expectations, automation and release verification. | Every project |
| 07 · Quality & security | docs/testing/TEST-CASES.md | P2 | Traceable scenarios, edge cases, regression cases and acceptance-test mapping. | Complex or high-risk projects |
| 07 · Quality & security | docs/security/THREAT-MODEL.md | P2 | Assets, trust boundaries, threats, attack surfaces, mitigations and residual risks. | Security-sensitive projects or those handling user data |
| 07 · Quality & security | docs/SECURITY.md | P1 | Security architecture, secrets handling, permissions, dependency hygiene and vulnerability response. | Most production projects |
| 07 · Quality & security | docs/PERFORMANCE.md | P2 | Performance budgets, profiling approach, benchmarks and regression thresholds. | Performance-sensitive applications/services |
| 07 · Quality & security | docs/ACCESSIBILITY.md | P2 | Accessibility requirements, semantics, assistive technology checks and validation approach. | User-facing applications; strongly recommended |
| 07 · Quality & security | docs/reports/ | P1 | Sprint/release closeout reports with build/test results, review findings, acceptance evidence and open risks. | Projects with formal milestones |
| 08 · Operations & release | docs/BUILD-GUIDE.md | P1 | Reproducible local/CI build steps, required tools, commands and troubleshooting. | Every project beyond a tiny prototype |
| 08 · Operations & release | docs/ENVIRONMENT.md | P1 | Environment variables, configuration profiles, secrets references and setup requirements; never store secret values. | Projects with environment-specific configuration |
| 08 · Operations & release | docs/RELEASE-PROCESS.md | P1 | Versioning, release checklist, signing, artifact validation, rollout and rollback. | Projects distributed to users |
| 08 · Operations & release | docs/DEPLOYMENT.md | P2 | Infrastructure, deployment topology, configuration, migrations, rollout and rollback steps. | Deployed services/backends |
| 08 · Operations & release | docs/TROUBLESHOOTING.md | P1 | Known failures, symptoms, diagnostics, fixes and links to relevant issues. | Projects with recurring setup/runtime issues |
| 08 · Operations & release | docs/RUNBOOK.md | P2 | Operational procedures, alerts, incident response, recovery and maintenance tasks. | Production services |
| 09 · Project-specific | Platform / integration / privacy documents | P2 | Add platform-specific rules, offline sync, data retention, third-party integrations, observability or hardware docs as needed. | Only when relevant to the product |
| 05 · AI governance | docs/governance/DECISION.md | P1 | Append-only engineering decision journal for meaningful implementation choices: context, options, chosen approach, rationale, trade-offs, affected files and verification. Link formal architecture decisions to numbered ADRs. | AI-assisted projects with ongoing code changes |
| 04 · Architecture & engineering | docs/architecture/FLOW.md | P1 | Current execution-flow map showing how key user actions, events, functions, modules and files connect; include entry points, data/state transitions, API/database boundaries and error paths. Update when flows change. | Non-trivial applications; especially useful for onboarding and agent navigation |

### Standard repository layout (adapt per project)

Adapt this structure to the project. Omit irrelevant folders rather than creating empty files.

| Directory | Typical contents |
| --- | --- |
| Project/ | README.md · LICENSE · CONTRIBUTING.md · CHANGELOG.md · SECURITY.md · AGENTS.md · GLOSSARY.md |
| docs/business/ | MRD.md · BRD.md |
| docs/product/ | PRD.md · ROADMAP.md · FEATURES.md · PERSONAS.md |
| docs/architecture/ | ARCHITECTURE.md · TRD.md · SRD.md · SSD.md · TSD.md · API-SPECIFICATION.md · DATA-MODEL.md · adr/ |
| docs/governance/ | RULES.md · SPRINT-RULES.md · BRANCHING.md · MEMORY.md · AI-WORKFLOW.md |
| docs/testing/ | TEST-STRATEGY.md · TEST-CASES.md |
| docs/security/ | THREAT-MODEL.md |
| docs/operations/ | BUILD-GUIDE.md · DEPLOYMENT.md · RELEASE-PROCESS.md · ENVIRONMENT.md · TROUBLESHOOTING.md · RUNBOOK.md |
| docs/reports/ | Sprint and release closeout reports |
| docs/ | IMPLEMENTATION-STATUS.md · PERFORMANCE.md · ACCESSIBILITY.md |
| tasks/ralph/ | prd.json · progress.txt (only when Ralph is used) |
| src/ |  |

### Documentation governance rules

1. PRD defines product scope; agents must not silently invent requirements.
2. ARCHITECTURE is the architecture source of truth; consequential changes require an ADR.
3. AGENTS.md is the agent entry point and should link to detailed rules instead of duplicating them.
4. FEATURES.md uses stable feature IDs and explicit lifecycle statuses.
5. IMPLEMENTATION-STATUS.md must distinguish planned, partial, implemented, and verified functionality.
6. Progress logs are append-only; preserve historical execution evidence.
7. Update relevant documentation in the same change as the code it describes.
8. Never claim a build, test, benchmark or review passed unless it was actually run and evidence is recorded.
9. Sprint closeout records acceptance criteria, test/build results, review findings and unresolved risks.
10. Keep documents concise, current and cross-linked; remove obsolete guidance rather than letting it conflict.

### Engineering quality and maintainability checklist

| Area | Engineering rule | Priority | Applicability |  |
| --- | --- | --- | --- | --- |
| Code organization | Organize the project into a clear, predictable structure with documented module boundaries. | P0 | All projects |  |
| Separation of concerns | Keep business/domain logic separate from UI, presentation and framework-specific code. | P0 | All projects |  |
| Dead and duplicate code | Remove genuinely unused, unreachable and duplicated code after checking references, build variants and generated code. | P0 | All projects |  |
| Naming conventions | Use consistent, descriptive naming for packages, modules, types, functions, variables, resources and files. | P0 | All projects |  |
| Error handling | Handle expected failures explicitly; preserve useful context, avoid swallowed exceptions and provide safe user-facing fallbacks. | P0 | All projects |  |
| Environment configuration | Separate environment-specific configuration from source; validate required values and never commit secrets. | P0 | All projects |  |
| Reusable components | Extract components and utilities when reuse improves consistency; avoid premature abstraction and oversized shared modules. | P1 | When reuse is meaningful |  |
| State management | Define state ownership, lifecycle, events, loading/error/empty states and concurrency rules consistently. | P0 | Stateful applications |  |
| Codebase documentation | Document module responsibilities, non-obvious logic, public contracts and important setup/maintenance workflows. | P0 | All projects |  |
| Scalable API structure | Use explicit API contracts, versioning strategy where needed, consistent error models, validation and clear client/server boundaries. | P1 | Projects with APIs |  |

### AI agent self-review — quiz before marking work complete

| Review area | Agent must answer before completion | Gate |  |  |
| --- | --- | --- | --- | --- |
| Requirements | Can I point to the requirement/story and acceptance criteria for this change? | Required |  |  |
| Architecture | Can I explain why this approach fits the documented architecture and constraints? | Required |  |  |
| Code flow | Can I trace the changed execution path across the relevant files, functions and state transitions? | Required |  |  |
| Alternatives | Did I consider a simpler or safer alternative, and record a meaningful decision where appropriate? | Required |  |  |
| Correctness | Have I checked edge cases, null/empty states, concurrency and failure paths relevant to this change? | Required |  |  |
| Security | Have I considered input validation, authorization, data exposure, secrets and relevant threat scenarios? | Required |  |  |
| Verification | Which exact tests, builds, static checks or manual checks did I run, and what were their results? | Required |  |  |
| Documentation | Did I update FLOW.md, DECISION.md, FEATURES.md or other documents affected by this change? | Required |  |  |
| Maintainability | Did I introduce unnecessary duplication, dead code, unclear naming or avoidable complexity? | Required |  |  |
| Honesty | Am I claiming only what is implemented and verified, with remaining gaps clearly stated? | Required |  |  |

### Security checklist — assess applicability and record evidence

| Category | Check | Expected control / verification | Priority | Applicability |
| --- | --- | --- | --- | --- |
| Injection and input | SQL/NoSQL injection | Use parameterized queries or safe query builders; validate input at trust boundaries. | P0 | Backend/database |
| Injection and input | Cross-site scripting (XSS) | Contextual output encoding, safe rendering, sanitization where HTML is intentionally accepted, and a suitable CSP. | P1 | Web applications |
| Injection and input | CSRF protection | Use appropriate anti-CSRF defenses for cookie-authenticated browser requests; validate SameSite/origin strategy. | P1 | Cookie-authenticated web apps |
| Injection and input | File upload validation | Validate size, type and content; generate safe names; store outside executable web roots; scan/process safely. | P1 | Apps accepting uploads |
| Injection and input | SSRF | Restrict outbound destinations, block private/metadata ranges where appropriate, validate redirects and avoid arbitrary URL fetches. | P1 | Services fetching user-supplied URLs |
| Injection and input | General input validation | Validate type, length, range, format and business invariants on the server or trusted boundary; do not rely on UI validation alone. | P0 | All systems |
| Authentication and access | Broken object-level authorization (BOLA/IDOR) | Authorize every object/action against the authenticated principal; never trust client-supplied IDs alone. | P0 | APIs and multi-user data |
| Authentication and access | Rate limiting and abuse controls | Apply limits to login, OTP, password reset, expensive endpoints and other abuse-prone operations. | P1 | Networked services |
| Authentication and access | Secure password hashing | Hash passwords server-side with a modern password-hashing algorithm and unique salts; never encrypt or store plaintext passwords. | P0 | Systems storing passwords |
| Authentication and access | Multi-factor authentication | Offer or enforce MFA according to risk, account sensitivity and compliance requirements. | P1 | Accounts and privileged access |
| Authentication and access | Server-side authorization | Enforce roles, permissions and ownership on the server for every protected operation; UI hiding is not authorization. | P0 | Client/server applications |
| Authentication and access | Row-level security | Use database row-level policies as defense in depth where supported; test policies for both allowed and denied access. | P1 | Multi-tenant or user-scoped databases |
| Secrets and tokens | JWT and signing secrets | Generate strong secrets/keys, store in a secrets manager, rotate when exposed and validate issuer, audience, expiry and algorithm. | P0 | JWT-based systems |
| Secrets and tokens | API secrets remain server-side | Never embed privileged API keys or private credentials in mobile, web or desktop client binaries; proxy through trusted services when needed. | P0 | Applications using private credentials |
| Secrets and tokens | Secure token storage | Avoid browser localStorage for sensitive long-lived tokens; use appropriate secure, platform-provided storage and short-lived credentials. Do not apply a blanket token-removal rule to all clients. | P0 | Apps handling authentication tokens |
| Secrets and tokens | Default credentials | Remove or rotate default accounts, passwords, keys and sample credentials before deployment. | P0 | Deployable systems |
| Configuration and hygiene | CORS policy | Allow only required origins, methods and headers; never combine credentialed requests with wildcard origins. | P1 | Browser-facing APIs |
| Configuration and hygiene | Webhook signatures | Verify signatures using the raw request body, compare safely, enforce timestamp/replay protections and rotate signing secrets. | P1 | Webhook consumers |
| Configuration and hygiene | Source maps and debug artifacts | Do not publicly expose sensitive source maps, debug endpoints or verbose production diagnostics; protect artifacts if needed for monitoring. | P1 | Web/production builds |
| Configuration and hygiene | Sensitive data in logs | Redact passwords, tokens, personal data and secrets; restrict log access and retention. | P0 | All systems |
| Configuration and hygiene | Vulnerable dependencies | Track dependency advisories, update vulnerable packages, review transitive dependencies and remove unused dependencies. | P0 | All projects |
| Configuration and hygiene | Transport and data protection | Use TLS in transit and appropriate encryption/key management for sensitive data at rest. | P0 | Networked or data-sensitive systems |
| Configuration and hygiene | Security headers and platform settings | Apply appropriate security headers, secure cookie flags, platform permissions and production hardening. | P1 | Where applicable |
| Configuration and hygiene | Backup, retention and deletion | Define backup access, retention periods, recovery tests and deletion behavior for user data. | P1 | Systems storing important user data |

> **Checklist rule: mark each item Applicable / Not applicable / Verified / Needs work in the project’s security review. Record evidence or a remediation task; do not claim a control is satisfied merely because it is documented.**

---

## Source and conversion notes

- Source: **AI Coding Skills and Tools Matrix.xlsx** (16 worksheets).
- Workbook sheet names are preserved in the section identifiers and the original sheet order is retained.
- Spreadsheet hyperlinks are reproduced as URL text in Markdown tables and source lists.
- No new research or unverified capabilities were added during conversion; descriptions and priorities are taken from the workbook.
- For the most up-to-date details, follow each official repository/documentation link in **14 · Source Links**.

