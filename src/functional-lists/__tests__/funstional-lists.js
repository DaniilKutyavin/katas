const {EmptyList, ListNode} = require("../functional-lists");

describe("Functional list methods", () => {
  describe("isEmpty()", () => {
    test("Empty list is empty", () => {
      const mt = new EmptyList();
      expect(mt.isEmpty()).toBe(true);
    });

    test("ListNode list is not empty", () => {
      const mt = new EmptyList();
      const l1 = new ListNode("a", mt);

      expect(l1.isEmpty()).toBe(false);
    });

    test("Empty list is not empty after push", () => {
      const mt = new EmptyList();
      const l1 = mt.push("a");

      expect(l1.isEmpty()).toBe(false);
    });

    test("Non-empty list should be empty after deletion of all elements", () => {
      const mt = new EmptyList();
      const l1 = new ListNode("a", mt);

      expect(l1.remove("a").isEmpty()).toBe(true);
    });
  }),
    describe("toString()", () => {
      test("Empty list should not display any elements", () => {
        const mt = new EmptyList();

        expect(mt.toString()).toBe("()");
      });

      test("Non-empty list should display all its elements", () => {
        const mt = new EmptyList();
        const l1 = mt.push("a").push("b").push("c").push("d");

        expect(l1.toString()).toBe("(d c b a)");
      });
    });
  describe("length()", () => {
    test("Empty list should have length of 0", () => {
      const mt = new EmptyList();

      expect(mt.length()).toBe(0);
    });

    test("Non-empty list should have length of amount of its elements", () => {
      const mt = new EmptyList();
      const l1 = mt.push("a").push("b").push("c").push("d");

      expect(l1.length()).toBe(4);
    });
  });

  describe("head()", () => {
    test("Empty list should throw", () => {
      const mt = new EmptyList();

      expect(mt.head).toThrow();
    });

    test("Non-empty list should return its value", () => {
      const mt = new EmptyList();
      const elem = "a";
      const l1 = mt.push(elem);

      expect(l1.head()).toBe(elem);
    });
  });

  describe("tail()", () => {
    test("Empty list should throw", () => {
      const mt = new EmptyList();

      expect(mt.tail).toThrow();
    });

    test("List with 1 element should return EmptyList", () => {
      const mt = new EmptyList();
      const l1 = mt.push("a");

      expect(l1.tail()).toBe(mt);
      expect(l1.tail()).toBeInstanceOf(EmptyList);
    });

    test("List with > 2 elements shoult return its next", () => {
      const mt = new EmptyList();
      const l1 = mt.push("a");
      const l2 = l1.push("b");

      expect(l2.tail()).toBe(l1);
      expect(l2.tail()).toBeInstanceOf(ListNode);
    });

    describe("push()", () => {
      test("Pushing to empty list should add new value", () => {
        const mt = new EmptyList();
        const l1 = mt.push("a");

        expect(l1.length()).toBe(1);
        expect(l1.toString()).toBe("(a)");
        expect(l1.head()).toBe("a");
      });

      test("Pushing to non-empty list should add new value", () => {
        const mt = new EmptyList();
        const l1 = new ListNode("a", mt);
        const l2 = l1.push("b");

        expect(l2.length()).toBe(2);
        expect(l2.toString()).toBe("(b a)");
        expect(l2.head()).toBe("b");
      });

      test("Pushing to list more than once should correctly add all new elements to the list", () => {
        const mt = new EmptyList();
        const l1 = mt.push("a").push("b").push("c").push("d");
        const l2 = mt.push(1).push(2).push(3).push(4).push(5);

        expect(l1.length()).toBe(4);
        expect(l2.length()).toBe(5);
      });
    });

    describe("remove()", () => {
      test("Should return empty list if called on empty list", () => {
        const mt = new EmptyList();

        expect(mt.remove().isEmpty()).toBe(true);
      });

      test("Should remove the only element from the list", () => {
        const mt = new EmptyList();
        const elem = "element";

        const l1 = mt.push(elem);
        const l2 = new ListNode(elem, mt);

        expect(l1.remove(elem).isEmpty()).toBe(true);
        expect(l2.remove(elem).isEmpty()).toBe(true);
      });

      test("Should correctly remove all entries of element", () => {
        const mt = new EmptyList();
        const elem = 1;

        const l1 = mt.push(elem).push(2).push(elem).push(3);

        const l1removed = l1.remove(elem);

        expect(l1removed.length()).toBe(2);
        expect(l1removed.toString()).toBe("(3 2)");
      });
    });

    describe("append()", () => {
      test("Appending empty list should not change anything", () => {
        const mt = new EmptyList();
        const l1 = new ListNode("a", mt);

        expect(mt.append(mt).isEmpty()).toBe(true);

        expect(l1.append(mt).length()).toBe(l1.length());
        expect(mt.append(l1).length()).toBe(l1.length());
      });

      test("Appending 1 element list to another list should be equivalent to pushing", () => {
        const mt = new EmptyList();
        const l1 = mt.push("a").push("a").push("a");
        const l2 = l1.append(mt.push("b"));

        expect(l2.length()).toBe(l1.length() + 1);
        expect(l2.toString()).toBe("(a a a b)");
      });

      test("Appending random lists shouls have the same amount of elements", () => {
        const mt = new EmptyList();

        const l1 = randomList(randomInteger);
        const l2 = randomList(randomInteger);

        expect(l1.append(l2).length()).toBe(l1.length() + l2.length());
      });
    });
  });

  describe("Shared structure", () => {
    test("Test case 1", () => {
      const mt = new EmptyList();
      const l1 = mt.push("d").push("d");
      const l2 = l1.push("d");

      // const l2 = l1.push('d').push('d').push('d')

      console.log(l1);

      expect(l1.remove("d")).toBe(mt);
    });
  });
});

// Utils

function randomInteger() {
  Math.random().toFixed(2) * 100 + 1;
}

function randomArray(generator) {
  const length = randomInteger();
  return Array.from({length}, () => generator());
}

/**
 *
 * @param {any[]} array
 * @returns {ListNode} List
 */
function arrayToList(array) {
  const [head, ...tail] = array;
  return array.length === 0
    ? new EmptyList()
    : new ListNode(head, arrayToList(tail));
}

function randomList(generator) {
  return arrayToList(randomArray(generator));
}
