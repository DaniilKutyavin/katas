/**
 * @description Given a list of integers and a single sum value, return the first two values (parse from the left) in order of appearance that add up to form the sum.
 * @see https://www.codewars.com/kata/54d81488b981293527000c8f/train/javascript
 */

export const sumPairs = (numbers: Array<number>, sum: number) => {
  const cache = {};

  for (let num of numbers) {
    if (cache[sum - num]) return [sum - num, num];
    cache[num] = true;
  }
};
