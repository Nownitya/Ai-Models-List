---
name: web-quality-a11y
description: Addy Osmani's web accessibility (a11y), Core Web Vitals optimization, semantic HTML auditing, and frontend quality engineering.
---

# Web Quality & Accessibility (`addyosmani/web-quality-skills`)

> **Priority:** `P0` | **Framework:** `addyosmani/web-quality-skills` | **Domain:** `03-code-review-and-quality` | **Stars:** `⭐ 3.0k+`

Addy Osmani's web accessibility (a11y), Core Web Vitals optimization, semantic HTML auditing, and frontend quality engineering.

---

## 🧭 When to Use

* When auditing websites and web applications for WCAG 2.1 AA/AAA accessibility compliance.
* When optimizing Core Web Vitals: LCP (Largest Contentful Paint), INP (Interaction to Next Paint), and CLS (Cumulative Layout Shift).
* When verifying keyboard navigability, focus indicators, ARIA roles, and screen-reader announcements.
* When conducting automated Lighthouse and Axe-core quality scans in CI.

---

## 🎯 Core Capabilities

1. **Semantic HTML Enforcement**: Prioritizes native HTML elements (`<button>`, `<nav>`, `<dialog>`) over inaccessible `<div>` click handlers.
2. **Interaction to Next Paint (INP) Tuning**: Identifies long JavaScript tasks (> 50ms) blocking the main thread and breaks them into microtasks with `scheduler.yield()`.
3. **Cumulative Layout Shift (CLS) Prevention**: Enforces explicit aspect ratios and image dimension bounds to stop sudden page reflows.
4. **Color Contrast & Focus Management**: Validates text against background color contrast ratios ($\ge 4.5:1$) and guarantees visible focus rings.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/web-quality-a11y
```

### INP Task Yielding Pattern
```typescript
// Break long tasks to keep INP under 200ms
async function processLargeDataset(items: Array<any>) {
  for (let i = 0; i < items.length; i++) {
    processItem(items[i]);
    
    // Yield to the main thread every 50 items so user input is responsive
    if (i % 50 === 0 && 'scheduler' in window && 'yield' in (window as any).scheduler) {
      await (window as any).scheduler.yield();
    }
  }
}
```

### Accessibility Audit Checklist
```markdown
### Web Quality & a11y Gate
- [ ] All interactive elements are reachable and operable via keyboard alone (`Tab`, `Enter`, `Space`).
- [ ] Images have descriptive `alt` text or `aria-hidden="true"` if purely decorative.
- [ ] Color is never the sole medium used to convey critical information or error states.
- [ ] Target touch size on mobile is at least 48x48 CSS pixels with adequate padding.
```

---

## 📋 Prerequisites

* Modern web application codebase (React, Vue, Svelte, or plain HTML)
* Headless browser testing tools (Playwright or Puppeteer) with Axe-core integration

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Removing focus outlines (`outline: none`) without providing an equally prominent custom focus indicator.
* **Anti-Pattern:** Sprinkling `aria-*` attributes arbitrarily without understanding screen-reader tree mutations ("No ARIA is better than bad ARIA").
