import json
import os
import re

# Authoritative directory of universal developer tools with cross-ecosystem capabilities
CROSS_ECOSYSTEM_REGISTRY = {
    "github": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "cursor", "mcp"],
        "chatgpt_action_url": "https://api.github.com/openapi.json",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-github",
        "antigravity_plugin_id": "antigravity-plugins-official/plugin/github"
    },
    "slack": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://api.slack.com/specs/openapi/v2/slack_web.json",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-slack",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/slack"
    },
    "linear": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "cursor", "mcp"],
        "chatgpt_action_url": "https://api.linear.app/graphql",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-linear",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/linear"
    },
    "notion": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://api.notion.com/v1",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-notion",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/notion"
    },
    "canva": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://api.canva.com/rest/v1",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-canva",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/canva"
    },
    "figma": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://api.figma.com/v1",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-figma",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/figma"
    },
    "zapier": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://actions.zapier.com/api/v1/openapi.json",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-zapier",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/zapier"
    },
    "wolfram": {
        "ecosystems": ["claude", "chatgpt", "mcp"],
        "chatgpt_action_url": "https://www.wolframalpha.com/api/v1/openapi.json",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-wolfram",
        "antigravity_plugin_id": None
    },
    "sentry": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "cursor", "mcp"],
        "chatgpt_action_url": "https://docs.sentry.io/api/",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-sentry",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/sentry"
    },
    "posthog": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "cursor", "mcp"],
        "chatgpt_action_url": "https://app.posthog.com/api/openapi.json",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-posthog",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/posthog"
    },
    "datadog": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "cursor", "mcp"],
        "chatgpt_action_url": "https://api.datadoghq.com/api/v2",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-datadog",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/datadog"
    },
    "docker": {
        "ecosystems": ["claude", "chatgpt", "cursor", "mcp"],
        "chatgpt_action_url": "https://docs.docker.com/engine/api/v1.44.yaml",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-docker",
        "antigravity_plugin_id": None
    },
    "stripe": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "cursor", "mcp"],
        "chatgpt_action_url": "https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-stripe",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/stripe"
    },
    "supabase": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "cursor", "mcp"],
        "chatgpt_action_url": "https://api.supabase.com/v1/openapi.json",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-supabase",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/supabase"
    },
    "postgres": {
        "ecosystems": ["claude", "cursor", "mcp"],
        "chatgpt_action_url": None,
        "chatgpt_gpt_url": None,
        "antigravity_plugin_id": None
    },
    "jira": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://developer.atlassian.com/cloud/jira/platform/swagger.v3.json",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-jira",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/atlassian-twg-cli"
    },
    "confluence": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://developer.atlassian.com/cloud/confluence/swagger.v3.json",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-confluence",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/atlassian-twg-cli"
    },
    "trello": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://api.trello.com/1/openapi.json",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-trello",
        "antigravity_plugin_id": None
    },
    "asana": {
        "ecosystems": ["claude", "chatgpt", "mcp"],
        "chatgpt_action_url": "https://raw.githubusercontent.com/Asana/openapi/master/defs/asana_oas.yaml",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-asana",
        "antigravity_plugin_id": None
    },
    "railway": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "cursor", "mcp"],
        "chatgpt_action_url": "https://backboard.railway.app/graphql/v2",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-railway",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/railway"
    },
    "netlify": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "cursor", "mcp"],
        "chatgpt_action_url": "https://api.netlify.com/api/v1/openapi.json",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-netlify",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/netlify"
    },
    "auth0": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://auth0.com/docs/api/management/v2",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-auth0",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/auth0"
    },
    "dropbox": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://api.dropboxapi.com/2/",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-dropbox",
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/dropbox"
    },
    "gdocs": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://docs.googleapis.com/$discovery/rest?version=v1",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-google-docs",
        "antigravity_plugin_id": "antigravity-plugins-official/plugin/gdocs"
    },
    "gsheets": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://sheets.googleapis.com/$discovery/rest?version=v4",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-google-sheets",
        "antigravity_plugin_id": "antigravity-plugins-official/plugin/gsheets"
    },
    "gslides": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://slides.googleapis.com/$discovery/rest?version=v1",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-google-slides",
        "antigravity_plugin_id": "antigravity-plugins-official/plugin/gslides"
    },
    "gmail": {
        "ecosystems": ["claude", "chatgpt", "antigravity", "mcp"],
        "chatgpt_action_url": "https://gmail.googleapis.com/$discovery/rest?version=v1",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-gmail",
        "antigravity_plugin_id": "antigravity-plugins-official/plugin/gmail"
    },
    "cloudflare": {
        "ecosystems": ["claude", "chatgpt", "cursor", "mcp"],
        "chatgpt_action_url": "https://raw.githubusercontent.com/cloudflare/api-schemas/main/openapi.json",
        "chatgpt_gpt_url": "https://chatgpt.com/g/g-cloudflare",
        "antigravity_plugin_id": None
    },
    "mobbin": {
        "ecosystems": ["claude", "antigravity", "mcp"],
        "chatgpt_action_url": None,
        "chatgpt_gpt_url": None,
        "antigravity_plugin_id": "antigravity-plugins-partners/plugin/mobbin"
    }
}

def match_registry_entry(slug, title):
    norm_slug = (slug or "").lower().replace("-", "").replace("_", "")
    norm_title = (title or "").lower().replace(" ", "").replace("-", "")
    
    for key, data in CROSS_ECOSYSTEM_REGISTRY.items():
        norm_key = key.lower().replace("-", "")
        if norm_key in norm_slug or norm_key in norm_title or norm_slug in norm_key:
            return data
    return None

def enrich():
    print("[*] Starting Marketplace Multi-Ecosystem Enrichment Engine...")
    
    # 1. Enrich Connectors (claude-connectors-plugins.json)
    path_conn = os.path.join("data", "claude-connectors-plugins.json")
    if os.path.exists(path_conn):
        with open(path_conn, "r", encoding="utf-8") as f:
            connectors = json.load(f)
        
        enriched_conn_count = 0
        for c in connectors:
            slug = c.get("slug", "")
            title = c.get("title", "")
            matched = match_registry_entry(slug, title)
            if matched:
                c["ecosystems"] = matched["ecosystems"]
                c["chatgpt_action_url"] = matched["chatgpt_action_url"]
                c["chatgpt_gpt_url"] = matched["chatgpt_gpt_url"]
                c["antigravity_plugin_id"] = matched["antigravity_plugin_id"]
                enriched_conn_count += 1
            else:
                c["ecosystems"] = ["claude", "mcp"]
                c["chatgpt_action_url"] = None
                c["chatgpt_gpt_url"] = None
                c["antigravity_plugin_id"] = None
        
        with open(path_conn, "w", encoding="utf-8") as f:
            json.dump(connectors, f, indent=2, ensure_ascii=False)
        print(f"[OK] Enriched {len(connectors)} connectors ({enriched_conn_count} cross-platform bridges enabled).")

    # 2. Enrich Marketplace Plugins (claude-marketplace-plugins.json)
    path_plug = os.path.join("data", "claude-marketplace-plugins.json")
    if os.path.exists(path_plug):
        with open(path_plug, "r", encoding="utf-8") as f:
            plugins = json.load(f)
        
        enriched_plug_count = 0
        for p in plugins:
            slug = p.get("slug", "")
            title = p.get("title", "")
            matched = match_registry_entry(slug, title)
            if matched:
                p["ecosystems"] = matched["ecosystems"]
                p["chatgpt_action_url"] = matched["chatgpt_action_url"]
                p["chatgpt_gpt_url"] = matched["chatgpt_gpt_url"]
                p["antigravity_plugin_id"] = matched["antigravity_plugin_id"]
                enriched_plug_count += 1
            else:
                p["ecosystems"] = ["claude", "mcp"]
                p["chatgpt_action_url"] = None
                p["chatgpt_gpt_url"] = None
                p["antigravity_plugin_id"] = None
        
        with open(path_plug, "w", encoding="utf-8") as f:
            json.dump(plugins, f, indent=2, ensure_ascii=False)
        print(f"[OK] Enriched {len(plugins)} marketplace plugins ({enriched_plug_count} cross-platform bridges enabled).")

    # 3. Enrich Agents & Products (claude-agents-products.json)
    path_agents = os.path.join("data", "claude-agents-products.json")
    if os.path.exists(path_agents):
        with open(path_agents, "r", encoding="utf-8") as f:
            agents = json.load(f)
        
        enriched_agents_count = 0
        for a in agents:
            slug = a.get("slug", "")
            title = a.get("title", "")
            matched = match_registry_entry(slug, title)
            if matched:
                a["ecosystems"] = matched["ecosystems"]
                a["chatgpt_action_url"] = matched["chatgpt_action_url"]
                a["chatgpt_gpt_url"] = matched["chatgpt_gpt_url"]
                a["antigravity_plugin_id"] = matched["antigravity_plugin_id"]
                enriched_agents_count += 1
            else:
                a["ecosystems"] = ["claude", "mcp"]
                a["chatgpt_action_url"] = None
                a["chatgpt_gpt_url"] = None
                a["antigravity_plugin_id"] = None
        
        with open(path_agents, "w", encoding="utf-8") as f:
            json.dump(agents, f, indent=2, ensure_ascii=False)
        print(f"[OK] Enriched {len(agents)} agents & products ({enriched_agents_count} cross-platform bridges enabled).")

if __name__ == "__main__":
    enrich()
