import { getConfig } from "./configuration/configuration";
import { pull } from "./actions/pull/pull";
import { addLoggingOption, logger, setLogLevel } from "./utils/logging";
import { CommanderStatic } from "commander";

export function registerPullCommand(commander: CommanderStatic) {
  const command = commander.command('pull');

  command
    .description('pull configured branches (create or update local branches) from a remote repository')
    .option('--remote [name]', 'name of the remote repository to pull from, default: first configured remote (git remote)')
    .action(async (args: any) => {
      const options = args.opts();

      setLogLevel(options);

      logger.info("start task pull");

      const config = await getConfig(process.cwd());

      try {
        await pull(process.cwd(), config.merges, options.remote);
        logger.info("finished task pull");
      } catch (error) {
        logger.error(error);
      }
    });

  addLoggingOption(command);
}
