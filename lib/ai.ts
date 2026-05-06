import OpenAI from "openai";
import { env } from "@/lib/env";
import { mermaidTemplate } from "@/lib/mock-data";
import { sopSections } from "@/lib/types";

export function getOpenAIClient() {
  if (!env.OPENAI_API_KEY) {
    return null;
  }

  return new OpenAI({ apiKey: env.OPENAI_API_KEY });
}

export function fallbackSopDraft(prompt: string) {
  return {
    title: "AI-assisted SOP draft",
    sections: sopSections.map((section) => ({
      title: section,
      content:
        section === "Flowchart"
          ? mermaidTemplate
          : `Draft ${section.toLowerCase()} generated from: ${prompt.slice(0, 180) || "voice transcript"}. Human validation is required before review.`
    })),
    mermaid: mermaidTemplate,
    governanceNote: "AI created a draft only. Reviewer and Approver roles must validate and release a protected version."
  };
}
