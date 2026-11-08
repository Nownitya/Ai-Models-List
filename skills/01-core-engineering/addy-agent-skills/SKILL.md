---
name: addy-agent-skills
description: "Production-grade engineering skills suite by Addy Osmani. Encodes senior engineering workflows across 9 lifecycle commands (/spec, /plan, /build, /build auto, /test, /constraints, /review, /webperf, /code-simplify, /ship), Web Vitals performance optimization, Chrome DevTools browser testing, and doubt-driven development."
---

# Addy Osmani Agent Skills: Senior Engineering Workflow Suite

## When to Use
- When executing end-to-end software delivery with disciplined engineering gates: from initial specification through atomic planning, TDD implementation, code simplification, performance profiling, and production release.
- When building frontend web applications and requiring specialized Web Vitals audits (LCP, INP, CLS, memory leak triage) and Chrome DevTools automation.
- When you want autonomous, single-pass implementation waves with verification pauses using `/build auto`.
- When dealing with high-stakes or unfamiliar codebases where agent assumptions must be actively interrogated (`doubt-driven-development`).

## Core Capabilities
1. **Nine Lifecycle Commands**:
   - `/spec`: Formulate technical specifications and acceptance criteria before writing code.
   - `/plan`: Decompose specs into small, atomic, dependency-ordered tasks.
   - `/build` & `/build auto`: Implement one slice at a time, or run autonomous test-driven execution waves that commit atomically and pause on risk.
   - `/test`: Enforce test-driven development (TDD) where tests serve as undeniable proof of correctness.
   - `/constraints`: Establish non-negotiable architectural laws and coding invariants.
   - `/review`: Conduct multi-axis code health reviews prior to merge.
   - `/webperf`: Profile real-world web performance, Core Web Vitals, bundle bloat, and rendering bottlenecks.
   - `/code-simplify`: Refactor for clarity over cleverness, eliminating speculative abstractions and boilerplate.
   - `/ship`: Execute safe release checklists, version tagging, and post-deployment smoke tests.
2. **Web Performance & Front-End Engineering**: Native expertise in modern browser performance optimization, DevTools inspection, and reactive rendering lifecycles.
3. **Doubt-Driven Development**: Protocol specifically designed to combat agent hallucination and overconfidence by forcing the agent to verify assumptions against repository reality before writing code.
4. **Source-Driven Verification**: Enforces reliance on authentic primary documentation and actual source code rather than training memory guesswork.

## Installation / Activation Command
```bash
# Skills CLI (Claude Code, Cursor, Codex, Antigravity, Gemini CLI)
npx skills add addyosmani/agent-skills

# Claude Code marketplace installation
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills

# Antigravity CLI installation
agy plugin install https://github.com/addyosmani/agent-skills.git

# Core slash commands
/spec          # Define what to build before code
/plan          # Break spec into atomic tasks
/build auto    # Execute implementation plan autonomously
/webperf       # Audit Core Web Vitals and runtime performance
/code-simplify # Refactor for clarity over cleverness
```

## Prerequisites
- Node.js 18+ or modern agent runtime (Claude Code, Antigravity CLI, Cursor, Codex, Gemini CLI).
- Access to project repository and testing harness (e.g. Jest, Vitest, Pytest).

## Anti-Patterns / Warnings
- **Law 4 Compliance (Never Merge Across Authors)**: Addy Osmani's skills must remain separate and distinct from Superpowers, Matt Pocock, and gstack. Never blend their prompts or overwrite their command namespaces.
- **Never skip `/spec` on complex features**: Avoid jumping directly to `/build` without an approved specification; spec-driven rigor prevents architectural drift.
- **Do not optimize prematurely without measurement**: Always run `/webperf` to measure actual bottlenecks before modifying algorithms or caching layers.

