import { mapBranchListToMergeList, Merge } from "./merge";

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
