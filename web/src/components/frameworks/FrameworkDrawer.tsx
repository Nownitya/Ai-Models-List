import React, { useState, useEffect } from 'react'
import {
  X,
  GitFork,
  Star,
  ExternalLink,
  Copy,
  Check,
  Plus,
  Layers,
  Bot,
  Share2,
  Terminal,
  Sparkles,
} from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { AssistantType } from '@/types'

export const FrameworkDrawer: React.FC = () => {
  const framework = useSkillStore((s) => s.inspectFramework)
  const closeFrameworkInspect = useSkillStore((s) => s.closeFrameworkInspect)
  const addFrameworkToStack = useSkillStore((s) => s.addFrameworkToStack)
  const addSelectedSkillsToStack = useSkillStore((s) => s.addSelectedSkillsToStack)
  const toggleStack = useSkillStore((s) => s.toggleStack)
  const stack = useSkillStore((s) => s.stack)
  const skills = useSkillStore((s) => s.skills)

  const activeAssistant = useSkillStore((s) => s.activeAssistant)
  const [selectedAssistant, setSelectedAssistant] = useState<AssistantType>(activeAssistant)
  const [copiedAssistantCmd, setCopiedAssistantCmd] = useState(false)
  const [copiedSkillSlash, setCopiedSkillSlash] = useState<string | null>(null)
  const [copiedOfficialCli, setCopiedOfficialCli] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const [selectedSkillIds, setSelectedSkillIds] = useState<Set<string>>(new Set())

  // Sync with global assistant selector from header
  useEffect(() => {
    setSelectedAssistant(activeAssistant)
  }, [activeAssistant])

  // Reset selected skills when inspecting a different framework
  useEffect(() => {
    setSelectedSkillIds(new Set())
  }, [framework?.id])

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

  const handleCopyOfficialCli = (skillId: string) => {
    const cmd = `npx skills add ${framework.repo} --skill ${skillId}`
    navigator.clipboard.writeText(cmd)
    setCopiedOfficialCli(skillId)
    setTimeout(() => setCopiedOfficialCli(null), 1600)
  }

  const handleCopyShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?pillar=frameworks&framework=${encodeURIComponent(framework.repo)}`
    navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 1600)
  }

  const toggleSelectSkill = (id: string) => {
    setSelectedSkillIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSelectAll = () => {
    setSelectedSkillIds(new Set(framework.skills.map((s) => s.id)))
  }

  const handleDeselectAll = () => {
    setSelectedSkillIds(new Set())
  }

  const handleAddSelectedToStack = () => {
    if (selectedSkillIds.size === 0) return
    const toAdd = framework.skills
      .filter((s) => selectedSkillIds.has(s.id))
      .map((s) => ({
        id: s.id,
        uniqueId: `${framework.categoryId}:${s.id}`,
        name: s.name,
        priority: s.priority,
        scoped: s.scoped,
        cli: s.cli,
        repo: framework.repo,
        officialCli: `npx skills add ${framework.repo} --skill ${s.id}`,
      }))
    addSelectedSkillsToStack(toAdd)
    setSelectedSkillIds(new Set())
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#09090b] border-l border-[#27272a] h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#27272a] flex items-start justify-between gap-4 bg-[#111114]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-400">
                {framework.categoryLabel}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a]">
                {framework.license || 'Open Source'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-1">
              {framework.repoName}
            </h2>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1 font-mono text-zinc-300">
                <GitFork className="w-3.5 h-3.5 text-zinc-500" />
                {framework.repo}
              </span>
              <span className="flex items-center gap-1 font-mono text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400/80" />
                {framework.starsFormatted}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShare}
              className="p-1.5 rounded-md bg-[#18181b] text-zinc-400 hover:text-white border border-[#27272a] hover:border-zinc-500 transition-colors cursor-pointer"
              title="Copy shareable link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <a
              href={framework.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-[#18181b] text-zinc-400 hover:text-white border border-[#27272a] hover:border-zinc-500 transition-colors"
              title="Open GitHub repository"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={closeFrameworkInspect}
              className="p-1.5 rounded-md bg-[#18181b] text-zinc-400 border border-[#27272a] hover:text-white hover:border-zinc-500 transition-colors cursor-pointer"
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
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
              About This Suite
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-[#111114] p-4 rounded-xl border border-[#27272a]">
              {framework.description}
            </p>
          </div>

          {/* Multi-Assistant Installation Engine */}
          <div className="bg-[#111114] p-4 rounded-xl border border-[#27272a] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-zinc-400" />
                <span>Installation Recipes</span>
              </span>
              <div className="flex items-center gap-1 bg-[#09090b] p-0.5 rounded-md border border-[#27272a]">
                {(['antigravity', 'claude', 'codex', 'git'] as AssistantType[]).map((ast) => (
                  <button
                    key={ast}
                    onClick={() => setSelectedAssistant(ast)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize transition-all cursor-pointer ${
                      selectedAssistant === ast
                        ? 'bg-zinc-800 text-white font-semibold'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {ast === 'antigravity' ? 'Antigravity' : ast === 'claude' ? 'Claude' : ast === 'codex' ? 'Codex' : 'Git'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 bg-[#18181b] p-3 rounded-lg border border-[#27272a] font-mono text-xs">
              <span className="text-zinc-200 break-all select-all">{activeRecipe}</span>
              <button
                onClick={handleCopyAssistantCmd}
                className="shrink-0 p-1 rounded bg-[#27272a] hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Copy install command"
              >
                {copiedAssistantCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Member Skills Manifest & Cherry-Picking Engine */}
          <div>
            {/* Context Saving Educational Tip */}
            {framework.skillsCount > 1 && (
              <div className="mb-4 p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20 text-xs text-indigo-300/90 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-indigo-200">Official Selective Installation:</strong> You can cherry-pick only the sub-skills your project needs instead of installing the entire monolith. Saves up to 80% prompt context window.
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
              <div className="flex items-center gap-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Included Skills ({framework.skillsCount})</span>
                </h4>
                {framework.skillsCount > 1 && (
                  <div className="flex items-center gap-1 text-[11px] font-mono">
                    <button
                      onClick={handleSelectAll}
                      className="px-1.5 py-0.5 rounded text-zinc-400 hover:text-white hover:bg-[#18181b] transition-colors cursor-pointer"
                    >
                      Select All
                    </button>
                    <span className="text-zinc-600">|</span>
                    <button
                      onClick={handleDeselectAll}
                      className="px-1.5 py-0.5 rounded text-zinc-400 hover:text-white hover:bg-[#18181b] transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {selectedSkillIds.size > 0 && (
                  <button
                    onClick={handleAddSelectedToStack}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold transition-all shadow-xs cursor-pointer animate-in fade-in"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Add Selected ({selectedSkillIds.size}) to Stack</span>
                  </button>
                )}

                <button
                  onClick={() => addFrameworkToStack(framework)}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    isFullySaved
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : 'bg-[#18181b] hover:bg-zinc-800 text-zinc-300 hover:text-white border border-[#27272a] hover:border-zinc-500'
                  }`}
                >
                  {isFullySaved ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{isFullySaved ? 'All in Stack' : 'Add Entire Suite'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {framework.skills.map((skill) => {
                const isSkillSaved = stack.some((s) => s.id === skill.id)
                const fullSkill = skills.find((s) => s.id === skill.id)
                const isSelected = selectedSkillIds.has(skill.id)

                return (
                  <div
                    key={skill.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-[#141419] border-emerald-500/40'
                        : 'bg-[#111114] border-[#27272a] hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      {/* Cherry-pick selection checkbox */}
                      <button
                        onClick={() => toggleSelectSkill(skill.id)}
                        className={`mt-0.5 w-4 h-4 rounded shrink-0 flex items-center justify-center transition-colors cursor-pointer border ${
                          isSelected
                            ? 'bg-emerald-400 border-emerald-400 text-zinc-950'
                            : 'border-zinc-600 hover:border-zinc-400 bg-[#18181b]'
                        }`}
                        title={isSelected ? 'Deselect this skill' : 'Select for cherry-pick'}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">{skill.name}</span>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#18181b] text-zinc-400 border border-[#27272a]">
                            {skill.priority}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-1">{skill.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 pl-6 sm:pl-0">
                      {/* Official README CLI command: npx skills add <repo> --skill <name> */}
                      <button
                        onClick={() => handleCopyOfficialCli(skill.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono border transition-colors cursor-pointer ${
                          copiedOfficialCli === skill.id
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-[#18181b] hover:bg-zinc-800 text-zinc-300 border-[#27272a] hover:border-zinc-500'
                        }`}
                        title={`Copy official command: npx skills add ${framework.repo} --skill ${skill.id}`}
                      >
                        <Terminal className="w-3 h-3 text-cyan-400" />
                        <span>{copiedOfficialCli === skill.id ? 'Copied npx!' : 'npx add'}</span>
                      </button>

                      {/* Slash command button */}
                      <button
                        onClick={() => handleCopySlash(skill.scoped)}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-[#18181b] hover:bg-zinc-800 text-xs font-mono text-zinc-300 border border-[#27272a] hover:border-zinc-500 transition-colors cursor-pointer"
                        title="Copy slash command"
                      >
                        <span className="truncate max-w-[110px]">/{skill.scoped}</span>
                        {copiedSkillSlash === skill.scoped ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-zinc-500" />
                        )}
                      </button>

                      {/* Stack toggle */}
                      {fullSkill && (
                        <button
                          onClick={() => toggleStack(fullSkill)}
                          className={`p-1.5 rounded transition-colors cursor-pointer border ${
                            isSkillSaved
                              ? 'bg-white text-zinc-900 border-white font-bold'
                              : 'bg-[#18181b] text-zinc-400 hover:text-white border-[#27272a] hover:border-zinc-500'
                          }`}
                          title={isSkillSaved ? 'Remove from stack' : 'Add to stack'}
                        >
                          {isSkillSaved ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
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
        <div className="p-4 border-t border-[#27272a] bg-[#111114] flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            Press <kbd className="px-1.5 py-0.5 rounded bg-[#18181b] border border-[#27272a] font-mono">ESC</kbd> to exit
          </span>
          <button
            onClick={closeFrameworkInspect}
            className="px-4 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 border border-[#27272a] hover:border-zinc-500 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
