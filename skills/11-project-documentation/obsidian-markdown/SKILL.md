---
name: obsidian-markdown
description: Steph Ango's (kepano) Obsidian markdown bases, file-over-app principles, knowledge vault architecture, and CLI workflows.
---

# Obsidian Knowledge Architecture (`kepano/obsidian-skills`)

> **Priority:** `P0` | **Framework:** `kepano/obsidian-skills` | **Domain:** `11-project-documentation` | **Stars:** `⭐ 50k+`

Steph Ango's (kepano) Obsidian markdown bases, file-over-app principles, knowledge vault architecture, and CLI workflows.

---

## 🧭 When to Use

* When organizing project documentation, personal knowledge graphs, and research notes in plain text markdown.
* When structuring local vaults with Maps of Content (MOCs), YAML frontmatter schemas, and wikilinks.
* When adhering to the "File over App" philosophy for durable, vendor-neutral institutional memory.
* When automating vault queries, dataview schemas, and daily logs.

---

## 🎯 Core Capabilities

1. **File Over App Invariant**: Enforces plain text markdown files readable by any editor, ensuring knowledge survives individual tools.
2. **Atomic Note Structuring**: Practices atomic note synthesis with bidirectional wikilinking (`[[Note Name]]`).
3. **Vault Maps of Content (MOC)**: Builds hierarchical index hubs and taxonomic tags for rapid agent discovery.
4. **Frontmatter Metadata Standards**: Standardizes metadata keys (`title`, `tags`, `aliases`, `created`, `updated`) for automated indexing.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/obsidian-markdown
```

### Note Architecture Pattern
```markdown
---
title: "Distributed Consensus Mechanics"
tags:
  - architecture
  - distributed-systems
aliases:
  - Consensus Protocols
updated: 2026-11-08
---

# Distributed Consensus Mechanics

> Summary: Architectural trade-offs between Raft, Paxos, and Byzantine Fault Tolerance.

## Core Invariants
1. Quorum intersection guarantees safety during network partitions.
2. Leader leases prevent split-brain anomalies.

## Related MOCs
- [[Architecture-MOC]]
- [[Reliability-Patterns]]
```

---

## 📋 Prerequisites

* Local markdown directory or Obsidian Vault
* Standard GitHub Flavored Markdown (GFM) / CommonMark compatibility

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Locking knowledge in proprietary binary databases or cloud-only silos.
* **Anti-Pattern:** Deep nested folder hierarchies (> 4 levels) that hinder semantic cross-linking.
