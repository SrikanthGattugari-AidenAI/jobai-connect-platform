
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
import { 
  CheckCircle, 
  Search, 
  Briefcase, 
  ChevronRight, 
  Users,
  GraduationCap, 
  MapPin,
  Code,
  BarChart3,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Progress } from "@/components/ui/progress";

// Mock data for matched candidates
interface MatchedCandidate {
  id: string;
  name: string;
  matchScore: number;
  avatar?: string;
  role: string;
  topSkills: string[];
  interviewScore?: number;
  challengeScore?: number;
  yearsOfExperience: number;
  location: string;
  education?: string;
  bio?: string;
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
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  
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
        avatar: i % 3 === 0 ? `https://i.pravatar.cc/150?u=${i}` : undefined,
        matchScore,
        role: job.title,
        topSkills: getRandomSkills(job.requirements),
        interviewScore: Math.floor(Math.random() * 30) + 70,
        challengeScore: Math.floor(Math.random() * 30) + 70,
        yearsOfExperience: Math.floor(Math.random() * 10) + 1,
        location: getRandomLocation(),
        education: getRandomEducation(),
        bio: "Passionate professional with experience in building scalable applications and solving complex problems. Looking for opportunities to grow and make an impact."
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
  const viewingCandidate = candidates.find(c => c.id === selectedCandidate);

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
        
        {selectedCandidate ? (
          <div>
            <Button 
              variant="outline"
              className="mb-4"
              onClick={() => setSelectedCandidate(null)}
            >
              Back to Candidates
            </Button>
            
            {viewingCandidate && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4">
                        {viewingCandidate.avatar ? (
                          <img 
                            src={viewingCandidate.avatar} 
                            alt={viewingCandidate.name}
                            className="h-24 w-24 rounded-full object-cover mx-auto"
                          />
                        ) : (
                          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <span className="text-2xl font-bold text-primary">{viewingCandidate.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <CardTitle>{viewingCandidate.name}</CardTitle>
                      <CardDescription className="mt-1">{viewingCandidate.role}</CardDescription>
                      <Badge className="mt-2" variant="outline">
                        {viewingCandidate.matchScore}% Match
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span>{viewingCandidate.location}</span>
                        </div>
                        <div className="flex items-start">
                          <Briefcase className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span>{viewingCandidate.yearsOfExperience} years of experience</span>
                        </div>
                        <div className="flex items-start">
                          <GraduationCap className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span>{viewingCandidate.education}</span>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {viewingCandidate.topSkills.map((skill, idx) => (
                              <Badge key={idx} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">Bio</h4>
                          <p className="text-sm text-muted-foreground">{viewingCandidate.bio}</p>
                        </div>
                        
                        <div className="pt-4 flex space-x-2">
                          <Button className="w-full">Contact</Button>
                          <Button variant="outline" className="w-full">Schedule Interview</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Match Analysis</CardTitle>
                      <CardDescription>
                        Why {viewingCandidate.name} is a good match for {selectedJob?.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2">Overall Match Score</h4>
                          <div className="flex items-center">
                            <span className="text-lg font-medium w-10">{viewingCandidate.matchScore}%</span>
                            <div className="flex-1 ml-2">
                              <Progress value={viewingCandidate.matchScore} className="h-2" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Skills Match</h4>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <span className="text-sm w-32">Technical Skills</span>
                                <div className="flex-1">
                                  <Progress value={85} className="h-2" />
                                </div>
                                <span className="text-sm ml-2">85%</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm w-32">Soft Skills</span>
                                <div className="flex-1">
                                  <Progress value={90} className="h-2" />
                                </div>
                                <span className="text-sm ml-2">90%</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm w-32">Tools & Tech</span>
                                <div className="flex-1">
                                  <Progress value={75} className="h-2" />
                                </div>
                                <span className="text-sm ml-2">75%</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Experience Match</h4>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <span className="text-sm w-32">Years</span>
                                <div className="flex-1">
                                  <Progress value={80} className="h-2" />
                                </div>
                                <span className="text-sm ml-2">80%</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm w-32">Role Relevance</span>
                                <div className="flex-1">
                                  <Progress value={95} className="h-2" />
                                </div>
                                <span className="text-sm ml-2">95%</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm w-32">Industry Fit</span>
                                <div className="flex-1">
                                  <Progress value={85} className="h-2" />
                                </div>
                                <span className="text-sm ml-2">85%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-2">Assessment Results</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                  <CardTitle className="text-base">Technical Interview</CardTitle>
                                  <Badge variant={viewingCandidate.interviewScore! >= 80 ? "default" : "outline"}>
                                    {viewingCandidate.interviewScore}%
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2 text-sm">
                                  <p><strong>Strengths:</strong> Problem solving, system design, code quality.</p>
                                  <p><strong>Areas for Growth:</strong> Performance optimization, testing.</p>
                                  <div className="mt-2">
                                    <Button size="sm" variant="outline">
                                      <Code className="mr-2 h-4 w-4" />
                                      View Interview Recording
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                  <CardTitle className="text-base">Technical Challenge</CardTitle>
                                  <Badge variant={viewingCandidate.challengeScore! >= 80 ? "default" : "outline"}>
                                    {viewingCandidate.challengeScore}%
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2 text-sm">
                                  <p><strong>Strengths:</strong> Code organization, feature implementation.</p>
                                  <p><strong>Areas for Growth:</strong> Error handling, documentation.</p>
                                  <div className="mt-2">
                                    <Button size="sm" variant="outline">
                                      <Code className="mr-2 h-4 w-4" />
                                      View Challenge Solution
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-4">Recommendation</h4>
                          <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="py-4">
                              <div className="flex">
                                <CheckCircle className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-medium">Strongly Recommended for Interview</p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    This candidate shows strong alignment with the job requirements and has demonstrated excellent 
                                    technical skills in their assessments. Their experience with similar roles and technologies 
                                    suggests they would be a strong addition to your team.
                                  </p>
                                  <div className="mt-4 flex space-x-2">
                                    <Button>Schedule Interview</Button>
                                    <Button variant="outline">Send Code Challenge</Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        ) : (
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
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Posted {formatDistanceToNow(new Date(selectedJob.postedDate), { addSuffix: true })}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedJob.isRemote ? "Remote" : selectedJob.location}</span>
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
                      
                      <div className="pt-2 border-t">
                        <h4 className="text-sm font-medium mb-2">Candidate Statistics</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="border rounded-lg p-2 text-center">
                            <div className="text-lg font-bold">{filteredCandidates.length}</div>
                            <div className="text-xs text-muted-foreground">Total Matches</div>
                          </div>
                          <div className="border rounded-lg p-2 text-center">
                            <div className="text-lg font-bold">
                              {filteredCandidates.filter(c => c.matchScore >= 90).length}
                            </div>
                            <div className="text-xs text-muted-foreground">Strong Matches</div>
                          </div>
                        </div>
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
                        <div 
                          key={candidate.id} 
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedCandidate(candidate.id)}
                        >
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex items-start gap-3">
                              {candidate.avatar ? (
                                <img 
                                  src={candidate.avatar} 
                                  alt={candidate.name}
                                  className="h-12 w-12 rounded-full object-cover"
                                />
                              ) : (
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-lg font-bold text-primary">{candidate.name.charAt(0)}</span>
                                </div>
                              )}
                              
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <h3 className="font-medium">{candidate.name}</h3>
                                  <span className="ml-3 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full flex items-center">
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
                                  <p className="text-sm mt-2 flex items-center">
                                    <GraduationCap className="h-3 w-3 mr-1 text-muted-foreground" />
                                    {candidate.education}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex flex-col justify-between gap-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <span className="text-xs text-muted-foreground">Interview Score</span>
                                  <div className="flex items-center">
                                    <span className="text-sm font-medium">{candidate.interviewScore}%</span>
                                    <Progress 
                                      value={candidate.interviewScore}
                                      className="ml-2 flex-1 h-1.5"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <span className="text-xs text-muted-foreground">Challenge Score</span>
                                  <div className="flex items-center">
                                    <span className="text-sm font-medium">{candidate.challengeScore}%</span>
                                    <Progress 
                                      value={candidate.challengeScore}
                                      className="ml-2 flex-1 h-1.5"
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex space-x-2 mt-2">
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
        )}
      </div>
    </MainLayout>
  );
};

export default CandidateMatching;
