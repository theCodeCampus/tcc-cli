import { Branch, mapBranchListsToUniqueBranches } from "../../configuration/configuration";
import { openRepository } from "../../utils/git";
import { SimpleGit } from "simple-git";
import { logger } from "../../utils/logging";

// named remove because delete is a reserved keyword
export async function remove(basePath: string, branchLists: Array<Branch[]>, remote: string | undefined): Promise<void> {
  const repository = await openRepository(basePath);

  let remoteToUse: string | false;
  if (remote === undefined) {
    logger.debug('no remote specified, delete just local branches');
    remoteToUse = false;
  }
  else {
    remoteToUse = remote;
  }

  const branchesToPull = mapBranchListsToUniqueBranches(branchLists);

  await deleteBranches(branchesToPull, repository, remoteToUse);
}

export async function deleteBranches(branches: Branch[], repository: SimpleGit, remote: string | false): Promise<void> {
  logger.info(`start deleting branches locally and from ${remote || '<none>'}`);

  const args = ['rev-parse', '--verify', 'HEAD'];
  const hash: string = (await (repository as any).raw(args)).trim();

  await repository.checkout(hash);

  for (let branch of branches) {
    await deleteBranch(branch, repository, remote);
  }

  logger.debug(`finished pulling branches`);
}

export async function deleteBranch(branch: Branch, repository: SimpleGit, remote: string | false): Promise<void> {

  let branchExistLocally = false;
  try {
    const args = ['rev-parse', '--verify', '--quiet', branch];
    const output = await (repository as any).raw(args);
    logger.debug(`output of rev-parse: ${output.trim()}`);
    branchExistLocally = true;
  }
  catch (e) {
    logger.warn(`branch ${branch} does not exist locally`)
  }

  if (branchExistLocally) {
    logger.info(`delete branch ${branch} locally`);
    const args = ['branch', '--force', '--delete', branch];
    await (repository as any).raw(args);
  }

  if(remote) {
    try {
      logger.info(`delete branch ${branch} from remote ${remote}`);
      const args = ['push', remote, '--force', '--delete', branch];
      await (repository as any).raw(args);
    }
    catch (e) {
      logger.warn(`couldn't delete remote branch`);
      logger.warn(e);
    }
  }

  logger.debug(`finished deleting branch ${branch}`);
}
