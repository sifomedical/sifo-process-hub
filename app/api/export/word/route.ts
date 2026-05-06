import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "queued",
    format: "docx",
    note: "Word export is feasible via a DOCX generation service or server-side template pipeline."
  });
}
