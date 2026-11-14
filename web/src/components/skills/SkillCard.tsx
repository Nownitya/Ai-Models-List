import React, { useState } from 'react'
import { Copy, Check, Bookmark, BookmarkCheck, ExternalLink, Star, GitBranch, ArrowUpRight, Share2, Terminal } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { Skill } from '@/types'

interface SkillCardProps {
  skill: Skill
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const [copiedSlash, setCopiedSlash] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [avatarError, setAvatarError] = useState(false)

  const stack = useSkillStore((s) => s.stack)
  const toggleStack = useSkillStore((s) => s.toggleStack)
  const openInspect = useSkillStore((s) => s.openInspect)
  const setRepo = useSkillStore((s) => s.setRepo)

  const activeAssistant = useSkillStore((s) => s.activeAssistant)
  const isSavedInStack = stack.some((s) => s.id === skill.id)

  const owner = skill.repo && skill.repo.includes('/') ? skill.repo.split('/')[0] : null
  const avatarUrl = owner ? `https://github.com/${owner}.png?size=48` : null

  // Format install command dynamically based on active assistant
  let activeAssistantCmd = skill.repo ? `npx skills add ${skill.repo} --skill ${skill.id}` : skill.cli
  if (activeAssistant === 'antigravity') {
    activeAssistantCmd = `python scripts/install-to-project.py --skill ${skill.scoped}`
  } else if (activeAssistant === 'codex' && skill.repo) {
    activeAssistantCmd = `codex install ${skill.repo}`
  }

  const copySlashCommand = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`/${skill.scoped}`)
    setCopiedSlash(true)
    setTimeout(() => setCopiedSlash(false), 1400)
  }

  const copyCliCommand = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(activeAssistantCmd)
    setCopiedCli(true)
    setTimeout(() => setCopiedCli(false), 1400)
  }

  const copyShareLink = (e: React.MouseEvent) => {
    e.stopPropagation()
    const url = `${window.location.origin}${window.location.pathname}?pillar=skills&skill=${skill.id}`
    navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 1400)
  }

  // Minimalist Priority styling
  let priorityBadge = 'bg-[#18181b] text-zinc-400 border-[#27272a]'
  if (skill.priority === 'P0') priorityBadge = 'bg-rose-500/10 text-rose-300 border-rose-500/30'
  if (skill.priority === 'P1') priorityBadge = 'bg-amber-500/10 text-amber-300 border-amber-500/30'
  if (skill.priority === 'P2') priorityBadge = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'

  return (
    <div
      onClick={() => openInspect(skill)}
      className="group rounded-xl border border-[#27272a] bg-[#111114] hover:bg-[#16161a] hover:border-zinc-500 transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between cursor-pointer relative shadow-xs"
    >
      <div>
        {/* Top Header: Category, Priority, Stack Toggle */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 truncate max-w-[170px]">
            {skill.categoryLabel}
          </span>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${priorityBadge}`}>
              {skill.priority}
            </span>

            <button
              onClick={copyShareLink}
              title="Copy Shareable Link"
              className="p-1 rounded-md transition-colors cursor-pointer border bg-[#18181b] text-zinc-400 border-[#27272a] hover:text-white hover:border-zinc-500"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleStack(skill)
              }}
              title={isSavedInStack ? 'Remove from Stack' : 'Save to Stack'}
              className={`p-1 rounded-md transition-colors cursor-pointer border ${
                isSavedInStack
                  ? 'bg-white text-zinc-900 border-white font-bold'
                  : 'bg-[#18181b] text-zinc-400 border-[#27272a] hover:text-white hover:border-zinc-500'
              }`}
            >
              {isSavedInStack ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Skill Name, Avatar & Arrow */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            {avatarUrl && !avatarError ? (
              <img
                src={avatarUrl}
                alt={owner || ''}
                onError={() => setAvatarError(true)}
                className="w-4 h-4 rounded-full border border-[#27272a] bg-[#18181b] shrink-0"
                loading="lazy"
              />
            ) : null}
            <h3 className="text-base font-bold text-zinc-100 group-hover:text-white transition-colors truncate">
              {skill.name}
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0 mt-0.5" />
        </div>

        {/* Upstream Repository Tag */}
        {skill.repo && (
          <div className="mb-2.5">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setRepo(skill.repo!)
              }}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#18181b] hover:bg-zinc-800 border border-[#27272a] hover:border-zinc-600 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              title={`Filter all skills from ${skill.repo}`}
            >
              <GitBranch className="w-3 h-3 text-zinc-400" />
              <span className="font-medium">{skill.repoName || skill.repo}</span>
            </button>
          </div>
        )}

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4">
          {skill.description}
        </p>
      </div>

      {/* Footer Info & 1-Click Copy Commands */}
      <div className="pt-3 border-t border-[#27272a] space-y-2">
        <div className="flex items-center justify-between gap-2">
          {/* Scoped Slash Command Pill */}
          <button
            onClick={copySlashCommand}
            title="Click to copy slash command"
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#18181b] hover:bg-zinc-800 border border-[#27272a] hover:border-zinc-500 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer min-w-0"
          >
            <span className="truncate">/{skill.scoped}</span>
            {copiedSlash ? <Check className="w-3 h-3 text-emerald-400 shrink-0" /> : <Copy className="w-3 h-3 text-zinc-500 shrink-0" />}
          </button>

          {/* Upstream Stars if available */}
          {skill.stars > 0 && (
            <span className="flex items-center gap-1 text-xs font-mono text-zinc-400 shrink-0">
              <Star className="w-3 h-3 fill-amber-400/80 text-amber-400 shrink-0" />
              <span>{skill.stars >= 1000 ? `${(skill.stars / 1000).toFixed(0)}k` : skill.stars}</span>
            </span>
          )}
        </div>

        {/* Official Open Standard CLI copy bar */}
        <div className="flex items-center justify-between gap-2 text-xs text-zinc-500">
          <button
            onClick={copyCliCommand}
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer font-mono text-[11px] min-w-0 flex-1 text-left"
            title={`Copy ${activeAssistant} command: ${activeAssistantCmd}`}
          >
            <Terminal className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">{activeAssistantCmd}</span>
            {copiedCli ? <Check className="w-3 h-3 text-emerald-400 shrink-0" /> : <Copy className="w-3 h-3 text-zinc-500 shrink-0" />}
          </button>

          {skill.repo && (
            <a
              href={`https://github.com/${skill.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-zinc-500 hover:text-zinc-300 p-0.5 transition-colors shrink-0"
              title="Open upstream repository"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
