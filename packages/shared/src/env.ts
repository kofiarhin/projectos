import { z } from 'zod';

/**
 * Canonical environment schema for ProjectOS.
 *
 * ProjectOS is a CLI-first, local, in-process application: there is no HTTP
 * server, so no port or CORS configuration exists. This schema mirrors the
 * variables documented in the repository `.env.example`. Defaults are chosen so
 * a developer can run the CLI locally with minimal setup while still surfacing
 * actionable errors for the values that genuinely must be set.
 */
export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  PROJECTOS_WORKSPACE_ROOT: z.string().min(1, 'PROJECTOS_WORKSPACE_ROOT is required'),
  PROJECTOS_CONFIG_PATH: z.string().min(1).default('.projectos/workspace.json'),
  // MVP scope caps parallel builders at five (see docs/PRD.md).
  PROJECTOS_MAX_BUILDERS: z.coerce.number().int().positive().max(5).default(5),
  AI_PROVIDER: z.string().min(1).default('codex'),
  AI_MODEL: z.string().optional(),
  AI_API_KEY: z.string().optional(),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Raised when environment validation fails. The message is formatted as a
 * bulleted list of concrete, actionable problems so operators can fix their
 * `.env` without guessing.
 */
export class EnvValidationError extends Error {
  readonly issues: string[];

  constructor(issues: string[]) {
    super(
      `Invalid ProjectOS environment configuration:\n${issues
        .map((issue) => `  - ${issue}`)
        .join('\n')}`,
    );
    this.name = 'EnvValidationError';
    this.issues = issues;
  }
}

/**
 * Parse and validate environment variables. Throws {@link EnvValidationError}
 * with an actionable, per-field message when validation fails.
 */
export function parseEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    const issues = result.error.issues.map((issue) => {
      const path = issue.path.join('.') || '(root)';
      return `${path}: ${issue.message}`;
    });
    throw new EnvValidationError(issues);
  }

  return result.data;
}
