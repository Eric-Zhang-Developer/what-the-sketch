import { describe, expect, it } from "vitest";
import { buildAIGuessPrompt } from "../ai-personality-prompts";

describe("AI Personality Prompts", () => {
  it("includes the shared final guess contract for every personality", () => {
    expect(buildAIGuessPrompt("Default")).toContain('My guess is **WORD**');
    expect(buildAIGuessPrompt("Caveman")).toContain('My guess is **WORD**');
    expect(buildAIGuessPrompt("Haiku Poet")).toContain('My guess is **WORD**');
  });
});
