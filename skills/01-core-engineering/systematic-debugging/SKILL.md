---
name: systematic-debugging
description: "Perform evidence-based root-cause debugging instead of guesswork. Follow the 4-phase protocol: reproduce, isolate, minimal surgical fix, and regression verification."
priority: P0
category: 01-core-engineering
source: https://agentskills.io/
---

# Systematic Debugging

Identify and resolve software defects through scientific, evidence-based investigation.

## When to Use
- Investigating any test failure, crash, exception, or unexpected behavior.
- Resolving performance regressions or memory leaks.
- When previous speculative attempts failed to solve a bug.

## Core Protocol
1. **Reproduce**: Create or identify the minimal deterministic test case that triggers the defect.
2. **Isolate**: Inspect logs, traces, and code execution flow to formulate a falsifiable hypothesis.
3. **Remediate**: Apply the minimal surgical change that resolves the root cause.
4. **Verify**: Ensure the reproduction test passes and the full test suite remains green.

## Anti-Patterns
- Speculative edits without verifying the hypothesis.
- Masking race conditions with arbitrary timeouts or sleep delays.
- Swallowing exceptions to suppress crash logs.
