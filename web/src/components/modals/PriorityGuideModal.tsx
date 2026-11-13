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
        className="w-full max-w-xl bg-[#09090b] border border-[#27272a] rounded-2xl p-6 space-y-4 relative shadow-2xl"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
          <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-zinc-300" />
            <span>Priority Taxonomy & Evaluation Guide</span>
          </h2>
          <button
            onClick={() => setPriorityGuideOpen(false)}
            className="text-zinc-400 hover:text-white p-1 rounded-md bg-[#18181b] border border-[#27272a] hover:border-zinc-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl bg-[#111114] border border-rose-500/20">
            <div className="flex items-center gap-2 font-bold text-rose-300 text-xs sm:text-sm mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Priority P0 — Critical & Essential Core</span>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs">
              Foundational capabilities required for any safe, production-grade agent loop: TDD, Systematic Debugging, Paranoia Watchdogs, Repository Invariants, and Dual Matrix Parity.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111114] border border-amber-500/20">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-xs sm:text-sm mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Priority P1 — High Value & Standard Workflow</span>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs">
              High-frequency capabilities that accelerate daily feature delivery: Architecture modeling, Ralph execution loops, Git worktree isolation, and automated PR review gates.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111114] border border-emerald-500/20">
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-xs sm:text-sm mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Priority P2 — Medium Value / On-Demand Enablement</span>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs">
              Specialized infrastructure tools activated when the project demands them: Benchmarking harnesses, MemPalace semantic memory, AST graph knowledge generation, and Cloud Database migrations.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111114] border border-[#27272a]">
            <div className="flex items-center gap-2 font-bold text-zinc-300 text-xs sm:text-sm mb-1">
              <Bookmark className="w-4 h-4 text-zinc-400" />
              <span>Priority P3 — Experimental & Specialized Extensions</span>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs">
              Niche domain tools, novel agent experiments, and platform-specific drivers: XR display glasses, specialized BigQuery transforms, and hardware projection bridges.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setPriorityGuideOpen(false)}
            className="px-4 py-1.5 rounded-md bg-[#18181b] hover:bg-zinc-800 text-xs font-semibold text-zinc-200 border border-[#27272a] hover:border-zinc-500 transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
