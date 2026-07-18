import 'dotenv/config';

import { EnvValidationError, type Env } from '@projectos/shared';

import { createApp } from './app';
import { loadConfig } from './config';
import { createLogger } from './logger';

function main(): void {
  const logger = createLogger();

  let env: Env;
  try {
    env = loadConfig();
  } catch (error) {
    if (error instanceof EnvValidationError) {
      // Actionable, per-field environment errors (Phase 0 exit criterion).
      logger.error(error.message);
      process.exit(1);
    }
    throw error;
  }

  const app = createApp({ corsOrigin: env.CORS_ORIGIN });

  app.listen(env.PORT, () => {
    logger.info(`ProjectOS API listening on http://localhost:${env.PORT}`);
  });
}

main();
