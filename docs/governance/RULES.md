# Repository Governance & Quality Rules

Strict architectural and maintenance invariants governing the `Ai-Models-List` project.

---

## 1. Dual-Matrix Synchronization Invariant
1. All capabilities, skills, and tools must exist identically in both `AI-Coding-Skills-and-Tools-Matrix.md` and `AI-Coding-Skills-and-Tools-Matrix.csv`.
2. When a priority changes (e.g., P1 to P0), update both files simultaneously.
3. Every pull request or commit must pass `python scripts/sync-matrix.py`.

---

## 2. Skill Documentation Standard
1. Every individual skill in `skills/` must include a `SKILL.md` with:
   - YAML frontmatter: `name`, `description`, `priority`, `category`, `source`.
   - Clear sections: **When to Use**, **Core Capabilities**, **Installation / Activation Command**, **Prerequisites**, and **Anti-patterns / Warnings**.
2. Keep skill descriptions concise, factual, and verified against upstream documentation.

---

## 3. Universal Documentation Invariants (Layer 15)
1. **Source of Truth**: The Markdown and CSV matrices represent the single source of truth for skill rankings and links.
2. **Honesty & Verification**: Never mark a skill as tested or verified unless actual execution or compilation was validated.
3. **Security First**: Prohibit destructive commands and adhere to the security review checklist.

