import React, { useState } from 'react'
import { GitFork, Star, ExternalLink, Plus, Layers, ArrowUpRight, Share2, Zap, Check } from 'lucide-react'
import type { FrameworkHub } from '@/types'
import { useSkillStore } from '@/stores/useSkillStore'
import { CopyButton } from '@/components/common/CopyButton'

interface FrameworkCardProps {
  framework: FrameworkHub
}

export const FrameworkCard: React.FC<FrameworkCardProps> = ({ framework }) => {
  const activeAssistant = useSkillStore((s) => s.activeAssistant)
  const searchQuery = useSkillStore((s) => s.searchQuery)
  const openFrameworkInspect = useSkillStore((s) => s.openFrameworkInspect)
  const addFrameworkToStack = useSkillStore((s) => s.addFrameworkToStack)
  const stack = useSkillStore((s) => s.stack)

  const [copiedShare, setCopiedShare] = useState(false)
  const [avatarError, setAvatarError] = useState(false)

  const owner = framework.repo.includes('/') ? framework.repo.split('/')[0] : framework.author
  const avatarUrl = `https://github.com/${owner}.png?size=64`

  // Dynamic matching skills when text search is active
  const matchingSkills = searchQuery.trim() && framework.skillsCount > 1
    ? framework.skills.filter((s) => {
        const q = searchQuery.toLowerCase().trim()
        return (
          s.name.toLowerCase().includes(q) ||
          s.scoped.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
        )
      })
    : []

  const activeRecipe = framework.installRecipes[activeAssistant] || framework.installRecipes.git

  const primarySlash = framework.skills.length > 0 && framework.skills[0].scoped
    ? `/${framework.skills[0].scoped}`
    : `/${framework.repoName.toLowerCase().replace(/\s+/g, '-')}`

  const isFullySaved = framework.skills.length > 0 && framework.skills.every((s) => stack.some((item) => item.id === s.id))
  const savedCount = framework.skills.filter((s) => stack.some((item) => item.id === s.id)).length

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
      className="group relative flex flex-col justify-between bg-[#111114] hover:bg-[#16161a] border border-[#27272a] hover:border-zinc-500 rounded-xl p-5 transition-all duration-200 cursor-pointer shadow-xs min-w-0 h-full"
    >
      <div className="flex-1 flex flex-col">
        {/* Top Header: Category & Suite Button */}
        <div className="flex items-center justify-between gap-2 mb-2.5 min-w-0">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 truncate max-w-[150px] sm:max-w-[180px]">
            {framework.categoryLabel}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleCopyShare}
              title="Copy Shareable Link"
              className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#18181b] text-zinc-400 hover:text-white border border-[#27272a] hover:border-zinc-500 transition-colors cursor-pointer shrink-0"
            >
              {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={handleAddSuite}
              className={`flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-md border transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                isFullySaved
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 font-semibold hover:bg-rose-950/30 hover:text-rose-300 hover:border-rose-500/40'
                  : savedCount > 0
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-[#18181b] text-zinc-400 hover:text-white border-[#27272a] hover:border-zinc-500'
              }`}
              title={
                isFullySaved
                  ? (framework.skillsCount > 1 ? "Click to remove suite from Stack" : "Click to remove from Stack")
                  : (framework.skillsCount > 1 ? "Add all skills in this suite to Stack" : "Save skill to Stack")
              }
            >
              {isFullySaved ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{framework.skillsCount > 1 ? 'Suite Saved' : 'In Stack'}</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3 shrink-0" />
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

        {/* Title, Vendor Avatar & Upstream Repo Pill */}
        <div className="space-y-1.5 mb-2.5 min-w-0">
          <div className="flex items-start justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {!avatarError ? (
                <img
                  src={avatarUrl}
                  alt={owner}
                  onError={() => setAvatarError(true)}
                  className="w-5 h-5 rounded-full border border-[#27272a] bg-[#18181b] shrink-0"
                  loading="lazy"
                />
              ) : (
                <GitFork className="w-4 h-4 text-zinc-500 shrink-0" />
              )}
              <h3 className="text-base font-bold text-zinc-100 group-hover:text-white transition-colors leading-tight truncate">
                {framework.repoName}
              </h3>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0 mt-0.5" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-[#18181b] text-zinc-400 border border-[#27272a] max-w-full">
            <GitFork className="w-3 h-3 text-zinc-500 shrink-0" />
            <span className="truncate">{framework.repo}</span>
          </div>
        </div>

        {/* Description (Resilient 2-line clamp with word breaking) */}
        <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-3 break-words">
          {framework.description}
        </p>

        {/* Sub-Skills Badge */}
        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
          {framework.skillsCount > 1 ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 shrink-0">
              <Layers className="w-3 h-3 text-indigo-400 shrink-0" />
              <span>Suite · {framework.skillsCount} Skills</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded bg-[#18181b] text-zinc-300 border border-[#27272a] shrink-0">
              <Zap className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Standalone Skill</span>
            </span>
          )}
          {framework.version && (
            <span className="text-[10px] font-mono text-zinc-500 px-1.5 py-0.5 rounded bg-[#09090b] border border-[#27272a] shrink-0">
              {framework.version}
            </span>
          )}
        </div>

        {/* Dynamic Search Match Highlighting or Member Skill Peeks */}
        {matchingSkills.length > 0 ? (
          <div className="flex items-center gap-1.5 mb-3 px-2 py-1 rounded bg-emerald-950/20 border border-emerald-500/20 text-[11px] font-mono text-emerald-300 min-w-0">
            <Check className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">
              Matches: {matchingSkills.slice(0, 3).map((m) => m.name).join(', ')}
              {matchingSkills.length > 3 ? ` +${matchingSkills.length - 3}` : ''}
            </span>
          </div>
        ) : framework.skillsCount > 1 ? (
          <div className="flex items-center gap-1 mb-3 overflow-hidden flex-nowrap min-w-0">
            {framework.skills.slice(0, 3).map((s) => (
              <span
                key={s.id}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#18181b] text-zinc-400 border border-[#27272a] truncate max-w-[110px]"
              >
                {s.name}
              </span>
            ))}
            {framework.skillsCount > 3 && (
              <span className="text-[10px] font-mono text-zinc-500 px-1 shrink-0">
                +{framework.skillsCount - 3}
              </span>
            )}
          </div>
        ) : null}
      </div>

      {/* Card Footer: Pinned at bottom with mt-auto */}
      <div className="pt-3 border-t border-[#27272a] space-y-2 mt-auto">
        <div className="flex items-center justify-between gap-2 min-w-0">
          <CopyButton
            variant="pill"
            text={primarySlash}
            title="Copy primary slash command"
            className="max-w-[180px] sm:max-w-[210px]"
          />

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 text-xs font-mono text-zinc-400">
              <Star className="w-3 h-3 fill-amber-400/80 text-amber-400 shrink-0" />
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

        {/* Row 2: Standardized Terminal Codebar */}
        <CopyButton
          variant="codebar"
          text={activeRecipe}
          displayPrefix={activeAssistant === 'antigravity' ? 'AGY:' : activeAssistant === 'claude' ? 'Claude:' : activeAssistant === 'codex' ? 'Codex:' : 'Git:'}
          className="w-full"
        />
      </div>
    </div>
  )
}
