---
name: agent-desktop-gui
description: Native desktop agent orchestration, operating system window management, keyboard/mouse event synthesis, and GUI interaction.
---

# Agent Desktop GUI Automation (`/agent-desktop-gui`)

> **Domain:** 09 Autonomous Agent Architectures  
> **Upstream Authority:** [`vercel-labs/agent-desktop`](https://github.com/vercel-labs/agent-desktop) (⭐ 18,887)  
> **Slash Command:** `/agent-desktop-gui`

---

## When to Use

* When automating native desktop applications (VS Code, Slack, Terminals, Xcode, Android Studio) beyond the browser sandbox.
* When managing window positioning, desktop focus switching, system tray notifications, and OS clipboard synchronization.
* When synthesizing low-level keyboard shortcuts, keypress combinations, and drag-and-drop mouse movements deterministically.

## Prerequisites

* Native desktop environment (macOS, Windows 11, or Linux X11/Wayland).
* Accessibility / Input permissions granted to the agent process:
  - macOS: System Settings -> Privacy & Security -> Accessibility
  - Windows: UAC elevation or standard user session input rights.
* Desktop agent daemon installed:
  ```bash
  npm install -g @vercel/agent-desktop
  ```

## Core Capabilities

1. **Window State & Coordinate Mapping**: Enumerates running desktop processes, window titles, bounds, and z-order stacks.
2. **Deterministic Input Synthesis**: Dispatches OS-level mouse clicks, double clicks, scrolls, and unicode text inputs.
3. **Screen OCR & Visual Anchoring**: Locates native buttons and UI controls via localized computer vision template matching.
4. **Clipboard & Filesystem Bridges**: Manages clipboard read/writes and drag-and-drop file transfers across desktop app boundaries.

## Activation Command

```bash
/agent-desktop-gui [focus-window|click-coords|type-text|capture-screen] [--app <name>] [--coords <x,y>]
```

## Workflow & Usage Guide

### 1. Focusing an Application & Dispatching Shortcuts

```typescript
import { DesktopAgent } from '@vercel/agent-desktop';

const agent = new DesktopAgent();
await agent.activateApp('Visual Studio Code');
await agent.hotkey('Control', 'Shift', 'P'); // Open Command Palette
await agent.typeText('Git: Commit All');
await agent.pressKey('Enter');
```

### 2. Coordinate Click with Visual Verification

```bash
# Locate button icon and dispatch click
agent-desktop click --image-anchor ./assets/icons/save-button.png --timeout 5000
```

## Anti-Patterns & Warnings

* **Anti-Pattern:** Blindly clicking hardcoded (x,y) screen coordinates across monitors with varying DPI scaling (e.g. 100% vs 150% scaling).
* **Anti-Pattern:** Running unmonitored desktop mouse automation without an emergency hardware fail-safe (e.g. moving mouse to screen corner to abort).
* **Warning:** Never allow automated desktop agents to interact with master password vaults, banking portals, or root credential managers.

