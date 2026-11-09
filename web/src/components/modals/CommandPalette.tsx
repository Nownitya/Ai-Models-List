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
      // Suggest top P0 skills
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

  // Keyboard navigation within list
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
        className="w-full max-w-xl bg-[#0d1117] border border-[#21262d] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#21262d]">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command or search 274+ skills..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#161b22] text-slate-400 border border-[#30363d]">
            ESC
          </kbd>
        </div>

        {/* Quick Action Chips */}
        <div className="px-4 py-2 bg-[#08090a] border-b border-[#21262d] flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-500 uppercase font-bold text-[9px] shrink-0">Quick Jumps:</span>
          <button
            onClick={() => {
              setPriority('P0')
              setCommandPaletteOpen(false)
            }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#161b22] text-red-300 border border-red-500/30 hover:border-red-500/60 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-red-400" />
            <span>P0 Critical</span>
          </button>
          <button
            onClick={() => {
              setEcosystem('android')
              setCommandPaletteOpen(false)
            }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#161b22] text-slate-300 border border-[#30363d] hover:border-slate-500 cursor-pointer"
          >
            <Smartphone className="w-3 h-3 text-cyan-400" />
            <span>Android Stack</span>
          </button>
          <button
            onClick={() => {
              setEcosystem('gsd')
              setCommandPaletteOpen(false)
            }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#161b22] text-slate-300 border border-[#30363d] hover:border-slate-500 cursor-pointer"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>GSD Engine</span>
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching skills found for "{query}".
            </div>
          ) : (
            results.map((skill, index) => {
              const isSelected = index === selectedIndex

              return (
                <div
                  key={skill.uniqueId}
                  onClick={() => handleSelectSkill(skill)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#161b22] text-white' : 'text-slate-300 hover:bg-[#161b22]/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${
                        skill.priority === 'P0'
                          ? 'bg-red-950 text-red-300 border-red-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {skill.priority}
                    </span>
                    <span className="font-semibold truncate">{skill.name}</span>
                    <span className="text-[10px] font-mono text-cyan-400 truncate">
                      /{skill.scoped}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-500 hidden sm:inline">
                      {skill.categoryLabel}
                    </span>
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-slate-400" />}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#08090a] border-t border-[#21262d] flex items-center justify-between text-[10px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              Use <kbd className="font-mono bg-[#161b22] px-1 py-0.5 rounded border border-[#30363d]">↑</kbd>{' '}
              <kbd className="font-mono bg-[#161b22] px-1 py-0.5 rounded border border-[#30363d]">↓</kbd> to navigate
            </span>
            <span>
              Press <kbd className="font-mono bg-[#161b22] px-1 py-0.5 rounded border border-[#30363d]">↵</kbd> to inspect
            </span>
          </div>
          <span>SkillDock v2.0</span>
        </div>
      </div>
    </div>
  )
}
