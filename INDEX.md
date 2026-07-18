# ProjectOS Documentation Index

This repository contains the canonical source-of-truth documentation for ProjectOS.

## Authority Order

1. `docs/PRD.md` — product intent and MVP scope
2. `docs/ARCHITECTURE.md` — technical architecture and boundaries
3. `docs/IMPLEMENTATION_PLAN.md` — implementation order and exit criteria
4. Supporting subsystem specifications

When documents conflict, stop implementation and reconcile the documents before proceeding.

## MVP Architecture Decision

ProjectOS is a strictly CLI-first local application for the MVP.

- Commands invoke TypeScript application services directly.
- MongoDB stores operational state.
- The filesystem stores source code.
- AI providers are accessed through local adapters, with Codex CLI as the initial inspiration.
- There is no Express API, REST interface, browser dashboard, CORS layer, or network event stream in the MVP.
- Human control is provided through commands, prompts, structured terminal output, and generated Markdown reports.

## File Inventory

| File | Purpose |
|---|---|
| `README.md` | Product overview and quick start |
| `AGENTS.md` | Repository-wide implementation rules |
| `.env.example` | Local runtime configuration |
| `projectos.config.example.json` | Workspace configuration example |
| `docs/PRD.md` | Product requirements and MVP scope |
| `docs/ARCHITECTURE.md` | CLI-first architecture and module boundaries |
| `docs/IMPLEMENTATION_PLAN.md` | Phased implementation plan |
| `docs/AGENT_CONTRACT.md` | Orchestrator, builder, verifier, and reporter contracts |
| `docs/DATABASE.md` | MongoDB data model and consistency rules |
| `docs/API.md` | Internal application-service contracts; no network API in MVP |
| `docs/CLI.md` | Command, flag, prompt, output, and exit-code contracts |
| `docs/UI.md` | Terminal UX and generated report presentation |
| `docs/SEQUENCES.md` | End-to-end command workflows |
| `docs/STATES.md` | State machines and transition rules |
| `docs/TESTING.md` | Test strategy and release gates |
| `docs/SECURITY.md` | Local execution security boundaries |

## Product Lifecycle

Idea → Discovery → Specification → Planning → Tasks → Execution → Verification → Completion → Maintenance
