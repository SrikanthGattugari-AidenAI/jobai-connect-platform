
import { useNavigate } from "react-router-dom";
import { Briefcase, Building, Globe, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const TopCompaniesSection = () => {
  const navigate = useNavigate();
  
  const startups = [
    {
      id: "s1",
      name: "TechNova",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=200&fit=crop",
      industry: "AI Solutions",
      locations: ["San Francisco", "Remote"],
      openPositions: 7
    },
    {
      id: "s2",
      name: "DataPulse",
      logo: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=200&h=200&fit=crop",
      industry: "Data Analytics",
      locations: ["Boston", "Remote"],
      openPositions: 5
    },
    {
      id: "s3",
      name: "InnovateHub",
      logo: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=200&h=200&fit=crop",
      industry: "SaaS",
      locations: ["Austin", "Remote"],
      openPositions: 9
    }
  ];
  
  const midsize = [
    {
      id: "m1",
      name: "FlexiTech",
      logo: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=200&h=200&fit=crop",
      industry: "Cloud Infrastructure",
      locations: ["Seattle", "New York"],
      openPositions: 12
    },
    {
      id: "m2",
      name: "GrowthWave",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&h=200&fit=crop",
      industry: "MarTech",
      locations: ["Chicago", "Dallas"],
      openPositions: 8
    },
    {
      id: "m3",
      name: "CodeCraft",
      logo: "https://images.unsplash.com/photo-1629429407673-93616804ea49?q=80&w=200&h=200&fit=crop",
      industry: "Software Development",
      locations: ["Denver", "Remote"],
      openPositions: 15
    }
  ];
  
  const enterprises = [
    {
      id: "e1",
      name: "GlobalTech",
      logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=200&h=200&fit=crop",
      industry: "Enterprise Solutions",
      locations: ["Multiple Global"],
      openPositions: 42
    },
    {
      id: "e2",
      name: "FutureSoft",
      logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=200&h=200&fit=crop",
      industry: "Software & Services",
      locations: ["Multiple US", "Europe"],
      openPositions: 38
    },
    {
      id: "e3",
      name: "InnovateCorp",
      logo: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=200&h=200&fit=crop",
      industry: "Technology",
      locations: ["Global"],
      openPositions: 50
    }
  ];
  
  const renderCompanyCard = (company: any) => (
    <div 
      key={company.id}
      className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
      onClick={() => navigate(`/companies/${company.id}`)}
    >
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-16 w-16 rounded-lg overflow-hidden border">
            <img 
              src={company.logo} 
              alt={company.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-lg">{company.name}</h3>
            <p className="text-sm text-muted-foreground">{company.industry}</p>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Globe className="mr-2 h-4 w-4" />
          <span>{company.locations.join(", ")}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <Briefcase className="mr-2 h-4 w-4 text-primary" />
          <span className="font-medium text-primary">{company.openPositions} Open Positions</span>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t">
        <Button variant="secondary" className="w-full">View Jobs</Button>
      </div>
    </div>
  );
  
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Badge variant="outline" className="bg-primary/10 text-primary px-3 py-1 mb-4">
            <Award className="mr-1 h-3.5 w-3.5" />
            Top Companies
          </Badge>
          <h2 className="heading-2 mb-4">Launch Your Career with Leading Companies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover internship opportunities with top-tier companies across various industries
          </p>
        </div>
        
        <div className="space-y-12">
          {/* Startups */}
          <div>
            <div className="flex items-center mb-6">
              <Building className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-2xl font-bold">Innovative Startups</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {startups.map(renderCompanyCard)}
            </div>
          </div>
          
          {/* Mid-sized Companies */}
          <div>
            <div className="flex items-center mb-6">
              <Building className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-2xl font-bold">Growing Mid-sized Companies</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {midsize.map(renderCompanyCard)}
            </div>
          </div>
          
          {/* Enterprise Companies */}
          <div>
            <div className="flex items-center mb-6">
              <Building className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-2xl font-bold">Global Enterprises</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {enterprises.map(renderCompanyCard)}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-12">
          <Button 
            onClick={() => navigate("/companies")}
            className="flex items-center gap-2"
            size="lg"
          >
            <Globe className="h-4 w-4" />
            <span>Explore All Companies</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
