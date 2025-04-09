
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Download, 
  FileText, 
  Plus, 
  Trash, 
  Edit, 
  Save,
  Award,
  GraduationCap,
  Briefcase,
  Languages,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Calendar,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Resume templates
const templates = [
  {
    id: "classic",
    name: "Classic",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "A clean and professional template suitable for all industries."
  },
  {
    id: "modern",
    name: "Modern",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "A sleek and contemporary design with a creative touch."
  },
  {
    id: "minimalist",
    name: "Minimalist",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    description: "A simple and elegant template focusing on your content."
  },
  {
    id: "creative",
    name: "Creative",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    description: "An eye-catching design for creative professionals."
  }
];

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [activeSection, setActiveSection] = useState("personal");
  
  const [resumeData, setResumeData] = useState({
    personal: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      bio: ""
    },
    education: [
      {
        id: "edu-1",
        school: "Stanford University",
        degree: "Bachelor of Science in Computer Science",
        startDate: "2018-09",
        endDate: "2022-05",
        location: "Stanford, CA",
        description: "Graduated with honors. Relevant coursework: Data Structures, Algorithms, Machine Learning, Web Development."
      }
    ],
    experience: [
      {
        id: "exp-1",
        company: "TechCorp Inc.",
        position: "Software Engineer Intern",
        startDate: "2022-06",
        endDate: "2022-09",
        location: "San Francisco, CA",
        description: "Developed and maintained web applications using React.js and Node.js. Collaborated with the team to implement new features and fix bugs. Participated in code reviews and agile development processes."
      }
    ],
    skills: [
      { id: "skill-1", name: "JavaScript", level: 90 },
      { id: "skill-2", name: "React.js", level: 85 },
      { id: "skill-3", name: "Node.js", level: 80 },
      { id: "skill-4", name: "Python", level: 75 },
      { id: "skill-5", name: "SQL", level: 70 }
    ],
    projects: [
      {
        id: "proj-1",
        name: "Personal Portfolio Website",
        technologies: "React, Tailwind CSS, Framer Motion",
        link: "https://myportfolio.com",
        description: "Designed and developed a responsive personal portfolio website showcasing my projects and skills."
      }
    ],
    certifications: [
      {
        id: "cert-1",
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023-06",
        link: "",
        description: ""
      }
    ],
    languages: [
      { id: "lang-1", name: "English", level: "Native" },
      { id: "lang-2", name: "Spanish", level: "Intermediate" }
    ]
  });
  
  const [aiSuggestions, setAiSuggestions] = useState({
    feedbackStatus: "warning", // success, warning, error
    score: 85,
    recommendations: [
      "Add more quantifiable achievements in your experience section (e.g., 'Increased website performance by 40%').",
      "Consider adding more technical skills like Docker, Kubernetes, or CI/CD tools to enhance your profile.",
      "Your summary could highlight your passion for problem-solving or technology more clearly."
    ],
    improvementsNeeded: 3
  });
  
  // Fix the navigation issue - use useEffect for conditional navigation
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login/student");
    }
  }, [isLoading, isAuthenticated, navigate]);
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [name]: value
      }
    }));
  };
  
  const addEducation = () => {
    const newEducation = {
      id: `edu-${Date.now()}`,
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
      description: ""
    };
    
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };
  
  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };
  
  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };
  
  const addExperience = () => {
    const newExperience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: ""
    };
    
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };
  
  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };
  
  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };
  
  const addSkill = () => {
    const newSkill = {
      id: `skill-${Date.now()}`,
      name: "",
      level: 50
    };
    
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };
  
  const updateSkill = (id: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };
  
  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };
  
  const handleGenerateResume = () => {
    toast({
      title: "Resume Generated",
      description: "Your resume has been generated successfully.",
    });
  };
  
  const handleDownloadResume = () => {
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded as a PDF.",
    });
  };
  
  const handleRequestAIFeedback = () => {
    toast({
      title: "AI Feedback Generated",
      description: "Our AI has analyzed your resume and provided feedback.",
    });
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  // Remove direct navigation to avoid the React Router warning
  // and let the useEffect handle it instead
  if (!isAuthenticated || !user) {
    return <div>Loading...</div>;
  }
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="heading-2 mb-2">Resume Builder</h1>
            <p className="text-muted-foreground">
              Create a professional resume with our easy-to-use builder and AI-powered recommendations
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleDownloadResume}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={handleGenerateResume}>
              <Save className="mr-2 h-4 w-4" />
              Save Resume
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Resume Template Card */}
            <Card>
              <CardHeader>
                <CardTitle>Resume Template</CardTitle>
                <CardDescription>Choose a template for your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div 
                      key={template.id}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedTemplate.id === template.id ? "ring-2 ring-primary" : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div 
                        className="h-24 bg-cover bg-center"
                        style={{ backgroundImage: `url(${template.image})` }}
                      />
                      <div className="p-2 text-center">
                        <p className="text-sm font-medium">{template.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium">{selectedTemplate.name}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedTemplate.description}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Resume Sections Card */}
            <Card>
              <CardHeader>
                <CardTitle>Resume Sections</CardTitle>
                <CardDescription>Build your resume section by section</CardDescription>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  <Button 
                    variant={activeSection === "personal" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveSection("personal")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user mr-2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                    Personal Info
                  </Button>
                  <Button 
                    variant={activeSection === "education" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveSection("education")}
                  >
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Education
                  </Button>
                  <Button 
                    variant={activeSection === "experience" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveSection("experience")}
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Experience
                  </Button>
                  <Button 
                    variant={activeSection === "skills" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveSection("skills")}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Skills
                  </Button>
                  <Button 
                    variant={activeSection === "projects" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveSection("projects")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder mr-2"><path d="M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2.5l2.13-2.14a2 2 0 0 1 1.42-.59L12.5 4h1.88a2 2 0 0 1 1.42.59L18 6.75H18a2 2 0 0 1 2 2Z"/></svg>
                    Projects
                  </Button>
                  <Button 
                    variant={activeSection === "certifications" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveSection("certifications")}
                  >
                    <Award className="mr-2 h-4 w-4" />
                    Certifications
                  </Button>
                  <Button 
                    variant={activeSection === "languages" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveSection("languages")}
                  >
                    <Languages className="mr-2 h-4 w-4" />
                    Languages
                  </Button>
                </nav>
              </CardContent>
            </Card>
            
            {/* AI Feedback Card */}
            <Card>
              <CardHeader>
                <CardTitle>AI Resume Analysis</CardTitle>
                <CardDescription>Get AI-powered feedback on your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={
                          aiSuggestions.feedbackStatus === "success" 
                            ? "#22c55e" 
                            : aiSuggestions.feedbackStatus === "warning"
                            ? "#eab308"
                            : "#ef4444"
                        }
                        strokeWidth="10"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * aiSuggestions.score) / 100}
                        transform="rotate(-90 50 50)"
                      />
                      <text
                        x="50"
                        y="55"
                        textAnchor="middle"
                        fontSize="24"
                        fontWeight="bold"
                        fill="currentColor"
                      >
                        {aiSuggestions.score}%
                      </text>
                    </svg>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg ${
                  aiSuggestions.feedbackStatus === "success" 
                    ? "bg-green-50 text-green-800" 
                    : aiSuggestions.feedbackStatus === "warning"
                    ? "bg-yellow-50 text-yellow-800"
                    : "bg-red-50 text-red-800"
                }`}>
                  <div className="flex">
                    {aiSuggestions.feedbackStatus === "success" ? (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2" />
                    )}
                    <p className="text-sm font-medium">
                      {aiSuggestions.improvementsNeeded === 0 
                        ? "Your resume looks great!" 
                        : `${aiSuggestions.improvementsNeeded} improvements suggested`}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">AI Recommendations</h4>
                  <ul className="space-y-2 text-sm">
                    {aiSuggestions.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5"><path d="m18 15-6-6-6 6"/></svg>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleRequestAIFeedback}
                >
                  Request New AI Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resume Preview Card */}
            <Card className="bg-white">
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <CardTitle>Resume Preview</CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleDownloadResume}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="p-8 border rounded-lg min-h-[600px] bg-white">
                  {/* Personal Info */}
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-center">{resumeData.personal.name || "Your Name"}</h1>
                    <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-muted-foreground">
                      {resumeData.personal.email && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {resumeData.personal.email}
                        </div>
                      )}
                      {resumeData.personal.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {resumeData.personal.phone}
                        </div>
                      )}
                      {resumeData.personal.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {resumeData.personal.location}
                        </div>
                      )}
                      {resumeData.personal.linkedin && (
                        <div className="flex items-center">
                          <Linkedin className="h-4 w-4 mr-1" />
                          {resumeData.personal.linkedin}
                        </div>
                      )}
                      {resumeData.personal.github && (
                        <div className="flex items-center">
                          <Github className="h-4 w-4 mr-1" />
                          {resumeData.personal.github}
                        </div>
                      )}
                    </div>
                    {resumeData.personal.bio && (
                      <p className="mt-4 text-center max-w-xl mx-auto">
                        {resumeData.personal.bio}
                      </p>
                    )}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Education */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      Education
                    </h2>
                    <div className="space-y-4">
                      {resumeData.education.map(edu => (
                        <div key={edu.id} className="grid grid-cols-3 gap-4">
                          <div className="col-span-1">
                            <p className="font-medium">{edu.startDate} - {edu.endDate}</p>
                            <p className="text-muted-foreground text-sm">{edu.location}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="font-bold">{edu.school}</p>
                            <p className="text-muted-foreground">{edu.degree}</p>
                            <p className="text-sm mt-1">{edu.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Experience */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Experience
                    </h2>
                    <div className="space-y-4">
                      {resumeData.experience.map(exp => (
                        <div key={exp.id} className="grid grid-cols-3 gap-4">
                          <div className="col-span-1">
                            <p className="font-medium">{exp.startDate} - {exp.endDate}</p>
                            <p className="text-muted-foreground text-sm">{exp.location}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="font-bold">{exp.company}</p>
                            <p className="text-muted-foreground">{exp.position}</p>
                            <p className="text-sm mt-1">{exp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Skills
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {resumeData.skills.map(skill => (
                        <div key={skill.id}>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">{skill.name}</p>
                            <p className="text-sm text-muted-foreground">{skill.level}%</p>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Resume Editor Card */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeSection === "personal" && "Personal Information"}
                  {activeSection === "education" && "Education"}
                  {activeSection === "experience" && "Experience"}
                  {activeSection === "skills" && "Skills"}
                  {activeSection === "projects" && "Projects"}
                  {activeSection === "certifications" && "Certifications"}
                  {activeSection === "languages" && "Languages"}
                </CardTitle>
                <CardDescription>
                  {activeSection === "personal" && "Add your personal details"}
                  {activeSection === "education" && "Add your educational background"}
                  {activeSection === "experience" && "Add your work experience"}
                  {activeSection === "skills" && "Highlight your key skills"}
                  {activeSection === "projects" && "Showcase your projects"}
                  {activeSection === "certifications" && "List your certifications"}
                  {activeSection === "languages" && "Add languages you speak"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Personal Info Form */}
                {activeSection === "personal" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={resumeData.personal.name}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={resumeData.personal.email}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={resumeData.personal.phone}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="City, Country"
                          value={resumeData.personal.location}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          name="linkedin"
                          placeholder="linkedin.com/in/username"
                          value={resumeData.personal.linkedin}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          name="github"
                          placeholder="github.com/username"
                          value={resumeData.personal.github}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Personal Website</Label>
                        <Input
                          id="website"
                          name="website"
                          placeholder="yourwebsite.com"
                          value={resumeData.personal.website}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Summary</Label>
                      <textarea
                        id="bio"
                        name="bio"
                        className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Write a brief summary of your professional background and goals"
                        value={resumeData.personal.bio}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>
                )}
                
                {/* Education Form */}
                {activeSection === "education" && (
                  <div className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id} className="border rounded-lg p-4 relative">
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeEducation(edu.id)}
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        
                        <h3 className="font-medium mb-4">Education #{index + 1}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`school-${edu.id}`}>School/University</Label>
                            <Input
                              id={`school-${edu.id}`}
                              value={edu.school}
                              onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                            <Input
                              id={`degree-${edu.id}`}
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                            <Input
                              id={`startDate-${edu.id}`}
                              type="month"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                            <Input
                              id={`endDate-${edu.id}`}
                              type="month"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`location-${edu.id}`}>Location</Label>
                            <Input
                              id={`location-${edu.id}`}
                              value={edu.location}
                              onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2 mt-4">
                          <Label htmlFor={`description-${edu.id}`}>Description</Label>
                          <textarea
                            id={`description-${edu.id}`}
                            className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={edu.description}
                            onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={addEducation}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Education
                    </Button>
                  </div>
                )}
                
                {/* Experience Form */}
                {activeSection === "experience" && (
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id} className="border rounded-lg p-4 relative">
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeExperience(exp.id)}
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        
                        <h3 className="font-medium mb-4">Experience #{index + 1}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`company-${exp.id}`}>Company</Label>
                            <Input
                              id={`company-${exp.id}`}
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`position-${exp.id}`}>Position</Label>
                            <Input
                              id={`position-${exp.id}`}
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                            <Input
                              id={`startDate-${exp.id}`}
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                            <Input
                              id={`endDate-${exp.id}`}
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`location-${exp.id}`}>Location</Label>
                            <Input
                              id={`location-${exp.id}`}
                              value={exp.location}
                              onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2 mt-4">
                          <Label htmlFor={`description-${exp.id}`}>Description</Label>
                          <textarea
                            id={`description-${exp.id}`}
                            className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={addExperience}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Experience
                    </Button>
                  </div>
                )}
                
                {/* Skills Form */}
                {activeSection === "skills" && (
                  <div className="space-y-6">
                    {resumeData.skills.map((skill, index) => (
                      <div key={skill.id} className="border rounded-lg p-4 relative">
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeSkill(skill.id)}
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        
                        <h3 className="font-medium mb-4">Skill #{index + 1}</h3>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`name-${skill.id}`}>Skill Name</Label>
                            <Input
                              id={`name-${skill.id}`}
                              value={skill.name}
                              onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor={`level-${skill.id}`}>Proficiency Level ({skill.level}%)</Label>
                            </div>
                            <Input
                              id={`level-${skill.id}`}
                              type="range"
                              min="0"
                              max="100"
                              value={skill.level}
                              onChange={(e) => updateSkill(skill.id, "level", parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={addSkill}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Skill
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ResumeBuilder;
