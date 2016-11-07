import { mapBranchListsToBranchSet } from "./export";
describe("mapBranchListsToBranchSet", function () {

  it("should return a flat list", function () {

    const actual = mapBranchListsToBranchSet([
        ["a", "b"],
        ["c", "d"]
    ]);

    expect(actual).toEqual(["a", "b", "c", "d"]);
  });

  it("should return a duplicate free list", function () {

    const actual = mapBranchListsToBranchSet([
      ["a", "b"],
      ["a", "d"]
    ]);

    expect(actual).toEqual(["a", "b", "d"]);
  });
});
