---
name: everything-claude-code
description: "Everything Claude Code (ECC) multi-agent harness engineering system by Affaan Mustafa: 71 specialized agents, 314 modular skills, continuous learning memory, rules enforcement, and AgentShield security scanning."
---

# Everything Claude Code (ECC)

Authoritative engineering and operational instructions for **Everything Claude Code (ECC)** by Affaan Mustafa ([`affaan-m/ecc`](https://github.com/affaan-m/ecc), [ecc.tools](https://ecc.tools)).

ECC is a comprehensive agent-harness engineering layer and productivity operating system that pre-configures AI coding assistants to follow rigorous software engineering workflows without manual prompting.

---

## When to Use

Activate or reference this skill when:
* Setting up or optimizing multi-agent engineering workflows in **Claude Code**, **Antigravity**, **Codex**, **OpenCode**, or **Cursor**.
* Orchestrating disciplined end-to-end development cycles:
  $$\text{Plan} \longrightarrow \text{Test} \longrightarrow \text{Implement} \longrightarrow \text{Review} \longrightarrow \text{Verify} \longrightarrow \text{Remember} \longrightarrow \text{Improve}$$
* Deploying specialized subagents for architecture, security audits, build repair, or test automation.
* Implementing continuous session memory, cross-turn context keepers, and automated learnings extraction.
* Running automated security scans with **AgentShield** against prompts, hooks, MCP servers, and tool permissions to prevent data leakage and command injection.

---

## Core Capabilities & Architecture

### 1. The 7-Stage Engineering Cycle
ECC enforces a non-linear, goal-backward development loop:
1. **Plan**: Goal decomposition, ADR discovery, task breakdown, and dependency ordering.
2. **Test**: Red-Green-Refactor test authoring before writing implementation code.
3. **Implement**: Minimalist, surgical code edits adhering strictly to existing project conventions.
4. **Review**: Multi-agent code review evaluating architecture, security, performance, and style.
5. **Verify**: Automated test passes, build verification, and runtime smoke testing before claiming completion.
6. **Remember**: Session summarization, decision journal persistence, and key learning updates.
7. **Improve**: Self-reflection and prompt calibration for recurring tasks.

### 2. 71 Specialized Agent Personas
Includes domain-specific subagents:
* **Architect**: System boundary design, component contracts, database schema modeling.
* **Security Auditor**: Static code vulnerability scanning, secret leak detection, OWASP compliance.
* **Test Engineer**: Test suite scaffolding, edge-case generation, mock/stub synthesis.
* **Build Mechanic**: Diagnosing and repairing compilation, Gradle, package manager, and CI/CD failures.
* **Documentation Specialist**: Layer 15 living documentation authoring and synchronized glossary management.

### 3. AgentShield Security Framework
Proactive guardrails integrated into agent runtime hooks:
* Scans incoming prompts and tool payloads for indirect prompt injection.
* Audits MCP servers and configuration files for exposed API keys and sensitive tokens.
* Enforces strict read/write sandboxing boundaries on destructive shell commands.

### 4. Continuous Learning & Memory Integration
* Integrates with local-first persistent memory systems (e.g., MemPalace, Context Keeper).
* Automatically extracts key architectural invariants, tech stack idiosyncrasies, and past failure points into persistent project memory.

---

## Installation & Activation Commands

### Multi-Harness Installer
Run the official guided installer from the terminal:
```bash
# Guided interactive installation via npx
npx @affaan-m/ecc@latest install

# Or clone directly into your project agent configuration
git clone https://github.com/affaan-m/ecc.git .agents/ecc
```

### Official Portals & References
* **GitHub Repository**: [https://github.com/affaan-m/ecc](https://github.com/affaan-m/ecc)
* **Official Documentation & Tools Portal**: [https://ecc.tools](https://ecc.tools)

### Selective Capability Activation
To avoid token bloat, activate specific sub-skills rather than the entire 314-skill library:
```bash
# Install individual ECC sub-skills into your workspace
python scripts/install-to-project.py --skill agent-browser
python scripts/install-to-project.py --skill coderabbit
```

---

## Prerequisites & Compatibility

* **Claude Code**: Tier-1 native support with full hooks, subagents, and memory integration.
* **Antigravity / Codex / OpenCode**: Supported via standard `.agents/skills/` and `.agents/rules/` directory structures.
* **Cursor / Windsurf / Zed**: Supported via community adapters and custom rule injections.
* **Node.js**: Node 18+ required for `npx @affaan-m/ecc` CLI and hook runner.

---

## Anti-Patterns & Warnings

* **Anti-Pattern 1: Context Saturation (Loading all 314 skills simultaneously)**
  Never load the entire ECC skill directory into a single agent prompt context. This causes catastrophic context window dilution and degraded reasoning. Always select targeted sub-skills or use dynamic skill routing.
* **Anti-Pattern 2: Ignoring Adapter Feature Parity**
  Hooks and background memory watchers that work natively in Claude Code may require custom daemon configuration in other IDEs or harnesses. Check platform adapter matrices before relying on automated hook triggers.
* **Anti-Pattern 3: Bypassing AgentShield Verification Gates**
  Never disable security warnings or force-execute shell scripts flagged by AgentShield without manually inspecting the command payloads for unintended side effects.
