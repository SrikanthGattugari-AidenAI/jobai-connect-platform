
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Route, 
  Sparkles,
  CheckCircle2,
  ChevronRight,
  CornerRightDown,
  ArrowRight
} from "lucide-react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const CareerPathwaySection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="bg-primary/10 text-primary px-3 py-1 mb-2">
            <Route className="mr-1 h-3.5 w-3.5" />
            Career Navigation
          </Badge>
          <h2 className="heading-2 mb-4">Clear Pathways to In-Demand Careers</h2>
          <p className="text-lg text-gray-600">
            Follow our AI-curated roadmaps to build the skills that employers are actively seeking. Each path provides a step-by-step guide to reach your career goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Data Science Path */}
          <Card className="overflow-visible relative">
            <div className="absolute -top-4 left-4 bg-green-100 text-green-700 font-medium text-sm px-3 py-1 rounded-full">
              Most Popular
            </div>
            <div className="h-3 bg-green-500 w-full rounded-t-lg"></div>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Data Science Path</h3>
              <p className="text-gray-600 text-sm mb-6">Master the tools and techniques to analyze data and derive insights</p>
              
              <div className="space-y-5">
                <div className="relative pl-8 pb-6 border-l-2 border-green-200">
                  <CornerRightDown className="absolute -left-3 top-0 h-5 w-5 text-green-500" />
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs font-medium">1</span>
                  </div>
                  <h4 className="font-medium">Python Programming</h4>
                  <p className="text-sm text-gray-600 mt-1">Learn the fundamentals of Python for data analysis</p>
                </div>
                
                <div className="relative pl-8 pb-6 border-l-2 border-green-200">
                  <CornerRightDown className="absolute -left-3 top-0 h-5 w-5 text-green-500" />
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs font-medium">2</span>
                  </div>
                  <h4 className="font-medium">Data Analysis & Visualization</h4>
                  <p className="text-sm text-gray-600 mt-1">Master tools like Pandas, Matplotlib, and Seaborn</p>
                </div>
                
                <div className="relative pl-8 pb-6 border-l-2 border-green-200">
                  <CornerRightDown className="absolute -left-3 top-0 h-5 w-5 text-green-500" />
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs font-medium">3</span>
                  </div>
                  <h4 className="font-medium">Machine Learning Basics</h4>
                  <p className="text-sm text-gray-600 mt-1">Understand supervised and unsupervised learning</p>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs font-medium">4</span>
                  </div>
                  <h4 className="font-medium">Projects & Portfolio</h4>
                  <p className="text-sm text-gray-600 mt-1">Build real-world projects to showcase your skills</p>
                </div>
              </div>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Average Completion: 4 months</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>8,900+ students following</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Sparkles className="h-4 w-4 text-green-500" />
                  <span>1,450+ placed in internships</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-green-500 hover:bg-green-600" onClick={() => navigate("/career-paths/data-science")}>
                Follow This Path
              </Button>
            </CardContent>
          </Card>
          
          {/* Web Development Path */}
          <Card className="overflow-visible">
            <div className="h-3 bg-blue-500 w-full rounded-t-lg"></div>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Web Development Path</h3>
              <p className="text-gray-600 text-sm mb-6">Build modern web applications with in-demand skills</p>
              
              <div className="space-y-5">
                <div className="relative pl-8 pb-6 border-l-2 border-blue-200">
                  <CornerRightDown className="absolute -left-3 top-0 h-5 w-5 text-blue-500" />
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-medium">1</span>
                  </div>
                  <h4 className="font-medium">HTML, CSS & JavaScript</h4>
                  <p className="text-sm text-gray-600 mt-1">Learn the core languages of web development</p>
                </div>
                
                <div className="relative pl-8 pb-6 border-l-2 border-blue-200">
                  <CornerRightDown className="absolute -left-3 top-0 h-5 w-5 text-blue-500" />
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-medium">2</span>
                  </div>
                  <h4 className="font-medium">React & Modern JS</h4>
                  <p className="text-sm text-gray-600 mt-1">Master React.js and modern JavaScript concepts</p>
                </div>
                
                <div className="relative pl-8 pb-6 border-l-2 border-blue-200">
                  <CornerRightDown className="absolute -left-3 top-0 h-5 w-5 text-blue-500" />
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-medium">3</span>
                  </div>
                  <h4 className="font-medium">Backend Development</h4>
                  <p className="text-sm text-gray-600 mt-1">Learn Node.js, Express, and database integration</p>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-medium">4</span>
                  </div>
                  <h4 className="font-medium">Full Stack Projects</h4>
                  <p className="text-sm text-gray-600 mt-1">Build and deploy complete web applications</p>
                </div>
              </div>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  <span>Average Completion: 5 months</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  <span>12,400+ students following</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span>2,800+ placed in internships</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600" onClick={() => navigate("/career-paths/web-development")}>
                Follow This Path
              </Button>
            </CardContent>
          </Card>
          
          {/* UI/UX Design Path */}
          <Card className="overflow-visible">
            <div className="h-3 bg-purple-500 w-full rounded-t-lg"></div>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">UI/UX Design Path</h3>
              <p className="text-gray-600 text-sm mb-6">Learn to create beautiful, user-centered digital experiences</p>
              
              <div className="space-y-5">
                <div className="relative pl-8 pb-6 border-l-2 border-purple-200">
                  <CornerRightDown className="absolute -left-3 top-0 h-5 w-5 text-purple-500" />
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-xs font-medium">1</span>
                  </div>
                  <h4 className="font-medium">Design Fundamentals</h4>
                  <p className="text-sm text-gray-600 mt-1">Learn color theory, typography, and layout principles</p>
                </div>
                
                <div className="relative pl-8 pb-6 border-l-2 border-purple-200">
                  <CornerRightDown className="absolute -left-3 top-0 h-5 w-5 text-purple-500" />
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-xs font-medium">2</span>
                  </div>
                  <h4 className="font-medium">User Experience Design</h4>
                  <p className="text-sm text-gray-600 mt-1">Master user research, wireframing, and prototyping</p>
                </div>
                
                <div className="relative pl-8 pb-6 border-l-2 border-purple-200">
                  <CornerRightDown className="absolute -left-3 top-0 h-5 w-5 text-purple-500" />
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-xs font-medium">3</span>
                  </div>
                  <h4 className="font-medium">UI Design Tools</h4>
                  <p className="text-sm text-gray-600 mt-1">Learn Figma, Adobe XD, and industry tools</p>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-xs font-medium">4</span>
                  </div>
                  <h4 className="font-medium">Professional Portfolio</h4>
                  <p className="text-sm text-gray-600 mt-1">Build a standout design portfolio with case studies</p>
                </div>
              </div>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-500" />
                  <span>Average Completion: 4 months</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-purple-500" />
                  <span>6,700+ students following</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span>1,200+ placed in internships</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-purple-500 hover:bg-purple-600" onClick={() => navigate("/career-paths/ui-ux-design")}>
                Follow This Path
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2" onClick={() => navigate("/career-paths")}>
            View All Career Paths <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
