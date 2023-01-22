import { Command } from "@commander-js/extra-typings";
import { addLoggingOption, logger, setLogLevel } from './utils/logging';
import { getConfig } from './configuration/configuration';
import { gitExport } from './actions/export/git-export';
import { join } from "path";

export function registerGitExportCommand(commander: Command) {
    const command = commander.command('git-export');

    command
        .description('exports repository as git but without confusing history')
        .option('--output-dir <path>', 'relative path where to save the export', 'tcc-cli-export')
        .option('--output-file <path>', 'name of the resulting zip file', 'export.zip')
        .option('--read-package-json', 'read project name and version from package.json and use them for output-file naming')
        .action(async (args: any) => {
            const options = args.opts();

            setLogLevel(options);

            logger.info(`start task git-export`);

            const config = await getConfig(process.cwd());
            const targetFolder = options.outputDir;

            logger.debug(`saving repo export to ${targetFolder}`);

            let nameFromPackageJson: string | undefined = undefined;
            if (args.readPackageJson) {
                const packageJson = require(join(process.cwd(), 'package.json'));

                nameFromPackageJson = `${packageJson.name}_v${packageJson.version}.zip`;
            }
            const targetFile = nameFromPackageJson || options.outputFile;

            try {
                await gitExport(process.cwd(), config.merges, targetFolder, targetFile);
                logger.info("finished task git-export");
            } catch (error) {
                logger.error(error);
            }
        });

    addLoggingOption(command);
}
