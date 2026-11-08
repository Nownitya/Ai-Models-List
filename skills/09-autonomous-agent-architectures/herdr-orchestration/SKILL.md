---
name: herdr-orchestration
description: Multi-agent fleet orchestration, distributed task dispatch, consensus coordination, and subagent state lifecycle management.
---

# Herdr Multi-Agent Orchestration (`/herdr-orchestration`)

> **Domain:** 09 Autonomous Agent Architectures  
> **Upstream Authority:** [`herdrdev/herdr`](https://github.com/herdrdev/herdr) (⭐ 49,122)  
> **Slash Command:** `/herdr-orchestration`

---

## When to Use

* When orchestrating multi-agent systems with specialized subagents working concurrently across separate repositories or isolated worktrees.
* When managing distributed task queues, priority locks, and dynamic heartbeat monitoring for autonomous agent workers.
* When establishing multi-agent consensus protocols, peer review handoffs, and deadlock resolution across long-running pipelines.

## Prerequisites

* Python 3.10+ or Node.js 18+ runtime.
* Herdr CLI or agent coordinator daemon installed:
  ```bash
  pip install herdr-orchestrator
  # or
  npm install -g @herdr/cli
  ```
* Shared state storage backend configured (e.g. SQLite, Redis, or local lockfile registry).

## Core Capabilities

1. **Topology & Fleet Provisioning**: Spin up hierarchical (manager-worker), mesh, or pipeline agent topologies.
2. **Task Handoff & State Synchronization**: Passes immutable task context packets with strict input/output JSON schemas.
3. **Deadlock & Stall Detection**: Monitors worker heartbeat intervals and reallocates abandoned tasks after configurable timeouts.
4. **Consensus & Voting Gates**: Requires $M$-of-$N$ independent subagent approvals before destructive migrations or code deployments.

## Activation Command

```bash
/herdr-orchestration [init-fleet|dispatch-task|status|rebalance|terminate] [--config <path>]
```

## Workflow & Usage Guide

### 1. Declaring Fleet Configuration (`herdr.yaml`)

```yaml
fleet:
  name: "project-build-fleet"
  coordinator: "agent-lead"
  workers:
    - name: "researcher"
      role: "read-only-investigation"
      concurrency: 2
    - name: "implementer"
      role: "code-editing-sandbox"
      concurrency: 3
    - name: "auditor"
      role: "security-and-test-verification"
      concurrency: 1
  consensus:
    merge_gate:
      min_approvals: 2
      required_reviewers: ["auditor"]
```

### 2. Dispatching Concurrent Tasks

```bash
herdr dispatch --task "Refactor authentication layer" --workflow hierarchical
herdr status --fleet project-build-fleet
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Unbounded fan-out of subagents without rate limit throttles, leading to LLM API quota exhaustion.
* **Anti-Pattern:** Allowing subagents to write directly to shared disk without git worktree isolation, causing dirty file races.
* **Warning:** Always establish explicit termination conditions and budget caps to avoid recursive infinite agent loops.

