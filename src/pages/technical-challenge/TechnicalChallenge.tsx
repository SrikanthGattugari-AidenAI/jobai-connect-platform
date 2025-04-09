
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Code, Check, Clock, Trophy, Award, ArrowRight } from "lucide-react";

const challenges = [
  {
    id: "frontend-1",
    title: "Frontend Development Challenge",
    description: "Create a responsive dashboard using React and Tailwind CSS.",
    category: "Frontend Development",
    difficulty: "Intermediate",
    duration: "3 hours",
    skills: ["React", "Tailwind CSS", "JavaScript", "Responsive Design"],
    completedBy: 240,
    successRate: 68,
    instructions: `
    # Frontend Development Challenge
    
    ## Task
    Create a responsive dashboard with the following components:
    
    1. Navigation sidebar with items: Dashboard, Analytics, Users, Settings
    2. Header with profile dropdown and notifications
    3. Main content area with:
       - Summary cards (4 cards in a row on desktop, 2 on tablet, 1 on mobile)
       - A line chart showing data over time
       - A table with user data
    
    ## Requirements
    - Use React functional components and hooks
    - Implement responsive design with Tailwind CSS
    - Make the UI visually appealing with consistent spacing and colors
    - Implement at least one interactive element (e.g., dropdown, modal)
    
    ## Evaluation Criteria
    - Code quality and organization
    - Responsive design implementation
    - Visual design and attention to detail
    - Functionality of interactive elements
    `
  },
  {
    id: "backend-1",
    title: "Backend API Challenge",
    description: "Build a RESTful API with Node.js and Express.js.",
    category: "Backend Development",
    difficulty: "Intermediate",
    duration: "3 hours",
    skills: ["Node.js", "Express.js", "REST API", "Database Design"],
    completedBy: 186,
    successRate: 61,
    instructions: `
    # Backend API Challenge
    
    ## Task
    Build a RESTful API for a simple todo application with the following endpoints:
    
    1. GET /api/todos - List all todos
    2. GET /api/todos/:id - Get a specific todo
    3. POST /api/todos - Create a new todo
    4. PUT /api/todos/:id - Update a todo
    5. DELETE /api/todos/:id - Delete a todo
    
    ## Requirements
    - Use Node.js and Express.js
    - Implement proper error handling
    - Validate input data
    - Use appropriate HTTP status codes
    - Document your API with examples
    
    ## Evaluation Criteria
    - API design and RESTful principles
    - Error handling and input validation
    - Code organization and structure
    - Documentation quality
    `
  },
  {
    id: "fullstack-1",
    title: "Full Stack Challenge",
    description: "Build a complete web application with React, Node.js, and MongoDB.",
    category: "Full Stack Development",
    difficulty: "Advanced",
    duration: "4 hours",
    skills: ["React", "Node.js", "MongoDB", "REST API", "Authentication"],
    completedBy: 124,
    successRate: 52,
    instructions: `
    # Full Stack Development Challenge
    
    ## Task
    Build a simple social media application with the following features:
    
    1. User authentication (signup, login, logout)
    2. Profile page with user information
    3. Create, read, update, and delete posts
    4. Like and comment on posts
    
    ## Requirements
    - Frontend: React with hooks and context API
    - Backend: Node.js with Express.js
    - Database: MongoDB (you can use MongoDB Atlas)
    - Implement JWT authentication
    - Deploy your application (optional but recommended)
    
    ## Evaluation Criteria
    - Full stack integration
    - Authentication implementation
    - CRUD operations
    - UI/UX design
    - Code quality and organization
    `
  }
];

const TechnicalChallenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedChallenge, setSelectedChallenge] = useState(challenges[0]);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login/student");
      return;
    }
    
    if (id) {
      const challenge = challenges.find(c => c.id === id);
      if (challenge) {
        setSelectedChallenge(challenge);
      }
    }
  }, [id, isAuthenticated, navigate]);
  
  const handleStartChallenge = () => {
    toast({
      title: "Challenge Started",
      description: "Your challenge has begun. Good luck!",
    });
    setActiveTab("instructions");
  };
  
  const handleSubmitChallenge = () => {
    toast({
      title: "Challenge Submitted",
      description: "Your solution has been submitted for review.",
    });
    navigate("/dashboard");
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Challenges List */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Technical Challenges</CardTitle>
                <CardDescription>
                  Demonstrate your technical skills with these real-world challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {challenges.map((challenge) => (
                  <div 
                    key={challenge.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedChallenge.id === challenge.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => {
                      setSelectedChallenge(challenge);
                      navigate(`/technical-challenge/${challenge.id}`);
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Code className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-medium">{challenge.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                        {challenge.category}
                      </span>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                        {challenge.difficulty}
                      </span>
                      <span className="text-xs flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                        <Clock className="h-3 w-3" />
                        {challenge.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Challenge Details */}
          <div className="w-full md:w-2/3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedChallenge.title}</CardTitle>
                    <CardDescription>{selectedChallenge.description}</CardDescription>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                    <TabsTrigger value="submission">Submission</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="overview" className="mt-0">
                  <CardContent className="space-y-6 pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground mb-1">Difficulty</p>
                        <p className="font-medium">{selectedChallenge.difficulty}</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground mb-1">Duration</p>
                        <p className="font-medium">{selectedChallenge.duration}</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground mb-1">Completed By</p>
                        <p className="font-medium">{selectedChallenge.completedBy} students</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
                        <p className="font-medium">{selectedChallenge.successRate}%</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedChallenge.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">What You'll Learn</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Practical implementation of web development concepts</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Industry-standard coding practices</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Problem-solving in a time-constrained environment</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>Building portfolio-worthy projects</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleStartChallenge}
                    >
                      <span>Start Challenge</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="instructions" className="mt-0">
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      <div className="markdown-content">
                        {selectedChallenge.instructions.split('\n').map((line, i) => {
                          if (line.startsWith("# ")) {
                            return <h1 key={i} className="text-2xl font-bold mt-0 mb-4">{line.substring(2)}</h1>;
                          } else if (line.startsWith("## ")) {
                            return <h2 key={i} className="text-xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
                          } else if (line.startsWith("- ")) {
                            return <li key={i} className="ml-6 mb-1">{line.substring(2)}</li>;
                          } else if (line.trim() === "") {
                            return <br key={i} />;
                          } else {
                            return <p key={i} className="mb-4">{line}</p>;
                          }
                        })}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 w-full">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 mt-0.5" />
                        <div>
                          <p className="font-medium">Time Remaining: 2:45:30</p>
                          <p className="text-sm">Your challenge will automatically be submitted when the time is up.</p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => setActiveTab("submission")}
                    >
                      Go to Submission
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="submission" className="mt-0">
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Project Submission</h3>
                      <p className="text-muted-foreground">
                        Please provide your GitHub repository link or upload your project files.
                      </p>
                      
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="repo-link" className="text-sm font-medium">
                          GitHub Repository URL
                        </label>
                        <input
                          id="repo-link"
                          type="text"
                          placeholder="https://github.com/username/repo"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">
                          Or Upload Project Files
                        </label>
                        <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
                          <input
                            type="file"
                            className="hidden"
                            id="project-files"
                            multiple
                          />
                          <label
                            htmlFor="project-files"
                            className="cursor-pointer flex flex-col items-center justify-center"
                          >
                            <div className="bg-primary/10 p-3 rounded-full mb-3">
                              <Award className="h-6 w-6 text-primary" />
                            </div>
                            <p className="text-sm font-medium mb-1">
                              Drag and drop files here or click to browse
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Supports ZIP, RAR (Max 50MB)
                            </p>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="notes" className="text-sm font-medium">
                          Additional Notes
                        </label>
                        <textarea
                          id="notes"
                          placeholder="Any comments or notes about your implementation..."
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 w-full">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 mt-0.5" />
                        <div>
                          <p className="font-medium">Time Remaining: 2:45:30</p>
                          <p className="text-sm">Your challenge will automatically be submitted when the time is up.</p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={handleSubmitChallenge}
                    >
                      Submit Challenge
                    </Button>
                  </CardFooter>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TechnicalChallenge;
