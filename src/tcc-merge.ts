import { getConfig } from "./configuration/configuration";
import { merge } from "./merge/merge";
import * as winston from "winston";

export function tccCliMerge() {
  winston.info("start task merge");

  var config = getConfig(process.cwd());

  merge(process.cwd(), config.merges).then(
    function () {
      winston.info("finished task merge");
    },
    function (error: any) {
      winston.error(error);
    }
  );
}

export function registerMergeCommand(commander: any) {
  commander
      .command('merge')
      .option('--fetch', 'fetch from remote')
      .option('--push', 'push to remote')
      .action(tccCliMerge);
}
