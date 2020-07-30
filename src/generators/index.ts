/*
  https://www.codewars.com/kata/53c29a6abb5187180d000b65
  The goal of this kata is to implement pseudo-generators with ES5.

  `generator(sequencer[, arg1, arg2, ...])` receives a sequencer function 
  to generate the sequence and returns an object with a next() method. 
  When the next() method is invoked, the next value is generated.
  The method could receive as well optional arguments to be passed to the sequencer function.
*/

export function generator<T>(sequencer: (...args: unknown[]) => () => T) {
  return {
    next: sequencer(),
  }
}
