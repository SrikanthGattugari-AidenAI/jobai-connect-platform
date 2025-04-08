
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  Clock,
  Users,
  Star,
  CheckCircle,
  BookOpen,
  Play,
  Award,
  BarChart
} from "lucide-react";
import { useCourses } from "@/context/CourseContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCourse, enrollInCourse, getEnrolledCourses, getCompletedCourses, markCourseAsCompleted } = useCourses();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [course, setCourse] = useState(getCourse(id || ""));
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!course) {
      navigate("/courses");
      return;
    }
    
    if (isAuthenticated && user) {
      const enrolledCourses = getEnrolledCourses(user.id);
      const completedCourses = getCompletedCourses(user.id);
      
      setIsEnrolled(enrolledCourses.includes(course.id));
      setIsCompleted(completedCourses.includes(course.id));
      
      // Simulate progress (would be stored in a real app)
      if (isEnrolled && !isCompleted) {
        setProgress(Math.floor(Math.random() * 75)); // Random progress between 0-75%
      } else if (isCompleted) {
        setProgress(100);
      }
    }
  }, [course, isAuthenticated, user, getEnrolledCourses, getCompletedCourses]);
  
  if (!course) {
    return <MainLayout><div className="container-custom py-12">Loading...</div></MainLayout>;
  }
  
  const handleEnroll = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "Please login to enroll in this course",
        variant: "destructive",
      });
      navigate("/login/student");
      return;
    }
    
    try {
      await enrollInCourse(course.id, user.id);
      setIsEnrolled(true);
      setProgress(0);
      
      toast({
        title: "Enrolled successfully",
        description: `You are now enrolled in "${course.title}"`,
      });
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast({
        title: "Error",
        description: "Failed to enroll in this course. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleMarkCompleted = async () => {
    if (!isAuthenticated || !user) return;
    
    try {
      await markCourseAsCompleted(course.id, user.id);
      setIsCompleted(true);
      setProgress(100);
      
      toast({
        title: "Course completed",
        description: `Congratulations! You've completed "${course.title}"`,
      });
    } catch (error) {
      console.error("Error marking course as completed:", error);
      toast({
        title: "Error",
        description: "Failed to mark course as completed. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="heading-2 mb-2">{course.title}</h1>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{course.enrolled} students</span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-2 h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{course.rating} rating</span>
                </div>
                <div className="flex items-center">
                  <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{course.level}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {course.category}
                </span>
                {course.topics.map((topic, index) => (
                  <span key={index} className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">About This Course</h3>
                  <p className="text-gray-700">
                    {course.description}
                  </p>
                  <p className="mt-4 text-gray-700">
                    This course is designed for {course.level} level students who want to expand their knowledge in {course.category}. Throughout this {course.duration} course, you'll learn essential skills and practical techniques that you can apply to real-world projects.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">What You'll Learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {course.topics.map((topic, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Basic understanding of {course.category.toLowerCase()} concepts</li>
                    <li>A computer with internet access</li>
                    <li>Enthusiasm to learn and practice</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Course Curriculum</h3>
                  <div className="space-y-4">
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted px-4 py-2 font-medium flex items-center justify-between">
                        <span>Section 1: Introduction to {course.title}</span>
                        <span className="text-sm text-muted-foreground">3 lectures • 45 min</span>
                      </div>
                      <div className="divide-y">
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Play className="mr-3 h-4 w-4 text-muted-foreground" />
                            <span>Welcome to the Course</span>
                          </div>
                          <span className="text-sm text-muted-foreground">10 min</span>
                        </div>
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Play className="mr-3 h-4 w-4 text-muted-foreground" />
                            <span>Course Overview</span>
                          </div>
                          <span className="text-sm text-muted-foreground">15 min</span>
                        </div>
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Play className="mr-3 h-4 w-4 text-muted-foreground" />
                            <span>Setting Up Your Environment</span>
                          </div>
                          <span className="text-sm text-muted-foreground">20 min</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted px-4 py-2 font-medium flex items-center justify-between">
                        <span>Section 2: Core Concepts</span>
                        <span className="text-sm text-muted-foreground">4 lectures • 60 min</span>
                      </div>
                      <div className="divide-y">
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Play className="mr-3 h-4 w-4 text-muted-foreground" />
                            <span>Understanding the Basics</span>
                          </div>
                          <span className="text-sm text-muted-foreground">15 min</span>
                        </div>
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Play className="mr-3 h-4 w-4 text-muted-foreground" />
                            <span>Key Principles</span>
                          </div>
                          <span className="text-sm text-muted-foreground">15 min</span>
                        </div>
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Play className="mr-3 h-4 w-4 text-muted-foreground" />
                            <span>Practical Applications</span>
                          </div>
                          <span className="text-sm text-muted-foreground">15 min</span>
                        </div>
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Play className="mr-3 h-4 w-4 text-muted-foreground" />
                            <span>Case Studies</span>
                          </div>
                          <span className="text-sm text-muted-foreground">15 min</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted px-4 py-2 font-medium flex items-center justify-between">
                        <span>Section 3: Advanced Techniques</span>
                        <span className="text-sm text-muted-foreground">5 lectures • 75 min</span>
                      </div>
                      <div className="divide-y">
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Play className="mr-3 h-4 w-4 text-muted-foreground" />
                            <span>Advanced Topic 1</span>
                          </div>
                          <span className="text-sm text-muted-foreground">15 min</span>
                        </div>
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Play className="mr-3 h-4 w-4 text-muted-foreground" />
                            <span>Advanced Topic 2</span>
                          </div>
                          <span className="text-sm text-muted-foreground">15 min</span>
                        </div>
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Play className="mr-3 h-4 w-4 text-muted-foreground" />
                            <span>Advanced Topic 3</span>
                          </div>
                          <span className="text-sm text-muted-foreground">15 min</span>
                        </div>
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Play className="mr-3 h-4 w-4 text-muted-foreground" />
                            <span>Advanced Topic 4</span>
                          </div>
                          <span className="text-sm text-muted-foreground">15 min</span>
                        </div>
                        <div className="px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <Play className="mr-3 h-4 w-4 text-muted-foreground" />
                            <span>Final Project</span>
                          </div>
                          <span className="text-sm text-muted-foreground">15 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="instructor" className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4">
                    <div className="bg-muted rounded-full w-32 h-32 flex items-center justify-center mx-auto md:mx-0">
                      <span className="text-2xl font-bold">{course.instructor.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-lg font-semibold">{course.instructor}</h3>
                    <p className="text-muted-foreground mb-4">Expert in {course.category}</p>
                    
                    <p className="text-gray-700 mb-4">
                      {course.instructor} is a seasoned professional with extensive experience in {course.category.toLowerCase()}. With a passion for teaching and a knack for breaking down complex concepts, they have helped thousands of students master new skills and advance their careers.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="bg-muted p-4 rounded-md">
                        <div className="text-xl font-bold">10+</div>
                        <div className="text-sm text-muted-foreground">Years Experience</div>
                      </div>
                      <div className="bg-muted p-4 rounded-md">
                        <div className="text-xl font-bold">15,000+</div>
                        <div className="text-sm text-muted-foreground">Students</div>
                      </div>
                      <div className="bg-muted p-4 rounded-md">
                        <div className="text-xl font-bold">4.8</div>
                        <div className="text-sm text-muted-foreground">Average Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="sticky top-24 bg-card rounded-lg border shadow-sm overflow-hidden">
              <div className="aspect-video overflow-hidden">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-muted flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="p-6">
                {isEnrolled && (
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Your progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
                
                {isCompleted ? (
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">Course Completed</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Congratulations on completing this course!
                    </p>
                    <Button variant="outline" className="w-full" onClick={() => navigate("/courses")}>
                      Browse More Courses
                    </Button>
                  </div>
                ) : isEnrolled ? (
                  <div className="space-y-4">
                    <Button className="w-full" onClick={() => {}}>
                      Continue Learning
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleMarkCompleted}>
                      Mark as Completed
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Button className="w-full" onClick={handleEnroll}>
                      Enroll Now
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      Join {course.enrolled} other students
                    </div>
                  </div>
                )}
                
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-sm">This course includes:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Play className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>12 on-demand videos</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>5 downloadable resources</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <BarChart className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>4 practice exercises</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetail;
