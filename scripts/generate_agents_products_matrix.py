#!/usr/bin/env python3
"""
scripts/generate_agents_products_matrix.py — Generates Claude-Agents-and-Products-Matrix.md
and Claude-Agents-and-Products-Matrix.csv in strict dual-matrix parity.
"""

import csv
import json
import shutil
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DATA_JSON = REPO_ROOT / "data" / "claude-agents-products.json"
OUT_MD = REPO_ROOT / "Claude-Agents-and-Products-Matrix.md"
OUT_CSV = REPO_ROOT / "Claude-Agents-and-Products-Matrix.csv"

def generate_matrices():
    with open(DATA_JSON, "r", encoding="utf-8") as f:
        items = json.load(f)

    # Sort items alphabetically by title
    items = sorted(items, key=lambda x: x["title"].lower())

    # --- 1. GENERATE CSV ---
    csv_headers = [
        "Index",
        "Product Name",
        "Slug",
        "Category",
        "Tagline",
        "Subtitle",
        "Official Website",
        "Official GitHub",
        "Marketplace URL",
        "Overview"
    ]

    csv_rows = []
    for idx, item in enumerate(items, 1):
        csv_rows.append([
            str(idx),
            item["title"],
            item["slug"],
            item["category"],
            item["tagline"],
            item["subtitle"],
            item["website"],
            item["github"],
            item["marketplace_url"],
            item["overview"].replace("\n", " ").strip()
        ])

    with open(OUT_CSV, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(csv_headers)
        writer.writerows(csv_rows)

    print(f"[OK] Generated CSV: {OUT_CSV} ({len(csv_rows) + 1} rows)")

    # --- 2. GENERATE MARKDOWN ---
    md_lines = [
        "# Claude Marketplace Agents & Products Matrix",
        "",
        "> Authoritative inventory of official enterprise AI agents, commercial platforms, and partner applications available through the Claude Marketplace.",
        "",
        f"- **Total Products Cataloged:** `{len(items)}`",
        "- **Source:** [Claude Marketplace — Agents & Products](https://claude.com/marketplace/agents-products)",
        "- **Dual-Format Parity File:** [`Claude-Agents-and-Products-Matrix.csv`](Claude-Agents-and-Products-Matrix.csv)",
        "",
        "---",
        "",
        "## 🏢 Enterprise Agents & Commercial AI Products Directory",
        "",
        "| # | Product Name | Slug | Category | Tagline | Official Website | Official GitHub | Marketplace Profile |",
        "| :-: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |"
    ]

    for idx, item in enumerate(items, 1):
        title = item["title"]
        slug = item["slug"]
        cat = item["category"]
        tagline = item["tagline"]
        web = f"[{item['title']}]({item['website']})" if item['website'] else "—"
        gh = f"[`{item['github'].replace('https://github.com/', '')}`]({item['github']})" if item['github'] else "—"
        mkt = f"[Claude Profile]({item['marketplace_url']})"
        md_lines.append(f"| {idx} | **{title}** | `{slug}` | `{cat}` | {tagline} | {web} | {gh} | {mkt} |")

    md_lines.extend([
        "",
        "---",
        "",
        "## 📋 Comprehensive Product Overviews",
        ""
    ])

    for idx, item in enumerate(items, 1):
        use_cases_badge = " ".join([f"`{u}`" for u in item["use_cases"]])
        md_lines.extend([
            f"### {idx}. {item['title']} (`{item['slug']}`)",
            "",
            f"- **Category:** `{item['category']}` | **Use Cases:** {use_cases_badge}",
            f"- **Tagline:** {item['tagline']}",
            f"- **Subtitle:** {item['subtitle']}",
            f"- **Official Website:** {item['website']}",
            f"- **Official GitHub:** {item['github']}",
            f"- **Claude Marketplace Profile:** [{item['marketplace_url']}]({item['marketplace_url']})",
            "",
            "**Overview:**",
            f"> {item['overview']}",
            ""
        ])
        if item.get("how_to_buy"):
            md_lines.extend([
                "**Claude Commitment & Procurement:**",
                f"> {item['how_to_buy']}",
                ""
            ])
        md_lines.append("---")
        md_lines.append("")

    with open(OUT_MD, "w", encoding="utf-8") as f:
        f.write("\n".join(md_lines) + "\n")

    print(f"[OK] Generated Markdown: {OUT_MD} ({len(md_lines)} lines)")

    # --- 3. COPY TO WEB ASSETS ---
    web_data = REPO_ROOT / "web" / "src" / "data" / "claude-agents-products.json"
    web_public = REPO_ROOT / "web" / "public"
    web_public.mkdir(parents=True, exist_ok=True)
    web_data.parent.mkdir(parents=True, exist_ok=True)

    shutil.copy2(DATA_JSON, web_data)
    shutil.copy2(DATA_JSON, web_public / "claude-agents-products.json")
    shutil.copy2(OUT_CSV, web_public / "Claude-Agents-and-Products-Matrix.csv")
    shutil.copy2(OUT_MD, web_public / "Claude-Agents-and-Products-Matrix.md")
    print(f"[OK] Staged assets to web/src/data and web/public/")

if __name__ == "__main__":
    generate_matrices()
