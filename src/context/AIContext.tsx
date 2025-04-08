
import React, { createContext, useContext, useState } from "react";
import { MockInterview } from "@/types";
import { generateMockInterview } from "@/lib/data";

interface AIContextType {
  isLoading: boolean;
  mockInterviews: Record<string, MockInterview>;
  generateInterview: (role: string) => MockInterview;
  submitAnswer: (interviewId: string, questionId: string, answer: string) => Promise<string>;
  completeInterview: (interviewId: string) => Promise<{
    strengths: string[];
    improvements: string[];
    overall: string;
    rating: number;
  }>;
  recommendSkills: (userId: string) => Promise<string[]>;
  generateJobDescription: (details: {
    title: string;
    category: string;
    responsibilities: string[];
    requirements: string[];
  }) => Promise<string>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mockInterviews, setMockInterviews] = useState<Record<string, MockInterview>>({});

  const generateInterview = (role: string) => {
    const interview = generateMockInterview(role);
    setMockInterviews(prev => ({
      ...prev,
      [interview.id]: interview
    }));
    return interview;
  };

  const submitAnswer = async (interviewId: string, questionId: string, answer: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would send the answer to an AI model for feedback
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock feedback
      const feedback = generateFeedback(answer);
      
      // Update the interview with the answer and feedback
      const updatedInterview = { ...mockInterviews[interviewId] };
      const questionIndex = updatedInterview.questions.findIndex(q => q.id === questionId);
      
      if (questionIndex !== -1) {
        updatedInterview.questions[questionIndex] = {
          ...updatedInterview.questions[questionIndex],
          answer,
          feedback
        };
        
        setMockInterviews(prev => ({
          ...prev,
          [interviewId]: updatedInterview
        }));
      }
      
      return feedback;
    } finally {
      setIsLoading(false);
    }
  };

  const completeInterview = async (interviewId: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would send the entire interview to an AI model for analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock overall feedback
      const feedback = {
        strengths: [
          "Good understanding of technical concepts",
          "Clear communication of complex ideas",
          "Structured problem-solving approach"
        ],
        improvements: [
          "Provide more concrete examples from past experiences",
          "Be more concise with responses",
          "Elaborate more on the implementation details"
        ],
        overall: "You demonstrated solid technical knowledge and communication skills. To improve, focus on providing more specific examples and being more concise with your responses.",
        rating: 4.2
      };
      
      // Update the interview with the overall feedback
      const updatedInterview = { 
        ...mockInterviews[interviewId],
        feedback,
        completedAt: new Date().toISOString()
      };
      
      setMockInterviews(prev => ({
        ...prev,
        [interviewId]: updatedInterview
      }));
      
      return feedback;
    } finally {
      setIsLoading(false);
    }
  };

  const recommendSkills = async (userId: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would analyze user data and return personalized recommendations
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock recommended skills
      return [
        "React.js",
        "TypeScript",
        "API Integration",
        "State Management",
        "Responsive Design",
        "Testing (Jest)"
      ];
    } finally {
      setIsLoading(false);
    }
  };

  const generateJobDescription = async (details: {
    title: string;
    category: string;
    responsibilities: string[];
    requirements: string[];
  }) => {
    setIsLoading(true);
    try {
      // In a real app, this would use an AI model to generate a job description
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock job description
      return `
# ${details.title}

We're seeking a talented ${details.title} to join our growing team. This role offers an exciting opportunity to work on cutting-edge projects in the ${details.category} field.

## Responsibilities:
${details.responsibilities.map(r => `- ${r}`).join('\n')}

## Requirements:
${details.requirements.map(r => `- ${r}`).join('\n')}

This internship is an excellent opportunity to gain hands-on experience in a collaborative environment. The successful candidate will receive mentorship from experienced professionals and work on real-world projects that make an impact.

We offer competitive compensation, a flexible work environment, and the potential for full-time employment for outstanding performers.
      `;
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to generate mock feedback
  const generateFeedback = (answer: string) => {
    const feedbackOptions = [
      "Good answer! You provided a clear explanation of the concept. Consider adding a real-world example to strengthen your response.",
      "Solid understanding demonstrated. Try to be more concise and focus on the key points.",
      "Your answer covers the basics well. To improve, you could elaborate more on the practical applications.",
      "You showed good technical knowledge. Make sure to structure your answer with a clear beginning, middle, and conclusion.",
      "Great response! You explained the concept thoroughly. Consider discussing potential challenges or limitations as well."
    ];
    
    return feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
  };

  return (
    <AIContext.Provider
      value={{
        isLoading,
        mockInterviews,
        generateInterview,
        submitAnswer,
        completeInterview,
        recommendSkills,
        generateJobDescription
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
};
