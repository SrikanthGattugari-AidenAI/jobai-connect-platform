import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { useInternships } from "@/context/InternshipContext";
import { useCourses } from "@/context/CourseContext";
import { useAI } from "@/context/AIContext";
import { Internship, Course, Application } from "@/types";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Briefcase, 
  Clock, 
  DollarSign, 
  FileText, 
  MapPin, 
  Sparkles, 
  UserCheck,
  BarChart,
  Mic,
  Video,
  Code,
  Trophy
} from "lucide-react";
import { format } from "date-fns";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    internships, 
    getSavedInternships, 
    getStudentApplications
  } = useInternships();
  const { 
    courses, 
    getEnrolledCourses, 
    getCompletedCourses 
  } = useCourses();
  const { recommendSkills } = useAI();
  
  const [savedInternships, setSavedInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [recommendedInternships, setRecommendedInternships] = useState<Internship[]>([]);
  const [recommendedSkills, setRecommendedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [jobsByCategory, setJobsByCategory] = useState({
    engineering: 0,
    design: 0,
    marketing: 0,
    business: 0,
    other: 0
  });
  const [jobsByLocation, setJobsByLocation] = useState({
    remote: 0,
    onsite: 0
  });
  
  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      
      // Get saved internships
      const savedIds = getSavedInternships(user.id);
      const saved = internships.filter(internship => savedIds.includes(internship.id));
      setSavedInternships(saved);
      
      // Get applications
      const apps = getStudentApplications(user.id);
      setApplications(apps);
      
      // Get enrolled courses
      const enrolledIds = getEnrolledCourses(user.id);
      const enrolled = courses.filter(course => enrolledIds.includes(course.id));
      setEnrolledCourses(enrolled);
      
      // Get recommended internships (simple algorithm for demo)
      let recommended = [...internships];
      // Filter out already applied internships
      const appliedIds = apps.map(app => app.internshipId);
      recommended = recommended.filter(internship => !appliedIds.includes(internship.id));
      // Sort by posting date (newest first)
      recommended.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
      // Take first 3
      setRecommendedInternships(recommended.slice(0, 3));
      
      // Get skill recommendations
      try {
        const skills = await recommendSkills(user.id);
        setRecommendedSkills(skills);
      } catch (error) {
        console.error("Error getting skill recommendations:", error);
      }
      
      // Get total jobs count and analytics
      const totalJobsCount = internships.length;
      setTotalJobs(totalJobsCount);
      
      // Calculate jobs by category
      const engineeringJobs = internships.filter(job => 
        job.category?.toLowerCase().includes('engineer') || 
        job.category?.toLowerCase().includes('developer') || 
        job.category?.toLowerCase().includes('programming')
      ).length;
      
      const designJobs = internships.filter(job => 
        job.category?.toLowerCase().includes('design') || 
        job.category?.toLowerCase().includes('ui') || 
        job.category?.toLowerCase().includes('ux')
      ).length;
      
      const marketingJobs = internships.filter(job => 
        job.category?.toLowerCase().includes('marketing') || 
        job.category?.toLowerCase().includes('content') || 
        job.category?.toLowerCase().includes('social')
      ).length;
      
      const businessJobs = internships.filter(job => 
        job.category?.toLowerCase().includes('business') || 
        job.category?.toLowerCase().includes('finance') || 
        job.category?.toLowerCase().includes('operations')
      ).length;
      
      setJobsByCategory({
        engineering: engineeringJobs,
        design: designJobs,
        marketing: marketingJobs,
        business: businessJobs,
        other: totalJobsCount - (engineeringJobs + designJobs + marketingJobs + businessJobs)
      });
      
      // Calculate jobs by location
      const remoteJobs = internships.filter(job => job.isRemote).length;
      setJobsByLocation({
        remote: remoteJobs,
        onsite: totalJobsCount - remoteJobs
      });
      
      setIsLoading(false);
    };
    
    loadDashboardData();
  }, [user, internships, courses]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "shortlisted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "accepted":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  if (!user || user.role !== "student") {
    navigate("/");
    return null;
  }
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="heading-2 mb-2">Student Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}! Here's an overview of your internship journey.
            </p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => navigate("/internships")}>
              Browse Internships
            </Button>
            <Button onClick={() => navigate("/mock-interview")}>
              <Mic className="mr-2 h-4 w-4" />
              Practice Interview
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Jobs Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalJobs}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{enrolledCourses.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saved Internships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{savedInternships.length}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Job Analytics Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Job Analytics</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/market-trends")}>
                    View All
                  </Button>
                </div>
                <CardDescription>
                  Current job market analytics and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Jobs by Category</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Engineering/Dev</span>
                        <span className="text-sm font-medium">{jobsByCategory.engineering}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${(jobsByCategory.engineering / totalJobs) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Design</span>
                        <span className="text-sm font-medium">{jobsByCategory.design}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500" 
                          style={{ width: `${(jobsByCategory.design / totalJobs) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Marketing</span>
                        <span className="text-sm font-medium">{jobsByCategory.marketing}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${(jobsByCategory.marketing / totalJobs) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Business</span>
                        <span className="text-sm font-medium">{jobsByCategory.business}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500" 
                          style={{ width: `${(jobsByCategory.business / totalJobs) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Other</span>
                        <span className="text-sm font-medium">{jobsByCategory.other}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gray-500" 
                          style={{ width: `${(jobsByCategory.other / totalJobs) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Jobs by Location</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Remote</span>
                        <span className="text-sm font-medium">{jobsByLocation.remote}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-teal-500" 
                          style={{ width: `${(jobsByLocation.remote / totalJobs) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">On-site</span>
                        <span className="text-sm font-medium">{jobsByLocation.onsite}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500" 
                          style={{ width: `${(jobsByLocation.onsite / totalJobs) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mt-6 mb-2">Top Companies Hiring</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Tech Giants</span>
                        <span className="text-sm font-medium">42</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Startups</span>
                        <span className="text-sm font-medium">78</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Mid-Size Companies</span>
                        <span className="text-sm font-medium">63</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button variant="outline" className="w-full" onClick={() => navigate("/market-trends")}>
                    <BarChart className="mr-2 h-4 w-4" />
                    View Detailed Job Market Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Applications</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/internships")}>
                    View All
                  </Button>
                </div>
                <CardDescription>
                  Track the status of your internship applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.map((application) => {
                      const internship = internships.find(i => i.id === application.internshipId);
                      if (!internship) return null;
                      
                      return (
                        <div 
                          key={application.id} 
                          className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                          onClick={() => navigate(`/internships/${internship.id}`)}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-medium">{internship.title}</h3>
                              <p className="text-sm text-muted-foreground">{internship.company}</p>
                              <div className="flex items-center text-sm mt-2">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>Applied on {format(new Date(application.appliedDate), "MMM d, yyyy")}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-start md:items-end">
                              <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(application.status)}`}>
                                {application.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">You haven't applied to any internships yet.</p>
                    <Button onClick={() => navigate("/internships")}>
                      Browse Internships
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recommended Internships</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/internships")}>
                    View All
                  </Button>
                </div>
                <CardDescription>
                  Personalized internship recommendations based on your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedInternships.map((internship) => (
                    <div 
                      key={internship.id} 
                      className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                      onClick={() => navigate(`/internships/${internship.id}`)}
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                          <h3 className="font-medium">{internship.title}</h3>
                          <p className="text-sm text-muted-foreground">{internship.company}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <div className="flex items-center text-sm">
                              <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span>{internship.isRemote ? "Remote" : `${internship.city}, ${internship.country}`}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                              <span>{internship.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-1/4 flex flex-col justify-center">
                          <div className="flex items-center text-sm font-medium">
                            <DollarSign className="mr-1 h-4 w-4" />
                            <span>
                              {internship.stipend.isPaid 
                                ? `${internship.stipend.amount} ${internship.stipend.currency}/month` 
                                : "Unpaid"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-sm text-muted-foreground w-full">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Recommendations are based on your profile and activity</span>
                </div>
              </CardFooter>
            </Card>
            
            {/* Hackathons Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Relevant Hackathons</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/hackathons")}>
                    View All
                  </Button>
                </div>
                <CardDescription>
                  Job-specific hackathons matching your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer" onClick={() => navigate("/hackathons/1")}>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-3/4">
                        <div className="flex items-center">
                          <h3 className="font-medium">Frontend Challenge Hackathon</h3>
                          <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 border-blue-200">Matched To Your Skills</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Hosted by TechCorp Inc.</p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <div className="flex items-center text-sm">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>Ends in 7 days</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Trophy className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>Internship opportunity for winners</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/4 flex items-center justify-end">
                        <Button size="sm">
                          Join Now
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer" onClick={() => navigate("/hackathons/2")}>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-3/4">
                        <div className="flex items-center">
                          <h3 className="font-medium">Data Science Hackathon</h3>
                          <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">Beginner Friendly</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Hosted by AI Research Labs</p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <div className="flex items-center text-sm">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>Ends in 14 days</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Trophy className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>Cash prizes + interviews</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/4 flex items-center justify-end">
                        <Button size="sm">
                          Join Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Skill Recommendations</CardTitle>
                <CardDescription>
                  Based on your profile and the job market
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recommendedSkills.length > 0 ? (
                  <div className="space-y-3">
                    {recommendedSkills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        </div>
                        <span>{skill}</span>
                      </div>
                    ))}
                    <div className="pt-4">
                      <Button className="w-full" onClick={() => navigate("/courses")}>
                        Find Related Courses
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-2">Complete a mock interview to get personalized skill recommendations.</p>
                    <Button variant="outline" onClick={() => navigate("/mock-interview")}>
                      Try Mock Interview
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Courses</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/courses")}>
                    View All
                  </Button>
                </div>
                <CardDescription>
                  Track your enrolled courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enrolledCourses.length > 0 ? (
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div 
                        key={course.id} 
                        className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                        onClick={() => navigate(`/courses/${course.id}`)}
                      >
                        <h3 className="font-medium">{course.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>{course.instructor}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {course.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {course.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-2">You haven't enrolled in any courses yet.</p>
                    <Button variant="outline" onClick={() => navigate("/courses")}>
                      Explore Courses
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/mock-interview")}>
                  <Mic className="mr-2 h-4 w-4" />
                  Practice Audio Interview
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/mock-interview")} disabled>
                  <Video className="mr-2 h-4 w-4" />
                  Video Interview (Coming Soon)
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/technical-challenge")}>
                  <Code className="mr-2 h-4 w-4" />
                  Technical Challenges
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/hackathons")}>
                  <Trophy className="mr-2 h-4 w-4" />
                  Browse Hackathons
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/internships")}>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Browse Internships
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/resume-builder")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Update Resume
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;
