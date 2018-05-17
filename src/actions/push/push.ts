import { Branch, mapBranchListsToUniqueBranches } from "../../configuration/configuration";
import { getFirstRemote, openRepository } from "../../utils/git";
import { SimpleGit } from "simple-git/promise";
import { logger } from "../../utils/logging";

export async function push(basePath: string, branchLists: Array<Branch[]>, remote: string | undefined): Promise<void> {
  const repository = await openRepository(basePath);

  const branchesToPush = mapBranchListsToUniqueBranches(branchLists);

  let remoteToUse: string;
  if (remote === undefined) {
    remoteToUse = await getFirstRemote(repository);
  }
  else {
    remoteToUse = remote;
  }

  await pushBranches(branchesToPush, repository, remoteToUse);
}

export async function pushBranches(branches: Branch[], repository: SimpleGit, remote: string): Promise<void> {
  logger.info(`start pushing branches to ${remote || '<default>'}`);

  for (let branch of branches) {
    await pushBranch(branch, repository, remote);
  }

  logger.debug(`finished pushing branches`);
}

export async function pushBranch(branch: Branch, repository: SimpleGit, remote: string): Promise<void> {
  logger.debug(`checkout branch ${branch}`);
  await repository.checkout(branch);
  logger.info(`push branch ${branch}`);
  await repository.push(remote, branch);
  logger.debug(`finished pushing branch ${branch}`);
}
