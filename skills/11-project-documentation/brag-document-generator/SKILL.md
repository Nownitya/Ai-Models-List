---
name: brag-document-generator
description: Automated engineering accomplishment tracking, sprint achievement synthesis, PR evidence compilation, and career milestone tracking.
---

# Brag Document & Engineering Accomplishment Generator (`/brag-document-generator`)

> **Domain:** 11 Project Documentation  
> **Upstream Authority:** [`latent-spaces/brag`](https://github.com/latent-spaces/brag) (⭐ 20,677)  
> **Slash Command:** `/brag-document-generator`

---

## When to Use

* When synthesizing engineering accomplishments, delivered features, and architectural impact across git commits and PRs.
* When preparing quarterly performance reviews, promotion dossiers, or sprint closeout reports with verified evidence.
* When maintaining a living ledger of non-code contributions: RFCs, mentorship, incident post-mortems, and process upgrades.

## Prerequisites

* Git repository with meaningful commit history and author signatures.
* GitHub CLI (`gh`) optional for querying merged PRs, reviews, and issues:
  ```bash
  gh pr list --state merged --author "@me"
  ```

## Core Capabilities

1. **Git Commit & PR Synthesis**: Scans git history to categorize contributions into Core Architecture, Reliability, and Feature Velocity.
2. **Impact & Metrics Extraction**: Surfaces quantifiable metrics: latency reductions, test coverage gains, and lines of debt eliminated.
3. **Cross-Functional Influence Ledger**: Documents design reviews, architectural RFC authoring, and cross-team unblocking.
4. **Markdown Dossier Compilation**: Formats structured brag documents suitable for executive engineering leadership review.

## Activation Command

```bash
/brag-document-generator [synthesize|summarize-sprint|compile-review] [--since <date>] [--author <name>]
```

## Workflow & Usage Guide

### 1. Generating Sprint Accomplishment Summary

```bash
# Extract user commits from current quarter
git log --author="$(git config user.name)" --since="2026-08-01" --pretty=format:"* %s (%h)" > commits.tmp
brag synthesize --input commits.tmp --output docs/BRAG-2026-Q3.md
```

### 2. High-Signal Accomplishment Template Structure

* **Executive Summary**: 2-3 sentence overview of primary engineering focus and key outcomes.
* **Key Projects Delivered**: Bullet points mapping project name, role (lead/contributor), impact metric, and PR links.
* **Operational Excellence & Reliability**: Incident mitigations, on-call resolutions, CI build speedups, and refactoring wins.
* **Company & Team Leverage**: Design RFCs authored, pairing sessions, and documentation standards elevated.

## Anti-Patterns & Warnings

* **Anti-Pattern:** Inflating vanity metrics (e.g. "Wrote 50,000 lines of code") without demonstrating actual customer or system impact.
* **Anti-Pattern:** Omitting collaborators and presenting collective team efforts as purely solo achievements.
* **Warning:** Never include proprietary client data or confidential security incident details in public personal brag documents.

