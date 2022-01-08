import {
  firstPrioritiesCalc,
  secondPrioritiesCalc,
  zeroPrioritiesCalc,
} from "./engine";

describe("zeroPrioritiesCalc simple cases", () => {
  it("[2, **]", () => {
    expect(zeroPrioritiesCalc([2, "**"])).toEqual([4]);
  });

  it("[5, !]", () => {
    expect(zeroPrioritiesCalc([5, "!"])).toEqual([120]);
  });
});

describe("firstPrioritiesCalc simple cases", () => {
  it("[1, * 32]", () => {
    expect(firstPrioritiesCalc([1, "*", 32])).toEqual([32]);
  });

  it("[32, /, 32]", () => {
    expect(firstPrioritiesCalc([32, "/", 32])).toEqual([1]);
  });

  it("[32, + 32]", () => {
    expect(firstPrioritiesCalc([32, "+", 32])).toEqual([32, "+", 32]);
  });

  it("[2, ^, 10]", () => {
    expect(firstPrioritiesCalc([2, "^", 10])).toEqual([1024]);
  });
});

describe("mixed zeroPrioritiesCalc, firstPrioritiesCalc and second priorities cases", () => {
  it("[5 ! + 32, /, 32, +, 10, *, 10]", () => {
    expect(
      firstPrioritiesCalc(
        zeroPrioritiesCalc([5, "!", "+", 32, "/", 32, "+", 10, "*", 10])
      )
    ).toEqual([120, "+", 1, "+", 100]);
  });
});

describe("firstPrioritiesCalc mixed with second priorities cases", () => {
  it("[32, /, 32, +, 10, *, 10]", () => {
    expect(firstPrioritiesCalc([32, "/", 32, "+", 10, "*", 10])).toEqual([
      1,
      "+",
      100,
    ]);
  });
});

describe("secondPrioritiesCalc invalid cases", () => {
  it("[32, / 32]", () => {
    expect(() => secondPrioritiesCalc([32, "/", 32])).toThrow(
      TypeError("Unexpected stack!")
    );
  });
});

describe("secondPrioritiesCalc simple cases", () => {
  it("[32, + 32]", () => {
    expect(secondPrioritiesCalc([32, "+", 32])).toEqual(64);
  });

  it("[32, - 32]", () => {
    expect(secondPrioritiesCalc([32, "-", 32])).toEqual(0);
  });

  it("[32, - 32, +, 10]", () => {
    expect(secondPrioritiesCalc([32, "-", 32, "+", 10])).toEqual(10);
  });
});
