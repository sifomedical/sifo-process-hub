import { NextResponse } from "next/server";
import { getOpenAIClient } from "@/lib/ai";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  const client = getOpenAIClient();
  const formData = await request.formData().catch(() => null);
  const audio = formData?.get("audio");

  if (!client || !(audio instanceof File)) {
    return NextResponse.json({
      transcript: "Placeholder transcript endpoint. Add OPENAI_API_KEY and post multipart form data with an audio file named `audio`.",
      status: "draft_only"
    });
  }

  const transcription = await client.audio.transcriptions.create({
    file: audio,
    model: env.OPENAI_TRANSCRIPTION_MODEL
  });

  return NextResponse.json({ transcript: transcription.text, status: "transcribed" });
}
