const {snailSort} = require(".");

describe("snail sort testing", () => {
  test("On empty array snail should not moving", () => {
    const toTest = [[]];
    expect(snailSort(toTest)).toEqual([]);
  });

  test("should stay on init position in one-value array", () => {
    const toTest = [[1]];
    expect(snailSort(toTest)).toEqual([1]);
  });

  test("should work on 3x3 arrays", () => {
    const toTest = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const toExpect = [1, 2, 3, 6, 9, 8, 7, 4, 5];

    expect(snailSort(toTest)).toEqual(toExpect);
  });

  test("should work on 4x4 arrays", () => {
    const toTest = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ];
    const toExpect = [
      1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19,
      18, 17, 12, 13,
    ];

    expect(snailSort(toTest)).toEqual(toExpect);
  });

  test("should work on 5x5 arrays", () => {
    const toTest = [
      [1, 2, 3, 4, 5, 6],
      [20, 21, 22, 23, 24, 7],
      [19, 32, 33, 34, 25, 8],
      [18, 31, 36, 35, 26, 9],
      [17, 30, 29, 28, 27, 10],
      [16, 15, 14, 13, 12, 11],
    ];
    const toExpect = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ];

    expect(snailSort(toTest)).toEqual(toExpect);
  });
});
