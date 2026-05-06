"use client";

import { useEffect, useId, useState } from "react";

export function MermaidPreview({ chart }: { chart: string }) {
  const id = useId().replaceAll(":", "");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function renderChart() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({ startOnLoad: false, theme: "base", securityLevel: "strict" });
        const { svg: rendered } = await mermaid.render(`sifo-${id}`, chart);

        if (mounted) {
          setSvg(rendered);
          setError("");
        }
      } catch {
        if (mounted) {
          setError("Flowchart preview could not be rendered in this browser session.");
        }
      }
    }

    void renderChart();

    return () => {
      mounted = false;
    };
  }, [chart, id]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4">
      {error ? <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-700">{error}</p> : null}
      {!error && svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : null}
      {!error && !svg ? <div className="h-40 animate-pulse rounded-xl bg-slate-100" /> : null}
    </div>
  );
}
