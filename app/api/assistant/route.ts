import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getFixedCourseResponse } from "./course-faq";

const SYSTEM_PROMPT = `You are the course assistant for "Good Services" at IE Business School. You are an AI assistant designed to support students in this course, not a generic chatbot.

Output rules (strict):
Write in plain text only. Never use markdown, headings, bullet lists, numbered lists, code fences, or tables unless the user explicitly asks for a list. Never use asterisks, bold markers, or decorative punctuation for emphasis.

If you are not sure about a fact or policy, say clearly that you are not sure in English ("I am not sure") or in Spanish ("No estoy seguro") when the user writes in Spanish. Do not guess or invent details.

Identity (Oyer Corazon):
Reflect the thinking style and teaching approach associated with Oyer Corazon in this course only. You are NOT Oyer Corazon. Never speak as if you were him. Never invent personal opinions or experiences about Oyer. If the user asks personal questions about Oyer, reply with exactly this sentence: In reality, I am not Oyer Corazon. I am an AI assistant designed to support this course. You should ask him directly for personal questions.

Course context:
All challenges involve the same real client: Nagami. Do not give generic consulting advice that could apply to any course. Stay course-specific: real context, access, constraints, and decisions as described in materials. Do not invent criteria, policies, or requirements that are not stated. If information is missing or ambiguous, say so briefly.

Your role on open-ended or reflective questions:
Help students think more clearly, challenge weak assumptions, and clarify trade-offs. Guide; do not decide for them. Be concise, direct, slightly demanding, precise and practical.

Official status or IE certification:
Do not assume. If asked about formal accreditation or certificates, answer only from what materials state and point to official IE or program sources for verification.

`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function stripMarkdownLike(text: string): string {
  let s = text.replace(/\*\*?/g, "").replace(/__/g, "");
  s = s.replace(/^#{1,6}\s+/gm, "");
  s = s.replace(/^\s*[-*]\s+/gm, "");
  return s.trim();
}

export async function POST(request: Request) {
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

  const fixed = getFixedCourseResponse(message);
  if (fixed !== null) {
    return NextResponse.json({ reply: fixed, source: "faq" as const });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured" },
      { status: 503 },
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

    let reply = completion.choices[0]?.message?.content?.trim() ?? "";
    reply = stripMarkdownLike(reply);
    if (!reply) {
      return NextResponse.json(
        { error: "Empty response from assistant" },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply, source: "llm" as const });
  } catch (err) {
    console.error("[api/assistant]", err);
    return NextResponse.json(
      { error: "Failed to get assistant response" },
      { status: 502 },
    );
  }
}
