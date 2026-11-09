import React, { useState } from 'react'
import { X, Copy, Check, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'

export const SkillInspectModal: React.FC = () => {
  const inspectSkill = useSkillStore((s) => s.inspectSkill)
  const closeInspect = useSkillStore((s) => s.closeInspect)
  const stack = useSkillStore((s) => s.stack)
  const toggleStack = useSkillStore((s) => s.toggleStack)

  const [copiedSlash, setCopiedSlash] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)

  if (!inspectSkill) return null

  const isSavedInStack = stack.some((s) => s.id === inspectSkill.id)

  const copySlash = () => {
    navigator.clipboard.writeText(`/${inspectSkill.scoped}`)
    setCopiedSlash(true)
    setTimeout(() => setCopiedSlash(false), 1400)
  }

  const copyCli = () => {
    navigator.clipboard.writeText(inspectSkill.cli)
    setCopiedCli(true)
    setTimeout(() => setCopiedCli(false), 1400)
  }

  return (
    <div
      onClick={closeInspect}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel w-full max-w-2xl rounded-2xl p-6 sm:p-8 space-y-6 relative border border-slate-700 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={closeInspect}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              {inspectSkill.categoryLabel}
            </span>
            <span className="text-slate-500">•</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-950 text-blue-300 border border-blue-500/40">
              {inspectSkill.priority}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">{inspectSkill.name}</h2>
          <p className="text-sm text-slate-300 leading-relaxed">{inspectSkill.description}</p>
        </div>

        {/* Command Box */}
        <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-1">Slash Command</div>
            <div className="flex items-center justify-between gap-2 bg-slate-900 px-3 py-2 rounded-lg font-mono text-xs text-cyan-300">
              <span>/{inspectSkill.scoped}</span>
              <button onClick={copySlash} className="text-slate-400 hover:text-white p-1">
                {copiedSlash ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-400 mb-1">Installation CLI Command</div>
            <div className="flex items-center justify-between gap-2 bg-slate-900 px-3 py-2 rounded-lg font-mono text-xs text-slate-300">
              <span className="truncate">{inspectSkill.cli}</span>
              <button onClick={copyCli} className="text-slate-400 hover:text-white p-1 shrink-0">
                {copiedCli ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-500 block mb-1">Upstream Repository</span>
            {inspectSkill.repo ? (
              <a
                href={`https://github.com/${inspectSkill.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-mono"
              >
                <span>{inspectSkill.repo}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="text-slate-400">Official / Core Repository</span>
            )}
          </div>

          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-500 block mb-1">Ecosystem Stacks</span>
            <div className="flex flex-wrap gap-1">
              {inspectSkill.ecosystems.map((eco) => (
                <span key={eco} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                  {eco}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => toggleStack(inspectSkill)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
              isSavedInStack
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {isSavedInStack ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSavedInStack ? 'In My Stack' : 'Add to My Stack'}</span>
          </button>

          <button
            onClick={closeInspect}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
