# 08 Superpowers Agent Skills Suite

> Authoritative skills suite from [obra/superpowers](https://github.com/obra/superpowers) by Jesse Vincent.

Superpowers is an agentic skills framework establishing rigorous engineering habits for AI coding assistants: red-green-refactor TDD, systematic root-cause debugging, subagent delegation, safe Git worktree isolation, and unyielding discipline against speculative coding.

---

## 🏛️ The Golden Rule of Superpowers

> [!IMPORTANT]
> **Rule 1: Invoke Skills Before Responding**
> If there is even a 1% chance a skill applies to what you are doing, you **ABSOLUTELY MUST** invoke the skill before taking action or answering clarifying questions.
> 
> - **"Let's build X"** → Invoke `superpowers:brainstorming` first, then implementation skills.
> - **"Fix this bug"** → Invoke `superpowers:systematic-debugging` first, then domain skills.

---

## 🗂️ Superpowers Skills Inventory (15 Skills)

| Skill | Description | Primary Phase |
| :--- | :--- | :--- |
| **`using-superpowers`** | Establishes how to find and use skills; enforces skill invocation before ANY action. | Meta / Entry |
| **`brainstorming`** | Explore requirements, alternatives, and trade-offs before entering plan mode. | Pre-Plan |
| **`writing-plans`** | Author atomic, executable implementation plans with testable milestones. | Planning |
| **`executing-plans`** | Execute structured plans with goal-backward verification after every step. | Execution |
| **`test-driven-development`** | Strict Red-Green-Refactor development cycle ensuring high regression resilience. | Execution |
| **`systematic-debugging`** | 4-Phase Diagnostic Protocol: Reproduce → Isolate → Surgical Fix → Verification. | Debugging |
| **`diagnosing-superpowers`** | Meta-diagnostic skill for troubleshooting skills and harness failures. | Meta / Debug |
| **`subagent-driven-development`** | Delegate self-contained tasks to subagents to preserve orchestrator context. | Delegation |
| **`dispatching-parallel-agents`** | Concurrent multi-agent execution across independent failure domains. | Delegation |
| **`using-git-worktrees`** | Isolate parallel development tasks safely in isolated directories. | Git Workflow |
| **`finishing-a-development-branch`** | Complete, validate, run pre-commit checks, and cleanly integrate feature branches. | Git Workflow |
| **`requesting-code-review`** | Package completed work cleanly for peer or automated review. | Code Review |
| **`receiving-code-review`** | Systematically triage and address feedback from code reviews. | Code Review |
| **`verification-before-completion`** | Mandatory verification: execute tests and builds before claiming done. | Quality Gate |
| **`writing-skills`** | Author reusable, standardized `SKILL.md` packages with persuasion & testing docs. | Authoring |

---

## 🚩 Anti-Rationalization Red Flags

These thoughts mean **STOP** — you are rationalizing:

| Thought | Reality |
| :--- | :--- |
| *"This is just a simple question"* | Questions are tasks. Check for skills. |
| *"I need more context first"* | Skill check comes BEFORE clarifying questions. |
| *"I'll just quickly inspect the file"* | Skill check comes BEFORE file inspection. |
| *"The bug is obvious, no need to debug systematically"* | Guesses cause regression churn. Formulate a hypothesis and test it. |

---

## 📚 Deep Reference Materials
Included inside [`writing-skills/references/`](writing-skills/references/):
- `anthropic-best-practices.md`
- `bulletproofing.md`
- `CLAUDE_MD_TESTING.md`
- `discovery.md`
- `flowcharts.md`
- `graphviz-conventions.dot`
- `persuasion-principles.md`
- `testing-skills-with-subagents.md`
