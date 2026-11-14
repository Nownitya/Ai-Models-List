---
name: ponytail-help
description: "Quick reference for ponytail levels, skills and commands. One-shot display. Use for /ponytail-help, ponytail help, how do I use ponytail."
priority: P3
category: 09-autonomous-agents
---

# Ponytail Help — Quick Reference & Cheat Sheet

> **Priority:** `P3` | **Framework:** `Ponytail (Dietrich Gebert)` | **Category:** `09-autonomous-agents`
> **Repository:** https://github.com/DietrichGebert/ponytail | **Documentation:** https://ponytail.dev/docs

Quick reference card for Ponytail operating modes, intensity levels, slash commands, and configuration options.

---

## When to Use

* Looking up Ponytail command syntax, level switches, or configuration settings.
* When asked: `"/ponytail-help"`, `"ponytail help"`, or `"how do I use ponytail"`.

---

## Prerequisites & Host Commands

* Slash commands supported natively in Claude Code, OpenCode, and Antigravity.
* Codex CLI / IDE equivalent: `$ponytail:ponytail`, `$ponytail:ponytail-review`.

---

## Core Capabilities & Command Reference

### 1. Operating Levels

| Level | Command | Behavior |
| :--- | :--- | :--- |
| **Lite** | `/ponytail lite` | Builds what was requested. Names smaller alternative in one line for user selection. |
| **Full** | `/ponytail` | The smallest complete change, minimal diff, and brief summary of skipped items and risks. (Default) |
| **Ultra** | `/ponytail ultra` | Questions the request; aggressively pushes back on unnecessary scope before building. |

*Deactivation:* Say `"stop ponytail"` or `"normal mode"`, or run `/ponytail off`.

### 2. Available Skills

| Skill | Activation Trigger | Core Function |
| :--- | :--- | :--- |
| **ponytail** | `/ponytail [level]` | Core lazy senior dev mode: shortest working diff, no speculative bloat. |
| **ponytail-review** | `/ponytail-review` | Senior code review: bug, risk, scale, tests, speed, and lean cuts. |
| **ponytail-audit** | `/ponytail-audit` | Whole-repo quality & bloat audit with ranked findings and deletion metrics. |
| **ponytail-debt** | `/ponytail-debt` | Scans and compiles `shortcut:` comments into a prioritized debt ledger. |
| **ponytail-gain** | `/ponytail-gain` | Displays measured benchmark scoreboard (code, token, and cost reduction). |
| **ponytail-help** | `/ponytail-help` | Displays this reference card. |

### 3. Persistent Configuration

* **Environment Variable:** `export PONYTAIL_DEFAULT_MODE=ultra`
* **Configuration File (`%APPDATA%\ponytail\config.json`):**
  ```json
  { "defaultMode": "full" }
  ```
* Mode resolution hierarchy: Environment variable > Config file > Default (`full`).

---

## Anti-Patterns & Warnings

* **Modifying state:** This skill is a pure reference card; do not modify session state or write files during invocation.
