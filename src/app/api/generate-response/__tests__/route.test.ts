import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "../route";
import { NextRequest } from "next/server";
import { checkRateLimit } from "@/utils/check-rate-limit";
import { GoogleGenAI } from "@google/genai";
// Mock rate limiter
vi.mock("@/utils/check-rate-limit", () => ({
  checkRateLimit: vi.fn().mockResolvedValue({ limited: false }),
}));

const AIAnswer = "This image is a cat";

// Mock Google GenAI
vi.mock("@google/genai", () => ({
  GoogleGenAI: vi.fn().mockImplementation(() => ({
    models: {
      generateContent: vi.fn().mockResolvedValue({ text: AIAnswer }),
    },
  })),
}));

describe("POST /api/generate-response", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
        expect(GoogleGenAI).not.toHaveBeenCalled();
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
        expect(GoogleGenAI).not.toHaveBeenCalled();
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
        expect(GoogleGenAI).not.toHaveBeenCalled();
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
        expect(GoogleGenAI).not.toHaveBeenCalled();
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
        expect(GoogleGenAI).not.toHaveBeenCalled();
      });
    });
  });
});
