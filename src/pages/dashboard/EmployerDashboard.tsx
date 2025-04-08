
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
  Sparkles
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
  
  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      
      // Get posted internships
      const internships = getEmployerInternships(user.id);
      setPostedInternships(internships);
      
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
  }, [user]);
  
  const handleStatusChange = async (applicationId: string, status: string) => {
    try {
      await updateApplicationStatus(applicationId, status as any);
      
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
              Welcome back, {user.name}! Manage your internship listings and applications.
            </p>
          </div>
          <div>
            <Button onClick={() => navigate("/post-internship")}>
              <Plus className="mr-2 h-4 w-4" />
              Post New Internship
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Internships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{postedInternships.length}</div>
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
            <Card>
              <CardHeader>
                <CardTitle>Your Internship Listings</CardTitle>
                <CardDescription>
                  Manage your active internship postings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {postedInternships.length > 0 ? (
                  <div className="space-y-4">
                    {postedInternships.map((internship) => (
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
                                // Implementation for view applications would go here
                              }}>
                                View Applications
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
                                    onValueChange={(value) => handleStatusChange(application.id, value)}
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
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Manage Internships
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Users className="mr-2 h-4 w-4" />
                  View All Applicants
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <FileText className="mr-2 h-4 w-4" />
                  Update Company Profile
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
                
                <div className="p-4 bg-muted rounded-lg opacity-75">
                  <h3 className="font-medium mb-2">Candidate Matching</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    AI-powered matching to find the best candidates for your internships.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Coming Soon
                  </Button>
                </div>
                
                <div className="p-4 bg-muted rounded-lg opacity-75">
                  <h3 className="font-medium mb-2">Interview Question Generator</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Generate custom interview questions based on the internship requirements.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Coming Soon
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
