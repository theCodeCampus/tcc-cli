import * as path from "path";
import * as winston from "winston";
import * as _ from "lodash";

export function getConfig(root: string): Configuration {

  var configPath = path.join(root || process.cwd(), 'tcc-cli-config.js');
  winston.info(`reading configuration from ${configPath}`);

  var config = require(configPath);

  winston.debug(`configuration read`);
  return config;
};

export type Branch = string;

export interface Configuration {
    merges: Array<Branch[]>;
}

export function mapBranchListsToUniqueBranches(branchLists: Array<Branch[]>): Branch[] {
  const branches = _.flatten(branchLists);
  const uniqueBranches= _.uniq(branches);
  return uniqueBranches;
}
