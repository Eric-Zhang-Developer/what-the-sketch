import { ApiResult } from "./types";

export default async function GeminiAPICall(rawBase64Data: string): Promise<ApiResult> {
  try {
    const response = await fetch("/api/generate-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: rawBase64Data }),
    });

    // HTTP error response
    if (!response.ok) {
      const result = await response.json();
      return { success: false, error: result.error };
    }

    // API success response
    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    // Network error and JSON parsing error response
    console.error("Network/parsing error:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      // Generic fallback error response
      return { success: false, error: "An unexpected error occurred" };
    }
  }
}
