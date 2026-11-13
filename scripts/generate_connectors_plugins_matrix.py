#!/usr/bin/env python3
"""
scripts/generate_connectors_plugins_matrix.py — Generates
Claude-Connectors-and-Plugins-Matrix.md and Claude-Connectors-and-Plugins-Matrix.csv
in strict dual-matrix parity from data/claude_connectors_plugins_raw.json (1,126 items).
"""

import csv
import json
import shutil
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DATA_JSON = REPO_ROOT / "data" / "claude-connectors-plugins.json"
OUT_MD = REPO_ROOT / "Claude-Connectors-and-Plugins-Matrix.md"
OUT_CSV = REPO_ROOT / "Claude-Connectors-and-Plugins-Matrix.csv"

def generate_matrices():
    with open(DATA_JSON, "r", encoding="utf-8") as f:
        items = json.load(f)

    # Sort items alphabetically by title
    items = sorted(items, key=lambda x: (x.get("title") or "").lower())

    # --- 1. GENERATE CSV ---
    csv_headers = [
        "Index",
        "Connector Name",
        "Slug",
        "Type",
        "Author",
        "Verified Tier",
        "Categories",
        "Compatibility",
        "Server Endpoint",
        "Author Website",
        "Directory URL",
        "One-Liner Description"
    ]

    csv_rows = []
    for idx, item in enumerate(items, 1):
        cats = ", ".join(item.get("categories") or ["other"])
        works = ", ".join(item.get("worksWith") or ["claude"])
        tier = (item.get("verifiedTier") or "community").capitalize()
        conn_type = "Remote MCP" if item.get("type") == "remote" else "Local MCP"
        server = item.get("serverUrl") or ""
        author_url = item.get("authorUrl") or ""
        dir_url = item.get("directoryUrl") or f"https://claude.com/marketplace/connectors-plugins/{item.get('slug')}"
        oneliner = (item.get("oneLiner") or "").replace("\n", " ").strip()

        csv_rows.append([
            str(idx),
            item.get("title", ""),
            item.get("slug", ""),
            conn_type,
            item.get("author") or "Community",
            tier,
            cats,
            works,
            server,
            author_url,
            dir_url,
            oneliner
        ])

    with open(OUT_CSV, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(csv_headers)
        writer.writerows(csv_rows)

    print(f"[OK] Generated CSV: {OUT_CSV} ({len(csv_rows) + 1} rows)")

    # --- 2. GENERATE MARKDOWN ---
    md_lines = [
        "# Claude Marketplace Connectors & Plugins Matrix",
        "",
        "> Complete directory of all official and partner Model Context Protocol (MCP) connectors, remote tool endpoints, and local integrations available across the Claude platform.",
        "",
        f"- **Total Connectors Cataloged:** `{len(items)}`",
        f"- **Remote MCP Connectors:** `{sum(1 for i in items if i.get('type') == 'remote')}`",
        f"- **Local MCP Connectors:** `{sum(1 for i in items if i.get('type') == 'local')}`",
        "- **Source:** [Claude Marketplace — Connectors & Plugins](https://claude.com/marketplace/connectors-plugins)",
        "- **Dual-Format Parity File:** [`Claude-Connectors-and-Plugins-Matrix.csv`](Claude-Connectors-and-Plugins-Matrix.csv)",
        "",
        "---",
        "",
        "## 🔌 Complete MCP Connectors & Plugins Directory",
        "",
        "| # | Connector Name | Slug | Type | Author | Tier | Categories | Compatibility | Directory Link |",
        "| :-: | :--- | :--- | :---: | :--- | :---: | :--- | :--- | :--- |"
    ]

    for idx, item in enumerate(items, 1):
        title = item.get("title", "")
        slug = item.get("slug", "")
        conn_type = "Remote" if item.get("type") == "remote" else "Local"
        author = item.get("author") or "Community"
        tier = (item.get("verifiedTier") or "community").capitalize()
        cats = ", ".join(item.get("categories") or ["other"])
        works = ", ".join(item.get("worksWith") or ["claude"])
        dir_url = item.get("directoryUrl") or f"https://claude.com/marketplace/connectors-plugins/{slug}"
        link = f"[{title}]({dir_url})"

        md_lines.append(f"| {idx} | **{link}** | `{slug}` | `{conn_type}` | {author} | `{tier}` | `{cats}` | `{works}` | [Profile]({dir_url}) |")

    with open(OUT_MD, "w", encoding="utf-8") as f:
        f.write("\n".join(md_lines) + "\n")

    print(f"[OK] Generated Markdown: {OUT_MD} ({len(md_lines)} lines)")

    # --- 3. COPY TO WEB PUBLIC & SRC ---
    clean_json_path = REPO_ROOT / "data" / "claude-connectors-plugins.json"
    with open(clean_json_path, "w", encoding="utf-8") as f:
        json.dump(items, f, indent=2, ensure_ascii=False)

    web_data = REPO_ROOT / "web" / "src" / "data" / "claude-connectors-plugins.json"
    web_public = REPO_ROOT / "web" / "public"
    web_public.mkdir(parents=True, exist_ok=True)
    web_data.parent.mkdir(parents=True, exist_ok=True)

    shutil.copy2(clean_json_path, web_data)
    shutil.copy2(clean_json_path, web_public / "claude-connectors-plugins.json")
    shutil.copy2(OUT_CSV, web_public / "Claude-Connectors-and-Plugins-Matrix.csv")
    shutil.copy2(OUT_MD, web_public / "Claude-Connectors-and-Plugins-Matrix.md")
    print(f"[OK] Staged assets to web/src/data and web/public/")

if __name__ == "__main__":
    generate_matrices()
