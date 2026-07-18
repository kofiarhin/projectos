import cors from 'cors';
import express, { type Express, type Request, type Response } from 'express';

export interface CreateAppOptions {
  corsOrigin?: string;
}

/**
 * Build the Express application. The app is intentionally free of side effects
 * (no server binding, no database connection) so it can be exercised directly
 * in tests via Supertest.
 */
export function createApp(options: CreateAppOptions = {}): Express {
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: options.corsOrigin ?? true }));

  const health = (_req: Request, res: Response): void => {
    res.json({
      data: {
        status: 'ok',
        service: 'projectos-api',
      },
      meta: {},
    });
  };

  // Liveness probe plus the versioned API-contract path (see docs/API.md).
  app.get('/health', health);
  app.get('/api/v1/health', health);

  return app;
}
