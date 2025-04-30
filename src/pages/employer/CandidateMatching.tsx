
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  User, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Mail, 
  Phone, 
  Clock, 
  FileText,
  ChevronRight
} from "lucide-react";
import { Job } from "@/types/job";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

// Mock candidate data
const mockCandidates = [
  {
    id: "cand-1",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    education: "Computer Science, Stanford University",
    experience: "3 years",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    matchScore: 92,
    status: "Applied",
    appliedDate: "2025-04-25T14:30:00",
    resumeUrl: "#",
    jobId: "job-1"
  },
  {
    id: "cand-2",
    name: "Jamie Smith",
    email: "jamie.s@example.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    education: "Software Engineering, MIT",
    experience: "2 years",
    skills: ["JavaScript", "React", "MongoDB", "Docker"],
    matchScore: 87,
    status: "Interview Scheduled",
    appliedDate: "2025-04-24T10:15:00",
    resumeUrl: "#",
    jobId: "job-1"
  },
  {
    id: "cand-3",
    name: "Taylor Wong",
    email: "taylor.w@example.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    education: "Computer Engineering, University of Texas",
    experience: "1 year",
    skills: ["JavaScript", "React", "CSS", "UI/UX"],
    matchScore: 84,
    status: "Resume Screening",
    appliedDate: "2025-04-23T09:45:00",
    resumeUrl: "#",
    jobId: "job-2"
  },
  {
    id: "cand-4",
    name: "Jordan Lee",
    email: "jordan.l@example.com",
    phone: "+1 (555) 789-0123",
    location: "Seattle, WA",
    education: "Information Systems, University of Washington",
    experience: "4 years",
    skills: ["Angular", "TypeScript", "Java", "Spring"],
    matchScore: 79,
    status: "Applied",
    appliedDate: "2025-04-22T16:20:00",
    resumeUrl: "#",
    jobId: "job-3"
  },
  {
    id: "cand-5",
    name: "Casey Martinez",
    email: "casey.m@example.com",
    phone: "+1 (555) 234-5678",
    location: "Chicago, IL",
    education: "Data Science, University of Chicago",
    experience: "2 years",
    skills: ["Python", "React", "SQL", "Data Analysis"],
    matchScore: 76,
    status: "Applied",
    appliedDate: "2025-04-21T11:10:00",
    resumeUrl: "#",
    jobId: "job-2"
  }
];

// Mock jobs for filter dropdown
const mockJobs = [
  { 
    id: "job-1", 
    title: "Frontend Developer", 
    company: "TechCorp",
    description: "We are looking for a skilled frontend developer who can build modern web applications using React.",
    location: "San Francisco, CA",
    postedDate: "2025-04-15T10:00:00",
    applicationCount: 8,
    newApplications: 2
  },
  { 
    id: "job-2", 
    title: "Backend Engineer", 
    company: "DataSystems Inc.",
    description: "Seeking an experienced backend engineer to develop and maintain our server infrastructure.",
    location: "Chicago, IL",
    postedDate: "2025-04-10T14:30:00",
    applicationCount: 12,
    newApplications: 4
  },
  { 
    id: "job-3", 
    title: "UX/UI Designer", 
    company: "CreativeMinds",
    description: "Looking for a talented UX/UI designer to create beautiful and intuitive user interfaces.",
    location: "New York, NY",
    postedDate: "2025-04-05T09:15:00",
    applicationCount: 6,
    newApplications: 1
  },
  { 
    id: "job-4", 
    title: "DevOps Engineer", 
    company: "CloudSolutions",
    description: "Join our team as a DevOps engineer to help automate and scale our cloud infrastructure.",
    location: "Remote",
    postedDate: "2025-04-01T11:45:00",
    applicationCount: 10,
    newApplications: 3
  },
  { 
    id: "job-5", 
    title: "Data Scientist", 
    company: "AnalyticsPro",
    description: "We're hiring a data scientist to analyze and extract insights from our vast datasets.",
    location: "Boston, MA",
    postedDate: "2025-03-25T13:20:00",
    applicationCount: 15,
    newApplications: 5
  }
];

const CandidateMatching = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [view, setView] = useState<"jobs" | "candidates">("jobs");
  
  // Get jobId from query params if available
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get('jobId');
  const applicantId = queryParams.get('applicantId');
  
  useEffect(() => {
    // If jobId is provided in URL, set it as selected job
    if (jobId) {
      setSelectedJob(jobId);
      setView("candidates");
    }
    
    // If applicantId is provided, select that candidate
    if (applicantId) {
      setSelectedCandidate(applicantId);
    }
  }, [jobId, applicantId]);
  
  // Get the currently selected job object
  const currentJob = selectedJob 
    ? mockJobs.find(job => job.id === selectedJob) 
    : null;

  // Get candidates for the selected job
  const jobCandidates = selectedJob 
    ? mockCandidates.filter(candidate => candidate.jobId === selectedJob)
    : [];
  
  // Filter candidates by status based on active tab
  const filteredCandidates = jobCandidates.filter(candidate => {
    if (activeTab === "all") return true;
    if (activeTab === "applied") return candidate.status === "Applied";
    if (activeTab === "screening") return candidate.status === "Resume Screening";
    if (activeTab === "interviews") return candidate.status === "Interview Scheduled";
    return true;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Applied":
        return <Badge variant="outline">{status}</Badge>;
      case "Resume Screening":
        return <Badge variant="secondary">{status}</Badge>;
      case "Interview Scheduled":
        return <Badge variant="default">{status}</Badge>;
      case "Hired":
        return <Badge className="bg-green-500">{status}</Badge>;
      case "Rejected":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    setSelectedCandidate(null);
    setView("candidates");
    navigate(`/employer/candidates?jobId=${jobId}`);
  };

  const handleBackToJobs = () => {
    setView("jobs");
    setSelectedJob(null);
    setSelectedCandidate(null);
    navigate("/employer/candidates");
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="heading-2 mb-2">AI Candidate Matching</h1>
            {view === "jobs" ? (
              <p className="text-muted-foreground">
                View candidates matched to your posted jobs
              </p>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm p-0 h-auto"
                  onClick={handleBackToJobs}
                >
                  All Jobs
                </Button>
                <ChevronRight className="h-4 w-4" />
                <p className="text-muted-foreground font-medium">
                  {currentJob?.title}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {view === "jobs" ? (
          <Card>
            <CardHeader>
              <CardTitle>Posted Jobs</CardTitle>
              <CardDescription>
                Select a job to see matched candidates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Posted Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockJobs.map((job) => {
                    const candidatesForJob = mockCandidates.filter(c => c.jobId === job.id);
                    return (
                      <TableRow 
                        key={job.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleJobSelect(job.id)}
                      >
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>
                          {new Date(job.postedDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-2">{candidatesForJob.length}</span>
                            {job.newApplications > 0 && (
                              <Badge variant="default" className="text-xs bg-green-500 hover:bg-green-600">
                                {job.newApplications} new
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleJobSelect(job.id);
                            }}
                          >
                            View Candidates
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Candidates List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Candidates for {currentJob?.title}</CardTitle>
                  <CardDescription>
                    {filteredCandidates.length} matching candidates found
                  </CardDescription>
                </CardHeader>
                
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="applied">Applied</TabsTrigger>
                    <TabsTrigger value="screening">Screening</TabsTrigger>
                    <TabsTrigger value="interviews">Interviews</TabsTrigger>
                  </TabsList>
                  
                  <CardContent className="pt-6">
                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                      {filteredCandidates.length > 0 ? (
                        filteredCandidates.map(candidate => (
                          <div
                            key={candidate.id}
                            className={`p-3 border rounded-md cursor-pointer transition-colors ${
                              selectedCandidate === candidate.id 
                                ? "border-primary bg-primary/5" 
                                : "hover:border-primary/50"
                            }`}
                            onClick={() => setSelectedCandidate(candidate.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                                  <User className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{candidate.name}</h3>
                                  <p className="text-sm text-muted-foreground">{candidate.education}</p>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="font-bold text-primary">{candidate.matchScore}%</div>
                                <div className="text-xs text-muted-foreground">Match</div>
                              </div>
                            </div>
                            
                            <div className="mt-2 flex justify-between items-center">
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Applied {new Date(candidate.appliedDate).toLocaleDateString()}
                              </div>
                              {getStatusBadge(candidate.status)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <User className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <h3 className="text-lg font-medium mb-1">No candidates found</h3>
                          <p className="text-muted-foreground">
                            No candidates match the current filters
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Tabs>
              </Card>
            </div>
            
            {/* Candidate Details */}
            <div className="lg:col-span-2">
              {selectedCandidate ? (
                (() => {
                  const candidate = filteredCandidates.find(c => c.id === selectedCandidate);
                  if (!candidate) return null;
                  
                  return (
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{candidate.name}</CardTitle>
                            <CardDescription>
                              {candidate.experience} of experience • {candidate.location}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="mb-1">
                              <span className="text-sm font-medium mr-2">Match Score:</span>
                              <span className="text-lg font-bold text-primary">{candidate.matchScore}%</span>
                            </div>
                            <Progress value={candidate.matchScore} className="h-2 w-32" />
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <a href={`mailto:${candidate.email}`} className="text-primary hover:underline">
                                    {candidate.email}
                                  </a>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <a href={`tel:${candidate.phone}`} className="text-primary hover:underline">
                                    {candidate.phone}
                                  </a>
                                </div>
                                <div className="flex items-center text-sm">
                                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{candidate.location}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium mb-2">Education</h3>
                              <div className="flex items-center text-sm">
                                <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{candidate.education}</span>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium mb-2">Experience</h3>
                              <div className="flex items-center text-sm">
                                <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{candidate.experience} of relevant experience</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium mb-2">Application Status</h3>
                              <div className="flex items-center">
                                {getStatusBadge(candidate.status)}
                                <span className="text-sm ml-2">
                                  Last updated: {new Date().toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium mb-2">Skills</h3>
                              <div className="flex flex-wrap gap-2">
                                {candidate.skills.map((skill, index) => (
                                  <Badge key={index} variant="outline">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium mb-2">Resume</h3>
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-2" />
                                View Resume
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-6">
                          <h3 className="text-sm font-medium mb-4">Application Actions</h3>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule Interview
                            </Button>
                            <Button variant="default" size="sm">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Advance to Next Stage
                            </Button>
                            <Button variant="destructive" size="sm">
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject Candidate
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })()
              ) : (
                <Card className="h-full flex items-center justify-center text-center p-8">
                  <div>
                    <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No candidate selected</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Select a candidate from the list to view their detailed profile and manage their application
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CandidateMatching;
