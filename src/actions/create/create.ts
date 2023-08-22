import {Branch, mapBranchListsToUniqueBranches} from "../../configuration/configuration";
import {checkoutOrCreateBranch, openRepository} from "../../utils/git";

export async function create(repoPath: string, branchLists: Array<Branch[]>): Promise<void> {
    const reporitory = await openRepository(repoPath);

    const branches = mapBranchListsToUniqueBranches(branchLists);

    await Promise.all(branches.map(branch => checkoutOrCreateBranch(reporitory, branch)));
}
