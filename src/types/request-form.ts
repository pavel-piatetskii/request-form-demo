export interface ReqFormState {
  fullName: string;
  email: string;
  issueType: string;
  tags: string[]; // "ui" | "backend" | "performance" | "minor" | "major" | "critical"
  steps: { step: string }[];
}
