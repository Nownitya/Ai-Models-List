import React, { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'

export interface CopyButtonProps {
  text: string
  variant?: 'icon' | 'pill' | 'codebar'
  label?: string
  displayPrefix?: string
  title?: string
  className?: string
  iconSize?: string
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
  onCopySuccess?: () => void
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  variant = 'icon',
  label,
  displayPrefix,
  title,
  className = '',
  iconSize = 'w-3.5 h-3.5',
  disabled = false,
  onClick,
  onCopySuccess,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (disabled || !text) return

    if (onClick) onClick(e)

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      if (onCopySuccess) onCopySuccess()
      setTimeout(() => setCopied(false), 1500)
    }).catch(() => {
      // Fallback
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  // Variant 1: Pure Icon Button (Uniform 28x28px hit target, shrink-0)
  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        disabled={disabled}
        title={title || (copied ? 'Copied to clipboard!' : label || 'Copy to clipboard')}
        aria-label={title || label || 'Copy to clipboard'}
        className={`inline-flex items-center justify-center w-7 h-7 rounded-md transition-all duration-150 cursor-pointer shrink-0 border ${
          copied
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
            : 'bg-[#18181b] hover:bg-zinc-800 border-[#27272a] text-zinc-400 hover:text-white hover:border-zinc-500'
        } ${className}`}
      >
        {copied ? (
          <Check className={`${iconSize} text-emerald-400 animate-in zoom-in-75 duration-150`} />
        ) : (
          <Copy className={`${iconSize} transition-transform active:scale-90`} />
        )}
      </button>
    )
  }

  // Variant 2: Monospace Command Pill (e.g. /<command>, auto-truncates text cleanly, keeps copy icon fixed)
  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        disabled={disabled}
        title={title || `Click to copy: ${text}`}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-150 cursor-pointer min-w-0 max-w-full border ${
          copied
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
            : 'bg-[#18181b] hover:bg-zinc-800 border-[#27272a] hover:border-zinc-500 text-zinc-300 hover:text-white'
        } ${className}`}
      >
        <span className="truncate min-w-0 flex-1 text-left font-medium">
          {label || text}
        </span>
        {copied ? (
          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
        ) : (
          <Copy className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
        )}
      </button>
    )
  }

  // Variant 3: Terminal Codebar (full-width prompt, monospace snippet, isolated copy trigger on right)
  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled}
      title={title || `Click to copy command: ${text}`}
      className={`group flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#141417] hover:bg-[#18181c] border border-[#27272a] hover:border-zinc-500/80 text-xs font-mono transition-all duration-150 cursor-pointer min-w-0 text-left ${className}`}
    >
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        {displayPrefix && (
          <span className="text-zinc-500 font-semibold shrink-0 select-none">
            {displayPrefix}
          </span>
        )}
        <span className="text-zinc-300 truncate select-all min-w-0 font-normal">
          {label || text}
        </span>
      </div>

      <div className="shrink-0 pl-1.5 border-l border-[#27272a]/60">
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded transition-colors ${
            copied
              ? 'text-emerald-400 bg-emerald-500/20'
              : 'text-zinc-400 group-hover:text-white group-hover:bg-zinc-800'
          }`}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400 animate-in zoom-in-75 duration-150" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </span>
      </div>
    </button>
  )
}
