
import { useState } from "react";
import { Job } from "@/types/job";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Briefcase, DollarSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface FeaturedJobsProps {
  jobs: Job[];
}

export function FeaturedJobs({ jobs }: FeaturedJobsProps) {
  const [visibleJobs, setVisibleJobs] = useState(3);
  
  const showMoreJobs = () => {
    setVisibleJobs(prev => Math.min(prev + 3, jobs.length));
  };
  
  return (
    <section className="py-16 bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="heading-2 mb-4">Featured Job Opportunities</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Discover exciting career opportunities from top companies across various industries and locations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {jobs.slice(0, visibleJobs).map((job) => (
            <Link key={job.id} to={`/jobs/${job.id}`}>
              <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
                <CardContent className="p-6 flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    {job.companyLogo ? (
                      <div className="h-12 w-12 rounded-md overflow-hidden border flex-shrink-0">
                        <img 
                          src={job.companyLogo} 
                          alt={job.company} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold">{job.company.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium line-clamp-1">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{job.isRemote ? "Remote" : `${job.city}, ${job.country}`}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Briefcase className="mr-2 h-4 w-4" />
                      <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
                    </div>
                    {job.salary.isDisclosed && (
                      <div className="flex items-center text-sm">
                        <DollarSign className="mr-2 h-4 w-4" />
                        <span>
                          {`${job.salary.min?.toLocaleString()}-${job.salary.max?.toLocaleString()} ${job.salary.currency}/year`}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
                    </span>
                    <span className="text-xs font-medium text-primary">View details →</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {visibleJobs < jobs.length && (
          <div className="text-center">
            <Button onClick={showMoreJobs} variant="outline">
              Show More Jobs
            </Button>
          </div>
        )}
        
        <div className="text-center mt-8">
          <Button asChild variant="default">
            <Link to="/jobs">
              Browse All Jobs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
