
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  MapPin,
  Users,
  Calendar,
  Globe,
  Building,
  Briefcase,
  ArrowLeft,
  ExternalLink,
  Star,
  Heart,
  Clock,
  ChevronRight,
  CheckCircle,
  Award,
  TrendingUp
} from "lucide-react";

// Sample company data - same as in CompanyProfiles
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
    rating: 4.8,
    about: `
      TechNova is at the forefront of artificial intelligence and machine learning innovation. Founded in 2018 by a team of AI researchers from top universities, we're on a mission to make advanced AI technology accessible and valuable for businesses of all sizes.
      
      Our core products include:
      
      - Nova AI Platform: An enterprise-grade machine learning platform that simplifies the deployment and management of AI models
      - NovaInsight: Analytics solution that transforms complex data into actionable business intelligence
      - NovaBots: Customizable AI assistants for customer service and internal operations
      
      We've raised $45M in venture funding and are backed by leading investors in the technology space. Our team has grown rapidly to over 120 talented individuals across engineering, research, product, and business functions.
      
      At TechNova, we believe in a future where AI augments human capabilities and helps solve some of the world's most pressing challenges. We're looking for passionate individuals who share our vision and want to be part of shaping this exciting future.
    `,
    culture: `
      At TechNova, our culture is built around four core values:
      
      1. **Innovation First**: We encourage risk-taking and celebrate both successes and failures as learning opportunities
      2. **Customer Obsession**: We start with the customer and work backwards, always focusing on delivering real value
      3. **Collaborative Excellence**: We believe the best ideas come from diverse teams working together
      4. **Integrity Always**: We're committed to doing what's right, even when it's not easy
      
      We foster a flexible work environment that prioritizes results over rigid schedules. Our offices are designed to encourage collaboration with open workspaces, casual meeting areas, and quiet zones for focused work.
      
      We invest heavily in professional development through our TechNova Academy, offering workshops, mentorship programs, and educational stipends. Regular hackathons, tech talks, and social events help build connections across teams.
      
      For interns, we provide real-world experience working on meaningful projects alongside experienced mentors, with many interns returning as full-time employees after graduation.
    `,
    benefits: [
      "Competitive salaries with equity packages",
      "Comprehensive health, dental, and vision insurance",
      "Unlimited PTO policy",
      "Flexible work arrangements including remote options",
      "Weekly catered lunches and fully stocked kitchens",
      "Monthly wellness stipend",
      "Annual professional development budget",
      "Regular team building events and company retreats",
      "Parental leave program",
      "401(k) matching"
    ],
    employees: [
      {
        name: "Alex Chen",
        title: "Co-Founder & CEO",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        linkedin: "https://linkedin.com/in/example"
      },
      {
        name: "Sarah Johnson",
        title: "Chief Technology Officer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        linkedin: "https://linkedin.com/in/example"
      },
      {
        name: "Rajiv Patel",
        title: "VP of Engineering",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        linkedin: "https://linkedin.com/in/example"
      },
      {
        name: "Maya Wilson",
        title: "Head of Product",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
        linkedin: "https://linkedin.com/in/example"
      }
    ],
    internships: [
      {
        id: "intern-1",
        title: "Machine Learning Engineer Intern",
        department: "AI Research",
        type: "Summer 2025",
        location: "San Francisco, CA",
        isPaid: true,
        description: "Join our AI Research team to develop and implement machine learning algorithms for our core products."
      },
      {
        id: "intern-2",
        title: "Software Engineering Intern",
        department: "Platform Engineering",
        type: "Summer 2025",
        location: "New York, NY",
        isPaid: true,
        description: "Work with our Platform Engineering team on building scalable cloud infrastructure and services."
      },
      {
        id: "intern-3",
        title: "Product Design Intern",
        department: "Product",
        type: "Summer 2025",
        location: "Remote",
        isPaid: true,
        description: "Collaborate with our product team to create intuitive user experiences for our AI products."
      },
      {
        id: "intern-4",
        title: "Data Science Intern",
        department: "Analytics",
        type: "Summer 2025",
        location: "San Francisco, CA",
        isPaid: true,
        description: "Work on cutting-edge data analytics projects to derive insights from complex datasets."
      }
    ],
    reviews: [
      {
        id: "review-1",
        author: "Former Intern - Machine Learning",
        rating: 5,
        pros: "Incredible learning experience working on real projects. My mentor was extremely supportive and I had access to senior leadership. The work I did actually shipped to production!",
        cons: "Sometimes communication between teams could be improved.",
        date: "August 2024"
      },
      {
        id: "review-2",
        author: "Former Intern - Software Engineering",
        rating: 4,
        pros: "Great culture, interesting projects, and smart colleagues. I learned so much during my internship that helped me in my career.",
        cons: "Work-life balance could be better during crunch times near product releases.",
        date: "July 2024"
      },
      {
        id: "review-3",
        author: "Former Intern - Product Management",
        rating: 5,
        pros: "Treated like a full-time employee with real responsibilities. Excellent mentorship program and frequent feedback sessions.",
        cons: "The pace can be very fast which was challenging at times, but ultimately helped me grow.",
        date: "September 2023"
      }
    ],
    faq: [
      {
        question: "What does the application process involve?",
        answer: "Our internship application process typically involves an online application, a technical assessment, and 2-3 rounds of interviews including both technical and behavioral components."
      },
      {
        question: "When do applications open for summer internships?",
        answer: "We typically open applications for our summer internship program in September of the previous year and make offers on a rolling basis through March."
      },
      {
        question: "What skills are you looking for in interns?",
        answer: "Beyond technical skills relevant to the specific role, we look for problem-solving ability, curiosity, teamwork, and a passion for our mission of making AI accessible and valuable for businesses."
      },
      {
        question: "Do you offer relocation assistance?",
        answer: "Yes, we provide relocation assistance for interns who need to relocate to work from our offices, including housing stipends and travel reimbursement."
      },
      {
        question: "Are international students eligible?",
        answer: "Yes, we welcome international students and provide visa assistance for those who require it."
      }
    ]
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
    rating: 4.2,
    about: `Sample about content`,
    culture: `Sample culture content`,
    benefits: [],
    employees: [],
    internships: [],
    reviews: [],
    faq: []
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
    rating: 4.7,
    about: `Sample about content`,
    culture: `Sample culture content`,
    benefits: [],
    employees: [],
    internships: [],
    reviews: [],
    faq: []
  }
];

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  
  // Find company by ID
  const company = companies.find(c => c.id === id);
  
  if (!company) {
    return (
      <MainLayout>
        <div className="container-custom py-12 text-center">
          <h2 className="heading-2 mb-4">Company Not Found</h2>
          <p className="text-muted-foreground mb-6">The company you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/companies")}>View All Companies</Button>
        </div>
      </MainLayout>
    );
  }
  
  // Handle saving/following company
  const handleSaveCompany = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save this company.",
        variant: "destructive"
      });
      navigate("/login/student");
      return;
    }
    
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Company Unsaved" : "Company Saved",
      description: isSaved 
        ? `${company.name} has been removed from your saved companies.` 
        : `${company.name} has been added to your saved companies.`,
    });
  };
  
  // Handle apply to internship
  const handleViewInternship = (internshipId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to view internship details.",
        variant: "destructive"
      });
      navigate("/login/student");
      return;
    }
    
    navigate("/internships");
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate("/companies")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Companies
        </Button>
        
        {/* Company Header */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="w-24 h-24 rounded-lg overflow-hidden">
            <img 
              src={company.logo} 
              alt={company.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary">{company.type.charAt(0).toUpperCase() + company.type.slice(1)}</Badge>
              {company.industries.map((industry: string, index: number) => (
                <Badge key={index} variant="outline">{industry}</Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{company.name}</h1>
            <p className="text-muted-foreground mb-4">{company.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{company.locations.join(", ")}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                <span>{company.employees} employees</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Founded {company.founded}</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 text-yellow-500" />
                <span>{company.rating} / 5.0</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                className="gap-2"
                onClick={() => window.open(company.website, "_blank")}
              >
                <Globe className="h-4 w-4" />
                Visit Website
              </Button>
              <Button 
                variant={isSaved ? "default" : "outline"} 
                onClick={handleSaveCompany}
                className="gap-2"
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Saved" : "Save Company"}
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/internships")}
                className="gap-2"
              >
                <Briefcase className="h-4 w-4" />
                View Internships
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Company Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="w-full grid grid-cols-5">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="internships">Internships</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="people">People</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              
              {/* About Tab */}
              <TabsContent value="about" className="space-y-6 pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {company.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {company.about.split('\n').map((line, i) => {
                        if (line.startsWith("- ")) {
                          return <li key={i} className="ml-6 mb-1">{line.substring(2)}</li>;
                        } else if (line.trim() === "") {
                          return <br key={i} />;
                        } else if (line.trim().startsWith("1.") || line.trim().startsWith("2.") || line.trim().startsWith("3.") || line.trim().startsWith("4.")) {
                          return <li key={i} className="ml-6 mb-1">{line.trim().substring(3)}</li>;
                        } else if (line.includes("**") && line.includes("**:")) {
                          return <p key={i} className="font-bold">{line.replace(/\*\*/g, '')}</p>;
                        } else {
                          return <p key={i} className="mb-4">{line}</p>;
                        }
                      })}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Company Culture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {company.culture.split('\n').map((line, i) => {
                        if (line.startsWith("- ")) {
                          return <li key={i} className="ml-6 mb-1">{line.substring(2)}</li>;
                        } else if (line.trim() === "") {
                          return <br key={i} />;
                        } else if (line.trim().startsWith("1.") || line.trim().startsWith("2.") || line.trim().startsWith("3.") || line.trim().startsWith("4.")) {
                          return <li key={i} className="ml-6 mb-1">{line.trim().substring(3)}</li>;
                        } else if (line.includes("**") && line.includes("**:")) {
                          return <p key={i} className="font-bold">{line.replace(/\*\*/g, '')}</p>;
                        } else {
                          return <p key={i} className="mb-4">{line}</p>;
                        }
                      })}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits & Perks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {company.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <span className="ml-3">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Internships Tab */}
              <TabsContent value="internships" className="space-y-6 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Available Internships</h2>
                  <div className="text-sm text-muted-foreground">
                    {company.internshipCount} internship positions
                  </div>
                </div>
                
                <div className="space-y-4">
                  {company.internships.map((internship: any) => (
                    <Card key={internship.id}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{internship.title}</h3>
                            <div className="flex flex-wrap gap-3 mb-3">
                              <Badge variant="outline" className="bg-primary/10">
                                {internship.department}
                              </Badge>
                              <Badge variant="outline">{internship.location}</Badge>
                              <Badge variant="outline">{internship.type}</Badge>
                              {internship.isPaid && (
                                <Badge variant="outline" className="bg-green-100 text-green-800">
                                  Paid
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground">{internship.description}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <Button 
                              className="whitespace-nowrap"
                              onClick={() => handleViewInternship(internship.id)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card className="bg-muted border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="font-bold mb-2">Get Personalized Internship Matches</h3>
                        <p className="text-muted-foreground">Create a profile to receive tailored internship recommendations based on your skills and interests.</p>
                      </div>
                      <div className="flex-shrink-0">
                        <Button onClick={() => navigate("/register/student")}>
                          Sign Up Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Intern Reviews</h2>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="font-bold">{company.rating} / 5.0</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {company.reviews.map((review: any) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold">{review.author}</h3>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex items-center">
                            <div className="flex">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                              ))}
                              {Array.from({ length: 5 - review.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-gray-300" />
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-green-700">Pros</h4>
                            <p className="text-sm">{review.pros}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-red-700">Cons</h4>
                            <p className="text-sm">{review.cons}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline">See All Reviews</Button>
                </div>
              </TabsContent>
              
              {/* People Tab */}
              <TabsContent value="people" className="space-y-6 pt-6">
                <h2 className="text-2xl font-bold mb-4">Leadership Team</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {company.employees.map((employee: any) => (
                    <Card key={employee.name}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden">
                            <img 
                              src={employee.image} 
                              alt={employee.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold">{employee.name}</h3>
                            <p className="text-muted-foreground">{employee.title}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-0 h-auto mt-1"
                              onClick={() => window.open(employee.linkedin, "_blank")}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2" stroke="#0A66C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin mr-1"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                              <span className="text-blue-600 font-medium">LinkedIn</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Employee Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">{company.employees}</div>
                        <p className="text-muted-foreground">Total Employees</p>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">{company.founded}</div>
                        <p className="text-muted-foreground">Year Founded</p>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary mb-2">{company.rating}/5.0</div>
                        <p className="text-muted-foreground">Employee Rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* FAQ Tab */}
              <TabsContent value="faq" className="space-y-6 pt-6">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                
                <div className="space-y-4">
                  {company.faq.map((item: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <h3 className="font-bold text-lg mb-2">{item.question}</h3>
                        <p className="text-muted-foreground">{item.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="font-bold mb-1">Have More Questions?</h3>
                        <p className="text-sm text-muted-foreground">Contact our team or check out more company information on our website.</p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => window.open(company.website, "_blank")}
                      >
                        Visit Website
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Company Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Company Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Founded</span>
                  <span className="font-medium">{company.founded}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Company Size</span>
                  <span className="font-medium">{company.employees}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Industry</span>
                  <span className="font-medium">{company.industries[0]}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{company.type.charAt(0).toUpperCase() + company.type.slice(1)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Open Positions</span>
                  <span className="font-medium">{company.openPositions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Locations</span>
                  <div className="text-right">
                    {company.locations.map((location: string, index: number) => (
                      <div key={index}>{location}</div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Featured Internships */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Internships</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {company.internships.slice(0, 3).map((internship: any) => (
                  <div 
                    key={internship.id} 
                    className="border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => handleViewInternship(internship.id)}
                  >
                    <h3 className="font-medium">{internship.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="mr-1 h-3 w-3" />
                      <span>{internship.location}</span>
                      <Clock className="ml-2 mr-1 h-3 w-3" />
                      <span>{internship.type}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => navigate("/internships")}
                >
                  View All Internships
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            {/* Similar Companies */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Companies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {companies
                  .filter(c => c.id !== company.id)
                  .slice(0, 3)
                  .map(similarCompany => (
                    <div 
                      key={similarCompany.id} 
                      className="flex items-center gap-3 border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer"
                      onClick={() => navigate(`/companies/${similarCompany.id}`)}
                    >
                      <div className="w-10 h-10 rounded-md overflow-hidden">
                        <img 
                          src={similarCompany.logo} 
                          alt={similarCompany.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{similarCompany.name}</h3>
                        <p className="text-xs text-muted-foreground">{similarCompany.industries[0]}</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
              <CardFooter>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => navigate("/companies")}
                >
                  View More Companies
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompanyDetail;
