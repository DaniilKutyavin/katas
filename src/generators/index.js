"use strict";
/*
  https://www.codewars.com/kata/53c29a6abb5187180d000b65
  The goal of this kata is to implement pseudo-generators with ES5.

  `generator(sequencer[, arg1, arg2, ...])` receives a sequencer function
  to generate the sequence and returns an object with a next() method.
  When the next() method is invoked, the next value is generated.
  The method could receive as well optional arguments to be passed to the sequencer function.
*/
exports.__esModule = true;
function generator(sequencer) {
    return {
        next: sequencer()
    };
}
exports.generator = generator;
function nats() {
    var next = 1;
    return function () {
        var value = next;
        next += 1;
        return value;
    };
}
function dummySeq() {
    return function () { return 'dummy'; };
}
function factorialSeq() {
    var _a = [1, 0], acc = _a[0], factor = _a[1];
    return function () {
        var _a;
        var result = acc;
        _a = [acc * factor, factor + 1], acc = _a[0], factor = _a[1];
        // factor = factor + 1
        // acc = acc * factor
        return result;
    };
}
function fibonacciSeq() {
    var _a = [0, 1], prev = _a[0], curr = _a[1];
    return function () {
        var _a;
        var result = curr;
        _a = [curr, prev + curr], prev = _a[0], curr = _a[1];
        return result;
    };
}
var test = generator(fibonacciSeq);
for (var i = 0; i < 10; i++) {
    console.log(test.next());
}
