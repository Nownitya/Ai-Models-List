import { test, expect } from '@playwright/test'

test.describe('SkillDock Web 3.0 Platform & Agent Bridge E2E Suite', () => {
  test('01: Page Load & Architectural Shell', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/SkillDock/)

    // Verify Brand Logo
    const brand = page.locator('header').getByText('SkillDock')
    await expect(brand).toBeVisible()

    // Verify 4 Pillars Navigation
    await expect(page.getByRole('button', { name: /Skills & Suites/i }).first()).toBeVisible()
    await expect(page.getByRole('button', { name: /Marketplace/i }).first()).toBeVisible()
    await expect(page.getByRole('button', { name: /Docs/i }).first()).toBeVisible()
  })

  test('02: 1-Click Starter Stacks & Tactile Toast Feedback', async ({ page }) => {
    await page.goto('/')

    // Clear any previous stack in localStorage
    await page.evaluate(() => localStorage.removeItem('ai_skills_stack_v2'))
    await page.reload()

    // Locate GSD Autonomous Wave Suite 1-Click button
    const gsdCard = page.locator('text=GSD Autonomous Wave Suite').locator('xpath=ancestor::div[contains(@class, "rounded-lg")]')
    const loadButton = gsdCard.getByRole('button', { name: /1-Click Load Stack/i })
    await expect(loadButton).toBeVisible()
    await loadButton.click()

    // Verify Toast Notification Banner
    const toast = page.locator('div[role="status"]')
    await expect(toast).toBeVisible()
    await expect(toast).toContainText('Loaded Starter Pack')
    await expect(toast).toContainText('~82% token savings active')

    // Verify Topbar Stack Counter Badge
    const stackBadge = page.locator('header').getByRole('button', { name: /^Stack/i }).locator('span').filter({ hasText: '5' })
    await expect(stackBadge).toBeVisible()

    // Button should now show "Loaded in Stack"
    await expect(gsdCard.getByText('Loaded in Stack')).toBeVisible()
  })

  test('03: Viral Stack URL Deep Linking (?stack=...)', async ({ page }) => {
    // Navigate with shared stack parameter
    await page.goto('/?stack=taste-skill,unslop,systematic-debugging')

    // Verify Toast confirms shared stack loaded
    const toast = page.locator('div[role="status"]')
    await expect(toast).toBeVisible()
    await expect(toast).toContainText('Loaded Shared Stack (3 skills)')

    // Verify Topbar Stack counter displays 3
    const stackBadge = page.locator('header').getByRole('button', { name: /^Stack/i }).locator('span').filter({ hasText: '3' })
    await expect(stackBadge).toBeVisible()
  })

  test('04: WebMCP Diagnostic Console & Client-Side Agent Bridge', async ({ page }) => {
    await page.goto('/')

    // Verify window.__SKILLDOCK_MCP__ bridge is exposed
    const isMcpExposed = await page.evaluate(() => typeof (window as any).__SKILLDOCK_MCP__?.callTool === 'function')
    expect(isMcpExposed).toBe(true)

    // Direct programmatic tool execution test
    const searchResult = await page.evaluate(async () => {
      const res = await (window as any).__SKILLDOCK_MCP__.callTool('search_skills', { query: 'taste-skill', limit: 5 })
      return JSON.parse(res.content[0].text)
    })
    expect(searchResult.length).toBeGreaterThan(0)
    expect(searchResult.some((s: any) => s.id === 'taste-skill')).toBe(true)

    // UI Verification: Open WebMCP Diagnostic Console
    const webMcpBtn = page.getByRole('button', { name: /WebMCP/i }).first()
    await expect(webMcpBtn).toBeVisible()
    await webMcpBtn.click()

    // Modal should be open
    await expect(page.getByText('WebMCP Live Agent Diagnostic Console')).toBeVisible()

    // Click Execute Tool Call
    const execBtn = page.getByRole('button', { name: /Execute Tool Call/i })
    await execBtn.click()

    // Response should render with 200 OK
    await expect(page.getByText('200 OK')).toBeVisible()

    // Close modal with Escape
    await page.keyboard.press('Escape')
    await expect(page.getByText('WebMCP Live Agent Diagnostic Console')).not.toBeVisible()
  })

  test('05: Live SKILL.md Rule & Prompt Previewer Drawer', async ({ page }) => {
    await page.goto('/?pillar=skills&skill=taste-skill')

    // Drawer should automatically open via deep-link
    await expect(page.getByRole('heading', { name: 'taste-skill', level: 2 })).toBeVisible()

    // Switch to Instructions (SKILL.md) tab
    const skillMdTab = page.getByRole('button', { name: /Instructions \(SKILL\.md\)/i })
    await expect(skillMdTab).toBeVisible()
    await skillMdTab.click()

    // Verify YAML Frontmatter is displayed
    await expect(page.getByText('1. YAML Frontmatter')).toBeVisible()
    await expect(page.locator('pre').filter({ hasText: 'name: taste-skill' })).toBeVisible()

    // Verify Copy SKILL.md button exists
    await expect(page.getByRole('button', { name: /Copy SKILL\.md/i })).toBeVisible()

    // Close drawer
    await page.keyboard.press('Escape')
  })

  test('06: Multi-Agent Swarm Manifest & Swarm Brief Export', async ({ page }) => {
    await page.goto('/?stack=taste-skill,unslop,systematic-debugging')

    // Programmatic WebMCP tool call: export_swarm_manifest
    const swarmJson = await page.evaluate(async () => {
      const res = await (window as any).__SKILLDOCK_MCP__.callTool('export_swarm_manifest', { format: 'manifest' })
      return JSON.parse(res.content[0].text)
    })
    expect(swarmJson.version).toBe('1.0.0')
    expect(swarmJson.orchestration.antigravity.workers.length).toBeGreaterThan(0)
    expect(swarmJson.orchestration.antigravity.coordinator.name).toBe('coordinator')

    // Open Stack Modal from topbar
    const stackBtn = page.locator('header button[title="Open Selected Skills Stack"]')
    await stackBtn.click()

    // Verify Swarm Manifest download button exists
    const swarmManifestBtn = page.getByRole('button', { name: /Swarm Manifest/i })
    await expect(swarmManifestBtn).toBeVisible()

    // Verify Copy Swarm Brief button exists and click it
    const copyBriefBtn = page.getByRole('button', { name: /Copy Swarm Brief/i })
    await expect(copyBriefBtn).toBeVisible()
    await copyBriefBtn.click()

    // Verify tactile button state change
    await expect(page.getByText('Copied Swarm Brief!')).toBeVisible()

    // Close modal
    await page.keyboard.press('Escape')
  })

  test('07: Interactive Multi-Agent Swarm Topology Visualizer & Role Partitioning', async ({ page }) => {
    await page.goto('/?stack=taste-skill,unslop,systematic-debugging,writing-plans')

    // Open Stack Modal
    const stackBtn = page.locator('header button[title="Open Selected Skills Stack"]')
    await stackBtn.click()

    // Switch to Multi-Agent Swarm Topology View
    const swarmTab = page.getByRole('button', { name: /Multi-Agent Swarm Topology/i })
    await expect(swarmTab).toBeVisible()
    await swarmTab.click()

    // Verify Coordinator card
    await expect(page.getByText('@coordinator')).toBeVisible()
    await expect(page.getByText('claude-3-7-sonnet').first()).toBeVisible()

    // Verify 3 Worker columns
    await expect(page.getByText('@architect')).toBeVisible()
    await expect(page.getByText('@builder')).toBeVisible()
    await expect(page.getByText('@verifier')).toBeVisible()

    // Verify skills are partitioned into the cards inside the modal
    const modal = page.locator('.fixed.inset-0')
    await expect(modal.getByText('/superpowers-systematic-debugging')).toBeVisible()
    await expect(modal.getByText('/superpowers-writing-plans')).toBeVisible()

    // Switch back to Skills List
    const listTab = page.getByRole('button', { name: /Skills List/i })
    await expect(listTab).toBeVisible()
    await listTab.click()
    await expect(modal.getByText('/ui-taste-skill')).toBeVisible()

    // Close modal
    await page.keyboard.press('Escape')
  })

  test('08: Universal Multi-IDE & Claude Desktop Config Exporters', async ({ page }) => {
    await page.goto('/?stack=taste-skill,unslop,systematic-debugging')

    // 1. Verify Stack Modal Multi-IDE Exporters
    const stackBtn = page.locator('header button[title="Open Selected Skills Stack"]')
    await stackBtn.click()

    await expect(page.getByRole('button', { name: /\.windsurfrules/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /\.clinerules/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /copilot-instructions/i })).toBeVisible()

    await page.keyboard.press('Escape')

    // 2. Verify Marketplace Claude Desktop MCP Config Export
    await page.goto('/?pillar=marketplace')

    const exportDesktopBtn = page.getByRole('button', { name: /Export claude_desktop_config\.json/i })
    await expect(exportDesktopBtn).toBeVisible()

    // Verify individual Desktop JSON snippet copy button
    const snippetBtn = page.getByRole('button', { name: /Desktop JSON/i }).first()
    await expect(snippetBtn).toBeVisible()
  })

  test('09: Universal Marketplace Discovery, 5-Way Ecosystem Filtering & Live Connector Search', async ({ page }) => {
    await page.goto('/')

    // 1. Click Marketplace tab in header
    const marketplaceBtn = page.getByRole('button', { name: /Marketplace/i }).first()
    await expect(marketplaceBtn).toBeVisible()
    await marketplaceBtn.click()

    // 2. Verify Marketplace Directory Header & Listings Counter
    await expect(page.getByText('Universal AI Marketplace Directory')).toBeVisible()
    await expect(page.getByText('1,689 Listings')).toBeVisible()

    // 3. Test 5-Way Target Ecosystem Filter Ribbon
    const claudeFilter = page.getByRole('button', { name: /Claude & MCP/i })
    await expect(claudeFilter).toBeVisible()
    await claudeFilter.click()
    await expect(claudeFilter).toHaveClass(/border-orange-500/)

    const chatgptFilter = page.getByRole('button', { name: /ChatGPT Actions/i })
    await expect(chatgptFilter).toBeVisible()
    await chatgptFilter.click()
    await expect(chatgptFilter).toHaveClass(/border-emerald-500/)

    const antigravityFilter = page.getByRole('button', { name: /Google Antigravity/i })
    await expect(antigravityFilter).toBeVisible()
    await antigravityFilter.click()
    await expect(antigravityFilter).toHaveClass(/border-blue-500/)

    // Reset back to All Ecosystems
    const allEcosystems = page.getByRole('button', { name: /All Ecosystems/i })
    await allEcosystems.click()

    // 4. Test 3 Sub-Tabs: MCP Connectors, Coding Plugins, AI Agents & Platforms
    const pluginsTab = page.getByRole('button', { name: /Coding Plugins/i })
    await pluginsTab.click()
    await expect(page.getByPlaceholder(/Search 530 plugins/i)).toBeVisible()

    const agentsTab = page.getByRole('button', { name: /AI Agents & Platforms/i })
    await agentsTab.click()
    await expect(page.getByPlaceholder(/Search 33 enterprise AI platforms/i)).toBeVisible()

    const connectorsTab = page.getByRole('button', { name: /MCP Connectors/i })
    await connectorsTab.click()
    await expect(page.getByPlaceholder(/Search 1,126 MCP servers/i)).toBeVisible()

    // 5. Test Live Connector Search (e.g. Google Drive)
    const searchInput = page.getByPlaceholder(/Search 1,126 MCP servers/i)
    await searchInput.fill('Google Drive')
    await expect(page.getByRole('heading', { name: 'Google Drive', level: 3 })).toBeVisible()
    await expect(page.getByText('drivemcp.googleapis.com').first()).toBeVisible()

    // Verify Desktop JSON button exists for Google Drive
    const driveCard = page.locator('div.rounded-lg').filter({ hasText: 'Google Drive' }).first()
    await expect(driveCard.getByRole('button', { name: /Desktop JSON/i })).toBeVisible()

    // Clear search
    await searchInput.fill('')
  })

  test('10: Project Auto-Stack Recommender & Zero-Guesswork Stack Assembly', async ({ page }) => {
    await page.goto('/')

    // Clear previous stack
    await page.evaluate(() => localStorage.removeItem('ai_skills_stack_v2'))
    await page.reload()

    // 1. Open Recommender Modal via Header button
    const autoStackBtn = page.locator('header').getByRole('button', { name: /Auto-Stack/i })
    await expect(autoStackBtn).toBeVisible()
    await autoStackBtn.click()

    // 2. Verify Modal Title & Subtitle
    await expect(page.getByText('Project Auto-Stack Recommender')).toBeVisible()
    await expect(page.getByText('Zero Guesswork')).toBeVisible()

    // 3. Load Sample Preset: Next.js + Tailwind + Prisma
    const nextPreset = page.getByRole('button', { name: /Next\.js \+ Tailwind \+ Prisma/i })
    await expect(nextPreset).toBeVisible()
    await nextPreset.click()

    // 4. Verify Detected Tech Badges
    await expect(page.getByText('React / Next.js', { exact: true })).toBeVisible()
    await expect(page.getByText('Tailwind CSS', { exact: true })).toBeVisible()
    await expect(page.getByText('Prisma ORM', { exact: true })).toBeVisible()

    // 5. Verify Recommended Skills List
    await expect(page.getByText('/ui-taste-skill').first()).toBeVisible()
    await expect(page.getByText('/ui-unslop').first()).toBeVisible()

    // 6. Apply Stack
    const applyBtn = page.getByRole('button', { name: /Apply Stack/i })
    await expect(applyBtn).toBeVisible()
    await applyBtn.click()

    // 7. Verify Toast Feedback
    const toast = page.locator('div[role="status"]')
    await expect(toast).toBeVisible()
    await expect(toast).toContainText('Auto-Recommended Skills')

    // 8. Verify Header Stack Counter is updated
    const stackBadge = page.locator('header button[title="Open Selected Skills Stack"]')
    await expect(stackBadge).toBeVisible()
  })

  test('11: Visual Before-vs-After Prompt Impact & Antigravity Workspace Packager', async ({ page }) => {
    // 1. Inspect unslop skill via deep link
    await page.goto('/?pillar=skills&skill=unslop')
    await expect(page.getByRole('heading', { name: 'unslop', level: 2 })).toBeVisible()

    // 2. Switch to "Before / After" Prompt Impact Tab
    const impactTab = page.getByRole('button', { name: /Before \/ After/i })
    await expect(impactTab).toBeVisible()
    await impactTab.click()

    // 3. Assert Visual Comparison & Economics are rendered
    await expect(page.getByText('❌ WITHOUT SKILL')).toBeVisible()
    await expect(page.getByText('✅ WITH /ui-unslop')).toBeVisible()
    await expect(page.getByText('Token Efficiency')).toBeVisible()

    // Close drawer
    await page.keyboard.press('Escape')

    // 4. Open Stack Modal with sample skills
    await page.goto('/?stack=taste-skill,unslop,systematic-debugging')
    const stackBtn = page.locator('header button[title="Open Selected Skills Stack"]')
    await stackBtn.click()

    // 5. Verify Antigravity Bundle export button
    const antigravityBtn = page.getByRole('button', { name: /Antigravity Bundle/i })
    await expect(antigravityBtn).toBeVisible()

    // 6. Verify Real Dollar Economics ribbon
    await expect(page.getByText('Real Dollar Economics')).toBeVisible()
    await expect(page.getByText('Claude 3.7 Sonnet')).toBeVisible()
  })

  test('12: Marketplace Deep Dive: ChatGPT Action Schemas, Plugin Install Commands & Verified Partner Filters', async ({ page }) => {
    await page.goto('/')

    // 1. Navigate to Marketplace
    const marketplaceBtn = page.getByRole('button', { name: /Marketplace/i }).first()
    await marketplaceBtn.click()

    // 2. Filter by ChatGPT Actions / GPTs
    const chatgptFilter = page.getByRole('button', { name: /ChatGPT Actions/i })
    await chatgptFilter.click()

    // 3. Verify ChatGPT Action schema buttons are displayed in connector cards
    const actionSnippet = page.locator('button[title="Click to copy ChatGPT Action Schema URL"]').first()
    await expect(actionSnippet).toBeVisible()
    await expect(actionSnippet.getByText('ACTION:')).toBeVisible()

    // 4. Reset ecosystem filter to All & switch to Coding Plugins tab
    const allEcosystems = page.getByRole('button', { name: /All Ecosystems/i })
    await allEcosystems.click()

    const pluginsTab = page.getByRole('button', { name: /Coding Plugins/i })
    await pluginsTab.click()

    // 5. Filter by Verified Plugins
    const verifiedFilter = page.getByRole('button', { name: 'Verified', exact: true })
    await verifiedFilter.click()

    // 6. Assert Verified badge is present and copy install command
    const verifiedBadge = page.locator('span').filter({ hasText: /^Verified$/ }).first()
    await expect(verifiedBadge).toBeVisible()

    const installBtn = page.locator('button[title="Click to copy install command"]').first()
    await expect(installBtn).toBeVisible()
    await installBtn.click()

    // 7. Switch to AI Agents & Platforms tab
    const agentsTab = page.getByRole('button', { name: /AI Agents & Platforms/i })
    await agentsTab.click()

    // Assert Enterprise Platform cards are rendered (e.g. Cursor)
    await expect(page.getByRole('heading', { name: 'Cursor', level: 3 })).toBeVisible()
  })

  test('13: GitHub Repo URL Auto-Stack, Modern Cursor 0.45+ Rules & Stack Compiler Diagnostics Linter', async ({ page }) => {
    await page.goto('/')

    // 1. Open Auto-Stack Recommender Modal
    const autoStackBtn = page.locator('header button[title*="Auto-Recommend"]')
    await expect(autoStackBtn).toBeVisible()
    await autoStackBtn.click()

    // 2. Verify GitHub URL input is visible
    const githubInput = page.getByPlaceholder(/Paste GitHub URL/i)
    await expect(githubInput).toBeVisible()
    await githubInput.fill('https://github.com/vercel/next.js')

    const fetchBtn = page.getByRole('button', { name: /Fetch Stack/i })
    await expect(fetchBtn).toBeVisible()

    // Close Recommender Modal
    await page.keyboard.press('Escape')

    // 3. Open Stack with redundant auth + anti-slop synergy
    await page.goto('/?stack=taste-skill,unslop,better-auth-patterns,clerk-auth-identity')
    const stackBtn = page.locator('header button[title="Open Selected Skills Stack"]')
    await stackBtn.click()

    // 4. Verify Modern Cursor 0.45+ Exporter button
    const cursorMdcBtn = page.getByRole('button', { name: /Cursor \.mdc/i })
    await expect(cursorMdcBtn).toBeVisible()

    // 5. Verify Compiler Diagnostics Linter Ribbon
    await expect(page.getByText('Compiler Diagnostics')).toBeVisible()
    await expect(page.getByText('Redundant Authentication Providers')).toBeVisible()
    await expect(page.getByText('Anti-Slop Design Synergy')).toBeVisible()

    // 6. Switch to Swarm Studio & verify Mermaid Copy button
    const swarmTab = page.getByRole('button', { name: /Multi-Agent Swarm Topology/i })
    await swarmTab.click()

    const mermaidBtn = page.getByRole('button', { name: /Copy Mermaid Diagram/i }).first()
    await expect(mermaidBtn).toBeVisible()
  })
})
