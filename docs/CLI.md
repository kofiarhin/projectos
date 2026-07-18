# ProjectOS CLI Specification

Executable: `projectos`

## Global Flags

- `--config <path>`
- `--json`
- `--quiet`
- `--verbose`
- `--no-color`

## `projectos init`

Initializes a workspace.

Flags:
- `--root <path>`
- `--mongodb-uri <uri>`
- `--provider <name>`
- `--non-interactive`
- `--rescan`

Exit codes:
- 0 success
- 2 invalid configuration
- 3 database unavailable
- 4 workspace invalid

## `projectos morning`

Runs the morning audit.

Flags:
- `--project <slug>`
- `--dry-run`
- `--force`
- `--skip-completed`

Default behavior is idempotent and skips completed projects.

## `projectos run`

Executes approved ready tasks.

Flags:
- `--all`
- `--task <id>`
- `--project <slug>`
- `--max-agents <n>`
- `--dry-run`
- `--watch`

Without `--all`, interactive mode asks for confirmation.

## `projectos report`

Generates or displays reports.

Flags:
- `--type daily|workspace|project|audit|run`
- `--project <slug>`
- `--date <YYYY-MM-DD>`
- `--output <path>`

## `projectos request`

Creates a request.

Flags:
- `--project <slug>`
- `--type idea|feature|bug|refactor|maintenance`
- `--title <text>`
- `--description <text>`
- `--priority critical|high|medium|low`

## `projectos status`

Shows workspace summary, active runs, agent states, and task counts.

## `projectos reset`

Scoped operational reset.

Flags:
- `--tasks`
- `--reports`
- `--cache`
- `--failed-runs`
- `--all-operational`
- `--confirm`

Must never delete project source.

## Output Rules

Human mode uses readable tables and summaries. `--json` returns stable machine-readable JSON. Errors go to stderr.
