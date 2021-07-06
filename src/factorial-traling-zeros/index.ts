/**
 * Write a program that will calculate the number of
 * trailing zeros in a factorial of a given number.
 * @see https://www.codewars.com/kata/number-of-trailing-zeros-of-n/train/javascript
 */

export const trailingZeros = (n: number): number => {
  let result = 0;
  for (let power = 1; power <= highestPower(5)(n); power++) {
    result += Math.floor(n / 5 ** power);
  }
  return result;
};

const highestPower = (base: number) => (x: number) =>
  x >= base ? logN(base)(x) : 0;
const logN = (base: number) => (x: number) => Math.log(x) / Math.log(base);
