import { Command } from 'commander';

import { formatDoctorReport, runDoctor } from './doctor';

/** CLI version, surfaced by `projectos --version`. */
export const VERSION = '0.0.0';

/** Command names defined by docs/CLI.md (behavior arrives in later phases). */
export const COMMANDS = [
  { name: 'init', description: 'Initialize a workspace' },
  { name: 'morning', description: 'Run the morning audit' },
  { name: 'run', description: 'Execute approved ready tasks' },
  { name: 'report', description: 'Generate or display reports' },
  { name: 'request', description: 'Create a request' },
  { name: 'status', description: 'Show workspace status summary' },
  { name: 'reset', description: 'Scoped operational reset (never deletes source code)' },
] as const;

function notImplemented(name: string): () => void {
  return () => {
    process.stderr.write(
      `\`projectos ${name}\` is not implemented yet (arrives in a later phase).\n`,
    );
    process.exitCode = 1;
  };
}

/**
 * Build the ProjectOS CLI program.
 *
 * ProjectOS is CLI-first and fully in-process: commands invoke TypeScript
 * application services directly against MongoDB, the local filesystem, and
 * provider adapters. There is no HTTP server, REST API, or browser dashboard.
 *
 * Phase 0 wires up the documented command surface, global flags, `--help`,
 * `--version`, and a working `doctor` command; the remaining command behavior
 * is implemented in later phases per docs/IMPLEMENTATION_PLAN.md.
 */
export function buildProgram(): Command {
  const program = new Command();

  program
    .name('projectos')
    .description('ProjectOS — CLI-first Autonomous Development Operating System')
    .version(VERSION, '-v, --version', 'output the ProjectOS version');

  // Global flags (docs/CLI.md).
  program
    .option('--config <path>', 'path to workspace configuration')
    .option('--json', 'output machine-readable JSON')
    .option('--quiet', 'reduce output')
    .option('--verbose', 'increase output')
    .option('--no-color', 'disable colored output');

  for (const command of COMMANDS) {
    program
      .command(command.name)
      .description(command.description)
      .action(notImplemented(command.name));
  }

  // `doctor` validates local readiness without starting a server.
  program
    .command('doctor')
    .description('Validate local readiness (no server is started)')
    .action(() => {
      const report = runDoctor();
      if (program.opts<{ json?: boolean }>().json) {
        process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
      } else {
        process.stdout.write(`${formatDoctorReport(report)}\n`);
      }
      process.exitCode = report.ok ? 0 : 1;
    });

  return program;
}
