---
name: orca-agent
description: Multi-agent computer-use CLI and orchestration framework for executing local terminal, desktop, and API actions autonomously.
---

# Orca Agent Orchestrator (`stablyai/orca`)

> **Priority:** `P0` | **Framework:** `stablyai/orca` | **Domain:** `10-ai-infrastructure` | **Stars:** `⭐ 118k+`

Multi-agent computer-use CLI and orchestration framework for executing local terminal, desktop, and API actions autonomously.

---

## 🧭 When to Use

* When orchestrating multi-agent systems where subagents execute shell commands, file modifications, and desktop tasks.
* When delegating long-running autonomous development loops with checkpointing and state persistence.
* When bridging local coding agent capabilities with external computer-use APIs.

---

## 🎯 Core Capabilities

1. **Multi-Agent Coordination**: Dispatches specialized agents across distinct roles (coder, reviewer, tester, researcher).
2. **Computer-Use Harness**: Handles sandboxed terminal execution, file system modifications, and GUI interactions.
3. **Session State Ledger**: Persists context across multi-step execution waves to prevent hallucination upon context compaction.
4. **Safety & Permission Boundaries**: Configurable confirmation gates before executing high-risk shell commands.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/orca-agent
```

### CLI Execution
```bash
# Initialize and launch autonomous task orchestration
orca run "Refactor authentication middleware to use JWT with RS256 signing and verify with tests"
```

---

## 📋 Prerequisites

* Node.js 18+ or Python 3.10+
* Git workspace initialized with clean working tree
* Configured LLM provider API key

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Running destructive commands (e.g. `rm -rf`, `DROP TABLE`) without interactive user confirmation.
* **Anti-Pattern:** Running multi-agent loops without intermediate verification gates or test suites.
