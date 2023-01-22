import { join }from 'path';
import {spawn} from "child_process";
import { writeJSON, emptyDir, mkdirp } from 'fs-extra';
import { SimpleGit } from 'simple-git';

import { Branch, mapBranchListsToUniqueBranches } from '../../configuration/configuration';
import { checkRepoStatus, getRemote, openRepository } from '../../utils/git';
import { logger } from "../../utils/logging";
import { pullBranch } from "../pull/pull";

export async function build(basePath: string, branchLists: Array<Branch[]>, targetFolderPathRelative: string, pull: string | boolean): Promise<void> {
  const targetFolderPathAbsolute = join(basePath, targetFolderPathRelative);
  const targetFilePathAbsolute = join(targetFolderPathAbsolute, 'distributions.json');

  // prepare
  await cleanup(targetFolderPathAbsolute);
  const repository = await openRepository(basePath);
  await checkRepoStatus(repository);
  const branchesToExport = mapBranchListsToUniqueBranches(branchLists);

  const pullRemote = await getRemote(pull, repository);

  logger.debug(`will save branches build artifacts to ${targetFolderPathAbsolute}`);
  await mkdirp(targetFolderPathAbsolute);

  logger.debug(`start apply branch lists`);

  const distributions: string[] = [];

  for (let branch of branchesToExport) {
    const distribution = await exportBranch(branch, repository, targetFolderPathAbsolute, pullRemote);
    distributions.push(distribution);
  }

  await writeJSON(targetFilePathAbsolute, distributions, { spaces: 2 });

  logger.debug(`finished all branch exports`);
}

async function cleanup(path: string): Promise<void> {
  logger.info(`clean up folder ${path}`);
  await emptyDir(path);
}

export async function exportBranch(branch: Branch, repository: SimpleGit, exportTarget: string, pullRemote: string | false): Promise<string> {

  if (pullRemote) {
    await pullBranch(branch, repository, pullRemote);
  }
  else {
    await repository.checkout(branch);
  }
  
  logger.info(`export branch ${branch}`);

  const branchNameWithoutVersion = branch.substring(branch.lastIndexOf('/'));
  const targetPath = join(exportTarget, branchNameWithoutVersion);

  logger.debug(`run ng build command`);

  return new Promise<string>((resolve, reject) => {
    const cliProcess = spawn('npm', ['run', 'build', '--', `--output-path=${targetPath}`]);

    cliProcess.stdout.on('data', (data) => {
      if (typeof data === 'string') {
        logger.debug(data);
      } else {
        logger.debug(data.toString());
      }
    });

    cliProcess.stderr.on('data', (data) => {
      if (typeof data === 'string') {
        logger.error(data);
      } else {
        logger.error(data.toString());
      }
    });

    cliProcess.on('close', (code) => {
      if (code === 0) {
        resolve(branchNameWithoutVersion);
      }
      else {
        reject(code);
      }
    });

    logger.debug(`finish export branch ${branch}`);
  });

}
