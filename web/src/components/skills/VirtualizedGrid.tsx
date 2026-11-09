import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { SkillCard } from './SkillCard'
import type { Skill } from '@/types'

interface VirtualizedGridProps {
  skills: Skill[]
}

// Hook to determine responsive column count (1 on mobile, 2 on tablet, 3 on desktop)
function useColumnCount() {
  const [columnCount, setColumnCount] = useState(3)

  useEffect(() => {
    function updateColumns() {
      const width = window.innerWidth
      if (width < 640) setColumnCount(1)
      else if (width < 1024) setColumnCount(2)
      else setColumnCount(3)
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  return columnCount
}

export const VirtualizedGrid: React.FC<VirtualizedGridProps> = ({ skills }) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const columnCount = useColumnCount()

  // Safeguard 8: Chunk skills array into rows of columnCount
  const rows = useMemo(() => {
    const chunked: Skill[][] = []
    for (let i = 0; i < skills.length; i += columnCount) {
      chunked.push(skills.slice(i, i + columnCount))
    }
    return chunked
  }, [skills, columnCount])

  // Safeguard 6: Virtualizer with estimated row height
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 260,
    overscan: 3,
  })

  if (skills.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400 text-lg mb-2">No matching skills found.</p>
        <p className="text-slate-500 text-sm">Try clearing your search query or selecting a different ecosystem preset.</p>
      </div>
    )
  }

  return (
    <div
      ref={parentRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 h-[calc(100vh-280px)] overflow-y-auto"
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4"
            >
              {rowSkills.map((skill) => (
                <SkillCard key={skill.uniqueId} skill={skill} />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
