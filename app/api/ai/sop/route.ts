import { NextResponse } from "next/server";
import { fallbackSopDraft, getOpenAIClient } from "@/lib/ai";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { transcript?: string; prompt?: string };
  const source = body.transcript ?? body.prompt ?? "";
  const client = getOpenAIClient();

  if (!client) {
    return NextResponse.json(fallbackSopDraft(source));
  }

  const completion = await client.chat.completions.create({
    model: env.OPENAI_SOP_MODEL,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You create draft SOPs for an internal medical process hub. AI may draft only and must state that human review and approval are required. Return JSON with title, sections, mermaid, and governanceNote. Use sections: Purpose, Scope, Responsibilities, Definitions, Inputs, Process Steps, Risks & Controls, Outputs, Records, Flowchart, Revision History."
      },
      { role: "user", content: source }
    ]
  });

  const content = completion.choices[0]?.message.content;
  if (!content) {
    return NextResponse.json(fallbackSopDraft(source));
  }

  try {
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json(fallbackSopDraft(source));
  }
}
