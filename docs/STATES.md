# ProjectOS State Machines

## Project

States:
`new`, `active`, `paused`, `completed`, `maintenance`, `unavailable`, `archived`

Transitions:
- new → active after approved spec and plan
- active → paused by human control
- paused → active by resume
- active → completed when all required work verifies
- completed → maintenance when approved request is added
- maintenance → completed when request work verifies
- any non-archived → unavailable when folder is missing
- unavailable → prior active state after recovery
- any → archived by explicit action

## Task

States:
`draft`, `pending_approval`, `ready`, `claimed`, `running`, `verifying`, `completed`, `blocked`, `failed`, `needs_review`, `cancelled`

Key transitions:
- draft → pending_approval
- pending_approval → ready or cancelled
- ready → claimed
- claimed → running
- running → verifying
- verifying → completed
- verifying → failed or needs_review
- failed → ready when retry approved
- running → needs_review on stale context or lease expiry
- blocked → ready when dependencies resolve

## Request

States:
`draft`, `submitted`, `approved`, `planning`, `in_progress`, `completed`, `rejected`, `cancelled`

## Agent

States:
`idle`, `claimed`, `running`, `verifying`, `paused`, `offline`, `error`

## Run

States:
`queued`, `running`, `completed`, `partial`, `failed`, `cancelled`

## Invalid Transitions

The backend must reject:

- completed task → running without explicit retry clone;
- archived project → active without restore;
- rejected request → approved without reopen;
- offline agent → running without fresh registration;
- completed project → active without an approved request or explicit reopen.
