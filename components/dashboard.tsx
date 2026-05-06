"use client";

import { Activity, Bot, CheckCircle2, FileDown, FileText, History, LockKeyhole, Mic, Paperclip, Search, ShieldCheck, Sparkles, UsersRound, type LucideIcon } from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";
import { draftSections, mermaidTemplate, sampleProcesses } from "@/lib/mock-data";
import { roles } from "@/lib/types";
import { MermaidPreview } from "@/components/mermaid-preview";

const statusStyles = {
  Draft: "bg-amber-50 text-amber-700 border-amber-200",
  "In review": "bg-blue-50 text-blue-700 border-blue-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Archived: "bg-slate-100 text-slate-600 border-slate-200"
};

export function Dashboard() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(18,166,166,0.16),_transparent_34%),linear-gradient(180deg,#fbfaf7_0%,#f4f8fb_100%)] text-sifo-ink">
      <section className="section-grid relative px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-12 flex items-center justify-between rounded-full border border-white/70 bg-white/75 px-4 py-3 shadow-soft backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sifo-blue text-sm font-bold text-white">Si</div>
              <div>
                <p className="text-sm font-semibold">SIFo Medical</p>
                <p className="text-xs text-slate-500">Internal Process Hub</p>
              </div>
            </div>
            <div className="hidden items-center gap-2 text-sm text-slate-500 md:flex">
              <LockKeyhole className="h-4 w-4" /> Supabase Auth · Internal domains only
            </div>
            <Button variant="secondary">Sign in</Button>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Badge className="mb-5"><Sparkles className="mr-1 h-3.5 w-3.5" /> AI drafts, humans approve</Badge>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
                A governed process database for every SIFo team.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Build, review, approve, export, and search SOPs across Austria, Spain, and Singapore with role-based access, protected versions, and AI assistance over approved knowledge.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button><Mic className="h-4 w-4" /> Start voice-to-SOP</Button>
                <Button variant="secondary"><Search className="h-4 w-4" /> Search library</Button>
              </div>
            </div>
            <Card className="glass-panel">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Live governance snapshot</p>
                  <h2 className="text-2xl font-semibold">Process release board</h2>
                </div>
                <ShieldCheck className="h-9 w-9 text-sifo-teal" />
              </div>
              <div className="space-y-3">
                {sampleProcesses.map((process) => (
                  <div key={process.id} className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-sifo-blue">{process.id} · v{process.version}</p>
                        <h3 className="mt-1 font-semibold">{process.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{process.owner} · {process.region} · Updated {process.updatedAt}</p>
                      </div>
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[process.status]}`}>{process.status}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {process.tags.map((tag) => <Badge key={tag} className="bg-white">{tag}</Badge>)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <Feature icon={UsersRound} title="Role-based access" text="Admin, Author, Reviewer, Approver, and Viewer permissions separate drafting, review, approval, and read-only knowledge access." />
          <Feature icon={History} title="Version protection" text="Approved SOPs are immutable releases. Changes create new draft versions with full revision history and approval trails." />
          <Feature icon={Bot} title="Approved-process chat" text="The AI assistant is scoped to approved processes and the internal knowledge base, with source-aware answers and no approval authority." />
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-sifo-mint p-3 text-sifo-blue"><Mic className="h-6 w-6" /></div>
              <div>
                <p className="text-sm text-slate-500">Voice workflow</p>
                <h2 className="text-2xl font-semibold">Push-to-talk SOP creation</h2>
              </div>
            </div>
            <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Recording process description</span>
                <span className="flex items-center gap-2 text-xs text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-300" /> Ready</span>
              </div>
              <div className="my-8 flex items-center justify-center gap-1">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span key={i} className="w-1 rounded-full bg-sifo-teal" style={{ height: `${18 + ((i * 11) % 52)}px` }} />
                ))}
              </div>
              <Button className="w-full bg-white text-slate-950 hover:bg-slate-100"><Mic className="h-4 w-4" /> Hold to record</Button>
            </div>
            <ol className="mt-6 space-y-3 text-sm text-slate-600">
              {[
                "Transcribe user recording with OpenAI speech-to-text.",
                "Generate SOP sections and Mermaid flowchart draft.",
                "Route to Reviewer, then Approver for controlled release."
              ].map((item, index) => (
                <li key={item} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sifo-mint text-xs font-bold text-sifo-blue">{index + 1}</span>{item}</li>
              ))}
            </ol>
          </Card>

          <Card>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Process editor</p>
                <h2 className="text-2xl font-semibold">Structured SOP draft</h2>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary"><FileDown className="h-4 w-4" /> PDF</Button>
                <Button variant="secondary"><FileText className="h-4 w-4" /> Word</Button>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {draftSections.map((section) => (
                <div key={section.id} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <h3 className="font-semibold">{section.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{section.content}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <div className="mb-5 flex items-center gap-3">
              <Activity className="h-6 w-6 text-sifo-teal" />
              <h2 className="text-2xl font-semibold">Mermaid flowchart generation</h2>
            </div>
            <MermaidPreview chart={mermaidTemplate} />
          </Card>
          <Card>
            <div className="mb-5 flex items-center gap-3">
              <Paperclip className="h-6 w-6 text-sifo-teal" />
              <h2 className="text-2xl font-semibold">Attachments & knowledge</h2>
            </div>
            <div className="grid gap-3 text-sm text-slate-600">
              {["PDF evidence", "Images and diagrams", "Training videos", "Excel workbooks", "Word forms", "Controlled links"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> {item}</div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-sifo-mint p-4 text-sm text-sifo-blue">
              Approved documents feed search and AI chat. Drafts stay excluded until release.
            </div>
          </Card>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white/70 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
          <span>Roles: {roles.join(" · ")}</span>
          <span>Designed for SIFo teams in Austria, Spain, and Singapore.</span>
        </div>
      </section>
    </main>
  );
}

function Feature({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-glow">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sifo-mint text-sifo-blue"><Icon className="h-6 w-6" /></div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </Card>
  );
}
