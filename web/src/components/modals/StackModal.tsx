import React, { useState } from 'react'
import { X, Trash2, Download, Copy, Check, Diamond, Layers, Terminal, Cpu } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'

export const StackModal: React.FC = () => {
  const isStackModalOpen = useSkillStore((s) => s.isStackModalOpen)
  const setStackModalOpen = useSkillStore((s) => s.setStackModalOpen)
  const stack = useSkillStore((s) => s.stack)
  const removeFromStack = useSkillStore((s) => s.removeFromStack)
  const clearStack = useSkillStore((s) => s.clearStack)

  const [copiedScript, setCopiedScript] = useState(false)
  const [cliFormat, setCliFormat] = useState<'npx' | 'python'>('npx')

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

  // 5. Copy Batch Installation Script
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
        className="w-full max-w-2xl bg-[#09090b] border border-[#27272a] rounded-2xl p-6 space-y-5 relative shadow-2xl flex flex-col max-h-[85vh]"
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
          <button
            onClick={() => setStackModalOpen(false)}
            className="text-zinc-400 hover:text-white p-1.5 rounded-md bg-[#18181b] border border-[#27272a] hover:border-zinc-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stack Items List */}
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
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-[#18181b] text-zinc-300 border border-[#27272a]">
                      {item.priority}
                    </span>
                    <span className="font-semibold text-zinc-100 truncate">{item.name}</span>
                    <span className="text-xs font-mono text-zinc-400 truncate">/{item.scoped}</span>
                    {item.repo && (
                      <span className="hidden md:inline text-[10px] font-mono text-zinc-500 bg-[#18181b] px-1.5 py-0.2 rounded border border-[#27272a]">
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
                  onClick={downloadClaudeConfig}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#141417] hover:bg-[#1a1a20] text-zinc-200 border border-[#27272a] hover:border-zinc-500 cursor-pointer transition-colors text-xs font-mono"
                  title="Export claude.json"
                >
                  <Terminal className="w-3 h-3 text-amber-400" />
                  <span>claude.json</span>
                </button>

                <button
                  onClick={downloadObsidianNote}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#141417] hover:bg-[#1a1a20] text-zinc-200 border border-[#27272a] hover:border-zinc-500 cursor-pointer transition-colors text-xs font-mono"
                  title="Export Obsidian Dataview Note"
                >
                  <Diamond className="w-3 h-3 text-violet-400" />
                  <span>Obsidian Note</span>
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

              <div className="flex items-center gap-2">
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
