
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Map, ChevronRight, BookOpen, Award, BarChart3, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const CareerRoadmapSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="section-padding bg-gradient-to-br from-white to-accent/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Badge variant="outline" className="bg-primary/10 text-primary px-3 py-1 mb-4">
            <Map className="mr-1 h-3.5 w-3.5" />
            Career Roadmaps
          </Badge>
          <h2 className="heading-2 mb-4">Navigate Your Career with Confidence</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow step-by-step roadmaps designed by industry experts to guide your journey from student to professional.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Frontend Developer Roadmap */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition-all">
            <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 pattern-dots"></div>
              <span className="text-2xl text-white font-bold">Frontend Developer</span>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Core Skills</h4>
                    <p className="text-sm text-gray-600">HTML, CSS, JavaScript, React, TypeScript</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Key Certifications</h4>
                    <p className="text-sm text-gray-600">Frontend Nanodegree, React Certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Placement Rate</h4>
                    <p className="text-sm text-gray-600">89% of students placed within 3 months</p>
                  </div>
                </div>
              </div>
              <Button onClick={() => navigate("/career-roadmaps/frontend")} className="w-full flex items-center justify-center gap-2">
                <span>Follow this Path</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Data Scientist Roadmap */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition-all">
            <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-600 relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 pattern-dots"></div>
              <span className="text-2xl text-white font-bold">Data Scientist</span>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Core Skills</h4>
                    <p className="text-sm text-gray-600">Python, SQL, Machine Learning, Statistics</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Key Certifications</h4>
                    <p className="text-sm text-gray-600">TensorFlow Certification, Data Science Specialization</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Placement Rate</h4>
                    <p className="text-sm text-gray-600">92% of students placed within 3 months</p>
                  </div>
                </div>
              </div>
              <Button onClick={() => navigate("/career-roadmaps/data-science")} className="w-full flex items-center justify-center gap-2">
                <span>Follow this Path</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Product Manager Roadmap */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition-all">
            <div className="h-40 bg-gradient-to-r from-emerald-500 to-teal-600 relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 pattern-dots"></div>
              <span className="text-2xl text-white font-bold">Product Manager</span>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Core Skills</h4>
                    <p className="text-sm text-gray-600">User Research, Analytics, Agile, Strategy</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Key Certifications</h4>
                    <p className="text-sm text-gray-600">Product Management Pro, Scrum Master</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Placement Rate</h4>
                    <p className="text-sm text-gray-600">85% of students placed within 3 months</p>
                  </div>
                </div>
              </div>
              <Button onClick={() => navigate("/career-roadmaps/product-management")} className="w-full flex items-center justify-center gap-2">
                <span>Follow this Path</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate("/career-roadmaps")}
            className="flex items-center gap-2"
          >
            <span>View All Career Paths</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
