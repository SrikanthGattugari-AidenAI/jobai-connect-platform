
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useInternships } from "@/context/InternshipContext";
import { useCourses } from "@/context/CourseContext";
import { useJobs } from "@/context/JobContext";
import { Button } from "@/components/ui/button";
import { BuildingIcon } from "lucide-react";
import { StudentJourney } from "@/components/dashboard/StudentJourney";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { MyJobsStatus } from "@/components/dashboard/MyJobsStatus";
import { ApplicationsList } from "@/components/dashboard/ApplicationsList";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { internships, getSavedInternships } = useInternships();
  const { courses, getEnrolledCourses } = useCourses();
  const { jobs } = useJobs();
  
  // Sample application data with fixed status values that match the Application type
  const sampleApplications = [
    {
      id: "app1",
      studentId: user?.id || "",
      internshipId: "int1",
      coverLetter: "Cover letter content",
      appliedDate: "2025-04-20T10:00:00.000Z",
      status: "reviewing" as const
    },
    {
      id: "app2",
      studentId: user?.id || "",
      internshipId: "int2",
      coverLetter: "Cover letter content",
      appliedDate: "2025-04-18T10:00:00.000Z",
      status: "shortlisted" as const
    },
    {
      id: "app3",
      studentId: user?.id || "",
      internshipId: "int3",
      coverLetter: "Cover letter content",
      appliedDate: "2025-04-15T10:00:00.000Z",
      status: "accepted" as const
    }
  ];

  // Sample internship data
  const sampleInternships = [
    {
      id: "int1",
      employerId: "emp1",
      title: "Software Engineer Intern",
      company: "Tech Corp",
      category: "Software Development",
      role: "Frontend Developer",
      description: "Frontend development internship",
      location: "San Francisco",
      isRemote: false,
      city: "San Francisco",
      country: "USA",
      duration: "3 months",
      stipend: { isPaid: true, amount: 3000, currency: "USD" },
      responsibilities: ["Development", "Testing"],
      requirements: ["React", "TypeScript"],
      postedDate: "2025-04-01T00:00:00.000Z",
      startDate: "2025-06-01T00:00:00.000Z",
      applicationDeadline: "2025-05-15T00:00:00.000Z"
    },
    {
      id: "int2",
      employerId: "emp2",
      title: "Data Science Intern",
      company: "Data Analytics Co",
      category: "Data Science",
      role: "Data Analyst",
      description: "Data analysis internship",
      location: "New York",
      isRemote: true,
      city: "New York",
      country: "USA",
      duration: "6 months",
      stipend: { isPaid: true, amount: 4000, currency: "USD" },
      responsibilities: ["Data Analysis", "Reporting"],
      requirements: ["Python", "SQL"],
      postedDate: "2025-04-02T00:00:00.000Z",
      startDate: "2025-06-15T00:00:00.000Z",
      applicationDeadline: "2025-05-20T00:00:00.000Z"
    },
    {
      id: "int3",
      employerId: "emp3",
      title: "UI/UX Design Intern",
      company: "Design Studio",
      category: "Design",
      role: "UI/UX Designer",
      description: "UI/UX design internship",
      location: "Remote",
      isRemote: true,
      city: "Remote",
      country: "Global",
      duration: "4 months",
      stipend: { isPaid: true, amount: 2500, currency: "USD" },
      responsibilities: ["UI Design", "User Research"],
      requirements: ["Figma", "Adobe XD"],
      postedDate: "2025-04-03T00:00:00.000Z",
      startDate: "2025-06-01T00:00:00.000Z",
      applicationDeadline: "2025-05-25T00:00:00.000Z"
    }
  ];

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confidenceScore] = useState(85);

  const jobStatuses = [
    { status: "Applied", count: 12 },
    { status: "In Progress", count: 5 },
    { status: "Interviews", count: 3 },
    { status: "Offers", count: 2 }
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      
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
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
          >
            <div>
              <h1 className="heading-2 mb-2">Student Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user.name}! Here's an overview of your journey.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button 
                onClick={() => navigate("/companies")}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all hover:shadow-lg"
              >
                <BuildingIcon className="mr-2 h-4 w-4" />
                Companies Viewing Your Profile
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <StudentJourney />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <DashboardStats 
              totalJobs={jobs.length}
              confidenceScore={confidenceScore}
              enrolledCoursesCount={enrolledCourses.length}
              dreamInternshipsCount={getSavedInternships(user.id).length}
            />
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
              <MyJobsStatus statuses={jobStatuses} />
              <ApplicationsList 
                applications={sampleApplications}
                internships={sampleInternships}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-8">
              <QuickActions />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;
