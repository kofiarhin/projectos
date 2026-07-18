# ProjectOS Database Specification

MongoDB is the operational source of truth.

## Collections

### workspaces
Fields: name, rootPath, status, configVersion, initializedAt, pausedAt, createdAt, updatedAt.

Indexes: unique normalized rootPath.

### projects
Fields: workspaceId, name, slug, relativePath, repositoryType, status, phase, progress, activeSpecVersion, activePlanVersion, lastAuditAt, completedAt, archivedAt.

Indexes: unique workspaceId + relativePath; workspaceId + status.

### specifications
Fields: projectId, version, source, contentMarkdown, status, createdBy, approvedAt, supersedesId, contentHash.

Indexes: unique projectId + version; projectId + status.

### plans
Fields: projectId, specificationId, version, contentMarkdown, milestones, status, contentHash, approvedAt.

### requests
Fields: projectId, type, title, description, priority, status, attachments, createdBy, approvedAt, resolvedAt.

### tasks
Fields: projectId, planId, requestIds, title, description, acceptanceCriteria, priority, status, dependencies, assignedAgentId, claimToken, claimExpiresAt, contextRevision, idempotencyKey, verificationResult, startedAt, completedAt.

Indexes: unique idempotencyKey; status + priority; projectId + status; claimExpiresAt.

### agents
Fields: name, role, provider, capabilities, status, currentProjectId, currentTaskId, lastHeartbeatAt, leaseExpiresAt, metadata.

### runs
Fields: workspaceId, type, status, startedAt, completedAt, initiatedBy, inputFingerprint, summary, error.

Indexes: workspaceId + type + startedAt; inputFingerprint.

### reports
Fields: workspaceId, projectId, runId, type, title, contentMarkdown, structuredData, createdAt.

### activities
Append-only fields: workspaceId, projectId, taskId, requestId, runId, agentId, eventType, actorType, actorId, message, metadata, createdAt.

Indexes: workspaceId + createdAt; projectId + createdAt; taskId + createdAt.

### settings
Fields: workspaceId, key, value, encrypted, updatedAt.

## Core Enums

Project status: `new`, `active`, `paused`, `completed`, `maintenance`, `unavailable`, `archived`.

Task status: `draft`, `pending_approval`, `ready`, `claimed`, `running`, `verifying`, `completed`, `blocked`, `failed`, `needs_review`, `cancelled`.

Request status: `draft`, `submitted`, `approved`, `planning`, `in_progress`, `completed`, `rejected`, `cancelled`.

Agent status: `idle`, `claimed`, `running`, `verifying`, `paused`, `offline`, `error`.

Run status: `queued`, `running`, `completed`, `partial`, `failed`, `cancelled`.

## Consistency Rules

- One active approved specification per project.
- One active approved plan per project.
- Task completion requires verification result.
- Activity records are append-only.
- Claims use atomic compare-and-set.
- Manual edits increment context revision.
- Builders must reject stale context revisions.
