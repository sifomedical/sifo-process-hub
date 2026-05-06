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


## Vercel deployment

1. Import the repository as a Next.js project.
2. Use Node.js 20 or 22. The project declares `>=20 <23` in `package.json`.
3. Configure the environment variables from `.env.example` in Vercel. Supabase and OpenAI values are optional for the static UI to build, but required for live auth and AI workflows.
4. Build command: `npm run build`; install command: `npm install`. The repository pins npm 10 for compatibility with Vercel Node.js 20/22 runtimes.

The Mermaid renderer is loaded dynamically in the browser so the Vercel server build does not evaluate browser-only charting code during prerendering.
