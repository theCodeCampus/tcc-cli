import { checkRepoStatus } from "./git";
import {SimpleGit, StatusResult} from 'simple-git/promise';
describe("checking repository status", function () {

  describe("on a clean repository", function () {
    it("should return a resolved promise", function (done) {
      const repository: Partial<SimpleGit> = {
        status: function (): Promise<StatusResult> {
          const result: Partial<StatusResult> = { isClean: () => true};
          return Promise.resolve(result as StatusResult);
        }
      };

      const actual = checkRepoStatus(repository as SimpleGit);

      expect(actual).toBeDefined();
      expect(typeof actual.then).toBe("function");

      actual.then(
          function () { done(); },
          function (x) { done.fail(x); }
      );
    });
  });

  describe("on a dirty repository", function () {
    it("should return a rejected promise", function (done) {
      const repository: Partial<SimpleGit> = {
        status: function (): Promise<StatusResult> {
          const result: Partial<StatusResult> = { isClean: () => false};
          return Promise.resolve(result as StatusResult);
        }
      };

      const actual = checkRepoStatus(repository as SimpleGit);

      expect(actual).toBeDefined();
      expect(typeof actual.then).toBe("function");

      actual.then(
          function () { done.fail(); },
          function () { done(); }
      );
    });
  });

  it("should return promise resolve with repository (for chaining)", function (done) {
    const repository: Partial<SimpleGit> = {
      status: function (): Promise<StatusResult> {
        const result: Partial<StatusResult> = { isClean: () => true};
        return Promise.resolve(result as StatusResult);
      }
    };

    checkRepoStatus(repository as SimpleGit)
        .then(function (x) {
          expect(x).toBe(repository as SimpleGit);
          done();
        });
  });
});
