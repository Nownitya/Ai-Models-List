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
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Battle-Tested System Prompts & Agent Optimization</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f0f6fc]">
              Frontier Model System Prompts & XML Roles
            </h2>
            <p className="text-sm sm:text-base text-[#8b949e] max-w-3xl leading-relaxed">
              Curated role framing, TDD red-green-refactor instructions, bug-hunting protocols,
              and token compression directives. Tested across Gemini 1.5/2.0, Claude 3.5/3.7, and GPT-4o.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-[#0d1117] border border-[#30363d] text-center">
              <div className="text-2xl font-bold font-mono text-purple-400">{prompts.length}</div>
              <div className="text-xs text-[#8b949e] uppercase font-semibold">Prompt Suites</div>
            </div>
          </div>
        </div>

        {/* Suite Tabs */}
        <div className="mt-6 pt-6 border-t border-[#21262d] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {prompts.map((suite) => {
            const isActive = suite.id === activeSuite.id
            return (
              <button
                key={suite.id}
                onClick={() => setActiveSuiteId(suite.id)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-xs shadow-purple-950/40'
                    : 'bg-[#0d1117]/60 hover:bg-[#0d1117] text-[#8b949e] hover:text-[#c9d1d9] border-[#30363d]/60'
                }`}
              >
                <Brain className="w-4 h-4 text-purple-400" />
                <span>{suite.title}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#161b22] text-[#8b949e]">
                  {suite.promptsCount}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Suite Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#8b949e]">{activeSuite.description}</p>
          <span className="text-xs font-mono text-[#8b949e] px-2.5 py-1 rounded bg-[#161b22] border border-[#30363d]">
            prompts/{activeSuite.filename}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeSuite.sections.map((section, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-[#21262d] flex items-center justify-between gap-3 bg-[#161b22]/90">
                <h3 className="text-sm font-bold text-[#f0f6fc] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{section.name}</span>
                </h3>
                <button
                  onClick={() => handleCopy(idx, section.content)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] text-xs font-medium text-[#c9d1d9] hover:text-[#f0f6fc] transition-colors cursor-pointer"
                  title="Copy prompt text to clipboard"
                >
                  {copiedSectionIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-mono">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-5 font-mono text-xs text-[#c9d1d9] leading-relaxed bg-[#0d1117] overflow-x-auto max-h-[420px] select-all whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
