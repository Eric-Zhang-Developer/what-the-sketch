import { describe, it, expect } from "vitest";
import { getRandomPrompt } from "../get-random-prompt";
import { DRAWING_PROMPTS } from "../drawing-prompts";

describe("Core Logic", () => {
  it("should return a random prompt that is in drawing prompts", () => {
    const prompt = getRandomPrompt();
    expect(DRAWING_PROMPTS).toContain(prompt);
  });
});
