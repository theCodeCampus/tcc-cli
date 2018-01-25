import { mapBranchListsToUniqueBranches } from "./configuration";

describe("mapBranchListsToUniqueBranches", function () {

  it("should return a flat list", function () {

    const actual = mapBranchListsToUniqueBranches([
      ["a", "b"],
      ["c", "d"]
    ]);

    expect(actual).toEqual(["a", "b", "c", "d"]);
  });

  it("should return a duplicate free list", function () {

    const actual = mapBranchListsToUniqueBranches([
      ["a", "b"],
      ["a", "c"]
    ]);

    expect(actual).toEqual(["a", "b", "c"]);
  });
});
