const {Cons} = require(".");

describe("Algebraic Lists", () => {
  test("Cons[1, 2, 3, 4, 5] toArray should return [1, 2, 3, 4, 5]", () => {
    const testData = new Cons(
      1,
      new Cons(2, new Cons(3, new Cons(4, new Cons(5, null)))),
    );

    expect(testData.toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  test("Cons fromArray should return new Cons object [2, 3, 5, 2] when given array of [2, 3, 5, 2]", () => {
    const testData = [2, 3, 5, 2];
    const expectedData = new Cons(
      2,
      new Cons(3, new Cons(5, new Cons(2, null))),
    );

    expect(Cons.fromArray(testData).toArray()).toEqual(expectedData.toArray());
  });

  test("Should filter out all odd numbers", () => {
    const isOdd = (n) => n % 2 === 1;
    const numbers = Array.from({length: 100}, (_, i) => i);

    const list = Cons.fromArray(numbers);
    const actual = list.filter(isOdd);
    const expected = numbers.filter(isOdd);

    expect(actual.toArray()).toEqual(expected);
  });

  test("Should return doubled numbers", () => {
    const numbers = [1, 2, 3, 4, 5];
    const double = (x) => 2 * x;

    const list = Cons.fromArray(numbers);

    const newList = list.map(double);
    const exptected = numbers.map(double);

    expect(newList.toArray()).toEqual(exptected);
  });

  test("Should return sum of list", () => {
    const list = Cons.list(0, 1, 2, 3, 4, 5);
    const sum = (acc, sum) => acc + sum;

    expect(list.fold(sum, 0)).toBe(15);
  });

  test("Should return the biggest value", () => {
    const biggest = 100;
    const list = Cons.list(0, 1, 2, 3, biggest, 4, 5);
    const getBiggest = (acc, x) => (acc > x ? acc : x);

    expect(list.fold(getBiggest, 0)).toBe(biggest);
  });

  test("Should return correct list", () => {
    const testData = [0, 1, 2, 3, 4, 5];
    expect(Cons.list(...testData).toArray()).toEqual(testData);
  });
});
