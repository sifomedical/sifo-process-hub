import { ProcessDocument, sopSections } from "@/lib/types";

export const sampleProcesses: ProcessDocument[] = [
  {
    id: "SOP-QA-014",
    title: "Supplier qualification and re-approval",
    owner: "Quality Assurance",
    region: "Global",
    status: "Approved",
    version: "2.1",
    updatedAt: "2026-04-22",
    approver: "Maria Keller",
    tags: ["QA", "Suppliers", "ISO 13485"]
  },
  {
    id: "SOP-OPS-031",
    title: "Complaint intake and triage",
    owner: "Operations",
    region: "Austria",
    status: "In review",
    version: "1.0-draft.4",
    updatedAt: "2026-05-02",
    approver: "Pending",
    tags: ["Operations", "Post-market", "Customer care"]
  },
  {
    id: "SOP-REG-008",
    title: "Regulatory submission readiness checklist",
    owner: "Regulatory Affairs",
    region: "Singapore",
    status: "Draft",
    version: "0.3",
    updatedAt: "2026-05-04",
    approver: "Pending",
    tags: ["Regulatory", "MDR", "HSA"]
  }
];

export const draftSections = sopSections.map((title, index) => ({
  id: title.toLowerCase().replaceAll(" ", "-"),
  title,
  content:
    index === 9
      ? "Mermaid flowchart generated from approved process steps."
      : "AI-assisted draft text with human-authored edits required before review."
}));

export const mermaidTemplate = `flowchart TD
  A[Need to create or update a process] --> B{Role can author?}
  B -- No --> C[Request access from Admin]
  B -- Yes --> D[Record voice description or write draft]
  D --> E[AI structures SOP draft]
  E --> F[Author reviews sections and attachments]
  F --> G[Reviewer checks accuracy and controls]
  G --> H{Approver decision}
  H -- Changes required --> F
  H -- Approved --> I[Version locked and released]
  I --> J[Available in process library and AI knowledge chat]`;
