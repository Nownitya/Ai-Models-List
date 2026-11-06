# AI Prompt Optimization Framework

A systematic guide and reference framework for optimizing system prompts, agent instructions, and context loading when working with frontier LLMs (Gemini, Claude, GPT, DeepSeek, etc.).

---

## 🎯 1. The Core Prompt Engineering Pillars

### 1.1 Clarity & Role Framing
- **Explicit Role Definition**: Give the model an exact identity, technical role, and non-negotiable boundaries.
- **Goal-Backward Thinking**: Define what "done" and "successful verification" look like before describing steps.
- **Avoid Ambiguity**: Use deterministic verbs (`Verify`, `Assert`, `Refactor`, `Isolate`) instead of passive phrases (`Try to check`, `Maybe look at`).

### 1.2 Delimiter & Context Hygiene
- Use clear markdown or XML-style tags (`<context>`, `<requirements>`, `<constraints>`, `<output_format>`) to prevent prompt injection and structural confusion.
- Group input data logically to prevent the model from conflating instructions with subject material.

### 1.3 Chain of Thought & Reasoning Scratchpads
- For non-trivial engineering problems, instruct the model to think in an unconstrained scratchpad before emitting code.
- Pattern:
  ```markdown
  Analyze the problem in three passes:
  1. Root cause & hypothesis formulation
  2. Potential side-effects on adjacent modules
  3. Minimal surgical fix & exact verification command
  ```

### 1.4 Few-Shot Exemplars
- Provide 1–2 high-quality input-output pairs illustrating:
  - Exact code formatting style.
  - Required error handling patterns.
  - Commit message format.

---

## ⚡ 2. Token & Context Window Optimization

| Strategy | Technique | Impact |
| :--- | :--- | :--- |
| **Prune Boilerplate** | Strip redundant license headers and long comments before passing to context. | 15–30% token reduction |
| **AST Subgraphs** | Use tools like Graphify to pass relevant call paths instead of whole file trees. | 50–70% token reduction |
| **Durable Memory** | Store historical decisions in `MEMORY.md` or MemPalace rather than re-reading past transcripts. | Massive latency & cost savings |
| **Incremental Handoff** | Keep session summaries bounded to 300 words with unresolved tasks bulleted. | Eliminates context degradation |

---

## 🛡️ 3. Safety & Guardrail Directives

Always embed defensive constraints in agent system prompts:
1. **Accidental Data Loss Prevention**: Prohibit non-interactive deletion commands (`rm -rf`, `DROP TABLE`, destructive Git resets).
2. **Deterministic Verification**: Never claim a test or build passes without executing the command and reading stdout.
3. **Surgical Edits**: Require that only necessary lines be edited; do not rewrite undamaged helper functions.

