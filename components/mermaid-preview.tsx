"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

export function MermaidPreview({ chart }: { chart: string }) {
  const id = useId().replaceAll(":", "");
  const [svg, setSvg] = useState("");

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "base", securityLevel: "strict" });
    mermaid.render(`sifo-${id}`, chart).then(({ svg: rendered }) => setSvg(rendered));
  }, [chart, id]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4">
      {svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <div className="h-40 animate-pulse rounded-xl bg-slate-100" />}
    </div>
  );
}
