import { checkRepoStatus } from "./git";
describe("checking repository status", function () {

  describe("on a clean repository", function () {
    it("should return a resolved promise", function (done) {
      const repository: any = {
        getStatus: function (): Promise<Array<any>> {
          return Promise.resolve([]);
        }
      };

      const actual = checkRepoStatus(repository);

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
      const repository: any = {
        getStatus: function (): Promise<Array<any>> {
          return Promise.resolve(["path/file.ext"]);
        }
      };

      const actual = checkRepoStatus(repository);

      expect(actual).toBeDefined();
      expect(typeof actual.then).toBe("function");

      actual.then(
          function (x) { done.fail(x); },
          function () { done(); }
      );
    });
  });

  it("should return promise resolve with repository (for chaining)", function (done) {
    const repository: any = {
      getStatus: function (): Promise<Array<any>> {
        return Promise.resolve([]);
      }
    };

    checkRepoStatus(repository).then(function (x) {
      expect(x).toBe(repository);
      done();
    });
  });
});
