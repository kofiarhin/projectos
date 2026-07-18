# ProjectOS

ProjectOS is a CLI-first Autonomous Development Operating System for managing multiple software projects inside one local workspace.

It runs entirely locally and in-process: the CLI invokes TypeScript application services directly against MongoDB, the local filesystem, and provider adapters. There is no HTTP server, REST API, or browser dashboard in the MVP.

## Core Workflow

```bash
projectos init
projectos morning
projectos run
projectos report
projectos request
projectos status
projectos reset
```

Operational commands:

```bash
projectos --help
projectos --version
projectos doctor          # validate local readiness (no server is started)
projectos doctor --json   # machine-readable readiness report
```

## Product Model

- Human provides intent and approvals.
- Orchestrator audits, plans, and generates tasks.
- Builder agents implement tasks.
- Verifier validates implementation.
- MongoDB stores operational state.
- Source code remains in the local filesystem.

## Documentation

Start with:

1. [`INDEX.md`](./INDEX.md)
2. [`docs/PRD.md`](./docs/PRD.md)
3. [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
4. [`docs/IMPLEMENTATION_PLAN.md`](./docs/IMPLEMENTATION_PLAN.md)

Supporting specs cover agents, database, API, CLI, UI, sequences, states, testing, and security.

## MVP Scope

The MVP supports one managed workspace, multiple local projects, one orchestrator, a pool of builder agents, a verification loop, MongoDB-backed operational state, and a local CLI as the single entry point. A browser dashboard is out of scope for the MVP and deferred to a later phase.
