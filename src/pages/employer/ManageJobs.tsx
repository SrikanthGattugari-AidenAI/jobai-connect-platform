
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { useJobs } from "@/context/JobContext";
import { formatDistanceToNow } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Users, Calendar, Plus, Eye, CheckCircle, XCircle, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobs } = useJobs();
  const [activeTab, setActiveTab] = useState("active");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  
  // Filter jobs by employer ID and active status
  const employerJobs = jobs.filter(job => job.employerId === user?.id);
  const activeJobs = employerJobs.filter(job => {
    const deadline = new Date(job.applicationDeadline);
    return deadline >= new Date();
  });
  const inactiveJobs = employerJobs.filter(job => {
    const deadline = new Date(job.applicationDeadline);
    return deadline < new Date();
  });

  // Mock data for applicants and interviews - would be replaced with actual data from backend
  const getApplicantCount = (jobId: string) => {
    return Math.floor(Math.random() * 50) + 5; // Random number between 5 and 55
  };

  const getInterviewCount = (jobId: string) => {
    return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  };

  const toggleJobStatus = (jobId: string) => {
    // In a real app, this would call an API to update the job status
    toast.success("Job status updated successfully");
  };

  const toggleJobExpanded = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  // Generate mock applicant data for a job
  const getMockApplicants = (jobId: string, count: number) => {
    const applicants = [];
    const names = ["Alex Smith", "Jamie Lee", "Chris Wong", "Taylor Jones", "Morgan Reed"];
    const statuses = ["Applied", "Resume Screening", "Interview Scheduled", "Technical Assessment", "Hired", "Rejected"];
    
    for (let i = 0; i < count; i++) {
      applicants.push({
        id: `app-${jobId}-${i}`,
        name: names[i % names.length],
        email: `applicant${i}@example.com`,
        appliedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: statuses[Math.floor(Math.random() * statuses.length)]
      });
    }
    
    return applicants;
  };

  const renderJobCard = (job: Job) => {
    const applicantCount = getApplicantCount(job.id);
    const interviewCount = getInterviewCount(job.id);
    const isExpanded = expandedJobId === job.id;
    const mockApplicants = isExpanded ? getMockApplicants(job.id, 5) : [];

    return (
      <Card key={job.id} className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between">
            <div>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription className="mt-1">{job.company} • {job.location}</CardDescription>
            </div>
            <Badge variant={job.employmentType === "full-time" ? "default" : "outline"}>
              {job.employmentType}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{job.experienceLevel} • Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{applicantCount} applicants</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{interviewCount} interviews scheduled</span>
              </div>
              <div className="flex items-center text-sm pt-2">
                <span className="mr-2 font-medium">Active Status:</span>
                <Switch 
                  checked={activeTab === "active"} 
                  onCheckedChange={() => toggleJobStatus(job.id)}
                />
                <span className="ml-2 text-muted-foreground">
                  {activeTab === "active" ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Button size="sm" variant="outline" onClick={() => navigate(`/jobs/${job.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
              <Button size="sm" onClick={() => navigate(`/employer/candidates?jobId=${job.id}`)}>
                <Users className="mr-2 h-4 w-4" />
                View Matching Candidates
              </Button>
            </div>
          </div>

          <Button 
            variant="ghost" 
            className="mt-4 w-full flex justify-center items-center border-t pt-2" 
            onClick={() => toggleJobExpanded(job.id)}
          >
            {isExpanded ? "Hide Applicants" : "Show Applicants"}
          </Button>
          
          {isExpanded && (
            <div className="mt-4 border-t pt-4">
              <h4 className="font-medium mb-3">Recent Applicants</h4>
              <div className="space-y-3">
                {mockApplicants.map((applicant) => (
                  <div key={applicant.id} className="flex justify-between items-center p-2 rounded-md hover:bg-accent/10">
                    <div>
                      <div className="font-medium">{applicant.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Applied {formatDistanceToNow(new Date(applicant.appliedDate), { addSuffix: true })}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant={
                        applicant.status === "Hired" ? "default" : 
                        applicant.status === "Rejected" ? "destructive" : 
                        "outline"
                      }>
                        {applicant.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="ml-2" onClick={() => navigate(`/employer/candidates?applicantId=${applicant.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm" onClick={() => navigate(`/employer/candidates?jobId=${job.id}`)}>
                  View All Applicants
                </Button>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Application Statistics</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{applicantCount}</div>
                    <div className="text-xs text-muted-foreground">Total Applicants</div>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{interviewCount}</div>
                    <div className="text-xs text-muted-foreground">Interviews</div>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{Math.floor(applicantCount * 0.15)}</div>
                    <div className="text-xs text-muted-foreground">Strong Matches</div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 w-full"
                  onClick={() => navigate(`/employer/candidates?jobId=${job.id}`)}
                >
                  <BarChart className="mr-2 h-4 w-4" />
                  View Detailed Analytics
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <MainLayout>
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="heading-2 mb-2">Manage Your Jobs</h1>
            <p className="text-muted-foreground">
              View and manage all your job postings in one place
            </p>
          </div>
          <Button onClick={() => navigate("/post-internship")}>
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>

        <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="active">Active Jobs ({activeJobs.length})</TabsTrigger>
            <TabsTrigger value="inactive">Inactive Jobs ({inactiveJobs.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeJobs.length > 0 ? (
              activeJobs.map(renderJobCard)
            ) : (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <Briefcase className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-1">No active jobs</h3>
                <p className="text-muted-foreground mb-6">You don't have any active job postings yet.</p>
                <Button onClick={() => navigate("/post-internship")}>
                  Post Your First Job
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="inactive">
            {inactiveJobs.length > 0 ? (
              inactiveJobs.map(renderJobCard)
            ) : (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <Briefcase className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-1">No inactive jobs</h3>
                <p className="text-muted-foreground mb-6">You don't have any expired job postings.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ManageJobs;
