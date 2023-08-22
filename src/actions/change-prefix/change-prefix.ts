import {Branch, mapBranchListsToUniqueBranches} from "../../configuration/configuration";
import {openRepository} from "../../utils/git";
import {logger} from "../../utils/logging";

export async function changePrefix(
    repoPath: string,
    branchLists: Array<Branch[]>,
    oldPrefix: string,
    newPrefix: string,
    move: boolean,
    force: boolean,
): Promise<void> {
    const reporitory = await openRepository(repoPath);

    const branches = mapBranchListsToUniqueBranches(branchLists).filter(branch => branch.startsWith(oldPrefix))

    logger.debug(repoPath, branchLists, oldPrefix, newPrefix, move, force, branches)

    await Promise.all(branches.map((branch) => {
        const newName = branch.replace(oldPrefix, newPrefix);
        const commandIntend = move ? '-m' : '-c'
        const command = force ? commandIntend.toUpperCase() : commandIntend
        const commandArgs = ['branch', command, branch, newName]
        logger.debug(`execute git ${commandArgs.join(',')}`)
        return reporitory.raw(commandArgs)
    }))
}
