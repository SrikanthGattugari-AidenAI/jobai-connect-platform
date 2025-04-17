
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilter, JobFilterOptions } from "@/components/jobs/JobFilter";
import { useJobs } from "@/context/JobContext";
import { Job } from "@/types/job";
import { Loader2 } from "lucide-react";

const Jobs = () => {
  const { jobs, isLoading } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  
  // Initialize filters from URL params
  const initialFilters: JobFilterOptions = {
    country: searchParams.get("country") || "",
    city: searchParams.get("city") || "",
    category: searchParams.get("category") || "",
    role: searchParams.get("role") || "",
    locationType: searchParams.get("locationType") || "all",
    employmentType: searchParams.get("employmentType") || "",
    experienceLevel: searchParams.get("experienceLevel") || "",
    search: searchParams.get("search") || "",
  };
  
  useEffect(() => {
    if (!isLoading) {
      applyFilters(initialFilters);
    }
  }, [jobs, isLoading]);
  
  const applyFilters = (filters: JobFilterOptions) => {
    // Update URL with filters
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    setSearchParams(params);
    
    // Filter jobs
    let filtered = [...jobs];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply location type filter
    if (filters.locationType === "remote") {
      filtered = filtered.filter(job => job.isRemote);
    } else if (filters.locationType === "onsite") {
      filtered = filtered.filter(job => !job.isRemote);
    }
    
    // Apply country filter
    if (filters.country && filters.country !== "Remote") {
      filtered = filtered.filter(job => job.country === filters.country);
    }
    
    // Apply city filter
    if (filters.city && filters.city !== "Remote") {
      filtered = filtered.filter(job => job.city === filters.city);
    }
    
    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }
    
    // Apply role filter
    if (filters.role) {
      filtered = filtered.filter(job => job.role === filters.role);
    }
    
    // Apply employment type filter
    if (filters.employmentType) {
      filtered = filtered.filter(job => job.employmentType === filters.employmentType);
    }
    
    // Apply experience level filter
    if (filters.experienceLevel) {
      filtered = filtered.filter(job => job.experienceLevel === filters.experienceLevel);
    }
    
    setFilteredJobs(filtered);
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <h1 className="heading-2 mb-2">Browse Jobs</h1>
        <p className="text-muted-foreground mb-8">
          Find your perfect job opportunity from our extensive collection
        </p>
        
        <div className="mb-8">
          <JobFilter onFilterChange={applyFilters} />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search filters to find more opportunities
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Jobs;
