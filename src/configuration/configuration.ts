import { join } from "path";
import { flatten, uniq } from "lodash";
import { openRepository } from "../utils/git";
import { logger } from "../utils/logging";

/**
 * Loads the tcc-cli-config from the given root dir.
 *
 * load-checkout-reload:
 * Sometimes the configuration in the current branch is not up to date.
 * E.g. you made a config update in master but have not merged yet.
 * When you start the merge command from a different branch than master,
 * the CLI will work with an outdated config.
 * Therefore we load the config. Then checkout the first branch. And then
 * reload the config.
 *
 * @param {string} root project root dir, used to load tcc-cli-config.js
 * @param {boolean} withCheckout true for load-checkout-reload
 * @returns {Configuration}
 */
export async function getConfig(root: string, withCheckout = true): Promise<Configuration> {

  const configPath = join(root || process.cwd(), 'tcc-cli-config.js');
  logger.debug(`read configuration from ${configPath}`);

  let config: Configuration = require(configPath);

  if (withCheckout) {
    const repository = await openRepository(root);
    const branches = mapBranchListsToUniqueBranches(config.merges);

    if (branches.length === 0) {
      throw new Error('No branches configured');
    }

    logger.debug(`checkout branch ${branches[0]}`);
    await repository.checkout(branches[0]);

    logger.debug(`reload configuration`);
    /* modules are loaded once. when we require the same module again,
     * we will get the cached exports.
     * to be able to load the config again, we first have to invalidate the cache.
     */
    delete require.cache[require.resolve(configPath)];
    config = await getConfig(root, false);
  }

  logger.debug(`configuration read`);
  return config;
}

export function mapBranchListsToUniqueBranches(branchLists: Array<Branch[]>): Branch[] {
  const branches = flatten(branchLists);
  const uniqueBranches= uniq(branches);
  return uniqueBranches;
}

export type Branch = string;

export interface Configuration {
    merges: Array<Branch[]>;
}
