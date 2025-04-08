
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { InternshipFilter, FilterOptions } from "@/components/internships/InternshipFilter";
import { useInternships } from "@/context/InternshipContext";
import { Internship } from "@/types";
import { Loader2 } from "lucide-react";

const Internships = () => {
  const { internships, isLoading } = useInternships();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  
  // Initialize filters from URL params
  const initialFilters: FilterOptions = {
    country: searchParams.get("country") || "",
    city: searchParams.get("city") || "",
    category: searchParams.get("category") || "",
    role: searchParams.get("role") || "",
    locationType: searchParams.get("locationType") || "all",
    search: searchParams.get("search") || "",
  };
  
  useEffect(() => {
    if (!isLoading) {
      applyFilters(initialFilters);
    }
  }, [internships, isLoading]);
  
  const applyFilters = (filters: FilterOptions) => {
    // Update URL with filters
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    setSearchParams(params);
    
    // Filter internships
    let filtered = [...internships];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(internship => 
        internship.title.toLowerCase().includes(searchLower) ||
        internship.company.toLowerCase().includes(searchLower) ||
        internship.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply location type filter
    if (filters.locationType === "remote") {
      filtered = filtered.filter(internship => internship.isRemote);
    } else if (filters.locationType === "onsite") {
      filtered = filtered.filter(internship => !internship.isRemote);
    }
    
    // Apply country filter
    if (filters.country && filters.country !== "Remote") {
      filtered = filtered.filter(internship => internship.country === filters.country);
    }
    
    // Apply city filter
    if (filters.city && filters.city !== "Remote") {
      filtered = filtered.filter(internship => internship.city === filters.city);
    }
    
    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(internship => internship.category === filters.category);
    }
    
    // Apply role filter
    if (filters.role) {
      filtered = filtered.filter(internship => internship.role === filters.role);
    }
    
    setFilteredInternships(filtered);
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <h1 className="heading-2 mb-2">Browse Internships</h1>
        <p className="text-muted-foreground mb-8">
          Find your perfect internship opportunity from our extensive collection
        </p>
        
        <div className="mb-8">
          <InternshipFilter onFilterChange={applyFilters} />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No internships found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search filters to find more opportunities
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Internships;
