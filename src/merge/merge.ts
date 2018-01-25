import { reduceSynchronized } from "../utils/promises";
import { Branch } from "../configuration/configuration";
import * as winston from "winston";
import { openRepository, checkRepoStatus } from "../utils/git";
import {SimpleGit} from 'simple-git/promise';

export async function merge(repoPath: string, branchLists: Array<Branch[]>): Promise<void> {
  const repository = await openRepository(repoPath);
  await checkRepoStatus(repository);
  await applyBranchListsInRepository(branchLists, repository);
};

export async function applyBranchListsInRepository(branchLists: Array<Branch[]>, repository: SimpleGit): Promise<void> {
    const mergeLists: Array<Merge[]> = branchLists.map(mapBranchListToMergeList);

    winston.debug(`start apply merge lists`);
    await reduceSynchronized(
      mergeLists,
      (previous: any, mergeList: Merge[]) => applyMergeListInRepository(mergeList, repository)
    );
    winston.debug(`finished all merges`);
}

export async function applyMergeListInRepository(mergeList: Merge[], repository: SimpleGit): Promise<void> {
  winston.debug(`start apply merge list`);
  await reduceSynchronized(
    mergeList,
    (previous: any, merge: Merge) => applyMergeInRepository(merge, repository)
  );
  winston.debug(`finished apply merge list`);
}

export async function applyMergeInRepository(merge: Merge, repository: SimpleGit): Promise<void> {

  winston.info(`start merging branch "${merge.from}" into "${merge.to}"`);

  await repository.checkout(merge.to);

  try {
    await repository.merge([merge.from, '--no-ff'])
    winston.info(`finished merging branch "${merge.from}" into "${merge.to}"`);
  } catch (error) {
    winston.debug(`merge failed, fallback to manually merge. error: ${error}`);
    winston.warn(`merge conflict while merging "${merge.from}" into "${merge.to}"`);
    await applyMergeManually(merge, repository);
  }
}

export async function applyMergeManually(merge: Merge, repository: SimpleGit): Promise<void> {
  winston.debug(`checking out "${merge.to}" to start manually merge`);
  await repository.checkout(merge.to);

  try {
    winston.debug(`create merge commit`);
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
