---
name: anthropic-defending-code
description: "Anthropic's autonomous security reference harness: skills for threat modeling, automated vulnerability scanning, triage, and human-approved patch deployment."
priority: P0
category: 01-core-engineering
---

# Anthropic Defending Code — Autonomous Security Harness

> **Priority:** `P0` | **Category:** `01-core-engineering`
> **Repository:** https://github.com/anthropics/defending-code-reference-harness | **Stars:** 7,700+

Official security reference harness from Anthropic providing specialized agent skills for proactive threat modeling, codebase scanning, vulnerability triage, and automated patch drafting with human-in-the-loop deployment gates.

---

## When to Use

* Running continuous security audits across repositories before releases.
* Triaging CVE reports and static analysis findings automatically with an AI security partner.
* Generating verified security patches and regression tests for discovered vulnerabilities.

---

## Prerequisites & Setup

* Claude Code CLI or compatible Anthropic API agent.
* Git repository with existing test suite to verify patch safety.

---

## Core Capabilities & Workflow

1. **Threat Modeling Wave**: Maps system boundaries, input attack surfaces, authentication flows, and data storage invariants.
2. **Targeted Security Scanning**: Runs specialized static checks looking for CWE vulnerabilities (SQLi, SSRF, XSS, insecure deserialization, privilege escalation).
3. **Automated Triage**: Formulates falsifiable exploit hypotheses and writes a reproducing proof-of-concept (PoC) test.
4. **Patch Synthesis & Verification**: Drafts the surgical fix, executes the test suite to ensure zero regressions, and opens a pull request for human review.

---

## Anti-Patterns & Warnings

* **Autonomous deployment without human sign-off**: All security patches must pass human review and automated CI pipelines before merging.
* **Testing exploits on live infrastructure**: Run PoC reproductions strictly inside isolated sandboxes or temporary Docker containers.
