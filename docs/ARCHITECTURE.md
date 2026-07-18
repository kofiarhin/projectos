# ProjectOS Architecture Specification

## 1. Architecture Goal

Provide a modular, local-first platform that separates orchestration, execution, persistence, and user control while remaining independent of any single AI provider.

## 2. System Context

```text
User
 ├─ CLI
 └─ Dashboard
       │
       ▼
Express API
       │
       ▼
ProjectOS Core
 ├─ Workspace Engine
 ├─ Request Engine
 ├─ Specification Engine
 ├─ Planning Engine
 ├─ Orchestrator
 ├─ Scheduler
 ├─ Builder Runtime
 ├─ Verification Engine
 ├─ Reporting Engine
 ├─ Context Service
 └─ Activity Service
       │
       ├─ MongoDB
       ├─ Local Filesystem
       └─ AI Provider Adapter
```

## 3. Repository Layout

```text
projectos/
├── apps/
│   ├── dashboard/
│   ├── api/
│   └── cli/
├── packages/
│   ├── core/
│   ├── database/
│   ├── workspace/
│   ├── orchestrator/
│   ├── scheduler/
│   ├── builders/
│   ├── verification/
│   ├── context/
│   ├── providers/
│   ├── reporting/
│   └── shared/
├── docs/
├── scripts/
├── AGENTS.md
├── README.md
└── package.json
```

Use a root package manifest and npm workspaces.

## 4. Runtime Components

### Workspace Engine

Responsible for initialization, path validation, project discovery, registration, repository metadata, and filesystem boundaries.

### Request Engine

Accepts human intent and tracks its conversion into specifications, plans, and tasks.

### Specification Engine

Creates and versions product specifications. Approved versions are immutable; edits create new versions.

### Planning Engine

Converts approved specifications into milestones, phases, dependencies, and task candidates.

### Orchestrator

Runs the morning audit. It reads state and code but does not implement code changes.

### Scheduler

Claims approved ready tasks and assigns them to available builders. It enforces task locking and concurrency limits.

### Builder Runtime

Runs a provider adapter with a bounded context package and an isolated task scope.

### Verification Engine

Runs automated checks and evaluates acceptance criteria. It determines completed, retryable, or needs-review outcomes.

### Context Service

Builds revisioned context bundles from project, spec, plan, request, task, and recent activity data.

### Reporting Engine

Produces structured and Markdown reports from runs and activity.

### Activity Service

Writes append-only operational events.

## 5. Data Boundaries

### Filesystem

Stores:

- source code;
- repository configuration;
- optional project-local `AGENTS.md`;
- generated local artifacts where approved;
- `.projectos/workspace.json`.

### MongoDB

Stores:

- workspaces;
- projects;
- specs;
- plans;
- requests;
- tasks;
- agents;
- runs;
- reports;
- activities;
- settings.

No source file content is persisted as the canonical copy.

## 6. Provider Abstraction

Each provider adapter implements:

```ts
interface AgentProvider {
  execute(input: AgentExecutionInput): Promise<AgentExecutionResult>;
  healthCheck(): Promise<ProviderHealth>;
  capabilities(): ProviderCapabilities;
}
```

Provider-specific prompt formatting remains inside adapters.

## 7. Concurrency Model

- Maximum builders is configurable, default five.
- Tasks are atomically claimed.
- One builder may own one task at a time.
- Two tasks for the same project may run concurrently only when the scheduler determines they do not conflict.
- The MVP may conservatively serialize tasks within one project.
- Claims expire when heartbeat leases time out.
- Stale tasks move to `needs_review` rather than automatically restarting without inspection.

## 8. Idempotency

Morning runs calculate a fingerprint from:

- project revision;
- approved spec version;
- approved plan version;
- active request revisions;
- relevant repository state.

The system must not create duplicate tasks for the same fingerprint and task intent.

## 9. Eventing

MVP uses MongoDB plus API polling or Server-Sent Events. Redis is not required.

Events include:

- workspace initialized;
- project discovered;
- project audited;
- request created;
- task generated;
- task approved;
- task claimed;
- task completed;
- verification failed;
- agent heartbeat;
- report generated;
- execution paused.

## 10. Error Strategy

All domain operations return typed errors. Failures are categorized:

- validation;
- configuration;
- provider;
- filesystem;
- repository;
- execution;
- verification;
- persistence;
- authorization boundary.

Errors that require human judgment move the affected entity to `needs_review`.

## 11. Security Boundaries

- Resolve every path against workspace root.
- Reject traversal and symlink escape.
- Keep secrets in environment variables.
- Redact secrets from logs and agent prompts.
- Restrict reset to operational data.
- Log all destructive or privileged actions.
- Never execute arbitrary shell input directly from dashboard fields.

## 12. Deployment Model

MVP runs locally:

- dashboard on Vite dev server or static build;
- Express API on localhost;
- local CLI;
- local or remote MongoDB;
- locally installed AI CLI/provider.

The API owns all database mutation. The dashboard and CLI are clients.
