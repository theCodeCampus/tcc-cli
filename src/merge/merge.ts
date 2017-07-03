import { reduceSynchronized } from "../utils/promises";
import { Branch } from "../configuration/configuration";
import * as winston from "winston";
import { openRepository, checkRepoStatus } from "../utils/git";
import {SimpleGit} from 'simple-git/promise';

const simpleGit = require('simple-git/promise');


export function merge(repoPath: string, branchLists: Array<Branch[]>): Promise<any> {
  const applyInRepository = function (repository: SimpleGit) {
    return applyBranchListsInRepository(branchLists, repository);
  };

  return openRepository(repoPath)
    // check that repo is clean
    .then(checkRepoStatus)
    // merge function needs access to repo and merges, use closure
    .then(applyInRepository)
    // do not expose internals, just return an empty promise for synchronisation
    .then(function () { });
};

export function applyBranchListsInRepository(branchLists: Array<Branch[]>, repository: SimpleGit) {
    const mergeLists: Array<Merge[]> = branchLists.map(mapBranchListToMergeList);

    winston.debug(`start apply merge lists`);

    return reduceSynchronized(mergeLists, function (previous: any, mergeList: Merge[]) {
      winston.debug(`call "applyMergeListInRepository" within "reduceSynchronized callback"`);
      return applyMergeListInRepository(mergeList, repository);
    })
    // wait for all merges and then return repository for chaining
    .then(function () {
      winston.debug(`all merges finished`);
      return repository;
    });
}

export function applyMergeListInRepository(mergeList: Merge[], repository: SimpleGit) {
  const sync = reduceSynchronized(mergeList, function (previous: any, merge: Merge) {
    winston.debug(`call "applyMergeInRepository" within "reduceSynchronized callback"`);
    return applyMergeInRepository(merge, repository);
  });

  return sync;
}

export function applyMergeInRepository(merge: Merge, repository: SimpleGit): Promise<any> {

  winston.info(`start merging branch "${merge.from}" into "${merge.to}"`);

  return repository.mergeFromTo(merge.to, merge.from, ['--no-ff'])
    .then(
      function() {
        winston.info(`finished merging branch "${merge.from}" into "${merge.to}"`);
      },
      function (error) {
        winston.debug(`merge failed, fallback to manually merge. error: ${error}`);
        throw error;
      }
    )
    .catch(function () {
      winston.warn(`merge conflict while merging "${merge.from}" into "${merge.to}"`);
      return applyMergeManually(merge, repository);
    });
}

export function applyMergeManually(merge: Merge, repository: SimpleGit) {
  winston.debug(`checking out "${merge.to}" to start manually merge`);
  return repository.checkout(merge.to)
    .then(function () {
      winston.debug(`create merge commit`);

      return repository.mergeFromTo(merge.from, merge.to)
          .catch(() => {
              throw "Abort merging due to merge conflicts. Please resolve merge conflicts, commit the changes and rerun this program!";
          });
    });
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
