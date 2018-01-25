import { getConfig } from "./configuration/configuration";
import { merge } from "./merge/merge";
import * as winston from "winston";

export async function tccCliMerge() {
  winston.info("start task merge");

  var config = getConfig(process.cwd());

  try {
    await merge(process.cwd(), config.merges);
    winston.info("finished task export");
  } catch(error) {
    winston.error(error);
  }
}

export function registerMergeCommand(commander: any) {
  commander
      .command('merge')
      .option('--fetch', 'fetch from remote')
      .option('--push', 'push to remote')
      .action(tccCliMerge);
}
