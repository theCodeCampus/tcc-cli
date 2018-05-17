import { getConfig } from "./configuration/configuration";
import { addLoggingOption, logger, setLogLevel } from "./utils/logging";
import { CommanderStatic } from "commander";
import { remove } from "./actions/delete/delete";

export function registerDeleteCommand(commander: CommanderStatic) {
  const command = commander.command('delete');

  command
    .description('delete configured branches (just local branches if no remote is given)')
    .option('--remote [name]', 'name of the remote repository to delete the branches from, default: none')
    .action(async (args: any) => {
      const options = args.opts();

      setLogLevel(options);

      logger.info("start task delete");

      const config = await getConfig(process.cwd());

      try {
        await remove(process.cwd(), config.merges, options.remote);
        logger.info("finished task delete");
      } catch (error) {
        logger.error(error);
      }
    });

  addLoggingOption(command);
}
