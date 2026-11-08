---
name: google-workspace-cli
description: Google Workspace agent automation CLI for managing Gmail, Google Drive, Docs, Sheets, and Calendar tasks programmatically.
---

# Google Workspace Automation CLI (`googleworkspace/cli`)

> **Priority:** `P1` | **Framework:** `googleworkspace/cli` | **Domain:** `01-core-workflows` | **Stars:** `⭐ 32k+`

Google Workspace agent automation CLI for managing Gmail, Google Drive, Docs, Sheets, and Calendar tasks programmatically.

---

## 🧭 When to Use

* When an agent needs to draft, send, or search emails via Gmail.
* When managing files, folders, and shared assets on Google Drive.
* When reading, updating, or formatting Google Docs and Sheets spreadsheets programmatically.
* When scheduling meetings, parsing invites, and querying availability on Google Calendar.

---

## 🎯 Core Capabilities

1. **Gmail Orchestration**: Search message threads, parse attachments, and compose drafts with OAuth2 security.
2. **Drive File Operations**: Upload files, manage permissions, and export Google Docs/Sheets to PDF or CSV.
3. **Docs & Sheets Manipulation**: Append tabular rows, extract document contents, and format cells via batch APIs.
4. **Calendar Scheduling**: Query conflicting events, book time slots, and dispatch meeting invites.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/google-workspace-cli
```

### CLI Command Patterns
```bash
# Search unread urgent emails
gws gmail list --query "is:unread label:urgent"

# Upload and share release notes on Drive
gws drive upload ./RELEASE-NOTES.pdf --share-with team@example.com --role reader

# Append benchmark results to Google Sheet
gws sheets append --sheet-id "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms" --range "Sheet1!A1" --values '["2026-11-08", "p95", 42]'
```

---

## 📋 Prerequisites

* Google Cloud Platform Project with Workspace APIs enabled (Gmail, Drive, Sheets)
* Configured OAuth2 Client ID / Service Account Credentials

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Sending mass emails without user confirmation gates or review checkpoints.
* **Anti-Pattern:** Overwriting entire spreadsheet tabs instead of appending rows safely.
