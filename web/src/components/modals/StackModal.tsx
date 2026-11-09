import React, { useState } from 'react'
import { X, Trash2, Download, Copy, Check, Diamond, Terminal } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'

export const StackModal: React.FC = () => {
  const isStackModalOpen = useSkillStore((s) => s.isStackModalOpen)
  const setStackModalOpen = useSkillStore((s) => s.setStackModalOpen)
  const stack = useSkillStore((s) => s.stack)
  const removeFromStack = useSkillStore((s) => s.removeFromStack)
  const clearStack = useSkillStore((s) => s.clearStack)

  const [copiedScript, setCopiedScript] = useState(false)

  if (!isStackModalOpen) return null

  // 1. Export as Standard Markdown
  const downloadMarkdown = () => {
    let md = `# 🛠️ Custom AI Agent Stack\n\n`
    md += `> Exported from [SkillDock](https://nownitya.github.io/Ai-Models-List/)\n`
    md += `> Generated on: ${new Date().toISOString().split('T')[0]}\n\n`
    md += `## Selected Skills (${stack.length})\n\n`
    md += `| Priority | Skill Name | Slash Command | Installation Command |\n`
    md += `| :--- | :--- | :--- | :--- |\n`
    stack.forEach((s) => {
      md += `| **${s.priority}** | ${s.name} | \`/${s.scoped}\` | \`${s.cli}\` |\n`
    })

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `SkillDock-Stack-${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 2. Export as Obsidian Second Brain Note (with Dataview tags)
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
      obs += `- **CLI**: \`${s.cli}\`\n\n`
    })

    const blob = new Blob([obs], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `SkillDock-Obsidian-Stack.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 3. Copy Batch Installation Script
  const copyInstallScript = () => {
    const commands = stack.map((s) => s.cli).join('\n')
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
        className="w-full max-w-2xl bg-[#0d1117] border border-[#21262d] rounded-2xl p-6 space-y-5 relative shadow-2xl flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#21262d]">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>SkillDock Agent Stack ({stack.length})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Curate your custom engineering stack, then export to Markdown, Obsidian Second Brain, or CLI scripts.
            </p>
          </div>
          <button
            onClick={() => setStackModalOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-[#161b22] border border-[#30363d] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stack Items List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {stack.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              Your stack is currently empty. Click the bookmark icon on any skill card or row to add it here.
            </div>
          ) : (
            stack.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[#08090a] border border-[#21262d] text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#161b22] text-slate-300 border border-[#30363d]">
                    {item.priority}
                  </span>
                  <span className="font-semibold text-slate-200 truncate">{item.name}</span>
                  <span className="text-[11px] font-mono text-cyan-400 truncate">/{item.scoped}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => removeFromStack(item.id)}
                    className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-[#161b22] transition-colors cursor-pointer"
                    title="Remove from stack"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {stack.length > 0 && (
          <div className="pt-3 border-t border-[#21262d] flex flex-wrap items-center justify-between gap-2 text-xs">
            <button
              onClick={clearStack}
              className="text-xs text-red-400 hover:text-red-300 font-semibold px-2 py-1.5 rounded hover:bg-red-950/30 transition-colors cursor-pointer"
            >
              Clear All ({stack.length})
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={copyInstallScript}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-slate-200 border border-[#30363d] cursor-pointer transition-colors"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Batch Script</span>
              </button>

              <button
                onClick={downloadObsidianNote}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/50 hover:bg-purple-900/50 text-purple-300 border border-purple-800/50 cursor-pointer transition-colors"
              >
                <Diamond className="w-3.5 h-3.5" />
                <span>Obsidian Note</span>
              </button>

              <button
                onClick={downloadMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Markdown</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
