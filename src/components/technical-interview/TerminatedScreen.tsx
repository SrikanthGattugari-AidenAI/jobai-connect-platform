
import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { MainLayout } from "@/components/layout/MainLayout";

interface TerminatedScreenProps {
  reason?: string;
}

export function TerminatedScreen({ reason = "Multiple persons detected" }: TerminatedScreenProps) {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container-custom py-16">
        <ScrollAnimation animation="fadeIn">
          <Card className="max-w-md mx-auto p-8 text-center bg-white shadow-md">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-12 w-12 text-red-500" />
              </div>
              
              <h1 className="text-2xl font-bold tracking-tight text-red-600">
                Interview Terminated
              </h1>
              
              <p className="text-gray-700">
                Your interview has been terminated due to the following reason:
              </p>
              
              <div className="bg-red-50 p-4 rounded-md border border-red-200">
                <p className="font-medium">{reason}</p>
              </div>
              
              <p className="text-gray-600">
                Please ensure you follow all interview guidelines when attempting again.
              </p>
              
              <div className="flex gap-4 justify-center pt-4">
                <Button 
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Return Home
                </Button>
                
                <Button 
                  onClick={() => navigate("/mock-interview")}
                >
                  Try Again
                </Button>
              </div>
            </div>
          </Card>
        </ScrollAnimation>
      </div>
    </MainLayout>
  );
}

export default TerminatedScreen;
