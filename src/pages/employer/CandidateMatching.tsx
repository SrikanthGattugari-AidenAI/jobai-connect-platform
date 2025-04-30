
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { useJobs } from "@/context/JobContext";
import { Job } from "@/types/job";
import { CheckCircle, Search, Filter, Briefcase, ChevronRight } from "lucide-react";

// Mock data for matched candidates
interface MatchedCandidate {
  id: string;
  name: string;
  matchScore: number;
  role: string;
  topSkills: string[];
  interviewScore?: number;
  challengeScore?: number;
  yearsOfExperience: number;
  location: string;
  education?: string;
}

const CandidateMatching = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobs } = useJobs();
  
  // Parse jobId from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const jobIdFromUrl = queryParams.get("jobId");
  
  const employerJobs = jobs.filter(job => job.employerId === user?.id);
  const [selectedJobId, setSelectedJobId] = useState(jobIdFromUrl || (employerJobs.length > 0 ? employerJobs[0].id : ""));
  const [searchQuery, setSearchQuery] = useState("");
  const [matchThreshold, setMatchThreshold] = useState("70");
  
  // Mock data for candidates
  const [candidates, setCandidates] = useState<MatchedCandidate[]>([]);
  
  useEffect(() => {
    // Generate mock matched candidates when the selected job changes
    if (selectedJobId) {
      const selectedJob = jobs.find(job => job.id === selectedJobId);
      if (selectedJob) {
        generateMockCandidates(selectedJob);
      }
    }
  }, [selectedJobId, jobs]);
  
  const generateMockCandidates = (job: Job) => {
    const mockCandidates: MatchedCandidate[] = [];
    
    // Generate 15 mock candidates based on the job
    for (let i = 0; i < 15; i++) {
      const matchScore = Math.floor(Math.random() * 30) + 70; // 70-100
      mockCandidates.push({
        id: `cand-${i + 1}`,
        name: getRandomName(),
        matchScore,
        role: job.title,
        topSkills: getRandomSkills(job.requirements),
        interviewScore: Math.floor(Math.random() * 30) + 70,
        challengeScore: Math.floor(Math.random() * 30) + 70,
        yearsOfExperience: Math.floor(Math.random() * 10) + 1,
        location: getRandomLocation(),
        education: getRandomEducation()
      });
    }
    
    // Sort by match score
    mockCandidates.sort((a, b) => b.matchScore - a.matchScore);
    setCandidates(mockCandidates);
  };
  
  const getRandomName = () => {
    const firstNames = ["Alex", "Taylor", "Jordan", "Casey", "Riley", "Morgan", "Avery", "Quinn", "Jamie", "Skyler"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
    
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  };
  
  const getRandomSkills = (requirements: string[]) => {
    const allSkills = [
      "React", "TypeScript", "JavaScript", "Node.js", "Python", 
      "SQL", "UI Design", "Data Analysis", "Project Management", 
      "Communication", "Problem Solving", "Leadership"
    ];
    
    // Add some of the job requirements as skills
    const reqSkills = requirements.slice(0, 2).map(req => {
      const words = req.split(' ');
      return words.slice(0, 2).join(' ');
    });
    
    const skills = [...new Set([...reqSkills, ...allSkills])];
    const shuffled = skills.sort(() => 0.5 - Math.random());
    
    // Return 3-5 random skills
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 3);
  };
  
  const getRandomLocation = () => {
    const locations = ["New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA", "Chicago, IL", "Remote"];
    return locations[Math.floor(Math.random() * locations.length)];
  };
  
  const getRandomEducation = () => {
    const degrees = ["BS Computer Science", "MS Data Science", "BA Business", "MBA", "PhD Computer Engineering"];
    const universities = ["Stanford University", "MIT", "UC Berkeley", "Georgia Tech", "University of Washington"];
    
    return `${degrees[Math.floor(Math.random() * degrees.length)]}, ${universities[Math.floor(Math.random() * universities.length)]}`;
  };
  
  // Filter candidates based on search query and match threshold
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          candidate.topSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesThreshold = candidate.matchScore >= parseInt(matchThreshold);
    
    return matchesSearch && matchesThreshold;
  });
  
  const selectedJob = jobs.find(job => job.id === selectedJobId);

  return (
    <MainLayout>
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="heading-2 mb-2">AI Candidate Matching</h1>
            <p className="text-muted-foreground">
              Find the perfect candidates for your job openings
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="job">Select Job</Label>
                  <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                    <SelectTrigger id="job">
                      <SelectValue placeholder="Select a job posting" />
                    </SelectTrigger>
                    <SelectContent>
                      {employerJobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="match-threshold">Minimum Match Score</Label>
                  <Select value={matchThreshold} onValueChange={setMatchThreshold}>
                    <SelectTrigger id="match-threshold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90% and above</SelectItem>
                      <SelectItem value="80">80% and above</SelectItem>
                      <SelectItem value="70">70% and above</SelectItem>
                      <SelectItem value="60">60% and above</SelectItem>
                      <SelectItem value="50">50% and above</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="search-candidates">Search Candidates</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search-candidates"
                      placeholder="Search by name, skills, role..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selected Job</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedJob ? (
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium">{selectedJob.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedJob.company}</p>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedJob.experienceLevel}</span>
                      </div>
                      <div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-2"
                          onClick={() => navigate(`/jobs/${selectedJob.id}`)}
                        >
                          View Job Details
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <h4 className="text-sm font-medium mb-2">Key Requirements</h4>
                      <ul className="text-sm space-y-1">
                        {selectedJob.requirements.slice(0, 3).map((req, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                            <span className="line-clamp-1">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No job selected</p>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Matched Candidates</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredCandidates.length} candidates
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredCandidates.length > 0 ? (
                  <div className="space-y-6">
                    {filteredCandidates.map((candidate) => (
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
                            <p className="text-sm text-muted-foreground mt-1">
                              {candidate.yearsOfExperience} years experience • {candidate.location}
                            </p>
                            
                            <div className="mt-3 flex flex-wrap gap-2">
                              {candidate.topSkills.map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            
                            {candidate.education && (
                              <p className="text-sm mt-2">{candidate.education}</p>
                            )}
                            
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
                ) : (
                  <div className="text-center py-12">
                    <Search className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium mb-1">No matches found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search criteria
                    </p>
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

export default CandidateMatching;
