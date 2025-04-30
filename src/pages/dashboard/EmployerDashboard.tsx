
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { useInternships } from "@/context/InternshipContext";
import { useAI } from "@/context/AIContext";
import { Internship, Application } from "@/types";
import { 
  CalendarDays, 
  Clock, 
  FileText, 
  Plus, 
  Users, 
  Briefcase, 
  CheckCircle,
  XCircle,
  Sparkles,
  Trophy,
  BarChart,
  UserCheck,
  Search
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    getEmployerInternships, 
    getApplicationsForInternship, 
    updateApplicationStatus 
  } = useInternships();
  const { generateJobDescription } = useAI();
  const { toast } = useToast();
  
  const [postedInternships, setPostedInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Record<string, Application[]>>({});
  const [totalApplications, setTotalApplications] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [matchedCandidates, setMatchedCandidates] = useState([
    {
      id: "cand-1",
      name: "Alex Johnson",
      matchScore: 95,
      role: "Frontend Developer",
      topSkills: ["React", "TypeScript", "UI Design"],
      interviewScore: 88,
      challengeScore: 92
    },
    {
      id: "cand-2",
      name: "Samantha Williams",
      matchScore: 91,
      role: "Data Scientist",
      topSkills: ["Python", "Machine Learning", "SQL"],
      interviewScore: 94,
      challengeScore: 86
    },
    {
      id: "cand-3",
      name: "Michael Chen",
      matchScore: 87,
      role: "Backend Developer",
      topSkills: ["Node.js", "Express", "MongoDB"],
      interviewScore: 82,
      challengeScore: 90
    }
  ]);
  
  const [totalJobs, setTotalJobs] = useState(0);
  
  useEffect(() => {
    const loadDashboardData = () => {
      if (!user) return;
      
      // Get posted internships - these are synchronous functions
      const internships = getEmployerInternships(user.id);
      setPostedInternships(internships);
      setTotalJobs(internships.length);
      
      // Get applications for each internship
      const allApplications: Record<string, Application[]> = {};
      let appCount = 0;
      
      for (const internship of internships) {
        const apps = getApplicationsForInternship(internship.id);
        allApplications[internship.id] = apps;
        appCount += apps.length;
      }
      
      setApplications(allApplications);
      setTotalApplications(appCount);
      setIsLoading(false);
    };
    
    loadDashboardData();
  }, [user, getEmployerInternships, getApplicationsForInternship]);
  
  const handleStatusChange = async (applicationId: string, status: Application["status"]) => {
    try {
      await updateApplicationStatus(applicationId, status);
      
      // Update local state to reflect the change
      const updatedApplications = { ...applications };
      
      for (const internshipId in updatedApplications) {
        updatedApplications[internshipId] = updatedApplications[internshipId].map(app => 
          app.id === applicationId ? { ...app, status } : app
        );
      }
      
      setApplications(updatedApplications);
      
      toast({
        title: "Status updated",
        description: `Application status has been updated to ${status}`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };
  
  if (!user || user.role !== "employer") {
    navigate("/");
    return null;
  }
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="heading-2 mb-2">Employer Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Manage your internship listings and applications.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => navigate("/hackathons/create")}>
              <Trophy className="mr-2 h-4 w-4" />
              Host Hackathon
            </Button>
            <Button onClick={() => navigate("/post-internship")}>
              <Plus className="mr-2 h-4 w-4" />
              Post New Internship
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Jobs Posted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalJobs}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalApplications}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Shortlisted Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Object.values(applications).flat().filter(app => app.status === "shortlisted").length}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Candidate Matching Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>AI Candidate Matching</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/employer/candidates")}>
                    View All Matches
                  </Button>
                </div>
                <CardDescription>
                  Best-fit candidates based on role, skills, and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {matchedCandidates.map(candidate => (
                    <div key={candidate.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{candidate.name}</h3>
                            <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              {candidate.matchScore}% Match
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Best match for: {candidate.role}</p>
                          
                          <div className="mt-3 flex flex-wrap gap-2">
                            {candidate.topSkills.map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          <div className="mt-3 grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-xs text-muted-foreground">Interview Score</span>
                              <div className="flex items-center">
                                <span className="text-sm font-medium">{candidate.interviewScore}%</span>
                                <div className="ml-2 flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500" 
                                    style={{ width: `${candidate.interviewScore}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Challenge Score</span>
                              <div className="flex items-center">
                                <span className="text-sm font-medium">{candidate.challengeScore}%</span>
                                <div className="ml-2 flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-purple-500" 
                                    style={{ width: `${candidate.challengeScore}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end justify-between gap-3">
                          <div className="flex space-x-2">
                            <Button size="sm">View Profile</Button>
                            <Button size="sm" variant="outline">Contact</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full" onClick={() => navigate("/employer/candidates")}>
                    <Search className="mr-2 h-4 w-4" />
                    Find More Matching Candidates
                  </Button>
                </div>
              </CardContent>
            </Card>
          
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Internship Listings</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/employer/manage-jobs")}>
                    View All
                  </Button>
                </div>
                <CardDescription>
                  Manage your active internship postings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {postedInternships.length > 0 ? (
                  <div className="space-y-4">
                    {postedInternships.slice(0, 3).map((internship) => (
                      <div 
                        key={internship.id} 
                        className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                        onClick={() => navigate(`/internships/${internship.id}`)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-medium">{internship.title}</h3>
                            <div className="flex items-center text-sm mt-1">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>Posted {formatDistanceToNow(new Date(internship.postedDate), { addSuffix: true })}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-start md:items-end">
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{applications[internship.id]?.length || 0} applications</span>
                            </div>
                            <div className="flex mt-2 space-x-2">
                              <Button variant="outline" size="sm" onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/employer/candidates?jobId=${internship.id}`);
                              }}>
                                View Matching Candidates
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {postedInternships.length > 3 && (
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => navigate("/employer/manage-jobs")}
                      >
                        View All {postedInternships.length} Job Listings
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">You haven't posted any internships yet.</p>
                    <Button onClick={() => navigate("/post-internship")}>
                      Post Your First Internship
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  Review and manage candidate applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {totalApplications > 0 ? (
                  <div className="space-y-4">
                    {postedInternships.map((internship) => {
                      const internshipApps = applications[internship.id] || [];
                      if (internshipApps.length === 0) return null;
                      
                      return (
                        <div key={internship.id} className="space-y-3">
                          <h3 className="font-medium text-sm">{internship.title}</h3>
                          {internshipApps.slice(0, 3).map((application) => (
                            <div key={application.id} className="border rounded-lg p-4">
                              <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div>
                                  <h4 className="font-medium">Applicant ID: {application.studentId}</h4>
                                  <div className="flex items-center text-sm mt-1">
                                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span>Applied {formatDistanceToNow(new Date(application.appliedDate), { addSuffix: true })}</span>
                                  </div>
                                  {application.coverLetter && (
                                    <div className="mt-3">
                                      <p className="text-sm text-muted-foreground line-clamp-2">{application.coverLetter}</p>
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col md:items-end gap-2">
                                  <Select
                                    value={application.status}
                                    onValueChange={(value) => handleStatusChange(application.id, value as Application["status"])}
                                  >
                                    <SelectTrigger className="w-36">
                                      <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="reviewing">Reviewing</SelectItem>
                                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                      <SelectItem value="rejected">Rejected</SelectItem>
                                      <SelectItem value="accepted">Accepted</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  
                                  <div className="flex space-x-2 mt-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleStatusChange(application.id, "shortlisted")}
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                      Shortlist
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleStatusChange(application.id, "rejected")}
                                    >
                                      <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                      Reject
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {internshipApps.length > 3 && (
                            <Button variant="ghost" size="sm" className="w-full">
                              View all {internshipApps.length} applications
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No applications received yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Hackathon Hosting Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Hackathons</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/hackathons/employer")}>
                    View All
                  </Button>
                </div>
                <CardDescription>
                  Manage your job-specific hackathons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">Backend Challenge Hackathon</h3>
                          <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Active
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Linked to: Senior Backend Developer</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center text-sm">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>Ends in 5 days</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>23 participants</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end justify-between">
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-2">
                    <Button onClick={() => navigate("/hackathons/create")} className="w-full">
                      <Trophy className="mr-2 h-4 w-4" />
                      Create & Host New Hackathon
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/post-internship")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Internship
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/hackathons/create")}>
                  <Trophy className="mr-2 h-4 w-4" />
                  Host Hackathon
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/employer/candidates")}>
                  <UserCheck className="mr-2 h-4 w-4" />
                  View AI Matched Candidates
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/employer/manage-jobs")}>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Manage Jobs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  View All Applicants
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Update Company Profile
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/market-trends")}>
                  <BarChart className="mr-2 h-4 w-4" />
                  View Market Trends
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle>AI Assistant</CardTitle>
                </div>
                <CardDescription>
                  Get help with your hiring process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-medium mb-2">Job Description Generator</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Let our AI help you create compelling job descriptions for your internship postings.
                  </p>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate("/post-internship")}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Try It Now
                  </Button>
                </div>
                
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-medium mb-2">Candidate Matching</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    AI-powered matching to find the best candidates for your internships.
                  </p>
                  <Button variant="default" size="sm" className="w-full">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Find Matches
                  </Button>
                </div>
                
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-medium mb-2">Interview Question Generator</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Generate custom interview questions based on the internship requirements.
                  </p>
                  <Button variant="default" size="sm" className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Questions
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Application Statistics</CardTitle>
                <CardDescription>
                  Overview of your application pipeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending</span>
                    <span className="text-sm font-medium">
                      {Object.values(applications).flat().filter(app => app.status === "pending").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reviewing</span>
                    <span className="text-sm font-medium">
                      {Object.values(applications).flat().filter(app => app.status === "reviewing").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Shortlisted</span>
                    <span className="text-sm font-medium">
                      {Object.values(applications).flat().filter(app => app.status === "shortlisted").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rejected</span>
                    <span className="text-sm font-medium">
                      {Object.values(applications).flat().filter(app => app.status === "rejected").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Accepted</span>
                    <span className="text-sm font-medium">
                      {Object.values(applications).flat().filter(app => app.status === "accepted").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployerDashboard;
