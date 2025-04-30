
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
import { Briefcase, Users, Calendar, Plus, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobs } = useJobs();
  const [activeTab, setActiveTab] = useState("active");
  
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

  const renderJobCard = (job: Job) => (
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
              <span>{getApplicantCount(job.id)} applicants</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{getInterviewCount(job.id)} interviews scheduled</span>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button size="sm" variant="outline" onClick={() => navigate(`/jobs/${job.id}`)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
            <Button size="sm" onClick={() => navigate(`/employer/candidates?jobId=${job.id}`)}>
              View Matching Candidates
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
