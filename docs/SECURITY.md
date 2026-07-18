# ProjectOS Security Specification

## Trust Model

ProjectOS executes code-generating agents against local repositories. The workspace root is the primary security boundary.

## Requirements

- Canonicalize and validate all paths.
- Reject `..` traversal and symlink escape.
- Never send secrets, `.env` content, or credential files to providers.
- Maintain configurable ignore patterns.
- Sanitize CLI input before shell use.
- Prefer allowlisted commands for verification.
- Record actor and reason for privileged operations.
- Encrypt sensitive settings where stored.
- Run locally and in-process; do not open network listeners in the MVP.
- Redact provider tokens and connection strings from logs.
- Keep source deletion disabled for reset operations.

## Agent Safety

Agents receive least-privilege context and scope. They must not:

- access sibling projects unless assigned;
- mutate workspace configuration;
- alter approved specifications or plans;
- install global packages;
- execute commands unrelated to the assigned task.

## Incident Controls

- workspace kill switch;
- project pause;
- agent pause;
- task cancellation;
- claim expiry;
- immutable activity history;
- recovery reports.

## Security Tests

- traversal attempts;
- symlink escape;
- command injection;
- secret redaction;
- unauthorized state transition;
- concurrent claim collision;
- malformed provider output.
