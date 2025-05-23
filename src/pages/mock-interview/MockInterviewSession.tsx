
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAI } from "@/context/AIContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { InterviewQuestion } from "@/components/mock-interview/InterviewQuestion";
import { ChevronLeft, CheckCircle, Loader2, Code, Video } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const MockInterviewSession = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { mockInterviews, completeInterview, recommendSkills, isLoading } = useAI();
  const { toast } = useToast();
  
  const [interview, setInterview] = useState(mockInterviews[id || ""]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  const [videoMode, setVideoMode] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to use the mock interview feature",
        variant: "destructive",
      });
      navigate("/login/student");
      return;
    }
    
    if (!interview) {
      navigate("/mock-interview");
      return;
    }
    
    setInterview(mockInterviews[id || ""]);
  }, [id, isAuthenticated, interview, mockInterviews, navigate, toast]);
  
  const handleQuestionComplete = () => {
    // Update to latest interview data
    setInterview(mockInterviews[id || ""]);
    
    if (currentQuestionIndex < interview.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handleCompleteInterview = async () => {
    try {
      await completeInterview(interview.id);
      setInterview(mockInterviews[id || ""]);
      setShowResults(true);
      
      // Get skill recommendations
      if (user) {
        setIsLoadingSkills(true);
        const recommendedSkills = await recommendSkills(user.id);
        setSkills(recommendedSkills);
        setIsLoadingSkills(false);
      }
      
      toast({
        title: "Interview completed",
        description: "Your mock interview has been successfully completed",
      });
    } catch (error) {
      console.error("Error completing interview:", error);
      toast({
        title: "Error",
        description: "Failed to complete the interview. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!interview) {
    return (
      <MainLayout>
        <div className="container-custom py-12 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p>Loading interview session...</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <Button variant="ghost" onClick={() => navigate("/mock-interview")} className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Mock Interviews
        </Button>
        
        {showResults ? (
          <div className="space-y-8">
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="heading-2 mb-2">Interview Completed</h1>
              <p className="text-muted-foreground">
                Well done! Here's your feedback and skill recommendations.
              </p>
              
              {interview.feedback && interview.feedback.rating >= 3.5 && (
                <div className="mt-6 flex flex-col items-center">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md max-w-md mb-4">
                    <p className="text-green-800 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      You've unlocked the Technical Challenge!
                    </p>
                  </div>
                  <Button 
                    onClick={() => navigate("/technical-challenge")} 
                    className="flex items-center gap-2"
                  >
                    <Code className="h-4 w-4" />
                    Take Technical Challenge
                  </Button>
                </div>
              )}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Overall Feedback</CardTitle>
                <CardDescription>
                  AI-generated assessment of your interview performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {interview.feedback ? (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Strengths</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {interview.feedback.strengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Areas for Improvement</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {interview.feedback.improvements.map((improvement, index) => (
                          <li key={index}>{improvement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Overall Assessment</h3>
                      <p>{interview.feedback.overall}</p>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-muted rounded-md">
                      <span className="font-medium">Overall Rating</span>
                      <div className="flex items-center">
                        <span className="text-xl font-bold mr-2">{interview.feedback.rating.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground">/ 5.0</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Skill Recommendations</CardTitle>
                <CardDescription>
                  Based on your interview performance, here are skills you might want to develop
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingSkills ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : skills.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="bg-muted p-3 rounded-md flex items-center">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        </div>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No specific skill recommendations available.</p>
                )}
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button onClick={() => navigate("/courses")}>
                  Explore Recommended Courses
                </Button>
              </CardFooter>
            </Card>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => navigate("/mock-interview")}>
                Start Another Interview
              </Button>
              {interview.feedback && interview.feedback.rating >= 3.5 && (
                <Button onClick={() => navigate("/technical-challenge")}>
                  Take Technical Challenge
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mock Interview: {interview.role}</CardTitle>
                <p className="text-muted-foreground">
                  Answer the following technical and behavioral questions as you would in a real interview.
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={videoMode}
                      onCheckedChange={setVideoMode}
                      disabled={true}
                      id="video-mode"
                    />
                    <label
                      htmlFor="video-mode"
                      className="flex items-center text-sm cursor-not-allowed opacity-70"
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Enable Video Interview
                      <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">Coming Soon</span>
                    </label>
                  </div>
                  <div className="bg-muted p-4 rounded-md flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm font-medium">Progress:</span>
                      <span className="ml-2">
                        Question {currentQuestionIndex + 1} of {interview.questions.length}
                      </span>
                    </div>
                    {interview.questions.every(q => q.feedback) && (
                      <Button onClick={handleCompleteInterview} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Complete Interview"
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                <InterviewQuestion
                  interviewId={interview.id}
                  question={interview.questions[currentQuestionIndex]}
                  onComplete={handleQuestionComplete}
                />
              </CardContent>
            </Card>
            
            {/* Previous Questions Section */}
            {currentQuestionIndex > 0 && (
              <div className="space-y-4 mt-8">
                <h3 className="text-lg font-medium">Previous Questions</h3>
                {interview.questions.slice(0, currentQuestionIndex).map((question, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base">{index + 1}. {question.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Your Answer:</h4>
                        <p className="text-sm">{question.answer}</p>
                      </div>
                      {question.feedback && (
                        <div className="p-3 bg-muted rounded-md">
                          <h4 className="text-sm font-medium mb-1">AI Feedback:</h4>
                          <p className="text-sm">{question.feedback}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MockInterviewSession;
