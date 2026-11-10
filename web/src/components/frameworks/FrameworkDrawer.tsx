import React, { useState, useEffect } from 'react'
import { X, GitFork, Star, ExternalLink, Copy, Check, Plus, Layers, Bot } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { AssistantType } from '@/types'

export const FrameworkDrawer: React.FC = () => {
  const framework = useSkillStore((s) => s.inspectFramework)
  const closeFrameworkInspect = useSkillStore((s) => s.closeFrameworkInspect)
  const addFrameworkToStack = useSkillStore((s) => s.addFrameworkToStack)
  const toggleStack = useSkillStore((s) => s.toggleStack)
  const stack = useSkillStore((s) => s.stack)
  const skills = useSkillStore((s) => s.skills)

  const [selectedAssistant, setSelectedAssistant] = useState<AssistantType>('antigravity')
  const [copiedAssistantCmd, setCopiedAssistantCmd] = useState(false)
  const [copiedSkillSlash, setCopiedSkillSlash] = useState<string | null>(null)

  // Listen for Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFrameworkInspect()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeFrameworkInspect])

  if (!framework) return null

  const isFullySaved = framework.skills.length > 0 && framework.skills.every((s) => stack.some((item) => item.id === s.id))
  const activeRecipe = framework.installRecipes[selectedAssistant] || framework.installRecipes.git

  const handleCopyAssistantCmd = () => {
    navigator.clipboard.writeText(activeRecipe)
    setCopiedAssistantCmd(true)
    setTimeout(() => setCopiedAssistantCmd(false), 1600)
  }

  const handleCopySlash = (slash: string) => {
    navigator.clipboard.writeText(slash)
    setCopiedSkillSlash(slash)
    setTimeout(() => setCopiedSkillSlash(null), 1600)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#0d1117] border-l border-[#30363d] h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#21262d] flex items-start justify-between gap-4 bg-[#161b22]/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                {framework.categoryLabel}
              </span>
              <span className="text-xs font-mono text-[#8b949e] px-2 py-0.5 rounded bg-[#21262d] border border-[#30363d]">
                {framework.license || 'Open Source'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#f0f6fc] leading-tight mb-1">
              {framework.repoName}
            </h2>
            <div className="flex items-center gap-3 text-xs text-[#8b949e]">
              <span className="flex items-center gap-1 font-mono text-cyan-300">
                <GitFork className="w-3.5 h-3.5" />
                {framework.repo}
              </span>
              <span className="flex items-center gap-1 font-mono text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {framework.starsFormatted}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={framework.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#30363d] transition-colors"
              title="Open GitHub repository"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={closeFrameworkInspect}
              className="p-2 rounded-lg bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#30363d] transition-colors cursor-pointer"
              title="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8b949e] mb-2">
              About This Suite
            </h4>
            <p className="text-sm text-[#c9d1d9] leading-relaxed bg-[#161b22] p-4 rounded-xl border border-[#30363d]">
              {framework.description}
            </p>
          </div>

          {/* Multi-Assistant Installation Engine */}
          <div className="bg-[#161b22] p-4 rounded-xl border border-[#30363d] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8b949e] flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>Installation Recipes</span>
              </span>
              <div className="flex items-center gap-1 bg-[#0d1117] p-1 rounded-lg border border-[#30363d]">
                {(['antigravity', 'claude', 'codex', 'git'] as AssistantType[]).map((ast) => (
                  <button
                    key={ast}
                    onClick={() => setSelectedAssistant(ast)}
                    className={`px-2.5 py-0.5 rounded text-xs font-semibold capitalize transition-all cursor-pointer ${
                      selectedAssistant === ast
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-[#8b949e] hover:text-[#c9d1d9]'
                    }`}
                  >
                    {ast === 'antigravity' ? 'Antigravity' : ast === 'claude' ? 'Claude' : ast === 'codex' ? 'Codex' : 'Git'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 bg-[#0d1117] p-3 rounded-lg border border-[#30363d] font-mono text-xs">
              <span className="text-[#c9d1d9] break-all select-all">{activeRecipe}</span>
              <button
                onClick={handleCopyAssistantCmd}
                className="shrink-0 p-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#f0f6fc] transition-colors cursor-pointer"
                title="Copy install command"
              >
                {copiedAssistantCmd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Member Skills Manifest */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8b949e] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Included Skills ({framework.skillsCount})</span>
              </h4>
              <button
                onClick={() => addFrameworkToStack(framework)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  isFullySaved
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                }`}
              >
                {isFullySaved ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                <span>{isFullySaved ? 'All Skills in Stack' : 'Add Entire Suite to Stack'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {framework.skills.map((skill) => {
                const isSkillSaved = stack.some((s) => s.id === skill.id)
                const fullSkill = skills.find((s) => s.id === skill.id)
                return (
                  <div
                    key={skill.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-[#161b22] border border-[#30363d]/70 hover:border-[#30363d] transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-[#f0f6fc] truncate">{skill.name}</span>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {skill.priority}
                        </span>
                      </div>
                      <p className="text-xs text-[#8b949e] line-clamp-1">{skill.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleCopySlash(skill.scoped)}
                        className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#0d1117] hover:bg-[#21262d] text-xs font-mono text-cyan-300 border border-[#30363d] transition-colors cursor-pointer"
                        title="Copy slash command"
                      >
                        <span className="truncate max-w-[120px]">{skill.scoped}</span>
                        {copiedSkillSlash === skill.scoped ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-[#8b949e]" />
                        )}
                      </button>

                      {fullSkill && (
                        <button
                          onClick={() => toggleStack(fullSkill)}
                          className={`p-1.5 rounded transition-colors cursor-pointer ${
                            isSkillSaved
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#30363d]'
                          }`}
                          title={isSkillSaved ? 'Remove from stack' : 'Add to stack'}
                        >
                          {isSkillSaved ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#21262d] bg-[#161b22]/70 flex items-center justify-between">
          <span className="text-xs text-[#8b949e]">
            Press <kbd className="px-1.5 py-0.5 rounded bg-[#0d1117] border border-[#30363d] font-mono">ESC</kbd> to exit
          </span>
          <button
            onClick={closeFrameworkInspect}
            className="px-4 py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-sm font-semibold text-[#f0f6fc] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
