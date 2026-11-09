import React from 'react'
import { Sparkles, Terminal, Layers, Star } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'

export const Header: React.FC = () => {
  const meta = useSkillStore((s) => s.meta)
  const stack = useSkillStore((s) => s.stack)
  const setStackModalOpen = useSkillStore((s) => s.setStackModalOpen)
  const setPriorityGuideOpen = useSkillStore((s) => s.setPriorityGuideOpen)

  const formattedStars = (meta.totalStars / 1_000_000).toFixed(2)

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 py-8 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Pulsating Live Telemetry Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span>Live Dual-Matrix Parity</span>
          <span className="text-slate-500">•</span>
          <span>v1.0.0 Production</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-3">
          AI Coding Skills & Tools Matrix
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mb-8">
          The definitive cross-agent engineering inventory: <strong>{meta.totalSkills}+ skills</strong> across 12 functional categories with verified upstream telemetry.
        </p>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          <div className="glass-panel p-4 rounded-xl text-left border-l-4 border-l-blue-500">
            <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Cataloged</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{meta.totalSkills}</div>
            <div className="text-xs text-slate-500 mt-1">100 Active Engineering Skills</div>
          </div>

          <div
            onClick={() => setPriorityGuideOpen(true)}
            className="glass-panel p-4 rounded-xl text-left border-l-4 border-l-red-500 cursor-pointer hover:border-red-400 transition-colors"
          >
            <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span>Essential (P0)</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-red-400">{meta.p0Count}</div>
            <div className="text-xs text-slate-500 mt-1">Click to view priority guide</div>
          </div>

          <div className="glass-panel p-4 rounded-xl text-left border-l-4 border-l-amber-500">
            <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider mb-1">
              <Star className="w-4 h-4 text-amber-400" />
              <span>Upstream Stars</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">{formattedStars}M+</div>
            <div className="text-xs text-slate-500 mt-1">Verified GitHub telemetry</div>
          </div>

          <div
            onClick={() => setStackModalOpen(true)}
            className="glass-panel p-4 rounded-xl text-left border-l-4 border-l-cyan-500 cursor-pointer hover:border-cyan-400 transition-colors"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>My Stack</span>
              </span>
              {stack.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 font-bold">
                  {stack.length}
                </span>
              )}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">{stack.length}</div>
            <div className="text-xs text-slate-500 mt-1">Click to export stack / bundle</div>
          </div>
        </div>
      </div>
    </header>
  )
}
