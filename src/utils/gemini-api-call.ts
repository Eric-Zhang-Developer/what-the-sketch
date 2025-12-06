export default async function GeminiAPICall(rawBase64Data: string) {
  try {
    const response = await fetch("/api/generate-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: rawBase64Data }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} `);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
