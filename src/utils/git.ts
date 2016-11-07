import * as winston from "winston";
import { Repository } from "../nodegit";

// import * as Git from "nodegit";
const Git = require("nodegit");

export function checkRepoStatus(repository: Repository): Promise<Repository> {
  return repository
      .getStatus({
        flags: Git.Status.OPT.INCLUDE_UNTRACKED | Git.Status.OPT.RECURSE_UNTRACKED_DIRS
      })
      .then(function (status: any[]) {
        if (status.length > 0) {
          throw "Repository has still uncommitted changes!";
        }

        winston.info("repository is clean");
      })
      // for chaining
      .then(function () { return repository; });
}

export function openRepository(repoPath: string) {
  winston.info(`try to open git repository at ${repoPath}`);

  return Git.Repository
      .open(repoPath)
      .then(function (repository: Repository) {
        winston.debug(`repository opened at ${repository.path()}`);
        return repository;
      });
}
