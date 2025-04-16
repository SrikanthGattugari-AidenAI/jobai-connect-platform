
import React from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface ATSScoreDialogProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
}

export const ATSScoreDialog = ({ isOpen, onClose, score }: ATSScoreDialogProps) => {
  // Determine the color and message based on the score
  const getScoreColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    if (score >= 80) return "Excellent! Your resume is highly optimized for ATS systems.";
    if (score >= 60) return "Good, but there's room for improvement in your resume.";
    return "Your resume needs significant improvements to pass ATS systems.";
  };

  const getProgressColor = () => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-amber-600";
    return "bg-red-600";
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>ATS Score Analysis</DialogTitle>
          <DialogDescription>How well your resume performs with Applicant Tracking Systems</DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-center mb-6">
            <div className={`text-5xl font-bold ${getScoreColor()}`}>{score}</div>
            <div className="text-2xl font-bold self-start mt-1">/100</div>
          </div>
          
          <Progress className="h-2 mb-6" value={score} 
            style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
            <div className={`h-full ${getProgressColor()}`} style={{ width: `${score}%` }}></div>
          </Progress>
          
          <p className="text-center mb-6">{getScoreMessage()}</p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Keywords Match</h4>
                <p className="text-sm text-muted-foreground">Your resume contains key industry terms that match job descriptions.</p>
              </div>
            </div>
            
            {score < 80 && (
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Format Improvement</h4>
                  <p className="text-sm text-muted-foreground">Consider using a more ATS-friendly format with clear section headings.</p>
                </div>
              </div>
            )}
            
            {score < 60 && (
              <div className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Missing Information</h4>
                  <p className="text-sm text-muted-foreground">Your resume is missing key sections or details required by employers.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
