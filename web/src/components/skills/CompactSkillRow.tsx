import React, { useState } from 'react'
import { Copy, Check, Bookmark, BookmarkCheck, Star, GitBranch } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { Skill } from '@/types'

interface CompactSkillRowProps {
  skill: Skill
}

export const CompactSkillRow: React.FC<CompactSkillRowProps> = ({ skill }) => {
  const [copiedSlash, setCopiedSlash] = useState(false)

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

  // Priority badge styling
  let priorityBadge = 'bg-slate-800 text-slate-300 border-slate-700'
  if (skill.priority === 'P0') priorityBadge = 'bg-red-950/70 text-red-300 border-red-500/40'
  if (skill.priority === 'P1') priorityBadge = 'bg-amber-950/70 text-amber-300 border-amber-500/40'
  if (skill.priority === 'P2') priorityBadge = 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
  if (skill.priority === 'P3') priorityBadge = 'bg-indigo-950/70 text-indigo-300 border-indigo-500/40'

  return (
    <div
      onClick={() => openInspect(skill)}
      className="group w-full h-14 bg-[#0d1117] hover:bg-[#161b22] border border-[#21262d] hover:border-slate-500 rounded-lg px-4 flex items-center justify-between gap-3.5 transition-colors cursor-pointer text-sm"
    >
      {/* Left: Priority, Name, Repo, Category, Description Preview */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className={`px-2.5 py-1 rounded text-xs font-extrabold border shrink-0 ${priorityBadge}`}>
          {skill.priority}
        </span>

        <span className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors truncate shrink-0 max-w-[180px] sm:max-w-[220px] text-sm sm:text-base">
          {skill.name}
        </span>

        {/* Upstream Repo Pill */}
        {skill.repo && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setRepo(skill.repo!)
            }}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-[#161b22] hover:bg-slate-800 text-cyan-300 hover:text-white border border-[#30363d] shrink-0 truncate max-w-[140px] cursor-pointer"
            title={`Filter by repository: ${skill.repo}`}
          >
            <GitBranch className="w-3 h-3 text-cyan-400" />
            <span className="truncate">{skill.repoName || skill.repo.split('/')[1]}</span>
          </button>
        )}

        <span className="hidden md:inline text-xs uppercase font-mono px-2 py-0.5 rounded bg-[#161b22] text-slate-300 border border-[#30363d] shrink-0 truncate max-w-[130px]">
          {skill.categoryLabel.split(' ')[1] || skill.categoryLabel}
        </span>

        <span className="hidden lg:inline text-slate-300 truncate flex-1 text-sm">
          {skill.description}
        </span>
      </div>

      {/* Right: Slash Command, Stars, Bookmark */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Scoped Slash Command Button */}
        <button
          onClick={copySlashCommand}
          title="Click to copy slash command"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161b22] border border-[#30363d] text-xs font-mono text-cyan-300 hover:border-cyan-500/50 transition-colors cursor-pointer"
        >
          <span>/{skill.scoped}</span>
          {copiedSlash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {/* Stars */}
        {skill.stars > 0 && (
          <span className="hidden sm:flex items-center gap-1 font-mono text-xs text-amber-400 font-bold w-16 justify-end">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{skill.stars >= 1000 ? `${(skill.stars / 1000).toFixed(0)}k` : skill.stars}</span>
          </span>
        )}

        {/* Bookmark Stack Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleStack(skill)
          }}
          title={isSavedInStack ? 'Remove from My Stack' : 'Save to My Stack'}
          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
            isSavedInStack
              ? 'bg-cyan-950/70 text-cyan-300 border-cyan-800'
              : 'bg-[#161b22] text-slate-400 border-[#30363d] hover:text-white'
          }`}
        >
          {isSavedInStack ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
