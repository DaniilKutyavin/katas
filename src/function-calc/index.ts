/**
 * @description This time we want to write calculations using functions and get the results. 
 *              Let's have a look at some examples:
 *              ```
                  seven(times(five())); // must return 35
                  four(plus(nine())); // must return 13
                  eight(minus(three())); // must return 5
                  six(dividedBy(two())); // must return 3
                ```
 * @see https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39/train/javascript
 */

const int: Int = (value) => (operation) => {
  if (typeof operation !== "function") return value;
  return operation(value);
};
const operation: Operation = (fn) => (right) => (left) => fn(left, right);

export const zero = int(0);
export const one = int(1);
export const two = int(2);
export const three = int(3);
export const four = int(4);
export const five = int(5);
export const six = int(6);
export const seven = int(7);
export const eight = int(8);
export const nine = int(9);

export const plus = operation((left, right) => left + right);
export const minus = operation((left, right) => left - right);
export const times = operation((left, right) => left * right);
export const dividedBy = operation((left, right) => Math.floor(left / right));

type Operation = (
  fn: OperationFun,
) => (right: number) => (left: number) => number;
type OperationFun = (left: number, right: number) => number;

type Int = (value: number) => (operation: (value: number) => number) => number;
