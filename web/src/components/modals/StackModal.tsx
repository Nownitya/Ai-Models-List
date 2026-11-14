import React, { useState } from 'react'
import {
  X,
  Trash2,
  Download,
  Copy,
  Check,
  Diamond,
  Layers,
  Terminal,
  Cpu,
  Share2,
  Users,
  Bot,
  Network,
  ShieldCheck,
  Hammer,
  Compass,
  ArrowDown,
  Sparkles,
} from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import { generateSwarmManifest, generateSwarmBrief, partitionStackIntoSwarm } from '@/utils/swarmOrchestrator'

export const StackModal: React.FC = () => {
  const isStackModalOpen = useSkillStore((s) => s.isStackModalOpen)
  const setStackModalOpen = useSkillStore((s) => s.setStackModalOpen)
  const stackModalView = useSkillStore((s) => s.stackModalView)
  const setStackModalView = useSkillStore((s) => s.setStackModalView)
  const stack = useSkillStore((s) => s.stack)
  const removeFromStack = useSkillStore((s) => s.removeFromStack)
  const clearStack = useSkillStore((s) => s.clearStack)

  const [copiedScript, setCopiedScript] = useState(false)
  const [copiedShareUrl, setCopiedShareUrl] = useState(false)
  const [copiedSwarmBrief, setCopiedSwarmBrief] = useState(false)
  const [cliFormat, setCliFormat] = useState<'npx' | 'python'>('npx')

  const copyShareStackUrl = () => {
    const ids = stack.map((s) => s.id).join(',')
    const url = `${window.location.origin}${window.location.pathname}?stack=${encodeURIComponent(ids)}`
    navigator.clipboard.writeText(url)
    setCopiedShareUrl(true)
    setTimeout(() => setCopiedShareUrl(false), 1600)
  }

  // Token budget estimation
  const estimatedTokens = stack.length * 800
  const monolithicBaseline = Math.max(18000, stack.length * 2800)
  const savingsPercent =
    stack.length === 0
      ? 0
      : Math.max(0, Math.round(((monolithicBaseline - estimatedTokens) / monolithicBaseline) * 100))

  const p0Count = stack.filter((s) => s.priority === 'P0').length
  const p1Count = stack.filter((s) => s.priority === 'P1').length
  const otherCount = stack.length - p0Count - p1Count

  const { plannerSkills, builderSkills, verifierSkills } = partitionStackIntoSwarm(stack)

  if (!isStackModalOpen) return null

  // Helper to get active command
  const getCommand = (item: typeof stack[0]) => {
    if (cliFormat === 'npx') {
      return item.officialCli || (item.repo ? `npx skills add ${item.repo} --skill ${item.id}` : item.cli)
    }
    return item.cli
  }

  // 1. Export as Standard Markdown
  const downloadMarkdown = () => {
    let md = `# 🛠️ Custom AI Agent Stack\n\n`
    md += `> Exported from [SkillDock](https://nownitya.github.io/Ai-Models-List/)\n`
    md += `> Generated on: ${new Date().toISOString().split('T')[0]}\n\n`
    md += `## Selected Skills (${stack.length})\n\n`
    md += `| Priority | Skill Name | Slash Command | Official Install Command |\n`
    md += `| :--- | :--- | :--- | :--- |\n`
    stack.forEach((s) => {
      const cmd = s.officialCli || (s.repo ? `npx skills add ${s.repo} --skill ${s.id}` : s.cli)
      md += `| **${s.priority}** | ${s.name} | \`/${s.scoped}\` | \`${cmd}\` |\n`
    })

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `SkillDock-Stack-${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 2. Export as Cursor Rules (.cursorrules)
  const downloadCursorRules = () => {
    let rules = `# .cursorrules — SkillDock Custom Agent Architecture\n\n`
    rules += `# Generated: ${new Date().toISOString().split('T')[0]}\n`
    rules += `# Selected Skills (${stack.length}):\n\n`
    stack.forEach((s) => {
      rules += `## Skill: ${s.name} (/${s.scoped})\n`
      rules += `- Priority: ${s.priority}\n`
      if (s.repo) rules += `- Upstream Repo: ${s.repo}\n`
      rules += `- Install Command: ${s.officialCli || s.cli}\n`
      rules += `- When executing relevant tasks, activate /${s.scoped} rules and behavioral patterns.\n\n`
    })
    rules += `\n# General Laws:\n`
    rules += `- Always verify parity and run tests before claiming completion.\n`
    rules += `- Respect modular boundaries and avoid speculative generality.\n`

    const blob = new Blob([rules], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `.cursorrules`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 3. Export as Claude Code Configuration (claude.json)
  const downloadClaudeConfig = () => {
    const config = {
      $schema: 'https://json.schemastore.org/claude-settings.json',
      version: '1.0',
      customSkills: stack.map((s) => ({
        name: s.name,
        slashCommand: `/${s.scoped}`,
        priority: s.priority,
        upstreamRepo: s.repo || null,
        installCommand: s.officialCli || s.cli,
      })),
      mcpServers: {
        skilldock: {
          command: 'python',
          args: ['scripts/mcp_server.py'],
        },
      },
    }

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `claude-skills-config.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 4. Export as Obsidian Second Brain Note (with Dataview tags)
  const downloadObsidianNote = () => {
    let obs = `---\n`
    obs += `title: "SkillDock Agent Stack"\n`
    obs += `type: agent-stack\n`
    obs += `status: active\n`
    obs += `updated: ${new Date().toISOString().split('T')[0]}\n`
    obs += `tags: [skilldock, ai-stack, second-brain, agent-skills, dataview]\n`
    obs += `---\n\n`
    obs += `# 💎 SkillDock AI Agent Stack\n\n`
    obs += `> **Universal Developer Second Brain Stack Configuration**\n`
    obs += `> Cross-Model Agent Harness & MCP Tooling Suite\n\n`
    obs += `## 📋 Active Stack Registry\n\n`
    obs += `\`\`\`dataview\n`
    obs += `TABLE priority AS "Priority", scoped AS "Slash Command", cli AS "Install CLI"\n`
    obs += `WHERE contains(file.tags, "skilldock")\n`
    obs += `\`\`\`\n\n`
    obs += `## 🛠️ Stack Items\n\n`
    stack.forEach((s) => {
      obs += `### [[${s.name}]]\n`
      obs += `- **Priority**: \`${s.priority}\`\n`
      obs += `- **Command**: \`/${s.scoped}\`\n`
      obs += `- **Official CLI**: \`${s.officialCli || s.cli}\`\n\n`
    })

    const blob = new Blob([obs], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `SkillDock-Obsidian-Stack.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 5. Export as ChatGPT Custom GPT Configuration (OpenAPI Action Schema & Instructions)
  const downloadChatGptCustomGpt = () => {
    let gpt = `# ChatGPT Custom GPT Instructions & Action Manifest\n\n`
    gpt += `## Role & Identity\n`
    gpt += `You are an expert AI software engineer equipped with the SkillDock engineering stack (${stack.length} specialized capabilities).\n\n`
    gpt += `## Selected Capabilities & Slash Command Behaviors:\n\n`
    stack.forEach((s) => {
      gpt += `### /${s.scoped} — ${s.name} [${s.priority}]\n`
      if (s.repo) gpt += `- Ecosystem Repository: https://github.com/${s.repo}\n`
      gpt += `- Behavior: When triggered or working on relevant tasks, enforce ${s.name} guidelines and quality invariants.\n\n`
    })
    gpt += `## OpenAPI Actions Reference:\n`
    gpt += `To configure OpenAPI Actions in the GPT Builder, connect to the SkillDock MCP / OpenAPI gateway:\n`
    gpt += `\`\`\`yaml\n`
    gpt += `openapi: 3.1.0\n`
    gpt += `info:\n`
    gpt += `  title: SkillDock Custom GPT Stack Gateway\n`
    gpt += `  version: 1.0.0\n`
    gpt += `servers:\n`
    gpt += `  - url: https://api.skilldock.dev/v1\n`
    gpt += `paths:\n`
    stack.forEach((s) => {
      const opId = s.id.replace(/[^a-zA-Z0-9]/g, '_')
      gpt += `  /skills/${s.id}:\n`
      gpt += `    get:\n`
      gpt += `      summary: Invoke ${s.name} guidelines\n`
      gpt += `      operationId: get_${opId}\n`
      gpt += `      responses:\n`
      gpt += `        '200':\n`
      gpt += `          description: OK\n`
    })
    gpt += `\`\`\`\n`

    const blob = new Blob([gpt], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chatgpt-custom-gpt-${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 6. Export as Multi-Agent Swarm Manifest (Antigravity Swarm, LangGraph, Mastra)
  const downloadSwarmManifest = () => {
    const manifest = generateSwarmManifest(stack)
    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `skilldock-swarm-manifest.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 6. Copy Ready-to-Run Swarm Brief
  const copySwarmBriefText = () => {
    const brief = generateSwarmBrief(stack)
    navigator.clipboard.writeText(brief)
    setCopiedSwarmBrief(true)
    setTimeout(() => setCopiedSwarmBrief(false), 1600)
  }

  // 7. Copy Batch Installation Script
  const copyInstallScript = () => {
    const commands = stack.map((s) => getCommand(s)).join('\n')
    navigator.clipboard.writeText(commands)
    setCopiedScript(true)
    setTimeout(() => setCopiedScript(false), 1400)
  }

  return (
    <div
      onClick={() => setStackModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${stackModalView === 'swarm' ? 'max-w-3xl' : 'max-w-2xl'} bg-[#09090b] border border-[#27272a] rounded-2xl p-6 space-y-5 relative shadow-2xl flex flex-col max-h-[85vh] transition-all duration-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-zinc-300" />
              <span>SkillDock Stack ({stack.length})</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Curate your custom engineering stack, then export directly to Cursor, Claude Code, Obsidian, or CLI scripts.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {stack.length > 0 && (
              <button
                onClick={copyShareStackUrl}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md bg-blue-500/15 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 transition-colors cursor-pointer"
                title="Copy shareable link with this exact stack"
              >
                {copiedShareUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedShareUrl ? 'Copied Link!' : 'Share Stack Link'}</span>
              </button>
            )}
            <button
              onClick={() => setStackModalOpen(false)}
              className="text-zinc-400 hover:text-white p-1.5 rounded-md bg-[#18181b] border border-[#27272a] hover:border-zinc-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Token Budget & Context Savings Meter */}
        {stack.length > 0 && (
          <div className="p-3.5 rounded-xl bg-[#111114] border border-[#27272a] space-y-2.5 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-zinc-200">Active Token Footprint</span>
                <span className="font-mono text-[11px] text-zinc-400 bg-[#18181b] px-2 py-0.5 rounded border border-[#27272a]">
                  ~{estimatedTokens.toLocaleString()} tokens
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-emerald-400 font-semibold">~{savingsPercent}% savings</span>
                <span className="text-zinc-500 hidden sm:inline">vs monolithic suites</span>
              </div>
            </div>

            {/* Visual Token Meter Bar */}
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-[#18181b] rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(5, (estimatedTokens / monolithicBaseline) * 100))}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>Cherry-Picked: ~{estimatedTokens.toLocaleString()} tokens</span>
                <span>Monolithic suite baseline: ~{monolithicBaseline.toLocaleString()} tokens</span>
              </div>
            </div>

            {/* Priority Distribution */}
            <div className="pt-2 border-t border-[#27272a]/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>P0 Critical: <strong className="text-zinc-200">{p0Count}</strong></span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>P1 High: <strong className="text-zinc-200">{p1Count}</strong></span>
                </span>
                {otherCount > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                    <span>Other: <strong className="text-zinc-200">{otherCount}</strong></span>
                  </span>
                )}
              </div>
              <span className="text-[10px] text-zinc-500 hidden sm:inline">Modular SKILL.md Standard</span>
            </div>
          </div>
        )}

        {/* View Switcher: Cherry-Picked List vs Swarm Visualizer */}
        {stack.length > 0 && (
          <div className="flex items-center gap-1 p-1 bg-[#141417] rounded-lg border border-[#27272a] text-xs font-mono shrink-0">
            <button
              onClick={() => setStackModalView('items')}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
                stackModalView === 'items'
                  ? 'bg-[#27272a] text-white font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Skills List ({stack.length})</span>
            </button>
            <button
              onClick={() => setStackModalView('swarm')}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
                stackModalView === 'swarm'
                  ? 'bg-purple-950/40 text-purple-200 border border-purple-500/40 font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-purple-300'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>Multi-Agent Swarm Topology</span>
              <span className="px-1.5 py-0.5 leading-none rounded-full text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Interactive
              </span>
            </button>
          </div>
        )}

        {/* Main Content Area */}
        {stackModalView === 'swarm' ? (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {stack.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 text-xs">
                Your stack is currently empty. Add skills to your stack to auto-partition them into an autonomous multi-agent sprint team.
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {/* Swarm Architecture Banner */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-[#141417] border border-[#27272a] font-mono text-[11px]">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Network className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-semibold text-white">SkillDock Multi-Agent Sprint Topology</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[10px]">
                      Antigravity Swarm
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px]">
                      LangGraph
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px]">
                      Mastra
                    </span>
                  </div>
                </div>

                {/* Level 1: Coordinator Node */}
                <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#11161d] to-[#0d1117] border border-blue-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <span className="font-bold text-white text-xs font-mono">@coordinator</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        claude-3-7-sonnet
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">Release Gate & Board Host</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    Owns end-to-end milestone delivery, shared message board dispatching, task wave sequencing, and final verification sign-off before shipping.
                  </p>
                </div>

                {/* Connecting Flow Indicator */}
                <div className="flex items-center justify-center gap-2 text-zinc-500 font-mono text-[10px]">
                  <span className="h-px w-12 bg-[#27272a]" />
                  <div className="flex items-center gap-1 text-purple-400 bg-[#141417] px-2 py-0.5 rounded border border-[#27272a]">
                    <ArrowDown className="w-3 h-3" />
                    <span>Parallel Wave Delegation</span>
                  </div>
                  <span className="h-px w-12 bg-[#27272a]" />
                </div>

                {/* Level 2: 3 Specialized Worker Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Worker 1: Architect */}
                  <div className="p-3 rounded-xl bg-[#111114] border border-amber-500/20 flex flex-col justify-between space-y-2.5">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs font-mono flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-amber-400" />
                          <span>@architect</span>
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#18181b] text-amber-300 border border-amber-500/30">
                          claude-3-7
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400">ADRs, architecture, and task wave decomposition</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500">
                        Assigned Skills ({plannerSkills.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {plannerSkills.length === 0 ? (
                          <span className="text-[10px] text-zinc-600 italic">No planning skills</span>
                        ) : (
                          plannerSkills.map((s) => (
                            <span
                              key={s.id}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#18181b] text-zinc-300 border border-[#27272a]"
                            >
                              /{s.scoped}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Worker 2: Builder */}
                  <div className="p-3 rounded-xl bg-[#111114] border border-emerald-500/20 flex flex-col justify-between space-y-2.5">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs font-mono flex items-center gap-1.5">
                          <Hammer className="w-3.5 h-3.5 text-emerald-400" />
                          <span>@builder</span>
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#18181b] text-emerald-300 border border-emerald-500/30">
                          gemini-2.0
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400">Surgical implementation and design token alignment</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500">
                        Assigned Skills ({builderSkills.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {builderSkills.length === 0 ? (
                          <span className="text-[10px] text-zinc-600 italic">No builder skills</span>
                        ) : (
                          builderSkills.map((s) => (
                            <span
                              key={s.id}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#18181b] text-zinc-300 border border-[#27272a]"
                            >
                              /{s.scoped}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Worker 3: Verifier */}
                  <div className="p-3 rounded-xl bg-[#111114] border border-rose-500/20 flex flex-col justify-between space-y-2.5">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs font-mono flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                          <span>@verifier</span>
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#18181b] text-rose-300 border border-rose-500/30">
                          deepseek-r1
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400">Adversarial QA, test gates, and Law 1 parity</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500">
                        Assigned Skills ({verifierSkills.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {verifierSkills.length === 0 ? (
                          <span className="text-[10px] text-zinc-600 italic">No verifier skills</span>
                        ) : (
                          verifierSkills.map((s) => (
                            <span
                              key={s.id}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#18181b] text-zinc-300 border border-[#27272a]"
                            >
                              /{s.scoped}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footprint Note */}
                <div className="p-2.5 rounded-lg bg-[#0e0e11] border border-[#27272a] text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Partitioned Context: ~{estimatedTokens.toLocaleString()} tokens/agent vs ~{monolithicBaseline.toLocaleString()} monolithic baseline.</span>
                  </div>
                  <span className="text-emerald-400 font-bold hidden sm:inline">~{savingsPercent}% token savings</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Stack Items List */
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {stack.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 text-xs">
                Your stack is currently empty. Click the bookmark icon or cherry-pick skills from any suite to add them here.
              </div>
            ) : (
              stack.map((item) => {
                const activeCmd = getCommand(item)
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-lg bg-[#111114] border border-[#27272a] text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#18181b] text-zinc-300 border border-[#27272a]">
                        {item.priority}
                      </span>
                      <span className="font-semibold text-zinc-100 truncate">{item.name}</span>
                      <span className="text-xs font-mono text-zinc-400 truncate">/{item.scoped}</span>
                      {item.repo && (
                        <span className="hidden md:inline text-[10px] font-mono text-zinc-500 bg-[#18181b] px-1.5 py-0.5 rounded border border-[#27272a]">
                          {item.repo}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline font-mono text-[11px] text-zinc-400 bg-[#18181b] px-2 py-0.5 rounded border border-[#27272a] max-w-[240px] truncate select-all">
                        {activeCmd}
                      </span>
                      <button
                        onClick={() => removeFromStack(item.id)}
                        className="p-1 rounded text-zinc-500 hover:text-rose-400 hover:bg-[#18181b] transition-colors cursor-pointer"
                        title="Remove from stack"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}

        {/* Multi-Assistant Exporters Bar */}
        {stack.length > 0 && (
          <div className="pt-3.5 border-t border-[#27272a] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-zinc-400 font-mono text-[11px]">Export Config Bundles:</span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={downloadCursorRules}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#141417] hover:bg-[#1a1a20] text-zinc-200 border border-[#27272a] hover:border-zinc-500 cursor-pointer transition-colors text-xs font-mono"
                  title="Export .cursorrules"
                >
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>.cursorrules</span>
                </button>

                <button
                  onClick={downloadMarkdown}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#141417] hover:bg-[#1a1a20] text-zinc-200 border border-[#27272a] hover:border-zinc-500 cursor-pointer transition-colors text-xs font-mono"
                  title="Export Markdown Stack Table"
                >
                  <Download className="w-3 h-3 text-emerald-400" />
                  <span>Stack.md</span>
                </button>

                <button
                  onClick={downloadClaudeConfig}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#141417] hover:bg-[#1a1a20] text-zinc-200 border border-[#27272a] hover:border-zinc-500 cursor-pointer transition-colors text-xs font-mono"
                  title="Export claude.json"
                >
                  <Terminal className="w-3 h-3 text-amber-400" />
                  <span>claude.json</span>
                </button>

                <button
                  onClick={downloadChatGptCustomGpt}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#111914] hover:bg-[#16241c] text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/60 cursor-pointer transition-colors text-xs font-mono"
                  title="Export ChatGPT Custom GPT Instructions & OpenAPI Action Manifest"
                >
                  <Bot className="w-3 h-3 text-emerald-400" />
                  <span>ChatGPT GPT</span>
                </button>

                <button
                  onClick={downloadObsidianNote}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#141417] hover:bg-[#1a1a20] text-zinc-200 border border-[#27272a] hover:border-zinc-500 cursor-pointer transition-colors text-xs font-mono"
                  title="Export Obsidian Dataview Note"
                >
                  <Diamond className="w-3 h-3 text-violet-400" />
                  <span>Obsidian Note</span>
                </button>

                <button
                  onClick={downloadSwarmManifest}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#161324] hover:bg-[#201c34] text-purple-200 border border-purple-500/30 hover:border-purple-500/60 cursor-pointer transition-colors text-xs font-mono"
                  title="Export Multi-Agent Swarm Manifest (Antigravity Swarm, LangGraph, Mastra)"
                >
                  <Users className="w-3 h-3 text-purple-400" />
                  <span>Swarm Manifest</span>
                </button>
              </div>
            </div>

            {/* Bottom Actions: CLI Format Toggle & Script Copy */}
            <div className="pt-2 border-t border-[#27272a]/60 flex flex-wrap items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={clearStack}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-2 py-1 rounded hover:bg-rose-950/20 transition-colors cursor-pointer"
                >
                  Clear All ({stack.length})
                </button>

                {/* CLI Command Format Toggle */}
                <div className="inline-flex rounded-md bg-[#141417] border border-[#27272a] p-0.5 text-[11px] font-mono">
                  <button
                    onClick={() => setCliFormat('npx')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      cliFormat === 'npx' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                    title="Official npx skills add open standard"
                  >
                    npx skills
                  </button>
                  <button
                    onClick={() => setCliFormat('python')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      cliFormat === 'python' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                    title="Local Python install script"
                  >
                    python CLI
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={copySwarmBriefText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#161324] hover:bg-[#201c34] text-purple-200 border border-purple-500/30 hover:border-purple-500/60 cursor-pointer transition-colors text-xs font-semibold"
                  title="Copy ready-to-run Multi-Agent Swarm Brief to clipboard"
                >
                  {copiedSwarmBrief ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bot className="w-3.5 h-3.5 text-purple-400" />}
                  <span>{copiedSwarmBrief ? 'Copied Swarm Brief!' : 'Copy Swarm Brief'}</span>
                </button>

                <button
                  onClick={copyInstallScript}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-zinc-200 border border-[#27272a] hover:border-zinc-500 cursor-pointer transition-colors text-xs font-medium"
                  title={`Copy batch script (${cliFormat === 'npx' ? 'npx skills add' : 'python'})`}
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Batch CLI ({cliFormat})</span>
                </button>

                <button
                  onClick={downloadMarkdown}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white hover:bg-zinc-200 text-zinc-900 font-bold cursor-pointer transition-colors text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Markdown</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
