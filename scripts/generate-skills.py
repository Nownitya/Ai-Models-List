#!/usr/bin/env python3
"""
generate-skills.py — Populates standardized SKILL.md files across all 12 categories.
"""

from pathlib import Path

SKILLS = [
    # 01 Core Engineering
    {
        "category": "01-core-engineering",
        "name": "brainstorming",
        "priority": "P0",
        "description": "Explore requirements, alternatives, and technical trade-offs before writing code.",
        "when": "Starting any non-trivial feature, architectural shift, or redesign.",
        "protocol": [
            "Clarify core goals and user personas.",
            "Enumerate at least 3 distinct implementation approaches with pros/cons.",
            "Record assumptions and obtain human alignment before drafting code."
        ],
        "antipatterns": ["Jumping straight to code without understanding scope.", "Ignoring edge-case constraints."]
    },
    {
        "category": "01-core-engineering",
        "name": "writing-plans",
        "priority": "P0",
        "description": "Create structured, verifiable, and actionable implementation plans.",
        "when": "Translating specs into executable engineering tasks.",
        "protocol": [
            "Decompose features into atomic, testable tasks.",
            "Define explicit Definition of Done (DoD) criteria for every step.",
            "Map out dependency waves for safe execution."
        ],
        "antipatterns": ["Vague milestones without verifiable output commands.", "Bundling 10 files into a single task."]
    },
    {
        "category": "01-core-engineering",
        "name": "executing-plans",
        "priority": "P0",
        "description": "Execute implementation plans systematically with atomic commits and verification.",
        "when": "Carrying out an approved PLAN.md.",
        "protocol": [
            "Take one atomic task at a time.",
            "Make surgical code edits.",
            "Run verification commands and inspect exit codes before committing."
        ],
        "antipatterns": ["Skipping verification steps.", "Mixing unrelated tasks in a single commit."]
    },
    {
        "category": "01-core-engineering",
        "name": "test-driven-development",
        "priority": "P0",
        "description": "Strict Red-Green-Refactor development cycle ensuring robust regression protection.",
        "when": "Implementing new business logic, domain algorithms, or bug fixes.",
        "protocol": [
            "RED: Write a unit test asserting the expected behavior and verify that it fails.",
            "GREEN: Write the minimal production code necessary to pass the test.",
            "REFACTOR: Clean up duplicated code while keeping the test suite green."
        ],
        "antipatterns": ["Writing production code before unit tests.", "Writing tests that assert trivial implementation details."]
    },
    {
        "category": "01-core-engineering",
        "name": "verification-before-completion",
        "priority": "P0",
        "description": "Verify builds, tests, and deliverables with live execution proof before claiming done.",
        "when": "Concluding any task, story, or PR.",
        "protocol": [
            "Execute the target test suite (`./gradlew test`, `pytest`, `npm test`).",
            "Verify clean compilation without warnings.",
            "Inspect git status to ensure zero accidental untracked changes."
        ],
        "antipatterns": ["Claiming 'all tests passed' without executing them.", "Relying on old cached test runs."]
    },
    {
        "category": "01-core-engineering",
        "name": "domain-modeling",
        "priority": "P0",
        "description": "Create robust, decoupled domain models and explicit business rules.",
        "when": "Structuring core business entities, data contracts, and invariants.",
        "protocol": [
            "Isolate domain types from framework dependencies (Android/iOS UI, ORMs).",
            "Use value objects and immutable data classes.",
            "Enforce invariants in factory methods or constructors."
        ],
        "antipatterns": ["Coupling domain models to database schemas or UI widgets.", "Exposing mutable state directly."]
    },
    {
        "category": "01-core-engineering",
        "name": "accidental-data-loss-prevention",
        "priority": "P0",
        "description": "Prevent destructive operations and accidental data loss across filesystem, git, and databases.",
        "when": "Any command with irreversible side-effects (`DROP`, `TRUNCATE`, `rm -rf`, force push).",
        "protocol": [
            "Stop and request explicit user confirmation.",
            "Verify target directory or database target.",
            "Ensure a restorable snapshot or backup exists."
        ],
        "antipatterns": ["Running destructive cleanup scripts without asking.", "Force pushing to protected branches."]
    },
    {
        "category": "01-core-engineering",
        "name": "karpathy-guidelines",
        "priority": "P1",
        "description": "Apply 4 Karpathy-inspired principles: Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven.",
        "when": "Pair programming or autonomous coding.",
        "protocol": [
            "List explicit assumptions before editing.",
            "Choose the simplest primitive solution.",
            "Make request-scoped edits only.",
            "Validate with terminal proof."
        ],
        "antipatterns": ["Premature abstraction.", "Refactoring untouched files."]
    },
    {
        "category": "01-core-engineering",
        "name": "using-git-worktrees",
        "priority": "P1",
        "description": "Safely isolate parallel development tasks and subagent workspaces using git worktrees.",
        "when": "Working on multiple features concurrently or running parallel subagents.",
        "protocol": [
            "Create a clean worktree: `git worktree add ../feature-branch feature-branch`.",
            "Execute changes in isolation.",
            "Remove worktree when merged: `git worktree remove ../feature-branch`."
        ],
        "antipatterns": ["Switching branches in a dirty workspace.", "Leaving orphaned worktrees."]
    },
    {
        "category": "01-core-engineering",
        "name": "finishing-a-development-branch",
        "priority": "P1",
        "description": "Complete, validate, and integrate feature branches cleanly.",
        "when": "Preparing a branch for pull request or merge into `develop`/`main`.",
        "protocol": [
            "Rebase on upstream target branch.",
            "Run full test suite and linters.",
            "Ensure commit messages conform to Conventional Commits."
        ],
        "antipatterns": ["Merging broken branches.", "Leaving merge conflicts unresolved."]
    },

    # 02 Matt Pocock
    {
        "category": "02-matt-pocock",
        "name": "to-spec",
        "priority": "P0",
        "description": "Convert conversational discussion and requirements into structured technical specs.",
        "when": "Following a discovery or grill-me session.",
        "protocol": [
            "Identify user persona, problem, and non-goals.",
            "Document architecture choices and interfaces.",
            "Produce a markdown SPEC document."
        ],
        "antipatterns": ["Leaving requirements ambiguous.", "Omitting non-goals."]
    },
    {
        "category": "02-matt-pocock",
        "name": "to-tickets",
        "priority": "P0",
        "description": "Break specifications into actionable, atomic development tickets.",
        "when": "Planning sprint or milestone tasks.",
        "protocol": [
            "Each ticket has a unique ID, title, and file targets.",
            "Include explicit acceptance criteria.",
            "Order tickets by dependency order."
        ],
        "antipatterns": ["Giant tickets spanning multiple domains.", "Missing acceptance criteria."]
    },
    {
        "category": "02-matt-pocock",
        "name": "implement",
        "priority": "P0",
        "description": "Implement well-defined engineering tasks against existing specifications.",
        "when": "Executing a ticket.",
        "protocol": [
            "Read target files and adjacent contracts.",
            "Apply surgical modifications.",
            "Verify against acceptance criteria."
        ],
        "antipatterns": ["Scope creep.", "Modifying contracts outside ticket boundaries."]
    },
    {
        "category": "02-matt-pocock",
        "name": "codebase-design",
        "priority": "P0",
        "description": "Maintain a well-structured, modular, and maintainable codebase.",
        "when": "Architecting folder structures and module boundaries.",
        "protocol": [
            "Enforce separation of concerns.",
            "Keep dependency flow unidirectional.",
            "Eliminate circular imports."
        ],
        "antipatterns": ["Spaghetti dependencies.", "God objects."]
    },
    {
        "category": "02-matt-pocock",
        "name": "wayfinder",
        "priority": "P1",
        "description": "Navigate, orient, and organize complex, multi-file codebases.",
        "when": "Onboarding or tracing flows across 50+ files.",
        "protocol": [
            "Locate main entry points.",
            "Trace data flow from input to storage.",
            "Document execution maps in `FLOW.md`."
        ],
        "antipatterns": ["Getting lost in deep folder hierarchies.", "Speculating on execution paths."]
    },

    # 03 Android Skills
    {
        "category": "03-android",
        "name": "navigation-3",
        "priority": "P0",
        "description": "Recommended practices for setting up and using Jetpack Navigation 3 in Compose.",
        "when": "Building single-activity Compose navigation with multi-backstack support.",
        "protocol": [
            "Configure Navigation 3 dependencies (`androidx.navigation3`).",
            "Implement typed route definitions.",
            "Manage multi-pane Scenes and back-press dispatchers."
        ],
        "antipatterns": ["String-based route parsing.", "Hardcoding activity transitions."]
    },
    {
        "category": "03-android",
        "name": "jetpack-compose-performance",
        "priority": "P0",
        "description": "Diagnose recomposition overhead, dropped frames, and Compose UI jank.",
        "when": "Optimizing list scrolling, animations, or high-frequency UI updates.",
        "protocol": [
            "Inspect Compose compiler metrics (unstable parameters).",
            "Use `remember` and `derivedStateOf` for expensive computations.",
            "Profile frame rendering with Layout Inspector and Perfetto."
        ],
        "antipatterns": ["Allocating lambdas inside composables without `remember`.", "Reading state too high in the tree."]
    },
    {
        "category": "03-android",
        "name": "android-profiler",
        "priority": "P0",
        "description": "Record and analyze Android performance data (CPU, memory, Perfetto traces).",
        "when": "Investigating app startup latency, memory leaks, or thermal throttling.",
        "protocol": [
            "Capture system traces using Perfetto.",
            "Analyze main thread slices for jank and Binder transactions.",
            "Diagnose heap churn and Low Memory Killer (LMK) triggers."
        ],
        "antipatterns": ["Guessing performance bottlenecks without traces.", "Profiling debug builds instead of release/profile."]
    },
    {
        "category": "03-android",
        "name": "anr-audit-and-fix",
        "priority": "P0",
        "description": "Audit codebases for ANR risks and diagnose Application Not Responding stack dumps.",
        "when": "Triaging ANR crash reports or auditing thread safety.",
        "protocol": [
            "Check main thread for Room database calls, SharedPreference sync, or network I/O.",
            "Audit synchronized locks and mutexes for deadlock risks.",
            "Migrate blocking calls to `Dispatchers.IO` with structured coroutines."
        ],
        "antipatterns": ["Blocking main thread with `.get()` on Futures.", "Sleeping on main thread."]
    },
    {
        "category": "03-android",
        "name": "r8-analyzer",
        "priority": "P0",
        "description": "Audit and optimize R8 keep rules to shrink APK size and optimize runtime execution.",
        "when": "Configuring release builds, ProGuard rules, or troubleshooting missing class crashes.",
        "protocol": [
            "Analyze mapping files and usage reports.",
            "Remove overly broad `-keep class com.example.** { *; }` rules.",
            "Verify reflection-accessed classes are preserved safely."
        ],
        "antipatterns": ["Disabling R8 minification to bypass crashes.", "Keeping entire packages unnecessarily."]
    },
    {
        "category": "03-android",
        "name": "android-intent-security",
        "priority": "P0",
        "description": "Secure Android components and handle Intents safely to prevent privilege escalation.",
        "when": "Configuring Activities, Receivers, and Services in AndroidManifest.xml.",
        "protocol": [
            "Set `android:exported=\"false\"` unless explicitly required.",
            "Validate caller UID and signing certificate before trusting Extras.",
            "Avoid PendingIntent redirection vulnerabilities."
        ],
        "antipatterns": ["Exporting sensitive broadcast receivers without permissions.", "Deserializing untrusted Parcelables blindly."]
    },
    {
        "category": "03-android",
        "name": "android-permissions-security",
        "priority": "P0",
        "description": "Audit permissions and IPC components, identify security gaps, and remediate vulnerabilities.",
        "when": "Requesting dangerous permissions or implementing Binder IPC interfaces.",
        "protocol": [
            "Enforce principle of least privilege.",
            "Verify caller identity via `Binder.getCallingUid()`.",
            "Implement graceful fallbacks when runtime permissions are denied."
        ],
        "antipatterns": ["Requesting background location unnecessarily.", "Assuming permission is granted without checking."]
    },
    {
        "category": "03-android",
        "name": "camerax",
        "priority": "P1",
        "description": "Implement modern Android camera functionality using Jetpack CameraX.",
        "when": "Building photo capture, video recording, or barcode/ML scanning.",
        "protocol": [
            "Bind Preview, ImageCapture, and ImageAnalysis to lifecycle.",
            "Handle device rotation and sensor orientation correctly.",
            "Process ImageProxy frames asynchronously without dropping camera frames."
        ],
        "antipatterns": ["Holding ImageProxy instances open indefinitely.", "Using legacy Camera1/Camera2 APIs directly."]
    },
    {
        "category": "03-android",
        "name": "appfunctions",
        "priority": "P1",
        "description": "Expose app workflows so system shortcuts and on-device AI agents can discover and execute them.",
        "when": "Enabling agentic tool calling and system integration for app actions.",
        "protocol": [
            "Annotate functions with `@AppFunctionDeclaration`.",
            "Define serializable inputs with `@AppFunctionSerializable`.",
            "Implement `AppFunctionService` entry point."
        ],
        "antipatterns": ["Exposing side-effecting operations without user confirmation.", "Inaccurate function descriptions."]
    },
    {
        "category": "03-android",
        "name": "edge-to-edge",
        "priority": "P1",
        "description": "Modernize app layouts with Android edge-to-edge support and insets handling.",
        "when": "Updating UI for Android 15/16+ edge-to-edge enforcement.",
        "protocol": [
            "Enable edge-to-edge with `enableEdgeToEdge()`.",
            "Apply window insets padding (`WindowInsets.safeDrawing`, `WindowInsets.ime`).",
            "Verify status and navigation bar scrim legibility."
        ],
        "antipatterns": ["Hardcoding system bar heights.", "Overlapping interactive buttons with navigation bar."]
    },
    {
        "category": "03-android",
        "name": "litert-runtime",
        "priority": "P2",
        "description": "Run on-device TensorFlow Lite model inference using the LiteRT CompiledModel API on CPU and GPU.",
        "when": "Executing computer vision, audio classification, or embedding models locally.",
        "protocol": [
            "Load `.tflite` model via `CompiledModel`.",
            "Reuse pre-allocated `TensorBuffer` instances.",
            "Configure GPU delegate with fallback to CPU."
        ],
        "antipatterns": ["Re-allocating buffers every inference turn.", "Running heavy inference on UI thread."]
    },
    {
        "category": "03-android",
        "name": "litert-lm",
        "priority": "P2",
        "description": "Run open text LLMs on-device using the LiteRT-LM Kotlin API on CPU or GPU.",
        "when": "Deploying local Gemma, Qwen, or Llama models on Android.",
        "protocol": [
            "Configure LiteRT-LM Gradle dependencies.",
            "Initialize Engine asynchronously in background dispatcher.",
            "Stream multi-turn responses with `sendMessageAsync`."
        ],
        "antipatterns": ["Loading weights on main thread.", "Exceeding device RAM limits."]
    },
    {
        "category": "03-android",
        "name": "ml-kit-genai-prompt-api",
        "priority": "P1",
        "description": "Send natural-language requests on-device using ML Kit GenAI Prompt API and Gemini Nano.",
        "when": "Summarization, proofreading, or smart reply generation on supported Android devices.",
        "protocol": [
            "Check AICore and Gemini Nano availability.",
            "Format prompt with prefix caching.",
            "Execute request with structured response parsing."
        ],
        "antipatterns": ["Assuming Gemini Nano is present on all hardware.", "Unbounded prompt lengths."]
    },

    # 04 Kotlin KMP
    {
        "category": "04-kotlin-kmp",
        "name": "kotlin-tooling-kotlin-toolchain",
        "priority": "P0",
        "description": "Manage modern Kotlin toolchains, JVM targets, and compiler flags across KMP modules.",
        "when": "Configuring Gradle build scripts or updating Kotlin versions.",
        "protocol": [
            "Declare explicit `jvmToolchain(21)`.",
            "Standardize compiler options across `commonMain`, `androidMain`, `iosMain`.",
            "Enable strict explicit API mode where applicable."
        ],
        "antipatterns": ["Mismatched JVM targets across modules.", "Relying on system JDK defaults."]
    },
    {
        "category": "04-kotlin-kmp",
        "name": "swiftui-pro",
        "priority": "P0",
        "description": "SwiftUI-focused agent skill targeting iOS 26+ and Swift 6.4+: state, navigation, HIG, performance.",
        "when": "Building 100% native SwiftUI interfaces in KMP applications.",
        "protocol": [
            "Use modern `@Observable` macro for reactive view models.",
            "Enforce HIG ergonomics (SF Symbols, 44pt targets, haptic feedback).",
            "Eliminate unnecessary view body evaluations."
        ],
        "antipatterns": ["Using deprecated `@ObservedObject` in Swift 6.", "Sharing Compose UI to iOS in native apps."]
    },
    {
        "category": "04-kotlin-kmp",
        "name": "swiftui-expert-skill",
        "priority": "P0",
        "description": "Broad SwiftUI reference plus xctrace tooling to record and analyze Instruments traces.",
        "when": "Profiling iOS view performance, hitches, and memory leaks.",
        "protocol": [
            "Capture Time Profiler and SwiftUI update traces via xctrace.",
            "Diagnose causes of animation hitches and body re-evaluations.",
            "Verify Liquid Glass, accessibility VoiceOver, and Dynamic Type."
        ],
        "antipatterns": ["Ignoring VoiceOver labels.", "Speculative SwiftUI performance tuning without Instruments."]
    },
    {
        "category": "04-kotlin-kmp",
        "name": "kotlin-tooling-cocoapods-spm-migration",
        "priority": "P1",
        "description": "Migrate KMP iOS dependency integration from CocoaPods to Swift Package Manager.",
        "when": "Modernizing Xcode integration and eliminating ruby dependency managers.",
        "protocol": [
            "Configure SPM export in `build.gradle.kts`.",
            "Generate XCFramework or Swift package manifest.",
            "Link package cleanly in Xcode project."
        ],
        "antipatterns": ["Mixing CocoaPods and SPM simultaneously.", "Committing generated framework binaries."]
    },

    # 05 UI/UX Design
    {
        "category": "05-ui-ux",
        "name": "impeccable",
        "priority": "P1",
        "description": "24 design commands: critique UX, audit accessibility, polish components, detect UI slop.",
        "when": "Auditing and refining interface components before production release.",
        "protocol": [
            "Run critique command on proposed component.",
            "Audit contrast ratios and WCAG accessibility standards.",
            "Polish edge cases (empty states, loading skeletons, error states)."
        ],
        "antipatterns": ["Shipping default generic UI slop.", "Ignoring keyboard navigation and screen readers."]
    },
    {
        "category": "05-ui-ux",
        "name": "ui-taste",
        "priority": "P1",
        "description": "Uizze UI Taste: curated real-app screen references, anti-ui-slop guidelines, and radar.",
        "when": "Seeking design inspiration and benchmarking against top industry apps.",
        "protocol": [
            "Search real app screen flows for target pattern.",
            "Extract color palettes and typographic hierarchy.",
            "Apply anti-slop guidelines (tight spacing, intentional contrast)."
        ],
        "antipatterns": ["Cloning copyright assets directly.", "Over-decorating functional utility screens."]
    },
    {
        "category": "05-ui-ux",
        "name": "ios-design",
        "priority": "P0",
        "description": "Build platform-native iOS interfaces adhering strictly to Apple Human Interface Guidelines.",
        "when": "Designing SwiftUI layouts, sheet presentations, and gestures.",
        "protocol": [
            "Follow standard iOS navigation hierarchies.",
            "Use vector SF Symbols with semantic color weights.",
            "Incorporate tactile haptic feedback on state changes."
        ],
        "antipatterns": ["Replicating Android Material Design on iOS.", "Custom non-standard back button behaviors."]
    },

    # 06 GSD
    {
        "category": "06-gsd",
        "name": "gsd-new-project",
        "priority": "P0",
        "description": "Initialize a greenfield project with GSD structure, governance, and planning hooks.",
        "when": "Bootstrapping a new repository.",
        "protocol": [
            "Run `gsd new-project`.",
            "Define milestones, architecture baseline, and tech stack.",
            "Create initial PRD and ROADMAP."
        ],
        "antipatterns": ["Skipping milestone definitions.", "Writing code before planning phase 1."]
    },
    {
        "category": "06-gsd",
        "name": "gsd-onboard",
        "priority": "P0",
        "description": "Onboard an existing codebase; map architecture, quality, and technical debt.",
        "when": "Introducing GSD to an established repository.",
        "protocol": [
            "Run codebase mapping passes (tech, arch, quality, concerns).",
            "Synthesize findings into `.planning/` documentation.",
            "Formulate initial remediation roadmap."
        ],
        "antipatterns": ["Rewriting existing architecture blindly.", "Ignoring undocumented edge cases."]
    },

    # 07 gstack
    {
        "category": "07-gstack",
        "name": "plan-eng-review",
        "priority": "P0",
        "description": "Comprehensive technical architecture and scalability review before coding.",
        "when": "Finalizing technical specifications.",
        "protocol": [
            "Evaluate data models, network contracts, and latency budgets.",
            "Identify single points of failure and race conditions.",
            "Approve or revise technical plan."
        ],
        "antipatterns": ["Rubber-stamping architectural flaws.", "Over-engineering simple tasks."]
    },
    {
        "category": "07-gstack",
        "name": "review",
        "priority": "P0",
        "description": "Review code implementation for bugs, regressions, and quality.",
        "when": "Post-implementation check before staging.",
        "protocol": [
            "Diff changes against base branch.",
            "Inspect edge case handling and error logging.",
            "Verify all tests pass cleanly."
        ],
        "antipatterns": ["Superficial formatting-only reviews.", "Approving unverified changes."]
    },
    {
        "category": "07-gstack",
        "name": "qa",
        "priority": "P0",
        "description": "Perform automated and manual browser-based quality assurance flows.",
        "when": "Validating end-to-end user workflows.",
        "protocol": [
            "Step through user journey end-to-end.",
            "Assert UI state changes and API request payloads.",
            "Document test run evidence."
        ],
        "antipatterns": ["Skipping edge-case inputs.", "Ignoring visual rendering glitches."]
    },
    {
        "category": "07-gstack",
        "name": "careful",
        "priority": "P0",
        "description": "Guardrail mode: protect against destructive, risky, or irreversible operations.",
        "when": "Executing commands with potential production or data risk.",
        "protocol": [
            "Prompt user before running high-risk commands.",
            "Enforce dry-run mode where available.",
            "Confirm backup availability."
        ],
        "antipatterns": ["Bypassing safety checks.", "Running unvetted batch scripts."]
    },

    # 09 Autonomous Agents
    {
        "category": "09-autonomous-agents",
        "name": "ralph-loop",
        "priority": "P1",
        "description": "Execute PRD-driven atomic stories autonomously in tight test-validated loops.",
        "when": "Running autonomous iterative development through repeated cycles.",
        "protocol": [
            "Read current atomic story from `tasks/ralph/prd.json`.",
            "Implement changes surgically.",
            "Execute automated tests; loop until green.",
            "Append execution evidence to `tasks/ralph/progress.txt`."
        ],
        "antipatterns": ["Unbounded infinite execution loops.", "Skipping DoD criteria."]
    },
    {
        "category": "09-autonomous-agents",
        "name": "mempalace",
        "priority": "P1",
        "description": "Persistent local-first semantic memory indexing files and transcripts across sessions.",
        "when": "Preserving durable cross-session learnings, decisions, and trap avoidance.",
        "protocol": [
            "Index project artifacts and ADRs into MemPalace.",
            "Recall relevant decisions at the start of a session.",
            "Curate session diary at milestone ship."
        ],
        "antipatterns": ["Indexing transient secrets or tokens.", "Treating memory as a substitute for code git history."]
    },
    {
        "category": "09-autonomous-agents",
        "name": "codex",
        "priority": "P1",
        "description": "OpenAI Codex CLI & APIs for complex coding, repository-wide edits, and script execution.",
        "when": "Running heavy code refactoring or multi-file code generation.",
        "protocol": [
            "Provide scoped prompt with explicit file targets.",
            "Inspect diffs generated by the engine.",
            "Run local compiler/test gates before committing."
        ],
        "antipatterns": ["Blindly applying large unreviewed diffs.", "Running in un-sandboxed environments."]
    },
    {
        "category": "09-autonomous-agents",
        "name": "everything-claude-code",
        "priority": "P1",
        "description": "Multi-agent harness engineering system: 71 specialized agents, 314 skills, rules, and AgentShield.",
        "when": "Operating in Claude Code or compatible multi-agent harnesses.",
        "protocol": [
            "Select specific agent personas (e.g. planner, architect, tester).",
            "Enable AgentShield scanning on incoming changes.",
            "Follow structured planning → TDD → review workflow."
        ],
        "antipatterns": ["Loading all 314 skills simultaneously causing context exhaustion.", "Ignoring adapter feature parity."]
    },

    # 10 AI Infrastructure
    {
        "category": "10-ai-infrastructure",
        "name": "context7",
        "priority": "P1",
        "description": "Version-aware documentation and code example retrieval for external libraries.",
        "when": "Implementing third-party APIs or checking current library usage.",
        "protocol": [
            "Query Context7 for target library and version.",
            "Extract idiomatic code samples.",
            "Verify APIs against project target dependencies."
        ],
        "antipatterns": ["Relying on outdated LLM memory for fast-moving libraries.", "Copying unverified examples."]
    },
    {
        "category": "10-ai-infrastructure",
        "name": "gemini-api",
        "priority": "P2",
        "description": "Integrate official Google GenAI SDK (`google-genai`) for multimodal, structured output, and agents.",
        "when": "Building cloud AI features, streaming chat, or tool calling in Python/TypeScript.",
        "protocol": [
            "Initialize `Client()` with API key or Vertex credentials.",
            "Use structured output schemas with Pydantic/Zod.",
            "Configure system instructions and safety filters."
        ],
        "antipatterns": ["Using deprecated `google.generativeai` package.", "Hardcoding API keys in source files."]
    },
    {
        "category": "10-ai-infrastructure",
        "name": "gemini-live-api",
        "priority": "P2",
        "description": "Build real-time, low-latency bidirectional voice and video streaming applications.",
        "when": "Building conversational voice assistants or real-time camera inspection tools.",
        "protocol": [
            "Establish WebSocket session using Gemini Live API.",
            "Stream raw PCM audio chunks bidirectionally.",
            "Handle server voice activity detection (VAD) and function call interruptions."
        ],
        "antipatterns": ["Buffering entire audio files before sending.", "Ignoring connection keep-alive timeouts."]
    },
    {
        "category": "10-ai-infrastructure",
        "name": "token-economizer",
        "priority": "P1",
        "description": "Experience-driven coding-agent cost and context control via micro-skill learning and tool pruning.",
        "when": "Managing token costs and preventing context window bloat in repeated repository sessions.",
        "protocol": [
            "Analyze agent tool usage patterns.",
            "Prune inactive tools from prompt context.",
            "Inject learned repository micro-skills."
        ],
        "antipatterns": ["Pruning tools that are required for emergency recovery.", "Discarding failure logs prematurely."]
    },
    {
        "category": "10-ai-infrastructure",
        "name": "omniroute",
        "priority": "P2",
        "description": "Route requests across multiple AI model providers through a common gateway with automatic fallback.",
        "when": "Building multi-provider AI resilience or routing queries based on latency/cost.",
        "protocol": [
            "Configure OmniRoute gateway endpoints.",
            "Define primary and fallback model routes.",
            "Monitor provider error rates and failover switches."
        ],
        "antipatterns": ["Single point of provider failure in production.", "Mismatched parameter schemas across models."]
    },

    # 11 Code Review Quality
    {
        "category": "11-code-review",
        "name": "coderabbit",
        "priority": "P1",
        "description": "Automated pull request reviews detecting bugs, security vulnerabilities, and missing tests.",
        "when": "Automating GitHub pull request review cycles.",
        "protocol": [
            "Configure `.coderabbit.yaml` review profile.",
            "Review automated PR walkthroughs and inline findings.",
            "Address flagged security, performance, or logic issues."
        ],
        "antipatterns": ["Ignoring critical security findings.", "Over-relying on automated review without human sign-off."]
    },
    {
        "category": "11-code-review",
        "name": "code-review",
        "priority": "P0",
        "description": "Agent-led review during implementation checking correctness, architecture, and maintainability.",
        "when": "Pre-commit or post-task verification.",
        "protocol": [
            "Inspect diff against acceptance criteria.",
            "Verify edge cases, nullability, and thread safety.",
            "Confirm documentation updates match code changes."
        ],
        "antipatterns": ["Approving code with failing tests.", "Overlooking hardcoded credentials."]
    },

    # 12 Specialized Cloud
    {
        "category": "12-specialized",
        "name": "google-maps-platform",
        "priority": "P2",
        "description": "Integrate Google Maps SDK, geolocation, routes, and place search.",
        "when": "Adding maps, tracking, or spatial geofencing to web/mobile applications.",
        "protocol": [
            "Configure restricted API keys with package name / SHA-1 fingerprinting.",
            "Implement lifecycle-aware MapView / Compose GoogleMap composable.",
            "Handle location permissions and GPS accuracy degradation."
        ],
        "antipatterns": ["Unrestricted API keys.", "Polling location aggressively causing battery drain."]
    },
    {
        "category": "12-specialized",
        "name": "schema-mapping",
        "priority": "P3",
        "description": "Analyze, map, and document transformations across heterogeneous database schemas.",
        "when": "Executing complex ETL/ELT migrations across 3+ tables.",
        "protocol": [
            "Extract source and target schemas.",
            "Define field-by-field type mapping and transformation logic.",
            "Produce a formal Mapping Manifesto with validation checks."
        ],
        "antipatterns": ["Silent truncation of numeric types.", "Ignoring timezone differences in timestamps."]
    },
    {
        "category": "12-specialized",
        "name": "gcp-dataflow",
        "priority": "P3",
        "description": "Author, optimize, and troubleshoot Apache Beam streaming and batch data pipelines on Dataflow.",
        "when": "Building large-scale stream processing or batch analytics on Google Cloud.",
        "protocol": [
            "Design Beam pipeline DAG with bounded or unbounded PCollections.",
            "Optimize windowing, triggering, and stateful processing.",
            "Monitor worker autoscaling and pipeline lag in Cloud Monitoring."
        ],
        "antipatterns": ["Unbounded grouping causing worker OOMs.", "Ignoring pipeline watermarks."]
    }
]

def generate_skill_md(skill):
    protocol_items = "\n".join(f"{i+1}. {step}" for i, step in enumerate(skill["protocol"]))
    antipattern_items = "\n".join(f"- {ap}" for ap in skill["antipatterns"])
    
    return f"""---
name: {skill["name"]}
description: "{skill["description"]}"
priority: {skill["priority"]}
category: {skill["category"]}
---

# {skill["name"].replace("-", " ").title()}

{skill["description"]}

## When to Use
- {skill["when"]}

## Core Protocol / Capabilities
{protocol_items}

## Anti-Patterns & Warnings
{antipattern_items}
"""

def main():
    repo_root = Path(__file__).resolve().parent.parent
    skills_root = repo_root / "skills"
    
    created_count = 0
    updated_count = 0
    
    for skill in SKILLS:
        skill_dir = skills_root / skill["category"] / skill["name"]
        skill_dir.mkdir(parents=True, exist_ok=True)
        
        skill_file = skill_dir / "SKILL.md"
        content = generate_skill_md(skill)
        
        if skill_file.exists():
            updated_count += 1
        else:
            created_count += 1
            
        skill_file.write_text(content, encoding="utf-8")
        
    print(f"[OK] Generated {created_count} new and verified/updated {updated_count} SKILL.md files.")
    print(f"[OK] Total skills structured in repository: {created_count + updated_count}")

if __name__ == "__main__":
    main()
