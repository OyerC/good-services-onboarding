import OpenAI from "openai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a course assistant for a course called Good Services at IE Business School.

Your role:
- help students understand the course
- guide them in choosing a challenge based on real-world access, not preference
- explain the Magic Wand as a personal development opportunity

Style:
- concise
- clear
- slightly challenging (not too friendly)
- practical and reflective
`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured" },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const message =
    body &&
    typeof body === "object" &&
    body !== null &&
    "message" in body &&
    typeof (body as { message: unknown }).message === "string"
      ? (body as { message: string }).message.trim()
      : "";

  if (!message) {
    return NextResponse.json(
      { error: 'Missing or empty "message" field' },
      { status: 400 },
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!reply) {
      return NextResponse.json(
        { error: "Empty response from assistant" },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[api/assistant]", err);
    return NextResponse.json(
      { error: "Failed to get assistant response" },
      { status: 502 },
    );
  }
}
