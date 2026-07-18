import { accessSync, constants, statSync } from 'node:fs';

import { envSchema } from '@projectos/shared';

/** Package names the CLI must be able to load in-process (no server). */
export const CORE_PACKAGES = [
  '@projectos/shared',
  '@projectos/core',
  '@projectos/database',
  '@projectos/workspace',
  '@projectos/orchestrator',
  '@projectos/scheduler',
  '@projectos/builders',
  '@projectos/verification',
  '@projectos/context',
  '@projectos/providers',
  '@projectos/reporting',
] as const;

/** Minimum supported Node.js major version (matches package.json engines). */
export const MIN_NODE_MAJOR = 20;

/** Upper bound on parallel builders enforced across the MVP (docs/PRD.md). */
export const MAX_BUILDERS_LIMIT = 5;

export type CheckStatus = 'pass' | 'fail';

export interface DoctorCheck {
  /** Stable machine-readable identifier. */
  id: string;
  /** Human-readable label. */
  label: string;
  status: CheckStatus;
  /** Actionable detail shown to the operator. */
  message: string;
  /** Required checks fail the overall report and drive the exit code. */
  required: boolean;
}

export interface DoctorReport {
  ok: boolean;
  checks: DoctorCheck[];
}

/**
 * Injectable dependencies so `runDoctor` is fully testable without touching the
 * real filesystem, process, or installed packages.
 */
export interface DoctorDeps {
  env: NodeJS.ProcessEnv;
  nodeVersion: string;
  /** Returns true when `path` exists and is a directory. */
  directoryExists: (path: string) => boolean;
  /** Returns true when `path` is readable and writable. */
  canAccess: (path: string) => boolean;
  /** Attempts to load each core package; returns the ones that loaded. */
  loadPackages: (names: readonly string[]) => { loaded: string[]; failed: string[] };
}

function defaultDirectoryExists(path: string): boolean {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function defaultCanAccess(path: string): boolean {
  try {
    accessSync(path, constants.R_OK | constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

function defaultLoadPackages(names: readonly string[]): {
  loaded: string[];
  failed: string[];
} {
  const loaded: string[] = [];
  const failed: string[] = [];
  for (const name of names) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require(name);
      loaded.push(name);
    } catch {
      failed.push(name);
    }
  }
  return { loaded, failed };
}

/** Build the default (real) dependency set for the running process. */
export function defaultDoctorDeps(): DoctorDeps {
  return {
    env: process.env,
    nodeVersion: process.versions.node,
    directoryExists: defaultDirectoryExists,
    canAccess: defaultCanAccess,
    loadPackages: defaultLoadPackages,
  };
}

function parseNodeMajor(version: string): number {
  const major = Number.parseInt(version.replace(/^v/, '').split('.')[0] ?? '', 10);
  return Number.isFinite(major) ? major : 0;
}

/**
 * Validate local readiness for ProjectOS without starting any server. Returns a
 * structured report; the caller renders it and maps `ok` to an exit code.
 */
export function runDoctor(overrides: Partial<DoctorDeps> = {}): DoctorReport {
  const deps: DoctorDeps = { ...defaultDoctorDeps(), ...overrides };
  const env = deps.env;
  const checks: DoctorCheck[] = [];

  // 1. Node version.
  const nodeMajor = parseNodeMajor(deps.nodeVersion);
  checks.push({
    id: 'node-version',
    label: 'Node.js version',
    required: true,
    status: nodeMajor >= MIN_NODE_MAJOR ? 'pass' : 'fail',
    message:
      nodeMajor >= MIN_NODE_MAJOR
        ? `Node ${deps.nodeVersion} satisfies >=${MIN_NODE_MAJOR}.`
        : `Node ${deps.nodeVersion} is below the required >=${MIN_NODE_MAJOR}.`,
  });

  // 2. MongoDB URI presence.
  const mongoUri = env.MONGODB_URI?.trim();
  checks.push({
    id: 'mongodb-uri',
    label: 'MongoDB URI',
    required: true,
    status: mongoUri ? 'pass' : 'fail',
    message: mongoUri
      ? 'MONGODB_URI is set.'
      : 'MONGODB_URI is not set. Define it in your environment or .env file.',
  });

  // 3. Workspace-root configuration.
  const workspaceRoot = env.PROJECTOS_WORKSPACE_ROOT?.trim();
  checks.push({
    id: 'workspace-root-config',
    label: 'Workspace root configuration',
    required: true,
    status: workspaceRoot ? 'pass' : 'fail',
    message: workspaceRoot
      ? `PROJECTOS_WORKSPACE_ROOT is set to "${workspaceRoot}".`
      : 'PROJECTOS_WORKSPACE_ROOT is not set.',
  });

  // 4. Workspace-root existence.
  const rootExists = Boolean(workspaceRoot) && deps.directoryExists(workspaceRoot!);
  checks.push({
    id: 'workspace-root-exists',
    label: 'Workspace root exists',
    required: true,
    status: rootExists ? 'pass' : 'fail',
    message: !workspaceRoot
      ? 'Cannot verify: PROJECTOS_WORKSPACE_ROOT is not set.'
      : rootExists
        ? `Workspace root directory exists at "${workspaceRoot}".`
        : `Workspace root directory does not exist at "${workspaceRoot}".`,
  });

  // 5. Configuration-file path.
  const configPath =
    env.PROJECTOS_CONFIG_PATH?.trim() || '.projectos/workspace.json';
  checks.push({
    id: 'config-path',
    label: 'Configuration file path',
    required: true,
    status: configPath ? 'pass' : 'fail',
    message: `Configuration path resolves to "${configPath}".`,
  });

  // 6. Provider configuration.
  const provider = env.AI_PROVIDER?.trim() || 'codex';
  checks.push({
    id: 'provider',
    label: 'Provider configuration',
    required: true,
    status: provider ? 'pass' : 'fail',
    message: provider
      ? `AI provider is "${provider}".`
      : 'No AI provider is configured.',
  });

  // 7. Maximum builders does not exceed the limit.
  const rawMaxBuilders = env.PROJECTOS_MAX_BUILDERS?.trim();
  const maxBuilders = rawMaxBuilders ? Number(rawMaxBuilders) : MAX_BUILDERS_LIMIT;
  const maxBuildersValid =
    Number.isInteger(maxBuilders) &&
    maxBuilders >= 1 &&
    maxBuilders <= MAX_BUILDERS_LIMIT;
  checks.push({
    id: 'max-builders',
    label: 'Maximum builders',
    required: true,
    status: maxBuildersValid ? 'pass' : 'fail',
    message: maxBuildersValid
      ? `PROJECTOS_MAX_BUILDERS is ${maxBuilders} (limit ${MAX_BUILDERS_LIMIT}).`
      : `PROJECTOS_MAX_BUILDERS must be an integer between 1 and ${MAX_BUILDERS_LIMIT}; got "${rawMaxBuilders}".`,
  });

  // 8. Ability to load core packages.
  const { loaded, failed } = deps.loadPackages(CORE_PACKAGES);
  checks.push({
    id: 'core-packages',
    label: 'Core packages loadable',
    required: true,
    status: failed.length === 0 ? 'pass' : 'fail',
    message:
      failed.length === 0
        ? `Loaded ${loaded.length} core packages.`
        : `Failed to load: ${failed.join(', ')}. Run "npm install" and "npm run build".`,
  });

  // 9. Basic filesystem access inside the workspace root.
  const canAccessRoot = rootExists && deps.canAccess(workspaceRoot!);
  checks.push({
    id: 'workspace-access',
    label: 'Workspace filesystem access',
    required: true,
    status: canAccessRoot ? 'pass' : 'fail',
    message: !rootExists
      ? 'Cannot verify: workspace root is missing.'
      : canAccessRoot
        ? 'Workspace root is readable and writable.'
        : 'Workspace root is not readable/writable by the current user.',
  });

  // Also surface aggregate environment validation (shared package) as context.
  const envResult = envSchema.safeParse(env);
  checks.push({
    id: 'env-validation',
    label: 'Environment validation',
    required: true,
    status: envResult.success ? 'pass' : 'fail',
    message: envResult.success
      ? 'Environment configuration is valid.'
      : `Environment configuration is invalid: ${envResult.error.issues
          .map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`)
          .join('; ')}`,
  });

  const ok = checks.every((check) => !check.required || check.status === 'pass');
  return { ok, checks };
}

/** Render a doctor report as human-readable terminal text. */
export function formatDoctorReport(report: DoctorReport): string {
  const lines = ['ProjectOS doctor', ''];
  for (const check of report.checks) {
    const marker = check.status === 'pass' ? 'PASS' : 'FAIL';
    lines.push(`[${marker}] ${check.label}: ${check.message}`);
  }
  lines.push('');
  lines.push(
    report.ok
      ? 'All required checks passed. Local environment is ready.'
      : 'One or more required checks failed. Resolve the issues above.',
  );
  return lines.join('\n');
}
