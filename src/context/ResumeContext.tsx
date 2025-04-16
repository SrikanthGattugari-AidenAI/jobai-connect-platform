import React, { createContext, useContext, useState, useEffect } from "react";

interface ResumeContextType {
  uploadedResume: File | null;
  resumePreviewUrl: string | null;
  setUploadedResume: (file: File | null) => void;
  clearResumeData: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState<string | null>(null);

  // Effect to create object URL when resume is uploaded
  useEffect(() => {
    if (uploadedResume) {
      const objectUrl = URL.createObjectURL(uploadedResume);
      setResumePreviewUrl(objectUrl);
      
      // Store resume info in localStorage (just the name and timestamp, not the file)
      localStorage.setItem('uploadedResumeName', uploadedResume.name);
      localStorage.setItem('uploadedResumeTimestamp', Date.now().toString());
      
      // Clean up the object URL when component unmounts or resume changes
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setResumePreviewUrl(null);
    }
  }, [uploadedResume]);

  // Load resume name from localStorage on mount
  useEffect(() => {
    const resumeName = localStorage.getItem('uploadedResumeName');
    const resumeTimestamp = localStorage.getItem('uploadedResumeTimestamp');
    
    // We can't actually store the file in localStorage, just its metadata
    // The actual File object will be lost on refresh, but we can keep the name
    if (resumeName && resumeTimestamp) {
      console.log(`Resume data found in localStorage: ${resumeName}`);
    }
  }, []);

  const clearResumeData = () => {
    if (resumePreviewUrl) {
      URL.revokeObjectURL(resumePreviewUrl);
    }
    setUploadedResume(null);
    setResumePreviewUrl(null);
    localStorage.removeItem('uploadedResumeName');
    localStorage.removeItem('uploadedResumeTimestamp');
  };

  return (
    <ResumeContext.Provider value={{ 
      uploadedResume, 
      resumePreviewUrl, 
      setUploadedResume, 
      clearResumeData 
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
