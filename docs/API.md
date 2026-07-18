# ProjectOS API Specification

Base path: `/api/v1`

## Response Envelope

Success:

```json
{ "data": {}, "meta": {} }
```

Error:

```json
{
  "error": {
    "code": "TASK_NOT_READY",
    "message": "Task is not ready for execution",
    "details": {}
  }
}
```

## Workspace

- `GET /workspace`
- `POST /workspace/initialize`
- `POST /workspace/rescan`
- `POST /workspace/pause`
- `POST /workspace/resume`
- `POST /workspace/reset`
- `GET /workspace/status`

## Projects

- `GET /projects`
- `POST /projects`
- `GET /projects/:projectId`
- `PATCH /projects/:projectId`
- `POST /projects/:projectId/pause`
- `POST /projects/:projectId/resume`
- `POST /projects/:projectId/archive`
- `POST /projects/:projectId/audit`

## Specifications

- `GET /projects/:projectId/specifications`
- `POST /projects/:projectId/specifications/generate`
- `POST /projects/:projectId/specifications`
- `PATCH /specifications/:specificationId`
- `POST /specifications/:specificationId/approve`

## Plans

- `GET /projects/:projectId/plans`
- `POST /projects/:projectId/plans/generate`
- `PATCH /plans/:planId`
- `POST /plans/:planId/approve`

## Requests

- `GET /requests`
- `POST /requests`
- `GET /requests/:requestId`
- `PATCH /requests/:requestId`
- `POST /requests/:requestId/approve`
- `POST /requests/:requestId/reject`

## Tasks

- `GET /tasks`
- `GET /tasks/:taskId`
- `PATCH /tasks/:taskId`
- `POST /tasks/:taskId/approve`
- `POST /tasks/:taskId/pause`
- `POST /tasks/:taskId/retry`
- `POST /tasks/:taskId/cancel`
- `POST /tasks/claim`
- `POST /tasks/:taskId/heartbeat`
- `POST /tasks/:taskId/complete`
- `POST /tasks/:taskId/fail`

## Agents

- `GET /agents`
- `POST /agents/register`
- `GET /agents/:agentId`
- `POST /agents/:agentId/heartbeat`
- `POST /agents/:agentId/pause`
- `POST /agents/:agentId/resume`

## Runs and Reports

- `POST /runs/morning`
- `POST /runs/tasks`
- `GET /runs`
- `GET /runs/:runId`
- `GET /reports`
- `GET /reports/:reportId`

## Activity

- `GET /activity`
- `GET /events/stream`

## Validation

All payloads are validated with Zod. IDs use MongoDB ObjectId strings. Pagination uses cursor-based pagination.

## Concurrency

Mutation endpoints must use revision fields where manual edits can conflict. Stale updates return HTTP 409.
