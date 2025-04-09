
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAI } from "@/context/AIContext";
import { Loader2, Mic, MicOff, StopCircle } from "lucide-react";

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
  const [isRecording, setIsRecording] = useState(false);
  const [audioMode, setAudioMode] = useState(true);
  
  const handleSubmit = async () => {
    try {
      await submitAnswer(interviewId, question.id, answer);
      setSubmitted(true);
      onComplete();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };
  
  const startRecording = () => {
    // In a real implementation, this would access the microphone and start recording
    setIsRecording(true);
    
    // For demo purposes, simulate recording for 5 seconds then automatically stop
    setTimeout(() => {
      stopRecording();
    }, 5000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    
    // In a real implementation, this would stop recording and process the audio
    // For demo purposes, we'll just set a mock response
    setAnswer("In my previous role, I led a team of developers to successfully launch our mobile application ahead of schedule. I established clear communication channels, set realistic milestones, and made sure everyone had the resources they needed. When we faced challenges, I focused on finding solutions rather than placing blame. This approach helped us maintain team morale and ultimately deliver a high-quality product that exceeded our client's expectations.");
  };
  
  const toggleMode = () => {
    setAudioMode(!audioMode);
  };
  
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{question.question}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={toggleMode}>
            {audioMode ? "Switch to Text Mode" : "Switch to Audio Mode"}
          </Button>
        </div>
        
        {audioMode ? (
          <div className="flex flex-col items-center justify-center py-8">
            {!answer ? (
              <div className="text-center">
                {isRecording ? (
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full animate-ping bg-red-400 opacity-75"></div>
                      <Button 
                        variant="destructive" 
                        size="lg" 
                        className="h-16 w-16 rounded-full"
                        onClick={stopRecording}
                      >
                        <StopCircle className="h-8 w-8" />
                      </Button>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">Recording in progress... Click to stop</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="h-16 w-16 rounded-full border-2 border-primary"
                      onClick={startRecording}
                    >
                      <Mic className="h-8 w-8 text-primary" />
                    </Button>
                    <p className="mt-4 text-sm text-muted-foreground">Click to start recording your answer</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full space-y-4">
                <div className="p-4 border rounded-md bg-muted/50">
                  <h4 className="text-sm font-medium mb-2">Your Audio Response (Transcribed):</h4>
                  <p className="text-sm">{answer}</p>
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => {
                      setAnswer("");
                      setSubmitted(false);
                    }}
                  >
                    Record Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Textarea
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={5}
            disabled={submitted || isLoading}
            className="w-full resize-none"
          />
        )}
        
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
