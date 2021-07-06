const {trailingZeros} = require(".");

describe("factorial trailing zero testing", () => {
  describe("check N < 5", () => {
    test("should be 0 with N = 0", () => {
      expect(trailingZeros(0)).toBe(0);
    });

    test("should be 0 with N = 4", () => {
      expect(trailingZeros(4)).toBe(0);
    });
  });

  describe("check 5 <= N < 10", () => {
    test("should be 1 with N = 5", () => {
      expect(trailingZeros(5)).toBe(1);
    });

    test("should be 1 with N = 9", () => {
      expect(trailingZeros(9)).toBe(1);
    });
  });

  describe("check 10 <= N < 15", () => {
    test("should be 2 with N = 10", () => {
      expect(trailingZeros(10)).toBe(2);
    });

    test("should be 2 with N < 15", () => {
      expect(trailingZeros(14)).toBe(2);
    });
  });

  describe("checking 5 ^ 2", () => {
    test("should be 6 with N = 25", () => {
      expect(trailingZeros(25)).toBe(6);
    });

    test("should be 4 with 24", () => {
      expect(trailingZeros(24)).toBe(4);
    });

    test("should be 12 with N = 50", () => {
      expect(trailingZeros(50)).toBe(12);
    });

    test("should be 24 with N = 100", () => {
      expect(trailingZeros(100)).toBe(24);
    });
  });

  describe("checking 5 ^ 3", () => {
    test("should be 28 with N = 124", () => {
      expect(trailingZeros(124)).toBe(28);
    });

    test("should be 31 with N = 125", () => {
      expect(trailingZeros(125)).toBe(31);
    });
  });

  test("should be 62 with N = 250", () => {
    expect(trailingZeros(250)).toBe(62);
  });
});
