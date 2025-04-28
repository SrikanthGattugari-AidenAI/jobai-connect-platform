
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useInternships } from "@/context/InternshipContext";
import { useCourses } from "@/context/CourseContext";
import { useJobs } from "@/context/JobContext";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { StudentJourney } from "@/components/dashboard/StudentJourney";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { MyJobsStatus } from "@/components/dashboard/MyJobsStatus";
import { ApplicationsList } from "@/components/dashboard/ApplicationsList";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { MainLayout } from "@/components/layout/MainLayout";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { internships, getSavedInternships, getStudentApplications } = useInternships();
  const { courses, getEnrolledCourses } = useCourses();
  const { jobs } = useJobs();
  
  const [applications, setApplications] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confidenceScore] = useState(85); // This would come from an API in a real app

  const jobStatuses = [
    { status: "Applied", count: 12 },
    { status: "In Progress", count: 5 },
    { status: "Interviews", count: 3 },
    { status: "Offers", count: 2 }
  ];

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      
      // Get applications
      const apps = getStudentApplications(user.id);
      setApplications(apps);
      
      // Get enrolled courses
      const enrolledIds = getEnrolledCourses(user.id);
      const enrolled = courses.filter(course => enrolledIds.includes(course.id));
      setEnrolledCourses(enrolled);
      
      setIsLoading(false);
    };
    
    loadDashboardData();
  }, [user, courses]);

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
              Welcome back, {user.name}! Here's an overview of your journey.
            </p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={() => navigate("/mock-interview")}>
              <Mic className="mr-2 h-4 w-4" />
              Practice Interview
            </Button>
          </div>
        </div>

        <StudentJourney />
        
        <DashboardStats 
          totalJobs={jobs.length}
          confidenceScore={confidenceScore}
          enrolledCoursesCount={enrolledCourses.length}
          dreamInternshipsCount={getSavedInternships(user.id).length}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MyJobsStatus statuses={jobStatuses} />
            <ApplicationsList 
              applications={applications}
              internships={internships}
            />
          </div>
          
          <div className="space-y-8">
            <QuickActions />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;
