# ProjectOS Internal Application-Service Contracts

## Status

ProjectOS has no HTTP, REST, GraphQL, WebSocket, or Server-Sent Events API in the MVP.

This file retains the canonical name `API.md` for repository compatibility, but defines the typed in-process service boundary used by CLI command handlers.

## Contract Principles

- CLI parsing and rendering stay outside domain services.
- Services accept validated typed input and return typed results.
- Services do not write directly to stdout or stderr.
- Every mutation validates state transitions and records activity.
- MongoDB repositories remain behind service interfaces.
- Provider-specific behavior remains behind provider adapters.

## Result Envelope

```ts
interface ServiceResult<T> {
  data: T;
  warnings: ServiceWarning[];
  activityIds: string[];
}
```

Typed errors include a stable code, message, details, retryability, and recommended exit code.

## Service Groups

### WorkspaceService

- initialize
- scan
- repair
- getStatus
- pause
- resume
- resetOperationalState
- doctor

### ProjectService

- list
- get
- create
- update
- pause
- resume
- archive
- reactivate

### RequestService

- create
- list
- get
- approve
- reject
- cancel
- process

### SpecificationService

- generate
- listVersions
- getVersion
- createRevision
- approve
- reject
- compare

### PlanService

- generate
- listVersions
- getVersion
- createRevision
- approve
- reject
- compare

### TaskService

- list
- get
- create
- update
- approve
- pause
- resume
- retry
- cancel
- claim
- heartbeat
- submitBuilderResult
- submitVerificationResult

### RunService

- startMorning
- startExecution
- get
- list
- cancel
- recoverInterrupted

### ReportService

- generate
- get
- list
- renderMarkdown
- writeToFile

### AgentService

- register
- heartbeat
- pause
- resume
- list
- get

### ActivityService

- append
- list

## Concurrency

Task claims use atomic compare-and-set semantics and leases. Mutable user-edited entities use revision checks. A stale revision returns a domain conflict error rather than an HTTP status.

## CLI Mapping

Commands map to these services directly. The CLI converts domain errors into human-readable messages, JSON output, and documented process exit codes.
