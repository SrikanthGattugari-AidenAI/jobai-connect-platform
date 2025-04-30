
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { MainLayout } from "@/components/layout/MainLayout";

interface ProcessingScreenProps {
  redirectDelay?: number; // in milliseconds
}

export function ProcessingScreen({ redirectDelay = 5000 }: ProcessingScreenProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to results after delay
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, redirectDelay);

    return () => clearTimeout(timer);
  }, [navigate, redirectDelay]);

  return (
    <MainLayout>
      <div className="container-custom py-16">
        <ScrollAnimation animation="fadeIn">
          <Card className="max-w-md mx-auto p-8 text-center bg-white shadow-md">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <LoaderCircle className="h-12 w-12 text-primary animate-spin" />
              </div>
              
              <h1 className="text-2xl font-bold tracking-tight">Processing Your Interview</h1>
              
              <p className="text-gray-600">
                We're analyzing your responses and preparing your results. 
                This will only take a moment.
              </p>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div className="bg-primary h-2.5 rounded-full animate-progress"></div>
              </div>
              
              <p className="text-sm text-gray-500">
                You'll be automatically redirected when processing is complete.
              </p>
            </div>
          </Card>
        </ScrollAnimation>
      </div>
    </MainLayout>
  );
}

export default ProcessingScreen;
