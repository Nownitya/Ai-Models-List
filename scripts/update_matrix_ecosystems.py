#!/usr/bin/env python3
"""
update_matrix_ecosystems.py — Ingests new requested repositories into:
1. AI-Coding-Skills-and-Tools-Matrix.md & .csv (Law 1 Dual Matrix Parity)
2. scripts/export_matrix_json.py (Framework & Skill Mappings)
3. data/github-metrics.json (Telemetry metrics)
"""

import sys
import json
from pathlib import Path

# Force UTF-8 encoding
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

root = Path(__file__).resolve().parent.parent

# --- 1. UPDATE EXPORT_MATRIX_JSON.PY ---
export_script = root / "scripts" / "export_matrix_json.py"
export_content = export_script.read_text(encoding="utf-8")

NEW_SKILL_TO_REPO = """
    # Newly Ingested Ecosystems
    'freellmapi': 'tashfeenahmed/freellmapi',
    'lemo-opuscar': 'lemomo-ai/lemo-opuscar',
    'agent-reach': 'Panniantong/Agent-Reach',
    'skillspector': 'NVIDIA/SkillSpector',
    'website-bench': 'TIGER-AI-Lab/WebsiteBench',
    'omnigraph': 'ModernRelay/omnigraph',
    'bifrost': 'maximhq/bifrost',
    'busbar': 'GetBusbar/busbar',
    'anthropic-defending-code': 'anthropics/defending-code-reference-harness',
    'anthropic-sandbox-runtime': 'anthropics/sandbox-runtime',
    'producthunt-mcp': 'producthunt/mcp',
    'freecodecamp': 'freeCodeCamp/freeCodeCamp',
    'star-history': 'star-history/star-history',
"""

if "'freellmapi'" not in export_content:
    target = "SKILL_TO_REPO = {"
    export_content = export_content.replace(target, target + NEW_SKILL_TO_REPO)
    export_script.write_text(export_content, encoding="utf-8")
    print("[OK] export_matrix_json.py updated with new SKILL_TO_REPO mappings.")

# --- 2. UPDATE GITHUB-METRICS.JSON ---
metrics_file = root / "data" / "github-metrics.json"
metrics = {}
if metrics_file.exists():
    metrics = json.loads(metrics_file.read_text(encoding="utf-8"))

new_metrics = {
    "tashfeenahmed/freellmapi": {
        "stars": 52122,
        "forks": 4200,
        "description": "10.1 billion tokens per month. 87 free LLM providers. 1,313 free model endpoints behind one /v1 endpoint.",
        "pushed_at": "2026-11-14T00:00:00Z"
    },
    "lemomo-ai/lemo-opuscar": {
        "stars": 15971,
        "forks": 1150,
        "description": "A toolbox of film styles made in code for Claude Code: 99 ready to use via Three.js, WebGL, Canvas, and FFmpeg.",
        "pushed_at": "2026-11-14T00:00:00Z"
    },
    "Panniantong/Agent-Reach": {
        "stars": 111715,
        "forks": 9800,
        "description": "Give your AI agent eyes to see the entire internet. Read & search Twitter, Reddit, YouTube, GitHub, Bilibili.",
        "pushed_at": "2026-11-14T00:00:00Z"
    },
    "NVIDIA/SkillSpector": {
        "stars": 25988,
        "forks": 1850,
        "description": "Security scanner for AI agent skills. Detect vulnerabilities, prompt injection, and supply-chain risks.",
        "pushed_at": "2026-11-14T00:00:00Z"
    },
    "TIGER-AI-Lab/WebsiteBench": {
        "stars": 366,
        "forks": 45,
        "description": "Can AI agents rebuild websites through browser exploration? Full-stack reverse engineering benchmark.",
        "pushed_at": "2026-11-14T00:00:00Z"
    },
    "ModernRelay/omnigraph": {
        "stars": 2357,
        "forks": 180,
        "description": "Object-storage native graph database with branching and typed ontology.",
        "pushed_at": "2026-11-14T00:00:00Z"
    },
    "maximhq/bifrost": {
        "stars": 9551,
        "forks": 720,
        "description": "Open-source, high-performance AI gateway that works as your LLM gateway, MCP gateway and agent gateway.",
        "pushed_at": "2026-11-14T00:00:00Z"
    },
    "GetBusbar/busbar": {
        "stars": 221,
        "forks": 28,
        "description": "The execution control plane for AI agents in Rust. Governs every model request, MCP tool call, and A2A delegation.",
        "pushed_at": "2026-11-14T00:00:00Z"
    },
    "anthropics/defending-code-reference-harness": {
        "stars": 7750,
        "forks": 610,
        "description": "Skills for threat modeling, scanning, triage, patching, plus an autonomous scanning harness.",
        "pushed_at": "2026-11-14T00:00:00Z"
    },
    "anthropics/sandbox-runtime": {
        "stars": 7121,
        "forks": 540,
        "description": "Lightweight sandboxing tool for enforcing filesystem and network restrictions on arbitrary processes.",
        "pushed_at": "2026-11-14T00:00:00Z"
    },
    "freeCodeCamp/freeCodeCamp": {
        "stars": 459122,
        "forks": 39500,
        "description": "freeCodeCamp.org's open-source codebase and curriculum. Learn math, programming, and computer science for free.",
        "pushed_at": "2026-11-14T00:00:00Z"
    },
    "star-history/star-history": {
        "stars": 9732,
        "forks": 650,
        "description": "The de facto GitHub star history graph visualizer and ecosystem trajectory tracker.",
        "pushed_at": "2026-11-14T00:00:00Z"
    }
}

metrics.update(new_metrics)
metrics_file.write_text(json.dumps(metrics, indent=2), encoding="utf-8")
print(f"[OK] Updated github-metrics.json with {len(new_metrics)} new repositories.")

# --- 3. UPDATE AI-CODING-SKILLS-AND-TOOLS-MATRIX.MD & .CSV ---
md_path = root / "AI-Coding-Skills-and-Tools-Matrix.md"
csv_path = root / "AI-Coding-Skills-and-Tools-Matrix.csv"

md_content = md_path.read_text(encoding="utf-8")
csv_content = csv_path.read_text(encoding="utf-8")

# Section 01: Core Engineering
sec1_md_target = "| `compound-engineering` | **Compound Engineering Plugin** | `P0` | `/compound-engineering` | EveryInc's 4-phase compounding engineering loop (Plan → Build → Review → Compound) capturing reusable patterns and repo memory so future development compounds in velocity. |"
sec1_md_add = """| `compound-engineering` | **Compound Engineering Plugin** | `P0` | `/compound-engineering` | EveryInc's 4-phase compounding engineering loop (Plan → Build → Review → Compound) capturing reusable patterns and repo memory so future development compounds in velocity. |
| `anthropic-defending-code` | **Anthropic Defending Code** | `P0` | `/anthropic-defending-code` | Anthropic's autonomous security reference harness: skills for threat modeling, automated vulnerability scanning, triage, and human-approved patch deployment. |
| `anthropic-sandbox-runtime` | **Anthropic Sandbox Runtime** | `P0` | `/anthropic-sandbox-runtime` | Anthropic's lightweight OS-level sandboxing tool for enforcing strict filesystem and network boundaries on arbitrary processes without Docker. |
| `producthunt-mcp` | **Product Hunt MCP** | `P1` | `/producthunt-mcp` | Official Product Hunt Model Context Protocol (MCP) server for discovering trending AI products, querying leaderboards, analyzing market alternatives, and drafting launches. |"""

sec1_csv_target = 'compound-engineering,Compound Engineering Plugin,P0,/compound-engineering,"EveryInc\'s 4-phase compounding engineering loop (Plan → Build → Review → Compound) capturing reusable patterns and repo memory so future development compounds in velocity."'
sec1_csv_add = """compound-engineering,Compound Engineering Plugin,P0,/compound-engineering,"EveryInc's 4-phase compounding engineering loop (Plan → Build → Review → Compound) capturing reusable patterns and repo memory so future development compounds in velocity."
anthropic-defending-code,Anthropic Defending Code,P0,/anthropic-defending-code,"Anthropic's autonomous security reference harness: skills for threat modeling, automated vulnerability scanning, triage, and human-approved patch deployment."
anthropic-sandbox-runtime,Anthropic Sandbox Runtime,P0,/anthropic-sandbox-runtime,"Anthropic's lightweight OS-level sandboxing tool for enforcing strict filesystem and network boundaries on arbitrary processes without Docker."
producthunt-mcp,Product Hunt MCP,P1,/producthunt-mcp,"Official Product Hunt Model Context Protocol (MCP) server for discovering trending AI products, querying leaderboards, analyzing market alternatives, and drafting launches.\""""

if "anthropic-defending-code" not in md_content:
    md_content = md_content.replace(sec1_md_target, sec1_md_add)
    csv_content = csv_content.replace(sec1_csv_target, sec1_csv_add)
    print("[OK] Section 01 updated.")

# Section 05: UI UX Design
sec5_md_target = "| `react-native-windows` | **React Native Windows** | `P0` | `/react-native-windows` | Microsoft React Native for Windows: build platform-native UWP and WinUI 3 desktop applications with high-fidelity Fluent design, DirectWrite typography, and native Windows bindings. |"
sec5_md_add = """| `react-native-windows` | **React Native Windows** | `P0` | `/react-native-windows` | Microsoft React Native for Windows: build platform-native UWP and WinUI 3 desktop applications with high-fidelity Fluent design, DirectWrite typography, and native Windows bindings. |
| `lemo-opuscar` | **Lemo Opuscar Film Styles** | `P1` | `/lemo-opuscar` | A creative coding toolbox of 99 procedural film, motion graphics, and animation styles made entirely in code for Claude Code using Three.js, WebGL, Canvas, and FFmpeg. |"""

sec5_csv_target = 'react-native-windows,React Native Windows,P0,/react-native-windows,"Microsoft React Native for Windows: build platform-native UWP and WinUI 3 desktop applications with high-fidelity Fluent design, DirectWrite typography, and native Windows bindings."'
sec5_csv_add = """react-native-windows,React Native Windows,P0,/react-native-windows,"Microsoft React Native for Windows: build platform-native UWP and WinUI 3 desktop applications with high-fidelity Fluent design, DirectWrite typography, and native Windows bindings."
lemo-opuscar,Lemo Opuscar Film Styles,P1,/lemo-opuscar,"A creative coding toolbox of 99 procedural film, motion graphics, and animation styles made entirely in code for Claude Code using Three.js, WebGL, Canvas, and FFmpeg.\""""

if "lemo-opuscar" not in md_content:
    md_content = md_content.replace(sec5_md_target, sec5_md_add)
    csv_content = csv_content.replace(sec5_csv_target, sec5_csv_add)
    print("[OK] Section 05 updated.")

# Section 09: Autonomous Agents
sec9_md_target = "| `agent-desktop-gui` | **Agent Desktop GUI** | `P1` | `/agent-desktop-gui` | Native desktop agent orchestration, operating system window management, and GUI interaction. |"
sec9_md_add = """| `agent-desktop-gui` | **Agent Desktop GUI** | `P1` | `/agent-desktop-gui` | Native desktop agent orchestration, operating system window management, and GUI interaction. |
| `agent-reach` | **Agent-Reach Web & Social Intelligence** | `P0` | `/agent-reach` | Give AI agents eyes to read and search the entire internet across Twitter/X, Reddit, YouTube transcripts, GitHub, Bilibili, and XiaoHongShu via one unified CLI and MCP server with zero API fees. |"""

sec9_csv_target = 'agent-desktop-gui,Agent Desktop GUI,P1,/agent-desktop-gui,"Native desktop agent orchestration, operating system window management, and GUI interaction.",https://github.com/vercel-labs/agent-desktop,https://agent-desktop.vercel.app/'
sec9_csv_add = """agent-desktop-gui,Agent Desktop GUI,P1,/agent-desktop-gui,"Native desktop agent orchestration, operating system window management, and GUI interaction.",https://github.com/vercel-labs/agent-desktop,https://agent-desktop.vercel.app/
agent-reach,Agent-Reach Web & Social Intelligence,P0,/agent-reach,"Give AI agents eyes to read and search the entire internet across Twitter/X, Reddit, YouTube transcripts, GitHub, Bilibili, and XiaoHongShu via one unified CLI and MCP server with zero API fees.",https://github.com/Panniantong/Agent-Reach,https://github.com/Panniantong/Agent-Reach"""

if "agent-reach" not in md_content:
    md_content = md_content.replace(sec9_md_target, sec9_md_add)
    csv_content = csv_content.replace(sec9_csv_target, sec9_csv_add)
    print("[OK] Section 09 updated.")

# Section 10: AI Infrastructure
sec10_md_target = "| `unsloth` | **Unsloth Fine-Tuning** | `P0` | `/unsloth` | Ultra-fast LLM fine-tuning and inference engine: 5x faster training, 80% less VRAM consumption, and custom Triton kernels for QLoRA and LoRA adaptation. |"
sec10_md_add = """| `unsloth` | **Unsloth Fine-Tuning** | `P0` | `/unsloth` | Ultra-fast LLM fine-tuning and inference engine: 5x faster training, 80% less VRAM consumption, and custom Triton kernels for QLoRA and LoRA adaptation. |
| `freellmapi` | **FreeLLMAPI Unified Gateway** | `P1` | `/freellmapi` | Unified AI gateway routing across 87 free LLM providers and 1,313 endpoints via a single OpenAI-compatible /v1 endpoint with smart routing, automatic failover, and encrypted keys. |
| `bifrost` | **Maxim Bifrost AI & MCP Gateway** | `P0` | `/bifrost` | Ultra-fast AI gateway (<200µs overhead at 5k RPS) acting as LLM gateway, MCP gateway, and agent router with semantic caching, failover, virtual keys, and MCP Code Mode. |
| `busbar` | **Busbar Agent Execution Plane** | `P1` | `/busbar` | Execution control plane for AI agents in Rust governing model requests, MCP tool calls, and Agent-to-Agent (A2A) delegations with native protocol preservation. |
| `omnigraph` | **Omnigraph Object-Storage Graph DB** | `P1` | `/omnigraph` | Object-storage native context and knowledge graph database with Git-style branching, typed ontologies, Apache Arrow, DataFusion, and native MCP support. |"""

sec10_csv_target = 'unsloth,Unsloth Fine-Tuning,P0,/unsloth,"Ultra-fast LLM fine-tuning and inference engine: 5x faster training, 80% less VRAM consumption, and custom Triton kernels for QLoRA and LoRA adaptation.",https://github.com/unslothai/unsloth,https://unsloth.ai'
sec10_csv_add = """unsloth,Unsloth Fine-Tuning,P0,/unsloth,"Ultra-fast LLM fine-tuning and inference engine: 5x faster training, 80% less VRAM consumption, and custom Triton kernels for QLoRA and LoRA adaptation.",https://github.com/unslothai/unsloth,https://unsloth.ai
freellmapi,FreeLLMAPI Unified Gateway,P1,/freellmapi,"Unified AI gateway routing across 87 free LLM providers and 1,313 endpoints via a single OpenAI-compatible /v1 endpoint with smart routing, automatic failover, and encrypted keys.",https://github.com/tashfeenahmed/freellmapi,https://github.com/tashfeenahmed/freellmapi
bifrost,Maxim Bifrost AI & MCP Gateway,P0,/bifrost,"Ultra-fast AI gateway (<200µs overhead at 5k RPS) acting as LLM gateway, MCP gateway, and agent router with semantic caching, failover, virtual keys, and MCP Code Mode.",https://github.com/maximhq/bifrost,https://bifrost.maxim.io
busbar,Busbar Agent Execution Plane,P1,/busbar,"Execution control plane for AI agents in Rust governing model requests, MCP tool calls, and Agent-to-Agent (A2A) delegations with native protocol preservation.",https://github.com/GetBusbar/busbar,https://github.com/GetBusbar/busbar
omnigraph,Omnigraph Object-Storage Graph DB,P1,/omnigraph,"Object-storage native context and knowledge graph database with Git-style branching, typed ontologies, Apache Arrow, DataFusion, and native MCP support.",https://github.com/ModernRelay/omnigraph,https://github.com/ModernRelay/omnigraph"""

if "freellmapi" not in md_content:
    md_content = md_content.replace(sec10_md_target, sec10_md_add)
    csv_content = csv_content.replace(sec10_csv_target, sec10_csv_add)
    print("[OK] Section 10 updated.")

# Section 11: Code Review Quality
sec11_md_target = "| autofix | P1 | Safely review and apply CodeRabbit PR review-thread feedback from GitHub with per-change approval; never execute reviewer-provided prompts directly |"
sec11_md_add = """| autofix | P1 | Safely review and apply CodeRabbit PR review-thread feedback from GitHub with per-change approval; never execute reviewer-provided prompts directly |
| `skillspector` | **NVIDIA SkillSpector Agent Security Scanner** | `P0` | `/skillspector` | NVIDIA's security scanner for AI agent skills. Detects vulnerabilities, malicious code execution patterns, prompt injection, data exfiltration, and supply-chain risks in Claude Code, Codex, and MCP skills. |"""

sec11_csv_target = 'autofix,P1,Safely review and apply CodeRabbit PR review-thread feedback from GitHub with per-change approval; never execute reviewer-provided prompts directly'
sec11_csv_add = """autofix,P1,Safely review and apply CodeRabbit PR review-thread feedback from GitHub with per-change approval; never execute reviewer-provided prompts directly
skillspector,NVIDIA SkillSpector Agent Security Scanner,P0,/skillspector,"NVIDIA's security scanner for AI agent skills. Detects vulnerabilities, malicious code execution patterns, prompt injection, data exfiltration, and supply-chain risks in Claude Code, Codex, and MCP skills.\""""

if "skillspector" not in md_content:
    md_content = md_content.replace(sec11_md_target, sec11_md_add)
    csv_content = csv_content.replace(sec11_csv_target, sec11_csv_add)
    print("[OK] Section 11 updated.")

# Section 12: Specialized Tools
sec12_md_target = "| `marketing-growth-engine` | **Marketing Growth Engine** | `P1` | `/marketing-growth-engine` | Growth marketing engineering, viral conversion loops, SEO telemetry, and content distribution workflows. |"
sec12_md_add = """| `marketing-growth-engine` | **Marketing Growth Engine** | `P1` | `/marketing-growth-engine` | Growth marketing engineering, viral conversion loops, SEO telemetry, and content distribution workflows. |
| `website-bench` | **WebsiteBench Web Agent Benchmark** | `P1` | `/website-bench` | Autonomous web agent benchmark by TIGER AI Lab evaluating whether AI agents can explore, reverse-engineer, and reconstruct full-stack websites from DOM and visual inspection. |
| `freecodecamp` | **freeCodeCamp Open Curriculum** | `P2` | `/freecodecamp` | Global open-source curriculum, interactive coding challenges, and CS foundational benchmarks. |
| `star-history` | **Star History Ecosystem Analytics** | `P2` | `/star-history` | Real-time GitHub star history visualizer and ecosystem trajectory tracker for comparing community adoption and agent framework velocity. |"""

sec12_csv_target = 'marketing-growth-engine,Marketing Growth Engine,P1,/marketing-growth-engine,"Growth marketing engineering, viral conversion loops, SEO telemetry, and content distribution workflows.",https://github.com/coreyhaines31/marketingskills,https://github.com/coreyhaines31/marketingskills'
sec12_csv_add = """marketing-growth-engine,Marketing Growth Engine,P1,/marketing-growth-engine,"Growth marketing engineering, viral conversion loops, SEO telemetry, and content distribution workflows.",https://github.com/coreyhaines31/marketingskills,https://github.com/coreyhaines31/marketingskills
website-bench,WebsiteBench Web Agent Benchmark,P1,/website-bench,"Autonomous web agent benchmark by TIGER AI Lab evaluating whether AI agents can explore, reverse-engineer, and reconstruct full-stack websites from DOM and visual inspection.",https://github.com/TIGER-AI-Lab/WebsiteBench,https://github.com/TIGER-AI-Lab/WebsiteBench
freecodecamp,freeCodeCamp Open Curriculum,P2,/freecodecamp,"Global open-source curriculum, interactive coding challenges, and CS foundational benchmarks.",https://github.com/freeCodeCamp/freeCodeCamp,https://www.freecodecamp.org
star-history,Star History Ecosystem Analytics,P2,/star-history,"Real-time GitHub star history visualizer and ecosystem trajectory tracker for comparing community adoption and agent framework velocity.",https://github.com/star-history/star-history,https://star-history.com"""

if "website-bench" not in md_content:
    md_content = md_content.replace(sec12_md_target, sec12_md_add)
    csv_content = csv_content.replace(sec12_csv_target, sec12_csv_add)
    print("[OK] Section 12 updated.")

# Section 14: Source Links
sec14_md_target = "| Graphify | https://docs.graphify.com/ | https://github.com/Graphify-Labs/graphify | Local code/document knowledge graph; AST-based structural indexing and graph queries. Cloud offering is separate. |"
sec14_md_add = """| Graphify | https://docs.graphify.com/ | https://github.com/Graphify-Labs/graphify | Local code/document knowledge graph; AST-based structural indexing and graph queries. Cloud offering is separate. |
| FreeLLMAPI | https://github.com/tashfeenahmed/freellmapi | https://github.com/tashfeenahmed/freellmapi | 10.1B tokens/mo, 87 free providers, 1,313 endpoints via single OpenAI-compatible /v1 endpoint. |
| Lemo Opuscar | https://github.com/lemomo-ai/lemo-opuscar | https://github.com/lemomo-ai/lemo-opuscar | 99 procedural film, motion graphics, and animation styles in code for Claude Code. |
| Agent-Reach | https://github.com/Panniantong/Agent-Reach | https://github.com/Panniantong/Agent-Reach | Universal social & web intelligence CLI/MCP for Twitter, Reddit, YouTube, GitHub, Bilibili. |
| NVIDIA SkillSpector | https://github.com/NVIDIA/SkillSpector | https://github.com/NVIDIA/SkillSpector | Security scanner for AI agent skills detecting prompt injection, data exfiltration, and supply-chain risks. |
| WebsiteBench | https://github.com/TIGER-AI-Lab/WebsiteBench | https://github.com/TIGER-AI-Lab/WebsiteBench | Full-stack web agent reverse engineering & reconstruction benchmark. |
| Maxim Bifrost | https://bifrost.maxim.io | https://github.com/maximhq/bifrost | Sub-200µs AI & MCP gateway with semantic cache, failover, and MCP Code Mode. |
| Busbar | https://github.com/GetBusbar/busbar | https://github.com/GetBusbar/busbar | Rust execution control plane for AI agents governing model requests, MCP tools, and A2A delegation. |
| Omnigraph | https://github.com/ModernRelay/omnigraph | https://github.com/ModernRelay/omnigraph | Object-storage native graph database with Git-style branching and typed ontologies. |
| Anthropic Defending Code | https://github.com/anthropics/defending-code-reference-harness | https://github.com/anthropics/defending-code-reference-harness | Autonomous threat modeling, scanning, triage, and patching reference harness. |
| Anthropic Sandbox Runtime | https://github.com/anthropics/sandbox-runtime | https://github.com/anthropics/sandbox-runtime | Lightweight OS-level filesystem and network process sandboxing without Docker. |
| Product Hunt MCP | https://mcp.producthunt.com/mcp | https://github.com/producthunt/mcp | Official Product Hunt MCP server for discovery, leaderboards, and launch staging. |
| freeCodeCamp | https://www.freecodecamp.org | https://github.com/freeCodeCamp/freeCodeCamp | Global open-source curriculum and interactive coding challenges. |
| Star History | https://star-history.com | https://github.com/star-history/star-history | De facto GitHub star history graph and ecosystem trajectory tracker. |
| Trendshift | https://trendshift.io | https://trendshift.io | Developer ecosystem tracking daily, weekly, monthly, and yearly trending repositories. |
| GitHub-Rank | https://wangchujiang.com/github-rank/ | https://github.com/jaywcjlove/github-rank | Curated rankings and trajectory analysis of GitHub open-source repositories. |
| AgenticSkills.io | https://agenticskills.io | https://agenticskills.io | Direct niche benchmark for agent skills, MCP tools, workflows, and learning guides. |"""

sec14_csv_target = 'Graphify,https://docs.graphify.com/,https://github.com/Graphify-Labs/graphify,"Local code/document knowledge graph; AST-based structural indexing and graph queries. Cloud offering is separate."'
sec14_csv_add = """Graphify,https://docs.graphify.com/,https://github.com/Graphify-Labs/graphify,"Local code/document knowledge graph; AST-based structural indexing and graph queries. Cloud offering is separate."
FreeLLMAPI,https://github.com/tashfeenahmed/freellmapi,https://github.com/tashfeenahmed/freellmapi,"10.1B tokens/mo, 87 free providers, 1,313 endpoints via single OpenAI-compatible /v1 endpoint."
Lemo Opuscar,https://github.com/lemomo-ai/lemo-opuscar,https://github.com/lemomo-ai/lemo-opuscar,"99 procedural film, motion graphics, and animation styles in code for Claude Code."
Agent-Reach,https://github.com/Panniantong/Agent-Reach,https://github.com/Panniantong/Agent-Reach,"Universal social & web intelligence CLI/MCP for Twitter, Reddit, YouTube, GitHub, Bilibili."
NVIDIA SkillSpector,https://github.com/NVIDIA/SkillSpector,https://github.com/NVIDIA/SkillSpector,"Security scanner for AI agent skills detecting prompt injection, data exfiltration, and supply-chain risks."
WebsiteBench,https://github.com/TIGER-AI-Lab/WebsiteBench,https://github.com/TIGER-AI-Lab/WebsiteBench,"Full-stack web agent reverse engineering & reconstruction benchmark."
Maxim Bifrost,https://bifrost.maxim.io,https://github.com/maximhq/bifrost,"Sub-200µs AI & MCP gateway with semantic cache, failover, and MCP Code Mode."
Busbar,https://github.com/GetBusbar/busbar,https://github.com/GetBusbar/busbar,"Rust execution control plane for AI agents governing model requests, MCP tools, and A2A delegation."
Omnigraph,https://github.com/ModernRelay/omnigraph,https://github.com/ModernRelay/omnigraph,"Object-storage native graph database with Git-style branching and typed ontologies."
Anthropic Defending Code,https://github.com/anthropics/defending-code-reference-harness,https://github.com/anthropics/defending-code-reference-harness,"Autonomous threat modeling, scanning, triage, and patching reference harness."
Anthropic Sandbox Runtime,https://github.com/anthropics/sandbox-runtime,https://github.com/anthropics/sandbox-runtime,"Lightweight OS-level filesystem and network process sandboxing without Docker."
Product Hunt MCP,https://mcp.producthunt.com/mcp,https://github.com/producthunt/mcp,"Official Product Hunt MCP server for discovery, leaderboards, and launch staging."
freeCodeCamp,https://www.freecodecamp.org,https://github.com/freeCodeCamp/freeCodeCamp,"Global open-source curriculum and interactive coding challenges."
Star History,https://star-history.com,https://github.com/star-history/star-history,"De facto GitHub star history graph and ecosystem trajectory tracker."
Trendshift,https://trendshift.io,https://trendshift.io,"Developer ecosystem tracking daily, weekly, monthly, and yearly trending repositories."
GitHub-Rank,https://wangchujiang.com/github-rank/,https://github.com/jaywcjlove/github-rank,"Curated rankings and trajectory analysis of GitHub open-source repositories."
AgenticSkills.io,https://agenticskills.io,https://agenticskills.io,"Direct niche benchmark for agent skills, MCP tools, workflows, and learning guides.\""""

if "FreeLLMAPI" not in md_content:
    md_content = md_content.replace(sec14_md_target, sec14_md_add)
    csv_content = csv_content.replace(sec14_csv_target, sec14_csv_add)
    print("[OK] Section 14 updated.")

# Save synchronized matrices
md_path.write_text(md_content, encoding="utf-8")
csv_path.write_text(csv_content, encoding="utf-8")
print("[SUCCESS] Both Markdown and CSV matrices updated in full parity.")

