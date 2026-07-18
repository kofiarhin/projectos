import { CORE_PACKAGES, DoctorDeps, runDoctor } from './doctor';

const validEnv: NodeJS.ProcessEnv = {
  NODE_ENV: 'test',
  MONGODB_URI: 'mongodb://127.0.0.1:27017/projectos',
  PROJECTOS_WORKSPACE_ROOT: '/workspace/root',
  PROJECTOS_CONFIG_PATH: '.projectos/workspace.json',
  PROJECTOS_MAX_BUILDERS: '5',
  AI_PROVIDER: 'codex',
};

function baseDeps(overrides: Partial<DoctorDeps> = {}): Partial<DoctorDeps> {
  return {
    env: validEnv,
    nodeVersion: '20.11.0',
    directoryExists: () => true,
    canAccess: () => true,
    loadPackages: (names) => ({ loaded: [...names], failed: [] }),
    ...overrides,
  };
}

function checkById(report: ReturnType<typeof runDoctor>, id: string) {
  const check = report.checks.find((c) => c.id === id);
  if (!check) throw new Error(`missing check ${id}`);
  return check;
}

describe('runDoctor', () => {
  it('passes with valid mocked configuration', () => {
    const report = runDoctor(baseDeps());

    expect(report.ok).toBe(true);
    expect(report.checks.every((c) => c.status === 'pass')).toBe(true);
  });

  it('fails when MongoDB URI is missing', () => {
    const report = runDoctor(
      baseDeps({ env: { ...validEnv, MONGODB_URI: undefined } }),
    );

    expect(report.ok).toBe(false);
    expect(checkById(report, 'mongodb-uri').status).toBe('fail');
  });

  it('fails when the workspace path does not exist', () => {
    const report = runDoctor(baseDeps({ directoryExists: () => false }));

    expect(report.ok).toBe(false);
    expect(checkById(report, 'workspace-root-exists').status).toBe('fail');
    // Filesystem-access check cannot pass when the root is missing.
    expect(checkById(report, 'workspace-access').status).toBe('fail');
  });

  it('fails when maximum builders exceeds the limit', () => {
    const report = runDoctor(
      baseDeps({ env: { ...validEnv, PROJECTOS_MAX_BUILDERS: '6' } }),
    );

    expect(report.ok).toBe(false);
    expect(checkById(report, 'max-builders').status).toBe('fail');
  });

  it('fails when a core package cannot be loaded', () => {
    const report = runDoctor(
      baseDeps({
        loadPackages: (names) => ({
          loaded: names.slice(1),
          failed: [names[0]],
        }),
      }),
    );

    expect(report.ok).toBe(false);
    expect(checkById(report, 'core-packages').status).toBe('fail');
  });

  it('fails on an unsupported Node version', () => {
    const report = runDoctor(baseDeps({ nodeVersion: '18.19.0' }));

    expect(report.ok).toBe(false);
    expect(checkById(report, 'node-version').status).toBe('fail');
  });

  it('covers every documented core package', () => {
    expect(CORE_PACKAGES).toContain('@projectos/core');
    expect(CORE_PACKAGES).toContain('@projectos/shared');
    expect(CORE_PACKAGES).toContain('@projectos/providers');
  });
});
