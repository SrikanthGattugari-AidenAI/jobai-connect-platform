
import React, { createContext, useContext, useState, useEffect } from "react";
import { Course } from "@/types";
import { mockCourses } from "@/lib/data";

interface CourseContextType {
  courses: Course[];
  isLoading: boolean;
  getCourse: (id: string) => Course | undefined;
  enrollInCourse: (courseId: string, userId: string) => Promise<void>;
  getEnrolledCourses: (userId: string) => string[];
  getCompletedCourses: (userId: string) => string[];
  markCourseAsCompleted: (courseId: string, userId: string) => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Record<string, string[]>>({});
  const [completedCourses, setCompletedCourses] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load mock data
    setCourses(mockCourses);
    
    // Check for stored enrolled courses in localStorage
    const storedEnrolled = localStorage.getItem("course_enrolled");
    if (storedEnrolled) {
      setEnrolledCourses(JSON.parse(storedEnrolled));
    }
    
    // Check for stored completed courses in localStorage
    const storedCompleted = localStorage.getItem("course_completed");
    if (storedCompleted) {
      setCompletedCourses(JSON.parse(storedCompleted));
    }
    
    setIsLoading(false);
  }, []);

  const getCourse = (id: string) => {
    return courses.find(course => course.id === id);
  };

  const enrollInCourse = async (courseId: string, userId: string) => {
    const userEnrolled = enrolledCourses[userId] || [];
    if (!userEnrolled.includes(courseId)) {
      const updatedEnrolled = {
        ...enrolledCourses,
        [userId]: [...userEnrolled, courseId]
      };
      setEnrolledCourses(updatedEnrolled);
      localStorage.setItem("course_enrolled", JSON.stringify(updatedEnrolled));
    }
  };

  const getEnrolledCourses = (userId: string) => {
    return enrolledCourses[userId] || [];
  };

  const getCompletedCourses = (userId: string) => {
    return completedCourses[userId] || [];
  };

  const markCourseAsCompleted = async (courseId: string, userId: string) => {
    const userCompleted = completedCourses[userId] || [];
    if (!userCompleted.includes(courseId)) {
      const updatedCompleted = {
        ...completedCourses,
        [userId]: [...userCompleted, courseId]
      };
      setCompletedCourses(updatedCompleted);
      localStorage.setItem("course_completed", JSON.stringify(updatedCompleted));
    }
  };

  return (
    <CourseContext.Provider 
      value={{ 
        courses, 
        isLoading, 
        getCourse, 
        enrollInCourse, 
        getEnrolledCourses, 
        getCompletedCourses, 
        markCourseAsCompleted 
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
};
