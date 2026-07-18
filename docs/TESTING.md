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
- API endpoints;
- task claiming;
- heartbeat expiry;
- activity creation;
- spec and plan revision conflicts.

### End-to-End Tests
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

- Vitest for dashboard and shared frontend packages.
- Jest for backend and CLI.
- Supertest for API.
- MongoDB test containers or isolated test database.
- Playwright for dashboard E2E.

## Release Gates

- all unit and integration tests pass;
- critical E2E workflows pass;
- no path traversal;
- reset cannot delete source;
- duplicate morning test passes;
- stale-context test passes;
- parallel claim test passes;
- API contract snapshots are current.

## Test Data

Use synthetic repositories only. Never run destructive tests against user workspaces.
