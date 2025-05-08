
import React, { createContext, useContext, useState, useEffect } from "react";
import { JobApplicationsMap } from "@/types/application";

// Mock data
const mockJobApplications: JobApplicationsMap = {
  Applied: [
    {
      application_id: "app-1",
      job_id: "job-1",
      status: "Applied",
      applied_on: "2025-05-08T18:08:21.341007",
      current_stage: "Application Submitted",
      fitment_score: 85,
      last_updated: "2025-05-08T18:08:21.341007",
      job_title: "Frontend Developer"
    },
    {
      application_id: "app-2",
      job_id: "job-2",
      status: "Applied",
      applied_on: "2025-05-07T14:22:10.341007",
      current_stage: "Application Submitted",
      fitment_score: 78,
      last_updated: "2025-05-07T14:22:10.341007",
      job_title: "React Developer"
    }
  ],
  Interviewed: [
    {
      application_id: "app-3",
      job_id: "job-3",
      status: "Interviewed",
      applied_on: "2025-04-25T10:15:33.341007",
      current_stage: "Technical Interview",
      fitment_score: 92,
      last_updated: "2025-05-05T16:30:00.341007",
      job_title: "Full Stack Developer"
    }
  ],
  Rejected: [
    {
      application_id: "app-4",
      job_id: "job-4",
      status: "Rejected",
      applied_on: "2025-04-15T09:45:12.341007",
      current_stage: "Application Rejected",
      fitment_score: 65,
      last_updated: "2025-04-22T11:20:15.341007",
      job_title: "DevOps Engineer"
    }
  ],
  Hired: [
    {
      application_id: "app-5",
      job_id: "job-5",
      status: "Hired",
      applied_on: "2025-03-20T13:12:45.341007",
      current_stage: "Offer Accepted",
      fitment_score: 95,
      last_updated: "2025-04-10T14:30:00.341007",
      job_title: "Senior Web Developer"
    }
  ],
  Shortlisted: [
    {
      application_id: "app-6",
      job_id: "job-6",
      status: "Shortlisted",
      applied_on: "2025-05-01T11:22:33.341007",
      current_stage: "Shortlisted for Interview",
      fitment_score: 88,
      last_updated: "2025-05-06T09:15:22.341007",
      job_title: "UI Developer"
    },
    {
      application_id: "app-7",
      job_id: "job-7",
      status: "Shortlisted",
      applied_on: "2025-04-28T16:18:20.341007",
      current_stage: "Shortlisted for Interview",
      fitment_score: 82,
      last_updated: "2025-05-04T10:45:12.341007",
      job_title: "Frontend Engineer"
    }
  ]
};

interface JobApplicationContextType {
  applications: JobApplicationsMap;
  isLoading: boolean;
}

const JobApplicationContext = createContext<JobApplicationContextType | undefined>(undefined);

export const JobApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<JobApplicationsMap>(mockJobApplications);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, you would fetch data from an API here
    // For now, we're using our mock data
    setApplications(mockJobApplications);
    setIsLoading(false);
  }, []);

  return (
    <JobApplicationContext.Provider value={{ applications, isLoading }}>
      {children}
    </JobApplicationContext.Provider>
  );
};

export const useJobApplications = () => {
  const context = useContext(JobApplicationContext);
  if (context === undefined) {
    throw new Error("useJobApplications must be used within a JobApplicationProvider");
  }
  return context;
};
