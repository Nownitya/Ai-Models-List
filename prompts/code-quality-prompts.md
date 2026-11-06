# Code Quality & Optimization Prompts

Specific prompts to guide models through rigorous engineering workflows, TDD, security audits, and performance tuning.

---

## 🧪 1. Strict Test-Driven Development (TDD) Prompt

```markdown
<instruction>
Execute the requested feature using strict Test-Driven Development (Red-Green-Refactor):

Step 1 (RED):
- Write an isolated unit or integration test defining the expected behavior.
- Run the test suite and verify that the test FAILS as expected (recording error message and failure output).

Step 2 (GREEN):
- Write the minimal, cleanest production code required to make the test pass.
- Run the test suite and verify that the test PASSES cleanly.

Step 3 (REFACTOR):
- Clean up any code duplication or awkward formatting while keeping the test suite green.
- Confirm zero regressions across existing tests.
</instruction>
```

---

## ⚡ 2. Android ANR & Performance Profiling Prompt

```markdown
<instruction>
Audit the provided Android source code and thread lifecycle for Application Not Responding (ANR) risks and frame drops:

1. Main Thread Inspection:
   - Identify any disk I/O, database queries (Room), or network calls occurring on `Dispatchers.Main` or UI threads.
   - Detect blocking synchronized locks, Binder IPC storms, or unbounded loops.

2. Compose Recomposition Audit:
   - Check for unstable parameters causing frequent recomposition.
   - Verify proper usage of `remember`, `derivedStateOf`, and immutable data holders.

3. Coroutine Scope Scoping:
   - Verify all asynchronous work uses structured concurrency (`viewModelScope`, lifecycle-aware dispatchers).
   - Flag any orphaned coroutines or uncancelled listeners causing memory leaks.
</instruction>
```

---

## 🧠 3. Karpathy Guidelines Execution Prompt

```markdown
<instruction>
Apply the four Karpathy-inspired engineering principles to this implementation:

1. Think Before Coding:
   - List explicit assumptions regarding input formats, constraints, and dependencies.
   - Reject premature complexity or unnecessary abstractions.

2. Simplicity First:
   - Implement the simplest possible correct solution.
   - Prefer standard language primitives over heavy third-party libraries.

3. Surgical Changes:
   - Touch only the lines directly related to the user request.
   - Do not reformat unrelated functions or alter working contracts.

4. Goal-Driven Execution:
   - Run verification commands after every modification.
   - Report verifiable proof (build status, test pass logs) rather than verbal assertions.
</instruction>
```
