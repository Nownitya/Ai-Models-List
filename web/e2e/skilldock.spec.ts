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
    const stackBadge = page.locator('header').getByRole('button', { name: /Stack/i }).locator('span').filter({ hasText: '5' })
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
    const stackBadge = page.locator('header').getByRole('button', { name: /Stack/i }).locator('span').filter({ hasText: '3' })
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
    const stackBtn = page.locator('header').getByRole('button', { name: /Stack/i })
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
    const stackBtn = page.locator('header').getByRole('button', { name: /Stack/i })
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
})
