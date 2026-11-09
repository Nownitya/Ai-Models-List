import React, { useState, useEffect } from 'react'
import { X, Copy, Check, ExternalLink, Bookmark, BookmarkCheck, Star, Code2 } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'

export const SkillDrawer: React.FC = () => {
  const inspectSkill = useSkillStore((s) => s.inspectSkill)
  const closeInspect = useSkillStore((s) => s.closeInspect)
  const stack = useSkillStore((s) => s.stack)
  const toggleStack = useSkillStore((s) => s.toggleStack)
  const setRepo = useSkillStore((s) => s.setRepo)

  const [copiedSlash, setCopiedSlash] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)

  // Close drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && inspectSkill) {
        closeInspect()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [inspectSkill, closeInspect])

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

  // Priority color styling
  let priorityBadge = 'bg-slate-800 text-slate-300 border-slate-700'
  if (inspectSkill.priority === 'P0') priorityBadge = 'bg-red-950 text-red-300 border-red-500/50'
  if (inspectSkill.priority === 'P1') priorityBadge = 'bg-amber-950 text-amber-300 border-amber-500/50'
  if (inspectSkill.priority === 'P2') priorityBadge = 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
  if (inspectSkill.priority === 'P3') priorityBadge = 'bg-indigo-950 text-indigo-300 border-indigo-500/50'

  return (
    <div
      onClick={closeInspect}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg h-full bg-[#0d1117] border-l border-[#21262d] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200"
      >
        <div className="space-y-6">
          {/* Top Bar: Priority, Category, Actions */}
          <div className="flex items-center justify-between pb-4 border-b border-[#21262d]">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-xs font-extrabold border ${priorityBadge}`}>
                {inspectSkill.priority}
              </span>
              <span className="text-xs uppercase font-mono text-slate-400">
                {inspectSkill.categoryLabel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleStack(inspectSkill)}
                title={isSavedInStack ? 'Remove from Stack' : 'Save to Stack'}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isSavedInStack
                    ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800'
                    : 'bg-[#161b22] text-slate-400 border-[#30363d] hover:text-white'
                }`}
              >
                {isSavedInStack ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>

              <button
                onClick={closeInspect}
                className="p-1.5 rounded-lg bg-[#161b22] text-slate-400 border border-[#30363d] hover:text-white cursor-pointer transition-colors"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Skill Title & Description */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
              {inspectSkill.name}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {inspectSkill.description}
            </p>
          </div>

          {/* Quick-Run Commands */}
          <div className="space-y-3.5 bg-[#08090a] p-4 rounded-xl border border-[#21262d]">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span>Slash Command</span>
                <span className="text-xs text-slate-400 font-mono">Agent Chat Trigger</span>
              </div>
              <div className="flex items-center justify-between gap-2 bg-[#161b22] px-3.5 py-2.5 rounded-lg font-mono text-sm text-cyan-300 border border-[#30363d]">
                <span>/{inspectSkill.scoped}</span>
                <button
                  onClick={copySlash}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                  title="Copy Slash Command"
                >
                  {copiedSlash ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span>CLI Installation Command</span>
                <span className="text-xs text-slate-400 font-mono">Terminal Executable</span>
              </div>
              <div className="flex items-center justify-between gap-2 bg-[#161b22] px-3.5 py-2.5 rounded-lg font-mono text-sm text-slate-200 border border-[#30363d]">
                <span className="truncate">{inspectSkill.cli}</span>
                <button
                  onClick={copyCli}
                  className="text-slate-400 hover:text-white p-1 shrink-0 cursor-pointer"
                  title="Copy CLI Command"
                >
                  {copiedCli ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Metadata Specs */}
          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="bg-[#08090a] p-3 rounded-lg border border-[#21262d]">
              <span className="text-slate-400 text-xs uppercase font-bold block mb-1">Upstream Repo</span>
              {inspectSkill.repo ? (
                <a
                  href={`https://github.com/${inspectSkill.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-xs truncate"
                >
                  <span className="truncate">{inspectSkill.repo}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              ) : (
                <span className="text-slate-400 font-mono">Internal Spec</span>
              )}
            </div>

            <div className="bg-[#08090a] p-3 rounded-lg border border-[#21262d]">
              <span className="text-slate-400 text-xs uppercase font-bold block mb-1">GitHub Stars</span>
              {inspectSkill.stars > 0 ? (
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {inspectSkill.stars.toLocaleString()}
                </span>
              ) : (
                <span className="text-slate-400 font-mono">Curated Local</span>
              )}
            </div>

            <div className="bg-[#08090a] p-3 rounded-lg border border-[#21262d]">
              <span className="text-slate-400 text-xs uppercase font-bold block mb-1">Framework Origin</span>
              <span className="text-slate-200 font-semibold text-xs truncate block">{inspectSkill.repoName || 'Agent Specification'}</span>
            </div>

            <div className="bg-[#08090a] p-3 rounded-lg border border-[#21262d]">
              <span className="text-slate-400 text-xs uppercase font-bold block mb-1">Law 4 Independence</span>
              <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1">
                Pure Upstream Spec
              </span>
            </div>
          </div>

          {/* Direct Repo Filter Button */}
          {inspectSkill.repo && (
            <button
              onClick={() => {
                setRepo(inspectSkill.repo!)
                closeInspect()
              }}
              className="w-full py-2.5 px-3.5 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-cyan-300 hover:text-white border border-[#30363d] hover:border-cyan-500/50 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>View all skills from {inspectSkill.repoName || inspectSkill.repo}</span>
            </button>
          )}

          {/* Quick Guidance / Prompt Usage */}
          <div className="bg-[#08090a] p-4 rounded-xl border border-[#21262d] space-y-2">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-200">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Prompt Invocation Pattern</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              To trigger this skill in Google Antigravity, Claude Code, or Codex, enter the slash command directly in your prompt or call the CLI installer to bootstrap the skill folder.
            </p>
            <div className="font-mono text-xs p-3 rounded bg-[#161b22] text-slate-200 border border-[#30363d]">
              {`<system>\nActivate skill /${inspectSkill.scoped}\nFollow strict repo laws.\n</system>`}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#21262d] flex items-center justify-between gap-3">
          <button
            onClick={() => toggleStack(inspectSkill)}
            className={`w-full py-2 px-4 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              isSavedInStack
                ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-800'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {isSavedInStack ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSavedInStack ? 'Remove from My Stack' : 'Add to My Stack'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
