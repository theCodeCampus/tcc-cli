import { SimpleGit, StatusResult } from 'simple-git/promise';
import { logger } from "./logging";

const simpleGit = require('simple-git/promise');

export async function checkRepoStatus(repository: SimpleGit): Promise<void> {
  const status: StatusResult = await repository.status();

  if (status.isClean() === false) {
      throw 'Repository has still uncommitted changes!';
  }

  logger.info('repository is clean');
}

export async function openRepository(repoPath: string): Promise<SimpleGit> {
  logger.debug(`open git repository at ${repoPath}`);
  const repository = simpleGit(repoPath);
  logger.debug(`repository opened`);

  return Promise.resolve(repository);
}

export async function getFirstRemote(repository: SimpleGit): Promise<string> {
  const args = ['remote'];

  const output: string = await (repository as any).raw(args);
  logger.debug(`output of 'git remote': ${output}`);

  const remotes = output.trim().split('\n');

  if (remotes.length === 0) {
    throw new Error('No remote configured');
  }
  logger.debug(`${remotes.length} remotes found: ${JSON.stringify(remotes)}`)

  const firstRemote = remotes[0];

  logger.debug(`first remote: ${firstRemote}`);

  return Promise.resolve(firstRemote);
}

export async function getRemote(config: string | boolean, repository: SimpleGit): Promise<string | false> {
  let remote: string | false;

  if (config === true) {
    remote = await getFirstRemote(repository);
  }
  else {
    remote = config;
  }

  return remote;
}