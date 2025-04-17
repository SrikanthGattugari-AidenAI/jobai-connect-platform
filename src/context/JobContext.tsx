
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job } from '@/types/job';

// Mock data for jobs
const mockJobs: Job[] = [
  {
    id: "job-1",
    employerId: "employer-1",
    title: "Frontend Developer",
    company: "TechCorp",
    category: "Software Development",
    role: "Frontend Developer",
    description: "We're looking for a skilled frontend developer to join our team and help build responsive web applications using React and TypeScript.",
    location: "San Francisco, California",
    isRemote: false,
    city: "San Francisco",
    country: "USA",
    employmentType: "full-time",
    experienceLevel: "mid",
    salary: {
      isDisclosed: true,
      min: 90000,
      max: 120000,
      currency: "USD"
    },
    responsibilities: [
      "Develop user-facing features using React.js",
      "Build reusable components and libraries for future use",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with backend developers and designers"
    ],
    requirements: [
      "3+ years of experience with React.js",
      "Strong proficiency in JavaScript and TypeScript",
      "Experience with responsive design",
      "Understanding of Redux and state management principles"
    ],
    postedDate: "2025-03-01",
    companyLogo: "https://placehold.co/100x100?text=TC",
    applicationDeadline: "2025-05-01"
  },
  {
    id: "job-2",
    employerId: "employer-2",
    title: "Backend Engineer",
    company: "DataSystems Inc.",
    category: "Software Development",
    role: "Backend Engineer",
    description: "Join our backend team to design and implement scalable APIs and microservices architecture for our growing platform.",
    location: "Remote",
    isRemote: true,
    city: "Any",
    country: "Any",
    employmentType: "full-time",
    experienceLevel: "senior",
    salary: {
      isDisclosed: true,
      min: 120000,
      max: 160000,
      currency: "USD"
    },
    responsibilities: [
      "Design and implement backend services using Node.js",
      "Optimize database queries and data structures",
      "Create and maintain API documentation",
      "Work with DevOps to ensure smooth deployment processes"
    ],
    requirements: [
      "5+ years of experience in backend development",
      "Strong knowledge of Node.js and Express",
      "Experience with databases (MongoDB, PostgreSQL)",
      "Understanding of microservices architecture"
    ],
    postedDate: "2025-03-10",
    companyLogo: "https://placehold.co/100x100?text=DS",
    applicationDeadline: "2025-05-15"
  },
  {
    id: "job-3",
    employerId: "employer-3",
    title: "UX/UI Designer",
    company: "CreativeMinds",
    category: "Design",
    role: "UX/UI Designer",
    description: "We're looking for a talented UX/UI Designer to create amazing user experiences for our clients' digital products.",
    location: "Berlin, Germany",
    isRemote: false,
    city: "Berlin",
    country: "Germany",
    employmentType: "full-time",
    experienceLevel: "mid",
    salary: {
      isDisclosed: false
    },
    responsibilities: [
      "Create user flows, wireframes, and prototypes",
      "Design intuitive and visually appealing interfaces",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs"
    ],
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in Figma, Sketch, or similar tools",
      "Strong portfolio demonstrating your design process",
      "Understanding of accessibility and usability principles"
    ],
    postedDate: "2025-03-15",
    companyLogo: "https://placehold.co/100x100?text=CM",
    applicationDeadline: "2025-05-15"
  },
  {
    id: "job-4",
    employerId: "employer-4",
    title: "DevOps Engineer",
    company: "CloudSolutions",
    category: "DevOps",
    role: "DevOps Engineer",
    description: "Join our team to build and maintain our cloud infrastructure and deployment pipelines.",
    location: "Remote",
    isRemote: true,
    city: "Any",
    country: "Any",
    employmentType: "full-time",
    experienceLevel: "senior",
    salary: {
      isDisclosed: true,
      min: 110000,
      max: 150000,
      currency: "USD"
    },
    responsibilities: [
      "Manage AWS cloud infrastructure",
      "Implement CI/CD pipelines",
      "Monitor system performance and troubleshoot issues",
      "Ensure security best practices are followed"
    ],
    requirements: [
      "4+ years of experience in DevOps",
      "Strong knowledge of AWS or similar cloud platforms",
      "Experience with Docker and Kubernetes",
      "Proficiency in scripting languages (Python, Bash)"
    ],
    postedDate: "2025-03-20",
    companyLogo: "https://placehold.co/100x100?text=CS",
    applicationDeadline: "2025-05-20"
  },
  {
    id: "job-5",
    employerId: "employer-5",
    title: "Data Scientist",
    company: "AnalyticsPro",
    category: "Data Science",
    role: "Data Scientist",
    description: "Help us build ML models and extract valuable insights from our vast datasets.",
    location: "New York, USA",
    isRemote: false,
    city: "New York",
    country: "USA",
    employmentType: "full-time",
    experienceLevel: "mid",
    salary: {
      isDisclosed: true,
      min: 100000,
      max: 130000,
      currency: "USD"
    },
    responsibilities: [
      "Build and train machine learning models",
      "Process and analyze large datasets",
      "Create data visualizations and reports",
      "Work with stakeholders to understand business requirements"
    ],
    requirements: [
      "Master's degree in Data Science, Statistics, or related field",
      "Experience with Python and data science libraries",
      "Knowledge of SQL and database systems",
      "Experience with machine learning frameworks"
    ],
    postedDate: "2025-03-25",
    companyLogo: "https://placehold.co/100x100?text=AP",
    applicationDeadline: "2025-05-25"
  }
];

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
