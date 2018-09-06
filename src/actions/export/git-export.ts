import { Branch, mapBranchListsToUniqueBranches } from '../../configuration/configuration';
import * as path from "path";
import * as fse from 'fs-extra';
import { emptyDir } from 'fs-extra';
import * as os from "os";
import { amendCommitWithMessage, getFirstRemote, getRemoteUrl, openRepository } from '../../utils/git';
import { logger } from '../../utils/logging';
import * as rimraf from 'rimraf';
import * as archiver from 'archiver';


const { sep } = require('path');

export async function gitExport(basePath: string,
                                branchLists: Array<Branch[]>,
                                targetFolderPathRelative: string,
                                targetFileName: string,
                                remoteName: string | undefined,
) {
    const targetFolderPathAbsolute = path.join(basePath, targetFolderPathRelative);
    const zipExportTarget = path.join(targetFolderPathAbsolute, targetFileName);


    const tmpDir = await fse.mkdtemp(`${os.tmpdir()}${sep}`);
    logger.debug('created temp dir ', tmpDir);
    try {

        const ownGit = await openRepository(basePath);
        const remote = remoteName || await getFirstRemote(ownGit);
        const remoteUrl = await getRemoteUrl(ownGit, remote);

        await ownGit.clone(remoteUrl, tmpDir, ['--depth=1', '--no-single-branch']);
        const tmpGit = await openRepository(tmpDir);

        const branches = mapBranchListsToUniqueBranches(branchLists);

        for (let i = 0; i < branches.length; i++) {
            logger.debug(`checking out branch ${branches[i]}`);
            await tmpGit.checkout(branches[i]);
            await amendCommitWithMessage(tmpGit, 'initial commit. Please commit your changes in v**/chapter/start branch');
        }

        await (tmpGit as any).removeRemote(remote);
        logger.debug(`removed remote ${remote}`);

        // zipping
        await emptyDir(targetFolderPathAbsolute);
        const Archiver = require('archiver');
        const zip = Archiver('zip');

        await archive(tmpDir, zipExportTarget, zip);
    } finally {
        await rimraf(tmpDir, () => {
        });
    }
}

function archive(toBeArchived: string, targetZip: string, archive: archiver.Archiver): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        logger.debug(`beginn zipping ${toBeArchived} into file ${targetZip}`);
        archive.on('end', () => {
            logger.debug(`finished zip task successfully`);
            resolve()
        });

        const outFile = fse.createWriteStream(targetZip);
        archive.pipe(outFile);
        archive.glob('**/*', { cwd: toBeArchived, dot: true });
        archive.finalize();
    });
}

