---
name: svelte5-runes-patterns
description: Svelte 5 runes reactivity ($state, $derived, $effect), SvelteKit SSR hydration, and modern component architecture.
---

# Svelte 5 Runes & Modern SvelteKit Architecture (`/svelte5-runes-patterns`)

> **Domain:** 01 Core Workflows  
> **Upstream Authority:** [`sveltejs/ai-tools`](https://github.com/sveltejs/ai-tools) (⭐ 337)  
> **Slash Command:** `/svelte5-runes-patterns`

---

## When to Use

* When engineering modern web applications using Svelte 5 and SvelteKit.
* When migrating legacy Svelte 3/4 stores and reactive declarations (`$:`) to universal Runes (`$state`, `$derived`, `$effect`, `$props`).
* When building server-side rendered (SSR) applications with edge rendering, streamed data loading, and form actions in SvelteKit.

## Prerequisites

* Svelte v5.0+ and Node.js v18+.
* SvelteKit project setup (`npm create svelte@latest`).

## Core Capabilities

1. **Universal Runes Reactivity**: Fine-grained reactivity working seamlessly inside `.svelte` components as well as standard `.svelte.ts` modules.
2. **Type-Safe Component Props**: `$props()` rune with strict TypeScript interfaces, default values, and rest bindings.
3. **Derived State & Effects**: `$derived()` for computed reactive values and `$effect()` for managed DOM side-effects with automatic cleanup.
4. **SvelteKit Server Routing**: Standardized `+page.server.ts` loaders, form actions, and error boundaries.

## Activation Command

```bash
/svelte5-runes-patterns [runes|convert|form-actions|ssr] [--target <component>]
```

## Workflow & Usage Guide

### 1. Svelte 5 Component with Runes (`Counter.svelte`)

```svelte
<script lang="ts">
  interface Props {
    initialCount?: number;
    step?: number;
  }

  let { initialCount = 0, step = 1 }: Props = $props();

  let count = $state(initialCount);
  let double = $derived(count * 2);

  $effect(() => {
    console.log(`Count updated to: ${count}`);
    return () => {
      // Optional cleanup on teardown or dependency change
    };
  });

  function increment() {
    count += step;
  }
</script>

<div class="counter-box">
  <p>Count: {count} (Double: {double})</p>
  <button onclick={increment}>Increment by {step}</button>
</div>
```

### 2. Universal Reactive State Store (`cart.svelte.ts`)

```typescript
export class ShoppingCart {
  items = $state<string[]>([]);
  totalCount = $derived(this.items.length);

  addItem(item: string) {
    this.items.push(item);
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }
}

export const cart = new ShoppingCart();
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Mixing legacy reactive statements (`$: foo = bar`) with Svelte 5 Runes in the same component module.
* **Anti-Pattern:** Using `$effect()` for state transformations that should be purely computed using `$derived()`, causing redundant render cycles.
* **Warning:** Runes are compiler-level primitives; do not call them conditionally inside branching if-statements.

