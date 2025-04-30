
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
import { Briefcase, Users, Calendar, Plus, Eye, CheckCircle, XCircle, BarChart, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobs } = useJobs();
  const [activeTab, setActiveTab] = useState("active");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);
  
  // Filter jobs by employer ID and active status
  const employerJobs = jobs.filter(job => job.employerId === user?.id || job.employerId === "employer-1");
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

  const deactivateJob = (jobId: string) => {
    // In a real app, this would call an API to deactivate the job
    setJobDetailsOpen(false);
    toast.success("Job has been deactivated");
  };

  const toggleJobExpanded = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const openJobDetails = (job: Job) => {
    setSelectedJob(job);
    setJobDetailsOpen(true);
  };

  const closeJobDetails = () => {
    setJobDetailsOpen(false);
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

    return (
      <Card key={job.id} className="mb-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => openJobDetails(job)}>
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
                <span>Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
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

        {/* Job Details Dialog */}
        <Dialog open={jobDetailsOpen} onOpenChange={setJobDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedJob && (
              <>
                <DialogHeader>
                  <div className="flex justify-between items-start mb-2">
                    <DialogTitle className="text-2xl">{selectedJob.title}</DialogTitle>
                    <Button variant="ghost" size="icon" onClick={closeJobDetails} className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <DialogDescription className="text-base font-medium">{selectedJob.company} • {selectedJob.location}</DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 my-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Employment Type</div>
                      <div>{selectedJob.employmentType.replace('-', ' ')}</div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Experience Level</div>
                      <div>{selectedJob.experienceLevel}</div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Location</div>
                      <div>{selectedJob.isRemote ? "Remote" : `${selectedJob.city}, ${selectedJob.country}`}</div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Posted Date</div>
                      <div>{new Date(selectedJob.postedDate).toLocaleDateString()}</div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Application Deadline</div>
                      <div>{new Date(selectedJob.applicationDeadline).toLocaleDateString()}</div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Salary</div>
                      <div>
                        {selectedJob.salary.isDisclosed 
                          ? `${selectedJob.salary.min?.toLocaleString()}-${selectedJob.salary.max?.toLocaleString()} ${selectedJob.salary.currency}/year` 
                          : "Salary not disclosed"}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Job Description</h3>
                    <p className="text-muted-foreground">{selectedJob.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Responsibilities</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedJob.responsibilities.map((item, index) => (
                        <li key={index} className="text-muted-foreground">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedJob.requirements.map((item, index) => (
                        <li key={index} className="text-muted-foreground">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-muted/20 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Applicant Statistics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-lg p-3 bg-white text-center">
                        <div className="text-2xl font-bold">{getApplicantCount(selectedJob.id)}</div>
                        <div className="text-xs text-muted-foreground">Total Applicants</div>
                      </div>
                      <div className="border rounded-lg p-3 bg-white text-center">
                        <div className="text-2xl font-bold">{getInterviewCount(selectedJob.id)}</div>
                        <div className="text-xs text-muted-foreground">Interviews</div>
                      </div>
                      <div className="border rounded-lg p-3 bg-white text-center">
                        <div className="text-2xl font-bold">{Math.floor(getApplicantCount(selectedJob.id) * 0.15)}</div>
                        <div className="text-xs text-muted-foreground">Strong Matches</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="default" 
                    onClick={() => navigate(`/employer/candidates?jobId=${selectedJob.id}`)}
                    className="w-full sm:w-auto"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    View Matching Candidates
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => deactivateJob(selectedJob.id)}
                    className="w-full sm:w-auto"
                  >
                    Deactivate This Posting
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default ManageJobs;
