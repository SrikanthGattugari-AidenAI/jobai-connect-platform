
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Award, 
  Users, 
  Code, 
  ChevronRight,
  MapPin,
  Trophy,
  Sparkles
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
    sponsoredBy: ["TechGiant", "BlockchainCorp", "CryptoVentures"]
  },
  {
    id: "hack-2",
    title: "AI Machine Learning Challenge",
    organizer: "DataDriven Labs",
    description: "Tackle real-world problems using machine learning and artificial intelligence.",
    startDate: "2025-07-10",
    endDate: "2025-07-12",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    participants: 189,
    featured: true,
    categories: ["AI", "Machine Learning", "Data Science"],
    prizes: ["$10,000 First Prize", "$5,000 Second Prize", "$2,500 Third Prize"],
    sponsoredBy: ["DataDriven", "AITech", "NeuralNet Inc."]
  },
  {
    id: "hack-3",
    title: "Mobile App Innovation Hackathon",
    organizer: "AppFoundry",
    description: "Design and build innovative mobile applications that solve everyday problems.",
    startDate: "2025-08-05",
    endDate: "2025-08-07",
    location: "Remote",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    participants: 156,
    featured: false,
    categories: ["Mobile", "UI/UX", "App Development"],
    prizes: ["$7,500 First Prize", "$3,000 Second Prize", "$1,500 Third Prize"],
    sponsoredBy: ["AppFoundry", "MobileFirst", "UXDesign Co."]
  },
  {
    id: "hack-4",
    title: "Sustainable Tech Hackathon",
    organizer: "GreenTech Foundation",
    description: "Build technology solutions that address environmental challenges and promote sustainability.",
    startDate: "2025-09-12",
    endDate: "2025-09-14",
    location: "Berlin, Germany",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    participants: 142,
    featured: false,
    categories: ["Sustainability", "CleanTech", "IoT"],
    prizes: ["€8,000 First Prize", "€4,000 Second Prize", "€2,000 Third Prize"],
    sponsoredBy: ["GreenTech", "SustainableFuture", "EcoDev"]
  },
  {
    id: "hack-5",
    title: "HealthTech Innovation Challenge",
    organizer: "MedTech Alliance",
    description: "Create innovative solutions to transform healthcare delivery and patient outcomes.",
    startDate: "2025-10-08",
    endDate: "2025-10-10",
    location: "Boston, MA",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    participants: 167,
    featured: true,
    categories: ["HealthTech", "Medical", "Wellness"],
    prizes: ["$15,000 First Prize", "$7,500 Second Prize", "$3,000 Third Prize"],
    sponsoredBy: ["MedTech Alliance", "HealthInnovators", "BioTech Labs"]
  },
  {
    id: "hack-6",
    title: "EdTech Hackathon",
    organizer: "Future Education Initiative",
    description: "Reimagine education through technology and create solutions that enhance learning.",
    startDate: "2025-11-15",
    endDate: "2025-11-17",
    location: "Remote",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    participants: 124,
    featured: false,
    categories: ["EdTech", "E-Learning", "Educational Tools"],
    prizes: ["$6,000 First Prize", "$3,000 Second Prize", "$1,500 Third Prize"],
    sponsoredBy: ["Future Education", "LearnTech", "EduInnovate"]
  }
];

const Hackathons = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  
  const filteredHackathons = hackathons.filter(hackathon => 
    hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hackathon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hackathon.categories.some(category => category.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const featuredHackathons = hackathons.filter(hackathon => hackathon.featured);
  const upcomingHackathons = [...hackathons].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl p-8 mb-10">
          <div className="max-w-3xl">
            <h1 className="heading-2 mb-4">Join Exciting Hackathons</h1>
            <p className="text-lg text-gray-700 mb-6">
              Showcase your skills, collaborate with talented peers, and build innovative solutions in these company-sponsored hackathons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => document.getElementById("hackathon-list")?.scrollIntoView({ behavior: "smooth" })}
              >
                Browse Hackathons
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowHowItWorks(true)}
              >
                How It Works
              </Button>
            </div>
          </div>
        </div>
        
        {/* How It Works Dialog */}
        <Dialog open={showHowItWorks} onOpenChange={setShowHowItWorks}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-2">How Hackathons Work</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Participate in hackathons to showcase your skills, build your portfolio, and get noticed by employers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">1. Register & Form Teams</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign up for a hackathon and either join with friends or meet new teammates during the event.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">2. Build Your Solution</h3>
                  <p className="text-sm text-muted-foreground">
                    Work intensively over 24-72 hours to design and build an innovative solution to the challenge.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">3. Present & Win</h3>
                  <p className="text-sm text-muted-foreground">
                    Present your project to judges, get feedback, and potentially win prizes and recognition.
                  </p>
                </div>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Benefits for Students</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Build your portfolio with real projects</li>
                  <li>Network with industry professionals and peers</li>
                  <li>Learn new technologies and skills in a practical setting</li>
                  <li>Get noticed by potential employers</li>
                  <li>Win prizes and recognition for your work</li>
                </ul>
              </div>
              
              <div className="text-center">
                <Button size="lg" onClick={() => setShowHowItWorks(false)}>
                  Got It
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search hackathons by name, technology, or category"
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
        
        {/* Featured Hackathons */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="heading-3">Featured Hackathons</h2>
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHackathons.map((hackathon) => (
              <Card key={hackathon.id} className="overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${hackathon.image})` }}
                >
                  <div className="w-full h-full bg-black/50 p-4 flex items-end">
                    <div>
                      <Badge className="bg-primary text-white mb-2">Featured</Badge>
                      <h3 className="text-xl font-bold text-white">{hackathon.title}</h3>
                      <p className="text-white/80 text-sm">by {hackathon.organizer}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground text-sm mb-4">{hackathon.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(hackathon.startDate)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>3 Days</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{hackathon.participants} Participants</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{hackathon.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hackathon.categories.map((category, index) => (
                      <Badge key={index} variant="secondary">{category}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    className="w-full" 
                    onClick={() => navigate(`/hackathons/${hackathon.id}`)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Hackathons List */}
        <div id="hackathon-list">
          <div className="flex justify-between items-center mb-6">
            <h2 className="heading-3">All Hackathons</h2>
          </div>
          
          <Tabs defaultValue="upcoming" className="mb-8">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingHackathons.map((hackathon) => (
                  <Card key={hackathon.id} className="flex flex-col md:flex-row overflow-hidden">
                    <div 
                      className="md:w-1/3 h-40 md:h-auto bg-cover bg-center"
                      style={{ backgroundImage: `url(${hackathon.image})` }}
                    />
                    <div className="p-6 md:w-2/3">
                      <h3 className="text-xl font-bold mb-2">{hackathon.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{hackathon.description}</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(hackathon.startDate)}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{hackathon.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hackathon.categories.slice(0, 2).map((category, index) => (
                          <Badge key={index} variant="secondary">{category}</Badge>
                        ))}
                        {hackathon.categories.length > 2 && (
                          <Badge variant="secondary">+{hackathon.categories.length - 2}</Badge>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => navigate(`/hackathons/${hackathon.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="popular">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...hackathons]
                  .sort((a, b) => b.participants - a.participants)
                  .map((hackathon) => (
                    <Card key={hackathon.id} className="flex flex-col md:flex-row overflow-hidden">
                      <div 
                        className="md:w-1/3 h-40 md:h-auto bg-cover bg-center"
                        style={{ backgroundImage: `url(${hackathon.image})` }}
                      />
                      <div className="p-6 md:w-2/3">
                        <h3 className="text-xl font-bold mb-2">{hackathon.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{hackathon.description}</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(hackathon.startDate)}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{hackathon.location}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hackathon.categories.slice(0, 2).map((category, index) => (
                            <Badge key={index} variant="secondary">{category}</Badge>
                          ))}
                          {hackathon.categories.length > 2 && (
                            <Badge variant="secondary">+{hackathon.categories.length - 2}</Badge>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => navigate(`/hackathons/${hackathon.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="past">
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Past Hackathons</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Past hackathons will appear here once they are completed. Check back later!
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Why Participate */}
        <div className="bg-muted rounded-xl p-8 mb-12">
          <h2 className="heading-3 mb-6 text-center">Why Participate in Hackathons?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Win Prizes</h3>
              <p className="text-muted-foreground">
                Showcase your skills and win cash prizes, tech gadgets, and recognition from industry leaders.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Networking</h3>
              <p className="text-muted-foreground">
                Connect with like-minded individuals, industry experts, and potential employers.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Skill Development</h3>
              <p className="text-muted-foreground">
                Learn new technologies, improve your problem-solving abilities, and enhance your portfolio.
              </p>
            </div>
          </div>
        </div>
        
        {/* Host a Hackathon CTA */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Are You an Employer?</h2>
            <p className="text-white/90 mb-6">
              Host your own hackathon to discover top talent, promote your brand, and source innovative solutions to your business challenges.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate("/login/employer")}
            >
              Host a Hackathon
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Hackathons;
