# ProjectOS CLI Specification

Executable: `projectos`

The CLI is the sole required user interface for the MVP. Commands call application services directly in-process.

## Global Flags

- `--config <path>`
- `--json`
- `--quiet`
- `--verbose`
- `--no-color`
- `--non-interactive`

## Global Behavior

- Default output is human-readable.
- `--json` emits stable machine-readable results.
- Missing required input triggers prompts unless `--non-interactive` is set.
- Long-running commands persist a run record before work begins.
- Ctrl+C requests graceful cancellation and preserves recoverable state.

## `projectos init`

Initializes or repairs a workspace.

Flags:
- `--root <path>`
- `--mongodb-uri <uri>`
- `--provider <name>`
- `--rescan`
- `--skip-generation`

## `projectos morning`

Runs the idempotent morning audit.

Flags:
- `--project <slug>`
- `--dry-run`
- `--force`
- `--approve`

Completed projects without active requests are skipped by default.

## `projectos run`

Executes approved ready tasks.

Flags:
- `--all`
- `--task <id>`
- `--project <slug>`
- `--max-agents <1-5>`
- `--dry-run`
- `--watch`

## `projectos request`

Creates or inspects requests.

Subcommands:
- `create`
- `list`
- `show`
- `approve`
- `reject`
- `cancel`

Request types: `idea`, `feature`, `bug`, `refactor`, `maintenance`.

## `projectos status`

Shows workspace, project, task, run, and agent state.

Flags:
- `--project <slug>`
- `--tasks`
- `--agents`
- `--runs`
- `--watch`
- `--compact`

## `projectos report`

Generates or displays reports.

Flags:
- `--type morning|daily|workspace|project|audit|run`
- `--project <slug>`
- `--date <YYYY-MM-DD>`
- `--output <path>`

## `projectos doctor`

Validates local readiness without starting a server.

Checks:
- configuration file;
- workspace root access and boundary safety;
- MongoDB connectivity;
- provider availability;
- Node.js and required command-line tools;
- writable ProjectOS state and report directories.

Flags:
- `--fix` for safe configuration repairs only;
- `--json` for automation.

## `projectos reset`

Resets explicitly selected operational state.

Flags:
- `--tasks`
- `--reports`
- `--cache`
- `--failed-runs`
- `--all-operational`
- `--project <slug>`
- `--confirm`

Reset never deletes project source code.

## Exit Codes

- `0` success
- `1` unexpected failure
- `2` invalid arguments or configuration
- `3` database unavailable
- `4` workspace invalid or unsafe
- `5` provider unavailable
- `6` domain state conflict
- `7` verification failed
- `8` operation cancelled
- `9` human review required

## Output Contract

Every JSON result contains:

```json
{
  "command": "morning",
  "status": "success",
  "runId": "optional",
  "summary": "string",
  "data": {},
  "warnings": [],
  "errors": [],
  "exitCode": 0
}
```
