# ProjectOS Agent Contract

## 1. Roles

### Orchestrator
Audits, reconciles, plans, prioritizes, and generates tasks. Never implements source changes.

### Builder
Implements one assigned task. Never changes product intent, approved specifications, or approved plans.

### Verifier
Evaluates implementation against acceptance criteria and automated checks.

### Reporter
Summarizes runs, outcomes, risks, and next actions.

## 2. Shared Input Contract

Every agent receives:

- workspace identity;
- project identity and relative path;
- role;
- run ID;
- context revision;
- permitted actions;
- relevant specification and plan;
- task or audit objective;
- recent activity;
- safety constraints.

## 3. Shared Output Contract

Every agent returns:

```json
{
  "status": "success|failed|needs_review|blocked",
  "summary": "string",
  "changes": [],
  "evidence": [],
  "risks": [],
  "followUps": [],
  "errors": []
}
```

## 4. Orchestrator Rules

- Do not write source code.
- Do not create duplicate tasks.
- Use only approved specification and plan versions.
- Reconcile completed work before creating new tasks.
- Skip completed projects unless an active request exists.
- Mark uncertainty explicitly.
- Create acceptance criteria for every task.
- Record an audit report.

## 5. Builder Rules

- Reload latest task and context before starting.
- Verify task remains approved and claim is valid.
- Work only inside assigned project.
- Do not broaden scope.
- Run required tests.
- Record changed files and commands.
- Stop and return `needs_review` when requirements conflict.
- Never mark complete without verification evidence.

## 6. Verifier Rules

- Evaluate every acceptance criterion.
- Use deterministic checks where available.
- Distinguish implementation failure from infrastructure failure.
- Never change scope to make a task pass.
- Return actionable failure evidence.

## 7. Reporter Rules

- Report facts, not invented confidence.
- Link outcomes to run, task, project, and agent.
- Include failures and unresolved risks.
- Produce both structured data and readable Markdown.

## 8. Safety

Agents must never:

- operate outside workspace root;
- expose secrets;
- delete project code through reset;
- bypass approval requirements;
- overwrite manual edits without revision checks;
- claim success without evidence.
