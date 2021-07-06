interface List {
  append(xs: List): List;
  head<T>(): T;
  isEmpty(): boolean;
  length(): number;
  push<T>(x: T): List;
  remove<T>(x: T): List;
  tail(): List;
  toString(): string;
}

export class EmptyList implements List {
  length() {
    return 0;
  }

  isEmpty() {
    return true;
  }

  remove<T>(x: T) {
    return this;
  }

  head() {
    throw new Error("Cannot get head of EmptyList");
    return null;
  }

  tail() {
    throw new Error("Cannot get tail of EmptyList");
    return this;
  }

  toString() {
    return "()";
  }

  push<T>(x: T) {
    return new ListNode(x, this as List);
  }

  append(xs: List) {
    return xs;
  }
}

export class ListNode implements List {
  private value: any;
  private next: List;

  constructor(value: any, next: List) {
    this.value = value;
    this.next = next;
  }

  length() {
    return 1 + this.tail().length();
  }

  isEmpty() {
    return false;
  }

  toString() {
    const listValues = (list: List) => {
      const tail = list.tail().isEmpty() ? "" : listValues(list.tail());
      const result = list.head().toString() + " " + tail;
      return result.trim();
    };

    return `(${listValues(this)})`;
  }

  head() {
    return this.value;
  }

  tail() {
    return this.next;
  }

  push<T>(x: T) {
    return new ListNode(x, this as List);
  }

  remove<T>(x: T) {
    const tailResult = this.next.remove(x);

    if (x === this.value) return tailResult;
    if (tailResult === this.next) return this;

    return new ListNode(this.value, tailResult);
  }

  append(xs: List): List {
    return new ListNode(this.value, this.next.append(xs));
  }
}
