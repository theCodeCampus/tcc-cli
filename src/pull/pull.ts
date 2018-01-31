import { Branch, mapBranchListsToUniqueBranches } from "../configuration/configuration";
import { getFirstRemote, openRepository } from "../utils/git";
import { SimpleGit } from "simple-git/promise";
import { logger } from "../utils/logging";

export async function pull(basePath: string, branchLists: Array<Branch[]>, remote: string | undefined): Promise<void> {
  const repository = await openRepository(basePath);

  let remoteToUse: string;
  if (remote === undefined) {
    logger.debug('no remote specified, reading from repository');
    remoteToUse = await getFirstRemote(repository);
  }
  else {
    remoteToUse = remote;
  }

  const branchesToPull = mapBranchListsToUniqueBranches(branchLists);

  await pullBranches(branchesToPull, repository, remoteToUse);
}

export async function pullBranches(branches: Branch[], repository: SimpleGit, remote: string): Promise<void> {
  logger.info(`start pulling branches from ${remote || '<default>'}`);

  if (branches.length > 0) {
    await repository.checkout(branches[0]);
  }

  for (let branch of branches) {
    await pullBranch(branch, repository, remote);
  }

  if (branches.length > 0) {
    await repository.checkout(branches[0]);
  }

  logger.debug(`finished pulling branches`);
}

export async function pullBranch(branch: Branch, repository: SimpleGit, remote: string): Promise<void> {
  logger.info(`pull branch ${branch}`);

  await repository.checkout(branch);
  await repository.pull(remote, branch);

  logger.debug(`finished pulling branch ${branch}`);
}
