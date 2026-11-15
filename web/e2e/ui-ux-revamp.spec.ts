import { test, expect } from '@playwright/test'

test.describe('SkillDock UI/UX Revamp & Card Anatomy E2E Verification', () => {
  test('01: Stack Modal Revamped Ergonomics, Telemetry & Search Filter', async ({ page }) => {
    // Navigate with a pre-loaded stack
    await page.goto('/?stack=taste-skill,unslop,systematic-debugging,typography-layout-polish,interface-feel-polish')

    // Open Stack Modal using exact title selector
    const stackBtn = page.locator('header button[title="Open Selected Skills Stack"]')
    await expect(stackBtn).toBeVisible()
    await stackBtn.click()

    // 1. Verify Modal Header & Dialog Role
    const modal = page.locator('div[role="dialog"]')
    await expect(modal).toBeVisible()
    await expect(modal.getByRole('heading', { name: /SkillDock Stack/i })).toBeVisible()

    // Verify Telemetry does NOT contain broken negative savings or $0.00 glitch
    await expect(modal.getByText('-$0.00')).not.toBeVisible()
    await expect(modal.getByText('-251%')).not.toBeVisible()

    // Verify positive/factual telemetry badges
    await expect(modal.getByText(/5 Skills/i).first()).toBeVisible()
    await expect(modal.getByText(/P0 Critical/i)).toBeVisible()
    await expect(modal.getByText(/P1 High/i)).toBeVisible()

    // 2. Verify Search Filter in Stack Table
    const searchInput = modal.getByPlaceholder(/Filter stack skills/i)
    await expect(searchInput).toBeVisible()
    await searchInput.fill('typography')

    // Only matching skill should be visible in table
    await expect(modal.getByText('typography-layout-polish', { exact: true })).toBeVisible()
    await expect(modal.getByText('systematic-debugging', { exact: true })).not.toBeVisible()

    // Clear search
    await searchInput.fill('')
    await expect(modal.getByText('systematic-debugging', { exact: true })).toBeVisible()

    // 3. Verify Clean Export Hub with Segmented Groups (no fruit salad wrap)
    await expect(modal.getByRole('button', { name: /IDE Rules/i })).toBeVisible()
    await expect(modal.getByRole('button', { name: /Agent Bundles/i })).toBeVisible()
    await expect(modal.getByRole('button', { name: /Docs & Knowledge/i })).toBeVisible()

    // 4. Verify Unified Primary Action Button
    const copyBatchBtn = modal.getByRole('button', { name: /Copy Batch Script/i })
    await expect(copyBatchBtn).toBeVisible()

    // Close Modal
    await page.keyboard.press('Escape')
    await expect(modal).not.toBeVisible()
  })

  test('02: Card Anatomy & Universal CopyButton Resilience', async ({ page }) => {
    await page.goto('/')

    // Navigate to Skills & Suites in topbar
    const navBtn = page.locator('header nav button').filter({ hasText: /Skills & Suites/i }).first()
    await expect(navBtn).toBeVisible()
    await navBtn.click()

    // Locate the first Framework Card inside FrameworkGrid
    const card = page.locator('main .grid .group.rounded-xl').first()
    await expect(card).toBeVisible()

    // Verify "+ Add Suite" button exists and does not break
    const addSuiteBtn = card.getByRole('button', { name: /Add (Suite|to Stack)/i })
    await expect(addSuiteBtn).toBeVisible()

    // Verify CopyButton pill exists on card and is clickable
    const copyPill = card.locator('button').filter({ hasText: /^\// }).first()
    await expect(copyPill).toBeVisible()
    await copyPill.click()

    // Clicking copy should NOT open the inspect drawer (e.stopPropagation check)
    await expect(page.getByRole('heading', { name: /ABOUT THIS SUITE/i })).not.toBeVisible()
  })

  test('03: Suite Toggle Selection & Deselection (Add -> Suite Saved -> Unselect)', async ({ page }) => {
    await page.goto('/')

    // Clear previous stack
    await page.evaluate(() => localStorage.removeItem('ai_skills_stack_v2'))
    await page.reload()

    // Navigate to Skills & Suites
    const navBtn = page.locator('header nav button').filter({ hasText: /Skills & Suites/i }).first()
    await navBtn.click()

    // Locate the first Framework Card inside FrameworkGrid
    const card = page.locator('main .grid .group.rounded-xl').first()
    await expect(card).toBeVisible()

    // 1. Initial State: Button shows Add Suite
    const suiteBtn = card.getByRole('button', { name: /Add (Suite|to Stack)/i })
    await expect(suiteBtn).toBeVisible()

    // 2. Click to Add Suite
    await suiteBtn.click()

    // Button should transition to Suite Saved (or In Stack)
    const savedBtn = card.getByRole('button', { name: /(Suite Saved|In Stack)/i })
    await expect(savedBtn).toBeVisible()

    // Toast should appear indicating suite was added
    const toast = page.locator('div[role="status"]')
    await expect(toast).toBeVisible()
    await expect(toast).toContainText(/Loaded/i)

    // 3. Click again to UNSELECT / REMOVE Suite
    await savedBtn.click()

    // Button should transition BACK to Add Suite
    await expect(card.getByRole('button', { name: /Add (Suite|to Stack)/i })).toBeVisible()

    // Toast should appear indicating suite was removed
    await expect(toast).toContainText(/Removed/i)
  })
})
