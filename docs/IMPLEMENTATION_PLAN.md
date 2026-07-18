# ProjectOS Implementation Plan

## Delivery Strategy

Build the MVP in vertical increments. Each phase must leave the repository in a working, tested state.

## Phase 0 — Repository Foundation

### Deliverables
- npm workspace monorepo
- dashboard, API, and CLI apps
- shared TypeScript configuration
- linting, formatting, testing, and environment validation
- CI checks

### Exit Criteria
- all apps start locally;
- baseline tests pass;
- environment errors are actionable.

## Phase 1 — Domain and Persistence

### Deliverables
- Mongoose models
- domain enums and validators
- repositories/services
- activity logging foundation
- database indexes

### Exit Criteria
- CRUD tests pass;
- invalid state transitions are rejected;
- migrations or seed scripts are documented.

## Phase 2 — Workspace Initialization

### Deliverables
- `projectos init`
- setup wizard backend
- workspace root validation
- project discovery
- `.projectos/workspace.json`
- discovered-project review

### Exit Criteria
- user can initialize an empty or existing workspace;
- rerunning init is safe;
- paths outside root are rejected.

## Phase 3 — Dashboard Shell

### Deliverables
- app layout
- sidebar navigation
- routing
- TanStack Query client
- global error handling
- loading and empty states

### Exit Criteria
- all MVP routes render;
- UI uses mocked or real API consistently.

## Phase 4 — Projects and Requests

### Deliverables
- project list and details
- new project workflow
- request creation and lifecycle
- project status controls

### Exit Criteria
- user can register a project and create a request;
- all changes appear in activity.

## Phase 5 — Specification and Planning

### Deliverables
- spec generation provider contract
- spec editor and version history
- plan generation
- plan editor
- approval workflow

### Exit Criteria
- idea can become approved spec and plan;
- edits create revisions;
- builders cannot modify approved source documents.

## Phase 6 — Task Engine

### Deliverables
- task generation
- dependencies
- approval and priority controls
- task queue views
- idempotency keys

### Exit Criteria
- approved plan produces non-duplicate tasks;
- blocked and ready states are correct.

## Phase 7 — Morning Orchestrator

### Deliverables
- `projectos morning`
- project audit pipeline
- repository summary
- gap analysis
- reconciliation
- morning report

### Exit Criteria
- active projects are audited;
- completed projects are skipped;
- duplicate runs do not duplicate tasks.

## Phase 8 — Scheduler and Agent Registry

### Deliverables
- atomic task claiming
- configurable builder pool
- agent registration
- heartbeat leases
- pause and kill switch

### Exit Criteria
- up to five builders can register;
- no task is assigned twice;
- stale claims enter recovery state.

## Phase 9 — Builder Runtime

### Deliverables
- provider adapters
- context bundles
- execution logs
- task summaries
- safe project path resolution

### Exit Criteria
- builder can claim, implement, and report one task;
- task execution cannot leave workspace root.

## Phase 10 — Verification

### Deliverables
- command-based test execution
- acceptance-criteria evaluation
- retry policy
- needs-review flow

### Exit Criteria
- failed checks prevent completion;
- verified tasks become completed;
- evidence is stored.

## Phase 11 — Mission Control Dashboard

### Deliverables
- overview
- tasks
- requests
- agents
- reports
- activity
- settings
- project details
- task details
- agent details

### Exit Criteria
- user can understand workspace state in thirty seconds;
- controls mutate backend state correctly;
- live updates appear within five seconds.

## Phase 12 — Reporting and Recovery

### Deliverables
- daily, project, audit, and run reports
- interrupted-run recovery
- safe reset commands
- repair mode
- archive behavior

### Exit Criteria
- state survives process restarts;
- reset never deletes source;
- reports explain outcomes and failures.

## Phase 13 — End-to-End Hardening

### Deliverables
- E2E test suite
- performance checks
- security tests
- example workspace
- installation docs
- release packaging

### Exit Criteria
- complete idea-to-verified-task workflow passes;
- acceptance criteria in PRD are satisfied;
- no critical security or data-loss defect remains.

## MVP Release Gate

Release only when:

- init, morning, run, report, request, status, and reset work;
- all source-of-truth documents match implementation;
- dashboard covers all MVP screens;
- parallel execution is safe;
- activity history is complete;
- interrupted execution is recoverable;
- automated test suite passes.
