export const roles = ["Admin", "Author", "Reviewer", "Approver", "Viewer"] as const;
export type Role = (typeof roles)[number];

export const processStatuses = ["Draft", "In review", "Approved", "Archived"] as const;
export type ProcessStatus = (typeof processStatuses)[number];

export type ProcessSection = {
  id: string;
  title: string;
  content: string;
};

export type ProcessDocument = {
  id: string;
  title: string;
  owner: string;
  region: "Austria" | "Spain" | "Singapore" | "Global";
  status: ProcessStatus;
  version: string;
  updatedAt: string;
  approver: string;
  tags: string[];
};

export const sopSections = [
  "Purpose",
  "Scope",
  "Responsibilities",
  "Definitions",
  "Inputs",
  "Process Steps",
  "Risks & Controls",
  "Outputs",
  "Records",
  "Flowchart",
  "Revision History"
] as const;
