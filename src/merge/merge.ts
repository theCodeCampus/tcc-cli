import { Branch } from "../configuration/configuration";
import { checkRepoStatus, getFirstRemote, openRepository } from "../utils/git";
import { SimpleGit } from 'simple-git/promise';
import { pullBranch } from "../pull/pull";
import { pushBranch } from "../push/push";
import { logger } from "../utils/logging";

export async function merge(repoPath: string, branchLists: Array<Branch[]>, pull: string | boolean, push: string | boolean): Promise<void> {
  const repository = await openRepository(repoPath);
  await checkRepoStatus(repository);

  const pullRemote = await getRemote(pull, repository);
  const pushRemote = await getRemote(push, repository);

  await applyBranchListsInRepository(branchLists, repository, pullRemote, pushRemote);
};

async function getRemote(config: string | boolean, repository: SimpleGit): Promise<string|false> {
  let remote: string | false;

  if (config === true) {
    remote = await getFirstRemote(repository);
  }
  else {
    remote = config;
  }

  return remote;
}

export async function applyBranchListsInRepository(branchLists: Array<Branch[]>, repository: SimpleGit, pull: string | false, push: string | false): Promise<void> {
  const mergeLists: Array<Merge[]> = branchLists.map(mapBranchListToMergeList);

  logger.debug(`start apply merge lists`);

  for (const mergeList of mergeLists) {
    await applyMergeListInRepository(mergeList, repository, pull, push);
  }

  logger.debug(`finished all merges`);
}

export async function applyMergeListInRepository(mergeList: Merge[], repository: SimpleGit, pull: string | false, push: string | false): Promise<void> {
  logger.debug(`start apply merge list`);

  for (let merge of mergeList) {
    await applyMergeInRepository(merge, repository, pull, push);
  }

  logger.debug(`finished apply merge list`);
}

export async function applyMergeInRepository(merge: Merge, repository: SimpleGit, pull: string | false, push: string | false): Promise<void> {

  logger.info(`start merging branch "${merge.from}" into "${merge.to}"`);

  if (pull) {
    await repository.checkout(merge.from);
    await pullBranch(merge.from, repository, pull);
    await repository.checkout(merge.to);
    await pullBranch(merge.to, repository, pull);
  }
  else {
    await repository.checkout(merge.to);
  }

  try {
    await repository.merge([merge.from, '--no-ff'])
    logger.info(`finished merging branch "${merge.from}" into "${merge.to}"`);

    if (push) {
      await pushBranch(merge.to, repository, push);
    }
  } catch (error) {
    logger.debug(`merge failed, fallback to manually merge. error: ${error}`);
    logger.warn(`merge conflict while merging "${merge.from}" into "${merge.to}"`);
    await applyMergeManually(merge, repository);
  }
}

export async function applyMergeManually(merge: Merge, repository: SimpleGit): Promise<void> {
  logger.debug(`checking out "${merge.to}" to start manually merge`);
  await repository.checkout(merge.to);

  try {
    logger.debug(`create merge commit`);
    await repository.mergeFromTo(merge.from, merge.to)
  } catch (error) {
    throw "Abort merging due to merge conflicts. Please resolve merge conflicts, commit the changes and rerun this program!";
  }
}

export function mapBranchListToMergeList(branchList: Branch[]): Merge[] {
  const mergeList = branchList.map((branch, index, branches) => {
    return {
      from: branch,
      to: branches[index + 1]
    }
  });

  // last branch in list is target only (handled by previous merge)
  mergeList.pop();

  return mergeList;
}

export interface Merge {
    from: string;
    to: string,
}
