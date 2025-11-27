import { describe, it, expect, vi } from "vitest";
import { POST } from "../route";
import { NextRequest } from "next/server";

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
  describe("when rate limit passes", () => {
    describe("and request is valid", () => {
      it("returns the AI response", async () => {
        const request = new NextRequest("http://localhost/api/generate-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: "SomeBase64data" }),
        });

        const response = await POST(request);
        const json = await response.json();

        expect(response.status).toBe(200);
        console.log(json.response);
        expect(json.response).toBe(AIAnswer);
      });
    });
  });
});
