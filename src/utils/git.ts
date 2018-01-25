import * as winston from 'winston';
import { SimpleGit, StatusResult } from 'simple-git/promise';

const simpleGit = require('simple-git/promise');

export async function checkRepoStatus(repository: SimpleGit): Promise<void> {
  const status: StatusResult = await repository.status();

  if (status.isClean() === false) {
      throw 'Repository has still uncommitted changes!';
  }

  winston.info('repository is clean');
}

export async function openRepository(repoPath: string): Promise<SimpleGit> {
  winston.info(`try to open git repository at ${repoPath}`);
  const repository = simpleGit(repoPath);
  winston.debug(`repository opened`);

  return repository;
}
