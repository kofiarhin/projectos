# ProjectOS Architecture Specification

## 1. Architecture Goal

Provide a modular, local-first, CLI-only system that separates command handling, domain services, orchestration, execution, verification, persistence, and provider integration.

## 2. System Context

```text
User
  ↓
ProjectOS CLI
  ↓
Command Handlers
  ↓
Application Services
  ├── Workspace Engine
  ├── Project and Request Services
  ├── Specification and Planning Services
  ├── Orchestrator
  ├── Scheduler
  ├── Builder Runtime
  ├── Verification Engine
  ├── Reporting Engine
  ├── Context Service
  └── Activity Service
       ├── MongoDB
       ├── Local Filesystem
       └── Provider Adapters / Codex CLI
```

There is no HTTP server, REST API, browser dashboard, CORS layer, or network event stream in the MVP.

## 3. Repository Layout

```text
projectos/
├── apps/
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

The CLI package owns parsing, prompts, formatting, and exit codes. Reusable business logic belongs in packages.

## 4. Runtime Components

### CLI

- Parses commands and flags.
- Collects missing input through prompts.
- Calls application services directly in-process.
- Renders human or JSON output.
- Converts typed errors into exit codes.

### Workspace Engine

Validates the root, discovers projects, resolves safe paths, persists local configuration, and prevents path escape.

### Project and Request Services

Manage lifecycle state and convert user intent into approved work inputs.

### Specification and Planning Services

Create versioned documents. Approved versions are immutable; edits create new revisions.

### Orchestrator

Audits and reconciles projects, generates plans and tasks, and produces reports. It never writes production code.

### Scheduler

Atomically claims executable tasks, enforces dependencies and concurrency, and coordinates local builders.

### Builder Runtime

Constructs bounded context, invokes a provider adapter, applies changes inside one project, runs commands, and saves evidence.

### Verification Engine

Evaluates acceptance criteria and deterministic checks before completion.

### Reporting and Activity

Persist append-only events and generate terminal and Markdown summaries.

## 5. Data Boundaries

### Filesystem

- source code;
- repository-local documentation;
- `.projectos/workspace.json`;
- optional generated Markdown reports and logs.

### MongoDB

- workspace and project metadata;
- requests, specs, plans, tasks, agents, runs, reports, activities, settings, approvals, and leases.

Source files are never canonicalized into MongoDB.

## 6. Internal Service Contract

Command handlers depend on typed services rather than HTTP:

```ts
interface CommandContext {
  services: ProjectOSServices;
  output: OutputWriter;
  signal: AbortSignal;
}
```

Services return typed results and domain errors. They must not print directly to stdout.

## 7. Provider Abstraction

```ts
interface AgentProvider {
  execute(input: AgentExecutionInput): Promise<AgentExecutionResult>;
  healthCheck(): Promise<ProviderHealth>;
  capabilities(): ProviderCapabilities;
}
```

The initial adapter may invoke Codex CLI locally. Provider-specific command syntax, environment handling, and result parsing remain inside the adapter.

## 8. Concurrency and Recovery

- Maximum builders defaults to five.
- Claims are atomic and leased.
- The MVP serializes tasks within one project unless explicitly proven safe.
- Lease expiry moves work to a recoverable or needs-review state.
- Long-running commands create persisted run records before execution.
- Ctrl+C requests graceful cancellation and preserves inspectable state.

## 9. Idempotency

Initialization and morning audits use fingerprints derived from configuration, approved document versions, active requests, and repository state. Repeated commands must not create duplicate projects, plans, or tasks.

## 10. Security Boundaries

- Normalize every path against the registered root.
- Reject traversal and symlink escape.
- Never pass secrets into reports, logs, or provider prompts.
- Do not execute raw shell strings assembled from untrusted user input.
- Reset may archive operational state but never delete project source code.
- All privileged actions must create activity records.

## 11. Deployment Model

ProjectOS is installed and executed locally as a Node.js CLI. It connects directly to MongoDB and invokes local provider tooling. No persistent application server is required.
