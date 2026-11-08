---
name: cloudflare-security-audit
description: Cloudflare's official coding-agent skill for multi-phase security audits (65k+ stars) with independently verified, machine-readable findings.
---

# Cloudflare Security Audit — Multi-Phase Security Audit Skill

> **Priority**: `P0` | **Category**: `11-code-review` | **Upstream**: [`cloudflare/security-audit-skill`](https://github.com/cloudflare/security-audit-skill) (65k+ ⭐)

Cloudflare Security Audit is an enterprise-grade coding agent skill designed for thorough, multi-phase code security evaluations. It guides AI models through structured surface reconnaissance, dependency vulnerability scanning, privilege boundary analysis, cryptographic verification, and the generation of reproducible, machine-readable security advisories.

---

## When to Use

- Conducting pre-release or pre-commit security audits on web applications, edge workers, and API backends.
- Auditing authentication flows, JWT token handling, OAuth2 redirect validation, and CORS policies.
- Identifying OWASP Top 10 vulnerabilities (SQLi, XSS, SSRF, IDOR/BOLA) and supply-chain package risks.

---

## Core Capabilities & Protocols

1. **Multi-Phase Audit Methodology**:
   - Phase 1: Attack Surface Reconnaissance (entry points, route handlers, network listeners).
   - Phase 2: Static Flow Analysis (taint tracking from user input to sensitive sinks).
   - Phase 3: Cryptographic & Secret Hygiene (entropy scanning, exposed API tokens).
   - Phase 4: Machine-Readable Report Generation (SARIF / JSON / Markdown with reproduction steps).
2. **Edge & Cloudflare Workers Security**:
   - Specialized rules for serverless edge boundaries, KV/D1 database bindings, and Durable Objects isolation.
3. **Independently Verified Findings**:
   - Mandates verifiable proof-of-concept evidence before flagging vulnerabilities to eliminate false positives.

---

## Installation / Activation Command

```bash
# Install via npx skills package manager
npx skills add https://github.com/cloudflare/security-audit-skill

# Run audit with your coding assistant
/cloudflare-security-audit --target ./src --format sarif
```

---

## Prerequisites

- Node.js 18+ or Python 3.10+.
- Any coding assistant supporting Agent Skills (`claude-code`, `antigravity`, `cursor`).

---

## Anti-Patterns / Warnings

- **Never perform destructive penetration testing**: This skill is strictly for static code analysis, configuration review, and defensive hardening.
- **Do NOT publish unredacted findings publicly**: Always report critical vulnerabilities through internal security channels before code release.
