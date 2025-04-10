
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Trophy, Users, Clock, Laptop, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { HowItWorksDialog } from "@/components/hackathons/HowItWorksDialog";
import { HackathonLeaderboard } from "@/components/hackathons/HackathonLeaderboard";
import { HostHackathonForm } from "@/components/hackathons/HostHackathonForm";
import { useAuth } from "@/context/AuthContext";

// Sample hackathon data
const hackathons = [
  {
    id: "hack1",
    title: "AI Innovation Challenge",
    company: "TechCorp",
    logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
    startDate: "2025-05-15",
    duration: "48 hours",
    participants: 450,
    prizes: "$5,000",
    tags: ["AI", "Machine Learning", "Cloud"]
  },
  {
    id: "hack2",
    title: "Web3 Developers Hackathon",
    company: "BlockChain Inc",
    logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    startDate: "2025-06-10",
    duration: "72 hours",
    participants: 320,
    prizes: "$3,500",
    tags: ["Blockchain", "Web3", "Smart Contracts"]
  },
  {
    id: "hack3",
    title: "Data Science Challenge",
    company: "DataViz",
    logo: "https://images.unsplash.com/photo-1611162616071-b39a2ec055fb",
    startDate: "2025-05-25",
    duration: "36 hours",
    participants: 280,
    prizes: "$2,000",
    tags: ["Data Science", "Analytics", "Visualization"]
  }
];

export const HackathonSection = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <Badge variant="outline" className="bg-primary/10 text-primary px-3 py-1 mb-2">
              <Trophy className="mr-1 h-3.5 w-3.5" />
              Hackathons
            </Badge>
            <h2 className="heading-2 mb-2">Showcase Your Skills in Live Challenges</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Participate in industry-sponsored hackathons to test your skills, build your portfolio, and get noticed by top employers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <HowItWorksDialog />
            <HackathonLeaderboard />
            <Button 
              variant="outline" 
              onClick={() => navigate("/hackathons")}
            >
              View All Hackathons
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hackathons.map((hackathon) => (
            <Card key={hackathon.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-md overflow-hidden">
                    <img 
                      src={hackathon.logo} 
                      alt={hackathon.company} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hosted by</p>
                    <p className="font-medium">{hackathon.company}</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{hackathon.title}</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <CalendarClock className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">Starts {formatDate(hackathon.startDate)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">Duration: {hackathon.duration}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{hackathon.participants} participants</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Trophy className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">Prizes: {hackathon.prizes}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {hackathon.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-gray-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0 mt-auto">
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
        
        <div className="bg-gradient-to-r from-brand-light to-primary/10 p-8 rounded-xl mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Laptop className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Host Your Own Hackathon</h3>
                <p className="text-gray-600">Find talented developers and designers for your organization</p>
              </div>
            </div>
            <HostHackathonForm />
          </div>
        </div>
      </div>
    </section>
  );
};
