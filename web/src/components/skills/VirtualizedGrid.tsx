import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { SkillCard } from './SkillCard'
import { CompactSkillRow } from './CompactSkillRow'
import { useSkillStore } from '@/stores/useSkillStore'
import type { Skill } from '@/types'

interface VirtualizedGridProps {
  skills: Skill[]
}

// Responsive column count for grid mode (1 on mobile, 2 on tablet, 3 on desktop, 4 on wide desktop)
function useColumnCount() {
  const [columnCount, setColumnCount] = useState(3)

  useEffect(() => {
    function updateColumns() {
      const width = window.innerWidth
      if (width < 640) setColumnCount(1)
      else if (width < 1024) setColumnCount(2)
      else if (width < 1400) setColumnCount(3)
      else setColumnCount(4)
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  return columnCount
}

export const VirtualizedGrid: React.FC<VirtualizedGridProps> = ({ skills }) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const viewMode = useSkillStore((s) => s.viewMode)
  const responsiveColumns = useColumnCount()

  const columnCount = viewMode === 'rows' ? 1 : responsiveColumns

  // Chunk skills into rows
  const rows = useMemo(() => {
    if (viewMode === 'rows') {
      return skills.map((s) => [s])
    }
    const chunked: Skill[][] = []
    for (let i = 0; i < skills.length; i += columnCount) {
      chunked.push(skills.slice(i, i + columnCount))
    }
    return chunked
  }, [skills, columnCount, viewMode])

  // Virtualizer configured with dynamic item estimate size
  const estimatedRowSize = viewMode === 'rows' ? 56 : 260

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedRowSize,
    overscan: 4,
  })

  if (skills.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400 text-sm mb-1">No matching skills found.</p>
        <p className="text-slate-500 text-xs">Try clearing your search query or selecting a different ecosystem preset.</p>
      </div>
    )
  }

  return (
    <div
      ref={parentRef}
      className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-3 h-[calc(100vh-270px)] overflow-y-auto"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowSkills = rows[virtualRow.index] || []
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className={
                viewMode === 'rows'
                  ? 'pb-1.5'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-3'
              }
            >
              {rowSkills.map((skill) =>
                viewMode === 'rows' ? (
                  <CompactSkillRow key={skill.uniqueId} skill={skill} />
                ) : (
                  <SkillCard key={skill.uniqueId} skill={skill} />
                )
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
