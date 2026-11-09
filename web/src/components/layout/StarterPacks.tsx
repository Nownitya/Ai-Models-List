import React, { useState } from 'react'
import { Sparkles, Layers, Check, ChevronDown, ChevronUp, ArrowRight, GitBranch } from 'lucide-react'
import { STARTER_PACKS, type StarterPack } from '@/data/starterPacks'
import { useSkillStore } from '@/stores/useSkillStore'

export const StarterPacks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [addedPacks, setAddedPacks] = useState<Record<string, boolean>>({})

  const stack = useSkillStore((s) => s.stack)
  const addStarterPackToStack = useSkillStore((s) => s.addStarterPackToStack)
  const setStackModalOpen = useSkillStore((s) => s.setStackModalOpen)
  const setRepo = useSkillStore((s) => s.setRepo)

  const handleAddPack = (pack: StarterPack) => {
    addStarterPackToStack(pack.skillIds)
    setAddedPacks((prev) => ({ ...prev, [pack.id]: true }))
    setTimeout(() => {
      setAddedPacks((prev) => ({ ...prev, [pack.id]: false }))
    }, 2000)
  }

  return (
    <section className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-4 pb-1">
      <div className="w-full flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm sm:text-base font-bold tracking-tight text-slate-100 uppercase tracking-wider">
            Curated Upstream Suites & Starter Packs
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            6 Framework Bundles
          </span>
        </div>

        <div className="flex items-center gap-3">
          {stack.length > 0 && (
            <button
              onClick={() => setStackModalOpen(true)}
              className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Stack ({stack.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer transition-colors"
            title={isOpen ? 'Collapse starter packs' : 'Expand starter packs'}
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {STARTER_PACKS.map((pack) => {
            const isJustAdded = addedPacks[pack.id]
            const allInStack = pack.skillIds.every((id) => stack.some((s) => s.id === id || s.uniqueId === id))

            return (
              <div
                key={pack.id}
                className="bg-[#0d1117] border border-[#21262d] rounded-xl p-3.5 flex flex-col justify-between hover:border-slate-500 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-lg">{pack.icon}</span>
                      <h3 className="text-sm sm:text-base font-bold text-white truncate" title={pack.title}>
                        {pack.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mb-2">
                    <button
                      onClick={() => setRepo(pack.repo)}
                      title={`Filter all skills from ${pack.repo}`}
                      className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-[#161b22] hover:bg-slate-800 text-cyan-300 hover:text-white border border-[#30363d] cursor-pointer truncate max-w-full"
                    >
                      <GitBranch className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{pack.badge}</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-3">
                    {pack.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {pack.skillIds.map((sid) => (
                      <span
                        key={sid}
                        className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#161b22] text-slate-300 border border-[#30363d]"
                      >
                        {sid}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleAddPack(pack)}
                  disabled={allInStack && !isJustAdded}
                  className={`w-full py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    allInStack && !isJustAdded
                      ? 'bg-slate-800/60 text-slate-400 border border-slate-700/50 cursor-default'
                      : isJustAdded
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
                  }`}
                >
                  {isJustAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Added to Stack!</span>
                    </>
                  ) : allInStack ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-slate-500" />
                      <span>In My Stack</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Add Suite ({pack.skillIds.length})</span>
                    </>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
