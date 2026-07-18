# ProjectOS Agent Instructions

## Purpose

This file defines repository-wide operating rules for any AI coding agent working on ProjectOS.

## Source of Truth

Read these files before implementation:

1. `docs/PRD.md`
2. `docs/ARCHITECTURE.md`
3. `docs/IMPLEMENTATION_PLAN.md`
4. `docs/AGENT_CONTRACT.md`
5. The subsystem document relevant to the task

Do not invent requirements that conflict with these files.

## General Rules

- Work only on the assigned task.
- ProjectOS is CLI-first: the `projectos` CLI is the only application entry point.
- All runtime behavior is local and in-process. Do not add an HTTP server, REST/GraphQL API, CORS layer, browser dashboard, or Vite app to the MVP.
- Implement reusable logic as TypeScript application services in `packages/*` and call them directly from CLI command handlers in `apps/cli`.
- Use Node.js + MongoDB (Mongoose in later phases) for persistence.
- Keep provider-specific behavior behind adapters in `packages/providers`.
- Use Zod for command-input and configuration validation.
- Use Jest for CLI tests and Vitest for shared package tests.
- Do not modify user projects outside the active task scope.
- Never delete source code as part of reset or recovery operations.
- Every state mutation must produce an activity event.
- All commands must be idempotent where specified.
- Always run relevant tests before marking a task complete.
- Update documentation when behavior or contracts change.

## Completion Output

Every task completion must include:

- Summary of changes
- Files changed
- Tests run and results
- Risks or limitations
- Follow-up work
- Final task status
