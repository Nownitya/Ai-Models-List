---
name: sellbird
description: "Open-source autonomous AI sales, lead enrichment, and outreach engine running on local Claude / ChatGPT / Codex subscriptions without external LLM API costs."
priority: P1
category: 09-autonomous-agents
---

# Sellbird Autonomous AI Outreach (`ethanplusai/sellbird`)

> **Priority:** `P1` | **Framework:** `ethanplusai/sellbird` | **Domain:** `09-autonomous-agents` | **Stars:** `⭐ 4.2k+`

Open-source autonomous AI sales, lead enrichment, and outreach engine designed to run locally on your existing AI subscription plans (Claude, ChatGPT, Codex) without external per-token LLM API costs.

---

## When to Use

Activate this skill when:
- Designing or running autonomous outbound sales, prospecting, and lead-generation campaigns.
- Requiring automated company research, decision-maker discovery, and contact enrichment.
- Verifying prospect email addresses with MX and SMTP validation before outbound delivery.
- Drafting hyper-personalized cold outreach emails based on company technology stacks, news, and pain points.
- Running multi-step outreach sequences and triaging inbound responses using local LLM classification.
- Deploying private, self-hosted outreach infrastructure with zero third-party API metering.

---

## Core Capabilities

1. **Account & Prospect Discovery**: Crawls target company domains, identifying key decision-makers and extracting verified contact profiles matching Ideal Customer Profiles (ICP).
2. **Email Verification & Hygiene**: Performs DNS, MX record, and SMTP mailbox handshake validation to protect sender domain reputation and eliminate bounces.
3. **Hyper-Personalized Drafting**: Synthesizes prospect data, recent company announcements, and value propositions to generate tailored 1-on-1 messages instead of generic blast templates.
4. **Campaign Cadence & Sequence Orchestration**: Coordinates multi-stage outreach cadences across email channels with rate-limiting, randomized delivery windows, and compliance checks.
5. **Intelligent Inbound Reply Triage**: Classifies prospect replies (positive interest, objection, referral, unsubscribe, out-of-office) and automates follow-ups or human handoff.
6. **Local LLM Execution**: Natively integrates with local developer subscriptions (Claude Code, OpenAI Codex, or ChatGPT) using local SQLite persistence and YAML configurations.

---

## Activation Command

### Interactive Activation
```bash
/sellbird
# Or scoped agent command:
/agent-sellbird
```

### Installation & Local Setup
```bash
# Clone and install Sellbird locally:
git clone https://github.com/ethanplusai/sellbird.git
cd sellbird
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -e .

# Run initial interactive setup wizard:
sellbird setup
```

### CLI Execution
```bash
# Launch local outreach dashboard:
sellbird dashboard

# Run targeted lead enrichment for a domain:
sellbird enrich --domain example.com

# Verify email deliverability:
sellbird verify dev@example.com

# Execute scheduled campaign:
sellbird campaign run --config campaigns/q1-outreach.yaml
```

---

## Prerequisites

- Python 3.10+ polyglot environment.
- Active AI coding subscription (Claude Code, OpenAI Codex, or ChatGPT) or local model provider.
- Configured SMTP credentials or email sending provider (Google Workspace, Microsoft 365, Resend, or SendGrid).
- Clean local SQLite or PostgreSQL database instance.

---

## Anti-Patterns & Warnings

> [!WARNING]
> - **Deliverability Hazards**: Never send mass cold campaigns without pre-verifying MX records and mailbox availability; unverified blasts lead to immediate spam flagging.
> - **Generic Spam Pitfall**: Avoid templated macro variables (`Hi {{FirstName}}`); leverage deep company signals and pain points for genuine relevance.
> - **Regulatory Compliance**: Strictly respect opt-out requests and include physical address disclosures in accordance with CAN-SPAM, GDPR, and CASL regulations.
> - **Credential Safety**: Never hardcode SMTP secrets or account passwords in repository files or tracking journals.

