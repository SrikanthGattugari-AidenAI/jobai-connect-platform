
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
import { 
  BookOpen, 
  Briefcase, 
  Clock, 
  DollarSign, 
  FileText, 
  MapPin, 
  Sparkles, 
  UserCheck,
  BarChart
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
              Practice Interview
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saved Internships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{savedInternships.length}</div>
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Mock Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
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
                  <UserCheck className="mr-2 h-4 w-4" />
                  Practice Mock Interview
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/internships")}>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Browse Internships
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/courses")}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Explore Courses
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <FileText className="mr-2 h-4 w-4" />
                  Update Resume
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <BarChart className="mr-2 h-4 w-4" />
                  View Analytics
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
