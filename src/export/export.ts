import * as path from "path";
import * as winston from "winston";
import { SimpleGit } from 'simple-git/promise';

import { reduceSynchronized } from "../utils/promises";
import { Branch, mapBranchListsToUniqueBranches } from "../configuration/configuration";
import { openRepository, checkRepoStatus } from "../utils/git";

const mkdirp = require("mkdirp");

const exportTarget = "solutions/step-by-step";

export async function zip(repoPath: string, branchLists: Array<Branch[]>): Promise<void> {
  const repository = await openRepository(repoPath);
  await checkRepoStatus(repository);
  await applyBranchListsInRepository(branchLists, repository, repoPath);
}

export async function applyBranchListsInRepository(branchLists: Array<Branch[]>, repository: SimpleGit, repoPath: string): Promise<void> {
  const branchesToExport = mapBranchListsToUniqueBranches(branchLists);

  const absExportTarget = path.join(repoPath, exportTarget);

  winston.debug(`will save export to ${absExportTarget}`);
  await createDirRecursive(absExportTarget);

  winston.debug(`start apply branch lists`);
  await reduceSynchronized(branchesToExport, (previous: any, branch: Branch) => {
    return applyBranchInRepository(branch, repository, absExportTarget);
  });
  winston.debug(`all exports finished`);
}

async function createDirRecursive(path: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    winston.debug(`create "${path}" recursive`);

    mkdirp(path, (error: any) => {
      if (error) { reject(error); }
      else { resolve(); }
    })
  });
}

export async function applyBranchInRepository(branch: Branch, repository: SimpleGit, exportTarget: string): Promise<void> {
  winston.info(`export branch ${branch}`);

  await repository.checkout(branch);

  const branchNameWithoutVersion = branch.substring(branch.lastIndexOf("/"));
  const args = ["archive", "--format=zip", "-o", `${exportTarget}/${branchNameWithoutVersion}.zip`, "HEAD"];

  winston.debug(`run export command: ${args.join(" ")}`);
  await (repository as any).raw(args);

  winston.debug(`finish export branch ${branch}`);
}
