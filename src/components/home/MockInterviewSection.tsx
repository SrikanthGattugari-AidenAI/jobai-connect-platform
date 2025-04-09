
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Clock, Video, CheckCircle, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const MockInterviewSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="section-padding bg-gradient-to-r from-brand-light to-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="bg-primary/10 text-primary px-3 py-1 mb-4">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              AI-Powered Interviews
            </Badge>
            <h2 className="heading-2 mb-4">Ace Your Interviews with AI</h2>
            <p className="text-xl text-gray-600 mb-6">
              Prepare for your dream internship with our AI-powered mock interview system. Get personalized feedback and improve your interview skills.
            </p>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Role-specific technical and behavioral questions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Real-time feedback on your answers and delivery</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Detailed analysis of strengths and improvement areas</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Personalized skill development recommendations</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Video interviews with facial expression analysis</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate("/mock-interview")} className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" />
                Try AI Text Interview
              </Button>
              <Button variant="outline" onClick={() => navigate("/mock-interview/video")} className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Try AI Video Interview
              </Button>
            </div>
          </div>
          <div className="relative h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1573496528736-aab9c5272117"
              alt="AI Interview"
              className="rounded-lg shadow-xl h-full w-full object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3 text-sm">
                <Clock className="h-5 w-5 text-brand-purple" />
                <span>Practice at your own pace</span>
              </div>
            </div>
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center space-x-3 text-sm">
                <BadgeCheck className="h-5 w-5 text-brand-purple" />
                <span>AI skill analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
