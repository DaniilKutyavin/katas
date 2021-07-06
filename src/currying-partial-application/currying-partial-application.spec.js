const {curryPartial: curryingPartial} = require(".");

describe("Currying and partial application", () => {
  describe("Curried sum of three params", () => {
    const [a, b, c] = [1, 2, 3];
    const sumOfThree = (a, b, c) => a + b + c;

    test("When all parameters are given (by call chaining), sum should return correct result", () => {
      const currySum = curryingPartial(sumOfThree);
      expect(currySum(a)(b)(c)).toBe(sumOfThree(a, b, c));
    });

    test("When where is blank calls (without args), sum should return correct result", () => {
      const currySum = curryingPartial(sumOfThree);
      expect(currySum(a)()()(b)()(c)).toBe(sumOfThree(a, b, c));
    });

    test("When given more params, than needed, should return correct result", () => {
      const currySum = curryingPartial(sumOfThree);
      expect(currySum(a)(b)(c, a, b, c)).toBe(sumOfThree(a, b, c));
    });
  });

  describe("Partially applied sum of three params", () => {
    const [a, b, c] = [1, 2, 3];
    const sumOfThree = (a, b, c) => a + b + c;

    test("When first param is given in the curryingPartial constructor, sum should return correct result", () => {
      const partialSum = curryingPartial(sumOfThree, a);
      expect(partialSum(b)(c)).toBe(sumOfThree(a, b, c));
    });

    test("When all params are given to curryingPartial, should immediately return result", () => {
      const fullSum = curryingPartial(sumOfThree, a, b, c);
      expect(fullSum).toBe(sumOfThree(a, b, c));
    });
  });
});
