import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "queued",
    format: "pdf",
    note: "PDF export placeholder for controlled SOP releases."
  });
}
