
import { Link } from "react-router-dom";
import { Job } from "@/types/job";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useJobs } from "@/context/JobContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const { saveJob, unsaveJob, getSavedJobs } = useJobs();
  const { user, isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated && user && user.role === "student") {
      const savedJobs = getSavedJobs(user.id);
      setIsSaved(savedJobs.includes(job.id));
    }
  }, [isAuthenticated, user, job.id, getSavedJobs]);
  
  const toggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated || !user || user.role !== "student") return;
    
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
  
  return (
    <Link to={`/jobs/${job.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
        <CardContent className="p-6 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {job.companyLogo ? (
                <div className="h-12 w-12 rounded-md overflow-hidden border">
                  <img 
                    src={job.companyLogo} 
                    alt={job.company} 
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                  <span className="text-xl font-bold">{job.company.charAt(0)}</span>
                </div>
              )}
              <div>
                <h3 className="font-medium">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
            </div>
            {isAuthenticated && user?.role === "student" && (
              <button 
                onClick={toggleSave}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={isSaved ? "Unsave job" : "Save job"}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-5 w-5 text-primary" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{job.isRemote ? "Remote" : `${job.city}, ${job.country}`}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="mr-2 h-4 w-4" />
              <span>{job.employmentType.replace('-', ' ')}</span>
            </div>
            <div className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4" />
              <span className="font-medium">
                {job.salary.isDisclosed 
                  ? `${job.salary.min?.toLocaleString()}-${job.salary.max?.toLocaleString()} ${job.salary.currency}/year` 
                  : "Salary not disclosed"}
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {job.category}
            </span>
            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
              {job.experienceLevel} level
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 flex items-center justify-between border-t mt-4">
          <div className="text-xs text-muted-foreground">
            Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
          </div>
          <Button size="sm">Apply Now</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
