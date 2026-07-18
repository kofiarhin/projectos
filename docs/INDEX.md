# ProjectOS Documentation Index

This directory contains the canonical source-of-truth documentation for ProjectOS.

## Authority Order

| Priority | File | Authority |
|---|---|---|
| 1 | `PRD.md` | Product vision, user value, MVP scope, requirements, success criteria |
| 2 | `ARCHITECTURE.md` | Technical architecture, component boundaries, runtime design |
| 3 | `IMPLEMENTATION_PLAN.md` | Delivery phases, dependencies, milestones, acceptance gates |
| 4 | `AGENT_CONTRACT.md` | Portable role contracts for orchestrators, builders, verifiers, and reporters |
| 5 | `DATABASE.md` | MongoDB collections, fields, indexes, retention, and consistency rules |
| 6 | `CLI.md` | Command behavior, flags, prompts, output, and exit codes |
| 7 | `SEQUENCES.md` | End-to-end workflows and interaction sequences |
| 8 | `STATES.md` | Lifecycle state machines and allowed transitions |

### Retained, non-MVP references

| File | Status |
|---|---|
| `API.md` | HTTP/REST API design retained for a possible future phase. Not built in the CLI-first MVP. |
| `UI.md` | Browser dashboard design retained for a possible future phase. Not built in the CLI-first MVP. |

## Repository-Level Files

| File | Purpose |
|---|---|
| `../README.md` | Project overview, quick start, documentation entry point |
| `../AGENTS.md` | Repository-wide instructions for AI agents |
| `../.env.example` | Environment variables required for local setup |
| `../projectos.config.json` | Portable workspace and runtime configuration |

## Change Management

Any change affecting product behavior must update:

- `PRD.md`
- the impacted specialized specification
- `IMPLEMENTATION_PLAN.md` when delivery scope changes

Any change affecting architecture must update:

- `ARCHITECTURE.md`
- the impacted subsystem specification
- `CLI.md` when command behavior changes
- `SEQUENCES.md` or `STATES.md` when behavior changes

## MVP Documentation Baseline

The MVP assumes:

- one local workspace
- multiple projects inside the workspace
- MongoDB for operational state
- a CLI-first, local, in-process runtime (no HTTP server, no browser dashboard)
- the `projectos` CLI as the single entry point
- reusable TypeScript application services under `packages/*`
- up to five parallel builders
- human review through the CLI
- no learning, embeddings, cloud execution, or multi-user permissions
