# Git Branching & Release Strategy — {{PROJECT_NAME}}

> **Standard:** Trunk-Based Development with Protected Main

---

## 1. Branch Strategy Diagram

```mermaid
gitGraph
    commit id: "Initial commit"
    branch feature/user-auth
    checkout feature/user-auth
    commit id: "Implement login logic"
    commit id: "Add login unit tests"
    checkout main
    merge feature/user-auth id: "Merge PR #101"
    branch release/v1.0.0
    checkout release/v1.0.0
    commit id: "Tag v1.0.0"
```

---

## 2. Branch Naming Conventions
- `feature/<ticket-id>-<slug>`: New functionality
- `fix/<ticket-id>-<slug>`: Bug fixes
- `refactor/<slug>`: Code restructuring without feature change
- `docs/<slug>`: Documentation-only changes
- `release/v<semver>`: Release staging branch
