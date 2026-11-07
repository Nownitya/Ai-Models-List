# Issue Tracker Configuration

> Authoritative configuration for Matt Pocock engineering skills (`/to-spec`, `/to-tickets`, `/triage`, `/implement`) operating in the `Ai-Models-List` repository.

## Backend
* **Primary Tracker**: GitHub Issues via official GitHub CLI (`gh`)
* **Repository**: [`https://github.com/Nownitya/Ai-Models-List`](https://github.com/Nownitya/Ai-Models-List)
* **Local Fallback**: [`docs/TASKS.md`](file:///d:/Codes/Antigravity/Project4/Ai-Models-List/docs/TASKS.md)

## Common Commands
* **List open issues**:
  ```bash
  gh issue list --repo Nownitya/Ai-Models-List --limit 20 --state open
  ```
* **View issue details**:
  ```bash
  gh issue view <issue-number> --repo Nownitya/Ai-Models-List
  ```
* **Create an issue / ticket**:
  ```bash
  gh issue create --repo Nownitya/Ai-Models-List --title "<title>" --body "<body>" --label "<labels>"
  ```
* **Add label to issue**:
  ```bash
  gh issue edit <issue-number> --repo Nownitya/Ai-Models-List --add-label "<label>"
  ```
* **Close issue with reference**:
  ```bash
  gh issue close <issue-number> --repo Nownitya/Ai-Models-List --comment "Completed and verified in commit <hash>"
  ```

## Ticket Conventions
* Every ticket created by `/to-tickets` must carry:
  * Clear user-story or engineering objective.
  * Acceptance criteria with verifiable evidence requirements.
  * Applicable priority (`p0-critical`, `p1-high`, `p2-normal`) and component labels.

