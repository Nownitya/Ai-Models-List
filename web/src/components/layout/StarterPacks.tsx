import React, { useState } from 'react'
import { Sparkles, Layers, Check, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { STARTER_PACKS, type StarterPack } from '@/data/starterPacks'
import { useSkillStore } from '@/stores/useSkillStore'

export const StarterPacks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [addedPacks, setAddedPacks] = useState<Record<string, boolean>>({})

  const stack = useSkillStore((s) => s.stack)
  const addStarterPackToStack = useSkillStore((s) => s.addStarterPackToStack)
  const setStackModalOpen = useSkillStore((s) => s.setStackModalOpen)

  const handleAddPack = (pack: StarterPack) => {
    addStarterPackToStack(pack.skillIds)
    setAddedPacks((prev) => ({ ...prev, [pack.id]: true }))
    setTimeout(() => {
      setAddedPacks((prev) => ({ ...prev, [pack.id]: false }))
    }, 2000)
  }

  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-4 pb-1">
      <div className="w-full flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-bold tracking-tight text-slate-200 uppercase tracking-wider">
            Curated Starter Packs
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            1-Click Bundles
          </span>
        </div>

        <div className="flex items-center gap-3">
          {stack.length > 0 && (
            <button
              onClick={() => setStackModalOpen(true)}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Stack ({stack.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800 cursor-pointer transition-colors"
            title={isOpen ? 'Collapse starter packs' : 'Expand starter packs'}
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {STARTER_PACKS.map((pack) => {
            const isJustAdded = addedPacks[pack.id]
            const allInStack = pack.skillIds.every((id) => stack.some((s) => s.id === id || s.uniqueId === id))

            return (
              <div
                key={pack.id}
                className="bg-[#0d1117] border border-[#21262d] rounded-xl p-3.5 flex flex-col justify-between hover:border-slate-600 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{pack.icon}</span>
                      <h3 className="text-sm font-bold text-slate-100">{pack.title}</h3>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60">
                      {pack.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {pack.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {pack.skillIds.map((sid) => (
                      <span
                        key={sid}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#161b22] text-slate-300 border border-[#30363d]"
                      >
                        {sid}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleAddPack(pack)}
                  disabled={allInStack && !isJustAdded}
                  className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    allInStack && !isJustAdded
                      ? 'bg-slate-800/60 text-slate-400 border border-slate-700/50 cursor-default'
                      : isJustAdded
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isJustAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Added to Stack!</span>
                    </>
                  ) : allInStack ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-slate-400" />
                      <span>Pack In Stack</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                      <span>Add Pack ({pack.skillIds.length} skills)</span>
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
