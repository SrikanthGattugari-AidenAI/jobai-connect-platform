
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { EmployerNavigation } from "@/components/dashboard/EmployerNavigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useJobs } from "@/context/JobContext";
import { useAuth } from "@/context/AuthContext";
import { Job } from "@/types/job";
import { Briefcase, Calendar, Clock, Plus, Users, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobs } = useJobs();
  const [activeTab, setActiveTab] = useState("active");
  
  // Filter jobs by employer ID and active status
  const employerJobs = jobs.filter(job => job.employerId === user?.id);
  const activeJobs = employerJobs.filter(job => {
    const deadlineDate = new Date(job.applicationDeadline);
    return deadlineDate > new Date();
  });
  const inactiveJobs = employerJobs.filter(job => {
    const deadlineDate = new Date(job.applicationDeadline);
    return deadlineDate <= new Date();
  });
  
  // Function to render job card
  const renderJobCard = (job: Job) => (
    <Card key={job.id} className="mb-4 hover:border-primary transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>{job.company}</CardDescription>
          </div>
          <Button variant="outline" onClick={() => navigate(`/jobs/${job.id}`)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
            </span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{job.employmentType}</span>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-2 flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">25 Applicants</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">8 Interviews Scheduled</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => navigate(`/candidate-matching/${job.id}`)}>
              View Matching Candidates
            </Button>
            <Button variant="default">
              Manage Applications
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <MainLayout>
      <EmployerNavigation />
      
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="heading-2 mb-2">Manage Your Jobs</h1>
            <p className="text-muted-foreground">
              View and manage all your job postings in one place
            </p>
          </div>
          <Button onClick={() => navigate("/post-job")}>
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="active">
              Active Jobs ({activeJobs.length})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive Jobs ({inactiveJobs.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeJobs.length > 0 ? (
              activeJobs.map(renderJobCard)
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="mb-4 text-muted-foreground">You don't have any active job postings.</p>
                  <Button onClick={() => navigate("/post-job")}>
                    Post Your First Job
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="inactive">
            {inactiveJobs.length > 0 ? (
              inactiveJobs.map(renderJobCard)
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="mb-4 text-muted-foreground">You don't have any inactive job postings.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ManageJobs;
