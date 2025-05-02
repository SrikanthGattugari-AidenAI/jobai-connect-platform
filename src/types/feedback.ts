
export interface MockInterview {
  session_id: string;
  score: number;
  created_at: string;
}

export interface L1Interview {
  session_id: string;
  feedback_id: string;
  feedback_summary: string;
  strengths_of_candidate: string[];
  areas_of_improvement: string[];
  overall_score_out_of_10: number;
  skill_recommendations: string[];
  submitted_at: string;
}

export interface InterviewFeedback {
  MOCK: MockInterview[];
  L1: L1Interview[];
}
