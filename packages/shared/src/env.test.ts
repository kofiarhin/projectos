import { describe, expect, it } from 'vitest';

import { EnvValidationError, parseEnv } from './env';

const validBase = {
  MONGODB_URI: 'mongodb://127.0.0.1:27017/projectos',
  PROJECTOS_WORKSPACE_ROOT: '/absolute/path/to/projects',
};

describe('parseEnv', () => {
  it('applies documented defaults for optional variables', () => {
    const env = parseEnv(validBase);

    expect(env.NODE_ENV).toBe('development');
    expect(env.AI_PROVIDER).toBe('codex');
    expect(env.PROJECTOS_CONFIG_PATH).toBe('.projectos/workspace.json');
    expect(env.PROJECTOS_MAX_BUILDERS).toBe(5);
    expect(env.LOG_LEVEL).toBe('info');
  });

  it('coerces numeric strings', () => {
    const env = parseEnv({ ...validBase, PROJECTOS_MAX_BUILDERS: '3' });
    expect(env.PROJECTOS_MAX_BUILDERS).toBe(3);
  });

  it('rejects more than five parallel builders', () => {
    expect(() => parseEnv({ ...validBase, PROJECTOS_MAX_BUILDERS: '6' })).toThrow(
      EnvValidationError,
    );
  });

  it('throws actionable errors when required variables are missing', () => {
    try {
      parseEnv({});
      throw new Error('expected parseEnv to throw');
    } catch (error) {
      expect(error).toBeInstanceOf(EnvValidationError);
      const issues = (error as EnvValidationError).issues;
      expect(issues.some((issue) => issue.includes('MONGODB_URI'))).toBe(true);
      expect(issues.some((issue) => issue.includes('PROJECTOS_WORKSPACE_ROOT'))).toBe(true);
    }
  });
});
