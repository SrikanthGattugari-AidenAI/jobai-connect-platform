
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles, BarChart, GraduationCap, Briefcase, CheckCircle } from "lucide-react";

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/internships?search=${encodeURIComponent(searchQuery)}`);
  };
  
  return (
    <section className="bg-gradient-to-b from-brand-light to-white">
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animation-fade-in">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary px-3 py-1">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                AI-Powered Platform
              </Badge>
            </div>
            <h1 className="heading-1 text-gray-900">
              Your Career Journey <span className="text-brand-purple">Simplified</span> with AI
            </h1>
            <p className="text-xl text-gray-600">
              From finding internships to preparing for interviews, our AI-powered platform makes every step of your career journey seamless and intuitive.
            </p>
            
            <div className="space-y-3">
              {["Find perfect internships with smart matching", 
                "Prepare for interviews with AI simulations", 
                "Track your progress with personalized insights"].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSearch} className="flex w-full max-w-lg space-x-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for internships..."
                  className="pl-10 py-6"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg">Search</Button>
            </form>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" onClick={() => navigate("/internships")}>
                Browse All Internships
              </Button>
              <Button variant="outline" onClick={() => navigate("/courses")}>
                Explore Courses
              </Button>
              <Button variant="outline" onClick={() => navigate("/mock-interview")}>
                Try AI Interviews
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-gray-600">10,000+ Students Placed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-gray-600">500+ Hiring Companies</span>
              </div>
            </div>
          </div>
          
          <div className="relative lg:h-[500px] animation-fade-up">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                alt="Students collaborating"
                className="rounded-lg shadow-xl h-full w-full object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center space-x-3 text-sm">
                <Sparkles className="h-5 w-5 text-brand-purple" />
                <span>AI-powered skill matching</span>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center space-x-3 text-sm">
                <BarChart className="h-5 w-5 text-brand-purple" />
                <span>10,000+ internships available</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-4 left-12 w-32 h-32 bg-brand-purple/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
