import * as path from 'path';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as winston from 'winston';
import { SimpleGit } from 'simple-git/promise';
import * as JSZip from 'jszip';

import { Branch, mapBranchListsToUniqueBranches } from '../configuration/configuration';
import { openRepository, checkRepoStatus } from '../utils/git';

const branchesSubDir = 'branches';

export async function exportBranches(basePath: string, branchLists: Array<Branch[]>, targetFolderPathRelative: string, targetFileName: string): Promise<void> {
  const targetFolderPathAbsolute = path.join(basePath, targetFolderPathRelative);
  const branchExportTarget = path.join(targetFolderPathAbsolute, branchesSubDir);
  const zipExportTarget = path.join(targetFolderPathAbsolute, targetFileName);

  // prepare
  await cleanup(targetFolderPathAbsolute);
  const repository = await openRepository(basePath);
  await checkRepoStatus(repository);
  const branchesToExport = mapBranchListsToUniqueBranches(branchLists);

  winston.debug(`will save branches export to ${branchExportTarget}`);
  await fse.mkdirp(branchExportTarget);

  winston.debug(`start apply branch lists`);

  const targetZip = new JSZip();

  for (let branch of branchesToExport) {
    const branchZipFile = await exportBranch(branch, repository, branchExportTarget);

    winston.debug(`add branch zip file to export zip`);
    const branchZipFilePath = path.join(branchZipFile.path, branchZipFile.file);
    const fileContent = await fse.readFile(branchZipFilePath);
    targetZip.file(branchZipFile.file, fileContent);
  }

  winston.debug(`write export zip to ${zipExportTarget}`);
  await writeZipToFile(zipExportTarget, targetZip);

  // delete single branch zip files
  await fse.remove(branchExportTarget);

  winston.debug(`finished all branch exports`);
}

async function cleanup(path: string): Promise<void> {
  winston.info(`clean up folder ${path}`);
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

export async function exportBranch(branch: Branch, repository: SimpleGit, exportTarget: string): Promise<{ path: string, file: string}> {
  winston.info(`export branch ${branch}`);

  await repository.checkout(branch);

  const branchNameWithoutVersion = branch.substring(branch.lastIndexOf('/'));
  const targetFile = `${branchNameWithoutVersion}.zip`;
  const targetFileWithPath = path.join(exportTarget, targetFile);
  const args = ['archive', '--format=zip', '-o', targetFileWithPath, 'HEAD'];

  winston.debug(`run export command: ${args.join(' ')}`);
  await (repository as any).raw(args);

  winston.debug(`finish export branch ${branch}`);

  return Promise.resolve({
    path: exportTarget,
    file: targetFile
  });
}
