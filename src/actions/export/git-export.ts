import { Branch, mapBranchListsToUniqueBranches } from '../../configuration/configuration';
import * as path from "path";
import { sep } from "path";
import { emptyDir, mkdtemp, createWriteStream } from 'fs-extra';
import * as os from "os";
import { amendCommit, openRepository, removeRemotes } from '../../utils/git';
import { logger } from '../../utils/logging';
import * as rimraf from 'rimraf';
import * as archiver from 'archiver';
import { Archiver } from 'archiver';
import { simpleGit } from "simple-git";

export async function gitExport(basePath: string,
                                branchLists: Array<Branch[]>,
                                targetFolderPathRelative: string,
                                targetFileName: string
) {
    const targetFolderPathAbsolute = path.join(basePath, targetFolderPathRelative);
    const zipExportTarget = path.join(targetFolderPathAbsolute, targetFileName);

    const tmpDir = await mkdtemp(`${os.tmpdir()}${sep}`);
    logger.debug('created temp dir ', tmpDir);

    try {
        // file protocol is important, otherwise git will ignore depth parameter
        await simpleGit(tmpDir).clone(`file://${basePath}`, tmpDir, ['--depth=1', '--no-single-branch']);
        const tmpGit = await openRepository(tmpDir);

        const branches = mapBranchListsToUniqueBranches(branchLists);

        for (let i = 0; i < branches.length; i++) {
            logger.debug(`checking out branch ${branches[i]}`);
            await tmpGit.checkout(branches[i]);
            await amendCommit(tmpGit, ``);
        }

        await removeRemotes(tmpGit);
        await tmpGit.checkout(branches[0]);

        // zipping
        await emptyDir(targetFolderPathAbsolute);
        const zip = archiver('zip');
        await archive(tmpDir, zipExportTarget, zip);
    } finally {
        await rimraf(tmpDir, () => {});
    }
}

function archive(toBeArchived: string, targetZip: string, archive: Archiver): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        logger.debug(`begin zipping ${toBeArchived} into file ${targetZip}`);
        archive.on('end', () => {
            logger.debug(`finished zip task successfully`);
            resolve()
        });

        const outFile = createWriteStream(targetZip);
        archive.pipe(outFile);
        archive.glob('**/*', { cwd: toBeArchived, dot: true });
        archive.finalize();
    });
}

