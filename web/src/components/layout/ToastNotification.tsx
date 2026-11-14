import React from 'react'
import { useSkillStore } from '@/stores/useSkillStore'
import { Sparkles, X, ArrowUpRight } from 'lucide-react'

export const ToastNotification: React.FC = () => {
  const toast = useSkillStore((s) => s.toast)
  const hideToast = useSkillStore((s) => s.hideToast)

  if (!toast) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-sm sm:max-w-md w-auto flex items-start gap-3 p-3.5 rounded-xl border border-blue-500/30 bg-[#0f172a]/95 text-slate-100 shadow-2xl backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-3 pointer-events-auto"
    >
      <div className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400">
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <div className="text-sm font-semibold text-slate-100 tracking-tight leading-snug">
          {toast.message}
        </div>
        {toast.subtext && (
          <div className="text-xs text-slate-400 mt-0.5 leading-relaxed font-mono">
            {toast.subtext}
          </div>
        )}
        {toast.actionLabel && toast.onAction && (
          <button
            onClick={() => {
              toast.onAction?.()
              hideToast()
            }}
            className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 hover:text-white border border-blue-500/40 transition-colors shadow-sm"
          >
            <span>{toast.actionLabel}</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <button
        onClick={hideToast}
        aria-label="Dismiss notification"
        className="flex-shrink-0 p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-md transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
