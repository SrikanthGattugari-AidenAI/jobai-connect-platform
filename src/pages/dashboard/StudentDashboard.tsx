
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useInternships } from "@/context/InternshipContext";
import { useCourses } from "@/context/CourseContext";
import { useAI } from "@/context/AIContext";
import { useJobs } from "@/context/JobContext";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { StudentJourney } from "@/components/dashboard/StudentJourney";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics";
import { ApplicationsList } from "@/components/dashboard/ApplicationsList";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Internship, Course, Application } from "@/types";
import { Job } from "@/types/job";
import { MainLayout } from "@/components/layout/MainLayout";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { internships, getSavedInternships, getStudentApplications } = useInternships();
  const { courses, getEnrolledCourses } = useCourses();
  const { recommendSkills } = useAI();
  const { jobs } = useJobs();
  
  const [savedInternships, setSavedInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
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
      
      // Calculate jobs analytics
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

        <StudentJourney />
        
        <DashboardStats 
          totalJobs={totalJobs}
          applicationCount={applications.length}
          enrolledCoursesCount={enrolledCourses.length}
          savedInternshipsCount={savedInternships.length}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DashboardAnalytics 
              analytics={{
                totalJobs,
                jobsByCategory,
                jobsByLocation
              }}
            />
            
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
