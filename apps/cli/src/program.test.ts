import { Command } from 'commander';

import { buildProgram, COMMANDS, VERSION } from './program';

/** Run the program with args, capturing stdout/stderr and any exit code. */
function runCli(args: string[]): {
  stdout: string;
  stderr: string;
  exitCode: number | undefined;
} {
  const program = buildProgram();
  let stdout = '';
  let stderr = '';

  program.exitOverride();
  program.configureOutput({
    writeOut: (str) => {
      stdout += str;
    },
    writeErr: (str) => {
      stderr += str;
    },
  });

  const stdoutSpy = jest
    .spyOn(process.stdout, 'write')
    .mockImplementation((chunk: string | Uint8Array): boolean => {
      stdout += chunk.toString();
      return true;
    });
  const stderrSpy = jest
    .spyOn(process.stderr, 'write')
    .mockImplementation((chunk: string | Uint8Array): boolean => {
      stderr += chunk.toString();
      return true;
    });
  const originalExitCode = process.exitCode;
  process.exitCode = undefined;
  try {
    program.parse(args, { from: 'user' });
  } catch {
    // commander throws on --help/--version when exitOverride is set.
  } finally {
    stdoutSpy.mockRestore();
    stderrSpy.mockRestore();
  }
  const exitCode = process.exitCode;
  process.exitCode = originalExitCode;

  return { stdout, stderr, exitCode: exitCode as number | undefined };
}

describe('projectos CLI program', () => {
  it('registers every documented top-level command plus doctor', () => {
    const registered = buildProgram().commands.map((command: Command) => command.name());

    for (const { name } of COMMANDS) {
      expect(registered).toContain(name);
    }
    expect(registered).toContain('doctor');
  });

  it('produces help text including the program name and commands', () => {
    const { stdout } = runCli(['--help']);

    expect(stdout).toContain('projectos');
    expect(stdout).toContain('morning');
    expect(stdout).toContain('doctor');
  });

  it('outputs the version', () => {
    const { stdout } = runCli(['--version']);

    expect(stdout.trim()).toBe(VERSION);
  });

  it('returns a clear not-implemented message for unimplemented commands', () => {
    const { stderr, exitCode } = runCli(['morning']);

    expect(stderr).toContain('not implemented yet');
    expect(exitCode).toBe(1);
  });

  it('runs doctor and emits JSON with --json', () => {
    const { stdout } = runCli(['doctor', '--json']);

    const parsed = JSON.parse(stdout);
    expect(parsed).toHaveProperty('ok');
    expect(Array.isArray(parsed.checks)).toBe(true);
    expect(parsed.checks.length).toBeGreaterThan(0);
  });

  it('does not expose any server, api, or dashboard command', () => {
    const registered = buildProgram().commands.map((command: Command) => command.name());

    expect(registered).not.toContain('serve');
    expect(registered).not.toContain('api');
    expect(registered).not.toContain('dashboard');
  });
});
