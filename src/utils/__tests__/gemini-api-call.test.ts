import { success } from "zod";
import GeminiAPICall from "../gemini-api-call";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Gemini API Call Function Tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  describe("Happy Path / Success", () => {
    it("should return the response data when API works", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ response: "It's a cat!" }), { status: 200 })
      );
      const result = await GeminiAPICall("fake-base64-data");
      expect(result).toEqual({ success: true, data: { response: "It's a cat!" } });
    });
  });
});
