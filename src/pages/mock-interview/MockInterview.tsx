
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useAI } from "@/context/AIContext";
import { categories } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, UserCheck, Brain, BrainCircuit, Zap, Loader2, Code } from "lucide-react";

const MockInterview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const { generateInterview } = useAI();
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedRole("");
    
    const categoryData = categories.find(c => c.name === category);
    setAvailableRoles(categoryData ? categoryData.roles : []);
  };
  
  const handleStartInterview = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to use the mock interview feature",
        variant: "destructive",
      });
      navigate("/login/student");
      return;
    }
    
    if (!selectedRole) {
      toast({
        title: "Role required",
        description: "Please select a role for your mock interview",
        variant: "destructive",
      });
      return;
    }
    
    const interview = generateInterview(selectedRole);
    navigate(`/mock-interview/${interview.id}`);
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered
            </div>
            <h1 className="heading-2 mb-2">Mock Interview Practice</h1>
            <p className="text-muted-foreground max-w-2xl">
              Practice your interview skills with our AI-powered mock interview system. Get real-time feedback and improve your chances of landing your dream internship.
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="interview">
          <TabsList className="w-full justify-start mb-8">
            <TabsTrigger value="interview">Start Interview</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="tips">Interview Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="interview" className="space-y-6">
            <h2 className="text-2xl font-semibold">Select an Interview Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isAuthenticated ? (
                <>
                  <Card className="border-2 border-primary col-span-2">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <UserCheck className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Comprehensive Interview</CardTitle>
                      <CardDescription>
                        Practice with both technical and behavioral questions customized for your target role
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">
                          Select Category
                        </label>
                        <select
                          id="category"
                          className="w-full p-2 border rounded-md"
                          value={selectedCategory}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="role" className="text-sm font-medium">
                          Select Role
                        </label>
                        <select
                          id="role"
                          className="w-full p-2 border rounded-md"
                          disabled={!selectedCategory}
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                        >
                          <option value="">Select Role</option>
                          {availableRoles.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-md">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <BrainCircuit className="h-5 w-5 text-primary" />
                          What's included:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span>Role-specific technical questions</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span>Behavioral interview questions</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span>AI-powered feedback</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span>Unlock technical challenges</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        disabled={!selectedRole}
                        onClick={handleStartInterview}
                      >
                        Start Interview
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <Code className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Technical Challenge</CardTitle>
                      <CardDescription>
                        Test your coding skills with hands-on problems
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Solve coding problems and algorithm challenges tailored to your role. Unlock after completing a mock interview.
                      </p>
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                        <p className="flex items-center gap-2">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Complete a mock interview first to unlock technical challenges
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline" disabled>
                        Complete Interview First
                      </Button>
                    </CardFooter>
                  </Card>
                </>
              ) : (
                <div className="lg:col-span-3 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <UserCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Login to Access Mock Interviews</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Create an account or login to practice with our AI-powered mock interview system and get personalized feedback.
                  </p>
                  <Button onClick={() => navigate("/login/student")}>
                    Login to Continue
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="how-it-works" className="space-y-8">
            <div className="bg-muted p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">How AI Mock Interviews Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-lg font-medium">Select Your Role</h3>
                  <p className="text-muted-foreground">
                    Choose a specific role that matches the internship position you're applying for to get tailored questions.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-lg font-medium">Answer Questions</h3>
                  <p className="text-muted-foreground">
                    Our AI will present you with relevant questions one by one. Take your time to provide thoughtful answers.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-lg font-medium">Get Feedback</h3>
                  <p className="text-muted-foreground">
                    Receive instant AI-generated feedback on each answer, plus an overall assessment of your performance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">AI-Powered Analysis</h3>
                </div>
                <p className="text-muted-foreground">
                  Our advanced AI analyzes your responses for content, clarity, relevance, and structure, providing insights that help you improve.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Personalized Recommendations</h3>
                </div>
                <p className="text-muted-foreground">
                  Based on your interview performance, the AI recommends specific skills to develop and courses that can help you improve.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-8">
            <h2 className="text-2xl font-semibold mb-6">Interview Success Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Before the Interview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Research the company thoroughly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Review the job description and requirements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Prepare stories using the STAR method (Situation, Task, Action, Result)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Practice common interview questions for your role</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Prepare questions to ask the interviewer</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>During the Interview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Make a strong first impression with a confident introduction</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Listen carefully to questions before answering</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Use concrete examples to demonstrate your skills</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Be concise and focused in your responses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Show enthusiasm for the role and company</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Common Interview Mistakes to Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-destructive mr-3 mt-0.5">✕</span>
                      <span>Being unprepared or knowing little about the company</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-3 mt-0.5">✕</span>
                      <span>Providing vague answers without specific examples</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-3 mt-0.5">✕</span>
                      <span>Speaking negatively about previous employers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-3 mt-0.5">✕</span>
                      <span>Failing to ask questions when given the opportunity</span>
                    </li>
                  </ul>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-destructive mr-3 mt-0.5">✕</span>
                      <span>Appearing disinterested or unenthusiastic</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-3 mt-0.5">✕</span>
                      <span>Focusing too much on salary and benefits early on</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-3 mt-0.5">✕</span>
                      <span>Rambling or giving overly long answers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-destructive mr-3 mt-0.5">✕</span>
                      <span>Being dishonest about your experiences or skills</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MockInterview;
