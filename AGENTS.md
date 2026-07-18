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
- Keep API logic out of React components.
- Use React + Vite + Tailwind for the dashboard.
- Use TanStack Query for server state.
- Use Redux Toolkit only for genuine global client state.
- Use Node.js + Express + MongoDB + Mongoose for the backend.
- Use Zod for request and configuration validation.
- Use Vitest for frontend tests and Jest for backend tests.
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
