
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CheckCircle, ArrowRight } from "lucide-react";
import { L1Interview } from "@/types/feedback";

interface FeedbackDetailsCardProps {
  feedback: L1Interview;
}

export const FeedbackDetailsCard: React.FC<FeedbackDetailsCardProps> = ({ feedback }) => {
  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "PPp");
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Feedback from {formatDateTime(feedback.submitted_at)}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Overall Assessment</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              <span className={getScoreColor(feedback.overall_score_out_of_10)}>
                {feedback.overall_score_out_of_10}
              </span>
              <span className="text-muted-foreground">/10</span>
            </span>
          </div>
          <p>{feedback.feedback_summary}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">Strengths</h3>
            <ul className="space-y-1">
              {feedback.strengths_of_candidate.map((strength, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Areas for Improvement</h3>
            <ul className="space-y-1">
              {feedback.areas_of_improvement.map((area, index) => (
                <li key={index} className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-amber-500 mr-2" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Recommended Skills to Develop</h3>
          <div className="flex flex-wrap gap-2">
            {feedback.skill_recommendations.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-2 text-sm border-t pt-4">
          <div className="grid grid-cols-2">
            <span className="text-muted-foreground">Session ID:</span>
            <span className="font-mono">{feedback.session_id}</span>
            <span className="text-muted-foreground">Feedback ID:</span>
            <span className="font-mono">{feedback.feedback_id}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
