import { getConfig } from "./configuration/configuration";
import { merge } from "./merge/merge";
import { addLoggingOption, logger, setLogLevel } from "./utils/logging";
import { CommanderStatic } from "commander";

export function registerMergeCommand(commander: CommanderStatic) {
  const command = commander.command('merge');

  command
      .description('merge branches according to their order in config file\'s merge lists')
      .option('--pull [remote]', 'pull-merge', false)
      .option('--push [remote]', 'merge-push', false)
      .option('--pull-push [remote]', 'pull-merge-push', false)
      .action(async (args: any) => {
        const options = args.opts();

        setLogLevel(options);

        logger.info("start task merge");

        const config = await getConfig(process.cwd());

        const pull: string | boolean = options.pull || options.pullPush;
        const push: string | boolean = options.push || options.pullPush;

        logger.debug(`pull: ${pull}`);
        logger.debug(`push: ${push}`);

        try {
          await merge(process.cwd(), config.merges, pull, push);
          logger.info("finished task export");
        } catch(error) {
          logger.error(error);
        }
      });

  addLoggingOption(command);
}
