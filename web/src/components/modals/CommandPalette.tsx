import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Search, CornerDownLeft, Sparkles, Smartphone, Zap } from 'lucide-react'
import { useSkillStore } from '@/stores/useSkillStore'
import type { Skill } from '@/types'

export const CommandPalette: React.FC = () => {
  const isCommandPaletteOpen = useSkillStore((s) => s.isCommandPaletteOpen)
  const setCommandPaletteOpen = useSkillStore((s) => s.setCommandPaletteOpen)
  const skills = useSkillStore((s) => s.skills)
  const openInspect = useSkillStore((s) => s.openInspect)
  const setPriority = useSkillStore((s) => s.setPriority)
  const setEcosystem = useSkillStore((s) => s.setEcosystem)

  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Listen for ⌘K or Ctrl+K globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(!isCommandPaletteOpen)
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCommandPaletteOpen, setCommandPaletteOpen])

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isCommandPaletteOpen])

  // Filter skills
  const results = useMemo(() => {
    if (!query.trim()) {
      return skills.filter((s) => s.priority === 'P0').slice(0, 8)
    }
    const q = query.toLowerCase().trim()
    return skills
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.scoped.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.categoryLabel.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [query, skills])

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[selectedIndex]) {
        handleSelectSkill(results[selectedIndex])
      }
    }
  }

  const handleSelectSkill = (skill: Skill) => {
    setCommandPaletteOpen(false)
    openInspect(skill)
  }

  if (!isCommandPaletteOpen) return null

  return (
    <div
      onClick={() => setCommandPaletteOpen(false)}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#09090b] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#27272a]">
          <Search className="w-4 h-4 text-zinc-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command or search 282+ skills..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#18181b] text-zinc-400 border border-[#27272a]">
            ESC
          </kbd>
        </div>

        {/* Quick Action Chips */}
        <div className="px-4 py-2 bg-[#111114] border-b border-[#27272a] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-zinc-500 uppercase font-bold text-[10px] shrink-0">Quick Jumps:</span>
          <button
            onClick={() => {
              setPriority('P0')
              setCommandPaletteOpen(false)
            }}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#18181b] text-rose-300 border border-rose-500/30 hover:border-rose-500/60 cursor-pointer font-medium text-[11px]"
          >
            <Sparkles className="w-3 h-3 text-rose-400" />
            <span>P0 Critical</span>
          </button>
          <button
            onClick={() => {
              setEcosystem('android')
              setCommandPaletteOpen(false)
            }}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#18181b] text-zinc-300 border border-[#27272a] hover:border-zinc-500 cursor-pointer font-medium text-[11px]"
          >
            <Smartphone className="w-3 h-3 text-zinc-400" />
            <span>Android Stack</span>
          </button>
          <button
            onClick={() => {
              setEcosystem('gsd')
              setCommandPaletteOpen(false)
            }}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#18181b] text-zinc-300 border border-[#27272a] hover:border-zinc-500 cursor-pointer font-medium text-[11px]"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>GSD Engine</span>
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-1.5 space-y-0.5">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500">
              No matching skills found for &quot;{query}&quot;.
            </div>
          ) : (
            results.map((skill, index) => {
              const isSelected = index === selectedIndex

              return (
                <div
                  key={skill.uniqueId}
                  onClick={() => handleSelectSkill(skill)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#18181b] text-white' : 'text-zinc-300 hover:bg-[#18181b]/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border shrink-0 ${
                        skill.priority === 'P0'
                          ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                          : 'bg-[#18181b] text-zinc-400 border-[#27272a]'
                      }`}
                    >
                      {skill.priority}
                    </span>
                    <span className="font-semibold text-zinc-100 truncate">{skill.name}</span>
                    <span className="text-[11px] font-mono text-zinc-500 truncate">
                      /{skill.scoped}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-zinc-500 hidden sm:inline">
                      {skill.categoryLabel}
                    </span>
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-zinc-400" />}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#111114] border-t border-[#27272a] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-3">
            <span>
              Use <kbd className="bg-[#18181b] px-1 py-0.2 rounded border border-[#27272a]">↑</kbd>{' '}
              <kbd className="bg-[#18181b] px-1 py-0.2 rounded border border-[#27272a]">↓</kbd> to navigate
            </span>
            <span>
              Press <kbd className="bg-[#18181b] px-1 py-0.2 rounded border border-[#27272a]">↵</kbd> to inspect
            </span>
          </div>
          <span>SkillDock v3.0</span>
        </div>
      </div>
    </div>
  )
}
