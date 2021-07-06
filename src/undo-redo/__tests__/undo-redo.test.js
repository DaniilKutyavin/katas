const {undoRedo} = require("../undo-redo");

describe("Undo Redo", () => {
  describe("Simple mutations", () => {
    test("Get keys of object", () => {
      const target = {success: true, data: "hello"};
      const proxy = undoRedo(target);

      expect(proxy.get("success")).toBe(target.success);
      expect(proxy.get("data")).toBe(target.data);
    });

    test("Update keys of object", () => {
      const target = {success: true, data: "hello"};
      const proxy = undoRedo(target);

      const newValue = false;
      proxy.set("success", newValue);

      expect(proxy.get("success")).toBe(newValue);
    });

    test("Create fields of object", () => {
      const target = {success: true, data: "hello"};
      const proxy = undoRedo(target);

      const [key, value] = ["fieldName", "someData"];
      proxy.set(key, value);

      expect(proxy.get(key)).toBe(value);
    });

    test("Delete fields of object", () => {
      const target = {success: true, data: "hello"};
      const proxy = undoRedo(target);

      proxy.del("success");
      expect(proxy.get("success")).not.toBeDefined();
    });
  });

  describe("Undo", () => {
    test("Undo field setting", () => {
      const originalValue = "my first value";
      const target = {value: originalValue};
      const proxy = undoRedo(target);

      const newValue1 = "new value";
      proxy.set("value", newValue1);

      const newValue2 = "super new value";
      proxy.set("value", newValue2);

      proxy.undo();
      expect(proxy.get("value")).toBe(newValue1);

      proxy.undo();
      expect(proxy.get("value")).toBe(originalValue);
    });

    test("Undo field deleting", () => {
      const target = {k1: "v1", k2: "v2", k3: "v3"};
      const proxy = undoRedo(target);

      proxy.del("k2");
      proxy.del("k3");
      proxy.undo();
      proxy.undo();

      expect(proxy.get("k2")).toBe("v2");
      expect(proxy.get("k3")).toBe("v3");
    });

    test("Cannot undo without sets", () => {
      const target = {};
      const proxy = undoRedo(target);

      expect(() => proxy.undo()).toThrow();
    });

    test("Cannot undo on init state", () => {
      const target = {};
      const proxy = undoRedo(target);

      proxy.set("k1", "v1");
      proxy.set("k2", "v2");
      proxy.undo();
      proxy.undo();

      expect(() => proxy.undo()).toThrow();
    });
  });

  describe("Redo", () => {
    test("Redo field setting", () => {
      const target = {};
      const proxy = undoRedo(target);
      const [key, value] = ["k1", "v1"];

      proxy.set(key, value);
      proxy.undo();
      proxy.redo();

      expect(proxy.get(key)).toBe(value);
    });

    test("Redo field deleting", () => {
      const target = {key: "value"};
      const proxy = undoRedo(target);

      proxy.del("key");
      proxy.undo();
      proxy.redo();

      expect(proxy.get("key")).not.toBeDefined();
    });

    test("Cannot redo without test", () => {
      const target = {};
      const proxy = undoRedo(target);

      expect(() => proxy.redo()).toThrow();
    });

    test("Cannot redo after mutation", () => {
      const target = {};
      const proxy = undoRedo(target);

      proxy.set("k1", "v1");
      proxy.set("k2", "v2");
      proxy.set("k3", "v3");

      proxy.undo();
      proxy.set("k4", "v4");

      expect(() => proxy.redo()).toThrow();
    });
  });

  describe("Additional checks", () => {
    test("Extra test 1", () => {
      const target = {name: "Petra", lastName: "Vivaldi", age: 30, pet: "dog"};
      const proxy = undoRedo(target);

      proxy.set("lastName", "Bach"); // new family
      proxy.set("age", 31); // happy birthday!
      proxy.set("debt", 50000); // new house
      proxy.set("pet", "cat"); // little Buster stays with parents, but we have kitty now!
      proxy.set("debt", 51000); // impulsive credit
      proxy.undo("debt", 50000); // extra cash from grandparents go for debts

      proxy.set("lastName", "Vivaldi"); // husband was an asshole
      proxy.set("lastName", "Smith"); // but this guy is really nice
      proxy.undo(); // ... was nice for a few months
      proxy.undo(); // well, maybe ex-husband was not so bad?

      proxy.set("age", 45); // live goes on
      proxy.del("debt"); // yay! how we really own our house!

      expect(proxy.get("name")).toBe("Petra");
      expect(proxy.get("lastName")).toBe("Bach");
      expect(proxy.get("age")).toBe(45);
      expect(proxy.get("pet")).toBe("cat");
      expect(proxy.get("debt")).not.toBeDefined();
    });

    test("extra test for delete key", () => {
      const target = {x: 1, y: 2};
      const proxy = undoRedo(target);

      proxy.del("x");
      expect(proxy.get("x")).not.toBeDefined();
      expect(target).not.toHaveProperty("x");

      proxy.undo();
      expect(proxy.get("x")).toBe(1);
      expect(target).toHaveProperty("x");

      proxy.redo();
      expect(proxy.get("x")).not.toBeDefined();
      expect(target).not.toHaveProperty("x");
    });

    test("Undo created fields", () => {
      const target = {x: 1};
      const proxy = undoRedo(target);

      proxy.set("y", 6);
      proxy.undo();

      expect(proxy.get("y")).not.toBeDefined();
      expect(target).not.toHaveProperty("y");
    });

    test("should drop unused redos if new commands appears afters some undo", () => {
      const target = {};
      const proxy = undoRedo(target);

      // setting vars
      proxy.set("x", 1);
      proxy.set("y", 2);
      proxy.set("z", 3);

      // make some changes
      proxy.set("z", 30);
      proxy.del("z");

      // return initial vars - x=1, y=2, z=3
      proxy.undo();
      proxy.undo();

      // reassign z
      proxy.set("z", 4);

      proxy.undo(); // return z to 3
      proxy.undo(); // undo z creation
      proxy.undo(); // undo y creation
      proxy.undo(); // undo x creation

      expect(() => proxy.undo()).toThrow();
    });
  });
});
