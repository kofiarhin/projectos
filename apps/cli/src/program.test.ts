import { buildProgram, COMMANDS } from './program';

describe('projectos CLI program', () => {
  it('registers every documented top-level command', () => {
    const program = buildProgram();
    const registered = program.commands.map((command) => command.name());

    for (const { name } of COMMANDS) {
      expect(registered).toContain(name);
    }
  });

  it('produces help text that includes the program name and a command', () => {
    const help = buildProgram().helpInformation();

    expect(help).toContain('projectos');
    expect(help).toContain('morning');
  });
});
