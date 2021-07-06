/**
 * @see https://www.codewars.com/kata/53cf7e37e9876c35a60002c9
 * NOTE: bind is forbidden
 */
export const curryPartial = <T = unknown, R = T>(
  fn: FuncToCurry<T, R>,
  ...args: T[]
) => {
  if (args.length >= fn.length) {
    return fn(...args);
  }

  return (...newArgs: T[]) => curryPartial(fn, ...args.concat(newArgs));
};

type FuncToCurry<T, R = T> = (...args: T[]) => R;
