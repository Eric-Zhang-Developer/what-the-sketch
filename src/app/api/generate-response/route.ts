import { NextResponse, NextRequest } from "next/server";
import { ipAddress } from "@vercel/functions";
import { GoogleGenAI } from "@google/genai";
import { checkRateLimit } from "@/utils/check-rate-limit";

// To-do write unit tests for this function
export async function POST(request: NextRequest) {
  // --- IP rate limiting check ---
  const ip = ipAddress(request) ?? "127.0.0.1";

  const { limited } = await checkRateLimit(ip);

  if (limited) {
    return NextResponse.json({ error: "You have exceeded your daily limit." }, { status: 429 });
  }

  try {
    // To-do: Although its probably a little overkill. Zod runtime validation here would be excellent
    const body = await request.json();
    const image = body.image;

    // To-do: For future reference for changeable prompts also feed a textPrompt. variable to contents
    const contents = [
      {
        inlineData: {
          mimeType: "image/png",
          data: image,
        },
      },
      {
        text: `You are an enthusiastic and slightly sassy AI game partner in a Pictionary-style game. Your goal is to analyze a user's drawing and guess what it is. 
        First, provide a playful, and slightly roasting commentary on the drawing's quality (keep it lighthearted and fun). 
        Then, you MUST end your response with your final guess in the following format, and nothing else after it: " My guess is **WORD**". `,
      },
    ];
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });
    // Return only text for now all the metadata I don't want to expose to client side
    return NextResponse.json({ response: response.text });
  } catch (error) {
    // To-do: Maybe more robust error handling?
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
