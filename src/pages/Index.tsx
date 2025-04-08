
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainLayout } from "@/components/layout/MainLayout";
import { Search, GraduationCap, Briefcase, Sparkles, BarChart, Clock } from "lucide-react";
import { mockInternships } from "@/lib/data";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/internships?search=${encodeURIComponent(searchQuery)}`);
  };
  
  // Featured internships (showing 3 from our mock data)
  const featuredInternships = mockInternships.slice(0, 3);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-light to-white">
        <div className="container-custom py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animation-fade-in">
              <h1 className="heading-1 text-gray-900">
                Find Your Perfect Internship with <span className="text-brand-purple">AI-Powered</span> Matching
              </h1>
              <p className="text-xl text-gray-600">
                Connect with top employers, develop skills, and launch your career through personalized internship opportunities.
              </p>
              
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
              </div>
            </div>
            
            <div className="relative lg:h-[500px] animation-fade-up">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Student using laptop"
                className="rounded-lg shadow-xl h-full w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center space-x-3 text-sm">
                  <Sparkles className="h-5 w-5 text-brand-purple" />
                  <span>AI-powered skill matching</span>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center space-x-3 text-sm">
                  <BarChart className="h-5 w-5 text-brand-purple" />
                  <span>5000+ internships available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">How InternAI Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform uses AI to connect students with the perfect internships and help employers find ideal candidates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">For Students</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Create a profile and upload your resume
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Get personalized internship recommendations
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Practice with AI mock interviews
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Receive skill development recommendations
                </li>
              </ul>
              <Button className="mt-6 w-full" onClick={() => navigate("/register/student")}>
                Sign Up as Student
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-primary">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">AI-Powered Features</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Smart matching algorithm for perfect fit
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Realistic AI interview simulations
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Personalized skill gap analysis
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  AI-assisted job description creation
                </li>
              </ul>
              <Button className="mt-6 w-full" onClick={() => navigate("/mock-interview")}>
                Try AI Mock Interview
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">For Employers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Post internship opportunities
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Get AI-assisted candidate matching
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Streamlined application review process
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Track internship performance metrics
                </li>
              </ul>
              <Button className="mt-6 w-full" onClick={() => navigate("/register/employer")}>
                Sign Up as Employer
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Internships */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="heading-3 mb-2">Featured Internships</h2>
              <p className="text-muted-foreground">Explore top opportunities from leading companies</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" onClick={() => navigate("/internships")}>
              View All Internships
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredInternships.map((internship) => (
              <div 
                key={internship.id} 
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                onClick={() => navigate(`/internships/${internship.id}`)}
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    {internship.companyLogo ? (
                      <div className="h-12 w-12 flex-shrink-0 rounded overflow-hidden border">
                        <img 
                          src={internship.companyLogo} 
                          alt={internship.company} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold">{internship.company.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{internship.title}</h3>
                      <p className="text-sm text-muted-foreground">{internship.company}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{internship.isRemote ? "Remote" : `${internship.city}, ${internship.country}`}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="mr-2 h-4 w-4" />
                      <span className="font-medium">
                        {internship.stipend.isPaid 
                          ? `${internship.stipend.amount} ${internship.stipend.currency}/month` 
                          : "Unpaid"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {internship.category}
                  </span>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* AI Mock Interview Section */}
      <section className="section-padding bg-gradient-to-r from-brand-light to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                <Sparkles className="mr-2 h-4 w-4" />
                AI-Powered
              </div>
              <h2 className="heading-2 mb-4">Practice Makes Perfect</h2>
              <p className="text-xl text-gray-600 mb-6">
                Prepare for your dream internship with our AI-powered mock interview system. Get personalized feedback and improve your interview skills.
              </p>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Choose from industry-specific interview questions
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Receive real-time feedback on your answers
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Identify your strengths and areas for improvement
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-3">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Get personalized skill development recommendations
                </li>
              </ul>
              <Button onClick={() => navigate("/mock-interview")}>
                Try AI Mock Interview
              </Button>
            </div>
            <div className="relative h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                alt="AI Interview"
                className="rounded-lg shadow-xl h-full w-full object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="h-5 w-5 text-brand-purple" />
                  <span>Practice at your own pace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="section-padding bg-brand-dark text-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-300">
            Join thousands of students and employers on our platform and take the next step in your career or find your perfect intern.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="default" className="bg-brand-purple hover:bg-brand-purple/90" onClick={() => navigate("/register/student")}>
              Sign Up as Student
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" onClick={() => navigate("/register/employer")}>
              Sign Up as Employer
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;

function MapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function DollarSign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
