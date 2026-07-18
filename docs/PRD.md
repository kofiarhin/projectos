# ProjectOS Product Requirements Document

**Version:** 1.1  
**Status:** MVP Source of Truth

## 1. Product Summary

ProjectOS is a CLI-first Autonomous Development Operating System that manages the full software-development lifecycle across multiple repositories inside one local workspace.

The user provides ideas, requests, approvals, and corrections through explicit terminal commands and interactive prompts. ProjectOS converts that intent into specifications, implementation plans, tasks, bounded builder runs, verification evidence, and persisted reports.

## 2. Product Goal

Allow a solo developer or technical founder to manage a portfolio of local projects without manually coordinating daily planning and execution.

## 3. Product Principles

- Human provides intent and approvals.
- ProjectOS orchestrates.
- Builders execute bounded tasks.
- Verifiers require evidence.
- MongoDB stores operational state.
- The filesystem stores source code.
- The CLI is the only required user interface in the MVP.
- Commands invoke local application services directly; no network API is required.
- Planning and execution remain separate.
- Every action is observable and recoverable.

## 4. MVP Scope

### Included

- One local workspace root containing multiple projects.
- Workspace initialization and repository discovery.
- Interactive and non-interactive CLI commands.
- Project, request, specification, plan, task, run, report, agent, and activity state in MongoDB.
- Specification and plan generation, versioning, review, and approval through CLI workflows.
- Idempotent morning audits.
- Up to five parallel builder agents.
- Verification, retries, needs-review handling, pause, cancellation, and safe recovery.
- Human-readable terminal output and stable JSON output.
- Markdown reports written to configured local output paths.
- A `doctor` command for local readiness checks.

### Excluded

- Express or another HTTP server.
- REST, GraphQL, WebSocket, or Server-Sent Events interfaces.
- Browser dashboard or web setup wizard.
- CORS, authentication, and browser session management.
- Multi-user permissions.
- Cloud workers or hosted SaaS.
- Automated deployments.
- Embeddings, learning systems, billing, or plugin marketplace.

## 5. Core Lifecycle

Idea → Discovery → Specification → Planning → Task Generation → Approval → Execution → Verification → Completion → Maintenance

## 6. Core Commands

- `projectos init`
- `projectos morning`
- `projectos run`
- `projectos report`
- `projectos request`
- `projectos status`
- `projectos doctor`
- `projectos reset`

## 7. Functional Requirements

### FR-1 Initialization

`projectos init` must validate the workspace root, discover candidate repositories, allow interactive selection or non-interactive configuration, validate MongoDB and provider availability, persist workspace configuration, and safely support repeated execution.

### FR-2 Project and Request Management

The CLI must create, list, inspect, pause, resume, archive, and reactivate projects, and must create and process idea, feature, bug, refactor, and maintenance requests.

### FR-3 Specifications and Plans

The CLI must generate, inspect, edit through an external editor or file workflow, version, approve, reject, and compare specifications and plans. Builders must use only approved versions.

### FR-4 Morning Audit

`projectos morning` must audit active projects, reconcile repository state against approved intent, skip completed projects without active requests, generate non-duplicate tasks, and persist a morning report.

### FR-5 Execution

`projectos run` must select approved ready tasks, enforce dependencies and project-level conflict rules, assign work to up to five local builders, invoke provider adapters, capture logs, and persist results.

### FR-6 Verification

Tasks cannot complete without explicit verification evidence. Failed or inconclusive checks must produce failed or needs-review states.

### FR-7 Human Control

Commands and prompts must support approve, reject, edit, reprioritize, pause, resume, retry, cancel, and inspect operations.

### FR-8 Reporting and Observability

Every meaningful mutation must create an activity event. The CLI must display and export workspace, project, audit, run, and daily reports.

### FR-9 Doctor and Recovery

`projectos doctor` must validate configuration, MongoDB connectivity, workspace access, provider availability, and required local tools without starting a server. Reset and recovery must never delete user source code.

## 8. CLI Experience Requirements

- Human-readable default output.
- `--json` for stable machine-readable output.
- Interactive prompts when required arguments are absent.
- Non-interactive mode for automation.
- Meaningful progress, errors, warnings, and exit codes.
- Long-running commands must survive partial failure and leave inspectable run records.

## 9. Non-Functional Requirements

- Commands must be restart-safe where documented.
- Initialization and morning audit must be idempotent.
- Filesystem access must remain inside the registered workspace root.
- Provider behavior must remain behind adapters.
- Business logic must not live in command-parser code.
- All state transitions must be validated in application services.
- Secrets must not be persisted in reports, logs, or prompts.

## 10. Success Criteria

The MVP is successful when a user can initialize a workspace, register projects, generate and approve specs and plans, run an idempotent morning audit, approve and execute tasks, verify outcomes, inspect status and reports, recover failures, and continue across multiple days using only the ProjectOS CLI.
