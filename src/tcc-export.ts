import { getConfig } from "./configuration/configuration";
import * as path from "path";

import { archive } from "./export/export";
import { addLoggingOption, logger, setLogLevel } from "./utils/logging";
import { CommanderStatic } from "commander";

export function registerExportCommand(commander: CommanderStatic) {
  const command = commander.command('export');

  command
    .description('export all branches to zip files and zip all the files to one file')
    .option('--output-dir <path>', 'relative path where to save the export', 'tcc-cli-export')
    .option('--output-file <path>', 'name of the resulting zip file', 'export.zip')
    .option('--read-package-json', 'read project name and version from package.json and use them for output-file naming')
    .action(async (args: any) => {
      const options = args.opts();

      setLogLevel(options);

      logger.info(`start task export`);

      const config = await getConfig(process.cwd());

      let nameFromPackageJson: string | undefined = undefined;

      if (args.readPackageJson) {
        const packageJson = require(path.join(process.cwd(), 'package.json'));

        nameFromPackageJson = `${packageJson.name}_v${packageJson.version}.zip`;
      }

      const targetFolder = options.outputDir;
      const targetFile = nameFromPackageJson || options.outputFile;

      logger.debug(`saving exports to ${targetFolder}`);

      try {
        await archive(process.cwd(), config.merges, targetFolder, targetFile);
        logger.info("finished task export");
      } catch (error) {
        logger.error(error);
      }
    });

  addLoggingOption(command);
}
