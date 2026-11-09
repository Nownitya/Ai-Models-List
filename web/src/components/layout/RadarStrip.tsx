import React, { useMemo } from 'react'
import { Activity, Star, ExternalLink } from 'lucide-react'
import rawMetrics from '@/data/github-metrics.json'

interface RepoMetric {
  repo: string
  name: string
  html_url: string
  stars: number
  stars_formatted: string
  last_updated?: string
}

export const RadarStrip: React.FC = () => {
  const topRepos = useMemo(() => {
    const repos = Object.values(rawMetrics.repositories || {}) as RepoMetric[]
    return repos
      .filter((r) => r.stars > 0)
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 15)
  }, [])

  if (topRepos.length === 0) return null

  return (
    <div className="border-b border-slate-800 bg-slate-900/50 overflow-hidden py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 shrink-0">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Radar:</span>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth text-xs whitespace-nowrap">
          {topRepos.map((repo) => (
            <a
              key={repo.repo}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-colors border border-slate-700/50"
            >
              <span className="font-medium">{repo.name}</span>
              <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {repo.stars_formatted || repo.stars.toLocaleString()}
              </span>
              <ExternalLink className="w-3 h-3 text-slate-500 opacity-60" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
