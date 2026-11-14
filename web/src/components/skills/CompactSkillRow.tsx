import React, { useState } from 'react'
import { Copy, Check, Bookmark, BookmarkCheck, Star, GitBranch, Share2 } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { Skill } from '@/types'

interface CompactSkillRowProps {
  skill: Skill
}

export const CompactSkillRow: React.FC<CompactSkillRowProps> = ({ skill }) => {
  const [copiedSlash, setCopiedSlash] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const stack = useSkillStore((s) => s.stack)
  const toggleStack = useSkillStore((s) => s.toggleStack)
  const openInspect = useSkillStore((s) => s.openInspect)
  const setRepo = useSkillStore((s) => s.setRepo)

  const isSavedInStack = stack.some((s) => s.id === skill.id)

  const copySlashCommand = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`/${skill.scoped}`)
    setCopiedSlash(true)
    setTimeout(() => setCopiedSlash(false), 1400)
  }

  const copyShareLink = (e: React.MouseEvent) => {
    e.stopPropagation()
    const url = `${window.location.origin}${window.location.pathname}?pillar=skills&skill=${skill.id}`
    navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 1400)
  }

  // Priority badge styling
  let priorityBadge = 'bg-[#18181b] text-zinc-400 border-[#27272a]'
  if (skill.priority === 'P0') priorityBadge = 'bg-rose-500/10 text-rose-300 border-rose-500/30'
  if (skill.priority === 'P1') priorityBadge = 'bg-amber-500/10 text-amber-300 border-amber-500/30'
  if (skill.priority === 'P2') priorityBadge = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'

  return (
    <div
      onClick={() => openInspect(skill)}
      className="group w-full h-12 bg-[#111114] hover:bg-[#16161a] border border-[#27272a] hover:border-zinc-500 rounded-lg px-3.5 flex items-center justify-between gap-3 transition-colors cursor-pointer text-xs"
    >
      {/* Left: Priority, Name, Repo, Category, Description Preview */}
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold border shrink-0 ${priorityBadge}`}>
          {skill.priority}
        </span>

        <span className="font-bold text-zinc-100 group-hover:text-white transition-colors truncate shrink-0 max-w-[180px] sm:max-w-[220px] text-xs sm:text-sm">
          {skill.name}
        </span>

        {/* Upstream Repo Pill */}
        {skill.repo && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setRepo(skill.repo!)
            }}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-1.5 py-0.2 rounded bg-[#18181b] hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-[#27272a] shrink-0 truncate max-w-[140px] cursor-pointer"
            title={`Filter by repository: ${skill.repo}`}
          >
            <GitBranch className="w-3 h-3 text-zinc-500" />
            <span className="truncate">{skill.repoName || skill.repo.split('/')[1]}</span>
          </button>
        )}

        <span className="hidden md:inline text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#18181b] text-zinc-500 border border-[#27272a] shrink-0 truncate max-w-[130px]">
          {skill.categoryLabel.split(' ')[1] || skill.categoryLabel}
        </span>

        <span className="hidden lg:inline text-zinc-400 truncate flex-1 text-xs">
          {skill.description}
        </span>
      </div>

      {/* Right: Slash Command, Stars, Bookmark */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={copySlashCommand}
          title="Click to copy slash command"
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#18181b] hover:bg-zinc-800 border border-[#27272a] hover:border-zinc-500 text-[11px] font-mono text-zinc-300 transition-colors cursor-pointer"
        >
          <span>/{skill.scoped}</span>
          {copiedSlash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-500" />}
        </button>

        {skill.stars > 0 && (
          <span className="hidden sm:flex items-center gap-1 font-mono text-[11px] text-zinc-400 w-14 justify-end">
            <Star className="w-3 h-3 fill-amber-400/80 text-amber-400" />
            <span>{skill.stars >= 1000 ? `${(skill.stars / 1000).toFixed(0)}k` : skill.stars}</span>
          </span>
        )}

        <button
          onClick={copyShareLink}
          title="Copy Shareable Link"
          className="p-1 rounded border transition-colors cursor-pointer bg-[#18181b] text-zinc-500 hover:text-white border-[#27272a] hover:border-zinc-500"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleStack(skill)
          }}
          title={isSavedInStack ? 'Remove from Stack' : 'Save to Stack'}
          className={`p-1 rounded border transition-colors cursor-pointer ${
            isSavedInStack
              ? 'bg-white text-zinc-900 border-white'
              : 'bg-[#18181b] text-zinc-500 hover:text-white border-[#27272a] hover:border-zinc-500'
          }`}
        >
          {isSavedInStack ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  )
}
