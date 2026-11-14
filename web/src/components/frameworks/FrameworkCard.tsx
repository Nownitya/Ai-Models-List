import React, { useState } from 'react'
import { GitFork, Star, ExternalLink, Copy, Check, Plus, Layers, Terminal, ArrowUpRight, Share2, Zap } from 'lucide-react'
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
  const [copiedShare, setCopiedShare] = useState(false)

  const activeRecipe = framework.installRecipes[activeAssistant] || framework.installRecipes.git

  const primarySlash = framework.skills.length > 0 && framework.skills[0].scoped
    ? framework.skills[0].scoped
    : `/${framework.repoName.toLowerCase().replace(/\s+/g, '-')}`

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

  const handleCopyShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    const url = `${window.location.origin}${window.location.pathname}?pillar=frameworks&framework=${encodeURIComponent(framework.repo)}`
    navigator.clipboard.writeText(url)
    setCopiedShare(true)
    setTimeout(() => setCopiedShare(false), 1600)
  }

  const handleAddSuite = (e: React.MouseEvent) => {
    e.stopPropagation()
    addFrameworkToStack(framework)
  }

  return (
    <div
      onClick={() => openFrameworkInspect(framework)}
      className="group relative flex flex-col justify-between bg-[#111114] hover:bg-[#16161a] border border-[#27272a] hover:border-zinc-500 rounded-xl p-5 transition-all duration-200 cursor-pointer shadow-xs"
    >
      <div>
        {/* Top Header: Category & Suite Button */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            {framework.categoryLabel}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyShare}
              title="Copy Shareable Link"
              className="p-1 rounded bg-[#18181b] text-zinc-400 hover:text-white border border-[#27272a] hover:border-zinc-500 transition-colors cursor-pointer"
            >
              {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleAddSuite}
              className={`flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                isFullySaved
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 font-semibold'
                  : savedCount > 0
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-[#18181b] text-zinc-400 hover:text-white border-[#27272a] hover:border-zinc-500'
              }`}
              title={framework.skillsCount > 1 ? "Add all skills in this suite to Stack" : "Save skill to Stack"}
            >
              {isFullySaved ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>{framework.skillsCount > 1 ? 'Suite Saved' : 'In Stack'}</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" />
                  <span>
                    {framework.skillsCount > 1
                      ? savedCount > 0
                        ? `${savedCount}/${framework.skillsCount}`
                        : 'Add Suite'
                      : 'Add to Stack'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Title & Upstream Repo Pill */}
        <div className="space-y-1 mb-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-zinc-100 group-hover:text-white transition-colors leading-tight">
              {framework.repoName}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0 mt-0.5" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-[#18181b] text-zinc-400 border border-[#27272a]">
            <GitFork className="w-3 h-3 text-zinc-500" />
            <span className="truncate max-w-[220px]">{framework.repo}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-3">
          {framework.description}
        </p>

        {/* Sub-Skills Badge */}
        <div className="flex items-center gap-2 mb-4">
          {framework.skillsCount > 1 ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
              <Layers className="w-3 h-3 text-indigo-400" />
              <span>Suite · {framework.skillsCount} Skills</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded bg-[#18181b] text-zinc-300 border border-[#27272a]">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Standalone Skill</span>
            </span>
          )}
          {framework.version && (
            <span className="text-[10px] font-mono text-zinc-500 px-1.5 py-0.2 rounded bg-[#09090b] border border-[#27272a]">
              {framework.version}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Slash command, Stars, Copyable Install Command */}
      <div className="pt-3 border-t border-[#27272a] space-y-2">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handleCopySlash}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#18181b] hover:bg-zinc-800 text-xs font-mono text-zinc-300 border border-[#27272a] hover:border-zinc-500 transition-colors cursor-pointer"
            title="Copy primary slash command"
          >
            <span className="truncate max-w-[140px]">{primarySlash}</span>
            {copiedSlash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
          </button>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-mono text-zinc-400">
              <Star className="w-3 h-3 fill-amber-400/80 text-amber-400" />
              <span>{framework.starsFormatted}</span>
            </div>
            <a
              href={framework.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1 rounded text-zinc-500 hover:text-zinc-200 transition-colors"
              title="View on GitHub"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Row 2: Target Assistant Install Snippet */}
        <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-xs font-mono">
          <div className="flex items-center gap-1.5 min-w-0">
            <Terminal className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="text-zinc-500 shrink-0 font-medium">
              {activeAssistant === 'antigravity' ? 'AGY:' : activeAssistant === 'claude' ? 'Claude:' : activeAssistant === 'codex' ? 'Codex:' : 'Git:'}
            </span>
            <span className="text-zinc-300 truncate select-all">{activeRecipe}</span>
          </div>
          <button
            onClick={handleCopyCmd}
            className="shrink-0 p-1 rounded hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors cursor-pointer"
            title="Copy install command"
          >
            {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  )
}
