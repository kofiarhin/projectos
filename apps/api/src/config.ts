import { parseEnv, type Env } from '@projectos/shared';

/** Load and validate the API environment configuration. */
export function loadConfig(source: NodeJS.ProcessEnv = process.env): Env {
  return parseEnv(source);
}
