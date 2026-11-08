---
name: shadcn-ui
description: Accessible, composable Tailwind CSS and Radix UI component library patterns for architecting production-grade design systems and user interfaces.
---

# shadcn/ui Component Architecture (`shadcn/ui`)

> **Priority:** `P0` | **Framework:** `shadcn/ui` | **Domain:** `05-ui-ux` | **Stars:** `⭐ 127k+`

Accessible, composable Tailwind CSS and Radix UI component library patterns for architecting production-grade design systems and user interfaces.

---

## 🧭 When to Use

* When designing or building modern React/Next.js/Vite frontend interfaces.
* When you need accessible primitives (WAI-ARIA compliant dialogs, popovers, dropdowns, tooltips).
* When establishing design system consistency using Tailwind CSS variables and CSS tokens.
* When composing complex dashboard layouts, data tables, or forms with `react-hook-form` and `zod`.

---

## 🎯 Core Capabilities

1. **Copy-Paste Ownership**: Code lives directly in your repository (`components/ui`), eliminating rigid npm version locks and enabling seamless customization.
2. **WAI-ARIA Accessibility**: Built on top of Radix UI primitives with full keyboard navigation, screen reader announcements, and focus trap management.
3. **Themeable CSS Variables**: Supports light/dark mode out of the box with HSL/OKLCH color tokens in `globals.css`.
4. **Declarative CLI**: Easily scaffolds new components with dependencies automatically resolved.

---

## 🚀 Activation & Usage

### Interactive Activation
```bash
# In your coding assistant session, activate this role:
/shadcn-ui
```

### CLI Component Scaffolding
```bash
# Initialize shadcn in your project
npx shadcn@latest init

# Add accessible components
npx shadcn@latest add button dialog dropdown-menu table form
```

### Composable Usage Pattern
```tsx
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function ActionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
```

---

## 📋 Prerequisites

* Node.js 18+, React 18+ or React 19
* Tailwind CSS configured with `tailwind.config.ts` or Tailwind v4 `@theme`
* Lucide React icons (`lucide-react`)

---

## ⚠️ Anti-Patterns & Warnings

* **Anti-Pattern:** Overriding component classes with arbitrary CSS declarations instead of extending `cn()` utility variants.
* **Anti-Pattern:** Breaking accessibility by omitting `DialogTitle` or accessible description tags inside modals.
* **Anti-Pattern:** Treating components as an immutable npm black box rather than owning and tailoring the source in your repo.

