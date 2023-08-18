import { checkRepoStatus } from "./git";
import { SimpleGit, StatusResult } from 'simple-git';

describe("checking repository status", function () {

  describe("on a clean repository", () => {
    it("should return a resolved promise", () => {
      const repository: Partial<SimpleGit> = {
        status: function (): Promise<StatusResult> {
          const result: Partial<StatusResult> = { isClean: () => true};
          return Promise.resolve(result as StatusResult);
        }
      } as any;

      const actual = checkRepoStatus(repository as SimpleGit);

      expect(actual).toBeDefined();
      expect(typeof actual.then).toBe("function");

      return actual;
    });
  });

  describe("on a dirty repository", () => {
    it("should return a rejected promise", done => {
      const repository: Partial<SimpleGit> = {
        status: function (): Promise<StatusResult> {
          const result: Partial<StatusResult> = { isClean: () => false};
          return Promise.resolve(result as StatusResult);
        }
      } as any;

      const actual = checkRepoStatus(repository as SimpleGit);

      expect(actual).toBeDefined();
      expect(typeof actual.then).toBe("function");

      actual.then(
          function () { done.fail(); },
          function () { done(); }
      );
    });
  });
});
