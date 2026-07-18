# ProjectOS

ProjectOS is a CLI-first Autonomous Development Operating System for managing multiple software projects inside one local workspace.

## Operating Model

- The user invokes explicit local commands.
- Command handlers call application services directly in-process.
- MongoDB stores operational state.
- The local filesystem stores source code.
- Codex CLI or another provider adapter performs bounded reasoning and implementation work.
- No Express server, REST API, browser dashboard, or network service is required for the MVP.

## Core Workflow

```bash
projectos init
projectos morning
projectos run
projectos report
projectos request
projectos status
projectos doctor
projectos reset
```

## Architecture

```text
User
  → ProjectOS CLI
  → command handlers
  → application services
  → MongoDB + local filesystem + provider adapters
```

The Orchestrator audits and plans but never writes production code. Builders implement assigned tasks. Verifiers require evidence before completion. Reporters generate persisted workspace and run summaries.

## Documentation

Start with:

1. [`INDEX.md`](./INDEX.md)
2. [`docs/PRD.md`](./docs/PRD.md)
3. [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
4. [`docs/IMPLEMENTATION_PLAN.md`](./docs/IMPLEMENTATION_PLAN.md)

Supporting specifications cover agents, database, internal service contracts, CLI behavior, terminal UX, sequences, states, testing, and security.

## MVP Scope

The MVP supports one managed local workspace, multiple local repositories, MongoDB-backed operational state, explicit CLI workflows, up to five parallel builders, verification, recovery, reports, and human approval through interactive terminal prompts and commands.
