# ProjectOS Testing Strategy

## Test Pyramid

### Unit Tests
- domain transitions;
- validators;
- idempotency fingerprints;
- path safety;
- task conflict checks;
- provider adapters;
- report formatting.

### Integration Tests
- MongoDB repositories;
- CLI command handlers invoking application services;
- task claiming;
- heartbeat expiry;
- activity creation;
- spec and plan revision conflicts.

### End-to-End Tests
- CLI-driven, in-process; no running server is required for any test;
- initialize workspace;
- add project idea;
- generate spec and plan;
- morning audit;
- approve tasks;
- run builders;
- verify completion;
- create request on completed project;
- recover interrupted execution;
- reset operational state safely.

## Tooling

- Vitest for shared TypeScript packages.
- Jest for the CLI and application-service packages.
- MongoDB test containers or isolated test database.
- No HTTP test client or browser test runner is required; the runtime is
  CLI-first and in-process.

## Release Gates

- all unit and integration tests pass;
- critical E2E workflows pass;
- no path traversal;
- reset cannot delete source;
- duplicate morning test passes;
- stale-context test passes;
- parallel claim test passes;
- CLI output contracts (human and `--json`) are current.

## Test Data

Use synthetic repositories only. Never run destructive tests against user workspaces.
