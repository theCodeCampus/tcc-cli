import { reduceSynchronized } from "../utils/promises";
import * as winston from "winston";
import { Branch, mapBranchListsToUniqueBranches } from "../configuration/configuration";
import { openRepository, checkRepoStatus } from "../utils/git";
import * as path from "path";
import {SimpleGit} from 'simple-git/promise';

const simpleGit = require('simple-git/promise');
const mkdirp = require("mkdirp");

const exportTarget = "solutions/step-by-step";

export function zip(repoPath: string, branchLists: Array<Branch[]>) {
  const applyInRepository = function (repository: any) {
    applyBranchListsInRepository(branchLists, repository, repoPath);
  };

  return openRepository(repoPath)
      // check that repo is clean
      .then(checkRepoStatus)
      // merge function needs access to repo and merges, use closure
      .then(applyInRepository)
      // do not expose internals, just return an empty promise for synchronisation
      .then(function () { });
}

export function applyBranchListsInRepository(branchLists: Array<Branch[]>, repository: SimpleGit, repoPath: string): Promise<SimpleGit> {
  const branchesToExport = mapBranchListsToUniqueBranches(branchLists);

  const absExportTarget = path.join(repoPath, "..", exportTarget);

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

export function applyBranchInRepository(branch: Branch, repository: SimpleGit, exportTarget: string): Promise<SimpleGit> {

  return repository.checkout(branch)
    .then(function () {

      return new Promise(function (resolve) {
        var branchNameWithoutVersion = branch.substring(branch.lastIndexOf("/"));

        winston.debug(`run export command`);

        (repository as any)._run(
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
