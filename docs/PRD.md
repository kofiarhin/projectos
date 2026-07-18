# ProjectOS Product Requirements Document

**Version:** 1.0  
**Status:** MVP Source of Truth

## 1. Product Summary

ProjectOS is an Autonomous Development Operating System that manages the full software development lifecycle across multiple projects inside one local workspace.

A user can provide a project idea, feature request, bug, or refactor request. ProjectOS converts that intent into specifications, implementation plans, executable tasks, verified code changes, reports, and ongoing maintenance state.

## 2. Problem

AI coding tools are effective at producing code but still depend on humans to coordinate the surrounding work:

- turning ideas into specifications;
- planning implementation;
- breaking work into tasks;
- tracking state across projects;
- selecting the next action;
- supervising multiple agents;
- verifying completion;
- maintaining historical context.

The coordination burden becomes the bottleneck, especially when one person manages several applications simultaneously.

## 3. Goal

Allow a user to manage a portfolio of software projects without manually coordinating daily implementation work.

The human should mainly:

- provide ideas and change requests;
- review or edit specifications and plans;
- approve, pause, reject, or reprioritize tasks;
- inspect reports and exceptions.

ProjectOS should own the operational loop.

## 4. Product Principles

- Human provides intent.
- ProjectOS orchestrates.
- Builders execute.
- Verifiers confirm.
- MongoDB stores operational state.
- Filesystem stores code.
- Planning and execution remain separate.
- Every action is observable and recoverable.
- Completed projects remain dormant until a new request reactivates them.

## 5. MVP User

The primary MVP user is a solo developer or technical founder managing several local repositories from one machine.

Secondary users are small technical teams, but multi-user permissions are out of scope for MVP.

## 6. MVP Scope

### Included

- One local workspace root.
- Multiple discovered or manually added projects.
- Workspace initialization wizard.
- Project lifecycle management.
- Specification generation and editing.
- Implementation plan generation and editing.
- Task generation and approval.
- Up to five parallel builder agents.
- Verification and retry workflow.
- MongoDB-backed operational state.
- CLI commands as the single entry point.
- Requests for ideas, features, bugs, refactors, and maintenance.
- Runs, reports, activity history, and agent status.
- Safe reset and kill-switch controls.

### Excluded

- Browser dashboard (deferred to a post-MVP phase).
- HTTP/REST API or persistent application server.
- Multi-user permissions.
- Cloud execution.
- Automated deployment.
- Hosted SaaS.
- Vector memory and embeddings.
- Self-optimizing agent behavior.
- Cross-workspace orchestration.
- Billing.
- Mobile apps.

## 7. Core Lifecycle

Idea → Discovery → Specification → Planning → Task Generation → Approval → Execution → Verification → Completion → Maintenance

## 8. Core Commands

- `projectos init`
- `projectos morning`
- `projectos run`
- `projectos report`
- `projectos request`
- `projectos status`
- `projectos reset`

## 9. Functional Requirements

### FR-1 Workspace Initialization

The system must allow the user to select a workspace root, scan child folders, detect repositories, register selected projects, connect MongoDB, select an AI provider, generate missing specs and plans, and persist configuration.

### FR-2 Project Discovery

The system must detect candidate projects from the workspace root while ignoring configured folders.

### FR-3 Project Registration

The system must support discovered projects and manually created projects containing only a name and idea.

### FR-4 Specification Management

The system must generate, version, edit, approve, and store project specifications.

### FR-5 Planning

The system must convert an approved specification into milestones, phases, dependencies, and implementation tasks.

### FR-6 Morning Audit

`projectos morning` must audit every active project, compare code against approved intent, reconcile completed work, identify gaps, generate or update tasks, and produce a morning report.

The command must be idempotent for the same workspace state.

### FR-7 Task Execution

`projectos run` must select approved ready tasks, assign them to available builders, execute non-conflicting work in parallel, verify outcomes, and update state.

### FR-8 Human Controls

The CLI must support approving, editing, pausing, resuming, rejecting, reprioritizing, retrying, and cancelling work.

### FR-9 Requests

A request must support type, project, title, description, priority, status, and attachments metadata. Requests must flow into specs, plans, and tasks.

### FR-10 Completed Projects

Completed projects must not be audited during morning runs unless a new approved request reactivates them.

### FR-11 Reporting

The system must generate workspace, project, audit, run, and daily reports.

### FR-12 Observability

Every significant action must appear in the activity timeline with actor, timestamp, target, and outcome.

### FR-13 Agent Registry

The system must show agent identity, provider, status, current task, current project, heartbeat, and recent history.

### FR-14 Reset and Kill Switch

Reset operations must be scoped and must never delete project source code. A workspace-wide pause must stop new assignments while allowing state to remain inspectable.

## 10. CLI Surface

The CLI is the MVP interface. It exposes:

1. `projectos init`
2. `projectos morning`
3. `projectos run`
4. `projectos report`
5. `projectos request`
6. `projectos status`
7. `projectos reset`
8. `projectos doctor`
9. `projectos --help`
10. `projectos --version`

> Post-MVP: A browser dashboard covering workspace overview, projects, requests,
> tasks, agents, reports, activity, and settings is deferred beyond the MVP. The
> retained design lives in `docs/UI.md`.

## 11. Non-Functional Requirements

- Commands must be restart-safe.
- State changes must be auditable.
- Paths must be portable using workspace-root-relative paths.
- The system must never execute outside the registered workspace root.
- The CLI must reflect current operational state read directly from MongoDB.
- Common CLI queries should return within one second under expected MVP load.
- System modules must be provider-agnostic.
- All state transitions must be validated in the application services.

## 12. Success Criteria

The MVP is successful when a user can:

- initialize a workspace in under ten minutes;
- register existing and new projects;
- run a morning audit without duplicate tasks;
- approve tasks from the CLI;
- execute several non-conflicting tasks through parallel builders;
- verify results and recover failures;
- understand portfolio health within thirty seconds using `projectos status`;
- continue work across multiple days without losing state.

## 13. Risks

- Incorrect gap analysis may generate invalid work.
- Parallel builders may modify overlapping files.
- Specs may drift from intended behavior.
- Local providers may produce inconsistent output.
- Long-running tasks may become stale after manual edits.
- Repository state may change outside ProjectOS.

These risks are mitigated through approval gates, task claims, context revision checks, verification, activity logs, and manual recovery states.
