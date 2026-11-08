---
name: find-skills
description: Vercel Labs canonical skill discovery engine for searching, filtering, and activating skills from skills.sh and agent registries.
---

# Find Skills Discovery Engine (`vercel-labs/skills`)

> **Priority:** `P0` | **Framework:** `vercel-labs/skills` | **Domain:** `01-core-workflows` | **Stars:** `⭐ 38k+`

Vercel Labs canonical skill discovery engine for searching, filtering, and activating skills from skills.sh and agent registries.

---

## 🧭 When to Use

* When an agent needs to locate specialized domain capabilities dynamically (e.g. databases, animation, auth).
* When discovering and inspecting community skills from `skills.sh`.
* When auditing available local agent skills against missing task prerequisites.

---

## 🎯 Core Capabilities

1. **Registry Search**: Queries community skill indexes by keyword, topic, and popularity metrics.
2. **Dynamic Installation**: Resolves upstream Git sources and downloads standard `SKILL.md` specifications.
3. **Agent Skill Auditing**: Verifies that discovered skills comply with the Agent Skills specification standard.
4. **Tool Discovery Prompting**: Suggests relevant skills to coding assistants during task initiation.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/find-skills
```

### CLI Discovery Command
```bash
# Search for skills across the registry
npx skills find "database migration"

# Inspect and install a specific skill
npx skills install supabase/agent-skills
```

---

## 📋 Prerequisites

* Node.js 18+
* Network access to `skills.sh` or local skill cache

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Installing unverified third-party skills without inspecting their `SKILL.md` instructions and shell commands.
* **Anti-Pattern:** Cluttering agent context with dozens of skills simultaneously instead of loading on demand.

