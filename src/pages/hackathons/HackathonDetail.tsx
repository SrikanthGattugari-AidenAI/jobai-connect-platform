
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Award,
  Gift,
  Building,
  Check,
  Info,
  FileText,
  AlarmClock,
  Sparkles
} from "lucide-react";

// Mock data (would be fetched based on ID in a real app)
const hackathons = [
  {
    id: "hack-1",
    title: "Web3 Innovation Hackathon",
    organizer: "TechGiant Inc.",
    description: "Build the future of decentralized applications and push the boundaries of blockchain technology.",
    startDate: "2025-06-15",
    endDate: "2025-06-17",
    location: "Remote",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    participants: 234,
    featured: true,
    categories: ["Blockchain", "Web3", "DeFi"],
    prizes: ["$5,000 First Prize", "$2,500 Second Prize", "$1,000 Third Prize"],
    sponsoredBy: ["TechGiant", "BlockchainCorp", "CryptoVentures"],
    timeline: [
      {
        title: "Registration Deadline",
        date: "2025-06-10T23:59:59Z"
      },
      {
        title: "Kickoff and Team Formation",
        date: "2025-06-15T10:00:00Z"
      },
      {
        title: "Hacking Begins",
        date: "2025-06-15T12:00:00Z"
      },
      {
        title: "Mid-event Check-in",
        date: "2025-06-16T14:00:00Z"
      },
      {
        title: "Project Submission Deadline",
        date: "2025-06-17T15:00:00Z"
      },
      {
        title: "Presentations and Judging",
        date: "2025-06-17T16:00:00Z"
      },
      {
        title: "Winners Announcement",
        date: "2025-06-17T18:00:00Z"
      }
    ],
    criteria: [
      { name: "Innovation", description: "Originality of the idea and approach." },
      { name: "Technical Complexity", description: "Level of technical challenge and sophistication." },
      { name: "User Experience", description: "Intuitive design and ease of use." },
      { name: "Business Potential", description: "Viability as a real-world solution." },
      { name: "Presentation", description: "Clarity and effectiveness of project presentation." }
    ],
    overview: `
    ## About This Hackathon
    
    The Web3 Innovation Hackathon challenges participants to build decentralized applications that push the boundaries of blockchain technology. Whether you're experienced in Web3 development or just getting started, this hackathon offers an opportunity to learn, build, and showcase your skills.
    
    ## Challenge Details
    
    Participants can choose to work on one of the following tracks:
    
    1. **DeFi Solutions**: Build applications that reimagine financial services using blockchain technology.
    2. **NFT Platforms**: Create innovative platforms for creating, trading, or utilizing NFTs.
    3. **DAOs and Governance**: Develop solutions that improve decentralized organization and governance.
    4. **Web3 Infrastructure**: Build tools and frameworks that enhance the Web3 ecosystem.
    
    ## Who Can Participate
    
    This hackathon is open to all students and professionals interested in blockchain technology. We welcome developers, designers, product managers, and blockchain enthusiasts of all skill levels. Teams can consist of 1-4 members.
    `,
    rules: `
    ## General Rules
    
    1. Teams can consist of 1-4 members.
    2. All code must be written during the hackathon period.
    3. You may use open-source libraries and frameworks.
    4. Your solution must address one of the specified challenge tracks.
    5. Projects must be submitted before the deadline.
    
    ## Submission Requirements
    
    1. Working prototype or demo
    2. Source code (GitHub repository)
    3. 5-minute presentation
    4. Project description
    
    ## Intellectual Property
    
    All IP rights remain with the participants. Sponsors receive non-exclusive license to use submitted projects.
    `,
    faqs: [
      {
        question: "Do I need prior blockchain experience?",
        answer: "No, we welcome participants of all skill levels. There will be mentors available to help newcomers."
      },
      {
        question: "Can I join without a team?",
        answer: "Yes! We'll have a team formation session at the beginning of the event to help solo participants find teammates."
      },
      {
        question: "What tools or platforms should I use?",
        answer: "You're free to use any tools or platforms you prefer. We recommend Ethereum, Solana, or Polygon for blockchain-based applications."
      },
      {
        question: "Do I need to submit a finished product?",
        answer: "No, a working prototype that demonstrates your concept is sufficient."
      },
      {
        question: "How will projects be judged?",
        answer: "Projects will be evaluated based on innovation, technical complexity, user experience, business potential, and presentation."
      }
    ],
    resources: [
      {
        title: "Web3 Development Guide",
        url: "#",
        description: "A comprehensive guide to getting started with Web3 development."
      },
      {
        title: "Blockchain Basics Workshop Recording",
        url: "#",
        description: "A recorded workshop covering the fundamentals of blockchain technology."
      },
      {
        title: "Smart Contract Development Resources",
        url: "#",
        description: "Collection of tutorials and resources for smart contract development."
      },
      {
        title: "UI/UX Best Practices for Web3 Applications",
        url: "#",
        description: "Design guidelines for creating user-friendly decentralized applications."
      }
    ],
    judges: [
      {
        name: "Alexandra Chen",
        company: "TechGiant Inc.",
        role: "Director of Blockchain Innovation",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
      },
      {
        name: "Rajiv Patel",
        company: "BlockchainCorp",
        role: "Chief Technology Officer",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
      },
      {
        name: "Sarah Johnson",
        company: "CryptoVentures",
        role: "Lead Blockchain Architect",
        image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
      }
    ]
  }
];

const HackathonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [registrationStatus, setRegistrationStatus] = useState<"not-registered" | "pending" | "registered">("not-registered");
  
  // Find hackathon by ID (in a real app, this would fetch from API)
  const hackathon = hackathons.find(h => h.id === id);
  
  if (!hackathon) {
    return (
      <MainLayout>
        <div className="container-custom py-12 text-center">
          <h2 className="heading-2 mb-4">Hackathon Not Found</h2>
          <p className="text-muted-foreground mb-6">The hackathon you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/hackathons")}>View All Hackathons</Button>
        </div>
      </MainLayout>
    );
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const formatDateTime = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString('en-US', options);
  };
  
  const handleRegister = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to register for this hackathon.",
        variant: "destructive"
      });
      navigate("/login/student");
      return;
    }
    
    setRegistrationStatus("registered");
    toast({
      title: "Registration Successful",
      description: `You've successfully registered for ${hackathon.title}!`,
    });
  };
  
  // Calculate days remaining until hackathon
  const today = new Date();
  const hackathonStartDate = new Date(hackathon.startDate);
  const daysRemaining = Math.ceil((hackathonStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate registration progress
  const registrationDeadline = new Date(hackathon.timeline[0].date);
  const registrationStartDate = new Date(today.getTime() - 21 * 24 * 60 * 60 * 1000); // Assume registration started 3 weeks ago
  const totalRegistrationDays = (registrationDeadline.getTime() - registrationStartDate.getTime()) / (1000 * 60 * 60 * 24);
  const daysElapsed = (today.getTime() - registrationStartDate.getTime()) / (1000 * 60 * 60 * 24);
  const registrationProgress = Math.min(100, Math.round((daysElapsed / totalRegistrationDays) * 100));
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <div 
        className="w-full h-[300px] md:h-[400px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${hackathon.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 flex items-end">
          <div className="container-custom pb-8 text-white">
            <div className="space-y-4 max-w-3xl">
              {hackathon.featured && (
                <Badge className="bg-primary text-white">Featured</Badge>
              )}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{hackathon.title}</h1>
              <p className="text-white/90 text-lg">{hackathon.description}</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  <span>{formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  <span>{hackathon.location}</span>
                </div>
                <div className="flex items-center">
                  <Building className="mr-2 h-5 w-5 text-primary" />
                  <span>Organized by {hackathon.organizer}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
                <TabsTrigger value="prizes">Prizes</TabsTrigger>
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="pt-6">
                <div className="prose max-w-none">
                  {hackathon.overview.split('\n').map((line, i) => {
                    if (line.startsWith("## ")) {
                      return <h2 key={i} className="text-2xl font-bold mt-6 mb-4">{line.substring(3)}</h2>;
                    } else if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ")) {
                      return <li key={i} className="ml-6 mb-2">{line.substring(3)}</li>;
                    } else if (line.startsWith("**") && line.endsWith("**:")) {
                      return <strong key={i} className="text-lg font-semibold">{line.substring(2, line.length - 3)}:</strong>;
                    } else if (line.trim() === "") {
                      return <br key={i} />;
                    } else {
                      return <p key={i} className="mb-4">{line}</p>;
                    }
                  })}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Judging Criteria</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hackathon.criteria.map((criterion, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{criterion.name}</h4>
                          <p className="text-sm text-muted-foreground">{criterion.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Meet the Judges</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {hackathon.judges.map((judge, index) => (
                      <div key={index} className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                          <img 
                            src={judge.image} 
                            alt={judge.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-medium">{judge.name}</h4>
                        <p className="text-sm text-primary">{judge.role}</p>
                        <p className="text-xs text-muted-foreground">{judge.company}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="rules" className="pt-6">
                <div className="prose max-w-none">
                  {hackathon.rules.split('\n').map((line, i) => {
                    if (line.startsWith("## ")) {
                      return <h2 key={i} className="text-2xl font-bold mt-6 mb-4">{line.substring(3)}</h2>;
                    } else if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ") || line.startsWith("5. ")) {
                      return <li key={i} className="ml-6 mb-2">{line.substring(3)}</li>;
                    } else if (line.trim() === "") {
                      return <br key={i} />;
                    } else {
                      return <p key={i} className="mb-4">{line}</p>;
                    }
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="prizes" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-primary/50">
                    <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-4 flex items-center justify-center">
                      <Trophy className="h-12 w-12 text-white" />
                    </div>
                    <CardHeader className="text-center">
                      <CardTitle>First Prize</CardTitle>
                      <CardDescription>For the overall winner</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-2xl font-bold">{hackathon.prizes[0]}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <div className="bg-gradient-to-r from-gray-300 to-gray-400 p-4 flex items-center justify-center">
                      <Trophy className="h-12 w-12 text-white" />
                    </div>
                    <CardHeader className="text-center">
                      <CardTitle>Second Prize</CardTitle>
                      <CardDescription>Runner-up team</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-2xl font-bold">{hackathon.prizes[1]}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <div className="bg-gradient-to-r from-amber-700 to-amber-800 p-4 flex items-center justify-center">
                      <Trophy className="h-12 w-12 text-white" />
                    </div>
                    <CardHeader className="text-center">
                      <CardTitle>Third Prize</CardTitle>
                      <CardDescription>Second runner-up</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-2xl font-bold">{hackathon.prizes[2]}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Prizes</CardTitle>
                    <CardDescription>Special category awards and recognition</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Best Technical Implementation</h4>
                          <p className="text-sm text-muted-foreground">$1,000 + Mentorship opportunity with {hackathon.sponsoredBy[0]}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Most Innovative Solution</h4>
                          <p className="text-sm text-muted-foreground">$1,000 + Featured spotlight on {hackathon.sponsoredBy[1]} blog</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Best User Experience</h4>
                          <p className="text-sm text-muted-foreground">$750 + Portfolio review with design team at {hackathon.sponsoredBy[2]}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Gift className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Participation Rewards</h4>
                          <p className="text-sm text-muted-foreground">All participants will receive branded swag, certificates, and discount codes for premium services</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="faqs" className="pt-6">
                <div className="space-y-6">
                  {hackathon.faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Info className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="pt-6">
                <div className="space-y-6">
                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Info className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Access Resources</h3>
                        <p className="text-muted-foreground">
                          These resources are provided to help you prepare for the hackathon. Feel free to explore them and reach out if you have any questions.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {hackathon.resources.map((resource, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{resource.description}</p>
                        <Button variant="outline" className="w-full" onClick={() => window.open(resource.url, "_blank")}>
                          Access Resource
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Registration Card */}
            <Card>
              <CardHeader>
                <CardTitle>Registration</CardTitle>
                <CardDescription>Join this exciting hackathon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Registration Progress</span>
                  <span>{registrationProgress}%</span>
                </div>
                <Progress value={registrationProgress} className="h-2" />
                
                <div className="pt-2">
                  {daysRemaining > 0 ? (
                    <div className="flex items-center gap-2 text-orange-600">
                      <AlarmClock className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {daysRemaining} days until hackathon begins
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Hackathon is live!
                      </span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-2" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Participants</span>
                    <span className="font-medium">{hackathon.participants} registered</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Registration Ends</span>
                    <span className="font-medium">{formatDate(hackathon.timeline[0].date)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {registrationStatus === "not-registered" ? (
                  <Button 
                    className="w-full"
                    onClick={handleRegister}
                  >
                    Register Now
                  </Button>
                ) : registrationStatus === "pending" ? (
                  <Button 
                    className="w-full"
                    variant="outline"
                    disabled
                  >
                    Registration Pending
                  </Button>
                ) : (
                  <Button 
                    className="w-full"
                    variant="outline"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Registered
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            {/* Timeline Card */}
            <Card>
              <CardHeader>
                <CardTitle>Event Timeline</CardTitle>
                <CardDescription>Important dates and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-muted-foreground/20 ml-3 space-y-6">
                  {hackathon.timeline.map((event, index) => (
                    <li key={index} className="ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-background bg-primary/10">
                        <Clock className="w-3 h-3 text-primary" />
                      </span>
                      <h3 className="font-medium">{event.title}</h3>
                      <time className="text-sm text-muted-foreground">
                        {formatDateTime(event.date)}
                      </time>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            
            {/* Sponsors Card */}
            <Card>
              <CardHeader>
                <CardTitle>Sponsors</CardTitle>
                <CardDescription>Organizations supporting this event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-6">
                  {hackathon.sponsoredBy.map((sponsor, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-2">
                        <Building className="h-8 w-8 text-muted-foreground/70" />
                      </div>
                      <p className="text-sm font-medium">{sponsor}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Share Card */}
            <Card>
              <CardHeader>
                <CardTitle>Share This Hackathon</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-2">
                  <Button variant="outline" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Related Hackathons */}
        <div className="mt-12 pt-12 border-t">
          <h2 className="heading-3 mb-6">Similar Hackathons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hackathons.filter(h => h.id !== id).slice(0, 3).map((h) => (
              <Card key={h.id} className="overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${h.image})` }}
                >
                  <div className="w-full h-full bg-black/50 p-4 flex items-end">
                    <h3 className="text-xl font-bold text-white">{h.title}</h3>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground text-sm mb-4">{h.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(h.startDate)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{h.location}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate(`/hackathons/${h.id}`)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HackathonDetail;
