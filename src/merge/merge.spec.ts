import { mapBranchListToMergeList, Merge, checkRepoStatus } from "./merge";

describe("mapping branch list to merge list", function () {
  describe("with valid input", function () {
    it("should return a merge list", function () {
      const mergeList = mapBranchListToMergeList(["a", "b", "c"]);

      const expected: Merge[] = [
        { from: "a", to: "b"},
        { from: "b", to: "c"},
      ];

      expect(mergeList).toEqual(expected);
    });

    it("should return an empty merge list for an empty branch list", function () {
      const mergeList = mapBranchListToMergeList([]);

      const expected: Merge[] = [];

      expect(mergeList).toEqual(expected);
    });

    it("should return an empty merge list for branch list with only one branch", function () {
      const mergeList = mapBranchListToMergeList(["a"]);

      const expected: Merge[] = [];

      expect(mergeList).toEqual(expected);
    });
  });
});

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
