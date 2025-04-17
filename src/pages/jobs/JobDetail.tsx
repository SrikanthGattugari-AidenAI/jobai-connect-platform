
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useJobs } from "@/context/JobContext";
import { Job } from "@/types/job";
import { useAuth } from "@/context/AuthContext";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Building,
  Share,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { formatDistanceToNow, format } from 'date-fns';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobs, isLoading, saveJob, unsaveJob, getSavedJobs } = useJobs();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    if (!isLoading && jobs.length > 0 && id) {
      const foundJob = jobs.find(job => job.id === id);
      
      if (foundJob) {
        setJob(foundJob);
      } else {
        // Job not found, redirect to jobs page
        navigate("/jobs");
      }
    }
  }, [id, jobs, isLoading, navigate]);
  
  useEffect(() => {
    if (isAuthenticated && user && user.role === "student" && job) {
      const savedJobs = getSavedJobs(user.id);
      setIsSaved(savedJobs.includes(job.id));
    }
  }, [isAuthenticated, user, job, getSavedJobs]);
  
  const handleToggleSave = async () => {
    if (!isAuthenticated || !user || !job) return;
    
    try {
      if (isSaved) {
        await unsaveJob(job.id, user.id);
      } else {
        await saveJob(job.id, user.id);
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };
  
  const handleShare = () => {
    if (navigator.share && job) {
      navigator.share({
        title: `${job.title} at ${job.company}`,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href
      }).catch(err => {
        console.error("Error sharing:", err);
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container-custom py-8 md:py-12">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 w-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!job) {
    return (
      <MainLayout>
        <div className="container-custom py-8 md:py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
            <p className="mb-6 text-muted-foreground">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/jobs")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/jobs")} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </Button>
        
        {/* Header section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start md:items-center gap-4 mb-4">
                  {job.companyLogo ? (
                    <div className="h-16 w-16 rounded-md overflow-hidden border flex-shrink-0">
                      <img 
                        src={job.companyLogo} 
                        alt={job.company} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold">{job.company.charAt(0)}</span>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Building className="mr-1 h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{job.isRemote ? "Remote" : `${job.city}, ${job.country}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      Apply by {format(new Date(job.applicationDeadline), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {job.salary.isDisclosed 
                        ? `${job.salary.min?.toLocaleString()}-${job.salary.max?.toLocaleString()} ${job.salary.currency}/year` 
                        : "Salary not disclosed"}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {job.category}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                    {job.experienceLevel} level
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button className="flex-1 sm:flex-none">Apply Now</Button>
                  <Button 
                    variant="outline" 
                    onClick={handleToggleSave}
                    disabled={!isAuthenticated || user?.role !== "student"}
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="mr-2 h-4 w-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleShare}>
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">About the Company</h3>
                <div className="flex items-center mb-4">
                  {job.companyLogo ? (
                    <div className="h-12 w-12 rounded-md overflow-hidden border mr-3">
                      <img 
                        src={job.companyLogo} 
                        alt={job.company} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center mr-3">
                      <span className="text-xl font-bold">{job.company.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">{job.company}</h4>
                    <p className="text-sm text-muted-foreground">
                      {job.isRemote ? "Remote Company" : job.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm">
                  {job.company} is a leading company in the {job.category} industry, focusing on innovative solutions.
                </p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Visit Company Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Job Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="mb-6">{job.description}</p>
                
                <h3 className="font-semibold mb-2">Responsibilities</h3>
                <ul className="list-disc pl-5 mb-6 space-y-1">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
                
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Application Process</h2>
                <p>
                  To apply for this position, click the Apply button and follow the instructions. 
                  The employer typically responds within 5 business days.
                </p>
                <Separator className="my-4" />
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1">Apply Now</Button>
                  <Button variant="outline" className="flex-1">Save for Later</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Job Summary</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground block">Employment Type</span>
                    <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Experience Level</span>
                    <span className="capitalize">{job.experienceLevel}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Location</span>
                    <span>{job.isRemote ? "Remote" : job.location}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Salary Range</span>
                    <span>
                      {job.salary.isDisclosed 
                        ? `${job.salary.min?.toLocaleString()}-${job.salary.max?.toLocaleString()} ${job.salary.currency}/year` 
                        : "Not disclosed"}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block">Application Deadline</span>
                    <span>{format(new Date(job.applicationDeadline), 'MMMM d, yyyy')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Similar Jobs</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  More jobs in {job.category}
                </p>
                <div className="space-y-4">
                  {jobs
                    .filter(j => j.id !== job.id && j.category === job.category)
                    .slice(0, 3)
                    .map(similarJob => (
                      <div 
                        key={similarJob.id} 
                        className="border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => navigate(`/jobs/${similarJob.id}`)}
                      >
                        <div className="font-medium">{similarJob.title}</div>
                        <div className="text-sm text-muted-foreground">{similarJob.company}</div>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <MapPin className="mr-1 h-3 w-3" />
                          <span>{similarJob.isRemote ? "Remote" : similarJob.location}</span>
                        </div>
                      </div>
                    ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate("/jobs")}
                >
                  View All Jobs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobDetail;
