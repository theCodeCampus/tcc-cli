import {CommanderStatic} from "commander";
import {addLoggingOption, logger, setLogLevel} from "./utils/logging";
import {getConfig} from "./configuration/configuration";
import {create} from "./actions/create/create";

export function registerCreateCommand(commander: CommanderStatic) {
    const command = commander.command('create');

    command.description('creates all branches from the configuration file')
        .action(async (args: any) => {
            const options = args.opts();
            setLogLevel(options);
            logger.info("start task create");

            const config = await getConfig(process.cwd());

            try {
                await create(process.cwd(), config.merges);
                logger.info("finished task create");
            } catch (error) {
                logger.error(error);
            }
        });

    addLoggingOption(command);
}
