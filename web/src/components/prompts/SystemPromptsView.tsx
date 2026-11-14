import React, { useState } from 'react'
import { Sparkles, Copy, Check, Terminal, Brain } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'

export const SystemPromptsView: React.FC = () => {
  const prompts = useSkillStore((s) => s.prompts)
  const [activeSuiteId, setActiveSuiteId] = useState<string>(prompts[0]?.id || '')
  const [copiedSectionIndex, setCopiedSectionIndex] = useState<number | null>(null)

  const activeSuite = prompts.find((p) => p.id === activeSuiteId) || prompts[0]

  const handleCopy = (index: number, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedSectionIndex(index)
    setTimeout(() => setCopiedSectionIndex(null), 1600)
  }

  if (!activeSuite) return null

  return (
    <div className="w-full max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 space-y-6">
      {/* Hero Header */}
      <div className="bg-[#111114] border border-[#27272a] rounded-xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#18181b] text-zinc-300 border border-[#27272a]">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>Battle-Tested System Prompts & Agent Optimization</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frontier Model System Prompts & XML Roles
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Curated role framing, TDD red-green-refactor instructions, bug-hunting protocols,
              and token compression directives. Tested across Gemini 2.0, Claude 3.7, and GPT-4o.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-[#09090b] border border-[#27272a] text-center">
              <div className="text-2xl font-bold font-mono text-zinc-100">{prompts.length}</div>
              <div className="text-[10px] text-zinc-500 uppercase font-semibold">Prompt Suites</div>
            </div>
          </div>
        </div>

        {/* Suite Tabs */}
        <div className="mt-5 pt-5 border-t border-[#27272a] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {prompts.map((suite) => {
            const isActive = suite.id === activeSuite.id
            return (
              <button
                key={suite.id}
                onClick={() => setActiveSuiteId(suite.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 border-zinc-100 font-bold'
                    : 'bg-[#18181b] hover:bg-[#27272a] text-zinc-400 hover:text-zinc-200 border-[#27272a]'
                }`}
              >
                <Brain className="w-3.5 h-3.5 text-zinc-400" />
                <span>{suite.title}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#09090b] text-zinc-400">
                  {suite.promptsCount}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Suite Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs">
          <p className="text-zinc-400">{activeSuite.description}</p>
          <span className="font-mono text-zinc-500 px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a]">
            prompts/{activeSuite.filename}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {activeSuite.sections.map((section, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between bg-[#111114] border border-[#27272a] rounded-xl overflow-hidden shadow-2xs"
            >
              <div className="px-4 py-3 border-b border-[#27272a] flex items-center justify-between gap-3 bg-[#111114]">
                <h3 className="text-xs font-bold text-zinc-100 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>{section.name}</span>
                </h3>
                <button
                  onClick={() => handleCopy(idx, section.content)}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-[#18181b] hover:bg-zinc-800 border border-[#27272a] hover:border-zinc-500 text-[11px] font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy prompt text to clipboard"
                >
                  {copiedSectionIndex === idx ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-mono">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-zinc-500" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 font-mono text-xs text-zinc-300 leading-relaxed bg-[#09090b] overflow-x-auto max-h-[420px] select-all whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
