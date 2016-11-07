import { getConfig } from "./config";
import * as winston from "winston";
import { zip } from "./export/export";

export function tccCliExport() {
  winston.info("start task export");

  var config = getConfig(process.cwd());

  zip(process.cwd(), config.merges).then(
      function () {
        winston.info("finished task export");
      },
      function (error: any) {
        winston.error(error);
      }
  );
}
