export interface ReqFormData {
  fullName: string;
  email: string;
  issueType: string;
  tags: string[]; // "ui" | "backend" | "performance" | "minor" | "major" | "critical"
  steps: { step: string }[];
}

export interface ReqFormState {
  data: ReqFormData;
}
