
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { EmployerNavigation } from "@/components/dashboard/EmployerNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useJobs } from "@/context/JobContext";
import { useAuth } from "@/context/AuthContext";
import { Search, Sparkles, CheckCircle } from "lucide-react";

// Mock candidate data
const mockCandidates = [
  {
    id: "cand-1",
    name: "Alex Johnson",
    matchScore: 95,
    role: "Full-Stack Developer",
    topSkills: ["React", "TypeScript", "Node.js", "MongoDB"],
    interviewScore: 88,
    challengeScore: 92
  },
  {
    id: "cand-2",
    name: "Samantha Williams",
    matchScore: 91,
    role: "Frontend Developer",
    topSkills: ["React", "Vue.js", "CSS", "UX Design"],
    interviewScore: 94,
    challengeScore: 86
  },
  {
    id: "cand-3",
    name: "Michael Chen",
    matchScore: 87,
    role: "Backend Developer",
    topSkills: ["Node.js", "Express", "MongoDB", "AWS"],
    interviewScore: 82,
    challengeScore: 90
  },
  {
    id: "cand-4",
    name: "Emily Rodriguez",
    matchScore: 84,
    role: "Full-Stack Developer",
    topSkills: ["Angular", "Java", "Spring", "MySQL"],
    interviewScore: 79,
    challengeScore: 88
  },
  {
    id: "cand-5",
    name: "David Kim",
    matchScore: 82,
    role: "Frontend Developer",
    topSkills: ["React", "Redux", "SCSS", "Webpack"],
    interviewScore: 85,
    challengeScore: 78
  }
];

const CandidateMatching = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobs } = useJobs();
  const [candidates, setCandidates] = useState(mockCandidates);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  
  useEffect(() => {
    if (jobId) {
      // Find the job by ID
      const job = jobs.find(job => job.id === jobId);
      setSelectedJob(job);
      
      // In a real implementation, you would fetch candidates matching this job
      // Here we're just using the mock data
    } else {
      // If no job ID is provided, display all AI-matched candidates
    }
  }, [jobId, jobs]);
  
  return (
    <MainLayout>
      <EmployerNavigation />
      
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="heading-2 mb-2">AI Candidate Matching</h1>
            <p className="text-muted-foreground">
              {selectedJob 
                ? `Viewing candidates matched for ${selectedJob.title}`
                : "Find the best candidates for your jobs with AI matching"
              }
            </p>
          </div>
          <div className="flex space-x-3">
            {selectedJob && (
              <Button variant="outline" onClick={() => navigate("/candidate-matching")}>
                View All Matches
              </Button>
            )}
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Find New Candidates
            </Button>
          </div>
        </div>
        
        {selectedJob && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedJob.title}</h3>
                  <p className="text-muted-foreground">{selectedJob.company}</p>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => navigate(`/jobs/${selectedJob.id}`)}>
                    View Full Job Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <CardTitle>Matched Candidates</CardTitle>
              <div className="ml-auto flex items-center bg-primary/10 text-primary text-sm py-1 px-3 rounded-full">
                <Sparkles className="h-4 w-4 mr-1" />
                AI Powered Matching
              </div>
            </div>
            <CardDescription>
              Candidates are ranked by match score based on skills, experience, and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {candidates.map(candidate => (
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
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CandidateMatching;
