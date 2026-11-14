import React, { useState, useEffect } from 'react'
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Star,
  Code2,
  ArrowUpRight,
  Terminal,
  Cpu,
  Share2
} from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { AssistantType } from '@/types'

export const SkillDrawer: React.FC = () => {
  const inspectSkill = useSkillStore((s) => s.inspectSkill)
  const closeInspect = useSkillStore((s) => s.closeInspect)
  const stack = useSkillStore((s) => s.stack)
  const toggleStack = useSkillStore((s) => s.toggleStack)
  const setRepo = useSkillStore((s) => s.setRepo)
  const activeAssistant = useSkillStore((s) => s.activeAssistant)

  const [activeAssistantTab, setActiveAssistantTab] = useState<AssistantType>(activeAssistant)
  const [copiedSlash, setCopiedSlash] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)
  const [copiedRecipe, setCopiedRecipe] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  // Sync with global assistant selector from header
  useEffect(() => {
    setActiveAssistantTab(activeAssistant)
  }, [activeAssistant])

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

  const officialNpx = inspectSkill.repo
    ? `npx skills add ${inspectSkill.repo} --skill ${inspectSkill.id}`
    : `python scripts/install-to-project.py --skill ${inspectSkill.scoped}`

  const getRecipeContent = (tab: AssistantType): { label: string; command: string; hint: string } => {
    switch (tab) {
      case 'antigravity':
        return {
          label: 'Antigravity Chat Slash Command',
          command: `/${inspectSkill.scoped}`,
          hint: `Run in Antigravity chat, or install via: python scripts/install-to-project.py --skill ${inspectSkill.scoped}`
        }
      case 'claude':
        return {
          label: 'Claude Code Activation',
          command: officialNpx,
          hint: `Linux Foundation open standard CLI or MCP Server: python scripts/mcp_server.py`
        }
      case 'codex':
        return {
          label: 'Codex / Cursor Agent Execution',
          command: `python scripts/setup-project-agents.py --skill ${inspectSkill.scoped}`,
          hint: `Configured in .agents/skills/${inspectSkill.categoryId}/${inspectSkill.id}/SKILL.md`
        }
      case 'git':
        return {
          label: 'Official Open Standard CLI',
          command: officialNpx,
          hint: `Run directly in terminal to install this skill into your local workspace.`
        }
    }
  }

  const recipe = getRecipeContent(activeAssistantTab)

  const copyRecipe = () => {
    navigator.clipboard.writeText(`${recipe.command}\n# ${recipe.hint}`)
    setCopiedRecipe(true)
    setTimeout(() => setCopiedRecipe(false), 1400)
  }

  const copyShareLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?pillar=skills&skill=${inspectSkill.id}`
    navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 1600)
  }

  let priorityBadge = 'bg-[#18181b] text-zinc-400 border-[#27272a]'
  if (inspectSkill.priority === 'P0') priorityBadge = 'bg-rose-500/10 text-rose-300 border-rose-500/30'
  if (inspectSkill.priority === 'P1') priorityBadge = 'bg-amber-500/10 text-amber-300 border-amber-500/30'
  if (inspectSkill.priority === 'P2') priorityBadge = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'

  return (
    <div
      onClick={closeInspect}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg h-full bg-[#09090b] border-l border-[#27272a] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200"
      >
        <div className="space-y-5">
          {/* Top Bar: Priority, Category, Actions */}
          <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${priorityBadge}`}>
                {inspectSkill.priority}
              </span>
              <span className="text-xs uppercase font-mono text-zinc-500">
                {inspectSkill.categoryLabel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyShareLink}
                title="Copy Shareable Link"
                className="p-1.5 rounded-md bg-[#18181b] text-zinc-400 border border-[#27272a] hover:text-white hover:border-zinc-500 cursor-pointer transition-colors"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => toggleStack(inspectSkill)}
                title={isSavedInStack ? 'Remove from Stack' : 'Save to Stack'}
                className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                  isSavedInStack
                    ? 'bg-white text-zinc-900 border-white font-bold'
                    : 'bg-[#18181b] text-zinc-400 border-[#27272a] hover:text-white hover:border-zinc-500'
                }`}
              >
                {isSavedInStack ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>

              <button
                onClick={closeInspect}
                className="p-1.5 rounded-md bg-[#18181b] text-zinc-400 border border-[#27272a] hover:text-white hover:border-zinc-500 cursor-pointer transition-colors"
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
            <p className="text-sm text-zinc-400 leading-relaxed">
              {inspectSkill.description}
            </p>
          </div>

          {/* Multi-Assistant Recipe Switcher (Tabs) */}
          <div className="rounded-xl border border-[#27272a] bg-[#111114] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-zinc-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                <span>Assistant Setup Recipe</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Target IDE</span>
            </div>

            {/* Assistant Tabs Ribbon */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#09090b] rounded-lg border border-[#27272a]">
              {(
                [
                  { id: 'antigravity', label: 'Antigravity', icon: '⚡' },
                  { id: 'claude', label: 'Claude', icon: '🧠' },
                  { id: 'codex', label: 'Codex', icon: '🤖' },
                  { id: 'git', label: 'CLI', icon: '💻' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveAssistantTab(tab.id)}
                  className={`py-1.5 text-center text-xs font-mono rounded-md transition-all cursor-pointer ${
                    activeAssistantTab === tab.id
                      ? 'bg-zinc-800 text-white font-bold border border-zinc-700 shadow-2xs'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <span className="mr-1">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Recipe Content Box */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>{recipe.label}</span>
                <button
                  onClick={copyRecipe}
                  className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy full setup command"
                >
                  {copiedRecipe ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 bg-[#18181b] px-3 py-2 rounded-md font-mono text-xs text-zinc-200 border border-[#27272a]">
                <span className="truncate">{recipe.command}</span>
                <button
                  onClick={copySlash}
                  className="text-zinc-500 hover:text-white p-0.5 cursor-pointer shrink-0"
                  title="Copy Command"
                >
                  {copiedSlash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 font-mono leading-relaxed">
                {recipe.hint}
              </p>
            </div>
          </div>

          {/* Quick-Run Terminal Executable */}
          <div className="space-y-2 bg-[#111114] p-4 rounded-xl border border-[#27272a]">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span>CLI Installation Command</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Stand-alone Script</span>
            </div>
            <div className="flex items-center justify-between gap-2 bg-[#18181b] px-3 py-2 rounded-md font-mono text-xs text-zinc-300 border border-[#27272a]">
              <span className="truncate">{inspectSkill.cli}</span>
              <button
                onClick={copyCli}
                className="text-zinc-500 hover:text-white p-0.5 shrink-0 cursor-pointer"
                title="Copy CLI Command"
              >
                {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Metadata Specs Grid */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="bg-[#111114] p-3 rounded-lg border border-[#27272a]">
              <span className="text-zinc-500 text-[10px] uppercase font-bold block mb-1">Upstream Repo</span>
              {inspectSkill.repo ? (
                <a
                  href={`https://github.com/${inspectSkill.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 hover:underline flex items-center gap-1 font-mono text-xs truncate"
                >
                  <span className="truncate">{inspectSkill.repo}</span>
                  <ExternalLink className="w-3 h-3 shrink-0 text-zinc-500" />
                </a>
              ) : (
                <span className="text-zinc-500 font-mono">Internal Spec</span>
              )}
            </div>

            <div className="bg-[#111114] p-3 rounded-lg border border-[#27272a]">
              <span className="text-zinc-500 text-[10px] uppercase font-bold block mb-1">GitHub Stars</span>
              {inspectSkill.stars > 0 ? (
                <span className="text-amber-400 font-bold flex items-center gap-1 font-mono">
                  <Star className="w-3 h-3 fill-amber-400/80" />
                  {inspectSkill.stars.toLocaleString()}
                </span>
              ) : (
                <span className="text-zinc-500 font-mono">Curated Local</span>
              )}
            </div>

            <div className="bg-[#111114] p-3 rounded-lg border border-[#27272a]">
              <span className="text-zinc-500 text-[10px] uppercase font-bold block mb-1">Origin</span>
              <span className="text-zinc-300 font-medium text-xs truncate block">{inspectSkill.repoName || 'Agent Specification'}</span>
            </div>

            <div className="bg-[#111114] p-3 rounded-lg border border-[#27272a]">
              <span className="text-zinc-500 text-[10px] uppercase font-bold block mb-1">Governance</span>
              <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1">
                Law 4 Independent
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
              className="w-full py-2 px-3 rounded-md bg-[#111114] hover:bg-[#18181b] text-zinc-300 hover:text-white border border-[#27272a] hover:border-zinc-500 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>View all skills from {inspectSkill.repoName || inspectSkill.repo}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Prompt Invocation Pattern */}
          <div className="bg-[#111114] p-4 rounded-xl border border-[#27272a] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
              <Code2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Prompt Invocation Pattern</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              To trigger this skill in any coding agent, place the slash command directly in your prompt block:
            </p>
            <div className="font-mono text-xs p-3 rounded-md bg-[#18181b] text-zinc-300 border border-[#27272a]">
              {`<system>\nActivate skill /${inspectSkill.scoped}\nFollow strict repository laws.\n</system>`}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#27272a] flex items-center justify-between gap-3">
          <button
            onClick={() => toggleStack(inspectSkill)}
            className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              isSavedInStack
                ? 'bg-[#18181b] text-zinc-300 border border-[#27272a]'
                : 'bg-white text-zinc-900 font-bold hover:bg-zinc-200'
            }`}
          >
            {isSavedInStack ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSavedInStack ? 'Remove from Stack' : 'Save to Stack'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
