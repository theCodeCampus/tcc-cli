import {CommanderStatic} from "commander";
import {addLoggingOption, logger, setLogLevel} from "./utils/logging";
import {getConfig} from "./configuration/configuration";
import {changePrefix} from "./actions/change-prefix/change-prefix";

export function registerChangePrefixCommand(commander: CommanderStatic) {
    const command = commander.command('change-prefix');

    command.description('changes the prefix of all branches from the configuration file')
        .option('--old-prefix <prefix>', 'old prefix')
        .option('--new-prefix <prefix>', 'new prefix')
        .option('--move', 'instead of creating a copy the branches are moved', false)
        .option('--force', 'force the creation or move of branches', false)
        .action(async (args: any) => {
            const options = args.opts();
            setLogLevel(options);
            logger.info("start task change-prefix");

            const config = await getConfig(process.cwd());

            const {oldPrefix, newPrefix, move, force} = options;

            try {
                await changePrefix(process.cwd(), config.merges, oldPrefix, newPrefix, move, force);
                logger.info("finished task change-prefix. ");
            } catch (error) {
                logger.error(error);
            }
        });

    addLoggingOption(command);
}
