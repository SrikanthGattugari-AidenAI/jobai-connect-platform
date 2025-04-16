export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "employer";
  profileImage: string;
  bio?: string;
  location?: string;
  website?: string;
}

export interface Student extends User {
  role: "student";
  major?: string;
  university?: string;
}

export interface Employer extends User {
  role: "employer";
  company: string;
}

export interface Internship {
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
  duration: string;
  stipend: {
    isPaid: boolean;
    amount?: number;
    currency?: string;
  };
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
  companyLogo?: string;
  startDate: string;
  applicationDeadline: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  imageUrl: string;
  image?: string;
  rating?: number;
  enrolled?: number;
  topics?: string[];
}

export interface Application {
  id: string;
  studentId: string;
  internshipId: string;
  coverLetter: string;
  resumeUrl?: string;
  appliedDate: string;
  status: "pending" | "reviewing" | "shortlisted" | "rejected" | "accepted";
}

export interface MockInterviewQuestion {
  id: string;
  question: string;
  answer?: string;
  feedback?: string;
}

export interface MockInterview {
  id: string;
  role: string;
  questions: MockInterviewQuestion[];
  feedback?: {
    strengths: string[];
    improvements: string[];
    overall: string;
    rating: number;
  };
  completedAt?: string;
}

// Chatbot types
export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: string;
}

// Updated type definitions to match usage in the codebase
export interface CountryWithCities {
  name: string;
  cities: string[];
  country: string; // Adding the country property to match current usage
}

export interface Category {
  id: string;
  name: string;
  roles: string[]; // Adding the roles property to match current usage
}
