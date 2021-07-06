const {pathFinder} = require(".");

describe("Tesint path finder", () => {
  test("should be true", () => {
    const maze = `.W.
                  .W.
                  ...`;

    expect(pathFinder(maze)).toBe(true);
  });

  test("should be false on blocked maze", () => {
    const maze = `.W.
                  .W.
                  W..`;

    expect(pathFinder(maze)).toBe(false);
  });

  test("should be true on empty maze", () => {
    const maze = `......
                  ......
                  ......
                  ......
                  ......
                  ......`;

    expect(pathFinder(maze)).toBe(true);
  });

  test("should be false on maze with blocked exit", () => {
    const maze = `......
                  ......
                  ......
                  ......
                  .....W
                  ....W.`;
    expect(pathFinder(maze)).toBe(false);
  });
});
