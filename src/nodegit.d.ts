// Type definitions for nodegit
// Project: http://www.nodegit.org/
// Definitions by: John Vilk <https://jvilk.com/>
// Modified by: Philipp Burgmer

export class AnnotatedCommit {
  
  /**
   * @param repo repository that contains the given commit
   * @param branch_name name of the (remote) branch
   * @param remote_url url of the remote
   * @param id the commit object id of the remote branch
   */
  public static fromFetchhead(repo: Repository, branch_name: string, remote_url: string, id: Oid): Promise<AnnotatedCommit>;
  /**
   * @param repo repository that contains the given reference
   * @param ref reference to use to lookup the git_annotated_commit
   */
  public static fromRef(repo: Repository, ref: Reference): Promise<AnnotatedCommit>;
  /**
   * @param repo repository that contains the given commit
   * @param revspec the extended sha syntax string to use to lookup the commit
   */
  public static fromRevspec(repo: Repository, revspec: string): Promise<AnnotatedCommit>;
  /**
   * @param repo repository that contains the given commit
   * @param id the commit object id to lookup
   */
  public static lookup(repo: Repository, id: Oid): Promise<AnnotatedCommit>;
  
  /**
  
   */
  public free(): void;
  /**
   * @return  commit id
   */
  public id(): Oid;
}

declare enum AttrSTATES {
  FALSE_T = 2,
  TRUE_T = 1,
  UNSPECIFIED_T = 0,
  VALUE_T = 3
}

export class Attr {
  public static STATES: typeof AttrSTATES;
  /**
   * @param repo 
   * @param name 
   * @param values 
   */
  public static addMacro(repo: Repository, name: string, values: string): number;
  /**
   * @param repo 
   */
  public static cacheFlush(repo: Repository): void;
  /**
   * @param repo The repository containing the path.
   * @param flags A combination of GIT_ATTR_CHECK... flags.
   * @param path The path to check for attributes.  Relative paths are
   *                  interpreted relative to the repo root.  The file does
   *                  not have to exist, but if it does not, then it will be
   *                  treated as a plain file (not a directory).
   * @param name The name of the attribute to look up.
   * @return Output of the value of the attribute.  Use the GIT_ATTR_...
   *                  macros to test for TRUE, FALSE, UNSPECIFIED, etc. or just
   *                  use the string value for attributes set to a value.  You
   *                  should NOT modify or free this value.
   */
  public static get(repo: Repository, flags: number, path: string, name: string): Promise<string>;
  /**
   * @param repo The repository containing the path.
   * @param flags A combination of GIT_ATTR_CHECK... flags.
   * @param path The path inside the repo to check attributes.  This
   *                  does not have to exist, but if it does not, then
   *                  it will be treated as a plain file (i.e. not a directory).
   * @param num_attr The number of attributes being looked up
   * @param names An array of num_attr strings containing attribute names.
   */
  public static getMany(repo: Repository, flags: number, path: string, num_attr: number, names: string): Array<any>;
  /**
   * @param attr The attribute
   * @return  the value type for the attribute
   */
  public static value(attr: string): number;
  
  
}

declare enum BlameFLAG {
  FIRST_PARENT = 16,
  NORMAL = 0,
  TRACK_COPIES_ANY_COMMIT_COPIES = 8,
  TRACK_COPIES_SAME_COMMIT_COPIES = 4,
  TRACK_COPIES_SAME_COMMIT_MOVES = 2,
  TRACK_COPIES_SAME_FILE = 1
}

export class Blame {
  public static FLAG: typeof BlameFLAG;
  /**
   * Retrieve the blame of a file
   * @param repo that contains the file
   * @param path to the file to get the blame of
   * @param options Options for the blame
   */
  public static file(repo: Repository, path: string, options?: BlameOptions): void;
  /**
   * @param opts The `git_blame_options` struct to initialize
   * @param version Version of struct; pass `GIT_BLAME_OPTIONS_VERSION`
   * @return  Zero on success; -1 on failure.
   */
  public static initOptions(opts: BlameOptions, version: number): number;
  
  /**
   * @param buffer the (possibly) modified contents of the file
   * @param buffer_len number of valid bytes in the buffer
   */
  public buffer(buffer: string, buffer_len: number): Promise<Blame>;
  /**
  
   */
  public free(): void;
  /**
   * @param index index of the hunk to retrieve
   * @return  the hunk at the given index, or NULL on error
   */
  public getHunkByIndex(index: number): BlameHunk;
  /**
   * @param lineno the (1-based) line number to find a hunk for
   * @return  the hunk that contains the given line, or NULL on error
   */
  public getHunkByLine(lineno: number): BlameHunk;
  /**
  
   */
  public getHunkCount(): number;
}

export class BlameHunk {
  
  
  public finalCommitId: Oid
  public finalSignature: Signature
  public finalStartLineNumber: number
  public linesInHunk: number
  public origCommitId: Oid
  public origPath: string
  public origSignature: Signature
  public origStartLineNumber: number
  
}

export class BlameOptions {
  
  
  public flags: number
  public maxLine: number
  public minLine: number
  public minMatchCharacters: number
  public newestCommit: Oid
  public oldestCommit: Oid
  public version: number
  
}

declare class GitBlob {
  
  /**
   * @param repo repository where to blob will be written
   * @param buffer data to be written into the blob
   * @param len length of the data
   * @return return the id of the written blob
   */
  public static createFromBuffer(repo: Repository, buffer: Buffer, len: number): Oid;
  /**
   * @param id return the id of the written blob
   * @param repo repository where the blob will be written.
   *     	this repository can be bare or not
   * @param path file from which the blob will be created
   * @return  0 or an error code
   */
  public static createFromDisk(id: Oid, repo: Repository, path: string): number;
  /**
   * @param id return the id of the written blob
   * @param repo repository where the blob will be written.
   *     	this repository cannot be bare
   * @param relative_path file from which the blob will be created,
   *     	relative to the repository's working dir
   * @return  0 or an error code
   */
  public static createFromWorkdir(id: Oid, repo: Repository, relative_path: string): number;
  /**
   * Retrieves the blob pointed to by the oid
   * @param repo The repo that the blob lives in
   * @param id The blob to lookup
   */
  public static lookup(repo: Repository, id: string | Oid | GitBlob): Promise<GitBlob>;
  /**
   * @param repo the repo to use when locating the blob.
   * @param id identity of the blob to locate.
   * @param len the length of the short identifier
   */
  public static lookupPrefix(repo: Repository, id: Oid, len: number): Promise<GitBlob>;
  
  /**
   * Retrieve the content of the Blob.
   * @return Contents as a buffer.
   */
  public content(): Buffer;
  /**
   * Retrieve the Blob's type.
   * @return The filemode of the blob.
   */
  public filemode(): number;
  /**
  
   */
  public free(): void;
  /**
   * @return  SHA1 hash for this blob.
   */
  public id(): Oid;
  /**
   * @return  1 if the content of the blob is detected
   *      as binary; 0 otherwise.
   */
  public isBinary(): number;
  /**
   * @return  Repository that contains this blob.
   */
  public owner(): Repository;
  /**
  
   */
  public rawcontent(): Buffer;
  /**
   * @return  size on bytes
   */
  public rawsize(): number;
  /**
   * Retrieve the Blob's content as String.
   * @return Contents as a string.
   */
  public toString(): string;
}

declare enum BranchBRANCH {
  ALL = 3,
  LOCAL = 1,
  REMOTE = 2
}

export class Branch {
  public static BRANCH: typeof BranchBRANCH;
  /**
   * @param repo 
   * @param branch_name Name for the branch; this name is
   *      validated for consistency. It should also not conflict with
   *      an already existing branch name.
   * @param target Commit to which this branch should point. This object
   *      must belong to the given `repo`.
   * @param force Overwrite existing branch.
   * @return the underlying reference.
   */
  public static create(repo: Repository, branch_name: string, target: Commit, force?: number): Promise<Reference>;
  /**
   * @param repository 
   * @param branch_name 
   * @param commit 
   * @param force 
   */
  public static createFromAnnotated(repository: Repository, branch_name: string, commit: AnnotatedCommit, force?: number): Reference;
  /**
   * @param branch A valid reference representing a branch
   * @return  0 on success, or an error code.
   */
  public static delete(branch: Reference): number;
  /**
   * @param branch Current underlying reference of the branch.
   * @return  1 if HEAD points at the branch, 0 if it isn't,
   *      error code otherwise.
   */
  public static isHead(branch: Reference): number;
  /**
   * @param repo Repository where to find the branches.
   * @param list_flags Filtering flags for the branch
   *      listing. Valid values are GIT_BRANCH_LOCAL, GIT_BRANCH_REMOTE
   *      or GIT_BRANCH_ALL.
   * @return the iterator
   */
  public static iteratorNew(repo: Repository, list_flags: number): Promise<BranchIterator>;
  /**
   * @param repo the repository to look up the branch
   * @param branch_name Name of the branch to be looked-up;
   *      this name is validated for consistency.
   * @param branch_type Type of the considered branch. This should
   *      be valued with either GIT_BRANCH_LOCAL or GIT_BRANCH_REMOTE.
   */
  public static lookup(repo: Repository, branch_name: string, branch_type: number): Promise<Reference>;
  /**
   * @param branch Current underlying reference of the branch.
   * @param new_branch_name Target name of the branch once the move
   *      is performed; this name is validated for consistency.
   * @param force Overwrite existing branch.
   */
  public static move(branch: Reference, new_branch_name: string, force: number): Promise<Reference>;
  /**
   * @param ref the reference ideally pointing to a branch
   */
  public static name(ref: Reference): Promise<string>;
  /**
   * @param branch the branch to configure
   * @param upstream_name remote-tracking or local branch to set as
   *      upstream. Pass NULL to unset.
   * @return  0 or an error code
   */
  public static setUpstream(branch: Reference, upstream_name?: string): Promise<number>;
  /**
   * @param branch Current underlying reference of the branch.
   * @return the retrieved
   *      reference.
   */
  public static upstream(branch: Reference): Promise<Reference>;
  
  
}

export class BranchIterator {
  
  
  
  
}

export class Buf {
  
  
  public asize: number
  public ptr: string
  public size: number
  /**
   * [EXPERIMENTAL] 
   * @return  1 if buffer contains a NUL byte
   */
  public containsNul(): number;
  /**
   * [EXPERIMENTAL] 
   */
  public free(): void;
  /**
   * [EXPERIMENTAL] 
   * @param target_size The desired available size
   * @return The buffer to be resized; may or may not be allocated yet
   */
  public grow(target_size: number): Promise<Buf>;
  /**
   * [EXPERIMENTAL] 
   * @return  1 if buffer looks like non-text data
   */
  public isBinary(): number;
  /**
   * [EXPERIMENTAL] 
   * @param data The data to copy into the buffer
   * @param datalen The length of the data to copy into the buffer
   * @return The buffer to set
   */
  public set(data: Buffer, datalen: number): Promise<Buf>;
}

declare enum CertSSH {
  MD5 = 1,
  SHA1 = 2
}

declare enum CertTYPE {
  HOSTKEY_LIBSSH2 = 2,
  NONE = 0,
  STRARRAY = 3,
  X509 = 1
}

export class Cert {
  public static SSH: typeof CertSSH;
  public static TYPE: typeof CertTYPE;
  
  public certType: number
  
}

export class CertHostkey {
  
  
  public certType: number
  public hashMd5: Array<number>
  public hashSha1: Array<number>
  public type: number
  
}

export class CertX509 {
  
  
  public certType: number
  public data: Buffer
  public len: number
  
}

declare enum CheckoutNOTIFY {
  ALL = 65535,
  CONFLICT = 1,
  DIRTY = 2,
  IGNORED = 16,
  NONE = 0,
  UNTRACKED = 8,
  UPDATED = 4
}

declare enum CheckoutSTRATEGY {
  ALLOW_CONFLICTS = 16,
  CONFLICT_STYLE_DIFF3 = 2097152,
  CONFLICT_STYLE_MERGE = 1048576,
  DISABLE_PATHSPEC_MATCH = 8192,
  DONT_OVERWRITE_IGNORED = 524288,
  DONT_REMOVE_EXISTING = 4194304,
  DONT_UPDATE_INDEX = 256,
  DONT_WRITE_INDEX = 8388608,
  FORCE = 2,
  NONE = 0,
  NO_REFRESH = 512,
  RECREATE_MISSING = 4,
  REMOVE_IGNORED = 64,
  REMOVE_UNTRACKED = 32,
  SAFE = 1,
  SKIP_LOCKED_DIRECTORIES = 262144,
  SKIP_UNMERGED = 1024,
  UPDATE_ONLY = 128,
  UPDATE_SUBMODULES = 65536,
  UPDATE_SUBMODULES_IF_CHANGED = 131072,
  USE_OURS = 2048,
  USE_THEIRS = 4096
}

export class Checkout {
  public static NOTIFY: typeof CheckoutNOTIFY;
  public static STRATEGY: typeof CheckoutSTRATEGY;
  /**
   * Patch head checkout to automatically coerce objects.
   * @param repo The repo to checkout head
   * @param options Options for the checkout
   * @return checkout complete
   */
  public static head(repo: Repository, options?: CheckoutOptions): Promise<void>;
  /**
   * Patch index checkout to automatically coerce objects.
   * @param repo The repo to checkout an index
   * @param The index to checkout
   * @param options Options for the checkout
   * @return checkout complete
   */
  public static index(repo: Repository, The: Index, options?: CheckoutOptions): Promise<void>;
  /**
   * @param opts the `git_checkout_options` struct to initialize.
   * @param version Version of struct; pass `GIT_CHECKOUT_OPTIONS_VERSION`
   * @return  Zero on success; -1 on failure.
   */
  public static initOptions(opts: CheckoutOptions, version: number): number;
  /**
   * Patch tree checkout to automatically coerce objects.
   * @param repo 
   * @param treeish 
   * @param options 
   * @return checkout complete
   */
  public static tree(repo: Repository, treeish: Oid | Tree | Commit | Reference, options?: CheckoutOptions): Promise<void>;
  
  
}

export class CheckoutOptions {
  
  
  public ancestorLabel: string
  public baseline: Tree
  public baselineIndex: Index
  public checkoutStrategy: number
  public dirMode: number
  public disableFilters: number
  public fileMode: number
  public fileOpenFlags: number
  public notifyCb: Function
  public notifyFlags: number
  public notifyPayload: void
  public ourLabel: string
  public paths: Strarray
  public perfdataCb: Function
  public perfdataPayload: void
  public progressCb: Function
  public progressPayload: void
  public targetDirectory: string
  public theirLabel: string
  public version: number
  
}

export class Cherrypick {
  
  /**
   * Cherrypick a commit and, changing the index and working directory
   * @param repo The repo to checkout head
   * @param commit The commit to cherrypick
   * @param options Options for the cherrypick
   * @return 0 on success, -1 on failure
   */
  public static cherrypick(repo: Repository, commit: Commit, options?: CherrypickOptions): Promise<number>;
  /**
   * Cherrypicks the given commit against "our" commit, producing an index that
   * reflects the result of the cherrypick. The index is not backed by a repo.
   * @param repo The repo to cherrypick commits
   * @param cherrypick_commit The commit to cherrypick
   * @param our_commit The commit to revert against
   * @param mainline The parent of the revert commit (1 or                                         2) if it's a merge, 0 otherwise
   * @param merge_options Merge options for the cherrypick
   * @return 0 on success, -1 on failure
   */
  public static commit(repo: Repository, cherrypick_commit: Commit, our_commit: Commit, mainline: number, merge_options?: MergeOptions): Promise<number>;
  /**
   * @param opts the `git_cherrypick_options` struct to initialize
   * @param version Version of struct; pass `GIT_CHERRYPICK_OPTIONS_VERSION`
   * @return  Zero on success; -1 on failure.
   */
  public static initOptions(opts: CherrypickOptions, version: number): number;
  
  
}

export class CherrypickOptions {
  
  
  public checkoutOpts: CheckoutOptions
  public mainline: number
  public mergeOpts: MergeOptions
  public version: number
  
}

declare enum CloneLOCAL {
  AUTO = 0,
  LOCAL = 1,
  NO_LINKS = 3,
  NO_LOCAL = 2
}

export class Clone {
  public static LOCAL: typeof CloneLOCAL;
  /**
   * Patch repository cloning to automatically coerce objects.
   * @param url url of the repository
   * @param local_path local path to store repository
   * @param options 
   * @return repo
   */
  public static clone(url: string, local_path: string, options?: CloneOptions): Promise<Repository>;
  /**
   * @param opts The `git_clone_options` struct to initialize
   * @param version Version of struct; pass `GIT_CLONE_OPTIONS_VERSION`
   * @return  Zero on success; -1 on failure.
   */
  public static initOptions(opts: CloneOptions, version: number): number;
  
  
}

export class CloneOptions {
  
  
  public bare: number
  public checkoutBranch: string
  public checkoutOpts: CheckoutOptions
  public fetchOpts: FetchOptions
  public local: number
  public remoteCbPayload: void
  public repositoryCbPayload: void
  public version: number
  
}

export class Commit {
  
  /**
   * @param repo Repository where to store the commit
   * @param update_ref If not NULL, name of the reference that
   *     	will be updated to point to this commit. If the reference
   *     	is not direct, it will be resolved to a direct reference.
   *     	Use "HEAD" to update the HEAD of the current branch and
   *     	make it point to this commit. If the reference doesn't
   *     	exist yet, it will be created. If it does exist, the first
   *     	parent must be the tip of this branch.
   * @param author Signature with author and author time of commit
   * @param committer Signature with committer and * commit time of commit
   * @param message_encoding The encoding for the message in the
   *       commit, represented with a standard encoding name.
   *       E.g. "UTF-8". If NULL, no encoding header is written and
   *       UTF-8 is assumed.
   * @param message Full message for this commit
   * @param tree An instance of a `git_tree` object that will
   *       be used as the tree for the commit. This tree object must
   *       also be owned by the given `repo`.
   * @param parent_count Number of parents for this commit
   * @param parents Array of `parent_count` pointers to `git_commit`
   *       objects that will be used as the parents for this commit. This
   *       array may be NULL if `parent_count` is 0 (root commit). All the
   *       given commits must be owned by the `repo`.
   */
  public static create(repo: Repository, author: Signature, committer: Signature, message: string, tree: Tree, parent_count: number, parents: Array<any>): Oid;
  public static create(repo: Repository, update_ref: string, author: Signature, committer: Signature, message: string, tree: Tree, parent_count: number, parents: Array<any>): Oid;
  public static create(repo: Repository, author: Signature, committer: Signature, message_encoding: string, message: string, tree: Tree, parent_count: number, parents: Array<any>): Oid;
  public static create(repo: Repository, update_ref: string, author: Signature, committer: Signature, message_encoding: string, message: string, tree: Tree, parent_count: number, parents: Array<any>): Oid;
  /**
   * @param id 
   * @param repo 
   * @param update_ref 
   * @param author 
   * @param committer 
   * @param message_encoding 
   * @param message 
   * @param tree 
   * @param parent_count 
   */
  public static createV(id: Oid, repo: Repository, update_ref: string, author: Signature, committer: Signature, message_encoding: string, message: string, tree: Tree, parent_count: number): number;
  /**
   * Retrieves the commit pointed to by the oid
   * @param repo The repo that the commit lives in
   * @param id The commit to lookup
   */
  public static lookup(repo: Repository, id: string | Oid | Commit): Promise<Commit>;
  /**
   * @param repo the repo to use when locating the commit.
   * @param id identity of the commit to locate. If the object is
   *     		an annotated tag it will be peeled back to the commit.
   * @param len the length of the short identifier
   */
  public static lookupPrefix(repo: Repository, id: Oid, len: number): Promise<Commit>;
  
  /**
   * @param update_ref 
   * @param author 
   * @param committer 
   * @param message_encoding 
   * @param message 
   * @param tree 
   */
  public amend(update_ref?: string, author?: Signature, committer?: Signature, message_encoding?: string, message?: string, tree?: Tree): Oid;
  /**
   * @return  the author of a commit
   */
  public author(): Signature;
  /**
   * @return  the committer of a commit
   */
  public committer(): Signature;
  /**
   * Retrieve the commit time as a Date object.
   */
  public date(): Date;
  /**
  
   */
  public free(): void;
  /**
   * Generate an array of diff trees showing changes between this commit
   * and its parent(s).
   * @param callback 
   * @return an array of diffs
   */
  public getDiff(callback: Function): Promise<Array<Diff>>;
  /**
   * Generate an array of diff trees showing changes between this commit
   * and its parent(s).
   * @param options 
   * @param callback 
   * @return an array of diffs
   */
  public getDiffWithOptions(options: GitObject, callback: Function): Promise<Array<Diff>>;
  /**
   * Retrieve the entry represented by path for this commit.
   * Path must be relative to repository root.
   * @param path 
   */
  public getEntry(path: string): Promise<TreeEntry>;
  /**
   * Retrieve the commit's parents as commit objects.
   * @param limit Optional amount of parents to return.
   * @param callback 
   * @return array of commits
   */
  public getParents(limit: number, callback: Function): Promise<Array<Commit>>;
  /**
   * Get the tree associated with this commit.
   */
  public getTree(): Promise<Tree>;
  /**
   * @param field the header field to return
   * @return the buffer to fill
   */
  public headerField(field: string): Promise<Buf>;
  /**
   * Walk the history from this commit backwards.
   * An EventEmitter is returned that will emit a "commit" event for each
   * commit in the history, and one "end" event when the walk is completed.
   * Don't forget to call `start()` on the returned event.
   */
  public history(): NodeJS.EventEmitter;
  /**
   * @return  object identity for the commit.
   */
  public id(): Oid;
  /**
   * @return  the message of a commit
   */
  public message(): string;
  /**
   * @return  NULL, or the encoding
   */
  public messageEncoding(): string;
  /**
   * @return  the raw message of a commit
   */
  public messageRaw(): string;
  /**
   * @param n the requested generation
   * @return the ancestor commit
   */
  public nthGenAncestor(n: number): Promise<Commit>;
  /**
   * @return  Repository that contains this commit.
   */
  public owner(): Repository;
  /**
   * @param n the position of the parent (from 0 to `parentcount`)
   * @return the parent commit
   */
  public parent(n: number): Promise<Commit>;
  /**
   * @param n the position of the parent (from 0 to `parentcount`)
   * @return  the id of the parent, NULL on error.
   */
  public parentId(n: number): Oid;
  /**
   * @return  integer of count of parents
   */
  public parentcount(): number;
  /**
   * Retrieve the commit"s parent shas.
   * @param callback 
   * @return array of oids
   */
  public parents(callback: Function): Array<Oid>;
  /**
   * @return  the header text of the commit
   */
  public rawHeader(): string;
  /**
   * Retrieve the SHA.
   */
  public sha(): string;
  /**
   * @return  the summary of a commit or NULL on error
   */
  public summary(): string;
  /**
   * @return  the time of a commit
   */
  public time(): number;
  /**
   * Retrieve the commit time as a unix timestamp.
   */
  public timeMs(): number;
  /**
   * @return  positive or negative timezone offset, in minutes from UTC
   */
  public timeOffset(): number;
  /**
   * The sha of this commit
   */
  public toString(): string;
  /**
   * @param tree_out pointer where to store the tree object
   * @return  0 or an error code
   */
  public tree(tree_out: Tree): number;
  /**
   * @return  the id of tree pointed to by commit.
   */
  public treeId(): Oid;
}

declare enum ConfigLEVEL {
  APP = 5,
  GLOBAL = 3,
  HIGHEST_LEVEL = -1,
  LOCAL = 4,
  SYSTEM = 1,
  XDG = 2
}

export class Config {
  public static LEVEL: typeof ConfigLEVEL;
  /**
  
   */
  public static openDefault(): Promise<Config>;
  
  /**
   * @param name the variable's name
   * @return buffer in which to store the string
   */
  public getStringBuf(name: string): Promise<Buf>;
  /**
   * @param name the variable's name
   * @param value Long integer value for the variable
   * @return  0 or an error code
   */
  public setInt64(name: string, value: number): number;
  /**
   * @param name the variable's name
   * @param regexp a regular expression to indicate which values to replace
   * @param value the new value.
   */
  public setMultivar(name: string, regexp: string, value: string): number;
  /**
   * @param name the variable's name
   * @param value the string to store.
   * @return  0 or an error code
   */
  public setString(name: string, value: string): Promise<number>;
  /**
  
   */
  public snapshot(): Promise<Config>;
}

export class ConfigEntry {
  
  
  public free: any
  public level: number
  public name: string
  public payload: void
  public value: string
  
}

export class ConvenientPatch {
  
  
  
  /**
   * The hunks in this patch
   * @return a promise that resolves to an array of                                      ConvenientHunks
   */
  public hunks(): Promise<Array<any>>;
  /**
   * Is this an added patch?
   */
  public isAdded(): Boolean;
  /**
   * Is this a conflicted patch?
   */
  public isConflicted(): Boolean;
  /**
   * Is this a copied patch?
   */
  public isCopied(): Boolean;
  /**
   * Is this a deleted patch?
   */
  public isDeleted(): Boolean;
  /**
   * Is this an ignored patch?
   */
  public isIgnored(): Boolean;
  /**
   * Is this an modified patch?
   */
  public isModified(): Boolean;
  /**
   * Is this a renamed patch?
   */
  public isRenamed(): Boolean;
  /**
   * Is this a type change?
   */
  public isTypeChange(): Boolean;
  /**
   * Is this an unmodified patch?
   */
  public isUnmodified(): Boolean;
  /**
   * Is this an undreadable patch?
   */
  public isUnreadable(): Boolean;
  /**
   * Is this an untracked patch?
   */
  public isUntracked(): Boolean;
  /**
   * The line statistics of this patch (#contexts, #added, #deleted)
   */
  public lineStats(): any;
  /**
   * New attributes of the file
   */
  public newFile(): DiffFile;
  /**
   * Old attributes of the file
   */
  public oldFile(): DiffFile;
  /**
   * The number of hunks in this patch
   */
  public size(): number;
  /**
   * The status of this patch (unmodified, added, deleted)
   */
  public status(): number;
}

declare enum CredTYPE {
  DEFAULT = 8,
  SSH_CUSTOM = 4,
  SSH_INTERACTIVE = 16,
  SSH_KEY = 2,
  SSH_MEMORY = 64,
  USERNAME = 32,
  USERPASS_PLAINTEXT = 1
}

export class Cred {
  public static TYPE: typeof CredTYPE;
  /**
  
   */
  public static defaultNew(): Cred;
  /**
   * @param username username to use to authenticate
   * @return The newly created credential object.
   */
  public static sshKeyFromAgent(username: string): Cred;
  /**
   * @param username username to use to authenticate.
   * @param publickey The public key of the credential.
   * @param privatekey The private key of the credential.
   * @param passphrase The passphrase of the credential.
   * @return The newly created credential object.
   */
  public static sshKeyMemoryNew(username: string, publickey: string, privatekey: string, passphrase: string): Promise<Cred>;
  /**
   * @param username username to use to authenticate
   * @param publickey The path to the public key of the credential.
   * @param privatekey The path to the private key of the credential.
   * @param passphrase The passphrase of the credential.
   * @return The newly created credential object.
   */
  public static sshKeyNew(username: string, publickey: string, privatekey: string, passphrase: string): Cred;
  /**
   * @param username 
   */
  public static usernameNew(username: string): Promise<Cred>;
  /**
   * @param username The username of the credential.
   * @param password The password of the credential.
   * @return The newly created credential object.
   */
  public static userpassPlaintextNew(username: string, password: string): Cred;
  
  /**
   * @return  1 if the credential object has non-NULL username, 0 otherwise
   */
  public hasUsername(): number;
}

export class CredDefault {
  
  
  
  
}

export class CredUsername {
  
  
  public parent: Cred
  public username: Array<number>
  
}

export class CredUserpassPayload {
  
  
  public password: string
  public username: string
  
}

export class CvarMap {
  
  
  public cvarType: number
  public mapValue: number
  public strMatch: string
  
}

export class DescribeFormatOptions {
  
  
  public abbreviatedSize: number
  public alwaysUseLongFormat: number
  public dirtySuffix: string
  public version: number
  
}

export class DescribeOptions {
  
  
  public describeStrategy: number
  public maxCandidatesTags: number
  public onlyFollowFirstParent: number
  public pattern: string
  public showCommitOidAsFallback: number
  public version: number
  
}

declare enum DiffDELTA {
  ADDED = 1,
  CONFLICTED = 10,
  COPIED = 5,
  DELETED = 2,
  IGNORED = 6,
  MODIFIED = 3,
  RENAMED = 4,
  TYPECHANGE = 8,
  UNMODIFIED = 0,
  UNREADABLE = 9,
  UNTRACKED = 7
}

declare enum DiffFIND {
  ALL = 255,
  AND_BREAK_REWRITES = 48,
  BREAK_REWRITES = 32,
  BREAK_REWRITES_FOR_RENAMES_ONLY = 32768,
  BY_CONFIG = 0,
  COPIES = 4,
  COPIES_FROM_UNMODIFIED = 8,
  DONT_IGNORE_WHITESPACE = 8192,
  EXACT_MATCH_ONLY = 16384,
  FOR_UNTRACKED = 64,
  IGNORE_LEADING_WHITESPACE = 0,
  IGNORE_WHITESPACE = 4096,
  REMOVE_UNMODIFIED = 65536,
  RENAMES = 1,
  RENAMES_FROM_REWRITES = 2,
  REWRITES = 16
}

declare enum DiffFLAG {
  BINARY = 1,
  EXISTS = 8,
  NOT_BINARY = 2,
  VALID_ID = 4
}

declare enum DiffFORMAT {
  NAME_ONLY = 4,
  NAME_STATUS = 5,
  PATCH = 1,
  PATCH_HEADER = 2,
  RAW = 3
}

declare enum DiffFORMAT_EMAIL_FLAGS {
  FORMAT_EMAIL_EXCLUDE_SUBJECT_PATCH_MARKER = 1,
  FORMAT_EMAIL_NONE = 0
}

declare enum DiffLINE {
  ADDITION = 43,
  ADD_EOFNL = 62,
  BINARY = 66,
  CONTEXT = 32,
  CONTEXT_EOFNL = 61,
  DELETION = 45,
  DEL_EOFNL = 60,
  FILE_HDR = 70,
  HUNK_HDR = 72
}

declare enum DiffOPTION {
  DISABLE_PATHSPEC_MATCH = 4096,
  ENABLE_FAST_UNTRACKED_DIRS = 16384,
  FORCE_BINARY = 2097152,
  FORCE_TEXT = 1048576,
  IGNORE_CASE = 1024,
  IGNORE_FILEMODE = 256,
  IGNORE_SUBMODULES = 512,
  IGNORE_WHITESPACE = 4194304,
  IGNORE_WHITESPACE_CHANGE = 8388608,
  IGNORE_WHITESPACE_EOL = 16777216,
  INCLUDE_CASECHANGE = 2048,
  INCLUDE_IGNORED = 2,
  INCLUDE_TYPECHANGE = 64,
  INCLUDE_TYPECHANGE_TREES = 128,
  INCLUDE_UNMODIFIED = 32,
  INCLUDE_UNREADABLE = 65536,
  INCLUDE_UNREADABLE_AS_UNTRACKED = 131072,
  INCLUDE_UNTRACKED = 8,
  MINIMAL = 536870912,
  NORMAL = 0,
  PATIENCE = 268435456,
  RECURSE_IGNORED_DIRS = 4,
  RECURSE_UNTRACKED_DIRS = 16,
  REVERSE = 1,
  SHOW_BINARY = 1073741824,
  SHOW_UNMODIFIED = 67108864,
  SHOW_UNTRACKED_CONTENT = 33554432,
  SKIP_BINARY_CHECK = 8192,
  UPDATE_INDEX = 32768
}

declare enum DiffSTATS_FORMAT {
  STATS_FULL = 1,
  STATS_INCLUDE_SUMMARY = 8,
  STATS_NONE = 0,
  STATS_NUMBER = 4,
  STATS_SHORT = 2
}

export class Diff {
  public static DELTA: typeof DiffDELTA;
  public static FIND: typeof DiffFIND;
  public static FLAG: typeof DiffFLAG;
  public static FORMAT: typeof DiffFORMAT;
  public static FORMAT_EMAIL_FLAGS: typeof DiffFORMAT_EMAIL_FLAGS;
  public static LINE: typeof DiffLINE;
  public static OPTION: typeof DiffOPTION;
  public static STATS_FORMAT: typeof DiffSTATS_FORMAT;
  /**
   * @param old_blob Blob for old side of diff, or NULL for empty blob
   * @param old_as_path Treat old blob as if it had this filename; can be NULL
   * @param buffer Raw data for new side of diff, or NULL for empty
   * @param buffer_len Length of raw data for new side of diff
   * @param buffer_as_path Treat buffer as if it had this filename; can be NULL
   * @param options Options for diff, or NULL for default options
   * @param file_cb Callback for "file"; made once if there is a diff; can be NULL
   * @param binary_cb Callback for binary files; can be NULL
   * @param hunk_cb Callback for each hunk in diff; can be NULL
   * @param line_cb Callback for each line in diff; can be NULL
   * @param payload Payload passed to each callback function
   * @return  0 on success, non-zero callback return value, or error code
   */
  public static blobToBuffer(old_blob?: GitBlob, old_as_path?: string, buffer?: string, buffer_len?: number, buffer_as_path?: string, options?: DiffOptions, file_cb?: Function, binary_cb?: Function, hunk_cb?: Function, line_cb?: Function, payload?: void): Promise<number>;
  /**
   * @param repo The repository.
   * @param index The index to diff from; repo index used if NULL.
   * @param opts Structure with options to influence diff or NULL for defaults.
   */
  public static indexToWorkdir(repo: Repository, index?: Index, opts?: DiffOptions): Promise<Diff>;
  /**
   * @param repo The repository containing the tree and index.
   * @param old_tree A git_tree object to diff from, or NULL for empty tree.
   * @param index The index to diff with; repo index used if NULL.
   * @param opts Structure with options to influence diff or NULL for defaults.
   */
  public static treeToIndex(repo: Repository, old_tree?: Tree, index?: Index, opts?: DiffOptions): Promise<Diff>;
  /**
   * @param repo The repository containing the trees.
   * @param old_tree A git_tree object to diff from, or NULL for empty tree.
   * @param new_tree A git_tree object to diff to, or NULL for empty tree.
   * @param opts Structure with options to influence diff or NULL for defaults.
   */
  public static treeToTree(repo: Repository, old_tree?: Tree, new_tree?: Tree, opts?: DiffOptions): Promise<Diff>;
  /**
   * @param repo The repository containing the tree.
   * @param old_tree A git_tree object to diff from, or NULL for empty tree.
   * @param opts Structure with options to influence diff or NULL for defaults.
   */
  public static treeToWorkdir(repo: Repository, old_tree?: Tree, opts?: DiffOptions): Promise<Diff>;
  /**
   * @param repo The repository containing the tree.
   * @param old_tree A git_tree object to diff from, or NULL for empty tree.
   * @param opts Structure with options to influence diff or NULL for defaults.
   */
  public static treeToWorkdirWithIndex(repo: Repository, old_tree?: Tree, opts?: DiffOptions): Promise<Diff>;
  
  /**
   * @param options Control how detection should be run, NULL for defaults
   * @return  0 on success, -1 on failure
   */
  public findSimilar(options?: DiffFindOptions): Promise<number>;
  /**
   * @param idx Index into diff list
   */
  public getDelta(idx: number): DiffDelta;
  /**
   * @return Structure to be filled with diff performance data
   */
  public getPerfdata(): Promise<DiffPerfdata>;
  /**
   * @return  Count of number of deltas in the list
   */
  public numDeltas(): number;
  /**
   * Retrieve patches in this difflist
   * @return a promise that resolves to an array of                                      ConvenientPatches
   */
  public patches(): Promise<Array<ConvenientPatch>>;
}

declare enum DiffBinaryDIFF_BINARY {
  DELTA = 2,
  LITERAL = 1,
  NONE = 0
}

export class DiffBinary {
  public static DIFF_BINARY: typeof DiffBinaryDIFF_BINARY;
  
  public newFile: DiffBinaryFile
  public oldFile: DiffBinaryFile
  
}

export class DiffBinaryFile {
  
  
  public data: string
  public datalen: number
  public inflatedlen: number
  public type: number
  
}

export class DiffDelta {
  
  
  public flags: number
  public newFile: DiffFile
  public nfiles: number
  public oldFile: DiffFile
  public similarity: number
  public status: number
  
}

export class DiffFile {
  
  
  
  /**
   * Returns the file's flags
   */
  public flags(): number;
  /**
   * Returns the file's Oid
   */
  public id(): Oid;
  /**
   * Returns the file's mode
   */
  public mode(): number;
  /**
   * Returns the file's path
   */
  public path(): string;
  /**
   * Returns the file's size
   */
  public size(): number;
}

export class DiffFindOptions {
  
  
  public breakRewriteThreshold: number
  public copyThreshold: number
  public flags: number
  public renameFromRewriteThreshold: number
  public renameLimit: number
  public renameThreshold: number
  public version: number
  
}

export class DiffHunk {
  
  
  public header: string
  public headerLen: number
  public newLines: number
  public newStart: number
  public oldLines: number
  public oldStart: number
  
}

export class DiffLine {
  
  
  public contentLen: number
  public contentOffset: number
  public newLineno: number
  public numLines: number
  public oldLineno: number
  public origin: number
  /**
   * The relevant line
   */
  public content(): string;
}

export class DiffOptions {
  
  
  public contextLines: number
  public flags: number
  public idAbbrev: number
  public ignoreSubmodules: number
  public interhunkLines: number
  public maxSize: number
  public newPrefix: string
  public notifyCb: Function
  public notifyPayload: void
  public oldPrefix: string
  public pathspec: Strarray
  public version: number
  
}

export class DiffPerfdata {
  
  
  public oidCalculations: number
  public statCalls: number
  public version: number
  
}

export class DiffStats {
  
  
  
  
}

declare enum EnumsCVAR {
  FALSE = 0,
  INT32 = 2,
  STRING = 3,
  TRUE = 1
}

declare enum EnumsDIRECTION {
  FETCH = 0,
  PUSH = 1
}

declare enum EnumsFEATURE {
  HTTPS = 2,
  SSH = 4,
  THREADS = 1
}

declare enum EnumsIDXENTRY_EXTENDED_FLAG {
  IDXENTRY_ADDED = 8,
  IDXENTRY_CONFLICTED = 128,
  IDXENTRY_EXTENDED2 = 32768,
  IDXENTRY_HASHED = 16,
  IDXENTRY_INTENT_TO_ADD = 8192,
  IDXENTRY_NEW_SKIP_WORKTREE = 512,
  IDXENTRY_REMOVE = 2,
  IDXENTRY_SKIP_WORKTREE = 16384,
  IDXENTRY_UNHASHED = 32,
  IDXENTRY_UNPACKED = 256,
  IDXENTRY_UPDATE = 1,
  IDXENTRY_UPTODATE = 4,
  IDXENTRY_WT_REMOVE = 64,
  S = 24576
}

declare enum EnumsINDXENTRY_FLAG {
  IDXENTRY_EXTENDED = 16384,
  IDXENTRY_VALID = 32768
}

export class Enums {
  public static CVAR: typeof EnumsCVAR;
  public static DIRECTION: typeof EnumsDIRECTION;
  public static FEATURE: typeof EnumsFEATURE;
  public static IDXENTRY_EXTENDED_FLAG: typeof EnumsIDXENTRY_EXTENDED_FLAG;
  public static INDXENTRY_FLAG: typeof EnumsINDXENTRY_FLAG;
  
  
  
}

declare enum ErrorCODE {
  EAMBIGUOUS = -5,
  EAPPLIED = -18,
  EAUTH = -16,
  EBAREREPO = -8,
  EBUFS = -6,
  ECERTIFICATE = -17,
  ECONFLICT = -13,
  EDIRECTORY = -23,
  EEOF = -20,
  EEXISTS = -4,
  EINVALID = -21,
  EINVALIDSPEC = -12,
  ELOCKED = -14,
  EMODIFIED = -15,
  ENONFASTFORWARD = -11,
  ENOTFOUND = -3,
  EPEEL = -19,
  ERROR = -1,
  EUNBORNBRANCH = -9,
  EUNCOMMITTED = -22,
  EUNMERGED = -10,
  EUSER = -7,
  ITEROVER = -31,
  OK = 0,
  PASSTHROUGH = -30
}

declare enum ErrorERROR {
  GITERR_CALLBACK = 26,
  GITERR_CHECKOUT = 20,
  GITERR_CHERRYPICK = 27,
  GITERR_CONFIG = 7,
  GITERR_DESCRIBE = 28,
  GITERR_FETCHHEAD = 21,
  GITERR_FILESYSTEM = 30,
  GITERR_FILTER = 24,
  GITERR_INDEX = 10,
  GITERR_INDEXER = 15,
  GITERR_INVALID = 3,
  GITERR_MERGE = 22,
  GITERR_NET = 12,
  GITERR_NOMEMORY = 1,
  GITERR_NONE = 0,
  GITERR_OBJECT = 11,
  GITERR_ODB = 9,
  GITERR_OS = 2,
  GITERR_REBASE = 29,
  GITERR_REFERENCE = 4,
  GITERR_REGEX = 8,
  GITERR_REPOSITORY = 6,
  GITERR_REVERT = 25,
  GITERR_SSH = 23,
  GITERR_SSL = 16,
  GITERR_STASH = 19,
  GITERR_SUBMODULE = 17,
  GITERR_TAG = 13,
  GITERR_THREAD = 18,
  GITERR_TREE = 14,
  GITERR_ZLIB = 5
}

export class Error {
  public static CODE: typeof ErrorCODE;
  public static ERROR: typeof ErrorERROR;
  
  public klass: number
  public message: string
  
}

declare enum FetchPRUNE {
  GIT_FETCH_NO_PRUNE = 2,
  GIT_FETCH_PRUNE = 1,
  GIT_FETCH_PRUNE_UNSPECIFIED = 0
}

export class Fetch {
  public static PRUNE: typeof FetchPRUNE;
  /**
   * [EXPERIMENTAL] 
   * @param opts the `git_push_options` instance to initialize.
   * @param version the version of the struct; you should pass
   *             `GIT_FETCH_OPTIONS_VERSION` here.
   * @return  Zero on success; -1 on failure.
   */
  public static initOptions(opts: FetchOptions, version: number): number;
  
  
}

export class FetchOptions {
  
  
  public callbacks: RemoteCallbacks
  public downloadTags: number
  public prune: number
  public updateFetchhead: number
  public version: number
  
}

declare enum FilterFLAG {
  ALLOW_UNSAFE = 1,
  DEFAULT = 0
}

declare enum FilterMODE {
  CLEAN = 1,
  SMUDGE = 0,
  TO_ODB = 1,
  TO_WORKTREE = 0
}

export class Filter {
  public static FLAG: typeof FilterFLAG;
  public static MODE: typeof FilterMODE;
  /**
   * [EXPERIMENTAL] 
   * @param filters A loaded git_filter_list (or NULL)
   * @param name The name of the filter to query
   * @return  1 if the filter is in the list, 0 otherwise
   */
  public static listContains(filters: FilterList, name: string): number;
  /**
   * [EXPERIMENTAL] 
   * @param fl A filter list
   * @return  The number of filters in the list
   */
  public static listLength(fl: FilterList): number;
  /**
   * [EXPERIMENTAL] 
   * @param repo 
   * @param mode 
   * @param options 
   */
  public static listNew(repo: Repository, mode: number, options: number): Promise<FilterList>;
  /**
   * [EXPERIMENTAL] 
   * @param filters the list of filters to apply
   * @param blob the blob to filter
   * @param target the stream into which the data will be written
   */
  public static listStreamBlob(filters: FilterList, blob: GitBlob, target: Writestream): number;
  /**
   * [EXPERIMENTAL] 
   * @param filters the list of filters to apply
   * @param data the buffer to filter
   * @param target the stream into which the data will be written
   */
  public static listStreamData(filters: FilterList, data: Buf, target: Writestream): number;
  /**
   * [EXPERIMENTAL] 
   * @param filters the list of filters to apply
   * @param repo the repository in which to perform the filtering
   * @param path the path of the file to filter, a relative path will be
   *      taken as relative to the workdir
   * @param target the stream into which the data will be written
   */
  public static listStreamFile(filters: FilterList, repo: Repository, path: string, target: Writestream): number;
  /**
   * [EXPERIMENTAL] 
   * @param name The name under which the filter was registered
   * @return  0 on success, error code 
   *     <
   *     0 on failure
   */
  public static unregister(name: string): number;
  public attributes: string
  public stream: Function
  public version: number
  /**
   * [EXPERIMENTAL] 
   * @param name The name of the filter
   */
  public lookup(name: string): Filter;
  /**
   * [EXPERIMENTAL] 
   * @param name A name by which the filter can be referenced.  Attempting
   *      			to register with an in-use name will return GIT_EEXISTS.
   * @param priority The priority for filter application
   * @return  0 on successful registry, error code 
   *     <
   *     0 on failure
   */
  public register(name: string, priority: number): number;
}

export class FilterList {
  
  
  
  
}

export class Giterr {
  
  /**
   * [EXPERIMENTAL] 
   */
  public static errClear(): void;
  /**
   * [EXPERIMENTAL] 
   * @param cpy 
   */
  public static errDetach(cpy: Error): number;
  /**
   * [EXPERIMENTAL] 
   * @return  A git_error object.
   */
  public static errLast(): Error;
  /**
   * [EXPERIMENTAL] 
   */
  public static errSetOom(): void;
  /**
   * [EXPERIMENTAL] 
   * @param error_class One of the `git_error_t` enum above describing the
   *                         general subsystem that is responsible for the error.
   * @param string The formatted error message to keep
   */
  public static errSetString(error_class: number, string: string): void;
  
  
}

export class Graph {
  
  /**
   * @param repo the repository where the commits exist
   * @param local the commit for local
   * @param upstream the commit for upstream
   * @return number of unique from commits in `local`
   */
  public static aheadBehind(repo: Repository, local: Oid, upstream: Oid): Promise<number>;
  /**
   * @param repo 
   * @param commit a previously loaded commit.
   * @param ancestor a potential ancestor commit.
   * @return  1 if the given commit is a descendant of the potential ancestor,
   *      0 if not, error code otherwise.
   */
  public static descendantOf(repo: Repository, commit: Oid, ancestor: Oid): Promise<number>;
  
  
}

declare enum HashsigOPTION {
  ALLOW_SMALL_FILES = 4,
  IGNORE_WHITESPACE = 1,
  NORMAL = 0,
  SMART_WHITESPACE = 2
}

export class Hashsig {
  public static OPTION: typeof HashsigOPTION;
  /**
   * [EXPERIMENTAL] 
   * @param buf The input buffer.
   * @param buflen The input buffer size.
   * @param opts The signature computation options (see above).
   * @return The computed similarity signature.
   */
  public static create(buf: string, buflen: number, opts: number): Promise<Hashsig>;
  /**
   * [EXPERIMENTAL] 
   * @param path The path to the input file.
   * @param opts The signature computation options (see above).
   * @return The computed similarity signature.
   */
  public static createFromFile(path: string, opts: number): Promise<Hashsig>;
  
  /**
   * [EXPERIMENTAL] 
   * @param b The second similarity signature to compare.
   * @return  [0 to 100] on success as the similarity score, or error code.
   */
  public compare(b: Hashsig): number;
  /**
   * [EXPERIMENTAL] 
   */
  public free(): void;
}

export class Ignore {
  
  /**
   * @param repo The repository to add ignore rules to.
   * @param rules Text of rules, a la the contents of a .gitignore file.
   *                   It is okay to have multiple rules in the text; if so,
   *                   each rule should be terminated with a newline.
   * @return  0 on success
   */
  public static addRule(repo: Repository, rules: string): number;
  /**
   * @param repo The repository to remove ignore rules from.
   * @return  0 on success
   */
  public static clearInternalRules(repo: Repository): number;
  /**
   * @param repo a repository object
   * @param path the file to check ignores for, relative to the repo's workdir.
   * @return boolean returning 0 if the file is not ignored, 1 if it is
   */
  public static pathIsIgnored(repo: Repository, path: string): number;
  
  
}

declare enum IndexADD_OPTION {
  ADD_CHECK_PATHSPEC = 4,
  ADD_DEFAULT = 0,
  ADD_DISABLE_PATHSPEC_MATCH = 2,
  ADD_FORCE = 1
}

declare enum IndexCAP {
  FROM_OWNER = -1,
  IGNORE_CASE = 1,
  NO_FILEMODE = 2,
  NO_SYMLINKS = 4
}

export class Index {
  public static ADD_OPTION: typeof IndexADD_OPTION;
  public static CAP: typeof IndexCAP;
  /**
   * @param entry The entry
   * @return  1 if the entry is a conflict entry, 0 otherwise
   */
  public static entryIsConflict(entry: IndexEntry): number;
  /**
   * @param entry The entry
   * @return  the stage number
   */
  public static entryStage(entry: IndexEntry): number;
  /**
   * @param index_path the path to the index file in disk
   */
  public static open(index_path: string): Promise<Index>;
  
  /**
   * @param source_entry new entry object
   * @return  0 or an error code
   */
  public add(source_entry: IndexEntry): number;
  /**
   * @param pathspec array of path patterns
   * @param flags combination of git_index_add_option_t flags
   * @param callback notification callback for each added/updated path (also
   *                      gets index of matching pathspec entry); can be NULL;
   *                      return 0 to add, >0 to skip, 
   *     <
   *     0 to abort scan.
   * @param payload payload passed through to callback function
   * @return  0 on success, negative callback return value, or error code
   */
  public addAll(pathspec?: Strarray, flags?: number, callback?: Function, payload?: void): Promise<number>;
  /**
   * @param path filename to add
   * @return  0 or an error code
   */
  public addByPath(path: string): number;
  /**
   * @return  A combination of GIT_INDEXCAP values
   */
  public caps(): number;
  /**
   * @return  the checksum of the index
   */
  public checksum(): Oid;
  /**
   * @return  0 on success, error code 
   *     <
   *      0 on failure
   */
  public clear(): number;
  /**
   * @param ancestor_entry the entry data for the ancestor of the conflict
   * @param our_entry the entry data for our side of the merge conflict
   * @param their_entry the entry data for their side of the merge conflict
   * @return  0 or an error code
   */
  public conflictAdd(ancestor_entry: IndexEntry, our_entry: IndexEntry, their_entry: IndexEntry): number;
  /**
   * @return  0 or an error code
   */
  public conflictCleanup(): number;
  /**
   * @param path path to search
   */
  public conflictGet(path: string): Promise<IndexEntry>;
  /**
   * @param path path to remove conflicts for
   * @return  0 or an error code
   */
  public conflictRemove(path: string): number;
  /**
   * Return an array of the entries in this index.
   * @return an array of IndexEntrys
   */
  public entries(): Array<IndexEntry>;
  /**
   * @return  integer of count of current entries
   */
  public entryCount(): number;
  /**
   * @param n the position of the entry
   * @return  the entry; NULL if out of bounds
   */
  public getByIndex(n: number): IndexEntry;
  /**
   * @param path path to search
   * @param stage stage to search
   * @return  the entry; NULL if it was not found
   */
  public getByPath(path: string, stage?: number): IndexEntry;
  /**
   * @return  1 if at least one conflict is found, 0 otherwise.
   */
  public hasConflicts(): number;
  /**
   * @return  the repository
   */
  public owner(): Repository;
  /**
   * @return  path to index file or NULL for in-memory index
   */
  public path(): string;
  /**
   * @param force if true, always reload, vs. only read if file has changed
   * @return  0 or an error code
   */
  public read(force?: number): number;
  /**
   * @param tree tree to read
   * @return  0 or an error code
   */
  public readTree(tree: Tree): number;
  /**
   * @param path path to search
   * @param stage stage to search
   * @return  0 or an error code
   */
  public remove(path: string, stage: number): number;
  /**
   * @param pathspec array of path patterns
   * @param callback notification callback for each removed path (also
   *                      gets index of matching pathspec entry); can be NULL;
   *                      return 0 to add, >0 to skip, 
   *     <
   *     0 to abort scan.
   * @param payload payload passed through to callback function
   * @return  0 on success, negative callback return value, or error code
   */
  public removeAll(pathspec?: Strarray, callback?: Function, payload?: void): Promise<number>;
  /**
   * @param path filename to remove
   * @return  0 or an error code
   */
  public removeByPath(path: string): number;
  /**
   * @param dir container directory path
   * @param stage stage to search
   * @return  0 or an error code
   */
  public removeDirectory(dir: string, stage: number): number;
  /**
   * @param caps A combination of GIT_INDEXCAP values
   * @return  0 on success, -1 on failure
   */
  public setCaps(caps: number): number;
  /**
   * @param pathspec array of path patterns
   * @param callback notification callback for each updated path (also
   *                      gets index of matching pathspec entry); can be NULL;
   *                      return 0 to add, >0 to skip, 
   *     <
   *     0 to abort scan.
   * @param payload payload passed through to callback function
   * @return  0 on success, negative callback return value, or error code
   */
  public updateAll(pathspec?: Strarray, callback?: Function, payload?: void): Promise<number>;
  /**
   * @return  0 or an error code
   */
  public write(): number;
  /**
   * @return the OID of the written tree
   */
  public writeTree(): Promise<Oid>;
  /**
   * @param repo Repository where to write the tree
   * @return OID of the the written tree
   */
  public writeTreeTo(repo: Repository): Promise<Oid>;
}

export class IndexConflictIterator {
  
  
  
  
}

export class IndexEntry {
  
  
  public ctime: IndexTime
  public dev: number
  public fileSize: number
  public flags: number
  public flagsExtended: number
  public gid: number
  public id: Oid
  public ino: number
  public mode: number
  public mtime: IndexTime
  public path: string
  public uid: number
  
}

export class IndexTime {
  
  
  public nanoseconds: number
  public seconds: number
  
}

export class Indexer {
  
  
  
  /**
   * [EXPERIMENTAL] 
   * @param stats 
   */
  public commit(stats: TransferProgress): number;
  /**
   * [EXPERIMENTAL] 
   */
  public free(): void;
  /**
   * [EXPERIMENTAL] 
   */
  public hash(): Oid;
}

declare enum Libgit2OPT {
  ENABLE_CACHING = 8,
  GET_CACHED_MEMORY = 9,
  GET_MWINDOW_MAPPED_LIMIT = 2,
  GET_MWINDOW_SIZE = 0,
  GET_SEARCH_PATH = 4,
  GET_TEMPLATE_PATH = 10,
  SET_CACHE_MAX_SIZE = 7,
  SET_CACHE_OBJECT_LIMIT = 6,
  SET_MWINDOW_MAPPED_LIMIT = 3,
  SET_MWINDOW_SIZE = 1,
  SET_SEARCH_PATH = 5,
  SET_SSL_CERT_LOCATIONS = 12,
  SET_TEMPLATE_PATH = 11
}

export class Libgit2 {
  public static OPT: typeof Libgit2OPT;
  /**
   * [EXPERIMENTAL] 
   * @return  A combination of GIT_FEATURE_* values.
   */
  public static features(): number;
  /**
   * [EXPERIMENTAL] 
   * @return  the number of initializations of the library, or an error code.
   */
  public static init(): number;
  /**
   * [EXPERIMENTAL] 
   * @param option Option key
   * @return  0 on success, 
   *     <
   *     0 on failure
   */
  public static opts(option: number): number;
  /**
   * [EXPERIMENTAL] 
   * @return  the number of remaining initializations of the library, or an
   *      error code.
   */
  public static shutdown(): number;
  /**
   * [EXPERIMENTAL] 
   * @param major Store the major version number
   * @param minor Store the minor version number
   * @param rev Store the revision (patch) number
   */
  public static version(major: number, minor: number, rev: number): void;
  
  
}

export class Mempack {
  
  
  
  
}

declare enum MergeANALYSIS {
  FASTFORWARD = 4,
  NONE = 0,
  NORMAL = 1,
  UNBORN = 8,
  UP_TO_DATE = 2
}

declare enum MergeFILE_FAVOR {
  NORMAL = 0,
  OURS = 1,
  THEIRS = 2,
  UNION = 3
}

declare enum MergeFILE_FLAGS {
  FILE_DEFAULT = 0,
  FILE_DIFF_MINIMAL = 128,
  FILE_DIFF_PATIENCE = 64,
  FILE_IGNORE_WHITESPACE = 8,
  FILE_IGNORE_WHITESPACE_CHANGE = 16,
  FILE_IGNORE_WHITESPACE_EOL = 32,
  FILE_SIMPLIFY_ALNUM = 4,
  FILE_STYLE_DIFF3 = 2,
  FILE_STYLE_MERGE = 1
}

declare enum MergePREFERENCE {
  FASTFORWARD_ONLY = 2,
  NONE = 0,
  NO_FASTFORWARD = 1
}

declare enum MergeTREE_FLAG {
  TREE_FIND_RENAMES = 1
}

export class Merge {
  public static ANALYSIS: typeof MergeANALYSIS;
  public static FILE_FAVOR: typeof MergeFILE_FAVOR;
  public static FILE_FLAGS: typeof MergeFILE_FLAGS;
  public static PREFERENCE: typeof MergePREFERENCE;
  public static TREE_FLAG: typeof MergeTREE_FLAG;
  /**
   * @param repo the repository where the commits exist
   * @param one one of the commits
   * @param two the other commit
   * @return the OID of a merge base between 'one' and 'two'
   */
  public static base(repo: Repository, one: Oid, two: Oid): Promise<Oid>;
  /**
   * @param repo the repository where the commits exist
   * @param one one of the commits
   * @param two the other commit
   * @return array in which to store the resulting ids
   */
  public static bases(repo: Repository, one: Oid, two: Oid): Promise<Oidarray>;
  /**
   * Merge 2 commits together and create an new index that can
   * be used to create a merge commit.
   * @param repo Repository that contains the given commits
   * @param ourCommit The commit that reflects the destination tree
   * @param theirCommit The commit to merge into ourCommit
   * @param options The merge tree options (null for default)
   */
  public static commits(repo: Repository, ourCommit: Commit, theirCommit: Commit, options?: MergeOptions): void;
  /**
   * @param opts the `git_merge_file_input` instance to initialize.
   * @param version the version of the struct; you should pass
   *             `GIT_MERGE_FILE_INPUT_VERSION` here.
   * @return  Zero on success; -1 on failure.
   */
  public static fileInitInput(opts: MergeFileInput, version: number): number;
  /**
   * @param opts the `git_merge_options` instance to initialize.
   * @param version the version of the struct; you should pass
   *             `GIT_MERGE_OPTIONS_VERSION` here.
   * @return  Zero on success; -1 on failure.
   */
  public static initOptions(opts: MergeOptions, version: number): number;
  /**
   * Merge a commit into HEAD and writes the results to the working directory.
   * @param repo Repository that contains the given commits
   * @param theirHead The annotated to merge into HEAD
   * @param mergeOpts The merge tree options (null for default)
   * @param checkoutOpts The checkout options                                         (null for default)
   */
  public static merge(repo: Repository, theirHead: Commit, mergeOpts?: MergeOptions, checkoutOpts?: CheckoutOptions): void;
  /**
   * @param repo repository that contains the given trees
   * @param ancestor_tree the common ancestor between the trees (or null if none)
   * @param our_tree the tree that reflects the destination tree
   * @param their_tree the tree to merge in to `our_tree`
   * @param opts the merge tree options (or null for defaults)
   */
  public static trees(repo: Repository, ancestor_tree: Tree, our_tree: Tree, their_tree: Tree, opts: MergeOptions): Promise<Index>;
  
  
}

export class MergeFileInput {
  
  
  public mode: number
  public path: string
  public ptr: string
  public size: number
  public version: number
  
}

export class MergeFileOptions {
  
  
  public ancestorLabel: string
  public favor: number
  public flags: number
  public ourLabel: string
  public theirLabel: string
  public version: number
  
}

export class MergeFileResult {
  
  
  public automergeable: number
  public len: number
  public mode: number
  public path: string
  public ptr: string
  
}

export class MergeOptions {
  
  
  public fileFavor: number
  public fileFlags: number
  public renameThreshold: number
  public targetLimit: number
  public treeFlags: number
  public version: number
  
}

export class MergeResult {
  
  
  
  
}

export class Message {
  
  
  
  
}

export class Note {
  
  /**
   * @param repo repository where to store the note
   * @param notes_ref canonical name of the reference to use (optional);
   *     					defaults to "refs/notes/commits"
   * @param author signature of the notes commit author
   * @param committer signature of the notes commit committer
   * @param oid OID of the git object to decorate
   * @param note Content of the note to add for object oid
   * @param force Overwrite existing note
   */
  public static create(repo: Repository, notes_ref: string, author: Signature, committer: Signature, oid: Oid, note: string, force: number): Promise<Oid>;
  /**
   * @param repo Repository where to find the notes.
   * @param notes_ref Reference to read from (optional); defaults to
   *             "refs/notes/commits".
   * @param note_cb Callback to invoke per found annotation.  Return non-zero
   *             to stop looping.
   * @param payload Extra parameter to callback function.
   * @return  0 on success, non-zero callback return value, or error code
   */
  public static foreach(repo: Repository, notes_ref: string, note_cb: Function, payload?: void): Promise<number>;
  /**
   * @param repo repository where to look up the note
   * @param notes_ref canonical name of the reference to use (optional); defaults to
   *                       "refs/notes/commits"
   */
  public static iteratorNew(repo: Repository, notes_ref: string): Promise<NoteIterator>;
  /**
   * @param note_id id of blob containing the message
   * @param annotated_id id of the git object being annotated
   * @param it pointer to the iterator
   * @return  0 (no error), GIT_ITEROVER (iteration is done) or an error code
   *              (negative value)
   */
  public static next(note_id: Oid, annotated_id: Oid, it: NoteIterator): number;
  /**
   * @param repo repository where to look up the note
   * @param notes_ref canonical name of the reference to use (optional); defaults to
   *                       "refs/notes/commits"
   * @param oid OID of the git object to read the note from
   */
  public static read(repo: Repository, notes_ref: string, oid: Oid): Promise<Note>;
  /**
   * @param repo repository where the note lives
   * @param notes_ref canonical name of the reference to use (optional);
   *     					defaults to "refs/notes/commits"
   * @param author signature of the notes commit author
   * @param committer signature of the notes commit committer
   * @param oid OID of the git object to remove the note from
   * @return  0 or an error code
   */
  public static remove(repo: Repository, notes_ref: string, author: Signature, committer: Signature, oid: Oid): Promise<number>;
  
  /**
   * @return  the author
   */
  public author(): Signature;
  /**
   * @return  the committer
   */
  public committer(): Signature;
  /**
  
   */
  public free(): void;
  /**
   * @return  the note object's id
   */
  public id(): Oid;
  /**
   * @return  the note message
   */
  public message(): string;
}

export class NoteIterator {
  
  
  
  
}

declare enum GitObjectTYPE {
  ANY = -2,
  BAD = -1,
  BLOB = 3,
  COMMIT = 1,
  EXT1 = 0,
  EXT2 = 5,
  OFS_DELTA = 6,
  REF_DELTA = 7,
  TAG = 4,
  TREE = 2
}

declare class GitObject {
  public static TYPE: typeof GitObjectTYPE;
  /**
   * [EXPERIMENTAL] 
   * @param repo the repository to look up the object
   * @param id the unique identifier for the object
   * @param type the type of the object
   */
  public static lookup(repo: Repository, id: Oid, type: number): Promise<GitObject>;
  /**
   * [EXPERIMENTAL] 
   * @param repo the repository to look up the object
   * @param id a short identifier for the object
   * @param len the length of the short identifier
   * @param type the type of the object
   * @return the looked-up object
   */
  public static lookupPrefix(repo: Repository, id: Oid, len: number, type: number): Promise<GitObject>;
  /**
   * [EXPERIMENTAL] 
   * @param type object type to get its size
   * @return  size in bytes of the object
   */
  public static size(type: number): number;
  /**
   * [EXPERIMENTAL] 
   * @param str the string to convert.
   * @return  the corresponding git_otype.
   */
  public static string2type(str: string): number;
  /**
   * [EXPERIMENTAL] 
   * @param type object type to convert.
   * @return  the corresponding string representation.
   */
  public static type2string(type: number): string;
  /**
   * [EXPERIMENTAL] 
   * @param type object type to test.
   * @return  true if the type represents a valid loose object type,
   *      false otherwise.
   */
  public static typeisloose(type: number): number;
  
  /**
   * [EXPERIMENTAL] 
   */
  public dup(): Promise<GitObject>;
  /**
   * [EXPERIMENTAL] 
   */
  public free(): void;
  /**
   * [EXPERIMENTAL] 
   * @return  the SHA1 id
   */
  public id(): Oid;
  /**
   * [EXPERIMENTAL] 
   * @param path relative path from the root object to the desired object
   * @param type type of object desired
   * @return buffer that receives the object (which must be freed
   *                 by the caller)
   */
  public lookupByPath(path: string, type: number): Promise<GitObject>;
  /**
   * [EXPERIMENTAL] 
   * @return  the repository who owns this object
   */
  public owner(): Repository;
  /**
   * [EXPERIMENTAL] 
   * @param target_type The type of the requested object (a GIT_OBJ_ value)
   */
  public peel(target_type: number): Promise<GitObject>;
  /**
   * [EXPERIMENTAL] 
   * @return Buffer to write string into
   */
  public shortId(): Promise<Buf>;
  /**
   * [EXPERIMENTAL] 
   * @return  the object's type
   */
  public type(): number;
}

declare enum OdbSTREAM {
  RDONLY = 2,
  RW = 6,
  WRONLY = 4
}

export class Odb {
  public static STREAM: typeof OdbSTREAM;
  /**
   * @param objects_dir path of the backends' "objects" directory.
   */
  public static open(objects_dir: string): Promise<Odb>;
  
  /**
   * @param path path to the objects folder for the alternate
   * @return  0 on success; error code otherwise
   */
  public addDiskAlternate(path: string): number;
  /**
  
   */
  public free(): void;
  /**
   * @param id identity of the object to read.
   * @return the read object
   */
  public read(id: Oid): Promise<OdbObject>;
  /**
   * @param data buffer with the data to store
   * @param len size of the buffer
   * @param type type of the data to store
   */
  public write(data: Buffer, len: number, type: number): Promise<Oid>;
}

export class OdbObject {
  
  
  
  /**
   * [EXPERIMENTAL] 
   * @return  the data
   */
  public data(): Buffer;
  /**
   * [EXPERIMENTAL] 
   * @return the copy
   */
  public dup(): Promise<OdbObject>;
  /**
   * [EXPERIMENTAL] 
   */
  public free(): void;
  /**
   * [EXPERIMENTAL] 
   * @return  the OID
   */
  public id(): Oid;
  /**
   * [EXPERIMENTAL] 
   * @return  the size
   */
  public size(): number;
  /**
   * [EXPERIMENTAL] 
   * @return  the type
   */
  public type(): number;
}

export class Oid {
  
  /**
   * @param str input hex string; must be pointing at the start of
   *     		the hex sequence and have at least the number of bytes
   *     		needed for an oid encoded in hex (40 bytes).
   * @return oid structure the result is written into.
   */
  public static fromString(str: string): Oid;
  
  /**
   * @param b second oid structure.
   * @return  
   *     <
   *     0, 0, >0 if a 
   *     <
   *      b, a == b, a > b.
   */
  public cmp(b: Oid): number;
  /**
   * @return oid structure the result is written into.
   */
  public cpy(): Oid;
  /**
   * @param b second oid structure.
   * @return  true if equal, false otherwise
   */
  public equal(b: Oid): number;
  /**
   * @return  1 if all zeros, 0 otherwise.
   */
  public iszero(): number;
  /**
   * @param b second oid structure.
   * @param len the number of hex chars to compare
   * @return  0 in case of a match
   */
  public ncmp(b: Oid, len: number): number;
  /**
   * @param str input hex string of an object id.
   * @return  -1 if str is not valid, 
   *     <
   *     0 if id sorts before str,
   *              0 if id matches str, >0 if id sorts after str.
   */
  public strcmp(str: string): number;
  /**
   * @param str input hex string of an object id.
   * @return  0 in case of a match, -1 otherwise.
   */
  public streq(str: string): number;
  /**
   * @return  the c-string
   */
  public tostrS(): string;
}

export class OidShorten {
  
  
  
  
}

export class Oidarray {
  
  
  public count: number
  public ids: Oid
  /**
   * [EXPERIMENTAL] 
   */
  public free(): void;
}

export class Openssl {
  
  /**
   * [EXPERIMENTAL] 
   * @return  0 on success, -1 if there are errors or if libgit2 was not
   *      built with OpenSSL and threading support.
   */
  public static setLocking(): number;
  
  
}

declare enum PackbuilderSTAGE {
  ADDING_OBJECTS = 0,
  DELTAFICATION = 1
}

export class Packbuilder {
  public static STAGE: typeof PackbuilderSTAGE;
  /**
   * @param repo The repository
   * @return The new packbuilder object
   */
  public static create(repo: Repository): Packbuilder;
  
  /**
  
   */
  public free(): void;
  /**
  
   */
  public hash(): Oid;
  /**
   * @param id The oid of the commit
   * @param name The name; might be NULL
   * @return  0 or an error code
   */
  public insert(id: Oid, name: string): number;
  /**
   * @param id The oid of the commit
   * @return  0 or an error code
   */
  public insertCommit(id: Oid): number;
  /**
   * @param id the id of the root object to insert
   * @param name optional name for the object
   * @return  0 or an error code
   */
  public insertRecur(id: Oid, name: string): number;
  /**
   * @param id The oid of the root tree
   * @return  0 or an error code
   */
  public insertTree(id: Oid): number;
  /**
   * @param walk the revwalk to use to fill the packbuilder
   * @return  0 or an error code
   */
  public insertWalk(walk: Revwalk): number;
  /**
   * @return  the number of objects in the packfile
   */
  public objectCount(): number;
  /**
   * @param n Number of threads to spawn
   * @return  number of actual threads to be used
   */
  public setThreads(n: number): number;
  /**
   * @return  the number of objects which have already been written
   */
  public written(): number;
}

export class Patch {
  
  /**
   * @param diff 
   */
  public static convenientFromDiff(diff: Diff): Promise<any>;
  /**
   * @param old_blob Blob for old side of diff, or NULL for empty blob
   * @param old_as_path Treat old blob as if it had this filename; can be NULL
   * @param buffer Raw data for new side of diff, or NULL for empty
   * @param buffer_len Length of raw data for new side of diff
   * @param buffer_as_path Treat buffer as if it had this filename; can be NULL
   * @param opts Options for diff, or NULL for default options
   * @return The generated patch; NULL on error
   */
  public static fromBlobAndBuffer(old_blob: GitBlob, old_as_path: string, buffer: string, buffer_len: number, buffer_as_path: string, opts: DiffOptions): Promise<Patch>;
  /**
   * @param old_blob Blob for old side of diff, or NULL for empty blob
   * @param old_as_path Treat old blob as if it had this filename; can be NULL
   * @param new_blob Blob for new side of diff, or NULL for empty blob
   * @param new_as_path Treat new blob as if it had this filename; can be NULL
   * @param opts Options for diff, or NULL for default options
   * @return The generated patch; NULL on error
   */
  public static fromBlobs(old_blob: GitBlob, old_as_path: string, new_blob: GitBlob, new_as_path: string, opts: DiffOptions): Promise<Patch>;
  /**
   * @param diff Diff list object
   * @param idx Index into diff list
   * @return Output parameter for the delta patch object
   */
  public static fromDiff(diff: Diff, idx: number): Promise<Patch>;
  
  /**
  
   */
  public getDelta(): DiffDelta;
  /**
   * @param hunk_idx Input index of hunk to get information about
   * @return Output count of total lines in this hunk
   */
  public getHunk(hunk_idx: number): Promise<number>;
  /**
   * @param hunk_idx The index of the hunk
   * @param line_of_hunk The index of the line in the hunk
   * @return The git_diff_line data for this line
   */
  public getLineInHunk(hunk_idx: number, line_of_hunk: number): Promise<DiffLine>;
  /**
   * @return Count of deletion lines in output, can be NULL.
   */
  public lineStats(): number;
  /**
  
   */
  public numHunks(): number;
  /**
   * @param hunk_idx Index of the hunk
   * @return  Number of lines in hunk or -1 if invalid hunk index
   */
  public numLinesInHunk(hunk_idx: number): number;
  /**
   * @param include_context Include context lines in size if non-zero
   * @param include_hunk_headers Include hunk header lines if non-zero
   * @param include_file_headers Include file header lines if non-zero
   * @return  The number of bytes of data
   */
  public size(include_context: number, include_hunk_headers: number, include_file_headers: number): number;
}

declare enum PathspecFLAG {
  DEFAULT = 0,
  FAILURES_ONLY = 32,
  FIND_FAILURES = 16,
  IGNORE_CASE = 1,
  NO_GLOB = 4,
  NO_MATCH_ERROR = 8,
  USE_CASE = 2
}

export class Pathspec {
  public static FLAG: typeof PathspecFLAG;
  /**
   * @param pathspec A git_strarray of the paths to match
   * @return Output of the compiled pathspec
   */
  public static create(pathspec: Strarray): Pathspec;
  /**
   * @param m The git_pathspec_match_list object
   * @param pos The index into the list
   * @return  The filename of the match
   */
  public static matchListDiffEntry(m: PathspecMatchList, pos: number): DiffDelta;
  /**
   * @param m The git_pathspec_match_list object
   * @param pos The index into the list
   * @return  The filename of the match
   */
  public static matchListEntry(m: PathspecMatchList, pos: number): string;
  /**
   * @param m The git_pathspec_match_list object
   * @return  Number of items in match list
   */
  public static matchListEntrycount(m: PathspecMatchList): number;
  /**
   * @param m The git_pathspec_match_list object
   * @param pos The index into the failed items
   * @return  The pathspec pattern that didn't match anything
   */
  public static matchListFailedEntry(m: PathspecMatchList, pos: number): string;
  /**
   * @param m The git_pathspec_match_list object
   * @return  Number of items in original pathspec that had no matches
   */
  public static matchListFailedEntrycount(m: PathspecMatchList): number;
  
  /**
  
   */
  public free(): void;
  /**
   * @param diff A generated diff list
   * @param flags Combination of git_pathspec_flag_t options to control match
   * @return Output list of matches; pass NULL to just get return value
   */
  public matchDiff(diff: Diff, flags: number): Promise<PathspecMatchList>;
  /**
   * @param index The index to match against
   * @param flags Combination of git_pathspec_flag_t options to control match
   * @return Output list of matches; pass NULL to just get return value
   */
  public matchIndex(index: Index, flags: number): Promise<PathspecMatchList>;
  /**
   * @param tree The root-level tree to match against
   * @param flags Combination of git_pathspec_flag_t options to control match
   * @return Output list of matches; pass NULL to just get return value
   */
  public matchTree(tree: Tree, flags: number): Promise<PathspecMatchList>;
  /**
   * @param repo The repository in which to match; bare repo is an error
   * @param flags Combination of git_pathspec_flag_t options to control match
   * @return Output list of matches; pass NULL to just get return value
   */
  public matchWorkdir(repo: Repository, flags: number): Promise<PathspecMatchList>;
  /**
   * @param flags Combination of git_pathspec_flag_t options to control match
   * @param path The pathname to attempt to match
   * @return  1 is path matches spec, 0 if it does not
   */
  public matchesPath(flags: number, path: string): number;
}

export class PathspecMatchList {
  
  
  
  
}

export class Push {
  
  /**
   * [EXPERIMENTAL] 
   * @param opts the `git_push_options` instance to initialize.
   * @param version the version of the struct; you should pass
   *             `GIT_PUSH_OPTIONS_VERSION` here.
   * @return  Zero on success; -1 on failure.
   */
  public static initOptions(opts: PushOptions, version: number): number;
  
  
}

export class PushOptions {
  
  
  public callbacks: RemoteCallbacks
  public pbParallelism: number
  public version: number
  
}

export class PushUpdate {
  
  
  public dst: Oid
  public dstRefname: string
  public src: Oid
  public srcRefname: string
  
}

export class Rebase {
  
  /**
   * @param repo The repository to perform the rebase
   * @param branch The terminal commit to rebase, or NULL to rebase the
   *                    current branch
   * @param upstream The commit to begin rebasing from, or NULL to rebase all
   *                      reachable commits
   * @param onto The branch to rebase onto, or NULL to rebase onto the given
   *                  upstream
   * @param opts Options to specify how rebase is performed, or NULL
   */
  public static init(repo: Repository, branch: AnnotatedCommit, upstream?: AnnotatedCommit, onto?: AnnotatedCommit, opts?: RebaseOptions): Promise<Rebase>;
  /**
   * @param opts the `git_rebase_options` instance to initialize.
   * @param version the version of the struct; you should pass
   *             `GIT_REBASE_OPTIONS_VERSION` here.
   * @return  Zero on success; -1 on failure.
   */
  public static initOptions(opts: RebaseOptions, version: number): number;
  /**
   * @param repo The repository that has a rebase in-progress
   * @param opts Options to specify how rebase is performed
   */
  public static open(repo: Repository, opts: RebaseOptions): Promise<Rebase>;
  
  /**
   * @return  Zero on success; GIT_ENOTFOUND if a rebase is not in progress,
   *              -1 on other errors.
   */
  public abort(): number;
  /**
   * @param author The author of the updated commit, or NULL to keep the
   *             author from the original commit
   * @param committer The committer of the rebase
   * @param message_encoding The encoding for the message in the commit,
   *             represented with a standard encoding name.  If message is NULL,
   *             this should also be NULL, and the encoding from the original
   *             commit will be maintained.  If message is specified, this may be
   *             NULL to indicate that "UTF-8" is to be used.
   * @param message The message for this commit, or NULL to use the message
   *             from the original commit.
   */
  public commit(committer: Signature, message_encoding?: string, message?: string): Oid;
  public commit(author: Signature, committer: Signature, message_encoding?: string, message?: string): Oid;
  /**
   * @param signature The identity that is finishing the rebase (optional)
   * @return  Zero on success; -1 on error
   */
  public finish(signature?: Signature): number;
  /**
  
   */
  public next(): Promise<RebaseOperation>;
  /**
   * @param idx The index of the rebase operation to retrieve
   * @return  The rebase operation or NULL if `idx` was out of bounds
   */
  public operationByIndex(idx: number): RebaseOperation;
  /**
   * @return  The index of the rebase operation currently being applied.
   */
  public operationCurrent(): number;
  /**
   * @return  The number of rebase operations in total
   */
  public operationEntrycount(): number;
}

declare enum RebaseOperationREBASE_OPERATION {
  EDIT = 2,
  EXEC = 5,
  FIXUP = 4,
  PICK = 0,
  REWORD = 1,
  SQUASH = 3
}

export class RebaseOperation {
  public static REBASE_OPERATION: typeof RebaseOperationREBASE_OPERATION;
  
  public exec: string
  public id: Oid
  public type: number
  
}

export class RebaseOptions {
  
  
  public checkoutOptions: CheckoutOptions
  public quiet: number
  public rewriteNotesRef: string
  public version: number
  
}

export class Refdb {
  
  /**
   * [EXPERIMENTAL] 
   * @param repo the repository
   */
  public static open(repo: Repository): Promise<Refdb>;
  
  /**
   * [EXPERIMENTAL] 
   */
  public compress(): number;
  /**
   * [EXPERIMENTAL] 
   */
  public free(): void;
}

declare enum ReferenceNORMALIZE {
  REF_FORMAT_ALLOW_ONELEVEL = 1,
  REF_FORMAT_NORMAL = 0,
  REF_FORMAT_REFSPEC_PATTERN = 2,
  REF_FORMAT_REFSPEC_SHORTHAND = 4
}

declare enum ReferenceTYPE {
  INVALID = 0,
  LISTALL = 3,
  OID = 1,
  SYMBOLIC = 2
}

export class Reference {
  public static NORMALIZE: typeof ReferenceNORMALIZE;
  public static TYPE: typeof ReferenceTYPE;
  /**
   * [EXPERIMENTAL] 
   * @param repo Repository where that reference will live
   * @param name The name of the reference
   * @param id The object id pointed to by the reference.
   * @param force Overwrite existing references
   * @param log_message The one line long message to be appended to the reflog
   */
  public static create(repo: Repository, name: string, id: Oid, force: number, log_message: string): Promise<Reference>;
  /**
   * [EXPERIMENTAL] 
   * @param repo Repository where that reference will live
   * @param name The name of the reference
   * @param id The object id pointed to by the reference.
   * @param force Overwrite existing references
   * @param current_id The expected value of the reference at the time of update
   * @param log_message The one line long message to be appended to the reflog
   */
  public static createMatching(repo: Repository, name: string, id: Oid, force: number, current_id: Oid, log_message: string): Promise<Reference>;
  /**
   * Retrieves the reference by it's short name
   * @param repo The repo that the reference lives in
   * @param id The reference to lookup
   * @param callback 
   */
  public static dwim(repo: Repository, id: string | Reference, callback: Function): Promise<Reference>;
  /**
   * [EXPERIMENTAL] 
   * @param repo the repository
   * @param refname the reference's name
   * @return  0 or an error code.
   */
  public static ensureLog(repo: Repository, refname: string): number;
  /**
   * [EXPERIMENTAL] 
   * @param repo the repository
   * @param refname the reference's name
   * @return  0 when no reflog can be found, 1 when it exists;
   *      otherwise an error code.
   */
  public static hasLog(repo: Repository, refname: string): number;
  /**
   * [EXPERIMENTAL] 
   * @param refname name to be checked.
   * @return  1 if the reference name is acceptable; 0 if it isn't
   */
  public static isValidName(refname: string): number;
  /**
   * [EXPERIMENTAL] 
   * @param repo Repository where to find the refs
   */
  public static list(repo: Repository): Promise<Array<any>>;
  /**
   * Retrieves the reference pointed to by the oid
   * @param repo The repo that the reference lives in
   * @param id The reference to lookup
   * @param callback 
   */
  public static lookup(repo: Repository, id: string | Reference, callback: Function): Promise<Reference>;
  /**
   * [EXPERIMENTAL] 
   * @param repo The repository in which to look up the reference
   * @param name The long name for the reference (e.g. HEAD, refs/heads/master, refs/tags/v0.1.0, ...)
   */
  public static nameToId(repo: Repository, name: string): Promise<Oid>;
  /**
   * [EXPERIMENTAL] 
   * @param buffer_out User allocated buffer to store normalized name
   * @param buffer_size Size of buffer_out
   * @param name Reference name to be checked.
   * @param flags Flags to constrain name validation rules - see the
   *                   GIT_REF_FORMAT constants above.
   * @return  0 on success, GIT_EBUFS if buffer is too small, GIT_EINVALIDSPEC
   *      or an error code.
   */
  public static normalizeName(buffer_out: string, buffer_size: number, name: string, flags: number): number;
  /**
   * [EXPERIMENTAL] 
   * @param repo 
   * @param name The reference to remove
   * @return  0 or an error code
   */
  public static remove(repo: Repository, name: string): number;
  /**
   * [EXPERIMENTAL] 
   * @param repo Repository where that reference will live
   * @param name The name of the reference
   * @param target The target of the reference
   * @param force Overwrite existing references
   * @param log_message The one line long message to be appended to the reflog
   */
  public static symbolicCreate(repo: Repository, name: string, target: string, force: number, log_message: string): Promise<Reference>;
  /**
   * [EXPERIMENTAL] 
   * @param repo Repository where that reference will live
   * @param name The name of the reference
   * @param target The target of the reference
   * @param force Overwrite existing references
   * @param current_value The expected value of the reference when updating
   * @param log_message The one line long message to be appended to the reflog
   */
  public static symbolicCreateMatching(repo: Repository, name: string, target: string, force: number, current_value: string, log_message: string): Promise<Reference>;
  
  /**
   * [EXPERIMENTAL] 
   * @param ref2 The second git_reference
   * @return  0 if the same, else a stable but meaningless ordering.
   */
  public cmp(ref2: Reference): number;
  /**
   * [EXPERIMENTAL] 
   * @return  0, GIT_EMODIFIED or an error code
   */
  public delete(): number;
  /**
   * [EXPERIMENTAL] 
   * @return  1 when the reference lives in the refs/heads
   *      namespace; 0 otherwise.
   */
  public isBranch(): number;
  /**
   * Returns true if this reference is not symbolic
   */
  public isConcrete(): Boolean;
  /**
   * Returns if the ref is pointed at by HEAD
   */
  public isHead(): boolean;
  /**
   * [EXPERIMENTAL] 
   * @return  1 when the reference lives in the refs/notes
   *      namespace; 0 otherwise.
   */
  public isNote(): number;
  /**
   * [EXPERIMENTAL] 
   * @return  1 when the reference lives in the refs/remotes
   *      namespace; 0 otherwise.
   */
  public isRemote(): number;
  /**
   * Returns true if this reference is symbolic
   */
  public isSymbolic(): Boolean;
  /**
   * [EXPERIMENTAL] 
   * @return  1 when the reference lives in the refs/tags
   *      namespace; 0 otherwise.
   */
  public isTag(): number;
  /**
   * Returns true if this reference is valid
   */
  public isValid(): Boolean;
  /**
   * [EXPERIMENTAL] 
   * @return  the full name for the ref
   */
  public name(): string;
  /**
   * [EXPERIMENTAL] 
   * @return  the repo
   */
  public owner(): Repository;
  /**
   * [EXPERIMENTAL] 
   * @param type The type of the requested object (GIT_OBJ_COMMIT,
   *      GIT_OBJ_TAG, GIT_OBJ_TREE, GIT_OBJ_BLOB or GIT_OBJ_ANY).
   */
  public peel(type: number): Promise<GitObject>;
  /**
   * [EXPERIMENTAL] 
   * @param new_name The new name for the reference
   * @param force Overwrite an existing reference
   * @param log_message The one line long message to be appended to the reflog
   */
  public rename(new_name: string, force: number, log_message: string): Promise<Reference>;
  /**
   * [EXPERIMENTAL] 
   */
  public resolve(): Promise<Reference>;
  /**
   * [EXPERIMENTAL] 
   * @param id The new target OID for the reference
   * @param log_message The one line long message to be appended to the reflog
   */
  public setTarget(id: Oid, log_message: string): Promise<Reference>;
  /**
   * [EXPERIMENTAL] 
   * @return  the human-readable version of the name
   */
  public shorthand(): string;
  /**
   * [EXPERIMENTAL] 
   * @param target The new target for the reference
   * @param log_message The one line long message to be appended to the reflog
   */
  public symbolicSetTarget(target: string, log_message?: string): Promise<Reference>;
  /**
   * [EXPERIMENTAL] 
   * @return  the name if available, NULL otherwise
   */
  public symbolicTarget(): string;
  /**
   * [EXPERIMENTAL] 
   * @return  the oid if available, NULL otherwise
   */
  public target(): Oid;
  /**
   * [EXPERIMENTAL] 
   * @return  the oid if available, NULL otherwise
   */
  public targetPeel(): Oid;
  /**
   * Returns the name of the reference.
   */
  public toString(): string;
  /**
   * [EXPERIMENTAL] 
   * @return  the type
   */
  public type(): number;
}

export class Reflog {
  
  /**
   * [EXPERIMENTAL] 
   * @param repo the repository
   * @param name the reflog to delete
   * @return  0 or an error code
   */
  public static delete(repo: Repository, name: string): number;
  /**
   * [EXPERIMENTAL] 
   * @param entry a reflog entry
   * @return  the committer
   */
  public static entryCommitter(entry: ReflogEntry): Signature;
  /**
   * [EXPERIMENTAL] 
   * @param entry a reflog entry
   * @return  the new oid at this time
   */
  public static entryIdNew(entry: ReflogEntry): Oid;
  /**
   * [EXPERIMENTAL] 
   * @param entry a reflog entry
   * @return  the old oid
   */
  public static entryIdOld(entry: ReflogEntry): Oid;
  /**
   * [EXPERIMENTAL] 
   * @param entry a reflog entry
   * @return  the log msg
   */
  public static entryMessage(entry: ReflogEntry): string;
  /**
   * [EXPERIMENTAL] 
   * @param repo the repostiory
   * @param name reference to look up
   */
  public static read(repo: Repository, name: string): Promise<Reflog>;
  /**
   * [EXPERIMENTAL] 
   * @param repo the repository
   * @param old_name the old name of the reference
   * @param name the new name of the reference
   * @return  0 on success, GIT_EINVALIDSPEC or an error code
   */
  public static rename(repo: Repository, old_name: string, name: string): number;
  
  /**
   * [EXPERIMENTAL] 
   * @param id the OID the reference is now pointing to
   * @param committer the signature of the committer
   * @param msg the reflog message
   * @return  0 or an error code
   */
  public append(id: Oid, committer: Signature, msg: string): number;
  /**
   * [EXPERIMENTAL] 
   * @param idx the position of the entry to remove. Should be greater than or
   *      equal to 0 (zero) and less than `git_reflog_entrycount()`.
   * @param rewrite_previous_entry 1 to rewrite the history; 0 otherwise.
   * @return  0 on success, GIT_ENOTFOUND if the entry doesn't exist
   *      or an error code.
   */
  public drop(idx: number, rewrite_previous_entry: number): number;
  /**
   * [EXPERIMENTAL] 
   * @param idx the position of the entry to lookup. Should be greater than or
   *      equal to 0 (zero) and less than `git_reflog_entrycount()`.
   * @return  the entry; NULL if not found
   */
  public entryByIndex(idx: number): ReflogEntry;
  /**
   * [EXPERIMENTAL] 
   * @return  the number of log entries
   */
  public entrycount(): number;
  /**
   * [EXPERIMENTAL] 
   */
  public free(): void;
  /**
   * [EXPERIMENTAL] 
   * @return  0 or an error code
   */
  public write(): number;
}

export class ReflogEntry {
  
  
  
  
}

export class Refspec {
  
  
  
  /**
   * [EXPERIMENTAL] 
   * @return  GIT_DIRECTION_FETCH or GIT_DIRECTION_PUSH
   */
  public direction(): number;
  /**
   * [EXPERIMENTAL] 
   * @return  the refspec's destination specifier
   */
  public dst(): string;
  /**
   * [EXPERIMENTAL] 
   * @param refname the name of the reference to check
   * @return  1 if the refspec matches, 0 otherwise
   */
  public dstMatches(refname: string): number;
  /**
   * [EXPERIMENTAL] 
   * @return  1 if force update has been set, 0 otherwise
   */
  public force(): number;
  /**
   * [EXPERIMENTAL] 
   * @return  the refspec's source specifier
   */
  public src(): string;
  /**
   * [EXPERIMENTAL] 
   * @param refname the name of the reference to check
   * @return  1 if the refspec matches, 0 otherwise
   */
  public srcMatches(refname: string): number;
}

declare enum RemoteAUTOTAG_OPTION {
  DOWNLOAD_TAGS_ALL = 3,
  DOWNLOAD_TAGS_AUTO = 1,
  DOWNLOAD_TAGS_NONE = 2,
  DOWNLOAD_TAGS_UNSPECIFIED = 0
}

declare enum RemoteCOMPLETION_TYPE {
  COMPLETION_DOWNLOAD = 0,
  COMPLETION_ERROR = 2,
  COMPLETION_INDEXING = 1
}

export class Remote {
  public static AUTOTAG_OPTION: typeof RemoteAUTOTAG_OPTION;
  public static COMPLETION_TYPE: typeof RemoteCOMPLETION_TYPE;
  /**
   * @param repo the repository in which to change the configuration
   * @param remote the name of the remote to change
   * @param refspec the new fetch refspec
   * @return  0, GIT_EINVALIDSPEC if refspec is invalid or an error value
   */
  public static addFetch(repo: Repository, remote: string, refspec: string): number;
  /**
   * @param repo the repository in which to change the configuration
   * @param remote the name of the remote to change
   * @param refspec the new push refspec
   * @return  0, GIT_EINVALIDSPEC if refspec is invalid or an error value
   */
  public static addPush(repo: Repository, remote: string, refspec: string): number;
  /**
   * @param repo the repository in which to create the remote
   * @param name the remote's name
   * @param url the remote's url
   * @return the resulting remote
   */
  public static create(repo: Repository, name: string, url: string): Remote;
  /**
   * @param repo the associated repository
   * @param url the remote repository's URL
   */
  public static createAnonymous(repo: Repository, url: string): Promise<Remote>;
  /**
   * @param repo the repository in which to create the remote
   * @param name the remote's name
   * @param url the remote's url
   * @param fetch the remote fetch value
   * @return the resulting remote
   */
  public static createWithFetchspec(repo: Repository, name: string, url: string, fetch: string): Promise<Remote>;
  /**
   * @param repo the repository in which to act
   * @param name the name of the remove to delete
   * @return  0 on success, or an error code.
   */
  public static delete(repo: Repository, name: string): Promise<number>;
  /**
   * @param opts the `git_remote_callbacks` struct to initialize
   * @param version Version of struct; pass `GIT_REMOTE_CALLBACKS_VERSION`
   * @return  Zero on success; -1 on failure.
   */
  public static initCallbacks(opts: RemoteCallbacks, version: number): number;
  /**
   * @param remote_name name to be checked.
   * @return  1 if the reference name is acceptable; 0 if it isn't
   */
  public static isValidName(remote_name: string): number;
  /**
   * @param repo the repository to query
   * @return a string array which receives the names of the remotes
   */
  public static list(repo: Repository): Promise<Array<any>>;
  /**
   * Retrieves the remote by name
   * @param repo The repo that the remote lives in
   * @param name The remote to lookup
   * @param callback 
   */
  public static lookup(repo: Repository, name: string | Remote, callback: Function): Promise<Remote>;
  /**
   * @param repo the repository in which to make the change
   * @param remote the name of the remote
   * @param value the new value to take.
   */
  public static setAutotag(repo: Repository, remote: string, value: number): number;
  /**
   * @param repo the repository in which to perform the change
   * @param remote the remote's name
   * @param url the url to set
   */
  public static setPushurl(repo: Repository, remote: string, url: string): number;
  /**
   * @param repo the repository in which to perform the change
   * @param remote the remote's name
   * @param url the url to set
   * @return  0 or an error value
   */
  public static setUrl(repo: Repository, remote: string, url: string): number;
  
  /**
   * @return  the auto-follow setting
   */
  public autotag(): number;
  /**
   * Connects to a remote
   * @param direction The direction for the connection
   * @param callbacks The callback functions for the connection
   * @param callback 
   * @return error code
   */
  public connect(direction: EnumsDIRECTION, callbacks: RemoteCallbacks, callback: Function): Promise<number>;
  /**
   * @return  1 if it's connected, 0 otherwise.
   */
  public connected(): number;
  /**
   * @return the buffern in which to store the reference name
   */
  public defaultBranch(): Promise<Buf>;
  /**
  
   */
  public disconnect(): Promise<void>;
  /**
   * Connects to a remote
   * @param refSpecs The ref specs that should be pushed
   * @param opts The fetch options for download, contains callbacks
   * @param callback 
   * @return error code
   */
  public download(refSpecs: Array<any>, opts: FetchOptions, callback: Function): Promise<number>;
  /**
   * @return the copy
   */
  public dup(): Promise<Remote>;
  /**
   * Connects to a remote
   * @param refSpecs The ref specs that should be pushed
   * @param opts The fetch options for download, contains callbacks
   * @param message The message to use for the update reflog messages
   * @param callback 
   * @return error code
   */
  public fetch(refSpecs: Array<any>, opts: FetchOptions, message: string, callback: Function): Promise<number>;
  /**
  
   */
  public free(): void;
  /**
  
   */
  public getFetchRefspecs(): Promise<Array<any>>;
  /**
  
   */
  public getPushRefspecs(): Promise<Array<any>>;
  /**
   * @param n the refspec to get
   * @return  the nth refspec
   */
  public getRefspec(n: number): Refspec;
  /**
   * @return  the name or NULL for in-memory remotes
   */
  public name(): string;
  /**
   * @return  the repository
   */
  public owner(): Repository;
  /**
   * @param callbacks callbacks to use for this prune
   * @return  0 or an error code
   */
  public prune(callbacks: RemoteCallbacks): number;
  /**
   * @return  the ref-prune setting
   */
  public pruneRefs(): number;
  /**
   * Pushes to a remote
   * @param refSpecs The ref specs that should be pushed
   * @param options Options for the checkout
   * @param callback 
   * @return error code
   */
  public push(refSpecs: Array<any>, options: PushOptions, callback: Function): Promise<number>;
  /**
   * @return  the url or NULL if no special url for pushing is set
   */
  public pushurl(): string;
  /**
   * @return  the amount of refspecs configured in this remote
   */
  public refspecCount(): number;
  /**
  
   */
  public stats(): TransferProgress;
  /**
  
   */
  public stop(): void;
  /**
   * @param callbacks pointer to the callback structure to use
   * @param update_fetchhead whether to write to FETCH_HEAD. Pass 1 to behave like git.
   * @param download_tags what the behaviour for downloading tags is for this fetch. This is
   *      ignored for push. This must be the same value passed to `git_remote_download()`.
   * @param reflog_message The message to insert into the reflogs. If
   *      NULL and fetching, the default is "fetch 
   *     <name
   *     >", where 
   *     <name
   *     > is
   *      the name of the remote (or its url, for in-memory remotes). This
   *      parameter is ignored when pushing.
   * @return  0 or an error code
   */
  public updateTips(callbacks: RemoteCallbacks, update_fetchhead: number, download_tags: number, reflog_message: string): number;
  /**
   * @param refspecs the refspecs to use for this negotiation and
   *      upload. Use NULL or an empty array to use the base refspecs
   * @param opts the options to use for this push
   * @return  0 or an error code
   */
  public upload(refspecs: Strarray, opts: PushOptions): number;
  /**
   * @return  the url
   */
  public url(): string;
}

export class RemoteCallbacks {
  
  
  public certificateCheck: Function
  public credentials: Function
  public payload: void
  public transferProgress: Function
  public transport: Function
  public version: number
  
}

declare enum RepositoryINIT_FLAG {
  BARE = 1,
  EXTERNAL_TEMPLATE = 32,
  MKDIR = 8,
  MKPATH = 16,
  NO_DOTGIT_DIR = 4,
  NO_REINIT = 2,
  RELATIVE_GITLINK = 64
}

declare enum RepositoryINIT_MODE {
  INIT_SHARED_ALL = 1535,
  INIT_SHARED_GROUP = 1533,
  INIT_SHARED_UMASK = 0
}

declare enum RepositoryOPEN_FLAG {
  OPEN_BARE = 4,
  OPEN_CROSS_FS = 2,
  OPEN_NO_SEARCH = 1
}

declare enum RepositorySTATE {
  APPLY_MAILBOX = 8,
  APPLY_MAILBOX_OR_REBASE = 9,
  BISECT = 4,
  CHERRYPICK = 3,
  MERGE = 1,
  NONE = 0,
  REBASE = 5,
  REBASE_INTERACTIVE = 6,
  REBASE_MERGE = 7,
  REVERT = 2
}

export class Repository {
  public static INIT_FLAG: typeof RepositoryINIT_FLAG;
  public static INIT_MODE: typeof RepositoryINIT_MODE;
  public static OPEN_FLAG: typeof RepositoryOPEN_FLAG;
  public static STATE: typeof RepositorySTATE;
  /**
   * @param start_path The base path where the lookup starts.
   * @param across_fs If true, then the lookup will not stop when a
   *      filesystem device change is detected while exploring parent directories.
   * @param ceiling_dirs A GIT_PATH_LIST_SEPARATOR separated list of
   *      absolute symbolic link free paths. The lookup will stop when any
   *      of this paths is reached. Note that the lookup always performs on
   *      start_path no matter start_path appears in ceiling_dirs ceiling_dirs
   *      might be NULL (which is equivalent to an empty string)
   * @return a user-allocated git_buf which will contain
   *      the found path.
   */
  public static discover(start_path: string, across_fs: number, ceiling_dirs: string): Promise<Buf>;
  /**
   * @param path the path to the repository
   * @param is_bare if true, a Git repository without a working directory is
   *     		created at the pointed path. If false, provided path will be
   *     		considered as the working directory into which the .git directory
   *     		will be created.
   */
  public static init(path: string, is_bare: number): Promise<Repository>;
  /**
   * @param repo_path The path to the repository.
   * @param opts Pointer to git_repository_init_options struct.
   */
  public static initExt(repo_path: string, opts: RepositoryInitOptions): Promise<Repository>;
  /**
   * @param path the path to the repository
   */
  public static open(path: string): Promise<Repository>;
  /**
   * @param bare_path Direct path to the bare repository
   */
  public static openBare(bare_path: string): Promise<Repository>;
  /**
   * @param path Path to open as git repository.  If the flags
   *             permit "searching", then this can be a path to a subdirectory
   *             inside the working directory of the repository.
   * @param flags A combination of the GIT_REPOSITORY_OPEN flags above.
   * @param ceiling_dirs A GIT_PATH_LIST_SEPARATOR delimited list of path
   *             prefixes at which the search for a containing repository should
   *             terminate.
   */
  public static openExt(path: string, flags: number, ceiling_dirs: string): Promise<Repository>;
  /**
   * @param odb the object database to wrap
   */
  public static wrapOdb(odb: Odb): Promise<Repository>;
  
  /**
   * This will set the HEAD to point to the local branch and then attempt
   * to update the index and working tree to match the content of the
   * latest commit on that branch
   * @param branch the branch to checkout
   * @param opts the options to use for the checkout
   */
  public checkoutBranch(branch: string | Reference, opts: GitObject | CheckoutOptions): Promise<void>;
  /**
  
   */
  public config(): Promise<Config>;
  /**
  
   */
  public configSnapshot(): Promise<Config>;
  /**
   * Continues an existing rebase
   * @param signature Identity of the one performing the rebase
   * @param beforeNextFn Callback to be called before each step                                   of the rebase. If the callback returns a
   *                                       promise, the rebase will resume when the
   *                                       promise resolves. The rebase object is
   *                                       is passed to the callback.
   * @return A commit id for a succesful merge or an index for a                      rebase with conflicts
   */
  public continueRebase(signature: Signature, beforeNextFn: Function): Oid;
  /**
   * Create a blob from a buffer
   * @param buffer 
   */
  public createBlobFromBuffer(buffer: Buffer): GitBlob;
  /**
   * Creates a branch with the passed in name pointing to the commit
   * @param name Branch name, e.g. "master"
   * @param commit The commit the branch will point to
   * @param force Overwrite branch if it exists
   * @param signature Identity to use to populate reflog
   * @param logMessage One line message to be appended to the reflog
   */
  public createBranch(name: string, commit: Commit | string | Oid, force: boolean, signature: Signature, logMessage: string): Promise<Reference>;
  /**
   * Create a commit
   * @param updateRef 
   * @param author 
   * @param committer 
   * @param message 
   * @param Tree 
   * @param parents 
   * @return The oid of the commit
   */
  public createCommit(updateRef: string, author: Signature, committer: Signature, message: string, Tree: Tree | Oid | string, parents: Array<any>): Promise<Oid>;
  /**
   * Creates a new commit on HEAD from the list of passed in files
   * @param filesToAdd 
   * @param author 
   * @param committer 
   * @param message 
   * @return The oid of the new commit
   */
  public createCommitOnHead(filesToAdd: Array<any>, author: Signature, committer: Signature, message: string): Promise<Oid>;
  /**
   * Creates a new lightweight tag
   * @param String sha or Oid
   * @param name the name of the tag
   */
  public createLightweightTag(String: string | Oid, name: string): Promise<Reference>;
  /**
   * Instantiate a new revision walker for browsing the Repository"s history.
   * See also `Commit.prototype.history()`
   * @param String sha or Oid
   */
  public createRevWalk(String: string | Oid): any;
  /**
   * Creates a new annotated tag
   * @param String sha or Oid
   * @param name the name of the tag
   * @param message the description that will be attached to the annotated tag
   */
  public createTag(String: string | Oid, name: string, message: string): Promise<Tag>;
  /**
   * Gets the default signature for the default user and now timestamp
   */
  public defaultSignature(): Signature;
  /**
   * Deletes a tag from a repository by the tag name.
   * @param Short or full tag name
   */
  public deleteTagByName(Short: string): Promise<void>;
  /**
   * @return  0 on success, GIT_EUNBORNBRANCH when HEAD points to a non existing
   *      branch or an error code
   */
  public detachHead(): number;
  /**
   * Fetches from a remote
   * @param remote 
   * @param fetchOptions Options for the fetch, includes                                           callbacks for fetching
   */
  public fetch(remote: string | Remote, fetchOptions: GitObject | FetchOptions): void;
  /**
   * Fetches from all remotes. This is done in series due to deadlocking issues
   * with fetching from many remotes that can happen.
   * @param fetchOptions Options for the fetch, includes                                           callbacks for fetching
   * @param callback 
   */
  public fetchAll(fetchOptions: GitObject | FetchOptions, callback: Function): void;
  /**
   * @param callback The callback function to be called on each entry
   */
  public fetchheadForeach(callback: Function): Promise<void>;
  /**
  
   */
  public free(): void;
  /**
   * Retrieve the blob represented by the oid.
   * @param String sha or Oid
   */
  public getBlob(String: string | Oid): Promise<GitBlob>;
  /**
   * Look up a branch. Alias for `getReference`
   * @param name Ref name, e.g. "master", "refs/heads/master"                              or Branch Ref
   */
  public getBranch(name: string | Reference): Promise<Reference>;
  /**
   * Look up a branch's most recent commit. Alias to `getReferenceCommit`
   * @param name Ref name, e.g. "master", "refs/heads/master"                          or Branch Ref
   */
  public getBranchCommit(name: string | Reference): Promise<Commit>;
  /**
   * Retrieve the commit identified by oid.
   * @param String sha or Oid
   */
  public getCommit(String: string | Oid): Promise<Commit>;
  /**
   * Gets the branch that HEAD currently points to
   * Is an alias to head()
   */
  public getCurrentBranch(): Promise<Reference>;
  /**
   * Retrieve the commit that HEAD is currently pointing to
   */
  public getHeadCommit(): Promise<Commit>;
  /**
   * Retrieve the master branch commit.
   */
  public getMasterCommit(): Promise<Commit>;
  /**
   * @return  the active namespace, or NULL if there isn't one
   */
  public getNamespace(): string;
  /**
   * Lookup the reference with the given name.
   * @param name Ref name, e.g. "master", "refs/heads/master"                               or Branch Ref
   */
  public getReference(name: string | Reference): Promise<Reference>;
  /**
   * Look up a refs's commit.
   * @param name Ref name, e.g. "master", "refs/heads/master"                              or Branch Ref
   */
  public getReferenceCommit(name: string | Reference): Promise<Commit>;
  /**
   * Lookup reference names for a repository.
   * @param type Type of reference to look up
   */
  public getReferenceNames(type: ReferenceTYPE): Promise<Array<string>>;
  /**
   * Lookup references for a repository.
   * @param type Type of reference to look up
   */
  public getReferences(type: ReferenceTYPE): Promise<Array<Reference>>;
  /**
   * Gets a remote from the repo
   * @param remote 
   * @param callback 
   * @return The remote object
   */
  public getRemote(remote: string | Remote, callback: Function): Remote;
  /**
   * Lists out the remotes in the given repository.
   * @param Optional callback
   * @return Promise object.
   */
  public getRemotes(Optional: Function): GitObject;
  /**
   * Get the status of a repo to it's working directory
   * @param opts 
   */
  public getStatus(opts: any): Promise<Array<any>>;
  /**
   * Get extended statuses of a repo to it's working directory. Status entries
   * have `status`, `headToIndex` delta, and `indexToWorkdir` deltas
   * @param opts 
   */
  public getStatusExt(opts: any): Promise<Array<any>>;
  /**
   * Get the names of the submodules in the repository.
   */
  public getSubmoduleNames(): Promise<Array<string>>;
  /**
   * Retrieve the tag represented by the oid.
   * @param String sha or Oid
   */
  public getTag(String: string | Oid): Promise<Tag>;
  /**
   * Retrieve the tag represented by the tag name.
   * @param Short or full tag name
   */
  public getTagByName(Short: string): Promise<Tag>;
  /**
   * Retrieve the tree represented by the oid.
   * @param String sha or Oid
   */
  public getTree(String: string | Oid): Promise<Tree>;
  /**
  
   */
  public head(): Promise<Reference>;
  /**
   * @return  1 if HEAD is detached, 0 if it's not; error code if there
   *      was an error.
   */
  public headDetached(): number;
  /**
   * @return  1 if the current branch is unborn, 0 if it's not; error
   *      code if there was an error
   */
  public headUnborn(): number;
  /**
  
   */
  public index(): Promise<Index>;
  /**
   * Returns true if the repository is in the APPLY_MAILBOX or
   * APPLY_MAILBOX_OR_REBASE state.
   */
  public isApplyingMailbox(): Boolean;
  /**
   * @return  1 if the repository is bare, 0 otherwise.
   */
  public isBare(): number;
  /**
   * Returns true if the repository is in the BISECT state.
   */
  public isBisecting(): Boolean;
  /**
   * Returns true if the repository is in the CHERRYPICK state.
   */
  public isCherrypicking(): Boolean;
  /**
   * Returns true if the repository is in the default NONE state.
   */
  public isDefaultState(): Boolean;
  /**
   * @return  1 if the repository is empty, 0 if it isn't, error code
   *      if the repository is corrupted
   */
  public isEmpty(): number;
  /**
   * Returns true if the repository is in the MERGE state.
   */
  public isMerging(): Boolean;
  /**
   * Returns true if the repository is in the REBASE, REBASE_INTERACTIVE, or
   * REBASE_MERGE state.
   */
  public isRebasing(): Boolean;
  /**
   * Returns true if the repository is in the REVERT state.
   */
  public isReverting(): Boolean;
  /**
   * @return  1 if shallow, zero if not
   */
  public isShallow(): number;
  /**
   * Merge a branch onto another branch
   * @param to 
   * @param from 
   * @param signature 
   * @param mergePreference 
   * @param mergeOptions 
   * @return A commit id for a succesful merge or an index for a                      merge with conflicts
   */
  public mergeBranches(to: string | Reference, from: string | Reference, signature: Signature, mergePreference: MergePREFERENCE, mergeOptions: MergeOptions): Promise<Oid>;
  /**
  
   */
  public messageRemove(): number;
  /**
  
   */
  public odb(): Promise<Odb>;
  /**
   * @return  the path to the repository
   */
  public path(): string;
  /**
   * Rebases a branch onto another branch
   * @param branch 
   * @param upstream 
   * @param onto 
   * @param signature Identity of the one performing the rebase
   * @param beforeNextFn Callback to be called before each step                                   of the rebase.  If the callback returns a
   *                                       promise, the rebase will resume when the
   *                                       promise resolves.  The rebase object is
   *                                       is passed to the callback.
   * @return A commit id for a succesful merge or an index for a                      rebase with conflicts
   */
  public rebaseBranches(branch: string, upstream: string, onto: string, signature: Signature, beforeNextFn: Function): Oid;
  /**
  
   */
  public refdb(): Promise<Refdb>;
  /**
   * @param refname Canonical name of the reference the HEAD should point at
   * @return  0 on success, or an error code
   */
  public setHead(refname: string): Promise<number>;
  /**
   * @param commitish Object id of the Commit the HEAD should point to
   * @return  0 on success, or an error code
   */
  public setHeadDetached(commitish: Oid): number;
  /**
   * @param commitish 
   */
  public setHeadDetachedFromAnnotated(commitish: AnnotatedCommit): number;
  /**
   * @param name the name to use for the reflog entries
   * @param email the email to use for the reflog entries
   */
  public setIdent(name: string, email: string): number;
  /**
   * @param nmspace The namespace. This should not include the refs
   *     	folder, e.g. to namespace all references under `refs/namespaces/foo/`,
   *     	use `foo` as the namespace.
   * @return  0 on success, -1 on error
   */
  public setNamespace(nmspace: string): number;
  /**
   * @param workdir The path to a working directory
   * @param update_gitlink Create/update gitlink in workdir and set config
   *             "core.worktree" (if workdir is not the parent of the .git directory)
   * @return  0, or an error code
   */
  public setWorkdir(workdir: string, update_gitlink: number): number;
  /**
   * Stages or unstages line selection of a specified file
   * @param filePath The relative path of this file in the repo
   * @param stageNew Set to stage new filemode. Unset to unstage.
   * @return 0 or an error code
   */
  public stageFilemode(filePath: string | Array<any>, stageNew: Boolean): Promise<number>;
  /**
   * Stages or unstages line selection of a specified file
   * @param filePath The relative path of this file in the repo
   * @param newLines The array of DiffLine objects                            selected for staging or unstaging
   * @param isStaged Are the selected lines currently staged
   * @return 0 or an error code
   */
  public stageLines(filePath: string, newLines: Array<any>, isStaged: Boolean): Promise<number>;
  /**
   * @return  The state of the repository
   */
  public state(): number;
  /**
   * @return  0 on success, or error
   */
  public stateCleanup(): number;
  /**
   * Create a new tree builder.
   * @param tree 
   */
  public treeBuilder(tree: Tree): void;
  /**
   * @return  the path to the working dir, if it exists
   */
  public workdir(): string;
}

export class RepositoryInitOptions {
  
  
  public description: string
  public flags: number
  public initialHead: string
  public mode: number
  public originUrl: string
  public templatePath: string
  public version: number
  public workdirPath: string
  
}

declare enum ResetTYPE {
  HARD = 3,
  MIXED = 2,
  SOFT = 1
}

export class Reset {
  public static TYPE: typeof ResetTYPE;
  /**
   * @param repo Repository where to perform the reset operation.
   * @param target The committish which content will be used to reset the content
   *      of the index.
   * @param pathspecs List of pathspecs to operate on.
   * @return  0 on success or an error code 
   *     <
   *      0
   */
  public static default(repo: Repository, pathspecs: Strarray): Promise<number>;
  public static default(repo: Repository, target: GitObject, pathspecs: Strarray): Promise<number>;
  /**
   * @param repo 
   * @param commit 
   * @param reset_type 
   * @param checkout_opts 
   */
  public static fromAnnotated(repo: Repository, commit: AnnotatedCommit, reset_type: number, checkout_opts: CheckoutOptions): number;
  /**
   * @param repo Repository where to perform the reset operation.
   * @param target Committish to which the Head should be moved to. This object
   *      must belong to the given `repo` and can either be a git_commit or a
   *      git_tag. When a git_tag is being passed, it should be dereferencable
   *      to a git_commit which oid will be used as the target of the branch.
   * @param reset_type Kind of reset operation to perform.
   * @param checkout_opts Checkout options to be used for a HARD reset.
   *      The checkout_strategy field will be overridden (based on reset_type).
   *      This parameter can be used to propagate notify and progress callbacks.
   * @return  0 on success or an error code
   */
  public static reset(repo: Repository, target: GitObject, reset_type: number, checkout_opts?: CheckoutOptions): Promise<number>;
  
  
}

export class Revert {
  
  /**
   * @param repo the repository that contains the given commits
   * @param revert_commit the commit to revert
   * @param our_commit the commit to revert against (eg, HEAD)
   * @param mainline the parent of the revert commit, if it is a merge
   * @param merge_options the merge options (or null for defaults)
   */
  public static commit(repo: Repository, revert_commit: Commit, our_commit: Commit, mainline: number, merge_options?: MergeOptions): Promise<Index>;
  /**
   * @param repo the repository to revert
   * @param commit the commit to revert
   * @param given_opts merge flags
   * @return  zero on success, -1 on failure.
   */
  public static revert(repo: Repository, commit: Commit, given_opts: RevertOptions): Promise<number>;
  
  
}

export class RevertOptions {
  
  
  public checkoutOpts: CheckoutOptions
  public mainline: number
  public mergeOpts: MergeOptions
  public version: number
  
}

declare enum RevparseMODE {
  MERGE_BASE = 4,
  RANGE = 2,
  SINGLE = 1
}

export class Revparse {
  public static MODE: typeof RevparseMODE;
  /**
   * @param object_out pointer to output object
   * @param reference_out pointer to output reference or NULL
   * @param repo the repository to search in
   * @param spec the textual specification for an object
   * @return  0 on success, GIT_ENOTFOUND, GIT_EAMBIGUOUS, GIT_EINVALIDSPEC
   *      or an error code
   */
  public static ext(object_out: GitObject, reference_out: Reference, repo: Repository, spec: string): number;
  /**
   * @param repo the repository to search in
   * @param spec the textual specification for an object
   */
  public static single(repo: Repository, spec: string): Promise<GitObject>;
  
  
}

declare enum RevwalkSORT {
  NONE = 0,
  REVERSE = 4,
  TIME = 2,
  TOPOLOGICAL = 1
}

export class Revwalk {
  public static SORT: typeof RevwalkSORT;
  /**
   * @param repo the repo to walk through
   */
  public static create(repo: Repository): Revwalk;
  
  /**
   * @param max_count 
   */
  public fastWalk(max_count: number): Promise<any>;
  /**
   * @param filePath 
   * @param max_count 
   */
  public fileHistoryWalk(filePath: string, max_count: number): Promise<Array<any>>;
  /**
   * Get a number of commits.
   * @param count (default: 10)
   */
  public getCommits(count: number): Promise<Array<Commit>>;
  /**
   * Walk the history grabbing commits until the checkFn called with the
   * current commit returns false.
   * @param checkFn function returns false to stop walking
   */
  public getCommitsUntil(checkFn: Function): Promise<Array<any>>;
  /**
   * @param commit_id the oid of commit that will be ignored during the traversal
   * @return  0 or an error code
   */
  public hide(commit_id: Oid): number;
  /**
   * @param glob the glob pattern references should match
   * @return  0 or an error code
   */
  public hideGlob(glob: string): number;
  /**
   * @return  0 or an error code
   */
  public hideHead(): number;
  /**
   * @param refname the reference to hide
   * @return  0 or an error code
   */
  public hideRef(refname: string): number;
  /**
   * @return the oid of the next commit
   */
  public next(): Promise<Oid>;
  /**
   * @param id the oid of the commit to start from.
   * @return  0 or an error code
   */
  public push(id: Oid): number;
  /**
   * @param glob the glob pattern references should match
   * @return  0 or an error code
   */
  public pushGlob(glob: string): number;
  /**
   * @return  0 or an error code
   */
  public pushHead(): number;
  /**
   * @param range the range
   * @return  0 or an error code
   */
  public pushRange(range: string): number;
  /**
   * @param refname the reference to push
   * @return  0 or an error code
   */
  public pushRef(refname: string): number;
  /**
   * @return  the repository being walked
   */
  public repository(): Repository;
  /**
  
   */
  public reset(): void;
  /**
  
   */
  public simplifyFirstParent(): void;
  /**
   * Set the sort order for the revwalk. This function takes variable arguments
   * like `revwalk.sorting(NodeGit.RevWalk.Topological, NodeGit.RevWalk.Reverse).`
   * @param sort 
   */
  public sorting(sort: number): void;
  /**
   * Walk the history from the given oid. The callback is invoked for each commit;
   * When the walk is over, the callback is invoked with `(null, null)`.
   * @param oid 
   * @param callback 
   */
  public walk(oid: Oid, callback: Function): Commit;
}

export class Signature {
  
  /**
   * @param name name of the person
   * @param email email of the person
   * @param time time when the action happened
   * @param offset timezone offset in minutes for the time
   * @return new signature, in case of error NULL
   */
  public static create(name: string, email: string, time: number, offset: number): Signature;
  /**
   * @param repo repository pointer
   * @return new signature
   */
  public static default(repo: Repository): Signature;
  /**
   * @param name name of the person
   * @param email email of the person
   * @return new signature, in case of error NULL
   */
  public static now(name: string, email: string): Signature;
  public email: string
  public name: string
  public when: Time
  /**
   * @return the copy
   */
  public dup(): Promise<Signature>;
  /**
  
   */
  public free(): void;
  /**
   * Standard string representation of an author.
   * @return Representation of the author.
   */
  public toString(): string;
}

export class Smart {
  
  
  
  
}

declare enum StashAPPLY_FLAGS {
  APPLY_DEFAULT = 0,
  APPLY_REINSTATE_INDEX = 1
}

declare enum StashAPPLY_PROGRESS {
  ANALYZE_INDEX = 2,
  ANALYZE_MODIFIED = 3,
  ANALYZE_UNTRACKED = 4,
  CHECKOUT_MODIFIED = 6,
  CHECKOUT_UNTRACKED = 5,
  DONE = 7,
  LOADING_STASH = 1,
  NONE = 0
}

declare enum StashFLAGS {
  DEFAULT = 0,
  INCLUDE_IGNORED = 4,
  INCLUDE_UNTRACKED = 2,
  KEEP_INDEX = 1
}

export class Stash {
  public static APPLY_FLAGS: typeof StashAPPLY_FLAGS;
  public static APPLY_PROGRESS: typeof StashAPPLY_PROGRESS;
  public static FLAGS: typeof StashFLAGS;
  /**
   * @param repo The owning repository.
   * @param index The position within the stash list. 0 points to the
   *                   most recent stashed state.
   * @param options Options to control how stashes are applied.
   * @return  0 on success, GIT_ENOTFOUND if there's no stashed state for the
   *              given index, GIT_EMERGECONFLICT if changes exist in the working
   *              directory, or an error code
   */
  public static apply(repo: Repository, index: number, options: StashApplyOptions): Promise<number>;
  /**
   * @param opts the `git_stash_apply_options` instance to initialize.
   * @param version the version of the struct; you should pass
   *             `GIT_STASH_APPLY_OPTIONS_INIT` here.
   * @return  Zero on success; -1 on failure.
   */
  public static applyInitOptions(opts: StashApplyOptions, version: number): number;
  /**
   * @param repo The owning repository.
   * @param index The position within the stash list. 0 points to the
   *      most recent stashed state.
   * @return  0 on success, GIT_ENOTFOUND if there's no stashed state for the given
   *      index, or error code.
   */
  public static drop(repo: Repository, index: number): Promise<number>;
  /**
   * @param repo Repository where to find the stash.
   * @param callback Callback to invoke per found stashed state. The most
   *                      recent stash state will be enumerated first.
   * @param payload Extra parameter to callback function.
   * @return  0 on success, non-zero callback return value, or error code.
   */
  public static foreach(repo: Repository, callback: Function, payload?: void): Promise<number>;
  /**
   * @param repo The owning repository.
   * @param index The position within the stash list. 0 points to the
   *                   most recent stashed state.
   * @param options Options to control how stashes are applied.
   * @return  0 on success, GIT_ENOTFOUND if there's no stashed state for the given
   *      index, or error code. (see git_stash_apply() above for details)
   */
  public static pop(repo: Repository, index: number, options: StashApplyOptions): Promise<number>;
  /**
   * @param repo 
   * @param stasher 
   * @param message 
   * @param flags 
   */
  public static save(repo: Repository, stasher: Signature, message: string, flags: number): Promise<Oid>;
  
  
}

export class StashApplyOptions {
  
  
  public checkoutOptions: CheckoutOptions
  public flags: number
  public progressCb: Function
  public progressPayload: void
  public version: number
  
}

declare enum StatusOPT {
  DISABLE_PATHSPEC_MATCH = 32,
  EXCLUDE_SUBMODULES = 8,
  INCLUDE_IGNORED = 2,
  INCLUDE_UNMODIFIED = 4,
  INCLUDE_UNREADABLE = 16384,
  INCLUDE_UNREADABLE_AS_UNTRACKED = 32768,
  INCLUDE_UNTRACKED = 1,
  NO_REFRESH = 4096,
  RECURSE_IGNORED_DIRS = 64,
  RECURSE_UNTRACKED_DIRS = 16,
  RENAMES_FROM_REWRITES = 2048,
  RENAMES_HEAD_TO_INDEX = 128,
  RENAMES_INDEX_TO_WORKDIR = 256,
  SORT_CASE_INSENSITIVELY = 1024,
  SORT_CASE_SENSITIVELY = 512,
  UPDATE_INDEX = 8192
}

declare enum StatusSHOW {
  INDEX_AND_WORKDIR = 0,
  INDEX_ONLY = 1,
  WORKDIR_ONLY = 2
}

declare enum StatusSTATUS {
  CONFLICTED = 32768,
  CURRENT = 0,
  IGNORED = 16384,
  INDEX_DELETED = 4,
  INDEX_MODIFIED = 2,
  INDEX_NEW = 1,
  INDEX_RENAMED = 8,
  INDEX_TYPECHANGE = 16,
  WT_DELETED = 512,
  WT_MODIFIED = 256,
  WT_NEW = 128,
  WT_RENAMED = 2048,
  WT_TYPECHANGE = 1024,
  WT_UNREADABLE = 4096
}

export class Status {
  public static OPT: typeof StatusOPT;
  public static SHOW: typeof StatusSHOW;
  public static STATUS: typeof StatusSTATUS;
  /**
   * @param statuslist Existing status list object
   * @param idx Position of the entry
   */
  public static byIndex(statuslist: StatusList, idx: number): StatusEntry;
  /**
   * @param repo A repository object
   * @param path The exact path to retrieve status for relative to the
   *      repository working directory
   * @return Output combination of git_status_t values for file
   */
  public static file(repo: Repository, path: string): number;
  /**
   * @param repo A repository object
   * @param callback The function to call on each file
   * @param payload Pointer to pass through to callback function
   * @return  0 on success, non-zero callback return value, or error code
   */
  public static foreach(repo: Repository, callback: Function, payload?: void): Promise<number>;
  /**
   * @param repo Repository object
   * @param opts Status options structure
   * @param callback The function to call on each file
   * @param payload Pointer to pass through to callback function
   * @return  0 on success, non-zero callback return value, or error code
   */
  public static foreachExt(repo: Repository, opts: StatusOptions, callback: Function, payload?: void): Promise<number>;
  /**
   * @param ignored Boolean returning 0 if the file is not ignored, 1 if it is
   * @param repo A repository object
   * @param path The file to check ignores for, rooted at the repo's workdir.
   * @return  0 if ignore rules could be processed for the file (regardless
   *              of whether it exists or not), or an error 
   *     <
   *      0 if they could not.
   */
  public static shouldIgnore(ignored: number, repo: Repository, path: string): number;
  
  
}

export class StatusEntry {
  
  
  public headToIndex: DiffDelta
  public indexToWorkdir: DiffDelta
  public status: number
  
}

export class StatusList {
  
  /**
   * @param repo Repository object
   * @param opts Status options structure
   */
  public static create(repo: Repository, opts?: StatusOptions): Promise<StatusList>;
  
  /**
   * @return  the number of status entries
   */
  public entrycount(): number;
  /**
  
   */
  public free(): void;
  /**
  
   */
  public getPerfdata(): Promise<DiffPerfdata>;
}

export class StatusOptions {
  
  
  public flags: number
  public pathspec: Strarray
  public show: number
  public version: number
  
}

export class Strarray {
  
  
  public count: number
  public strings: string
  /**
   * [EXPERIMENTAL] 
   * @param src source
   * @return  0 on success, 
   *     <
   *      0 on allocation failure
   */
  public copy(src: Strarray): number;
  /**
   * [EXPERIMENTAL] 
   */
  public free(): void;
}

declare enum SubmoduleIGNORE {
  ALL = 4,
  DIRTY = 3,
  NONE = 1,
  UNSPECIFIED = -1,
  UNTRACKED = 2
}

declare enum SubmoduleRECURSE {
  NO = 0,
  ONDEMAND = 2,
  YES = 1
}

declare enum SubmoduleSTATUS {
  INDEX_ADDED = 16,
  INDEX_DELETED = 32,
  INDEX_MODIFIED = 64,
  IN_CONFIG = 4,
  IN_HEAD = 1,
  IN_INDEX = 2,
  IN_WD = 8,
  WD_ADDED = 256,
  WD_DELETED = 512,
  WD_INDEX_MODIFIED = 2048,
  WD_MODIFIED = 1024,
  WD_UNINITIALIZED = 128,
  WD_UNTRACKED = 8192,
  WD_WD_MODIFIED = 4096
}

declare enum SubmoduleUPDATE {
  CHECKOUT = 1,
  DEFAULT = 0,
  MERGE = 3,
  NONE = 4,
  REBASE = 2
}

export class Submodule {
  public static IGNORE: typeof SubmoduleIGNORE;
  public static RECURSE: typeof SubmoduleRECURSE;
  public static STATUS: typeof SubmoduleSTATUS;
  public static UPDATE: typeof SubmoduleUPDATE;
  /**
   * @param repo The repository in which you want to create the submodule
   * @param url URL for the submodule's remote
   * @param path Path at which the submodule should be created
   * @param use_gitlink Should workdir contain a gitlink to the repo in
   *             .git/modules vs. repo directly in workdir.
   * @return The newly created submodule ready to open for clone
   */
  public static addSetup(repo: Repository, url: string, path: string, use_gitlink: number): Promise<Submodule>;
  /**
   * @param repo The repository
   * @param callback Function to be called with the name of each submodule.
   *             Return a non-zero value to terminate the iteration.
   * @param payload Extra data to pass to callback
   * @return  0 on success, -1 on error, or non-zero return value of callback
   */
  public static foreach(repo: Repository, callback: Function, payload?: void): Promise<number>;
  /**
   * @param repo The parent repository
   * @param name The name of or path to the submodule; trailing slashes okay
   * @return Output ptr to submodule; pass NULL to just get return code
   */
  public static lookup(repo: Repository, name: string): Promise<Submodule>;
  /**
   * @param repo Pointer to repository object
   * @param url Relative url
   * @return buffer to store the absolute submodule url in
   */
  public static resolveUrl(repo: Repository, url: string): Promise<Buf>;
  /**
   * @param repo the repository to affect
   * @param name the name of the submodule to configure
   * @param branch Branch that should be used for the submodule
   * @return  0 on success, 
   *     <
   *     0 on failure
   */
  public static setBranch(repo: Repository, name: string, branch: string): number;
  /**
   * @param repo the repository to affect
   * @param name the submodule to configure
   * @param fetch_recurse_submodules Boolean value
   * @return  old value for fetchRecurseSubmodules
   */
  public static setFetchRecurseSubmodules(repo: Repository, name: string, fetch_recurse_submodules: number): number;
  /**
   * @param repo the repository to affect
   * @param name the name of the submdule
   * @param ignore The new value for the ignore rule
   * @return  0 or an error code
   */
  public static setIgnore(repo: Repository, name: string, ignore: number): Promise<number>;
  /**
   * @param repo the repository to affect
   * @param name the name of the submodule to configure
   * @param update The new value to use
   * @return  0 or an error code
   */
  public static setUpdate(repo: Repository, name: string, update: number): Promise<number>;
  /**
   * @param repo the repository to affect
   * @param name the name of the submodule to configure
   * @param url URL that should be used for the submodule
   * @return  0 on success, 
   *     <
   *     0 on failure
   */
  public static setUrl(repo: Repository, name: string, url: string): Promise<number>;
  /**
   * @param repo the repository in which to look
   * @param name name of the submodule
   * @param ignore the ignore rules to follow
   * @return Combination of `GIT_SUBMODULE_STATUS` flags
   */
  public static status(repo: Repository, name: string, ignore: number): Promise<number>;
  /**
   * @param opts The `git_submodule_update_options` instance to initialize.
   * @param version Version of struct; pass `GIT_SUBMODULE_UPDATE_OPTIONS_VERSION`
   * @return  Zero on success; -1 on failure.
   */
  public static updateInitOptions(opts: SubmoduleUpdateOptions, version: number): number;
  
  /**
  
   */
  public addFinalize(): Promise<number>;
  /**
   * @param write_index Boolean if this should immediately write the index
   *                 file.  If you pass this as false, you will have to get the
   *                 git_index and explicitly call `git_index_write()` on it to
   *                 save the change.
   * @return  0 on success, 
   *     <
   *     0 on failure
   */
  public addToIndex(write_index: number): Promise<number>;
  /**
  
   */
  public branch(): string;
  /**
   * @return  0 if fetchRecurseSubmodules is false, 1 if true
   */
  public fetchRecurseSubmodules(): number;
  /**
  
   */
  public free(): void;
  /**
  
   */
  public headId(): Oid;
  /**
   * @return  The current git_submodule_ignore_t valyue what will be used for
   *              this submodule.
   */
  public ignore(): number;
  /**
  
   */
  public indexId(): Oid;
  /**
   * @param overwrite By default, existing entries will not be overwritten,
   *                       but setting this to true forces them to be updated.
   * @return  0 on success, 
   *     <
   *     0 on failure.
   */
  public init(overwrite: number): Promise<number>;
  /**
   * @return Combination of first four `GIT_SUBMODULE_STATUS` flags
   */
  public location(): Promise<number>;
  /**
  
   */
  public name(): string;
  /**
  
   */
  public open(): Promise<Repository>;
  /**
  
   */
  public owner(): Repository;
  /**
  
   */
  public path(): string;
  /**
   * @param force Force reload even if the data doesn't seem out of date
   * @return  0 on success, 
   *     <
   *     0 on error
   */
  public reload(force: number): number;
  /**
   * @param use_gitlink Should the workdir contain a gitlink to
   *             the repo in .git/modules vs. repo directly in workdir.
   */
  public repoInit(use_gitlink: number): Promise<Repository>;
  /**
  
   */
  public sync(): Promise<number>;
  /**
   * @param init If the submodule is not initialized, setting this flag to true
   *             will initialize the submodule before updating. Otherwise, this will
   *             return an error if attempting to update an uninitialzed repository.
   *             but setting this to true forces them to be updated.
   * @param options configuration options for the update.  If NULL, the
   *             function works as though GIT_SUBMODULE_UPDATE_OPTIONS_INIT was passed.
   * @return  0 on success, any non-zero return value from a callback
   *              function, or a negative value to indicate an error (use
   *              `giterr_last` for a detailed error message).
   */
  public update(init: number, options?: SubmoduleUpdateOptions): Promise<number>;
  /**
   * @return  The current git_submodule_update_t value that will be used
   *              for this submodule.
   */
  public updateStrategy(): number;
  /**
  
   */
  public url(): string;
  /**
  
   */
  public wdId(): Oid;
}

export class SubmoduleUpdateOptions {
  
  
  public checkoutOpts: CheckoutOptions
  public cloneCheckoutStrategy: number
  public fetchOpts: FetchOptions
  public version: number
  
}

export class Tag {
  
  /**
   * @param repo Repository where to store the tag
   * @param tag_name Name for the tag
   * @param target Object to which this tag points. This object
   *      must belong to the given `repo`.
   * @param tagger Signature of the tagger for this tag, and
   *      of the tagging time
   * @param message Full message for this tag
   * @return the OID of the
   *      newly created tag
   */
  public static annotationCreate(repo: Repository, tag_name: string, target: GitObject, tagger: Signature, message: string): Promise<Oid>;
  /**
   * @param repo Repository where to store the tag
   * @param tag_name Name for the tag; this name is validated
   *      for consistency. It should also not conflict with an
   *      already existing tag name
   * @param target Object to which this tag points. This object
   *      must belong to the given `repo`.
   * @param tagger Signature of the tagger for this tag, and
   *      of the tagging time
   * @param message Full message for this tag
   * @param force Overwrite existing references
   * @return the OID of the
   *      newly created tag. If the tag already exists, this parameter
   *      will be the oid of the existing tag, and the function will
   *      return a GIT_EEXISTS error code.
   */
  public static create(repo: Repository, tag_name: string, target: GitObject, tagger: Signature, message: string, force: number): Promise<Oid>;
  /**
   * @param repo Repository where to store the lightweight tag
   * @param tag_name Name for the tag; this name is validated
   *      for consistency. It should also not conflict with an
   *      already existing tag name
   * @param target Object to which this tag points. This object
   *      must belong to the given `repo`.
   * @param force Overwrite existing references
   * @return the OID of the provided
   *      target object. If the tag already exists, this parameter
   *      will be filled with the oid of the existing pointed object
   *      and the function will return a GIT_EEXISTS error code.
   */
  public static createLightweight(repo: Repository, tag_name: string, target: GitObject, force: number): Promise<Oid>;
  /**
   * @param repo Repository where lives the tag
   * @param tag_name Name of the tag to be deleted;
   *      this name is validated for consistency.
   * @return  0 on success, GIT_EINVALIDSPEC or an error code
   */
  public static delete(repo: Repository, tag_name: string): Promise<number>;
  /**
   * @param repo Repository where to find the tags
   */
  public static list(repo: Repository): Promise<Array<any>>;
  /**
   * @param tag_names Pointer to a git_strarray structure where
   *     		the tag names will be stored
   * @param pattern Standard fnmatch pattern
   * @param repo Repository where to find the tags
   * @return  0 or an error code
   */
  public static listMatch(tag_names: Strarray, pattern: string, repo: Repository): number;
  /**
   * Retrieves the tag pointed to by the oid
   * @param repo The repo that the tag lives in
   * @param id The tag to lookup
   */
  public static lookup(repo: Repository, id: string | Oid | Tag): Promise<Tag>;
  /**
   * @param repo the repo to use when locating the tag.
   * @param id identity of the tag to locate.
   * @param len the length of the short identifier
   */
  public static lookupPrefix(repo: Repository, id: Oid, len: number): Promise<Tag>;
  
  /**
  
   */
  public free(): void;
  /**
   * @return  object identity for the tag.
   */
  public id(): Oid;
  /**
   * @return  message of the tag or NULL when unspecified
   */
  public message(): string;
  /**
   * @return  name of the tag
   */
  public name(): string;
  /**
   * @return  Repository that contains this tag.
   */
  public owner(): Repository;
  /**
   * @param tag_target_out Pointer to the peeled git_object
   * @return  0 or an error code
   */
  public peel(tag_target_out: GitObject): number;
  /**
   * @return  reference to the tag's author or NULL when unspecified
   */
  public tagger(): Signature;
  /**
   * @return the target
   */
  public target(): GitObject;
  /**
  
   */
  public targetId(): Oid;
  /**
   * @return  type of the tagged object
   */
  public targetType(): number;
}

export class Time {
  
  
  public offset: number
  public time: number
  
}

declare enum TraceLEVEL {
  DEBUG = 5,
  ERROR = 2,
  FATAL = 1,
  INFO = 4,
  NONE = 0,
  TRACE = 6,
  WARN = 3
}

export class Trace {
  public static LEVEL: typeof TraceLEVEL;
  
  
  
}

export class Transaction {
  
  
  
  
}

export class TransferProgress {
  
  
  public indexedDeltas: number
  public indexedObjects: number
  public localObjects: number
  public receivedBytes: number
  public receivedObjects: number
  public totalDeltas: number
  public totalObjects: number
  
}

declare enum TransportFLAGS {
  NONE = 0
}

export class Transport {
  public static FLAGS: typeof TransportFLAGS;
  /**
   * [EXPERIMENTAL] 
   * @param owner the owning remote
   * @param payload a strarray with the paths
   * @return the resulting transport
   */
  public static sshWithPaths(owner: Remote, payload?: void): Promise<Transport>;
  /**
   * [EXPERIMENTAL] 
   * @param prefix From the previous call to git_transport_register
   * @return  0 or an error code
   */
  public static unregister(prefix: string): number;
  
  /**
   * [EXPERIMENTAL] 
   * @param version Version of struct; pass `GIT_TRANSPORT_VERSION`
   * @return  Zero on success; -1 on failure.
   */
  public init(version: number): number;
}

declare enum TreeWALK_MODE {
  WALK_POST = 1,
  WALK_PRE = 0
}

export class Tree {
  public static WALK_MODE: typeof TreeWALK_MODE;
  /**
   * [EXPERIMENTAL] 
   * @param e1 first tree entry
   * @param e2 second tree entry
   * @return  
   *     <
   *     0 if e1 is before e2, 0 if e1 == e2, >0 if e1 is after e2
   */
  public static entryCmp(e1: TreeEntry, e2: TreeEntry): number;
  /**
   * [EXPERIMENTAL] 
   * @param dest pointer where to store the copy
   * @param source tree entry to duplicate
   * @return  0 or an error code
   */
  public static entryDup(dest: TreeEntry, source: TreeEntry): number;
  /**
   * [EXPERIMENTAL] 
   * @param entry a tree entry
   * @return  filemode as an integer
   */
  public static entryFilemode(entry: TreeEntry): number;
  /**
   * [EXPERIMENTAL] 
   * @param entry a tree entry
   * @return  filemode as an integer
   */
  public static entryFilemodeRaw(entry: TreeEntry): number;
  /**
   * [EXPERIMENTAL] 
   * @param entry a tree entry
   * @return  the oid of the object
   */
  public static entryId(entry: TreeEntry): Oid;
  /**
   * [EXPERIMENTAL] 
   * @param entry a tree entry
   * @return  the name of the file
   */
  public static entryName(entry: TreeEntry): string;
  /**
   * [EXPERIMENTAL] 
   * @param object_out pointer to the converted object
   * @param repo repository where to lookup the pointed object
   * @param entry a tree entry
   * @return  0 or an error code
   */
  public static entryToObject(object_out: GitObject, repo: Repository, entry: TreeEntry): number;
  /**
   * [EXPERIMENTAL] 
   * @param entry a tree entry
   * @return  the type of the pointed object
   */
  public static entryType(entry: TreeEntry): number;
  /**
   * Retrieves the tree pointed to by the oid
   * @param repo The repo that the tree lives in
   * @param id The tree to lookup
   * @param callback 
   */
  public static lookup(repo: Repository, id: string | Oid | Tree, callback: Function): Promise<Tree>;
  /**
   * [EXPERIMENTAL] 
   * @param repo the repo to use when locating the tree.
   * @param id identity of the tree to locate.
   * @param len the length of the short identifier
   */
  public static lookupPrefix(repo: Repository, id: Oid, len: number): Promise<Tree>;
  
  /**
   * [EXPERIMENTAL] 
   * @param idx the position in the entry list
   * @return  the tree entry; NULL if not found
   */
  public _entryByIndex(idx: number): TreeEntry;
  /**
   * Make builder. This is helpful for modifying trees.
   */
  public builder(): Treebuilder;
  /**
   * Diff two trees
   * @param tree to diff against
   * @param callback 
   */
  public diff(tree: Tree, callback: Function): Promise<any>;
  /**
   * Diff two trees with options
   * @param tree to diff against
   * @param options 
   * @param callback 
   */
  public diffWithOptions(tree: Tree, options: GitObject, callback: Function): Promise<any>;
  /**
   * Return an array of the entries in this tree (excluding its children).
   * @return an array of TreeEntrys
   */
  public entries(): Array<TreeEntry>;
  /**
   * [EXPERIMENTAL] 
   * @param id the sha being looked for
   * @return  the tree entry; NULL if not found
   */
  public entryById(id: Oid): TreeEntry;
  /**
   * Get an entry at the ith position.
   * @param i 
   */
  public entryByIndex(i: number): TreeEntry;
  /**
   * Get an entry by name; if the tree is a directory, the name is the filename.
   * @param name 
   */
  public entryByName(name: string): TreeEntry;
  /**
   * [EXPERIMENTAL] 
   * @param path Path to the contained entry
   * @return the tree entry
   */
  public entryByPath(path: string): Promise<TreeEntry>;
  /**
   * [EXPERIMENTAL] 
   * @return  the number of entries in the tree
   */
  public entryCount(): number;
  /**
   * [EXPERIMENTAL] 
   */
  public free(): void;
  /**
   * Get an entry at a path. Unlike by name, this takes a fully
   * qualified path, like `/foo/bar/baz.javascript`
   * @param filePath 
   */
  public getEntry(filePath: string): TreeEntry;
  /**
   * [EXPERIMENTAL] 
   * @return  object identity for the tree.
   */
  public id(): Oid;
  /**
   * [EXPERIMENTAL] 
   * @return  Repository that contains this tree.
   */
  public owner(): Repository;
  /**
   * Return the path of this tree, like `/lib/foo/bar`
   */
  public path(): string;
  /**
   * Recursively walk the tree in breadth-first order. Fires an event for each
   * entry.
   * @param blobsOnly = true] True to emit only blob & blob executable entries.
   */
  public walk(blobsOnly?: Boolean): NodeJS.EventEmitter;
}

declare enum TreeEntryFILEMODE {
  BLOB = 33188,
  COMMIT = 57344,
  EXECUTABLE = 33261,
  LINK = 40960,
  TREE = 16384,
  UNREADABLE = 0
}

export class TreeEntry {
  public static FILEMODE: typeof TreeEntryFILEMODE;
  
  public attr: number
  public filename: string
  public filenameLen: number
  public oid: Oid
  /**
   * Retrieve the tree for this entry. Make sure to call `isTree` first!
   */
  public getBlob(): Promise<GitBlob>;
  /**
   * Retrieve the tree for this entry. Make sure to call `isTree` first!
   */
  public getTree(): Promise<Tree>;
  /**
   * Is this TreeEntry a blob? Alias for `isFile`
   */
  public isBlob(): Boolean;
  /**
   * Is this TreeEntry a directory? Alias for `isTree`
   */
  public isDirectory(): Boolean;
  /**
   * Is this TreeEntry a blob? (i.e., a file)
   */
  public isFile(): Boolean;
  /**
   * Is this TreeEntry a tree? (i.e., a directory)
   */
  public isTree(): Boolean;
  /**
   * Returns the path for this entry.
   */
  public path(): string;
  /**
   * Retrieve the SHA for this TreeEntry.
   */
  public sha(): string;
  /**
   * Alias for `path`
   */
  public toString(): void;
}

export class Treebuilder {
  
  /**
   * @param repo Repository in which to store the object
   * @param source Source tree to initialize the builder (optional)
   * @return the tree builder
   */
  public static create(repo: Repository, source?: Tree): Promise<Treebuilder>;
  
  /**
  
   */
  public clear(): void;
  /**
   * @return  the number of entries in the treebuilder
   */
  public entrycount(): number;
  /**
  
   */
  public free(): void;
  /**
   * @param filename Name of the entry
   */
  public get(filename: string): TreeEntry;
  /**
   * @param filename Filename of the entry
   * @param id SHA1 oid of the entry
   * @param filemode Folder attributes of the entry. This parameter must
   *     			be valued with one of the following entries: 0040000, 0100644,
   *     			0100755, 0120000 or 0160000.
   */
  public insert(filename: string, id: Oid, filemode: number): Promise<TreeEntry>;
  /**
   * @param filename Filename of the entry to remove
   */
  public remove(filename: string): number;
  /**
  
   */
  public write(): Oid;
}

export class Writestream {
  
  
  
  
}

export { GitBlob as Blob, GitObject as Object }
