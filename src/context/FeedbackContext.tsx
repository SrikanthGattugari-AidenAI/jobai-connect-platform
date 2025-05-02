
import React, { createContext, useContext, useState } from "react";
import { InterviewFeedback, MockInterview, L1Interview } from "@/types/feedback";

// Mock data based on the provided JSON structure
const initialFeedbackData: InterviewFeedback = {
  "MOCK": [
    {
      "session_id": "b1f07f47-8849-497f-8f42-0a2d5f947f8a",
      "score": 7.5,
      "created_at": "2025-05-01T10:10:00"
    },
    {
      "session_id": "c2f18f58-9950-498f-9f43-1b3d6f948f9b",
      "score": 8.2,
      "created_at": "2025-04-28T14:15:00"
    },
    {
      "session_id": "d3f29f69-1061-499f-1f44-2c4e7f949f1c",
      "score": 6.8,
      "created_at": "2025-04-25T11:30:00"
    }
  ],
  "L1": [
    {
      "session_id": "cbe2e0cb-08e2-4d7f-b2e5-11dcffde4534",
      "feedback_id": "b91c7d91-0ac4-4ef1-bded-3793b5cdb7a2",
      "feedback_summary": "Great communication and problem-solving skills. Candidate demonstrated strong analytical thinking.",
      "strengths_of_candidate": ["Communication", "Problem solving", "Analytical thinking"],
      "areas_of_improvement": ["Technical depth", "Object-oriented design principles"],
      "overall_score_out_of_10": 8.0,
      "skill_recommendations": ["Data Structures", "System Design Patterns"],
      "submitted_at": "2025-05-01T09:00:00"
    },
    {
      "session_id": "dce3e1dc-19f3-5e8f-c3f6-22edgge5645",
      "feedback_id": "c12d8e12-1bd5-5fg2-cefe-4814c6dc8b3",
      "feedback_summary": "Solid technical knowledge but needs to improve communication clarity.",
      "strengths_of_candidate": ["Technical knowledge", "Problem solving", "Coding skills"],
      "areas_of_improvement": ["Communication clarity", "Explaining complex concepts"],
      "overall_score_out_of_10": 7.5,
      "skill_recommendations": ["Communication Skills", "Whiteboarding Practice"],
      "submitted_at": "2025-04-27T14:30:00"
    },
    {
      "session_id": "ecf4f2ed-21g4-6f9g-d4g7-33fehhe6756",
      "feedback_id": "d23e9f23-2ce6-6gh3-dfgf-5925d7ed9c4",
      "feedback_summary": "Excellent coding abilities with creative problem-solving approaches.",
      "strengths_of_candidate": ["Coding", "Creative thinking", "Algorithm optimization"],
      "areas_of_improvement": ["Time management", "Edge case handling"],
      "overall_score_out_of_10": 8.5,
      "skill_recommendations": ["Advanced Algorithms", "System Design"],
      "submitted_at": "2025-04-20T10:15:00"
    }
  ]
};

interface FeedbackContextType {
  feedbackData: InterviewFeedback;
  addMockFeedback: (feedback: MockInterview) => void;
  addL1Feedback: (feedback: L1Interview) => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
};

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [feedbackData, setFeedbackData] = useState<InterviewFeedback>(initialFeedbackData);

  const addMockFeedback = (feedback: MockInterview) => {
    setFeedbackData(prevData => ({
      ...prevData,
      MOCK: [...prevData.MOCK, feedback]
    }));
  };

  const addL1Feedback = (feedback: L1Interview) => {
    setFeedbackData(prevData => ({
      ...prevData,
      L1: [...prevData.L1, feedback]
    }));
  };

  return (
    <FeedbackContext.Provider value={{ feedbackData, addMockFeedback, addL1Feedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};
