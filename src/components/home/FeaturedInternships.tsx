
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, DollarSign } from "lucide-react";
import { Internship } from "@/types";

interface FeaturedInternshipsProps {
  internships: Internship[];
}

export const FeaturedInternships = ({ internships }: FeaturedInternshipsProps) => {
  const navigate = useNavigate();
  
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="heading-3 mb-2">Featured Internships</h2>
            <p className="text-muted-foreground">Explore top opportunities from leading companies</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" onClick={() => navigate("/internships")}>
            View All Internships
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <div 
              key={internship.id} 
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
              onClick={() => navigate(`/internships/${internship.id}`)}
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  {internship.companyLogo ? (
                    <div className="h-12 w-12 flex-shrink-0 rounded overflow-hidden border">
                      <img 
                        src={internship.companyLogo} 
                        alt={internship.company} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold">{internship.company.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{internship.title}</h3>
                    <p className="text-sm text-muted-foreground">{internship.company}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{internship.isRemote ? "Remote" : `${internship.city}, ${internship.country}`}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSign className="mr-2 h-4 w-4" />
                    <span className="font-medium">
                      {internship.stipend.isPaid 
                        ? `${internship.stipend.amount} ${internship.stipend.currency}/month` 
                        : "Unpaid"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {internship.category}
                </span>
                <Button size="sm">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
