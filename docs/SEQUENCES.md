# ProjectOS Sequence Specifications

## Initialization

1. User runs `projectos init`.
2. CLI validates workspace root.
3. Workspace engine scans child folders.
4. User reviews detected projects.
5. CLI validates MongoDB and provider configuration in-process.
6. Workspace record is created.
7. Projects are registered.
8. Missing specifications and plans are queued.
9. Local workspace config is written.
10. Initialization report is created.

## Morning Audit

1. User runs `projectos morning`.
2. Run record is created.
3. Active projects are loaded.
4. Completed projects without active requests are skipped.
5. Repository state is summarized.
6. Approved spec and plan are loaded.
7. Previous task outcomes are reconciled.
8. Gaps are identified.
9. New tasks are generated with idempotency keys.
10. Tasks enter pending approval or ready state.
11. Morning report is generated.
12. Run completes.

## Run Tasks

1. User runs `projectos run --all`.
2. Scheduler loads approved ready tasks.
3. Conflict and dependency checks run.
4. Available agents atomically claim tasks.
5. Context service builds revisioned bundles.
6. Builders implement.
7. Builders submit results.
8. Verification runs.
9. Passing tasks complete.
10. Failed tasks retry or move to needs review.
11. Activity and reports update.

## New Request

1. User creates request via `projectos request`.
2. Request is submitted.
3. Human approves request.
4. Project reactivates if completed.
5. Orchestrator updates spec or plan.
6. Tasks are generated.
7. User reviews tasks.
8. Execution follows normal task flow.

## Manual Edit During Execution

1. User edits task, spec, or plan.
2. Revision increments.
3. Running builder attempts completion.
4. Backend detects stale context revision.
5. Task moves to needs review.
6. User chooses retry with latest context or accept current result.

## Interrupted Builder

1. Heartbeat lease expires.
2. Agent becomes offline.
3. Task claim becomes stale.
4. Task moves to needs review.
5. User or recovery process inspects repository state.
6. Task is resumed, retried, or cancelled.

## Completed Project Reactivation

1. Project is completed.
2. Morning runs skip it.
3. User adds approved feature or bug request.
4. Project transitions to maintenance or active.
5. Spec and plan are revised.
6. New tasks are generated.
