import React, { useState, useMemo, useEffect } from 'react'
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
  Wind,
  Code2,
  FileCode,
  Search,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Radio,
} from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import {
  generateSwarmManifest,
  generateSwarmBrief,
  partitionStackIntoSwarm,
  getSwarmWaveStages,
  generateSwarmWavePlan,
} from '@/utils/swarmOrchestrator'
import { lintSkillStack } from '@/utils/stackLinter'
import { CopyButton } from '@/components/common/CopyButton'
import { PromptMinifierModal } from '@/components/modals/PromptMinifierModal'
import { DockerSandboxModal } from '@/components/modals/DockerSandboxModal'

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
  const [copiedMermaid, setCopiedMermaid] = useState(false)
  const [copiedSwarmWavePlan, setCopiedSwarmWavePlan] = useState(false)
  const [cliFormat, setCliFormat] = useState<'npx' | 'python'>('npx')
  const [searchFilter, setSearchFilter] = useState('')
  const [exportFilter, setExportFilter] = useState<'all' | 'ide' | 'agent' | 'docs'>('all')
  const [showMinifier, setShowMinifier] = useState(false)
  const [showDockerModal, setShowDockerModal] = useState(false)
  const [swarmSubView, setSwarmSubView] = useState<'overview' | 'simulator'>('overview')
  const [activeStageIndex, setActiveStageIndex] = useState(0)
  const [isSimPlaying, setIsSimPlaying] = useState(false)

  useEffect(() => {
    if (!isStackModalOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setStackModalOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isStackModalOpen, setStackModalOpen])

  const copyShareStackUrl = () => {
    const ids = stack.map((s) => s.id).join(',')
    const url = `${window.location.origin}${window.location.pathname}?stack=${encodeURIComponent(ids)}`
    navigator.clipboard.writeText(url)
    setCopiedShareUrl(true)
    setTimeout(() => setCopiedShareUrl(false), 1600)
  }

  // Token budget estimation & dollar economics
  const estimatedTokens = stack.length * 800
  // Modular skill cherry-picking saves massive context vs monolithic framework suites
  const monolithicBaseline = stack.length === 0 ? 26400 : Math.max(26400, Math.round(estimatedTokens * 2.8))
  const savingsPercent =
    stack.length === 0
      ? 0
      : Math.max(1, Math.round(((monolithicBaseline - estimatedTokens) / monolithicBaseline) * 100))

  // Dollars per 1,000 developer turns across frontier models
  const stackCostClaude = (((estimatedTokens * 1000) / 1000000) * 3.0).toFixed(2)
  const baselineCostClaude = (((monolithicBaseline * 1000) / 1000000) * 3.0).toFixed(2)
  const dollarSavingsClaude = Math.max(0.01, Number(baselineCostClaude) - Number(stackCostClaude)).toFixed(2)

  const stackCostGemini = (((estimatedTokens * 1000) / 1000000) * 0.10).toFixed(3)
  const baselineCostGemini = (((monolithicBaseline * 1000) / 1000000) * 0.10).toFixed(2)
  const dollarSavingsGemini = Math.max(0.01, Number(baselineCostGemini) - Number(stackCostGemini)).toFixed(2)

  const stackCostDeepSeek = (((estimatedTokens * 1000) / 1000000) * 0.55).toFixed(2)
  const baselineCostDeepSeek = (((monolithicBaseline * 1000) / 1000000) * 0.55).toFixed(2)
  const dollarSavingsDeepSeek = Math.max(0.01, Number(baselineCostDeepSeek) - Number(stackCostDeepSeek)).toFixed(2)

  // Real, accurate priority distribution
  const p0Count = stack.filter((s) => s.priority === 'P0').length
  const p1Count = stack.filter((s) => s.priority === 'P1').length
  const otherCount = stack.length - p0Count - p1Count

  const { plannerSkills, builderSkills, verifierSkills } = partitionStackIntoSwarm(stack)
  const lintFindings = lintSkillStack(stack.map((s) => s.id))
  const waveStages = useMemo(() => getSwarmWaveStages(stack), [stack])

  // Simulation timer loop
  useEffect(() => {
    if (!isSimPlaying) return
    const timer = setInterval(() => {
      setActiveStageIndex((prev) => {
        if (prev >= waveStages.length - 1) {
          setIsSimPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 1800)
    return () => clearInterval(timer)
  }, [isSimPlaying, waveStages.length])

  const handleSimPlayPause = () => {
    if (activeStageIndex >= waveStages.length - 1 && !isSimPlaying) {
      setActiveStageIndex(0)
      setIsSimPlaying(true)
    } else {
      setIsSimPlaying((p) => !p)
    }
  }

  const handleSimStepNext = () => {
    setIsSimPlaying(false)
    setActiveStageIndex((p) => Math.min(waveStages.length - 1, p + 1))
  }

  const handleSimStepPrev = () => {
    setIsSimPlaying(false)
    setActiveStageIndex((p) => Math.max(0, p - 1))
  }

  const handleSimReset = () => {
    setIsSimPlaying(false)
    setActiveStageIndex(0)
  }

  // Filter skills in stack dynamically
  const filteredStack = useMemo(() => {
    if (!searchFilter.trim()) return stack
    const q = searchFilter.toLowerCase().trim()
    return stack.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.scoped.toLowerCase().includes(q) ||
        (s.repo && s.repo.toLowerCase().includes(q))
    )
  }, [stack, searchFilter])

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
    a.download = `SkillDock-Custom-Stack-${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 2. Export as Legacy Cursor Rules (.cursorrules)
  const downloadCursorRules = () => {
    let rules = `# SkillDock Custom Agent Instructions (.cursorrules)\n`
    rules += `# Generated on: ${new Date().toISOString().split('T')[0]}\n\n`
    rules += `You are an expert AI software engineer equipped with the following curated specialized capabilities:\n\n`
    stack.forEach((s) => {
      rules += `## Skill: ${s.name} (Priority: ${s.priority})\n`
      rules += `- Slash Command: /${s.scoped}\n`
      if (s.repo) rules += `- Upstream Repo: https://github.com/${s.repo}\n`
      rules += `- Activation Command: ${s.officialCli || s.cli}\n\n`
    })

    const blob = new Blob([rules], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `.cursorrules`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 2b. Export as Modern Cursor 0.45+ Modular Rule (.cursor/rules/skilldock.mdc)
  const downloadCursor045Rules = () => {
    let mdc = `---
description: "SkillDock Curated Agent Capabilities & Repository Laws"
globs: ["*"]
alwaysApply: true
priority: 100
---

# SkillDock Agent Stack Specifications

You are an expert autonomous software engineer operating under the SkillDock Agentic framework.
The following ${stack.length} capabilities are actively installed and required for this workspace:

## Active Stack Registry
`
    stack.forEach((s) => {
      mdc += `\n### \`/${s.scoped}\` — ${s.name} [${s.priority}]\n`
      if (s.repo) mdc += `- Ecosystem: https://github.com/${s.repo}\n`
      mdc += `- Installation: \`${s.officialCli || s.cli}\`\n`
    })

    const blob = new Blob([mdc], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `skilldock.mdc`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 2c. Export as Windsurf Rules (.windsurfrules)
  const downloadWindsurfRules = () => {
    let wr = `# Windsurf Cascade AI Agent Guidelines (.windsurfrules)\n`
    wr += `# Generated by SkillDock v3.0 on ${new Date().toISOString().split('T')[0]}\n\n`
    wr += `## Active Skill Protocols (${stack.length} Installed)\n\n`
    stack.forEach((s) => {
      wr += `- **${s.name}** [${s.priority}]: Triggered by \`/${s.scoped}\`. Follow official guidelines from ${s.repo ? `https://github.com/${s.repo}` : 'local workspace'}.\n`
    })

    const blob = new Blob([wr], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `.windsurfrules`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 2d. Export as Cline / Roo Code Rules (.clinerules)
  const downloadClineRules = () => {
    let cr = `# Cline & Roo Code Autonomous Agent System Prompt (.clinerules)\n\n`
    cr += `You have access to the following curated skill capabilities in this repository:\n\n`
    stack.forEach((s) => {
      cr += `### ${s.name} (\`/${s.scoped}\`)\n`
      cr += `- Priority: ${s.priority}\n`
      cr += `- Command: \`${s.officialCli || s.cli}\`\n\n`
    })

    const blob = new Blob([cr], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `.clinerules`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 2e. Export as GitHub Copilot Instructions (.github/copilot-instructions.md)
  const downloadCopilotInstructions = () => {
    let ci = `# GitHub Copilot Workspace Instructions\n\n`
    ci += `The development team has configured the following ${stack.length} skills in this project:\n\n`
    stack.forEach((s) => {
      ci += `- \`/${s.scoped}\`: ${s.name} (${s.priority})\n`
    })

    const blob = new Blob([ci], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `copilot-instructions.md`
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

  // 5. Export as ChatGPT Custom GPT Configuration
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

    const blob = new Blob([gpt], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chatgpt-custom-gpt-${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 5c. Export as Antigravity Workspace Packager
  const downloadAntigravityBundle = () => {
    const manifest = {
      $schema: 'https://schema.antigravity.google/v1/workspace-skills.json',
      version: '1.0.0',
      generator: 'SkillDock v3.0 (https://nownitya.github.io/Ai-Models-List/)',
      generatedAt: new Date().toISOString(),
      workspaceConfig: {
        skillsDir: '.agents/skills',
        rulesDir: '.agents/rules',
        lawsFile: '.agents/rules/repo-laws.md',
      },
      skills: stack.map((s) => ({
        id: s.id,
        name: s.name,
        scopedCommand: `/${s.scoped}`,
        priority: s.priority,
        upstreamRepo: s.repo ? `https://github.com/${s.repo}` : null,
        installCli: s.officialCli || s.cli,
        skillPath: `.agents/skills/${s.id}/SKILL.md`,
      })),
      repoLaws: [
        'Law 1: Parity - Always verify parity before claiming completion.',
        'Law 2: Standard Structure - All skills must follow standard SKILL.md format.',
        'Law 3: Evidence Before Assertions - Run tests and verification commands before declaring success.',
        'Law 4: Creator Independence - Preserve unique methodology across distinct upstream frameworks.',
      ],
    }

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `antigravity-skills-lock.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 6. Export as Multi-Agent Swarm Manifest
  const downloadSwarmManifest = () => {
    const manifest = generateSwarmManifest(stack)
    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `antigravity-swarm-manifest.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 6b. Copy Multi-Agent Swarm Brief to Clipboard
  const copySwarmBriefText = () => {
    const brief = generateSwarmBrief(stack)
    navigator.clipboard.writeText(brief)
    setCopiedSwarmBrief(true)
    setTimeout(() => setCopiedSwarmBrief(false), 1600)
  }

  // 6c. Copy Mermaid Diagram Code to Clipboard
  const copySwarmMermaidDiagram = () => {
    let mermaid = '```mermaid\n'
    mermaid += 'flowchart TD\n'
    mermaid += '  subgraph Antigravity_Swarm["Antigravity Multi-Agent Swarm Topology"]\n'
    mermaid += '    C["@coordinator<br/>claude-3-7-sonnet"]\n'
    mermaid += '    C -->|Decomposes Waves| A["@architect<br/>claude-3-7-sonnet"]\n'
    mermaid += '    C -->|Executes Slices| B["@builder<br/>gemini-2.0-flash"]\n'
    mermaid += '    C -->|Verifies Parity| V["@verifier<br/>deepseek-r1"]\n'
    mermaid += '  end\n'
    mermaid += '```\n'
    navigator.clipboard.writeText(mermaid)
    setCopiedMermaid(true)
    setTimeout(() => setCopiedMermaid(false), 1600)
  }

  // 6d. Copy Multi-Agent Swarm Wave Plan to Clipboard
  const copySwarmWavePlanText = () => {
    const plan = generateSwarmWavePlan(stack)
    navigator.clipboard.writeText(plan)
    setCopiedSwarmWavePlan(true)
    setTimeout(() => setCopiedSwarmWavePlan(false), 1600)
  }

  // 6e. Download SWARM_WAVE.md Plan
  const downloadSwarmWavePlan = () => {
    const plan = generateSwarmWavePlan(stack)
    const blob = new Blob([plan], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `SWARM_WAVE.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 7. Copy Batch Installation Script
  const copyInstallScript = () => {
    const commands = stack.map((s) => getCommand(s)).join('\n')
    navigator.clipboard.writeText(commands)
    setCopiedScript(true)
    setTimeout(() => setCopiedScript(false), 1600)
  }

  return (
    <div
      onClick={() => setStackModalOpen(false)}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl bg-[#0c0c0e] border border-[#27272a] rounded-2xl shadow-2xl flex flex-col h-[90vh] max-h-[860px] overflow-hidden transition-all duration-200"
      >
        {/* Header Bar */}
        <div className="px-6 py-3.5 border-b border-[#27272a] bg-[#111114] flex items-center justify-between gap-4 shrink-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-zinc-300 shrink-0" />
              <h2 className="text-lg font-bold text-white truncate">
                SkillDock Stack ({stack.length})
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 truncate">
              Curate, inspect, and export your production-ready AI engineering stack.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {stack.length > 0 && (
              <button
                type="button"
                onClick={copyShareStackUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 transition-colors cursor-pointer"
                title="Copy shareable link with this exact stack"
              >
                {copiedShareUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copiedShareUrl ? 'Copied Link!' : 'Share Stack'}</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setStackModalOpen(false)}
              className="text-zinc-400 hover:text-white p-1.5 rounded-md bg-[#18181b] border border-[#27272a] hover:border-zinc-500 cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Telemetry Ribbon & Diagnostics */}
        {stack.length > 0 && (
          <div className="px-6 py-2.5 bg-[#141417]/90 border-b border-[#27272a] space-y-2 shrink-0">
            {/* Token Footprint Bar */}
            <div className="flex flex-col gap-1 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Active Token Footprint:</span>
                  <strong className="text-white">~{estimatedTokens.toLocaleString()} tokens</strong>
                </span>
                <span className="text-emerald-400 font-semibold">
                  ~{savingsPercent}% savings vs monolithic suites
                </span>
              </div>
              <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(10, 100 - savingsPercent))}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-500">
                <span>Cherry-Picked: ~{estimatedTokens.toLocaleString()} tokens</span>
                <span>Monolithic suite baseline: ~{monolithicBaseline.toLocaleString()} tokens</span>
              </div>
            </div>

            {/* Priority Distribution */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono pt-1.5 border-t border-[#27272a]/60">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold">
                  {stack.length} Skills
                </span>
                <span className="flex items-center gap-1.5 text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>P0 Critical: <strong>{p0Count}</strong></span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>P1 High: <strong>{p1Count}</strong></span>
                </span>
                {otherCount > 0 && (
                  <span className="flex items-center gap-1.5 text-zinc-400 bg-zinc-800/60 border border-zinc-700/60 px-2 py-0.5 rounded">
                    <span>Other: {otherCount}</span>
                  </span>
                )}
              </div>
              <span className="text-[11px] text-zinc-500">Modular SKILL.md Standard</span>
            </div>

            {/* Model Economics & Live Dollar Savings Ribbon */}
            <div className="pt-1.5 border-t border-[#27272a]/60 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">💰 Real Dollar Economics</span>
                  <span className="text-zinc-500 hidden sm:inline">(Estimated per 1,000 Turns)</span>
                </span>
                <span className="text-emerald-400 font-semibold font-mono text-[10px]">
                  Claude 3.7 Saves ~${dollarSavingsClaude}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
                <div className="p-1.5 rounded-lg bg-[#141417] border border-[#27272a]">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>Claude 3.7 Sonnet</span>
                    <span className="text-emerald-400 font-bold">-${dollarSavingsClaude}</span>
                  </div>
                  <div className="text-xs font-semibold text-zinc-200 mt-0.5">
                    ${stackCostClaude} <span className="text-[10px] font-normal text-zinc-500">/1k (vs ${baselineCostClaude})</span>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-[#141417] border border-[#27272a]">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>Gemini 2.0 Flash</span>
                    <span className="text-emerald-400 font-bold">-${dollarSavingsGemini}</span>
                  </div>
                  <div className="text-xs font-semibold text-zinc-200 mt-0.5">
                    ${stackCostGemini} <span className="text-[10px] font-normal text-zinc-500">/1k (vs ${baselineCostGemini})</span>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-[#141417] border border-[#27272a]">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>DeepSeek R1</span>
                    <span className="text-emerald-400 font-bold">-${dollarSavingsDeepSeek}</span>
                  </div>
                  <div className="text-xs font-semibold text-zinc-200 mt-0.5">
                    ${stackCostDeepSeek} <span className="text-[10px] font-normal text-zinc-500">/1k (vs ${baselineCostDeepSeek})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Intelligent Compiler Linter Findings */}
            {lintFindings.length > 0 && (
              <div className="pt-1.5 border-t border-[#27272a]/60 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold">🧠 Compiler Diagnostics</span>
                    <span className="text-zinc-500 hidden sm:inline">({lintFindings.length} Insights)</span>
                  </span>
                  <span className="text-zinc-500 text-[10px]">Real-Time Quality Linter</span>
                </div>
                <div className="space-y-1">
                  {lintFindings.map((f, idx) => (
                    <div
                      key={idx}
                      className={`p-1.5 rounded-lg border text-left text-xs ${
                        f.type === 'conflict'
                          ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                          : f.type === 'synergy'
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                          : 'bg-sky-950/20 border-sky-500/30 text-sky-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold font-mono text-[11px]">
                        <span>{f.type === 'conflict' ? '⚠️' : f.type === 'synergy' ? '✨' : '🛡️'}</span>
                        <span>{f.title}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5 font-sans leading-relaxed">{f.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* View Switcher & In-Stack Search Bar */}
        {stack.length > 0 && (
          <div className="px-6 py-2.5 border-b border-[#27272a] bg-[#0e0e11] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#141417] rounded-lg border border-[#27272a] text-xs font-mono w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setStackModalView('items')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
                  stackModalView === 'items'
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Skills List ({stack.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setStackModalView('swarm')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
                  stackModalView === 'swarm'
                    ? 'bg-purple-950/40 text-purple-200 border border-purple-500/40 font-semibold'
                    : 'text-zinc-400 hover:text-purple-300'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-purple-400" />
                <span>Multi-Agent Swarm Topology</span>
                <span className="hidden sm:inline-block ml-1 px-1.5 py-0.2 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Interactive
                </span>
              </button>
            </div>

            {/* In-Stack Search Filter */}
            {stackModalView === 'items' && (
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter stack skills..."
                  className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-[#141417] border border-[#27272a] text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono transition-colors"
                />
                {searchFilter && (
                  <button
                    type="button"
                    onClick={() => setSearchFilter('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {stack.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Layers className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="text-sm text-zinc-400 font-medium">Your stack is currently empty.</p>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Bookmark skills or click "+ Add Suite" from any framework card to assemble your agent tooling bundle.
              </p>
            </div>
          ) : stackModalView === 'swarm' ? (
            /* Swarm View */
            <div className="space-y-4 text-xs">
              {/* Swarm Sub-Navigation Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-lg bg-[#141417] border border-[#27272a]">
                <div className="inline-flex rounded-lg bg-zinc-900 border border-[#27272a] p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setSwarmSubView('overview')}
                    className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                      swarmSubView === 'overview'
                        ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Topology Overview
                  </button>
                  <button
                    type="button"
                    onClick={() => setSwarmSubView('simulator')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded transition-colors cursor-pointer ${
                      swarmSubView === 'simulator'
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                    <span>Wave Simulator</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copySwarmWavePlanText}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-[11px] font-mono cursor-pointer transition-colors"
                    title="Copy executable SWARM_WAVE.md plan"
                  >
                    {copiedSwarmWavePlan ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSwarmWavePlan ? 'Copied Wave Plan!' : 'Copy Wave Plan'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadSwarmWavePlan}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 text-[11px] font-mono cursor-pointer transition-colors"
                    title="Download SWARM_WAVE.md file"
                  >
                    <Download className="w-3.5 h-3.5 text-purple-400" />
                    <span>SWARM_WAVE.md</span>
                  </button>
                  <button
                    type="button"
                    onClick={copySwarmMermaidDiagram}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 border border-zinc-700 text-[11px] font-mono cursor-pointer transition-colors"
                    title="Copy Mermaid flowchart syntax"
                  >
                    {copiedMermaid ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Network className="w-3.5 h-3.5" />}
                    <span>{copiedMermaid ? 'Copied Mermaid Diagram!' : 'Copy Mermaid Diagram'}</span>
                  </button>
                </div>
              </div>

              {swarmSubView === 'overview' ? (
                <>
                  {/* Coordinator */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#11161d] to-[#0d1117] border border-blue-500/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono font-bold text-white">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <span>@coordinator</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          claude-3-7-sonnet
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">Release Gate & Board Host</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                      Owns milestone delivery, task wave sequencing, and final verification sign-off before shipping.
                    </p>
                  </div>

                  {/* Worker Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[#141417] border border-amber-500/20 flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between font-mono">
                          <span className="font-bold text-white text-xs flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5 text-amber-400" />
                            <span>@architect</span>
                          </span>
                          <span className="text-[10px] text-amber-300">claude-3-7</span>
                        </div>
                        <p className="text-[10px] text-zinc-400">ADRs, architecture, and task wave decomposition</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500">Skills ({plannerSkills.length}):</span>
                        <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                          {plannerSkills.slice(0, 8).map((s) => (
                            <span key={s.id} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-zinc-800 text-zinc-300">
                              /{s.scoped}
                            </span>
                          ))}
                          {plannerSkills.length > 8 && <span className="text-[9px] text-zinc-500">+{plannerSkills.length - 8}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#141417] border border-emerald-500/20 flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between font-mono">
                          <span className="font-bold text-white text-xs flex items-center gap-1.5">
                            <Hammer className="w-3.5 h-3.5 text-emerald-400" />
                            <span>@builder</span>
                          </span>
                          <span className="text-[10px] text-emerald-300">gemini-2.0</span>
                        </div>
                        <p className="text-[10px] text-zinc-400">Atomic commits, test execution, and code synthesis</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500">Skills ({builderSkills.length}):</span>
                        <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                          {builderSkills.slice(0, 8).map((s) => (
                            <span key={s.id} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-zinc-800 text-zinc-300">
                              /{s.scoped}
                            </span>
                          ))}
                          {builderSkills.length > 8 && <span className="text-[9px] text-zinc-500">+{builderSkills.length - 8}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#141417] border border-rose-500/20 flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between font-mono">
                          <span className="font-bold text-white text-xs flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                            <span>@verifier</span>
                          </span>
                          <span className="text-[10px] text-rose-300">deepseek-r1</span>
                        </div>
                        <p className="text-[10px] text-zinc-400">Adversarial QA, test gates, and Law 1 parity</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500">Skills ({verifierSkills.length}):</span>
                        <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                          {verifierSkills.slice(0, 8).map((s) => (
                            <span key={s.id} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-zinc-800 text-zinc-300">
                              /{s.scoped}
                            </span>
                          ))}
                          {verifierSkills.length > 8 && <span className="text-[9px] text-zinc-500">+{verifierSkills.length - 8}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Interactive Swarm Wave Simulator */
                <div className="space-y-4">
                  {/* Playback Control Strip */}
                  <div className="p-3.5 rounded-xl bg-[#111115] border border-[#27272a] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSimPlayPause}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer shadow-sm ${
                          isSimPlaying
                            ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400'
                            : 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                        }`}
                      >
                        {isSimPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isSimPlaying ? 'Pause Simulation' : 'Play Simulation'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSimStepPrev}
                        disabled={activeStageIndex === 0}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed border border-zinc-700/60 transition-colors"
                        title="Step backward"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleSimStepNext}
                        disabled={activeStageIndex >= waveStages.length - 1}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed border border-zinc-700/60 transition-colors"
                        title="Step forward"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleSimReset}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/60 transition-colors"
                        title="Reset simulation to beginning"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                      <div className="text-zinc-400">
                        <span className="text-zinc-500">Stage:</span>{' '}
                        <span className="font-bold text-white">
                          {activeStageIndex + 1}/{waveStages.length}
                        </span>{' '}
                        <span className="text-cyan-300 font-semibold">({waveStages[activeStageIndex]?.title})</span>
                      </div>
                      <div className="w-24 sm:w-32 h-2 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
                          style={{ width: `${((activeStageIndex + 1) / waveStages.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5-Stage Stepper Ribbon */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {waveStages.map((stage, idx) => {
                      const isPast = idx < activeStageIndex
                      const isCurrent = idx === activeStageIndex

                      let cardBorder = 'border-[#27272a] bg-[#111114]'
                      if (isCurrent) cardBorder = 'border-cyan-500/70 bg-cyan-950/20 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                      else if (isPast) cardBorder = 'border-emerald-500/40 bg-emerald-950/10'

                      return (
                        <div
                          key={stage.id}
                          onClick={() => {
                            setIsSimPlaying(false)
                            setActiveStageIndex(idx)
                          }}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer text-left space-y-1.5 ${cardBorder}`}
                        >
                          <div className="flex items-center justify-between font-mono text-[10px]">
                            <span className="font-bold text-zinc-400">Wave 0{stage.phaseNumber}</span>
                            {isPast ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : isCurrent ? (
                              <Radio className="w-3 h-3 text-cyan-400 animate-pulse shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-zinc-700 shrink-0" />
                            )}
                          </div>

                          <div className="font-bold text-white text-xs truncate" title={stage.title}>
                            {stage.title}
                          </div>

                          <div className="flex items-center justify-between font-mono text-[10px]">
                            <span className="text-zinc-300 font-bold">{stage.owner}</span>
                            <span className="text-zinc-500">{stage.model.split('-')[0]}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Active Stage Deep Dive & Live Telemetry Box */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Left: Mission & Deliverables Checklist */}
                    <div className="p-4 rounded-xl bg-[#111115] border border-[#27272a] space-y-3">
                      <div className="flex items-center justify-between border-b border-[#27272a] pb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            Wave 0{waveStages[activeStageIndex]?.phaseNumber}
                          </span>
                          <span className="font-bold text-white text-sm">
                            {waveStages[activeStageIndex]?.title}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {waveStages[activeStageIndex]?.owner} • {waveStages[activeStageIndex]?.model}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {waveStages[activeStageIndex]?.mission}
                      </p>

                      <div className="space-y-1.5">
                        <div className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                          Wave Deliverables:
                        </div>
                        {waveStages[activeStageIndex]?.deliverables.map((del, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>

                      {waveStages[activeStageIndex]?.skills && waveStages[activeStageIndex].skills.length > 0 && (
                        <div className="pt-2 border-t border-[#27272a]/60 space-y-1">
                          <div className="text-[10px] font-mono text-zinc-500">
                            Bound Skills ({waveStages[activeStageIndex].skills.length}):
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {waveStages[activeStageIndex].skills.map((s) => (
                              <span key={s.id} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                                /{s.scoped}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right: Live Telemetry Dispatch Terminal */}
                    <div className="p-4 rounded-xl bg-[#09090c] border border-[#27272a] flex flex-col justify-between font-mono text-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 text-[10px] text-zinc-500">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="ml-2 text-zinc-400">wave-telemetry.log</span>
                        </div>
                        <span className="text-emerald-400">● LIVE RUNTIME</span>
                      </div>

                      <div className="flex-1 space-y-2 text-[11px] leading-relaxed text-zinc-300 overflow-y-auto max-h-48">
                        {waveStages.slice(0, activeStageIndex + 1).flatMap((stg) =>
                          stg.telemetryLogs.map((log, lidx) => (
                            <div key={`${stg.id}-${lidx}`} className="flex items-start gap-2">
                              <span className="text-zinc-600 shrink-0">➜</span>
                              <span className="text-zinc-300">{log}</span>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500">
                        <span>Handoff Status: {activeStageIndex === waveStages.length - 1 ? 'Sprint Complete' : 'Handing off to next wave'}</span>
                        <span className="text-cyan-400 font-bold">100% Deterministic</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Skills Table List (Spacious & Legible) */
            <div className="space-y-2">
              {filteredStack.length === 0 ? (
                <div className="text-center py-10 text-xs text-zinc-500 font-mono">
                  No skills matched your filter "{searchFilter}".
                </div>
              ) : (
                filteredStack.map((item) => {
                  const activeCmd = getCommand(item)
                  let priorityColor = 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  if (item.priority === 'P0') priorityColor = 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  if (item.priority === 'P1') priorityColor = 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  if (item.priority === 'P2') priorityColor = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'

                  return (
                    <div
                      key={item.id}
                      className="group flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-xl bg-[#141417] hover:bg-[#18181c] border border-[#27272a] hover:border-zinc-500/60 transition-all text-xs"
                    >
                      {/* Left: Priority + Name + Slash Command + Repo */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border shrink-0 ${priorityColor}`}>
                          {item.priority}
                        </span>

                        <span className="font-semibold text-zinc-100 truncate max-w-[160px] sm:max-w-[200px]" title={item.name}>
                          {item.name}
                        </span>

                        <CopyButton
                          variant="pill"
                          text={`/${item.scoped}`}
                          title={`Copy slash command /${item.scoped}`}
                          className="shrink-0"
                        />

                        {item.repo && (
                          <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-700/50 truncate max-w-[180px]">
                            {item.repo}
                          </span>
                        )}
                      </div>

                      {/* Right: Command Bar + Delete */}
                      <div className="flex items-center gap-2 shrink-0">
                        <CopyButton
                          variant="codebar"
                          text={activeCmd}
                          displayPrefix={cliFormat === 'npx' ? 'npx' : 'py'}
                          className="w-48 sm:w-64 max-w-xs"
                        />

                        <button
                          type="button"
                          onClick={() => removeFromStack(item.id)}
                          className="p-1.5 rounded-md text-zinc-500 hover:text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-500/30 transition-colors cursor-pointer shrink-0"
                          title={`Remove ${item.name} from stack`}
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
        </div>

        {/* Export Config Hub - Cleanly grouped into logical sections */}
        {stack.length > 0 && (
          <div className="px-6 py-2.5 border-t border-[#27272a] bg-[#111114] space-y-2 shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono text-zinc-400 font-semibold uppercase tracking-wider">
                  Export Config Hub:
                </span>
                <div className="inline-flex rounded-lg bg-zinc-900 border border-[#27272a] p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setExportFilter('all')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      exportFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    All Formats
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportFilter('ide')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      exportFilter === 'ide' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    IDE Rules
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportFilter('agent')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      exportFilter === 'agent' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Agent Bundles
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportFilter('docs')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      exportFilter === 'docs' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Docs & Knowledge
                  </button>
                </div>
              </div>

              {/* CLI Format Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-500">CLI Format:</span>
                <div className="inline-flex rounded-md bg-[#18181b] border border-[#27272a] p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setCliFormat('npx')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      cliFormat === 'npx' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    npx skills
                  </button>
                  <button
                    type="button"
                    onClick={() => setCliFormat('python')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      cliFormat === 'python' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    python CLI
                  </button>
                </div>
              </div>
            </div>

            {/* Organized Export Buttons: All Visible & Category-Coded */}
            <div className="flex flex-wrap items-center gap-2">
              {/* IDE Rules */}
              {(exportFilter === 'all' || exportFilter === 'ide') && (
                <>
                  <button
                    type="button"
                    onClick={downloadCursorRules}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>.cursorrules</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadCursor045Rules}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/60 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Cursor .mdc</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadWindsurfRules}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-blue-300 border border-blue-500/30 hover:border-blue-500/60 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <Wind className="w-3.5 h-3.5 text-blue-400" />
                    <span>.windsurfrules</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadClineRules}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-purple-300 border border-purple-500/30 hover:border-purple-500/60 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>.clinerules</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadCopilotInstructions}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-sky-300 border border-sky-500/30 hover:border-sky-500/60 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <FileCode className="w-3.5 h-3.5 text-sky-400" />
                    <span>copilot-instructions</span>
                  </button>
                </>
              )}

              {/* Agent & Swarm Bundles */}
              {(exportFilter === 'all' || exportFilter === 'agent') && (
                <>
                  <button
                    type="button"
                    onClick={downloadAntigravityBundle}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-teal-300 border border-teal-500/30 hover:border-teal-500/60 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <Cpu className="w-3.5 h-3.5 text-teal-400" />
                    <span>Antigravity Bundle</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadSwarmManifest}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-purple-300 border border-purple-500/30 hover:border-purple-500/60 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-purple-400" />
                    <span>Swarm Manifest</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadClaudeConfig}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-amber-300 border border-amber-500/30 hover:border-amber-500/60 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    <span>claude.json</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadChatGptCustomGpt}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <Bot className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ChatGPT GPT</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMinifier(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Minify Prompt</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDockerModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Docker Sandbox</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadSwarmWavePlan}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-purple-300 border border-purple-500/30 hover:border-purple-500/60 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-purple-400" />
                    <span>SWARM_WAVE.md</span>
                  </button>
                </>
              )}

              {/* Docs & Memory */}
              {(exportFilter === 'all' || exportFilter === 'docs') && (
                <>
                  <button
                    type="button"
                    onClick={downloadMarkdown}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-zinc-200 border border-[#27272a] hover:border-zinc-500 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Stack.md</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadObsidianNote}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-violet-300 border border-violet-500/30 hover:border-violet-500/60 transition-colors text-xs font-mono cursor-pointer"
                  >
                    <Diamond className="w-3.5 h-3.5 text-violet-400" />
                    <span>Obsidian Note</span>
                  </button>
                </>
              )}
            </div>

            {/* Bottom Actions: Clear All & Primary Batch Execution CTA */}
            <div className="pt-2 border-t border-[#27272a]/60 flex flex-wrap items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={clearStack}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-2 py-1 rounded hover:bg-rose-950/20 transition-colors cursor-pointer"
              >
                Clear All ({stack.length})
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowDockerModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Docker Sandbox</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowMinifier(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/50 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Minify Prompt</span>
                </button>

                <button
                  type="button"
                  onClick={copySwarmBriefText}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-purple-300 border border-purple-500/30 hover:border-purple-500/50 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedSwarmBrief ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bot className="w-3.5 h-3.5 text-purple-400" />}
                  <span>{copiedSwarmBrief ? 'Copied Swarm Brief!' : 'Copy Swarm Brief'}</span>
                </button>

                <button
                  type="button"
                  onClick={copyInstallScript}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer active:scale-95"
                >
                  {copiedScript ? <Check className="w-4 h-4 text-zinc-950" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedScript ? 'Batch Script Copied!' : `Copy Batch Script (${cliFormat})`}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <PromptMinifierModal
        isOpen={showMinifier}
        onClose={() => setShowMinifier(false)}
        stack={stack}
      />

      <DockerSandboxModal
        isOpen={showDockerModal}
        onClose={() => setShowDockerModal(false)}
        stack={stack}
      />
    </div>
  )
}
