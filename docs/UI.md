# ProjectOS UI Specification

> **Status: Not part of the CLI-first MVP.**
>
> The MVP user interface is the `projectos` CLI (see `docs/CLI.md`). There is no
> browser dashboard, React app, or Vite build in the MVP. This document is
> retained as design reference for a possible future Mission Control dashboard.

## 1. Product Experience

The dashboard is a single-workspace Mission Control. It must answer:

- What is happening now?
- What needs attention?
- Which projects are progressing?
- Which agents are active?
- What changed today?

## 2. Navigation

- Overview
- Projects
- Tasks
- Requests
- Agents
- Reports
- Activity
- Settings

## 3. Screens

### Workspace Setup Wizard
Steps: Welcome, workspace root, detected projects, database, AI provider, generated specs, generated plans, review, finish.

### Workspace Overview
Widgets:
- workspace health;
- project counts;
- today's task counts;
- active agents;
- attention queue;
- project progress cards;
- timeline;
- latest report.

### Projects
Card and list views with phase, status, progress, next action, last audit, and attention state.

### Project Details
Tabs:
- Overview
- Specification
- Plan
- Tasks
- Requests
- Reports
- Activity
- Settings

### Requests
Filterable request list and create/edit flow.

### Tasks
Queue-based view grouped by ready, running, needs review, blocked, and completed.

### Task Details
Description, acceptance criteria, dependencies, project, agent, context revision, logs, changed files, verification evidence, history, and controls.

### Agents
Live status cards showing provider, role, task, project, duration, and heartbeat.

### Agent Details
Capabilities, current assignment, execution logs, recent tasks, errors, and pause/resume controls.

### Reports
Report list with filters and readable report detail view.

### Activity
Chronological audit feed with filters by project, task, agent, run, and event type.

### Settings
Workspace path, MongoDB connection status, provider configuration, concurrency, approval mode, ignored folders, notifications, and safety settings.

## 4. Shared States

Every screen must define:

- loading;
- empty;
- partial data;
- stale data;
- error;
- permission/safety restriction;
- paused workspace.

## 5. Interaction Rules

- Destructive operations require confirmation.
- Manual edits display unsaved and stale-revision warnings.
- Live agent state updates without full-page refresh.
- Important failures appear in an attention queue.
- Completed projects remain visible but quiet.
- Status color is never the only indicator; always include labels or icons.

## 6. Frontend Architecture

- React + latest Vite
- Tailwind CSS
- TanStack Query for server state
- React Router
- Zod for client-side form validation
- Redux Toolkit only when cross-route local state genuinely requires it
- API calls live in service modules, never components
