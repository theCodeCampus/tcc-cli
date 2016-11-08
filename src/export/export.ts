import { reduceSynchronized } from "../utils/array-utils";
import * as winston from "winston";
import { Branch, mapBranchListsToUniqueBranches } from "../configuration/configuration";
import { openRepository, checkRepoStatus } from "../utils/git";
import { Repository } from "../nodegit";
import * as path from "path";

const simpleGit = require('simple-git');
// import * as Git from "nodegit";
const Git = require("nodegit");
const mkdirp = require("mkdirp");

const exportTarget = "solutions/step-by-step";
const checkoutOptions = new Git.CheckoutOptions();

export function zip(repoPath: string, branchLists: Array<Branch[]>) {
  const applyInRepository = function (repository: any) {
    return applyBranchListsInRepository(branchLists, repository);
  };

  return openRepository(repoPath)
      // check that repo is clean
      .then(checkRepoStatus)
      // merge function needs access to repo and merges, use closure
      .then(applyInRepository)
      // do not expose internals, just return an empty promise for synchronisation
      .then(function () { });
}

export function applyBranchListsInRepository(branchLists: Array<Branch[]>, repository: Repository): Promise<Repository> {
  const branchesToExport = mapBranchListsToUniqueBranches(branchLists);

  const absExportTarget = path.join(repository.path(), "..", exportTarget);

  const exportTargetCreated = new Promise(function (resolve, reject) {
    winston.debug(`will save exports to ${absExportTarget}`);

    mkdirp(absExportTarget, function (error: any) {
      if (error) {
        reject(error);
      }
      else {
        resolve();
      }
    })
  });

  return exportTargetCreated.then(function () {
    winston.debug(`start apply branch lists`);

    return reduceSynchronized(branchesToExport, function (previous: any, branch: Branch) {
      winston.info(`export branch ${branch}`);
      return applyBranchInRepository(branch, repository, absExportTarget);
    });
  })
  // wait for all merges and then return repository for chaining
  .then(function () {
    winston.debug(`all exports finished`);
    return repository;
  });
}

export function applyBranchInRepository(branch: Branch, repository: Repository, exportTarget: string): Promise<Repository> {

  return repository.checkoutBranch(branch, checkoutOptions)
    .then(function () {
      const simpleRepo = simpleGit(repository.path() + "/..");

      return new Promise(function (resolve) {
        var branchNameWithoutVersion = branch.substring(branch.lastIndexOf("/"));

        winston.debug(`run export command`);

        simpleRepo._run(
            ["archive", "--format=zip", "-o", `${exportTarget}/${branchNameWithoutVersion}.zip`, "HEAD"],
            function () {
              winston.debug(`finish export branch ${branch}`);
              resolve ();
            }
        );
      });
    })
    .then(function () { return repository; });
}
