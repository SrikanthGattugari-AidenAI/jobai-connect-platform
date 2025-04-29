
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { VideoFeed } from "@/components/technical-interview/VideoFeed";
import { InterviewerFeed } from "@/components/technical-interview/InterviewerFeed";
import { TranscriptionArea } from "@/components/technical-interview/TranscriptionArea";
import { useWebcam } from "@/hooks/use-webcam";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Sample interview questions
const INTERVIEW_QUESTIONS = [
  "Can you explain your understanding of RESTful APIs and their principles?",
  "What's the difference between shallow and deep copying in JavaScript?",
  "How would you optimize a website's performance?",
  "Explain the concept of closures in JavaScript with an example.",
  "What are the key differences between relational and NoSQL databases?"
];

const L1TechnicalInterview = () => {
  const { webcamRef, isConnected, startWebcam, stopWebcam } = useWebcam();
  const { 
    transcript, 
    setTranscript, 
    isListening, 
    toggleListening, 
    supported 
  } = useSpeechRecognition();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [responses, setResponses] = useState<Array<{ question: string; response: string }>>([]);

  // Start webcam when interview starts
  useEffect(() => {
    if (isInterviewStarted) {
      startWebcam();
    } else {
      stopWebcam();
    }

    return () => {
      stopWebcam();
    };
  }, [isInterviewStarted]);

  // Handle starting the interview
  const handleStartInterview = async () => {
    if (!supported) {
      toast({
        title: "Browser not supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    setIsInterviewStarted(true);
    setCurrentQuestionIndex(0);
    setResponses([]);
  };

  // Handle saving the response
  const handleSaveResponse = () => {
    // Save the current response
    if (transcript.trim()) {
      setResponses(prev => [
        ...prev, 
        { 
          question: INTERVIEW_QUESTIONS[currentQuestionIndex],
          response: transcript.trim() 
        }
      ]);
      
      toast({
        title: "Response saved",
        description: "Your answer has been recorded.",
      });
      
      // Move to next question or finish interview
      if (currentQuestionIndex < INTERVIEW_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTranscript("");
      } else {
        finishInterview();
      }
    } else {
      toast({
        title: "Empty response",
        description: "Please provide an answer before saving.",
        variant: "destructive",
      });
    }
  };

  // Handle finishing the interview
  const finishInterview = () => {
    setIsInterviewStarted(false);
    stopWebcam();
    
    // In a real app, you would send the responses to your backend
    console.log("Interview responses:", responses);
    
    toast({
      title: "Interview completed",
      description: "Thank you for completing your L1 Technical Interview!",
    });
    
    // Navigate back to dashboard or results page
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="container-custom py-8">
        <ScrollAnimation animation="fadeIn">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Level 1 Technical Interview
              </h1>
              <p className="mt-2 text-gray-600">
                Demonstrate your technical knowledge by answering the questions below.
              </p>
            </div>

            {!isInterviewStarted ? (
              <div className="bg-white p-8 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Ready to Begin Your Interview?</h2>
                <p className="mb-6 text-gray-600">
                  This interview consists of {INTERVIEW_QUESTIONS.length} technical questions. 
                  Your webcam and microphone will be used during the interview process.
                </p>
                
                <div className="flex flex-col space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Webcam Required</h3>
                      <p className="text-sm text-gray-500">
                        Your video will be recorded and analyzed as part of the interview process.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Audio Recording</h3>
                      <p className="text-sm text-gray-500">
                        Your voice will be transcribed in real-time. You can edit the transcription if needed.
                      </p>
                    </div>
                  </div>
                  
                  {!supported && (
                    <div className="flex items-start text-yellow-700 bg-yellow-50 p-3 rounded-md">
                      <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <p className="text-sm">
                        Your browser doesn't fully support speech recognition. You can still proceed, 
                        but you'll need to type your answers manually.
                      </p>
                    </div>
                  )}
                </div>
                
                <Button onClick={handleStartInterview} className="w-full">
                  Start Interview
                </Button>
              </div>
            ) : (
              <>
                <InterviewerFeed 
                  currentQuestion={INTERVIEW_QUESTIONS[currentQuestionIndex]} 
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={INTERVIEW_QUESTIONS.length}
                />
                
                <TranscriptionArea 
                  transcription={transcript}
                  setTranscription={setTranscript}
                  isListening={isListening}
                  toggleListening={toggleListening}
                  handleSave={handleSaveResponse}
                />

                <VideoFeed webcamRef={webcamRef} isConnected={isConnected} />
              </>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </MainLayout>
  );
};

export default L1TechnicalInterview;
