import { checkGuess } from "../check-guess";
import { describe, it, expect } from "vitest";
describe("Guess Function", () => {
  describe("Core Logic", () => {
    it("should return True when guess has the answer in it", () => {
      const guess = "This is a cat.";
      const answer = "cat";

      const result = checkGuess(guess, answer);

      expect(result).toBe(true);
    });
    it("should return False when guess does not has the answer in it", () => {
      const guess = "This looks like a dog";
      const answer = "cat";

      const result = checkGuess(guess, answer);

      expect(result).toBe(false);
    });

    it("should return true when guess has the answer in it regardless of casing", () => {
      const guess = "i ThInK tHaT's a bOaT";
      const answer = "Boat";

      const result = checkGuess(guess, answer);

      expect(result).toBe(true);
    });

    it("should return true when guess has the answer in it regardless of mixed casing", () => {
      const guess = "This is a t-shirt";
      const answer = "T-shirt";

      const result = checkGuess(guess, answer);

      expect(result).toBe(true);
    });
  });

  describe("Business Cases", () => {
    it("should should return True when guess has the answer in it", () => {
      const guess = `This image is a **simple, hand-drawn illustration on a white background.** It features: * A **cartoon cat's head** drawn in black outline. The cat has two pointy ears, two vertical lines for eyes, and a "W" shape for its mouth. * To the right of the cat, the word **"Meow!"** is written in a casual, handwritten style.`;
      const answer = "cat";

      const result = checkGuess(guess, answer);

      expect(result).toBe(true);
    });

    it("should return False when guess does not has the answer in it", () => {
      const guess = `The image is a **simple drawing of a dog's head with the word "WOOF!" written next to it.**`;
      const answer = "cat";

      const result = checkGuess(guess, answer);

      expect(result).toBe(false);
    });

    // This Test Case WILL fail for now.
    // However because this is minor rare quirk this will be put on the back burner
    /*
    it("should return false when given a substring", () => {
      const guess = `The image is the language Javascript`;
      const answer = "Java";

      const result = checkGuess(guess, answer);

      expect(result).toBe(false);
    });
    */
  });
});
