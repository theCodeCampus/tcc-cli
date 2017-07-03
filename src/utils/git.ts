import * as winston from 'winston';
import {SimpleGit, StatusResult} from 'simple-git/promise';

const simpleGit = require('simple-git/promise');

export function checkRepoStatus(repository: SimpleGit): Promise<SimpleGit> {
  return repository
      .status()
      .then(function (status: StatusResult) {
        if (status.isClean() === false) {
          throw 'Repository has still uncommitted changes!';
        }

        winston.info('repository is clean');
      })
      // for chaining
      .then(function () { return repository; });
}

export function openRepository(repoPath: string) {
  winston.info(`try to open git repository at ${repoPath}`);
  var repository = simpleGit(repoPath);

  return Promise.resolve(repository)
      .then(function (repository) {
        winston.debug(`repository opened`);
        return repository;
      });
}
