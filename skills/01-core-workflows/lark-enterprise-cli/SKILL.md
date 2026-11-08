---
name: lark-enterprise-cli
description: Official Lark Suite and Feishu enterprise automation CLI for Docs, Drive, Bitable, messaging, and workplace workflows.
---

# Lark & Feishu Enterprise CLI (`/lark-enterprise-cli`)

> **Domain:** 01 Core Engineering Workflows  
> **Upstream Authority:** [`larksuite/cli`](https://github.com/larksuite/cli) (⭐ 18,008) / [Feishu Open Platform](https://open.feishu.cn)  
> **Slash Command:** `/lark-enterprise-cli`

---

## When to Use

* When automating enterprise document generation, wiki syncs, and knowledge base publication in Lark/Feishu.
* When querying or inserting rows into Lark Bitable (multi-dimensional database) from agent execution pipelines.
* When sending formatted card messages, notifications, or interactive webhook payloads to team groups and bots.

## Prerequisites

* Feishu / Lark developer enterprise account with App ID and App Secret created at [open.feishu.cn](https://open.feishu.cn) or [open.larksuite.com](https://open.larksuite.com).
* Lark CLI installed globally:
  ```bash
  npm install -g @larksuite/cli
  ```
* Environment variables configured:
  ```bash
  export LARK_APP_ID="cli_a1b2c3d4e5"
  export LARK_APP_SECRET="your_app_secret"
  export LARK_DOMAIN="open.feishu.cn" # or open.larksuite.com
  ```

## Core Capabilities

1. **Document & Wiki Synchronization**: Create, update, export, and convert Markdown documents to Lark DocX blocks natively.
2. **Bitable Database Automation**: Perform batch reads, structured schema queries, and record upserts into Bitable tables.
3. **Interactive Card Webhooks**: Construct dynamic JSON card layouts with interactive buttons, progress meters, and status tags.
4. **Drive File Management**: Upload build artifacts, download audit logs, and manage permission access tokens programmatically.

## Activation Command

```bash
/lark-enterprise-cli [doc|bitable|msg|drive|auth] [--id <id>] [--payload <json>]
```

## Workflow & Usage Guide

### 1. Uploading a Markdown Report to Lark DocX

```bash
lark-cli doc create \
  --folder-token "fldcnXXXXXXXX" \
  --title "Deployment Audit Report - 2026-11-08" \
  --markdown-file "./docs/DEPLOY-REPORT.md"
```

### 2. Inserting Records into Bitable

```bash
lark-cli bitable record-create \
  --app-token "bascnXXXXXXXX" \
  --table-id "tblXXXXXXXX" \
  --fields '{"Task": "Batch 3 Integration", "Status": "Complete", "Stars": 324000}'
```

### 3. Dispatching an Interactive Deployment Notification

```bash
lark-cli msg send-card \
  --chat-id "oc_XXXXXXXX" \
  --card-file "./templates/deployment-card.json"
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Storing plain text App Secrets inside Git repositories; always inject credentials via environment variables or secret vaults.
* **Anti-Pattern:** Exceeding tenant API rate limits (default: 50 requests/sec per tenant); implement exponential backoff with jitter on bulk syncs.
* **Warning:** Ensure appropriate tenant data residency boundaries (China Feishu domain vs Global Lark domain) are explicitly configured.

