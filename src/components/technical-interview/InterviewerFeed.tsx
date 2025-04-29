
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { BadgeCheck } from "lucide-react";

interface InterviewerFeedProps {
  currentQuestion: string;
  questionNumber: number;
  totalQuestions: number;
}

export function InterviewerFeed({ currentQuestion, questionNumber, totalQuestions }: InterviewerFeedProps) {
  return (
    <ScrollAnimation animation="slideUp">
      <Card className="w-full bg-gradient-to-r from-gray-50 to-white border-t-4 border-t-primary shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BadgeCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-primary">Technical Interviewer</p>
                  <p className="text-sm text-muted-foreground">Level 1 Interview</p>
                </div>
              </div>
              <div className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                Question {questionNumber} of {totalQuestions}
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-muted/30 rounded-md border border-muted">
              <p className="text-lg font-medium">{currentQuestion}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollAnimation>
  );
}
