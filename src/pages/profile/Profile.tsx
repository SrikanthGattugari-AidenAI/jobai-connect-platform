
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Building, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  Phone, 
  Globe, 
  Linkedin, 
  Github, 
  Twitter,
  Save,
  Award,
  FileText,
  Upload,
  Download,
  AlertTriangle,
  Eye
} from "lucide-react";
import ResumePreview from "./ResumePreview";
import ATSScoreCard from "./ATSScoreCard";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  
  // State for resume upload
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadedResume, setUploadedResume] = useState<string | null>("resume-example.pdf"); // Mock data - would come from user profile
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    university: "",
    major: "",
    graduationYear: "",
    company: "",
    position: "",
    website: "",
    linkedin: "",
    github: "",
    twitter: "",
    bio: ""
  });
  
  const [resumeUrl, setResumeUrl] = useState<string | null>("https://example.com/resume-example.pdf"); // For preview
  
  // Dummy ATS score data
  const [atsScore, setAtsScore] = useState(78);
  const [atsFeedback, setAtsFeedback] = useState([
    "Add more quantifiable achievements to your experience section",
    "Include more industry-specific keywords relevant to your target role",
    "Consider adding a skills section with technical competencies"
  ]);

  // Add upload date state
  const [uploadDate, setUploadDate] = useState<string>("April 15, 2025");
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login/student");
      return;
    }
    
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        company: user.role === "employer" ? (user as any).company || "" : ""
      }));
    }
  }, [user, isAuthenticated, isLoading, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setResumeUrl(URL.createObjectURL(file)); // Preview
      console.log("Resume selected (file object):", file);
    }
  };
  
  const handleResumeUpload = () => {
    if (resumeFile) {
      const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      toast({
        title: "Resume Uploaded",
        description: `Your resume "${resumeFile.name}" has been uploaded successfully.`,
      });
      console.log("Resume uploaded and file path:", resumeFile.name, resumeUrl);
      setUploadedResume(resumeFile.name);
      setUploadDate(currentDate);
      setResumeFile(null);
    } else {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
    }
  };
  
  const handleDownloadResume = () => {
    if (resumeUrl) {
      toast({
        title: "Resume Download",
        description: `Your resume "${uploadedResume}" is being downloaded.`,
      });
      console.log("Downloading resume file path:", resumeUrl);
      const a = document.createElement('a');
      a.href = resumeUrl;
      a.download = uploadedResume || "Resume";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handlePreviewResume = () => {
    console.log("Previewing resume:", uploadedResume);
    toast({
      title: "Resume Preview",
      description: "Opening resume preview.",
    });
  };
  
  const handleReplaceResume = () => {
    const fileInput = document.getElementById('resume-replace-input');
    if (fileInput) {
      fileInput.click();
    }
  };
  
  const handleImprovedResumeDownload = () => {
    toast({
      title: "Improved Resume Downloaded",
      description: "Your AI-improved resume has been downloaded.",
    });
    // In a real app, this would download an actual improved resume file
  };
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated || !user) {
    return null; // Will be redirected by the effect
  }
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <h1 className="heading-2 mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto relative mb-4">
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute bottom-0 right-0 h-7 w-7 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  </Button>
                </div>
                
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.role === "student" ? "Student" : "Employer"}</p>
                
                <div className="mt-4 space-y-2 text-left">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  {user.role === "employer" && (
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{(user as any).company}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Profile Info</span>
                      <span>70%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Skills Added</span>
                      <span>50%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                  
                  {user.role === "student" && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Resume Uploaded</span>
                        <span>{uploadedResume ? "100%" : "0%"}</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: uploadedResume ? "100%" : "0%" }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {user.role === "employer" && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Company Info</span>
                        <span>30%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-sm">
                  Complete Your Profile
                </Button>
              </CardFooter>
            </Card>
            
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate("/dashboard")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard mr-2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                  Dashboard
                </Button>
                
                {user.role === "student" && (
                  <>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate("/resume-builder")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Resume Builder
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate("/mock-interview")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video mr-2"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                      Mock Interviews
                    </Button>
                  </>
                )}
                
                {user.role === "employer" && (
                  <>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate("/post-internship")}
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      Post Internship
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => navigate("/hackathons")}
                    >
                      <Award className="mr-2 h-4 w-4" />
                      Host Hackathon
                    </Button>
                  </>
                )}
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate("/settings")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings mr-2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="col-span-2">
            <Tabs defaultValue="personal">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                {user.role === "student" && (
                  <TabsTrigger value="education">Education</TabsTrigger>
                )}
                {user.role === "employer" && (
                  <TabsTrigger value="company">Company</TabsTrigger>
                )}
                <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
                <TabsTrigger value="social">Social Profiles</TabsTrigger>
                {user.role === "student" && (
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="City, Country"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        name="bio"
                        className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Tell us about yourself"
                        value={formData.bio}
                        onChange={handleChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSaveProfile}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {user.role === "student" && (
                <TabsContent value="education">
                  <Card>
                    <CardHeader>
                      <CardTitle>Education</CardTitle>
                      <CardDescription>
                        Add your educational background
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="university">University/College</Label>
                          <Input
                            id="university"
                            name="university"
                            value={formData.university}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="major">Major/Field of Study</Label>
                          <Input
                            id="major"
                            name="major"
                            value={formData.major}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="graduationYear">Graduation Year</Label>
                          <Input
                            id="graduationYear"
                            name="graduationYear"
                            value={formData.graduationYear}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button variant="outline" className="mb-4">
                          + Add Another Education
                        </Button>
                        
                        <div className="border rounded-lg p-4 flex items-start space-x-4">
                          <div className="p-2 bg-primary/10 rounded-md">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                            <p className="text-muted-foreground text-sm">Stanford University</p>
                            <p className="text-muted-foreground text-sm">2018 - 2022</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              )}
              
              {user.role === "employer" && (
                <TabsContent value="company">
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Information</CardTitle>
                      <CardDescription>
                        Update your company details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Your Position</Label>
                          <Input
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Company Website</Label>
                          <Input
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Company Location</Label>
                          <Input
                            id="location"
                            name="location"
                            placeholder="City, Country"
                            value={formData.location}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="companyBio">Company Description</Label>
                        <textarea
                          id="companyBio"
                          name="bio"
                          className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          placeholder="Tell us about your company"
                          value={formData.bio}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Company Logo</Label>
                        <div className="border-2 border-dashed border-input rounded-lg p-6 text-center">
                          <input
                            type="file"
                            className="hidden"
                            id="company-logo"
                          />
                          <label
                            htmlFor="company-logo"
                            className="cursor-pointer flex flex-col items-center justify-center"
                          >
                            <div className="flex-0 w-24 h-24 mb-4 flex items-center justify-center bg-muted rounded-md">
                              <Building className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <span className="text-sm font-medium mb-1">
                              Click to upload logo
                            </span>
                            <span className="text-xs text-muted-foreground">
                              PNG, JPG or SVG (max. 2MB)
                            </span>
                          </label>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              )}
              
              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Experience</CardTitle>
                    <CardDescription>
                      Add your skills and professional experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="mb-3 block">Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                          React.js
                          <button className="ml-2 text-primary/70 hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                          </button>
                        </div>
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                          TypeScript
                          <button className="ml-2 text-primary/70 hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                          </button>
                        </div>
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                          Node.js
                          <button className="ml-2 text-primary/70 hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a skill..."
                          className="max-w-sm"
                        />
                        <Button variant="outline">Add</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <Label>Work Experience</Label>
                        <Button variant="outline" size="sm">+ Add Experience</Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex items-start space-x-4">
                              <div className="p-2 bg-primary/10 rounded-md">
                                <Briefcase className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">Software Engineer</h4>
                                <p className="text-muted-foreground">TechCorp Inc.</p>
                                <p className="text-sm text-muted-foreground">Jan 2022 - Present</p>
                                <p className="text-sm mt-2">
                                  Developed and maintained web applications using React.js and Node.js. Implemented new features and optimized existing codebase.
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                              </Button>
                              <Button variant="ghost" size="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <Label>Certifications</Label>
                        <Button variant="outline" size="sm">+ Add Certification</Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex items-start space-x-4">
                              <div className="p-2 bg-primary/10 rounded-md">
                                <Award className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">AWS Certified Solutions Architect</h4>
                                <p className="text-muted-foreground">Amazon Web Services</p>
                                <p className="text-sm text-muted-foreground">Issued June 2023 • Expires June 2026</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                              </Button>
                              <Button variant="ghost" size="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSaveProfile}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="social">
                <Card>
                  <CardHeader>
                    <CardTitle>Social Profiles</CardTitle>
                    <CardDescription>
                      Connect your social media accounts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="website">Personal Website</Label>
                        <div className="flex">
                          <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input
                            id="website"
                            name="website"
                            placeholder="https://yourwebsite.com"
                            className="rounded-l-none"
                            value={formData.website}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <div className="flex">
                          <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                            <Linkedin className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input
                            id="linkedin"
                            name="linkedin"
                            placeholder="linkedin.com/in/username"
                            className="rounded-l-none"
                            value={formData.linkedin}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <div className="flex">
                          <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                            <Github className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input
                            id="github"
                            name="github"
                            placeholder="github.com/username"
                            className="rounded-l-none"
                            value={formData.github}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter</Label>
                        <div className="flex">
                          <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                            <Twitter className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input
                            id="twitter"
                            name="twitter"
                            placeholder="twitter.com/username"
                            className="rounded-l-none"
                            value={formData.twitter}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSaveProfile}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {user.role === "student" && (
                <TabsContent value="resume">
                  <Card>
                    <CardHeader>
                      <CardTitle>Resume Management</CardTitle>
                      <CardDescription>
                        Upload and manage your resume
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Current Resume Status */}
                      {uploadedResume ? (
                        <div className="border rounded-lg p-4">
                          <div className="flex items-start space-x-4">
                            <div className="p-2 bg-primary/10 rounded-md">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{uploadedResume}</h4>
                              <p className="text-muted-foreground text-sm">Uploaded on {uploadDate}</p>
                              <div className="mt-4 flex flex-wrap gap-3">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={handleDownloadResume}
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={handlePreviewResume}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  Preview
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={handleReplaceResume}
                                >
                                  <Upload className="mr-2 h-4 w-4" />
                                  Replace
                                </Button>
                                <input
                                  type="file"
                                  id="resume-replace-input"
                                  className="hidden"
                                  accept=".pdf,.doc,.docx"
                                  onChange={handleResumeChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                            <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">No Resume Found</h3>
                          <p className="text-muted-foreground mb-4">
                            Upload your resume to showcase your skills and experience
                          </p>
                        </div>
                      )}
                      
                      {/* Upload Resume Section */}
                      {!uploadedResume && (
                        <div className="border-2 border-dashed border-input rounded-lg p-6">
                          <div className="text-center">
                            <input
                              type="file"
                              id="resume-upload"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={handleResumeChange}
                            />
                            <label
                              htmlFor="resume-upload"
                              className="cursor-pointer flex flex-col items-center justify-center"
                            >
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Upload className="h-5 w-5 text-primary" />
                              </div>
                              <h4 className="text-sm font-medium mb-1">
                                Click to upload resume
                              </h4>
                              <p className="text-xs text-muted-foreground mb-4">
                                PDF, DOC or DOCX (max. 5MB)
                              </p>
                            </label>
                          </div>
                        </div>
                      )}
                      
                      {/* Show this if a file is selected but not yet uploaded */}
                      {resumeFile && (
                        <div className="mt-6">
                          <div className="flex items-center justify-between px-4 py-3 bg-muted rounded">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-primary" />
                              <span className="text-sm font-medium">{resumeFile.name}</span>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => setResumeFile(null)}
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </Button>
                          </div>
                          <Button 
                            onClick={handleResumeUpload} 
                            className="w-full mt-4"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Resume
                          </Button>
                        </div>
                      )}
                      
                      {/* ATS Score Card */}
                      {uploadedResume && (
                        <ATSScoreCard
                          score={atsScore}
                          aiFeedback={atsFeedback}
                          onDownloadImprovedResume={handleImprovedResumeDownload}
                        />
                      )}
                      
                      {/* Resume Preview */}
                      {uploadedResume && (
                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-4">Resume Preview</h3>
                          <div className="border rounded-lg p-4 bg-muted/30">
                            <ResumePreview
                              fileUrl={resumeUrl || ""}
                              fileName={uploadedResume}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;

