import { Command } from 'commander';

/** Command names defined by docs/CLI.md. */
export const COMMANDS = [
  { name: 'init', description: 'Initialize a workspace' },
  { name: 'morning', description: 'Run the morning audit' },
  { name: 'run', description: 'Execute approved ready tasks' },
  { name: 'report', description: 'Generate or display reports' },
  { name: 'request', description: 'Create a request' },
  { name: 'status', description: 'Show workspace status summary' },
  { name: 'reset', description: 'Scoped operational reset' },
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
 * Build the ProjectOS CLI program. Phase 0 wires up the documented command
 * surface and global flags so `projectos --help` is accurate; command
 * behavior is implemented in later phases per docs/IMPLEMENTATION_PLAN.md.
 */
export function buildProgram(): Command {
  const program = new Command();

  program
    .name('projectos')
    .description('ProjectOS — Autonomous Development Operating System CLI')
    .version('0.0.0');

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

  return program;
}
