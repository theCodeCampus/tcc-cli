import { getConfig } from "./configuration/configuration";
import { push } from "./actions/push/push";
import { addLoggingOption, logger, setLogLevel } from "./utils/logging";
import { CommanderStatic } from "commander";

export function registerPushCommand(commander: CommanderStatic) {
  const command = commander.command('push');

  command
    .description('push all the configured branches to a remote repository')
    .option('--remote [name]', 'name of the remote repository to push to, default: first configured remote (git remote)')
    .action(async (args: any) => {
      const options = args.opts();

      setLogLevel(options);

      logger.info("start task push");

      const config = await getConfig(process.cwd());

      try {
        await push(process.cwd(), config.merges, options.remote);
        logger.info("finished task push");
      } catch (error) {
        logger.error(error);
      }
    });

  addLoggingOption(command);
}
