---
name: website-bench
description: "Autonomous web agent benchmark by TIGER AI Lab evaluating whether AI agents can explore, reverse-engineer, and reconstruct full-stack websites from DOM and visual inspection."
priority: P1
category: 04-testing-and-verification
---

# WebsiteBench — Full-Stack Web Agent Reverse Engineering Benchmark

> **Priority:** `P1` | **Category:** `04-testing-and-verification`
> **Repository:** https://github.com/TIGER-AI-Lab/WebsiteBench | **Framework:** Harbor

An empirical benchmark developed by TIGER AI Lab testing whether autonomous web agents (such as browser-use, Playwright agents, and Claude Computer Use) can navigate live websites, inspect DOM hierarchies, and reconstruct complete full-stack web applications.

---

## When to Use

* Benchmarking and evaluating autonomous frontend coding agents and browser automation systems.
* Measuring agent visual layout fidelity, component tree extraction, and functional interactivity replication.
* Comparing LLM reasoning capabilities on complex multi-page web reverse engineering tasks.

---

## Prerequisites & Setup

* Docker and Python 3.10+ environment.
* Harbor agent execution harness.
* Headless Chrome or Playwright browser runtime.

---

## Core Capabilities & Protocol

1. **Autonomous Exploration Phase**: Agent explores target website, scrolls, clicks interactive components, and records visual screenshots and DOM trees.
2. **Reconstruction Phase**: Agent synthesizes HTML, CSS, JavaScript, and backend endpoints to recreate the observed site.
3. **Dual Metric Evaluation**:
   - *Visual Similarity*: Evaluates pixel-level layout alignment, typography, and color rendering.
   - *Functional Fidelity*: Tests form submissions, client-side routing, and interactive state management.

---

## Anti-Patterns & Warnings

* **Static DOM scraping only**: Fails to capture dynamic client-rendered state; agent must interact with live elements.
* **Unbounded exploration**: Set max step limits to prevent agents from getting trapped in external pagination loops.
