import pino, { type Logger } from 'pino';

/** Create the shared Pino logger for the API process. */
export function createLogger(level: string = process.env.LOG_LEVEL ?? 'info'): Logger {
  return pino({ level });
}
