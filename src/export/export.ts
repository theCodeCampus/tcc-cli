import * as path from 'path';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import { SimpleGit } from 'simple-git/promise';
import * as JSZip from 'jszip';

import { Branch, mapBranchListsToUniqueBranches } from '../configuration/configuration';
import { checkRepoStatus, getRemote, openRepository } from '../utils/git';
import { logger } from "../utils/logging";
import { pullBranch } from "../pull/pull";

const branchesSubDir = 'branches';

// named archive because export is a reserved word
export async function archive(basePath: string, branchLists: Array<Branch[]>, targetFolderPathRelative: string, targetFileName: string, pull: string | boolean): Promise<void> {
  const targetFolderPathAbsolute = path.join(basePath, targetFolderPathRelative);
  const branchExportTarget = path.join(targetFolderPathAbsolute, branchesSubDir);
  const zipExportTarget = path.join(targetFolderPathAbsolute, targetFileName);

  // prepare
  await cleanup(targetFolderPathAbsolute);
  const repository = await openRepository(basePath);
  await checkRepoStatus(repository);
  const branchesToExport = mapBranchListsToUniqueBranches(branchLists);

  const pullRemote = await getRemote(pull, repository);

  logger.debug(`will save branches export to ${branchExportTarget}`);
  await fse.mkdirp(branchExportTarget);

  logger.debug(`start apply branch lists`);

  const targetZip = new JSZip();

  for (let branch of branchesToExport) {
    const branchZipFile = await exportBranch(branch, repository, branchExportTarget, pullRemote);

    logger.debug(`add branch zip file to export zip`);
    const branchZipFilePath = path.join(branchZipFile.path, branchZipFile.file);
    const fileContent = await fse.readFile(branchZipFilePath);
    targetZip.file(branchZipFile.file, fileContent);
  }

  logger.debug(`write export zip to ${zipExportTarget}`);
  await writeZipToFile(zipExportTarget, targetZip);

  // delete single branch zip files
  await fse.remove(branchExportTarget);

  logger.debug(`finished all branch exports`);
}

async function cleanup(path: string): Promise<void> {
  logger.info(`clean up folder ${path}`);
  await fse.emptyDir(path);
}

async function writeZipToFile(targetPath: string, zip: JSZip): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    zip
      .generateNodeStream({ type:'nodebuffer', streamFiles:true })
      .pipe(fs.createWriteStream(targetPath, { flags: 'w' }))
      .on('finish', function () {
        resolve();
      });
  });

}

export async function exportBranch(branch: Branch, repository: SimpleGit, exportTarget: string, pullRemote: string | false): Promise<{ path: string; file: string }> {

  if (pullRemote) {
    await pullBranch(branch, repository, pullRemote);
  }
  else {
    await repository.checkout(branch);
  }
  
  logger.info(`export branch ${branch}`);

  const branchNameWithoutVersion = branch.substring(branch.lastIndexOf('/'));
  const targetFile = `${branchNameWithoutVersion}.zip`;
  const targetFileWithPath = path.join(exportTarget, targetFile);
  const args = ['archive', '--format=zip', '-o', targetFileWithPath, 'HEAD'];

  logger.debug(`run export command: ${args.join(' ')}`);
  const output = await (repository as any).raw(args);
  logger.debug(`output of 'git archive': ${output}`);

  logger.debug(`finish export branch ${branch}`);

  return Promise.resolve({
    path: exportTarget,
    file: targetFile
  });
}
