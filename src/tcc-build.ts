import { getConfig } from "./configuration/configuration";
import { addLoggingOption, logger, setLogLevel } from "./utils/logging";
import { CommanderStatic } from "commander";
import { build } from "./actions/build/build";

export function registerBuildCommand(commander: CommanderStatic) {
  const command = commander.command('build');

  command
    .description('build all branches with Angular CLI and store all distributions in one folder with branch-name-sub-folders')
    .option('--pull [remote]', 'pull-merge', false)
    .option('--output-dir <path>', 'relative path where to save the export', 'tcc-cli-build')
    .action(async (args: any) => {
      const options = args.opts();

      setLogLevel(options);

      logger.info(`start task build`);

      const config = await getConfig(process.cwd());
      const targetFolder = options.outputDir;
      const pull: string | boolean = options.pull || options.pullPush;

      logger.debug(`saving distributions to ${targetFolder}`);

      try {
        await build(process.cwd(), config.merges, targetFolder, pull);
        logger.info("finished task build");
      } catch (error) {
        logger.error(error);
      }
    });

  addLoggingOption(command);
}
