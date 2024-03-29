import { simpleGit, SimpleGit, StatusResult } from 'simple-git';
import { logger } from "./logging";


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

export async function amendCommit(repository: SimpleGit, message?: string): Promise<void> {
    const args = ['commit', '--amend'];

    if (message !== undefined) {
      args.push(`-m`, message, `--allow-empty-message`);
    } else {
      args.push(`--no-edit`);
    }

    await (repository as any).raw(args);
    logger.debug(`Amend with message "${message}"`);

    return Promise.resolve();
}

export async function getRemoteUrl(repository: SimpleGit, remoteName: string): Promise<string> {
    const args = ['remote', 'get-url', remoteName];

    const output: string = (await (repository as any).raw(args)).trim();
    logger.debug(`output of 'git remote get-url ${remoteName}': ${output}`);

    return Promise.resolve(output);
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

export async function removeRemotes(repository: SimpleGit): Promise<void> {
  const args = ['remote'];

  const output: string = await (repository as any).raw(args);
  logger.debug(`output of 'git remote': ${output}`);

  const remotes = output.trim().split('\n');

  for (let remote of remotes) {
    await (repository as any).removeRemote(remote);
  }
}

export async function checkoutOrCreateBranch(repository: SimpleGit, branchName: string): Promise<void> {
    const checkoutArgs = ['checkout', branchName];
    const createArgs = ['checkout', '-b', branchName];

    try {
        logger.debug(`try to checkout branch ${branchName}`);
        await repository.raw(checkoutArgs);
    } catch (e) {
        logger.debug(`branch ${branchName} does not exist, create it`);
        await repository.raw(createArgs);
    }
}
