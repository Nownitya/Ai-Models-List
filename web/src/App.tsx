import React from 'react'
import { Header } from '@/components/layout/Header'
import { RadarStrip } from '@/components/layout/RadarStrip'
import { FilterToolbar } from '@/components/filters/FilterToolbar'
import { VirtualizedGrid } from '@/components/skills/VirtualizedGrid'
import { SkillInspectModal } from '@/components/modals/SkillInspectModal'
import { StackModal } from '@/components/modals/StackModal'
import { PriorityGuideModal } from '@/components/modals/PriorityGuideModal'
import { useFilteredSkills } from '@/hooks/useFilteredSkills'
import { useSkillStore } from '@/stores/useSkillStore'

export const App: React.FC = () => {
  const filteredSkills = useFilteredSkills()
  const totalSkills = useSkillStore((s) => s.meta.totalSkills)

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Header & Bento Metrics */}
      <Header />

      {/* 2. Live Upstream Radar Strip */}
      <RadarStrip />

      {/* 3. Filter & Search Controls */}
      <FilterToolbar />

      {/* 4. Active Results Counter */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4 flex items-center justify-between text-xs text-slate-400">
        <span>
          Showing <strong>{filteredSkills.length}</strong> of <strong>{totalSkills}</strong> skills
        </span>
        <span className="text-slate-500 hidden sm:inline">
          Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">/</kbd> to search, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Esc</kbd> to clear
        </span>
      </div>

      {/* 5. 60 FPS Virtualized Grid */}
      <main className="flex-1">
        <VirtualizedGrid skills={filteredSkills} />
      </main>

      {/* 6. Modals */}
      <SkillInspectModal />
      <StackModal />
      <PriorityGuideModal />
    </div>
  )
}

export default App
