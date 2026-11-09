#!/usr/bin/env python3
"""
scripts/mcp_server.py — Model Context Protocol (MCP) Server for AI-Models-List

Provides JSON-RPC 2.0 stdio interface for LLMs and agent harnesses
(Claude Code, Antigravity, Cursor, Claude Desktop) to discover, inspect,
and install AI coding skills and query live telemetry. Zero external dependencies.
"""

import sys
import json
import argparse
from pathlib import Path

# Add repo root to path for internal imports
REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from scripts.install_to_project import get_available_skills, resolve_bundle_skills, PRESET_BUNDLES

class MCPServer:
    def __init__(self, repo_root: Path = None):
        self.repo_root = repo_root or REPO_ROOT
        self.skills_root = self.repo_root / "skills"
        self.metrics_file = self.repo_root / "data" / "github-metrics.json"
        self.matrix_file = self.repo_root / "AI-Coding-Skills-and-Tools-Matrix.md"

    def search_skills(self, query: str = "", category: str = "", priority: str = "") -> str:
        skills_by_scoped, _ = get_available_skills(self.skills_root)
        q = query.lower().strip().lstrip("/")
        cat = category.lower().strip()

        matches = []
        for scoped_name, info in sorted(skills_by_scoped.items()):
            if cat and cat not in info["category"].lower():
                continue
            if q and (q not in scoped_name.lower() and q not in info["name"].lower() and q not in info["category"].lower()):
                continue
            matches.append(info)

        if not matches:
            return f"No skills matched query='{query}' category='{category}'."

        lines = [f"Found {len(matches)} matching skill(s):"]
        for m in matches[:30]:  # Limit output for token conservation
            lines.append(f"• /{m['scoped_name']} (Base: {m['name']}) [{m['category']}]")
        if len(matches) > 30:
            lines.append(f"... and {len(matches) - 30} more skills.")
        return "\n".join(lines)

    def get_skill(self, skill_name: str) -> str:
        req = skill_name.strip().lstrip("/")
        skills_by_scoped, skills_by_base = get_available_skills(self.skills_root)

        target_info = None
        if req in skills_by_scoped:
            target_info = skills_by_scoped[req]
        elif req in skills_by_base and len(skills_by_base[req]) > 0:
            target_info = skills_by_base[req][0]

        if not target_info:
            return f"Error: Skill '{skill_name}' not found in catalog."

        skill_file = target_info["file"]
        if not skill_file.exists():
            return f"Error: Skill file not found at {skill_file}."

        content = skill_file.read_text(encoding="utf-8", errors="replace")
        return f"# Skill: /{target_info['scoped_name']} [{target_info['category']}]\n\n{content}"

    def list_presets(self) -> str:
        lines = ["=== Curated Skill Preset Bundles ==="]
        for name, data in PRESET_BUNDLES.items():
            cat_label = data.get("category", "curated-multi")
            lines.append(f"• {name:15} -> [{cat_label}] {data['description']}")
        lines.append("\nTip: Use install_skill with bundle name or scripts/install-to-project.py --bundle <name>")
        return "\n".join(lines)

    def get_upstream_metrics(self, repo: str = "") -> str:
        if not self.metrics_file.exists():
            return "Error: github-metrics.json not found."

        data = json.loads(self.metrics_file.read_text(encoding="utf-8"))
        repos_dict = data.get("repositories", {})

        if repo:
            target = repo.lower().strip()
            for key, val in repos_dict.items():
                if target in key.lower():
                    return json.dumps(val, indent=2)
            return f"Repository '{repo}' not found in telemetry tracking."

        # Return top 10
        sorted_repos = sorted(repos_dict.values(), key=lambda x: x.get("stars", 0), reverse=True)
        top_list = [
            f"• {r['repo']}: ⭐ {r.get('stars_formatted', '0')} | Tag: {r.get('version', 'latest')} | License: {r.get('license', 'N/A')}"
            for r in sorted_repos[:10]
        ]
        return "Top Starred Upstream Frameworks:\n" + "\n".join(top_list)

    def install_skill(self, skill_name: str, target_dir: str = ".", dry_run: bool = True) -> str:
        target_path = Path(target_dir).resolve()
        skills_by_scoped, skills_by_base = get_available_skills(self.skills_root)

        req = skill_name.strip().lstrip("/")
        info = skills_by_scoped.get(req) or (skills_by_base.get(req)[0] if req in skills_by_base else None)

        if not info:
            return f"Error: Skill '{skill_name}' not found."

        dest_dir = target_path / info["name"]
        if dry_run:
            return f"[Dry-Run] Would install /{info['scoped_name']} to {dest_dir}"

        import shutil
        dest_dir.mkdir(parents=True, exist_ok=True)
        for item in info["dir"].iterdir():
            dest_item = dest_dir / item.name
            if item.is_dir():
                if dest_item.exists():
                    shutil.rmtree(dest_item)
                shutil.copytree(item, dest_item)
            else:
                shutil.copy2(item, dest_item)
        return f"[Success] Installed /{info['scoped_name']} to {dest_dir}"

def handle_jsonrpc_request(req: dict, server: MCPServer) -> dict:
    req_id = req.get("id")
    method = req.get("method")
    params = req.get("params", {})

    if method == "initialize":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "protocolVersion": "2024-11-05",
                "capabilities": {
                    "tools": {},
                    "resources": {}
                },
                "serverInfo": {
                    "name": "ai-coding-skills-matrix",
                    "version": "1.0.0"
                }
            }
        }

    if method == "notifications/initialized":
        return None

    if method == "tools/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "tools": [
                    {
                        "name": "search_skills",
                        "description": "Search the AI Coding Skills and Tools catalog across 301+ skills and 22 categories.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "query": {"type": "string", "description": "Keyword or slash command (e.g. 'writing-plans', 'debugging', 'qa')"},
                                "category": {"type": "string", "description": "Optional category filter (e.g. '08-superpowers', '07-gstack', '01-core-engineering')"},
                                "priority": {"type": "string", "description": "Optional priority filter (P0, P1, P2)"}
                            }
                        }
                    },
                    {
                        "name": "get_skill",
                        "description": "Retrieve the full Markdown definition, workflow, and prompts of any skill in the catalog.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "skill_name": {"type": "string", "description": "Name or scoped command of the skill (e.g. 'writing-plans', 'superpowers-brainstorming', 'gstack-review')"}
                            },
                            "required": ["skill_name"]
                        }
                    },
                    {
                        "name": "list_presets",
                        "description": "List curated skill preset bundles (Superpowers, gstack, Matt Pocock, Docs, Core Eng, Cloud, AI Agents, UI/UX, Testing).",
                        "inputSchema": {
                            "type": "object",
                            "properties": {}
                        }
                    },
                    {
                        "name": "get_upstream_metrics",
                        "description": "Get real-time community stars, latest release versions, and licenses for 104+ upstream agent frameworks.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "repo": {"type": "string", "description": "Optional GitHub repo slug (e.g. 'agentskills/agentskills', 'obra/superpowers')"}
                            }
                        }
                    },
                    {
                        "name": "install_skill",
                        "description": "Inject an authentic skill directory directly into any target repository or agent path.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "skill_name": {"type": "string", "description": "Name or scoped slash command of the skill to install"},
                                "target_dir": {"type": "string", "description": "Destination directory path (default: '.')"},
                                "dry_run": {"type": "boolean", "description": "Simulate installation without writing files (default: true)"}
                            },
                            "required": ["skill_name"]
                        }
                    }
                ]
            }
        }

    if method == "tools/call":
        tool_name = params.get("name")
        args = params.get("arguments", {})

        if tool_name == "search_skills":
            res_text = server.search_skills(args.get("query", ""), args.get("category", ""), args.get("priority", ""))
        elif tool_name == "get_skill":
            res_text = server.get_skill(args.get("skill_name", ""))
        elif tool_name == "list_presets":
            res_text = server.list_presets()
        elif tool_name == "get_upstream_metrics":
            res_text = server.get_upstream_metrics(args.get("repo", ""))
        elif tool_name == "install_skill":
            res_text = server.install_skill(args.get("skill_name", ""), args.get("target_dir", "."), args.get("dry_run", True))
        else:
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {"code": -32601, "message": f"Method/Tool '{tool_name}' not found"}
            }

        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "content": [
                    {
                        "type": "text",
                        "text": res_text
                    }
                ]
            }
        }

    if method == "resources/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "resources": [
                    {
                        "uri": "skills://matrix",
                        "name": "AI Coding Skills and Tools Matrix",
                        "description": "The complete 16-section markdown master workbook.",
                        "mimeType": "text/markdown"
                    },
                    {
                        "uri": "skills://stats",
                        "name": "Upstream Framework Live Telemetry",
                        "description": "Live JSON metrics of stars, tags, and licenses for 32 upstream repositories.",
                        "mimeType": "application/json"
                    }
                ]
            }
        }

    if method == "resources/read":
        uri = params.get("uri")
        if uri == "skills://matrix":
            text = server.matrix_file.read_text(encoding="utf-8", errors="replace")
            mime = "text/markdown"
        elif uri == "skills://stats":
            text = server.metrics_file.read_text(encoding="utf-8", errors="replace")
            mime = "application/json"
        else:
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {"code": -32602, "message": f"Unknown resource uri: {uri}"}
            }

        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "contents": [
                    {
                        "uri": uri,
                        "mimeType": mime,
                        "text": text
                    }
                ]
            }
        }

    return {
        "jsonrpc": "2.0",
        "id": req_id,
        "error": {"code": -32601, "message": f"Unknown method: {method}"}
    }

def run_stdio_server(server: MCPServer):
    """Runs standard stdio JSON-RPC loop."""
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
        except json.JSONDecodeError:
            continue

        res = handle_jsonrpc_request(req, server)
        if res is not None:
            sys.stdout.write(json.dumps(res) + "\n")
            sys.stdout.flush()

def main():
    parser = argparse.ArgumentParser(description="Model Context Protocol (MCP) Server for AI Coding Skills Matrix")
    parser.add_argument("--repo-root", default=str(REPO_ROOT), help="Root directory of Ai-Models-List repo")
    args = parser.parse_args()

    server = MCPServer(repo_root=Path(args.repo_root))
    run_stdio_server(server)

if __name__ == "__main__":
    main()
