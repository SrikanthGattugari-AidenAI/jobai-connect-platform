
export type ApplicationStatus = "Applied" | "Interviewed" | "Rejected" | "Hired" | "Shortlisted";

export interface JobApplication {
  application_id: string;
  job_id: string;
  status: string;
  applied_on: string;
  current_stage: string;
  fitment_score: number;
  last_updated: string;
  job_title: string | null;
}

export interface JobApplicationsMap {
  Applied: JobApplication[];
  Interviewed: JobApplication[];
  Rejected: JobApplication[];
  Hired: JobApplication[];
  Shortlisted: JobApplication[];
}
