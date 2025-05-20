
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Globe, Tag, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

interface Company {
  employer_id: string;
  company_name: string;
  company_type: string;
  description: string;
  location: string;
  logo_url: string | null;
  website_url: string;
  created_at: string;
}

const sampleCompanies: Company[] = [
  {
    "employer_id": "22ac10da-68ab-4266-8798-c1158ab3b4f3",
    "company_name": "Aiden Ai",
    "company_type": "Startup",
    "description": "Startup",
    "location": "India",
    "logo_url": null,
    "website_url": "https://aidenai.com",
    "created_at": "2025-05-16T07:07:53.430529"
  },
  {
    "employer_id": "6db0c07e-3202-454e-989b-265c5eb84c16",
    "company_name": "Aiden Ai",
    "company_type": "Startup",
    "description": "Ai based startup",
    "location": "India",
    "logo_url": null,
    "website_url": "https://aidenai.com",
    "created_at": "2025-05-19T05:44:18.663407"
  },
  {
    "employer_id": "c85d79fc-53b1-4163-8c46-32f4c36c53b3",
    "company_name": "NCR",
    "location": "India",
    "company_type": "Startup",
    "description": "NCR Corporation and National Cash Register, is a global software, consulting and technology company providing several professional services and electronic products",
    "logo_url": "https://www.ncr.com",
    "website_url": "https://www.ncr.com",
    "created_at": "2025-05-19T05:47:34.909966"
  },
  {
    "employer_id": "90010216-b12e-4bde-9d9d-4de71c06a85a",
    "company_name": "Aiden AI",
    "company_type": "Startup",
    "location": "India",
    "description": "AIML Accelerator",
    "logo_url": null,
    "website_url": "https://aidenai.com/",
    "created_at": "2025-05-19T10:13:45.090422"
  },
  {
    "employer_id": "64aac01e-84ab-40a1-83a8-1a395c7853c4",
    "company_name": "Cognizant",
    "company_type": "Startup",
    "location": "India",
    "description": "Inutuition engineered",
    "logo_url": null,
    "website_url": "https://www.cognizant.com/in/en",
    "created_at": "2025-05-19T13:26:20.818243"
  },
  {
    "employer_id": "58c22400-8a99-45f2-9195-899e3632f7e0",
    "company_name": "Deloitte",
    "company_type": "Startup",
    "description": "a multinational professional services network and one of the \"Big Four\" accounting firms",
    "location": "India",
    "logo_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.channelinsider.com%2Fpartners%2Fdeloitte%2F&psig=AOvVaw2Xm1Bld7ip-zFv2GpDOYEG&ust=1747748320289000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDHtefUr40DFQAAAAAdAAAAABAE",
    "website_url": "https://www.deloitte.com/in/en.html",
    "created_at": "2025-05-19T13:42:01.804251"
  },
  {
    "employer_id": "11be5d08-2abc-4020-8dd8-21a9026e4a75",
    "company_name": "Tek systems",
    "company_type": "Startup",
    "location": "India",
    "description": "Unleash growth with TEKsystems, a full-stack technology services provider. We bring real-world expertise to solve complex technology, business and talent challenges—at global scale.",
    "logo_url": null,
    "website_url": "https://www.teksystems.com/en-in/",
    "created_at": "2025-05-19T14:40:04.331752"
  },
  {
    "employer_id": "70261da8-ee84-4ebe-9197-8717632150db",
    "company_name": "AltiusHub",
    "company_type": "Startup",
    "description": "AltiusHub is a provider of cloud-based serialization track and trace, and warehouse management software solutions.  ",
    "location": "India",
    "logo_url": "https://altiushub.com/",
    "website_url": "https://altiushub.com/",
    "created_at": "2025-05-19T15:41:28.867667"
  }
];

const MatchedCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    // In a real application, you would fetch data from an API here
    // For now, we'll use the sample data
    setCompanies(sampleCompanies);
    console.log("Matched companies loaded:", sampleCompanies.length);
  }, []);

  const visitWebsite = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Companies That Matched with You</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Card key={company.employer_id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl font-bold">{company.company_name}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{company.company_type}</span>
                  <span className="mx-2">•</span>
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{company.location}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-4">
                <CardDescription className="line-clamp-3 mb-4">
                  {company.description}
                </CardDescription>
                
                {company.logo_url && (
                  <div className="flex justify-center mb-4">
                    <img 
                      src={company.logo_url} 
                      alt={`${company.company_name} logo`} 
                      className="h-12 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full flex items-center justify-center gap-2" 
                  onClick={() => visitWebsite(company.website_url)}
                >
                  <Globe className="h-4 w-4" />
                  Visit Website
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {companies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Building className="h-16 w-16 text-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">No matched companies yet</h3>
            <p className="text-muted-foreground">
              Companies that match with your profile will appear here.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MatchedCompanies;
