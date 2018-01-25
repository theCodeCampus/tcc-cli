import { getConfig } from "./configuration/configuration";
import * as winston from "winston";
import { zip } from "./export/export";

export async function tccCliExport(): Promise<void> {
  winston.info("start task export");

  var config = getConfig(process.cwd());

  try {
    await zip(process.cwd(), config.merges);
    winston.info("finished task export");
  } catch(error) {
    winston.error(error);
  }
}

export function registerExportCommand(commander: any) {
  commander
      .command('export')
      .action(tccCliExport);
}
