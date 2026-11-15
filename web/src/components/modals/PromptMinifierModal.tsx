import React, { useState, useMemo } from 'react'
import { Sparkles, Copy, Check, Download, X, ArrowRight, Zap } from 'lucide-react'
import type { SavedStackItem } from '@/types'
import { minifyStackPrompt } from '@/utils/promptMinifier'

interface PromptMinifierModalProps {
  isOpen: boolean
  onClose: () => void
  stack: SavedStackItem[]
}

export const PromptMinifierModal: React.FC<PromptMinifierModalProps> = ({ isOpen, onClose, stack }) => {
  const [activeTab, setActiveTab] = useState<'minified' | 'original'>('minified')
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => minifyStackPrompt(stack), [stack])

  if (!isOpen) return null

  const handleCopy = () => {
    const textToCopy = activeTab === 'minified' ? result.minifiedPrompt : result.originalPrompt
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const handleDownload = () => {
    const textToDownload = activeTab === 'minified' ? result.minifiedPrompt : result.originalPrompt
    const filename = activeTab === 'minified' ? 'system-prompt.min.txt' : 'system-prompt.verbose.txt'
    const blob = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#0c0c0e] border border-[#27272a] rounded-2xl shadow-2xl flex flex-col h-[85vh] max-h-[760px] overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#27272a] bg-[#111114] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Compiled System Prompt Optimizer</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Caveman Pass
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Deduplicates contracts, amputates conversational pleasantries, and compiles high-density telegraphic directives.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1.5 rounded-md bg-[#18181b] border border-[#27272a] hover:border-zinc-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Telemetry Metrics Ribbon */}
        <div className="px-6 py-3 border-b border-[#27272a] bg-[#141417] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span>Original:</span>
              <span className="text-zinc-200 line-through">~{result.originalTokens.toLocaleString()} tokens</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span>Minified:</span>
              <span>~{result.minifiedTokens.toLocaleString()} tokens</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
              -{result.percentSavings}% Savings
            </span>
          </div>

          <div className="flex items-center gap-2 text-zinc-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Saves ~${result.dollarSavingsPerThousandTurns}/1,000 Claude 3.7 turns</span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="px-6 pt-3 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 bg-[#141417] p-1 rounded-lg border border-[#27272a] text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('minified')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                activeTab === 'minified'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Minified Directive (&lt;system&gt;)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('original')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                activeTab === 'original'
                  ? 'bg-zinc-800 text-white font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Original Verbose Prompt
            </button>
          </div>

          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            Preserves 100% of hard invariants &amp; capability bindings
          </span>
        </div>

        {/* Prompt Preview Code Box */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col">
          <div className="flex-1 rounded-xl bg-[#09090b] border border-[#27272a] p-4 overflow-y-auto font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap select-all">
            {activeTab === 'minified' ? result.minifiedPrompt : result.originalPrompt}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-6 py-3.5 border-t border-[#27272a] bg-[#111114] flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181b] hover:bg-zinc-800 text-zinc-300 border border-[#27272a] hover:border-zinc-500 text-xs font-mono transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>Download .txt</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              Done
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs font-mono tracking-wide shadow-md transition-all cursor-pointer active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-zinc-950" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Prompt!' : 'Copy Minified Prompt'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
