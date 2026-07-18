# ProjectOS Terminal UX Specification

## 1. Product Experience

ProjectOS MVP uses the terminal as Mission Control. There is no browser dashboard.

The CLI must make it easy to answer:

- What is happening now?
- What needs approval or review?
- Which projects are progressing or blocked?
- Which agents are running?
- What changed today?

## 2. Interaction Modes

### Command Mode

Explicit commands for scripts, repeatability, and automation.

### Interactive Mode

Prompts, confirmations, selections, and external-editor workflows when required arguments are absent.

### JSON Mode

Stable output for shell scripts and future integrations.

### Watch Mode

Periodic terminal refresh for runs, tasks, and agents. Watch mode reads persisted state and does not require a server.

## 3. Primary Views

### Workspace Status

Displays workspace health, project counts, task queues, active runs, active agents, approvals, blockers, and latest report.

### Projects

List and detail output includes phase, status, progress, active request, approved spec and plan versions, open tasks, blockers, and last audit.

### Tasks

Queue views include proposed, pending approval, ready, running, blocked, needs review, failed, and completed.

Task detail includes description, acceptance criteria, dependencies, priority, assignment, attempts, changed files, commands, tests, verification evidence, and activity history.

### Requests

Create, list, inspect, approve, reject, and cancel workflows.

### Agents

Displays role, provider, status, current project, current task, heartbeat, duration, and recent outcomes.

### Reports

Readable terminal summaries with optional full Markdown export.

### Activity

Chronological audit output with filters by project, task, agent, run, event type, and date.

### Settings and Doctor

Configuration is edited through `projectos init`, config files, and explicit commands. `projectos doctor` explains invalid or missing configuration and suggests safe fixes.

## 4. Presentation Rules

- Use tables for compact lists and sections for details.
- Do not rely on color alone; always include status text or symbols.
- Respect `NO_COLOR` and `--no-color`.
- Avoid animation when output is redirected.
- Progress indicators must not corrupt logs or JSON output.
- Destructive actions require confirmation unless an explicit non-interactive confirmation flag is present.
- Errors must include the failed operation, cause, and next action.

## 5. External Editing

Long specifications and plans may be written to temporary Markdown files and opened with `$EDITOR`. Saving creates a new revision; approval remains a separate command.

## 6. Accessibility and Automation

- All functionality must be keyboard-driven.
- Human output must remain readable in common terminals.
- JSON mode must contain no decorative output.
- Exit codes must match `docs/CLI.md`.
