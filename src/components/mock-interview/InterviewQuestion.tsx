
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAI } from "@/context/AIContext";
import { Loader2 } from "lucide-react";

interface InterviewQuestionProps {
  interviewId: string;
  question: {
    id: string;
    question: string;
    answer?: string;
    feedback?: string;
  };
  onComplete: () => void;
}

export function InterviewQuestion({ interviewId, question, onComplete }: InterviewQuestionProps) {
  const [answer, setAnswer] = useState(question.answer || "");
  const [submitted, setSubmitted] = useState(!!question.feedback);
  const { submitAnswer, isLoading } = useAI();
  
  const handleSubmit = async () => {
    try {
      await submitAnswer(interviewId, question.id, answer);
      setSubmitted(true);
      onComplete();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };
  
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{question.question}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <Textarea
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={5}
          disabled={submitted || isLoading}
          className="w-full resize-none"
        />
        
        {question.feedback && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h4 className="font-medium">AI Feedback:</h4>
            <p className="mt-1 text-sm">{question.feedback}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end">
        {!submitted ? (
          <Button 
            onClick={handleSubmit} 
            disabled={!answer.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Submit Answer"
            )}
          </Button>
        ) : (
          <Button variant="outline" disabled>
            Submitted
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
