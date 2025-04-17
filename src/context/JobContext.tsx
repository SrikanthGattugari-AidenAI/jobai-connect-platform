
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job } from '@/types/job';
import { mockJobs } from '@/lib/data';

// Types
type JobContextType = {
  jobs: Job[];
  isLoading: boolean;
  saveJob: (jobId: string, userId: string) => Promise<void>;
  unsaveJob: (jobId: string, userId: string) => Promise<void>;
  getSavedJobs: (userId: string) => string[];
};

// Create context
const JobContext = createContext<JobContextType | undefined>(undefined);

// Provider component
export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState<Record<string, string[]>>({});

  // Fetch jobs (simulated)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setJobs(mockJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const saveJob = async (jobId: string, userId: string) => {
    // Here you would normally call an API to save the job
    setSavedJobs(prev => {
      const userSavedJobs = prev[userId] || [];
      return {
        ...prev,
        [userId]: [...userSavedJobs, jobId]
      };
    });
  };

  const unsaveJob = async (jobId: string, userId: string) => {
    // Here you would normally call an API to unsave the job
    setSavedJobs(prev => {
      const userSavedJobs = prev[userId] || [];
      return {
        ...prev,
        [userId]: userSavedJobs.filter(id => id !== jobId)
      };
    });
  };

  const getSavedJobs = (userId: string) => {
    return savedJobs[userId] || [];
  };

  return (
    <JobContext.Provider value={{ jobs, isLoading, saveJob, unsaveJob, getSavedJobs }}>
      {children}
    </JobContext.Provider>
  );
};

// Custom hook for using the job context
export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
