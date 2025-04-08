
export type UserRole = 'student' | 'employer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export interface Student extends User {
  role: 'student';
  education?: string;
  skills?: string[];
  resume?: string;
  appliedInternships?: string[];
  savedInternships?: string[];
  completedCourses?: string[];
  inProgressCourses?: string[];
}

export interface Employer extends User {
  role: 'employer';
  company: string;
  industry?: string;
  location?: string;
  companyLogo?: string;
  postedInternships?: string[];
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  employerId: string;
  location: string;
  isRemote: boolean;
  country: string;
  city: string;
  category: string;
  role: string;
  stipend: {
    amount: number;
    currency: string;
    isPaid: boolean;
  };
  duration: string;
  startDate: string;
  applicationDeadline: string;
  responsibilities: string[];
  requirements: string[];
  applications?: string[];
  description: string;
  postedDate: string;
}

export interface Application {
  id: string;
  internshipId: string;
  studentId: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted';
  appliedDate: string;
  coverLetter?: string;
  resume?: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  image?: string;
  enrolled: number;
  rating: number;
  topics: string[];
}

export interface MockInterview {
  id: string;
  role: string;
  questions: {
    id: string;
    question: string;
    answer?: string;
    feedback?: string;
  }[];
  feedback?: {
    strengths: string[];
    improvements: string[];
    overall: string;
    rating: number;
  };
  completedAt?: string;
}

export type CountryWithCities = {
  country: string;
  cities: string[];
};

export type Category = {
  id: string;
  name: string;
  roles: string[];
};
