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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#0d1117] border border-[#21262d] rounded-2xl p-6 space-y-5 relative shadow-2xl"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#21262d]">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Priority Taxonomy & Evaluation Guide</span>
          </h2>
          <button
            onClick={() => setPriorityGuideOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-[#161b22] border border-[#30363d] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3.5 text-sm">
          <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30">
            <div className="flex items-center gap-2 font-bold text-red-300 text-sm mb-1.5">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Priority P0 — Critical & Essential Core</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              Foundational capabilities required for any safe, production-grade agent loop: TDD, Systematic Debugging, Paranoia Watchdogs, Repository Invariants, and Dual Matrix Parity.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-sm mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Priority P1 — High Value & Standard Workflow</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              High-frequency capabilities that accelerate daily feature delivery: Architecture modeling, Ralph execution loops, Git worktree isolation, and automated PR review gates.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Priority P2 — Medium Value / On-Demand Enablement</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              Specialized infrastructure tools activated when the project demands them: Benchmarking harnesses, MemPalace semantic memory, AST graph knowledge generation, and Cloud Database migrations.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
            <div className="flex items-center gap-2 font-bold text-indigo-300 text-sm mb-1.5">
              <Bookmark className="w-4 h-4 text-indigo-400" />
              <span>Priority P3 — Optional / Specialized Niche</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              Framework-specific integrations: Android Media3 Cast, CameraX hardware bridges, Wear OS Compose Material3, and specialized SDK migrations.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-[#21262d] text-right">
          <button
            onClick={() => setPriorityGuideOpen(false)}
            className="px-3.5 py-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-slate-200 text-sm font-semibold border border-[#30363d] cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  )
}
