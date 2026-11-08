---
name: marketing-growth-engine
description: Data-driven marketing engineering, technical SEO auditing, high-converting copywriting heuristics, and growth experimentation.
---

# Marketing Growth Engine (`/marketing-growth-engine`)

> **Domain:** 12 Specialized Domains  
> **Upstream Authority:** [`coreyhaines31/marketingskills`](https://github.com/coreyhaines31/marketingskills) (⭐ 59,072)  
> **Slash Command:** `/marketing-growth-engine`

---

## When to Use

* When conducting technical SEO audits, schema markup verification (JSON-LD), and programmatic meta tag generation.
* When evaluating landing page conversion funnels, cognitive load, visual hierarchy, and CTA placement.
* When authoring developer-focused product copy, changelogs, launch announcements, and value proposition frameworks.

## Prerequisites

* Repository with public web artifacts, documentation, or landing page code.
* Node.js / Python environment for running headless crawl audits or Lighthouse CLI:
  ```bash
  npm install -g lighthouse @lhci/cli
  ```

## Core Capabilities

1. **Technical SEO & Structured Data**: Audits canonical tags, Open Graph meta tags, robots.txt, sitemaps, and rich snippet schemas.
2. **Copywriting Heuristics**: Applies PAS (Problem-Agitate-Solution), BAB (Before-After-Bridge), and 4U (Urgent, Unique, Ultra-specific, Useful) copy frameworks.
3. **Conversion Rate Optimization (CRO)**: Interrogates time-to-value, clarity of above-the-fold content, social proof, and checkout friction.
4. **Growth Experimentation Playbooks**: Designs testable A/B hypotheses with measurable statistical power and sample size budgets.

## Activation Command

```bash
/marketing-growth-engine [audit-seo|optimize-copy|cro-review|launch-brief] [--target <url-or-file>]
```

## Workflow & Usage Guide

### 1. Running a Technical SEO & Metadata Audit

Analyze landing page metadata:

```bash
# Verify JSON-LD Schema & OpenGraph tags
marketing-growth audit-seo ./index.html --strict-og
```

### 2. Copy Optimization Checklist

* **Headline**: Clearly state *what* the product does, *who* it is for, and the primary benefit within 8 words.
* **Social Proof**: Concrete quantifiable metric (e.g. "Trusted by 10,000+ developers", "4.0M+ stars tracked").
* **Primary CTA**: High-contrast action verb button (e.g. "Deploy in 1 Click", "Get Started Free").
* **Friction Reducer**: Clear risk reversal (e.g. "No credit card required", "100% open source under MIT").

## Anti-Patterns & Warnings

* **Anti-Pattern:** Keyword stuffing or creating low-value doorway pages; search engines penalize manipulative algorithmic copy.
* **Anti-Pattern:** Vague, jargon-heavy marketing slogans (e.g. "Revolutionizing synergies") that conceal actual product utility.
* **Warning:** Never collect user behavioral telemetry without transparent cookie banners and GDPR/CCPA consent compliance.
