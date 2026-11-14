---
name: skillspector
description: "NVIDIA's security scanner for AI agent skills. Detects vulnerabilities, malicious code execution patterns, prompt injection, data exfiltration, and supply-chain risks in Claude Code, Codex, and MCP skills."
priority: P0
category: 03-code-review-and-quality
---

# NVIDIA SkillSpector — AI Agent Skill Security Scanner

> **Priority:** `P0` | **Category:** `03-code-review-and-quality`
> **Repository:** https://github.com/NVIDIA/SkillSpector | **Stars:** 25,900+

An enterprise security scanner and static analysis engine specifically built for agentic AI skills, plugins, and MCP tool definitions. Audits SKILL.md instructions, YAML metadata, and executable hooks before installation into Claude Code, Codex, Antigravity, or Cursor.

---

## When to Use

* Auditing third-party community skills or marketplace plugins before installing them into local workspaces.
* Continuous integration (CI) gating of internal agent skill repositories.
* Detecting latent prompt injections, unauthorized network egress, and privilege escalation vulnerabilities in LLM tool schemas.

---

## Prerequisites & Installation

* Python 3.10+ or Docker environment.
* Installation:
  ```bash
  pip install skillspector
  ```

---

## Core Capabilities & Audit Workflow

1. **Static Prompt Injection Analysis**: Scans system prompts, instruction blocks, and few-shots for hidden jailbreaks, adversarial delimiters, and role-override payloads.
2. **Executable Hook Inspection**: Analyzes shell scripts, Node.js lifecycle hooks, and Python tools for dangerous system calls (`curl`, `eval`, `rm -rf`, token harvesting, environment variable exfiltration).
3. **MCP Tool Schema Verification**: Checks parameter schemas for over-privileged capabilities (unbounded file system access, raw SQL execution, unauthenticated HTTP requests).
4. **Automated CI Gating**:
   ```bash
   skillspector audit ./skills/ --severity high --format sarif --output report.sarif
   ```

---

## Anti-Patterns & Warnings

* **Never install unvetted skills into root workspaces**: Agent skills with execution permissions can read credentials and shell environments; always scan with SkillSpector first.
* **Ignoring warnings on network hooks**: Scrutinize any skill requesting unrestricted internet egress or telemetry transmission.
