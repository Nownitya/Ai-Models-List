import React from 'react'
import { X, ShieldAlert, Sparkles, CheckCircle2, Bookmark } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'

export const PriorityGuideModal: React.FC = () => {
  const isPriorityGuideOpen = useSkillStore((s) => s.isPriorityGuideOpen)
  const setPriorityGuideOpen = useSkillStore((s) => s.setPriorityGuideOpen)

  if (!isPriorityGuideOpen) return null

  return (
    <div
      onClick={() => setPriorityGuideOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel w-full max-w-xl rounded-2xl p-6 sm:p-8 space-y-6 relative border border-slate-700 shadow-2xl"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Priority Taxonomy & Evaluation Guide</span>
          </h2>
          <button
            onClick={() => setPriorityGuideOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3.5 text-xs">
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40">
            <div className="flex items-center gap-2 font-bold text-red-300 text-sm mb-1">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Priority P0 — Critical & Essential Core</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Foundational capabilities required for any safe, production-grade agent loop: TDD, Systematic Debugging, Paranoia Watchdogs, Repository Invariants, and Dual Matrix Parity.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-sm mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Priority P1 — High Value & Standard Workflow</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              High-frequency capabilities that accelerate daily feature delivery: Architecture modeling, Ralph execution loops, Git worktree isolation, and automated PR review gates.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Priority P2 — Medium Value / On-Demand Enablement</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Specialized infrastructure tools activated when the project demands them: Benchmarking harnesses, MemPalace semantic memory, AST graph knowledge generation, and Cloud Database migrations.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40">
            <div className="flex items-center gap-2 font-bold text-indigo-300 text-sm mb-1">
              <Bookmark className="w-4 h-4 text-indigo-400" />
              <span>Priority P3 — Optional / Specialized Niche</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Framework-specific integrations: Android Media3 Cast, CameraX hardware bridges, Wear OS Compose Material3, and specialized SDK migrations.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-right">
          <button
            onClick={() => setPriorityGuideOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  )
}
