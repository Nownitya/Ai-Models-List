import React, { useState } from 'react'
import { Copy, Check, Bookmark, BookmarkCheck, ExternalLink, Star } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { Skill } from '@/types'

interface SkillCardProps {
  skill: Skill
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const [copiedSlash, setCopiedSlash] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)

  const stack = useSkillStore((s) => s.stack)
  const toggleStack = useSkillStore((s) => s.toggleStack)
  const openInspect = useSkillStore((s) => s.openInspect)

  const isSavedInStack = stack.some((s) => s.id === skill.id)

  const copySlashCommand = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`/${skill.scoped}`)
    setCopiedSlash(true)
    setTimeout(() => setCopiedSlash(false), 1400)
  }

  const copyCliCommand = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(skill.cli)
    setCopiedCli(true)
    setTimeout(() => setCopiedCli(false), 1400)
  }

  // Priority color styling
  let priorityBadge = 'bg-slate-800 text-slate-300 border-slate-700'
  if (skill.priority === 'P0') priorityBadge = 'bg-red-950/80 text-red-300 border-red-500/40'
  if (skill.priority === 'P1') priorityBadge = 'bg-amber-950/80 text-amber-300 border-amber-500/40'
  if (skill.priority === 'P2') priorityBadge = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
  if (skill.priority === 'P3') priorityBadge = 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40'

  return (
    <div
      onClick={() => openInspect(skill)}
      className="bg-[#0d1117] hover:bg-[#111620] border border-[#21262d] hover:border-slate-500 rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-colors cursor-pointer h-full relative group"
    >
      <div>
        {/* Top Header: Category, Priority, Stack Toggle */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-mono uppercase font-semibold text-slate-400 truncate max-w-[170px]">
            {skill.categoryLabel}
          </span>

          <div className="flex items-center gap-1.5">
            <span className={`px-2.5 py-0.5 rounded text-xs font-extrabold border ${priorityBadge}`}>
              {skill.priority}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleStack(skill)
              }}
              title={isSavedInStack ? 'Remove from My Stack' : 'Add to My Stack'}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isSavedInStack
                  ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800'
                  : 'bg-[#161b22] text-slate-400 border border-[#30363d] hover:text-white'
              }`}
            >
              {isSavedInStack ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Skill Name */}
        <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2">
          {skill.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-300 line-clamp-3 mb-4 leading-relaxed">
          {skill.description}
        </p>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-3 border-t border-[#21262d] space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Scoped Slash Command Pill */}
          <button
            onClick={copySlashCommand}
            title="Click to copy slash command"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161b22] border border-[#30363d] text-xs font-mono text-cyan-300 hover:border-cyan-500/50 transition-colors cursor-pointer"
          >
            <span>/{skill.scoped}</span>
            {copiedSlash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          {/* Upstream Stars if available */}
          {skill.stars > 0 && (
            <span className="flex items-center gap-1 text-xs font-bold text-amber-400 shrink-0 font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{skill.stars >= 1000 ? `${(skill.stars / 1000).toFixed(0)}k` : skill.stars}</span>
            </span>
          )}
        </div>

        {/* Install CLI copy bar */}
        <div className="flex items-center justify-between gap-1 text-xs text-slate-400">
          <button
            onClick={copyCliCommand}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <span className="text-[11px] text-slate-500 uppercase font-semibold">CLI:</span>
            <span className="font-mono text-xs text-slate-300 truncate max-w-[170px]">
              {skill.cli}
            </span>
            {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          {skill.repo && (
            <a
              href={`https://github.com/${skill.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-slate-400 hover:text-slate-200 p-1"
              title="Open upstream repository"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
