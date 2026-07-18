# ProjectOS Sequence Specifications

## Initialization

1. User runs `projectos init`.
2. CLI parses flags and prompts for missing values.
3. CLI calls `WorkspaceService.initialize` directly.
4. Workspace service validates and canonicalizes the root.
5. Project discovery scans allowed child folders.
6. User confirms registrations in interactive mode, or supplied non-interactive policy is applied.
7. MongoDB and provider readiness are validated.
8. Workspace and project records are persisted.
9. `.projectos/workspace.json` is written safely.
10. Optional spec and plan generation is queued or executed.
11. Initialization report and activity events are persisted.
12. CLI renders human or JSON output and exits.

## Morning Audit

1. User runs `projectos morning`.
2. CLI creates a persisted run through `RunService`.
3. Orchestrator loads active projects directly from repositories.
4. Completed projects without active requests are skipped.
5. Repository state, approved documents, requests, prior tasks, and recent runs are summarized.
6. Provider adapter performs bounded audit reasoning.
7. Orchestrator reconciles completed work and detected gaps.
8. Task service creates only non-duplicate proposals using idempotency keys.
9. Reporter persists the morning report.
10. CLI prints the summary and required approvals.

## Run Tasks

1. User runs `projectos run`.
2. Scheduler queries approved executable tasks.
3. Dependencies and project-level conflicts are checked.
4. Available local builders atomically claim tasks.
5. Context service builds revisioned context bundles.
6. Builder invokes the configured provider adapter, initially Codex CLI.
7. Builder applies changes only inside the assigned project root.
8. Commands, changed files, logs, and summaries are persisted.
9. Verification evaluates acceptance criteria and configured checks.
10. Tasks become completed, failed, blocked, or needs review.
11. Claims are released and reports/activity are updated.
12. CLI renders progress or final output.

## Create Request

1. User runs `projectos request create`.
2. CLI validates or prompts for project, type, title, description, and priority.
3. Request service persists the request and activity event.
4. Approved requests reactivate completed projects when valid.
5. A later morning or explicit planning command updates specs, plans, and tasks.

## Manual Document Edit

1. User requests a spec or plan edit.
2. CLI writes the current version to a temporary Markdown file and opens `$EDITOR`.
3. Saved content is validated and stored as a new revision.
4. Approval remains a separate explicit action.
5. Running work with a stale context revision moves to needs review.

## Interrupted Builder

1. Builder process exits, loses its lease, or receives cancellation.
2. Run and task state remain persisted.
3. Scheduler detects lease expiry or cancellation.
4. Task moves to recoverable or needs-review state.
5. User inspects with `projectos status`, `projectos report`, or task detail commands.
6. User retries, resumes, or cancels.

## Doctor

1. User runs `projectos doctor`.
2. CLI validates configuration and workspace access.
3. Database connectivity is tested.
4. Provider and required local tools are checked.
5. Safe repair suggestions are displayed; `--fix` applies only explicitly permitted repairs.
6. No server is started.

## Reset

1. User runs `projectos reset` with explicit scope.
2. CLI displays impact and asks for confirmation.
3. Application services archive or clear selected operational state.
4. Activity records document the reset.
5. Project source code is untouched.
