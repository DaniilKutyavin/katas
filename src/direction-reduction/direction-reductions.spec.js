const {dirReduc} = require(".");

describe("Direction Reduction", () => {
  describe("Basic specs", () => {
    test("When direction array is empty, should return empty array", () => {
      expect(dirReduc([])).toEqual([]);
    });

    test("When there are simplified directions, should return given array", () => {
      const noDirectlyOpposites = ["EAST", "NORTH", "WEST", "SOUTH"];
      expect(dirReduc(noDirectlyOpposites)).toEqual(noDirectlyOpposites);
    });

    test("When there are only two opposite directions, should return empty array", () => {
      expect(dirReduc(["EAST", "WEST"])).toEqual([]);
    });

    test(
      "When there are two opposite directions" +
        "divided by another two opposite directions," +
        "should return empty array",
      () => {
        expect(dirReduc(["NORTH", "EAST", "WEST", "SOUTH"])).toEqual([]);
      },
    );
  });

  describe("Additional checks", () => {
    test("", () => {
      // Arrange
      const toTest = [
        "NORTH",
        "SOUTH",
        "SOUTH",
        "EAST",
        "WEST",
        "NORTH",
        "WEST",
      ];

      // Act
      const path = dirReduc(toTest);

      // Assert
      expect(path).toEqual(["WEST"]);
    });

    test("", () => {
      // Arrange
      const toTest = ["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"];

      // Act
      const path = dirReduc(toTest);

      // Assert
      expect(path).toEqual([]);
    });
  });
});
