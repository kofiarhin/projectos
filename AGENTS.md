# ProjectOS Agent Instructions

## Purpose

This file defines repository-wide operating rules for AI agents working on ProjectOS.

## Source of Truth

Read before implementation:

1. `INDEX.md`
2. `docs/PRD.md`
3. `docs/ARCHITECTURE.md`
4. `docs/IMPLEMENTATION_PLAN.md`
5. `docs/AGENT_CONTRACT.md`
6. Relevant subsystem specifications

Do not invent requirements that conflict with these files.

## Architecture Rules

- ProjectOS MVP is a CLI-first local application.
- Do not add Express, REST endpoints, CORS, browser-server communication, or a browser dashboard.
- CLI commands invoke application services directly in-process.
- Keep command parsing thin; business logic belongs in reusable packages.
- MongoDB is the operational source of truth.
- The filesystem is the source-code source of truth.
- Keep provider-specific behavior behind adapters.
- Codex CLI is the initial provider inspiration, not a hard-coded domain dependency.

## Implementation Rules

- Work one implementation phase at a time.
- Do not start the next phase until exit criteria are verified.
- Work only on the assigned task.
- Use TypeScript throughout.
- Use Node.js, MongoDB, Mongoose, Zod, and Pino where applicable.
- Use Jest for CLI, service, persistence, and workflow tests.
- Never operate outside the registered workspace root.
- Never delete user source code during reset or recovery.
- Every meaningful state mutation must create an activity record.
- Preserve idempotency for initialization and morning audit workflows.
- Require verification evidence before completion.
- Update affected documentation whenever contracts or behavior change.

## Completion Output

Every completed task or phase must include:

- summary;
- files changed;
- commands run;
- lint result;
- type-check result;
- test result;
- build result;
- unresolved issues;
- confirmation that the next phase was not started.
