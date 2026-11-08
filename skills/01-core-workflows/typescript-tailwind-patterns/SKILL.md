---
name: typescript-tailwind-patterns
description: Advanced TypeScript typing acrobatics, strict type-level invariants, zero-runtime overhead schemas, and Tailwind token design patterns.
---

# TypeScript & Tailwind Engineering Patterns (`/typescript-tailwind-patterns`)

> **Domain:** 01 Core Engineering Workflows  
> **Upstream Authority:** [`wshobson/agents`](https://github.com/wshobson/agents) (⭐ 42,290)  
> **Slash Command:** `/typescript-tailwind-patterns`

---

## When to Use

* When modeling complex discriminated unions, conditional types, mapped types, and branded primitive types in TypeScript.
* When structuring clean, type-safe component props with polymorphic `as` polymorphic tags in React/Next.js.
* When enforcing strict Tailwind CSS design systems using CSS variables, typography plugins, and `tailwind-merge` + `clsx` utilities.

## Prerequisites

* TypeScript 5.0+ installed with `strict: true` in `tsconfig.json`.
* Tailwind CSS 3.4+ or 4.0+ configured in project.
* Recommended helper libraries:
  ```bash
  npm install clsx tailwind-merge class-variance-authority
  ```

## Core Capabilities

1. **Branded Types & Nominal Invariants**: Prevent accidental domain primitive swapping (e.g. `UserId` vs `OrderId`) at compile-time.
2. **Polymorphic Component Props**: Strongly typed React `ComponentPropsWithRef` supporting dynamic element rendering without `any`.
3. **Class Variance Authority (CVA)**: Build type-safe UI variant matrices with declarative variant mappings and defaults.
4. **Tailwind Design Token System**: Centralize design tokens into typed theme configurations with automatic IDE autocompletion.

## Activation Command

```bash
/typescript-tailwind-patterns [brand-types|cva-component|audit-types|theme-tokens] [--target <file>]
```

## Workflow & Usage Guide

### 1. Strongly Typed Component Variant (CVA + cn)

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50',
  {
    variants: {
      intent: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
        secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700',
        danger: 'bg-red-600 text-white hover:bg-red-700'
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base'
      }
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md'
    }
  }
);
```

### 2. Type-Safe Branded Primitives

```typescript
declare const __brand: unique symbol;
export type Brand<T, B> = T & { readonly [__brand]: B };

export type UserId = Brand<string, 'UserId'>;
export type OrderId = Brand<string, 'OrderId'>;

export function makeUserId(id: string): UserId {
  if (!id.startsWith('usr_')) throw new Error('Invalid UserId format');
  return id as UserId;
}
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Resorting to `as any` or `@ts-ignore` to silence compiler warnings instead of refining generic constraints.
* **Anti-Pattern:** Concatenating raw Tailwind strings with string templates without `twMerge`, leading to conflicting CSS specificity.
* **Warning:** Deeply nested recursive conditional types can degrade TypeScript language server compilation speeds in large monorepos.

