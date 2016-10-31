import * as path from "path";
import * as winston from "winston";

export function getConfig(root: string): Configuration {

  var configPath = path.join(root || process.cwd(), 'tcc-cli-config.js');
  winston.info(`reading configuration from ${configPath}`);

  var config = require(configPath);

  return config;
};

export type Branch = string;

export interface Configuration {
    merges: Array<Branch[]>;
}
