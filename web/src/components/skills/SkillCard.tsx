import React, { useState } from 'react'
import { Bookmark, BookmarkCheck, ExternalLink, Star, GitBranch, ArrowUpRight } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { Skill } from '@/types'
import { CopyButton } from '@/components/common/CopyButton'

interface SkillCardProps {
  skill: Skill
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
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

  const shareUrl = `${window.location.origin}${window.location.pathname}?pillar=skills&skill=${skill.id}`

  // Minimalist Priority styling
  let priorityBadge = 'bg-[#18181b] text-zinc-400 border-[#27272a]'
  if (skill.priority === 'P0') priorityBadge = 'bg-rose-500/10 text-rose-300 border-rose-500/30'
  if (skill.priority === 'P1') priorityBadge = 'bg-amber-500/10 text-amber-300 border-amber-500/30'
  if (skill.priority === 'P2') priorityBadge = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'

  return (
    <div
      onClick={() => openInspect(skill)}
      className="group rounded-xl border border-[#27272a] bg-[#111114] hover:bg-[#16161a] hover:border-zinc-500 transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between cursor-pointer relative shadow-xs min-w-0 h-full"
    >
      <div className="flex-1 flex flex-col">
        {/* Top Header: Category, Priority, Stack Toggle */}
        <div className="flex items-center justify-between gap-2 mb-2 min-w-0">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 truncate max-w-[150px] sm:max-w-[170px]">
            {skill.categoryLabel}
          </span>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border shrink-0 ${priorityBadge}`}>
              {skill.priority}
            </span>

            <CopyButton
              variant="icon"
              text={shareUrl}
              title="Copy Shareable Link"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggleStack(skill)
              }}
              title={isSavedInStack ? 'Remove from Stack' : 'Save to Stack'}
              className={`inline-flex items-center justify-center w-7 h-7 rounded-md transition-colors cursor-pointer border shrink-0 ${
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
        <div className="flex items-start justify-between gap-2 mb-1.5 min-w-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
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
          <div className="mb-2.5 min-w-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setRepo(skill.repo!)
              }}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#18181b] hover:bg-zinc-800 border border-[#27272a] hover:border-zinc-600 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer max-w-full"
              title={`Filter all skills from ${skill.repo}`}
            >
              <GitBranch className="w-3 h-3 text-zinc-400 shrink-0" />
              <span className="font-medium truncate">{skill.repoName || skill.repo}</span>
            </button>
          </div>
        )}

        {/* Description (Resilient 2-line clamp with word break) */}
        <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4 break-words">
          {skill.description}
        </p>
      </div>

      {/* Footer Info & 1-Click Copy Commands (Pinned to bottom) */}
      <div className="pt-3 border-t border-[#27272a] space-y-2 mt-auto">
        <div className="flex items-center justify-between gap-2 min-w-0">
          {/* Scoped Slash Command Pill */}
          <CopyButton
            variant="pill"
            text={`/${skill.scoped}`}
            title="Click to copy slash command"
            className="max-w-[180px] sm:max-w-[210px]"
          />

          <div className="flex items-center gap-2 shrink-0">
            {/* Upstream Stars if available */}
            {skill.stars > 0 && (
              <span className="flex items-center gap-1 text-xs font-mono text-zinc-400 shrink-0">
                <Star className="w-3 h-3 fill-amber-400/80 text-amber-400 shrink-0" />
                <span>{skill.stars >= 1000 ? `${(skill.stars / 1000).toFixed(0)}k` : skill.stars}</span>
              </span>
            )}

            {skill.repo && (
              <a
                href={`https://github.com/${skill.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-zinc-500 hover:text-zinc-300 p-0.5 transition-colors shrink-0"
                title="Open upstream repository"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Official Open Standard CLI copy bar */}
        <CopyButton
          variant="codebar"
          text={activeAssistantCmd}
          displayPrefix={activeAssistant === 'antigravity' ? 'AGY:' : 'CLI:'}
          className="w-full"
        />
      </div>
    </div>
  )
}
