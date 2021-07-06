/**
 * @see https://www.codewars.com/kata/529a92d9aba78c356b000353
 *
 */
export class Cons<T = unknown> {
  static fromArray<T = unknown>(arr: T[]): Cons<T> {
    return arr.reduceRight<Cons<T>>((result, it) => new Cons(it, result), null);
  }

  static list<T>(...args: T[]): Cons<T> {
    return Cons.fromArray(args);
  }

  constructor(public head: T, public tail: Cons<T> | null) {
    this.head = head;
    this.tail = tail;
  }

  toArray = (): T[] => {
    if (!this.tail) return [this.head];
    return [this.head, ...this.tail.toArray()];
  };

  filter = (predicate: (value: T) => boolean): Cons<T> => {
    const tail = this.tail && this.tail.filter(predicate);
    return predicate(this.head) ? new Cons(this.head, tail) : tail;
  };

  map = <R = T>(mapper: (value: T) => R): Cons<R> =>
    new Cons<R>(mapper(this.head), this.tail && this.tail.map<R>(mapper));

  fold = <R>(f: (acc: R, x: T) => R, acc: R) => {
    const next = f(acc, this.head);

    if (this.tail === null) return next;
    return this.tail.fold(f, next);
  };
}
