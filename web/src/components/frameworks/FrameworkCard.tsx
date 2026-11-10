import React, { useState } from 'react'
import { GitFork, Star, ExternalLink, Copy, Check, Plus, Layers, Terminal } from 'lucide-react'
import type { FrameworkHub } from '@/types'
import { useSkillStore } from '@/stores/useSkillStore'

interface FrameworkCardProps {
  framework: FrameworkHub
}

export const FrameworkCard: React.FC<FrameworkCardProps> = ({ framework }) => {
  const activeAssistant = useSkillStore((s) => s.activeAssistant)
  const openFrameworkInspect = useSkillStore((s) => s.openFrameworkInspect)
  const addFrameworkToStack = useSkillStore((s) => s.addFrameworkToStack)
  const stack = useSkillStore((s) => s.stack)

  const [copiedCmd, setCopiedCmd] = useState(false)
  const [copiedSlash, setCopiedSlash] = useState(false)

  // Determine active recipe based on activeAssistant
  const activeRecipe = framework.installRecipes[activeAssistant] || framework.installRecipes.git

  // Primary slash command representation
  const primarySlash = framework.skills.length > 0 && framework.skills[0].scoped
    ? framework.skills[0].scoped
    : `/${framework.repoName.toLowerCase().replace(/\s+/g, '-')}`

  // Check if all member skills are in stack
  const isFullySaved = framework.skills.length > 0 && framework.skills.every((s) => stack.some((item) => item.id === s.id))
  const savedCount = framework.skills.filter((s) => stack.some((item) => item.id === s.id)).length

  const handleCopyCmd = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(activeRecipe)
    setCopiedCmd(true)
    setTimeout(() => setCopiedCmd(false), 1600)
  }

  const handleCopySlash = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(primarySlash)
    setCopiedSlash(true)
    setTimeout(() => setCopiedSlash(false), 1600)
  }

  const handleAddSuite = (e: React.MouseEvent) => {
    e.stopPropagation()
    addFrameworkToStack(framework)
  }

  return (
    <div
      onClick={() => openFrameworkInspect(framework)}
      className="group relative flex flex-col justify-between bg-[#161b22]/75 hover:bg-[#161b22] border border-[#30363d]/80 hover:border-cyan-500/50 rounded-xl p-5 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-950/20 cursor-pointer"
    >
      <div>
        {/* Top Header: Category & Priority / Stack Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8b949e] group-hover:text-cyan-400/90 transition-colors">
            {framework.categoryLabel}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleAddSuite}
              className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded font-mono transition-colors cursor-pointer ${
                isFullySaved
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : savedCount > 0
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#30363d]'
              }`}
              title="Add all skills in this suite to My Stack"
            >
              {isFullySaved ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Suite Saved</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" />
                  <span>{savedCount > 0 ? `${savedCount}/${framework.skillsCount}` : 'Add Suite'}</span>
                </>
              )}
            </button>
            <span className="text-xs font-bold px-2 py-0.5 rounded font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
              P1
            </span>
          </div>
        </div>

        {/* Title & Upstream Repo Pill */}
        <div className="space-y-1.5 mb-3">
          <h3 className="text-lg font-bold text-[#f0f6fc] group-hover:text-cyan-300 transition-colors leading-tight">
            {framework.repoName}
          </h3>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-mono bg-[#0d1117] text-cyan-400/90 border border-[#30363d]/60">
            <GitFork className="w-3 h-3" />
            <span className="truncate max-w-[220px]">{framework.repo}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[#8b949e] line-clamp-2 leading-relaxed mb-4">
          {framework.description}
        </p>

        {/* Sub-Skills Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-[#21262d]/80 text-[#c9d1d9] border border-[#30363d]/50">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>{framework.skillsCount} Included {framework.skillsCount === 1 ? 'Skill' : 'Skills'}</span>
          </span>
          {framework.version && (
            <span className="text-xs font-mono text-[#8b949e] px-2 py-0.5 rounded bg-[#0d1117]/60 border border-[#30363d]/40">
              {framework.version}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Slash command, Stars, Copyable Install Command & GitHub link */}
      <div className="pt-3 border-t border-[#21262d] space-y-2.5">
        {/* Row 1: Primary slash command & stars */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handleCopySlash}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0d1117] hover:bg-[#21262d] text-xs font-mono text-cyan-300 border border-[#30363d] transition-colors cursor-pointer"
            title="Copy primary slash command"
          >
            <span className="truncate max-w-[140px]">{primarySlash}</span>
            {copiedSlash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#8b949e]" />}
          </button>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-mono font-semibold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{framework.starsFormatted}</span>
            </div>
            <a
              href={framework.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1 rounded text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] transition-colors"
              title="View upstream repository on GitHub"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Row 2: Target Assistant Install Snippet */}
        <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#0d1117]/90 border border-[#30363d]/80 text-xs font-mono">
          <div className="flex items-center gap-1.5 min-w-0">
            <Terminal className="w-3.5 h-3.5 text-[#8b949e] shrink-0" />
            <span className="text-[#8b949e] shrink-0 font-medium">
              {activeAssistant === 'antigravity' ? 'AGY:' : activeAssistant === 'claude' ? 'Claude:' : activeAssistant === 'codex' ? 'Codex:' : 'Git:'}
            </span>
            <span className="text-[#c9d1d9] truncate select-all">{activeRecipe}</span>
          </div>
          <button
            onClick={handleCopyCmd}
            className="shrink-0 p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] transition-colors cursor-pointer"
            title="Copy install command"
          >
            {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  )
}

