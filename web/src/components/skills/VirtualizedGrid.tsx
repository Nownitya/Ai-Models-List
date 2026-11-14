import React, { useState, useEffect } from 'react'
import { ChevronDown, SearchX } from 'lucide-react'
import { SkillCard } from './SkillCard'
import { CompactSkillRow } from './CompactSkillRow'
import { useSkillStore } from '@/stores/useSkillStore'
import type { Skill } from '@/types'

const PAGE_SIZE = 20

interface VirtualizedGridProps {
  skills: Skill[]
}

export const VirtualizedGrid: React.FC<VirtualizedGridProps> = ({ skills }) => {
  const viewMode = useSkillStore((s) => s.viewMode)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Reset pagination when filtered skills change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [skills.length, viewMode])

  if (skills.length === 0) {
    return (
      <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-20 text-center">
        <div className="w-12 h-12 rounded-xl bg-[#141417] border border-[#27272a] flex items-center justify-center mx-auto mb-3 text-zinc-500">
          <SearchX className="w-6 h-6" />
        </div>
        <p className="text-zinc-200 text-sm font-semibold mb-1">No matching skills found.</p>
        <p className="text-zinc-500 text-xs">Try clearing your search query or choosing a different ecosystem filter.</p>
      </div>
    )
  }

  const visibleSkills = skills.slice(0, visibleCount)
  const hasMore = skills.length > visibleCount

  return (
    <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 mt-4">
      {/* Cards Grid or Rows */}
      {viewMode === 'rows' ? (
        <div className="space-y-1.5">
          {visibleSkills.map((skill) => (
            <CompactSkillRow key={skill.uniqueId} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {visibleSkills.map((skill) => (
            <SkillCard key={skill.uniqueId} skill={skill} />
          ))}
        </div>
      )}

      {/* Progressive Load More (+20) & Status Footer */}
      {hasMore && (
        <div className="mt-8 mb-8 flex flex-col items-center justify-center gap-2.5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, skills.length))}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18181b] hover:bg-[#27272a] text-zinc-100 hover:text-white border border-[#27272a] hover:border-zinc-500 font-semibold text-xs transition-all shadow-xs cursor-pointer group"
            >
              <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
              <span>Load More Skills (+{PAGE_SIZE})</span>
            </button>

            <button
              onClick={() => setVisibleCount(skills.length)}
              className="px-4 py-2.5 rounded-xl bg-transparent hover:bg-[#18181b] text-zinc-400 hover:text-zinc-200 border border-[#27272a] text-xs font-mono transition-colors cursor-pointer"
            >
              Show All ({skills.length})
            </button>
          </div>

          <p className="text-center text-[11px] font-mono text-zinc-500">
            Showing <strong className="text-zinc-300">{visibleSkills.length}</strong> of{' '}
            <strong className="text-zinc-300">{skills.length}</strong> skills
          </p>
        </div>
      )}

      {!hasMore && skills.length > PAGE_SIZE && (
        <p className="text-center text-xs font-mono text-zinc-500 mt-8 mb-8">
          All {skills.length} skills loaded · Scroll down for directory links and system status
        </p>
      )}
    </div>
  )
}
