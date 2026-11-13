import json
from pathlib import Path

data = json.loads(Path("data/claude-agents-products-scanned.json").read_text(encoding="utf-8"))
print(f"Total entries: {len(data)}\n")

# Known official website domains for the 33 platforms
official_sites = {
    "airops": "https://www.airops.com",
    "asana": "https://asana.com",
    "augment": "https://www.augmentcode.com",
    "base44": "https://base44.com",
    "blackline": "https://www.blackline.com",
    "chainguard": "https://www.chainguard.dev",
    "checkmarx": "https://checkmarx.com",
    "coderabbit": "https://coderabbit.ai",
    "crowdstrike-r-charlotte-ai": "https://www.crowdstrike.com",
    "cursor": "https://www.cursor.com",
    "cyera": "https://www.cyera.io",
    "datadog-agent-observability": "https://www.datadoghq.com",
    "factory": "https://factory.ai",
    "fal": "https://fal.ai",
    "gamma": "https://gamma.app",
    "gitlab": "https://gitlab.com",
    "glean": "https://www.glean.com",
    "harvey": "https://www.harvey.ai",
    "hebbia": "https://www.hebbia.ai",
    "higgsfield-ai": "https://higgsfield.ai",
    "legora": "https://legora.com",
    "lovable": "https://lovable.dev",
    "monday": "https://monday.com",
    "netlify": "https://www.netlify.com",
    "rogo": "https://rogo.ai",
    "rubrik": "https://www.rubrik.com",
    "runway": "https://runwayml.com",
    "snowflake": "https://www.snowflake.com",
    "tanium": "https://www.tanium.com",
    "vercel": "https://vercel.com",
    "webflow": "https://webflow.com",
    "zocks": "https://zocks.io",
    "zoom": "https://zoom.us"
}

# Also official GitHub repositories where available
official_githubs = {
    "airops": "https://github.com/airopshq",
    "asana": "https://github.com/Asana",
    "augment": "https://github.com/augmentcode",
    "base44": "https://github.com/base44",
    "blackline": "https://github.com/blackline",
    "chainguard": "https://github.com/chainguard-dev",
    "checkmarx": "https://github.com/Checkmarx",
    "coderabbit": "https://github.com/coderabbitai",
    "crowdstrike-r-charlotte-ai": "https://github.com/CrowdStrike",
    "cursor": "https://github.com/getcursor",
    "cyera": "https://github.com/cyera",
    "datadog-agent-observability": "https://github.com/DataDog",
    "factory": "https://github.com/Factory-AI",
    "fal": "https://github.com/fal-ai",
    "gamma": "https://github.com/gamma-app",
    "gitlab": "https://github.com/gitlabhq",
    "glean": "https://github.com/askglean",
    "harvey": "https://github.com/harvey-ai",
    "hebbia": "https://github.com/hebbia",
    "higgsfield-ai": "https://github.com/higgsfield-ai",
    "legora": "https://github.com/legora-ai",
    "lovable": "https://github.com/lovable-dev",
    "monday": "https://github.com/mondaycom",
    "netlify": "https://github.com/netlify",
    "rogo": "https://github.com/rogo-ai",
    "rubrik": "https://github.com/rubrikinc",
    "runway": "https://github.com/runwayml",
    "snowflake": "https://github.com/snowflakedb",
    "tanium": "https://github.com/tanium",
    "vercel": "https://github.com/vercel",
    "webflow": "https://github.com/webflow",
    "zocks": "https://github.com/zocks-io",
    "zoom": "https://github.com/zoom"
}

enriched = []
for it in data:
    slug = it["slug"]
    it["website"] = official_sites.get(slug, "")
    it["github"] = official_githubs.get(slug, "")
    enriched.append(it)
    print(f"[{slug:28s}] Site: {it['website']:<30s} | Category: {it['category']:<15s} | Overview len: {len(it['overview'])}")

# Save final enriched JSON
out_path = Path("data/claude-agents-products.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(enriched, f, indent=2, ensure_ascii=False)
print(f"\n[OK] Saved final enriched 33 agents and products to {out_path}")
