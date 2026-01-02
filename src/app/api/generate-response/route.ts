import { NextResponse, NextRequest } from "next/server";
import { ipAddress } from "@vercel/functions";
import { GoogleGenAI } from "@google/genai";
import { checkRateLimit } from "@/utils/check-rate-limit";
import z from "zod";
import { OpenRouter } from "@openrouter/sdk";

export async function POST(request: NextRequest) {
  // --- IP rate limiting check ---
  const ip = ipAddress(request) ?? "127.0.0.1";

  const { limited } = await checkRateLimit(ip);

  if (limited) {
    return NextResponse.json({ error: "You have exceeded your daily limit." }, { status: 429 });
  }

  // --- Request Parsing and Validation --
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  // Zod Validation for request
  const base64Regex = /^[A-Za-z0-9+/]+=*$/;
  const requestSchema = z.object({
    image: z
      .string()
      .min(1, "Image data is required")
      .max(5_000_000, "Image exceeds size limit")
      .regex(base64Regex, "Invalid base64 format"),
  });
  const result = requestSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const image = `data:image/png;base64,${result.data.image}`;

  // --- Gemini API Call ---
  try {
    // To-do: For future reference for changeable prompts also feed a textPrompt. variable to contents

    const openRouter = new OpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY!,
    });

    const response = await openRouter.chat.send({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are an enthusiastic and slightly sassy AI game partner in a Pictionary-style game. Your goal is to analyze a user's drawing and guess what it is. 
                    First, provide a playful, and slightly roasting commentary on the drawing's quality (keep it lighthearted and fun). 
                    Then, you MUST end your response with your final guess in the following format, and nothing else after it: " My guess is **WORD**". `,
            },
            {
              type: "image_url",
              imageUrl: {
                url: image,
              },
            },
          ],
        },
      ],
      stream: false,
    });

    // Return only text for now all the metadata I don't want to expose to client side
    return NextResponse.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: `AI API service unavailable` }, { status: 500 });
  }
}
