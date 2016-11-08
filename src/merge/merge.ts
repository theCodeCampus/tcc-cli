import { reduceSynchronized } from "../utils/array-utils";
import { Branch } from "../configuration/configuration";
import { Oid, Repository } from "../nodegit";
import * as winston from "winston";
import { openRepository, checkRepoStatus } from "../utils/git";

// import * as Git from "nodegit";
const Git = require("nodegit");
const simpleGit = require('simple-git');

const preferences = Git.Merge.PREFERENCE.NO_FASTFORWARD;
const mergeOptions = new Git.MergeOptions();
const checkoutOptions = new Git.CheckoutOptions();

export function merge(repoPath: string, branchLists: Array<Branch[]>): Promise<any> {
  const applyInRepository = function (repository: Repository) {
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

export function applyBranchListsInRepository(branchLists: Array<Branch[]>, repository: Repository) {
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

export function applyMergeListInRepository(mergeList: Merge[], repository: Repository) {
  const sync = reduceSynchronized(mergeList, function (previous: any, merge: Merge) {
    winston.debug(`call "applyMergeInRepository" within "reduceSynchronized callback"`);
    return applyMergeInRepository(merge, repository);
  });

  return sync;
}

export function applyMergeInRepository(merge: Merge, repository: Repository): Promise<any> {
  const signature = Git.Signature.default(repository);

  winston.info(`start merging branch "${merge.from}" into "${merge.to}"`);

  return repository.mergeBranches(merge.to, merge.from, signature, preferences, mergeOptions)
    .then(
      function(oid: Oid) {
        winston.debug(`Oid: ${oid}`);
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

export function applyMergeManually(merge: Merge, repository: Repository) {
  winston.debug(`checking out "${merge.to}" to start manually merge`);
  return repository.checkoutBranch(merge.to, checkoutOptions)
    .then(function () {
      winston.debug(`create merge commit`);
      // bug: Git.Merge.merge throws an error and I don't know how to fix it
      // return Git.Merge.merge(repository, merge.from, mergeOptions, checkoutOptions);
      // so we use another git library, which depends on a git installation
      const simpleRepo = simpleGit(repository.path() + "/..");

      return new Promise(function (resolve, reject) {
        simpleRepo.mergeFromTo(merge.from, merge.to, function () {

          reject("Abort merging due to merge conflicts. Please resolve merge conflicts, commit the changes and rerun this program!");

          // winston.warn(`please resolve merge conflicts and do a commit`);
          //
          // const isMerged = readlineSync.keyInYN('Have you merged it?');
          //
          // if (isMerged) {
          //   winston.info(`finished merging branch "${merge.from}" into "${merge.to}" after resolving merge conflicts`);
          //   resolve();
          // } else {
          //   reject("abort merging due to unresolved merge conflicts");
          // }
        });
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
