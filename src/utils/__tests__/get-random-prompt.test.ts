import { describe, it, expect } from "vitest";
import { getRandomPrompt } from "../get-random-prompt";
import { DRAWING_PROMPTS } from "../drawing-prompts";
import { PromptCategory } from "../types";

describe("Core Logic", () => {
  it("should return a random prompt that is in drawing prompts", () => {
    const prompt = getRandomPrompt(PromptCategory.Default);
    expect(DRAWING_PROMPTS.some((p) => p.name === prompt)).toBe(true);
  });

  it("should return a prompt from the specified category", () => {
    const prompt = getRandomPrompt(PromptCategory.Animals);
    const found = DRAWING_PROMPTS.find((p) => p.name === prompt);

    expect(found).toBeDefined();
    expect(found?.category).toBe(PromptCategory.Animals);
  });
});
