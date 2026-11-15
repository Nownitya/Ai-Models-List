import React, { useState, useEffect } from 'react'
import {
  X,
  GitFork,
  Star,
  ExternalLink,
  Plus,
  Layers,
  Terminal,
  Sparkles,
  Check,
} from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { AssistantType } from '@/types'
import { CopyButton } from '@/components/common/CopyButton'

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
  const [copiedOfficialCli, setCopiedOfficialCli] = useState<string | null>(null)
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

  const activeRecipe = framework.installRecipes[selectedAssistant] || framework.installRecipes.git

  const handleCopyOfficialCli = (skillId: string) => {
    const cmd = `npx skills add ${framework.repo} --skill ${skillId}`
    navigator.clipboard.writeText(cmd)
    setCopiedOfficialCli(skillId)
    setTimeout(() => setCopiedOfficialCli(null), 1600)
  }

  const shareUrl = `${window.location.origin}${window.location.pathname}?pillar=frameworks&framework=${encodeURIComponent(framework.repo)}`

  const isFullySaved = framework.skills.length > 0 && framework.skills.every((s) => stack.some((item) => item.id === s.id))

  const toggleSelectSkill = (id: string) => {
    const next = new Set(selectedSkillIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedSkillIds(next)
  }

  const selectAllSkills = () => {
    setSelectedSkillIds(new Set(framework.skills.map((s) => s.id)))
  }

  const clearSelection = () => {
    setSelectedSkillIds(new Set())
  }

  const handleAddSelectedToStack = () => {
    const selectedSkills = framework.skills
      .filter((s) => selectedSkillIds.has(s.id))
      .map((s) => skills.find((full) => full.id === s.id))
      .filter(Boolean) as typeof skills

    if (selectedSkills.length > 0) {
      addSelectedSkillsToStack(selectedSkills)
      setSelectedSkillIds(new Set())
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={closeFrameworkInspect}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-[#0e0e11] border-l border-[#27272a] shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Top Bar: Category, License & Window Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                  {framework.categoryLabel}
                </span>
                {framework.license && (
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#18181b] text-zinc-400 border border-[#27272a]">
                    {framework.license}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <CopyButton
                  variant="icon"
                  text={shareUrl}
                  title="Copy shareable link"
                />

                <a
                  href={framework.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-[#27272a] hover:border-zinc-500 transition-colors"
                  title="Open GitHub repository"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={closeFrameworkInspect}
                  className="p-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-[#27272a] hover:border-zinc-500 transition-colors cursor-pointer"
                  title="Close drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Framework Name & Upstream Metrics */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {framework.repoName}
              </h2>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <GitFork className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-zinc-300">{framework.repo}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400/80 text-amber-400" />
                  <span>{framework.starsFormatted}</span>
                </div>
              </div>
            </div>

            {/* About / Description */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                About this suite
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed p-3.5 rounded-lg bg-[#141417] border border-[#27272a]">
                {framework.description}
              </p>
            </div>

            {/* Multi-Assistant Installation Recipes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Installation Recipes</span>
                </span>

                {/* Assistant selector tabs */}
                <div className="inline-flex rounded-lg bg-[#18181b] border border-[#27272a] p-0.5 text-xs font-mono">
                  {(['antigravity', 'claude', 'codex', 'git'] as AssistantType[]).map((ast) => (
                    <button
                      key={ast}
                      type="button"
                      onClick={() => setSelectedAssistant(ast)}
                      className={`px-2 py-0.5 rounded capitalize transition-colors cursor-pointer ${
                        selectedAssistant === ast
                          ? 'bg-zinc-800 text-white font-semibold'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {ast === 'antigravity' ? 'Antigravity' : ast === 'claude' ? 'Claude' : ast === 'codex' ? 'Codex' : 'Git'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Standardized Codebar */}
              <CopyButton
                variant="codebar"
                text={activeRecipe}
                displayPrefix={selectedAssistant === 'antigravity' ? 'AGY:' : selectedAssistant === 'claude' ? 'Claude:' : selectedAssistant === 'codex' ? 'Codex:' : 'Git:'}
                className="w-full text-xs"
              />
            </div>

            {/* Member Skills Manifest & Cherry-Picking Engine */}
            <div className="space-y-3">
              {framework.skillsCount > 1 && (
                <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20 text-xs text-indigo-300/90 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-indigo-200">Official Selective Installation:</strong> You can cherry-pick only the sub-skills your project needs instead of installing the entire monolith. Saves up to 80% prompt context window.
                  </div>
                </div>
              )}

              {/* Cherry-Pick Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#27272a]">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-zinc-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                    Included Skills ({framework.skillsCount})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {framework.skillsCount > 1 && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mr-1">
                      <button
                        type="button"
                        onClick={selectAllSkills}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        Select All
                      </button>
                      <span className="text-zinc-600">|</span>
                      <button
                        type="button"
                        onClick={clearSelection}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  )}

                  {selectedSkillIds.size > 0 && (
                    <button
                      type="button"
                      onClick={handleAddSelectedToStack}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Selected ({selectedSkillIds.size}) to Stack</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => addFrameworkToStack(framework)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono border transition-colors cursor-pointer ${
                      isFullySaved
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 font-semibold hover:bg-rose-950/30 hover:text-rose-300 hover:border-rose-500/40'
                        : 'bg-[#18181b] hover:bg-zinc-800 text-zinc-300 border-[#27272a] hover:border-zinc-500'
                    }`}
                    title={isFullySaved ? 'Click to remove entire suite from Stack' : 'Add all skills in this suite to Stack'}
                  >
                    {isFullySaved ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Suite Saved</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Add Entire Suite</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Sub-Skills List */}
              <div className="space-y-2">
                {framework.skills.map((skill) => {
                  const isSelected = selectedSkillIds.has(skill.id)
                  const isSkillSaved = stack.some((s) => s.id === skill.id)
                  const fullSkill = skills.find((s) => s.id === skill.id)

                  return (
                    <div
                      key={skill.id}
                      onClick={() => toggleSelectSkill(skill.id)}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100'
                          : 'bg-[#141417] hover:bg-[#18181c] border-[#27272a] text-zinc-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0 flex-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="mt-0.5 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-0 cursor-pointer shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-xs truncate">
                              {skill.name}
                            </span>
                            {skill.priority && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#18181b] text-zinc-400 border border-[#27272a] shrink-0">
                                {skill.priority}
                              </span>
                            )}
                          </div>
                          {skill.description && (
                            <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 break-words">
                              {skill.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right actions: npx add + slash command + stack button */}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 shrink-0 pl-6 sm:pl-0"
                      >
                        <button
                          type="button"
                          onClick={() => handleCopyOfficialCli(skill.id)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono border transition-colors cursor-pointer ${
                            copiedOfficialCli === skill.id
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                              : 'bg-[#18181b] hover:bg-zinc-800 text-zinc-300 border-[#27272a] hover:border-zinc-500'
                          }`}
                          title={`Copy official command: npx skills add ${framework.repo} --skill ${skill.id}`}
                        >
                          <Terminal className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>{copiedOfficialCli === skill.id ? 'Copied!' : 'npx add'}</span>
                        </button>

                        <CopyButton
                          variant="pill"
                          text={`/${skill.scoped}`}
                          title="Copy slash command"
                          className="max-w-[150px] sm:max-w-[180px]"
                        />

                        {fullSkill && (
                          <button
                            type="button"
                            onClick={() => toggleStack(fullSkill)}
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-md transition-colors cursor-pointer border shrink-0 ${
                              isSkillSaved
                                ? 'bg-white text-zinc-900 border-white font-bold'
                                : 'bg-[#18181b] text-zinc-400 hover:text-white border-[#27272a] hover:border-zinc-500'
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
          <div className="p-4 border-t border-[#27272a] bg-[#111114] flex items-center justify-between text-xs text-zinc-400">
            <span className="font-mono text-[11px]">
              Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-zinc-300">ESC</kbd> to exit
            </span>
            <button
              type="button"
              onClick={closeFrameworkInspect}
              className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
