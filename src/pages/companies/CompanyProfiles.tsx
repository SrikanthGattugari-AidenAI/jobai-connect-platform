
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  Briefcase, 
  Building,
  ArrowRight,
  ExternalLink
} from "lucide-react";

// Sample company data
const companies = [
  {
    id: "company-1",
    name: "TechNova",
    logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    description: "A leading technology company specializing in AI and machine learning solutions for enterprise clients.",
    type: "startup",
    locations: ["San Francisco, CA", "New York, NY", "Remote"],
    industries: ["Artificial Intelligence", "Software", "Enterprise"],
    employees: "50-200",
    founded: 2018,
    website: "https://technova.example.com",
    openPositions: 12,
    internshipCount: 4,
    rating: 4.8
  },
  {
    id: "company-2",
    name: "GlobalTech Solutions",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "A global technology consulting firm providing comprehensive IT solutions and digital transformation services.",
    type: "midsize",
    locations: ["Chicago, IL", "Austin, TX", "Boston, MA", "Remote"],
    industries: ["Consulting", "IT Services", "Digital Transformation"],
    employees: "500-1000",
    founded: 2010,
    website: "https://globaltech.example.com",
    openPositions: 28,
    internshipCount: 15,
    rating: 4.2
  },
  {
    id: "company-3",
    name: "Innovex",
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "An innovative startup focused on developing cutting-edge solutions in fintech and blockchain technology.",
    type: "startup",
    locations: ["Miami, FL", "Remote"],
    industries: ["Fintech", "Blockchain", "Cryptocurrency"],
    employees: "10-50",
    founded: 2020,
    website: "https://innovex.example.com",
    openPositions: 8,
    internshipCount: 3,
    rating: 4.7
  },
  {
    id: "company-4",
    name: "TechSphere Inc.",
    logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    description: "A multinational technology corporation specializing in consumer electronics, software, and online services.",
    type: "enterprise",
    locations: ["Cupertino, CA", "Seattle, WA", "London, UK", "Tokyo, Japan"],
    industries: ["Technology", "Consumer Electronics", "Software"],
    employees: "10000+",
    founded: 1995,
    website: "https://techsphere.example.com",
    openPositions: 145,
    internshipCount: 50,
    rating: 4.5
  },
  {
    id: "company-5",
    name: "CodeCraft",
    logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    description: "A dynamic software development company specializing in web and mobile applications for startups and small businesses.",
    type: "midsize",
    locations: ["Portland, OR", "Denver, CO", "Remote"],
    industries: ["Software Development", "Web Development", "Mobile Development"],
    employees: "200-500",
    founded: 2015,
    website: "https://codecraft.example.com",
    openPositions: 18,
    internshipCount: 8,
    rating: 4.6
  },
  {
    id: "company-6",
    name: "DataDrive Analytics",
    logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    description: "A data analytics firm providing insights and business intelligence solutions to Fortune 500 companies.",
    type: "midsize",
    locations: ["Atlanta, GA", "Dallas, TX", "Remote"],
    industries: ["Data Analytics", "Business Intelligence", "Machine Learning"],
    employees: "200-500",
    founded: 2012,
    website: "https://datadrive.example.com",
    openPositions: 22,
    internshipCount: 10,
    rating: 4.3
  },
  {
    id: "company-7",
    name: "FutureTech Innovations",
    logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    description: "A research-focused company developing next-generation technologies in areas such as quantum computing and renewable energy.",
    type: "startup",
    locations: ["Cambridge, MA", "Palo Alto, CA"],
    industries: ["Research", "Quantum Computing", "Renewable Energy"],
    employees: "50-200",
    founded: 2019,
    website: "https://futuretech.example.com",
    openPositions: 14,
    internshipCount: 6,
    rating: 4.9
  },
  {
    id: "company-8",
    name: "GigaCorp",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623",
    description: "A global technology conglomerate with diverse business lines spanning from software to hardware manufacturing.",
    type: "enterprise",
    locations: ["New York, NY", "San Jose, CA", "Beijing, China", "Berlin, Germany"],
    industries: ["Technology", "Manufacturing", "Software"],
    employees: "5000-10000",
    founded: 1982,
    website: "https://gigacorp.example.com",
    openPositions: 78,
    internshipCount: 35,
    rating: 4.1
  },
  {
    id: "company-9",
    name: "CloudSphere",
    logo: "https://images.unsplash.com/photo-1547942042-a35a0c8b0341",
    description: "A cloud infrastructure company providing scalable solutions for enterprises and growing businesses.",
    type: "midsize",
    locations: ["Seattle, WA", "Austin, TX", "Remote"],
    industries: ["Cloud Computing", "Infrastructure", "DevOps"],
    employees: "500-1000",
    founded: 2014,
    website: "https://cloudsphere.example.com",
    openPositions: 32,
    internshipCount: 12,
    rating: 4.4
  }
];

const CompanyProfiles = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [companyType, setCompanyType] = useState("all");
  
  // Filter companies based on search and company type
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industries.some(industry => 
        industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesType = 
      companyType === "all" || company.type === companyType;
    
    return matchesSearch && matchesType;
  });
  
  // Group companies by type for the tabs
  const startups = companies.filter(company => company.type === "startup");
  const midsizeCompanies = companies.filter(company => company.type === "midsize");
  const enterprises = companies.filter(company => company.type === "enterprise");
  
  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl p-8 mb-10">
          <div className="max-w-3xl">
            <h1 className="heading-2 mb-4">Explore Top Companies</h1>
            <p className="text-lg text-gray-700 mb-6">
              Discover leading companies in tech and find your perfect internship or job opportunity.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies by name, industry, or location"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Companies By Type */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="heading-3">Browse by Company Size</h2>
          </div>
          
          <Tabs defaultValue="all" onValueChange={setCompanyType}>
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Companies</TabsTrigger>
              <TabsTrigger value="startup">Startups</TabsTrigger>
              <TabsTrigger value="midsize">Midsize Companies</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprises</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCompanies.map(company => (
                <CompanyCard key={company.id} company={company} navigate={navigate} />
              ))}
            </TabsContent>
            
            <TabsContent value="startup" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCompanies.filter(c => c.type === "startup").map(company => (
                <CompanyCard key={company.id} company={company} navigate={navigate} />
              ))}
            </TabsContent>
            
            <TabsContent value="midsize" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCompanies.filter(c => c.type === "midsize").map(company => (
                <CompanyCard key={company.id} company={company} navigate={navigate} />
              ))}
            </TabsContent>
            
            <TabsContent value="enterprise" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCompanies.filter(c => c.type === "enterprise").map(company => (
                <CompanyCard key={company.id} company={company} navigate={navigate} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Featured Companies Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="heading-3">Top Rated Companies</h2>
            <Button variant="ghost" className="gap-1">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companies
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 4)
              .map(company => (
                <Card key={company.id} className="overflow-hidden">
                  <div className="h-32 flex items-center justify-center p-4 bg-muted">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="text-xl font-bold text-center mb-2">{company.name}</h3>
                    <div className="flex justify-center mb-3">
                      <div className="flex items-center bg-primary/10 px-3 py-1 rounded text-primary text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span>{company.rating} / 5.0</span>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{company.industries[0]}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{company.locations[0]}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{company.internshipCount} Internships</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/companies/${company.id}`)}
                    >
                      View Profile
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
        
        {/* Featured Internships at Top Companies */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="heading-3">Featured Internships</h2>
            <Button variant="ghost" className="gap-1" onClick={() => navigate("/internships")}>
              <span>View All Internships</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.slice(0, 4).map(company => (
              <Card key={`internship-${company.id}`} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-full flex items-center justify-center p-4 bg-muted">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="font-bold mb-1">{company.industries[0]} Internship</h3>
                    <p className="text-muted-foreground text-sm mb-2">{company.name}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline">{company.locations[0]}</Badge>
                      <Badge variant="outline">Summer 2025</Badge>
                      <Badge variant="outline">Paid</Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate("/internships")}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Industry Overview */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="heading-3">Explore by Industry</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
                </div>
                <h3 className="font-bold mb-1">Software Development</h3>
                <p className="text-sm mb-3 text-white/80">215 Companies</p>
                <Button variant="secondary" size="sm">Explore</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
                </div>
                <h3 className="font-bold mb-1">AI & Machine Learning</h3>
                <p className="text-sm mb-3 text-white/80">148 Companies</p>
                <Button variant="secondary" size="sm">Explore</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-big"><path d="M3 3v18h18"/><rect width="4" height="7" x="7" y="10" rx="1"/><rect width="4" height="12" x="15" y="5" rx="1"/></svg>
                </div>
                <h3 className="font-bold mb-1">Data & Analytics</h3>
                <p className="text-sm mb-3 text-white/80">172 Companies</p>
                <Button variant="secondary" size="sm">Explore</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                </div>
                <h3 className="font-bold mb-1">Product Management</h3>
                <p className="text-sm mb-3 text-white/80">94 Companies</p>
                <Button variant="secondary" size="sm">Explore</Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Professional Journey?</h2>
            <p className="text-white/90 mb-6">
              Create a profile to get matched with top companies and exciting internship opportunities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/register/student")}
              >
                Sign Up Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/20"
                onClick={() => navigate("/internships")}
              >
                <span>Browse Internships</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Company Card Component
const CompanyCard = ({ company, navigate }: { company: any, navigate: any }) => {
  const getCompanyTypeLabel = (type: string) => {
    switch (type) {
      case "startup":
        return "Startup";
      case "midsize":
        return "Midsize Company";
      case "enterprise":
        return "Enterprise";
      default:
        return "Company";
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="w-12 h-12 rounded-md overflow-hidden">
          <img 
            src={company.logo} 
            alt={company.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <CardTitle className="text-lg">{company.name}</CardTitle>
          <p className="text-xs text-muted-foreground">{getCompanyTypeLabel(company.type)}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {company.description}
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{company.locations[0]}{company.locations.length > 1 ? ` +${company.locations.length - 1} more` : ""}</span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{company.employees} employees</span>
          </div>
          <div className="flex items-center text-sm">
            <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              {company.openPositions} open positions ({company.internshipCount} internships)
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {company.industries.map((industry: string, index: number) => (
            <Badge key={index} variant="outline">{industry}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          className="w-full"
          onClick={() => navigate(`/companies/${company.id}`)}
        >
          View Company
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => window.open(company.website, "_blank")}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Visit Website
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyProfiles;
