
export interface Job {
  id: string;
  employerId: string;
  title: string;
  company: string;
  category: string;
  role: string;
  description: string;
  location: string;
  isRemote: boolean;
  city: string;
  country: string;
  employmentType: "full-time" | "part-time" | "contract" | "freelance";
  experienceLevel: "entry" | "mid" | "senior" | "executive";
  salary: {
    isDisclosed: boolean;
    min?: number;
    max?: number;
    currency?: string;
  };
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
  companyLogo?: string;
  applicationDeadline: string;
}
