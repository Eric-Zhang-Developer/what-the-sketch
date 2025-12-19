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

  describe("Unhappy Paths", () => {
    it("should return an error when route.ts fails", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ error: "You have exceeded your daily limit." }), {
          status: 429,
        })
      );
      const result = await GeminiAPICall("fake-base64-data");
      expect(result).toEqual({ success: false, error: "You have exceeded your daily limit." });
    });

    it("should return an error when network fails / JSON is failed to parse", async () => {
      vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Failed to Fetch"));
      const result = await GeminiAPICall("fake-base64-data");
      expect(result).toEqual({ success: false, error: "Failed to Fetch" });
    });

    it("should handle non Error throws gracefully", async () => {
      vi.spyOn(globalThis, "fetch").mockRejectedValue(67);
      const result = await GeminiAPICall("fake-base64-data");
      expect(result).toEqual({ success: false, error: "An unexpected error occurred" });
    });
  });
});
