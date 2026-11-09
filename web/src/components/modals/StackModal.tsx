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
    md += `> Exported from [AI Coding Skills Matrix](https://nownitya.github.io/Ai-Models-List/)\n`
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
    a.download = `My-Agent-Stack-${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 2. Export as Obsidian Second Brain Note (with Dataview tags)
  const downloadObsidianNote = () => {
    let obs = `---\n`
    obs += `title: "My Custom AI Agent Stack"\n`
    obs += `type: agent-stack\n`
    obs += `status: active\n`
    obs += `updated: ${new Date().toISOString().split('T')[0]}\n`
    obs += `tags: [ai-stack, second-brain, agent-skills, dataview]\n`
    obs += `---\n\n`
    obs += `# 💎 My AI Agent Stack\n\n`
    obs += `> **Universal Developer Second Brain Stack Configuration**\n`
    obs += `> Cross-Model Agent Harness & MCP Tooling Suite\n\n`
    obs += `## 📋 Active Stack Registry\n\n`
    obs += `\`\`\`dataview\n`
    obs += `TABLE priority AS "Priority", scoped AS "Slash Command", cli AS "Install CLI"\n`
    obs += `WHERE contains(file.tags, "ai-stack")\n`
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
    a.download = `My-Obsidian-Agent-Stack.md`
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel w-full max-w-2xl rounded-2xl p-6 sm:p-8 space-y-6 relative border border-slate-700 shadow-2xl flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span>My AI Agent Stack ({stack.length})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Curate your custom engineering stack, then export to Markdown or Obsidian.
            </p>
          </div>
          <button
            onClick={() => setStackModalOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stack Items List */}
        <div className="overflow-y-auto space-y-2 flex-1 pr-1">
          {stack.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-sm mb-1">Your stack is currently empty.</p>
              <p className="text-xs">Click the bookmark icon on any skill card to add it to your stack.</p>
            </div>
          ) : (
            stack.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                    {item.priority}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                    <span className="text-xs font-mono text-cyan-400">/{item.scoped}</span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromStack(item.id)}
                  className="text-slate-500 hover:text-red-400 p-1.5 transition-colors"
                  title="Remove from stack"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        {stack.length > 0 && (
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={clearStack}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={copyInstallScript}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy CLI Script</span>
              </button>

              <button
                onClick={downloadObsidianNote}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 text-xs font-semibold border border-purple-500/50 transition-colors cursor-pointer"
              >
                <Diamond className="w-3.5 h-3.5 text-purple-400" />
                <span>Obsidian Note</span>
              </button>

              <button
                onClick={downloadMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .MD</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
