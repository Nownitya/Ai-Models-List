import { useMemo } from 'react'
import Fuse from 'fuse.js'
import { useSkillStore } from '@/stores/useSkillStore'

export function useFilteredSkills() {
  const skills = useSkillStore((s) => s.skills)
  const searchQuery = useSkillStore((s) => s.searchQuery)
  const selectedPriority = useSkillStore((s) => s.selectedPriority)
  const selectedCategory = useSkillStore((s) => s.selectedCategory)
  const selectedEcosystem = useSkillStore((s) => s.selectedEcosystem)
  const selectedSort = useSkillStore((s) => s.selectedSort)

  // Configure Fuse.js instance memoized over the master skills list
  const fuse = useMemo(() => {
    return new Fuse(skills, {
      keys: [
        { name: 'name', weight: 0.4 },
        { name: 'scoped', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'categoryId', weight: 0.1 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 2,
    })
  }, [skills])

  // Filter and sort
  const filtered = useMemo(() => {
    let result = skills

    // 1. Text Search
    const q = searchQuery.trim()
    if (q) {
      const cleanSlash = q.startsWith('/') ? q.substring(1).trim() : q
      // Check exact match first
      const exactMatch = skills.filter(
        (s) =>
          s.name.toLowerCase() === cleanSlash.toLowerCase() ||
          s.scoped.toLowerCase() === cleanSlash.toLowerCase() ||
          s.id.toLowerCase() === cleanSlash.toLowerCase()
      )

      if (exactMatch.length > 0) {
        result = exactMatch
      } else {
        result = fuse.search(cleanSlash).map((r) => r.item)
      }
    }

    // 2. Priority Filter
    if (selectedPriority !== 'ALL') {
      result = result.filter((s) => s.priority === selectedPriority)
    }

    // 3. Category Filter
    if (selectedCategory !== 'ALL') {
      result = result.filter((s) => s.categoryId === selectedCategory)
    }

    // 4. Ecosystem Preset Filter
    if (selectedEcosystem !== 'all') {
      result = result.filter((s) => s.ecosystems.includes(selectedEcosystem))
    }

    // 5. Sorting
    const sorted = [...result]
    if (selectedSort === 'stars-desc') {
      sorted.sort((a, b) => b.stars - a.stars)
    } else if (selectedSort === 'stars-asc') {
      sorted.sort((a, b) => a.stars - b.stars)
    } else if (selectedSort === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else if (selectedSort === 'priority-p0-first') {
      const pWeights: Record<string, number> = { P0: 0, P1: 1, P2: 2, P3: 3 }
      sorted.sort((a, b) => (pWeights[a.priority] ?? 9) - (pWeights[b.priority] ?? 9))
    }

    return sorted
  }, [skills, searchQuery, selectedPriority, selectedCategory, selectedEcosystem, selectedSort, fuse])

  return filtered
}
