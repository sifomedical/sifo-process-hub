# SIFo Process Hub

Internal AI-powered process management web app for SIFo Medical teams in Austria, Spain, and Singapore.

## MVP capabilities

- Supabase Auth-ready login entry point with internal-domain positioning.
- Role model for Admin, Author, Reviewer, Approver, and Viewer.
- Process library, editor preview, version governance, attachments, search, PDF/Word export placeholders, and AI chat positioning.
- Voice-to-SOP workflow concept: push-to-talk transcript -> AI SOP draft -> Mermaid flowchart -> human review -> approval.
- Protected governance: AI can draft, but cannot approve; approved versions are intended to be immutable releases.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS with shadcn/ui-style primitives
- Supabase and Supabase Auth
- Mermaid.js
- OpenAI API-ready route boundaries
- Vercel-ready deployment

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and provide Supabase/OpenAI values when integrating live services.

## Database

Start from `supabase/schema.sql`. It defines roles, process status, process records, versions, attachments, audit events, and initial row-level security policies.
