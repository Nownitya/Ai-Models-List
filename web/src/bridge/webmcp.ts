/**
 * WebMCP & Live Browser Agent Bridge
 * Exposes standardized JSON-RPC / MCP endpoints and programmatic APIs on window
 * for browser coding agents (Chrome DevTools, agent-browser, Puppeteer, web extensions).
 */

import { useSkillStore } from '@/stores/useSkillStore'
import { STARTER_PACKS } from '@/data/starterPacks'

export interface McpToolDefinition {
  name: string
  description: string
  inputSchema: {
    type: 'object'
    properties: Record<string, unknown>
    required?: string[]
  }
}

export const WEBMCP_TOOLS: McpToolDefinition[] = [
  {
    name: 'search_skills',
    description: 'Search cataloged AI coding skills by keyword, category, or priority level.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term for name, description, or tags' },
        priority: { type: 'string', enum: ['ALL', 'P0', 'P1', 'P2', 'P3'], description: 'Optional priority filter' },
        limit: { type: 'number', description: 'Maximum number of results (default 10)' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_skill',
    description: 'Get full metadata, instructions, and installation recipes for a specific skill by ID.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Unique skill ID or scoped name' },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_frameworks',
    description: 'List major curated frameworks and tool harnesses (GSD, Superpowers, gstack, ECC, Android, etc.).',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Maximum frameworks to return (default 20)' },
      },
    },
  },
  {
    name: 'get_starter_packs',
    description: 'Get all 8 pre-configured 1-click starter stacks with token savings estimates.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_stack',
    description: 'Retrieve the active user stack of selected AI coding skills.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'add_to_stack',
    description: 'Add one or more skills to the active stack by skill ID.',
    inputSchema: {
      type: 'object',
      properties: {
        skillIds: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of skill IDs to add',
        },
      },
      required: ['skillIds'],
    },
  },
  {
    name: 'load_starter_pack',
    description: 'Load an entire curated starter suite into the active stack in 1 click.',
    inputSchema: {
      type: 'object',
      properties: {
        packId: { type: 'string', description: 'Starter pack ID (e.g. gsd-engine, superpowers-harness, gstack-founder, ecc-ralph-loop, etc.)' },
      },
      required: ['packId'],
    },
  },
  {
    name: 'clear_stack',
    description: 'Clear all skills from the active stack.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'export_stack_cli',
    description: 'Generate runnable CLI installation commands for all skills in the active stack.',
    inputSchema: {
      type: 'object',
      properties: {
        assistant: {
          type: 'string',
          enum: ['antigravity', 'claude', 'codex', 'git'],
          description: 'Target assistant format (defaults to current active assistant)',
        },
      },
    },
  },
]

export function initWebMcpBridge() {
  if (typeof window === 'undefined') return

  const api = {
    // 1. Core Tool Execution (MCP Dispatcher)
    listTools: () => WEBMCP_TOOLS,

    callTool: async (name: string, args: Record<string, any> = {}) => {
      const store = useSkillStore.getState()

      switch (name) {
        case 'search_skills': {
          const q = (args.query || '').toLowerCase().trim()
          const p = (args.priority || 'ALL').toUpperCase()
          const limit = args.limit || 10

          const results = store.skills
            .filter((s) => {
              if (p !== 'ALL' && s.priority !== p) return false
              if (!q) return true
              return (
                s.name.toLowerCase().includes(q) ||
                s.description.toLowerCase().includes(q) ||
                s.id.toLowerCase().includes(q) ||
                s.categoryLabel.toLowerCase().includes(q)
              )
            })
            .slice(0, limit)
            .map((s) => ({
              id: s.id,
              name: s.name,
              priority: s.priority,
              category: s.categoryLabel,
              description: s.description,
              slashCommand: `/${s.scoped}`,
              cli: s.cli,
            }))

          return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] }
        }

        case 'get_skill': {
          const id = (args.id || '').toLowerCase().trim()
          const skill = store.skills.find(
            (s) => s.id.toLowerCase() === id || s.scoped.toLowerCase() === id || s.uniqueId.toLowerCase() === id
          )
          if (!skill) {
            return {
              content: [{ type: 'text', text: `Skill "${args.id}" not found in catalog.` }],
              isError: true,
            }
          }
          return { content: [{ type: 'text', text: JSON.stringify(skill, null, 2) }] }
        }

        case 'list_frameworks': {
          const limit = args.limit || 20
          const frameworks = store.frameworks.slice(0, limit).map((f) => ({
            repo: f.repo,
            repoName: f.repoName,
            skillsCount: f.skillsCount,
            stars: f.stars,
            skills: f.skills.map((s) => ({ id: s.id, name: s.name, priority: s.priority })),
          }))
          return { content: [{ type: 'text', text: JSON.stringify(frameworks, null, 2) }] }
        }

        case 'get_starter_packs': {
          return { content: [{ type: 'text', text: JSON.stringify(STARTER_PACKS, null, 2) }] }
        }

        case 'get_stack': {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    count: store.stack.length,
                    skills: store.stack,
                  },
                  null,
                  2
                ),
              },
            ],
          }
        }

        case 'add_to_stack': {
          const ids: string[] = Array.isArray(args.skillIds) ? args.skillIds : []
          store.addStarterPackToStack(ids)
          return {
            content: [
              {
                type: 'text',
                text: `Successfully added skills to stack. Active stack now has ${useSkillStore.getState().stack.length} items.`,
              },
            ],
          }
        }

        case 'load_starter_pack': {
          const pack = STARTER_PACKS.find(
            (p) => p.id === args.packId || p.title.toLowerCase().includes((args.packId || '').toLowerCase())
          )
          if (!pack) {
            return {
              content: [{ type: 'text', text: `Starter pack "${args.packId}" not found.` }],
              isError: true,
            }
          }
          store.addStarterPackToStack(pack.skillIds)
          return {
            content: [
              {
                type: 'text',
                text: `Loaded starter pack "${pack.title}". Active stack now has ${useSkillStore.getState().stack.length} items.`,
              },
            ],
          }
        }

        case 'clear_stack': {
          store.clearStack()
          return { content: [{ type: 'text', text: 'Stack cleared successfully.' }] }
        }

        case 'export_stack_cli': {
          const currentStack = store.stack
          if (currentStack.length === 0) {
            return { content: [{ type: 'text', text: '# Stack is currently empty.' }] }
          }
          const assistant = args.assistant || store.activeAssistant
          let script = ''

          if (assistant === 'antigravity') {
            script = currentStack.map((s) => `/${s.scoped}`).join('\n')
          } else if (assistant === 'claude' || assistant === 'git') {
            script = currentStack.map((s) => s.officialCli || s.cli).join('\n')
          } else {
            script = currentStack.map((s) => `python scripts/install-to-project.py --skill ${s.scoped}`).join('\n')
          }

          return { content: [{ type: 'text', text: script }] }
        }

        default:
          return {
            content: [{ type: 'text', text: `Unknown WebMCP tool: "${name}"` }],
            isError: true,
          }
      }
    },

    // 2. Convenience JavaScript API
    search: (query: string, limit = 10) => {
      const q = query.toLowerCase()
      return useSkillStore
        .getState()
        .skills.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
        .slice(0, limit)
    },
    getSkill: (id: string) => {
      return useSkillStore.getState().skills.find((s) => s.id === id || s.scoped === id)
    },
    getStack: () => useSkillStore.getState().stack,
    addToStack: (skillIds: string[]) => useSkillStore.getState().addStarterPackToStack(skillIds),
    loadStarterPack: (packId: string) => {
      const pack = STARTER_PACKS.find((p) => p.id === packId)
      if (pack) useSkillStore.getState().addStarterPackToStack(pack.skillIds)
    },
    clearStack: () => useSkillStore.getState().clearStack(),
  }

  // Bind to window for DevTools and Browser Coding Agents
  ;(window as any).__SKILLDOCK_MCP__ = {
    version: '1.0.0',
    listTools: api.listTools,
    callTool: api.callTool,
  }
  ;(window as any).__SKILLDOCK_API__ = api

  // Optional: Listen for postMessage JSON-RPC from parent or iframes
  window.addEventListener('message', async (event) => {
    if (event.data && event.data.type === 'WEBMCP_REQUEST') {
      const { id, method, params } = event.data
      if (method === 'tools/list') {
        window.postMessage(
          { type: 'WEBMCP_RESPONSE', id, result: { tools: api.listTools() } },
          '*'
        )
      } else if (method === 'tools/call') {
        const result = await api.callTool(params?.name, params?.arguments)
        window.postMessage({ type: 'WEBMCP_RESPONSE', id, result }, '*')
      }
    }
  })
}
