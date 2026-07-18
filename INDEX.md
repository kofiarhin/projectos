# ProjectOS Documentation Index

This repository contains the canonical source-of-truth documentation for ProjectOS.

## Authority Order

1. `docs/PRD.md` — product intent and requirements
2. `docs/ARCHITECTURE.md` — technical architecture and system boundaries
3. `docs/IMPLEMENTATION_PLAN.md` — implementation order and delivery criteria
4. Supporting specifications listed below

When documents conflict, use the authority order above and raise the conflict for correction.

## File Inventory

| File | Purpose | Primary Audience |
|---|---|---|
| `README.md` | Project overview, quick start, and documentation map | Everyone |
| `AGENTS.md` | Repository-wide rules for AI coding agents | AI agents, contributors |
| `.env.example` | Required environment variables | Developers, operators |
| `projectos.config.example.json` | Example local workspace configuration | Developers, operators |
| `docs/PRD.md` | Product vision, scope, users, requirements, acceptance criteria | Product, design, engineering |
| `docs/ARCHITECTURE.md` | System architecture, modules, boundaries, data flow, security | Engineering, AI agents |
| `docs/IMPLEMENTATION_PLAN.md` | Phased delivery plan with dependencies and exit criteria | Engineering, project management |
| `docs/AGENT_CONTRACT.md` | Orchestrator, builder, verifier, and reporter contracts | AI agents, engineering |
| `docs/DATABASE.md` | MongoDB collections, schemas, indexes, and lifecycle rules | Backend engineering |
| `docs/CLI.md` | CLI commands, flags, prompts, outputs, and exit codes | CLI engineering, users |
| `docs/API.md` | Retained (non-MVP) HTTP API design — not built in the CLI-first MVP | Future reference |
| `docs/UI.md` | Retained (non-MVP) browser dashboard design — not built in the CLI-first MVP | Future reference |
| `docs/SEQUENCES.md` | End-to-end workflow sequences | Engineering, QA |
| `docs/STATES.md` | State machines and transition rules | Engineering, QA |
| `docs/TESTING.md` | Test strategy, test pyramid, and release gates | Engineering, QA |
| `docs/SECURITY.md` | Security model, trust boundaries, and safeguards | Engineering, security |

## Product Summary

ProjectOS is a CLI-first, single-workspace autonomous development operating system that manages multiple software projects through a repeatable lifecycle:

Idea → Discovery → Specification → Planning → Tasks → Execution → Verification → Completion → Maintenance

The human provides intent and oversight through the `projectos` CLI. ProjectOS orchestrates in-process. Builder agents implement. MongoDB stores operational state. The filesystem stores source code. There is no HTTP server or browser dashboard in the MVP.
