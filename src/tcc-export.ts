import { getConfig } from "./configuration/configuration";
import * as winston from "winston";
import * as path from "path";

import { exportBranches } from "./export/export";

export function registerExportCommand(commander: any) {
  commander
      .command('export')
      .option('--output-dir <path>', 'relative path where to save the export', 'tcc-cli-export')
      .option('--output-file <path>', 'name of the resulting zip file', 'export.zip')
      .option('--read-package-json', 'read project name and version from package.json and use them for output-file naming')
      .action(async (args: any) => {
        winston.info(`start task export`);

        const config = getConfig(process.cwd());

        let nameFromPackageJson: string | undefined = undefined;

        if (args.readPackageJson) {
          const packageJson = require(path.join(process.cwd(), 'package.json'));

          nameFromPackageJson = `${packageJson.name}_v${packageJson.version}.zip`;
        }

        const targetFolder = args.outputDir;
        const targetFile = nameFromPackageJson || args.outputFile;

        winston.debug(`saving exports to ${targetFolder}`);

        try {
          await exportBranches(process.cwd(), config.merges, targetFolder, targetFile);
          winston.info("finished task export");
        } catch (error) {
          winston.error(error);
        }
      });
}
