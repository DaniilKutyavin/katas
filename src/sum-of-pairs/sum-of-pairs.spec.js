const {sumPairs} = require(".");

describe("Sum Of Pairs", () => {
  describe("Simple cases", () => {
    test("When empty array given, should return undefined", () => {
      expect(sumPairs([], 10)).toBeUndefined();
    });

    test("When given numbers are [1, 3] and sum is 4, should return [1, 3]", () => {
      expect(sumPairs([1, 3], 4)).toEqual([1, 3]);
    });

    test("When given numebrs are [1, 3] and sum is 5, should retrun undefined", () => {
      expect(sumPairs([1, 3], 5)).toBeUndefined();
    });
  });

  describe("Additinal tests", () => {
    test("When given numbers are [1, 4, 8, 7, 3, 15] and sum is 8, should return [1, 7]", () => {
      const numbers = [1, 4, 8, 7, 3, 15];

      expect(sumPairs(numbers, 8)).toEqual([1, 7]);
    });

    test("Negaitves: When given numbers are [1, -2, 3, 0, -6, 1] and sum is -6, should return [0, -6]", () => {
      const numbers = [1, -2, 3, 0, -6, 1];

      expect(sumPairs(numbers, -6)).toEqual([0, -6]);
    });

    test("No Match: When given numbers are [20, -13, 40] and sum is -7, should return undefined", () => {
      const numbers = [20, -13, 40];

      expect(sumPairs(numbers, -7)).toBeUndefined();
    });

    test("Zeros: When given numbers are [0, 2, 0] and is 0, should return [0, 0]", () => {
      const numbers = [0, 2, 0];

      expect(sumPairs(numbers, 0)).toEqual([0, 0]);
    });

    test("Subtractions: When given number are [5, 9, 13, -3] and sum is 10, should return [13, -3]", () => {
      const numbers = [5, 9, 13, -3];

      expect(sumPairs(numbers, 10)).toEqual([13, -3]);
    });
  });
});
