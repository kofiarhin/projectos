# ProjectOS Implementation Plan

## Delivery Strategy

Build the MVP one phase at a time. Every phase must end with lint, type-check, tests, build, documented results, and confirmation that the next phase was not started.

## Phase 0 — CLI-First Repository Foundation

### Deliverables

- npm workspace monorepo;
- `apps/cli` as the sole application entry point;
- reusable service packages;
- shared TypeScript, lint, formatting, test, and build configuration;
- environment validation;
- CLI help, version, and `doctor` shell;
- CI checks;
- removal of `apps/api`, `apps/dashboard`, Express, CORS, Supertest, and web-specific dependencies.

### Exit Criteria

- CLI starts locally;
- `projectos --help`, `projectos --version`, and `projectos doctor` work;
- baseline tests pass;
- environment errors are actionable;
- no HTTP server or browser UI remains in MVP code or documentation.

## Phase 1 — Domain and Persistence

### Deliverables

- Mongoose models;
- domain enums and transition validators;
- repositories and services;
- activity logging foundation;
- database indexes;
- test database utilities.

### Exit Criteria

- CRUD tests pass;
- invalid transitions are rejected;
- indexes and seed/reset behavior are documented.

## Phase 2 — Workspace Initialization

### Deliverables

- `projectos init`;
- interactive prompts and non-interactive flags;
- workspace-root validation;
- project discovery and review;
- `.projectos/workspace.json`;
- repeated initialization and repair.

### Exit Criteria

- empty and existing workspaces initialize successfully;
- rerunning init is safe;
- path escape is rejected.

## Phase 3 — Projects, Requests, Specifications, and Plans

### Deliverables

- project and request commands;
- lifecycle controls;
- versioned specification and plan services;
- external-editor/file review workflow;
- approval and rejection commands.

### Exit Criteria

- a project idea can become an approved spec and plan;
- edits create revisions;
- completed projects reactivate only through valid transitions.

## Phase 4 — Task Engine

### Deliverables

- task generation and idempotency keys;
- dependencies, priorities, approvals, blocking, and cancellation;
- terminal list, inspect, and edit commands.

### Exit Criteria

- approved plans produce non-duplicate tasks;
- ready and blocked state calculations are correct.

## Phase 5 — Morning Orchestrator

### Deliverables

- `projectos morning`;
- repository summaries;
- reconciliation and gap analysis;
- completed-project skipping;
- persisted morning reports.

### Exit Criteria

- active projects are audited;
- repeated unchanged runs produce no duplicate work;
- partial project failures do not lose the overall run record.

## Phase 6 — Scheduler and Agent Registry

### Deliverables

- atomic claiming and leases;
- configurable pool up to five builders;
- heartbeat and stale-claim recovery;
- pause and kill-switch commands.

### Exit Criteria

- no task is assigned twice;
- tasks in separate projects may run in parallel;
- stale claims enter a recoverable state.

## Phase 7 — Builder Runtime and Provider Adapters

### Deliverables

- Codex CLI adapter;
- portable provider interface;
- bounded context bundles;
- safe process invocation;
- changed-file, command, log, and summary capture.

### Exit Criteria

- one builder can implement and report one task;
- provider failures are normalized;
- execution cannot leave the assigned project root.

## Phase 8 — Verification

### Deliverables

- command-based checks;
- acceptance-criteria evaluation;
- retry policy;
- failed, inconclusive, and needs-review outcomes.

### Exit Criteria

- failed checks prevent completion;
- completed tasks contain evidence;
- environment failure is distinguishable from implementation failure.

## Phase 9 — Reporting, Status, and Terminal Mission Control

### Deliverables

- `projectos status`;
- `projectos report`;
- project, task, run, agent, and activity views;
- human tables and `--json` output;
- Markdown export;
- watch mode where useful.

### Exit Criteria

- a user can understand workspace health from terminal output;
- report data is generated from persisted state;
- output contracts are stable and tested.

## Phase 10 — Recovery and Reset

### Deliverables

- interrupted-run recovery;
- `projectos reset` with explicit scope;
- repair mode;
- archive behavior;
- graceful Ctrl+C handling.

### Exit Criteria

- state survives restarts;
- reset never deletes source code;
- interrupted executions remain inspectable.

## Phase 11 — End-to-End Hardening

### Deliverables

- full CLI E2E suite;
- path and command-injection tests;
- concurrency and idempotency tests;
- example workspace;
- installation and troubleshooting docs;
- release packaging.

### MVP Release Gate

- all documented commands work;
- the complete idea-to-verified-task flow passes;
- no HTTP or browser runtime is required;
- parallel execution is safe;
- activity and reports are complete;
- no critical security or data-loss defect remains.
