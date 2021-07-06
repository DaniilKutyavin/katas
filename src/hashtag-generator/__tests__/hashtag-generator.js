import {generateHashtag} from "../hashtag-generator";

describe("The Hashtag Generator", () => {
  test("Should return `false` for empty string", () => {
    expect(generateHashtag("")).toBe(false);
  });

  test("Should start with a #", () => {
    expect(generateHashtag("some text")).toMatch(/^#/);
  });

  test("Text should be in PascalCase", () => {
    const text = "some test string";
    const expected = "#SomeTestString";

    expect(generateHashtag(text)).toBe(expected);
  });

  test("Text should be correctly trimmed", () => {
    const text = "      My        favourite  string    ";
    const expected = "#MyFavouriteString";

    expect(generateHashtag(text)).toBe(expected);
  });

  test("Should return false for result longer than 140 chars", () => {
    const maxLenText = "a".repeat(139);
    const overFlowText = "a".repeat(140);

    expect(generateHashtag(maxLenText)).toBeTruthy();
    expect(generateHashtag(overFlowText)).toBeFalsy();
  });
});
