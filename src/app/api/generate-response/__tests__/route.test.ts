import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "../route";
import { NextRequest } from "next/server";
import { checkRateLimit } from "@/utils/check-rate-limit";
import { OpenRouter } from "@openrouter/sdk";
// Mock rate limiter
vi.mock("@/utils/check-rate-limit", () => ({
  checkRateLimit: vi.fn().mockResolvedValue({ limited: false }),
}));

const AIAnswer = "This image is a cat";

// Mock OpenRouter SDK
const mockSend = vi.fn();
vi.mock("@openrouter/sdk", () => ({
  OpenRouter: vi.fn().mockImplementation(() => ({
    chat: {
      send: mockSend,
    },
  })),
}));

describe("POST /api/generate-response", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to the API Working every test (needed for the test where OpenRouter fails)
    mockSend.mockResolvedValue({
      choices: [{ message: { content: AIAnswer } }],
    });
  });
  describe("when rate limit passes", () => {
    describe("and request is valid", () => {
      it("returns 200 and the AI response", async () => {
        const request = new NextRequest("http://localhost/api/generate-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: "SomeBase64data" }),
        });
        const response = await POST(request);
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json.response).toBe(AIAnswer);
      });
    });
    describe("and request is empty", () => {
      it("returns 400", async () => {
        const request = new NextRequest("http://localhost/api/generate-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: "" }),
        });
        const response = await POST(request);
        const json = await response.json();

        expect(response.status).toBe(400);
        expect(json.error).toBe("Invalid request");
        expect(OpenRouter).not.toHaveBeenCalled();
      });
    });
    describe("and request is invalid base64 format", () => {
      it("returns 400", async () => {
        const request = new NextRequest("http://localhost/api/generate-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: "  " }),
        });
        const response = await POST(request);
        const json = await response.json();

        expect(response.status).toBe(400);
        expect(json.error).toBe("Invalid request");
        expect(OpenRouter).not.toHaveBeenCalled();
      });
    });
    describe("and request is too large", () => {
      const hugeImage = "A".repeat(5_000_001); // 5MB + 1 character
      it("returns 400", async () => {
        const request = new NextRequest("http://localhost/api/generate-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: hugeImage }),
        });
        const response = await POST(request);
        const json = await response.json();

        expect(response.status).toBe(400);
        expect(json.error).toBe("Invalid request");
        expect(OpenRouter).not.toHaveBeenCalled();
      });
    });
    describe("and request is invalid JSON", () => {
      it("returns 400", async () => {
        const request = new NextRequest("http://localhost/api/generate-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "INVALID JSON",
        });
        const response = await POST(request);
        const json = await response.json();

        expect(response.status).toBe(400);
        expect(json.error).toBe("Invalid JSON");
        expect(OpenRouter).not.toHaveBeenCalled();
      });
    });
    describe("and LLM Provider Fails", () => {
      it("returns 500", async () => {
        // Mock OpenRouter Error
        mockSend.mockRejectedValue(new Error("OpenRouter is down!"));
        // Suppress annoying console.error
        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        const request = new NextRequest("http://localhost/api/generate-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: "SomeBase64data" }),
        });
        const response = await POST(request);
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json.error).toBe("AI API service unavailable");
        expect(OpenRouter).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith("Gemini API error:", expect.any(Error));
      });
    });
  });

  describe("when rate limit is exceeded", () => {
    describe("and request is valid", () => {
      it("returns 429", async () => {
        vi.mocked(checkRateLimit).mockResolvedValue({ limited: true });
        const request = new NextRequest("http://localhost/api/generate-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: "SomeBase64data" }),
        });
        const response = await POST(request);
        const json = await response.json();

        expect(response.status).toBe(429);
        expect(json.error).toBe("You have exceeded your daily limit.");
        expect(OpenRouter).not.toHaveBeenCalled();
      });
    });
  });
});
