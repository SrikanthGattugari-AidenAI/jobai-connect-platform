
import React, { createContext, useContext, useState, useEffect } from "react";
import { Internship, Application } from "@/types";
import { mockInternships } from "@/lib/data";

interface InternshipContextType {
  internships: Internship[];
  applications: Application[];
  isLoading: boolean;
  getInternship: (id: string) => Internship | undefined;
  applyToInternship: (internshipId: string, application: Omit<Application, "id" | "appliedDate">) => Promise<void>;
  saveInternship: (internshipId: string, studentId: string) => Promise<void>;
  unsaveInternship: (internshipId: string, studentId: string) => Promise<void>;
  getSavedInternships: (studentId: string) => string[];
  getStudentApplications: (studentId: string) => Application[];
  createInternship: (internship: Omit<Internship, "id" | "postedDate">) => Promise<Internship>;
  getEmployerInternships: (employerId: string) => Internship[];
  getApplicationsForInternship: (internshipId: string) => Application[];
  updateApplicationStatus: (applicationId: string, status: Application["status"]) => Promise<void>;
}

const InternshipContext = createContext<InternshipContextType | undefined>(undefined);

export const InternshipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedInternships, setSavedInternships] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load mock data
    setInternships(mockInternships);
    
    // Check for stored applications in localStorage
    const storedApplications = localStorage.getItem("internship_applications");
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    }
    
    // Check for stored saved internships in localStorage
    const storedSavedInternships = localStorage.getItem("internship_saved");
    if (storedSavedInternships) {
      setSavedInternships(JSON.parse(storedSavedInternships));
    }
    
    setIsLoading(false);
  }, []);

  const getInternship = (id: string) => {
    return internships.find(internship => internship.id === id);
  };

  const applyToInternship = async (internshipId: string, applicationData: Omit<Application, "id" | "appliedDate">) => {
    const newApplication: Application = {
      ...applicationData,
      id: `app-${Date.now()}`,
      internshipId,
      appliedDate: new Date().toISOString(),
    };
    
    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem("internship_applications", JSON.stringify(updatedApplications));
  };

  const saveInternship = async (internshipId: string, studentId: string) => {
    const studentSaved = savedInternships[studentId] || [];
    if (!studentSaved.includes(internshipId)) {
      const updatedSaved = {
        ...savedInternships,
        [studentId]: [...studentSaved, internshipId]
      };
      setSavedInternships(updatedSaved);
      localStorage.setItem("internship_saved", JSON.stringify(updatedSaved));
    }
  };

  const unsaveInternship = async (internshipId: string, studentId: string) => {
    const studentSaved = savedInternships[studentId] || [];
    if (studentSaved.includes(internshipId)) {
      const updatedSaved = {
        ...savedInternships,
        [studentId]: studentSaved.filter(id => id !== internshipId)
      };
      setSavedInternships(updatedSaved);
      localStorage.setItem("internship_saved", JSON.stringify(updatedSaved));
    }
  };

  const getSavedInternships = (studentId: string) => {
    return savedInternships[studentId] || [];
  };

  const getStudentApplications = (studentId: string) => {
    return applications.filter(app => app.studentId === studentId);
  };

  const createInternship = async (internshipData: Omit<Internship, "id" | "postedDate">) => {
    const newInternship: Internship = {
      ...internshipData,
      id: `int-${Date.now()}`,
      postedDate: new Date().toISOString(),
    };
    
    const updatedInternships = [...internships, newInternship];
    setInternships(updatedInternships);
    localStorage.setItem("internship_listings", JSON.stringify(updatedInternships));
    
    return newInternship;
  };

  const getEmployerInternships = (employerId: string) => {
    return internships.filter(internship => internship.employerId === employerId);
  };

  const getApplicationsForInternship = (internshipId: string) => {
    return applications.filter(app => app.internshipId === internshipId);
  };

  const updateApplicationStatus = async (applicationId: string, status: Application["status"]) => {
    const updatedApplications = applications.map(app => 
      app.id === applicationId ? { ...app, status } : app
    );
    
    setApplications(updatedApplications);
    localStorage.setItem("internship_applications", JSON.stringify(updatedApplications));
  };

  return (
    <InternshipContext.Provider 
      value={{ 
        internships, 
        applications,
        isLoading, 
        getInternship, 
        applyToInternship, 
        saveInternship, 
        unsaveInternship, 
        getSavedInternships, 
        getStudentApplications, 
        createInternship, 
        getEmployerInternships, 
        getApplicationsForInternship, 
        updateApplicationStatus 
      }}
    >
      {children}
    </InternshipContext.Provider>
  );
};

export const useInternships = () => {
  const context = useContext(InternshipContext);
  if (context === undefined) {
    throw new Error("useInternships must be used within an InternshipProvider");
  }
  return context;
};
