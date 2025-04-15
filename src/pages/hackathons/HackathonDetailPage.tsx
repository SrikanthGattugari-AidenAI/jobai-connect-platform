
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Trophy, Users, MapPin, ExternalLink, ArrowLeft, Edit, Clock, DollarSign } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { HackathonLeaderboard } from "@/components/hackathons/HackathonLeaderboard";
import { HowItWorksDialog } from "@/components/hackathons/HowItWorksDialog";
import { useToast } from "@/hooks/use-toast";

interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  description: string;
  startDate: string;
  endDate: string;
  registrationEndDate?: string | null;
  location: string;
  image: string;
  participants: number;
  featured: boolean;
  categories: string[];
  prizes: string[];
  sponsoredBy: string[];
  registrationFee?: string;
  employerId?: string;
}

const HackathonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchHackathon = () => {
      try {
        const allHackathons = JSON.parse(localStorage.getItem('employerHackathons') || '[]');
        const foundHackathon = allHackathons.find((h: Hackathon) => h.id === id);
        
        if (foundHackathon) {
          setHackathon(foundHackathon);
          // Check if the current user is the owner of this hackathon
          setIsOwner(user?.id === foundHackathon.employerId);
        }
      } catch (error) {
        console.error("Error fetching hackathon:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchHackathon();
    }
  }, [id, user]);

  const handleEditHackathon = () => {
    toast({
      title: "Edit feature coming soon",
      description: "The ability to edit hackathons will be available soon.",
    });
  };

  const handleManageParticipants = () => {
    toast({
      title: "Manage participants feature coming soon",
      description: "The ability to manage hackathon participants will be available soon.",
    });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container-custom py-8 text-center">
          Loading hackathon details...
        </div>
      </MainLayout>
    );
  }

  if (!hackathon) {
    return (
      <MainLayout>
        <div className="container-custom py-8 text-center">
          <h1 className="heading-2 mb-4">Hackathon Not Found</h1>
          <p className="text-muted-foreground mb-6">The hackathon you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/hackathons")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hackathons
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div 
        className="w-full h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${hackathon.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="px-0 hover:bg-transparent"
                onClick={() => navigate("/hackathons/employer")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Hackathons
              </Button>
              
              {hackathon.featured && (
                <Badge variant="default">Featured</Badge>
              )}
            </div>
            
            <h1 className="heading-2 mb-2">{hackathon.title}</h1>
            <p className="text-muted-foreground">
              Organized by {hackathon.organizer}
            </p>
          </div>
          
          {isOwner && (
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleEditHackathon}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Hackathon
              </Button>
              <Button onClick={handleManageParticipants}>Manage Participants</Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About This Hackathon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{hackathon.description}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Prizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hackathon.prizes.map((prize, index) => (
                    <div key={index} className="flex items-start">
                      <Trophy className="mt-1 mr-3 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">
                          {prize}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <HackathonLeaderboard />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Hackathon Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Timeline</p>
                    <p className="text-sm text-muted-foreground">
                      {format(parseISO(hackathon.startDate), "MMMM d")} - {format(parseISO(hackathon.endDate), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>
                
                {hackathon.registrationEndDate && (
                  <div className="flex items-center">
                    <Clock className="mr-3 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Registration Deadline</p>
                      <p className="text-sm text-muted-foreground">
                        {format(parseISO(hackathon.registrationEndDate), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                )}

                {hackathon.registrationFee && (
                  <div className="flex items-center">
                    <DollarSign className="mr-3 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Registration Fee</p>
                      <p className="text-sm text-muted-foreground">
                        ${hackathon.registrationFee}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center">
                  <MapPin className="mr-3 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{hackathon.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Participants</p>
                    <p className="text-sm text-muted-foreground">{hackathon.participants} registered</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="font-medium mb-2">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {hackathon.categories.map((category, index) => (
                      <Badge key={index} variant="outline">{category}</Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="font-medium mb-2">Sponsored By</p>
                  <div className="flex flex-wrap gap-4">
                    {hackathon.sponsoredBy.map((sponsor, index) => (
                      <div key={index} className="text-sm font-medium">
                        {sponsor}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isOwner ? (
                  <>
                    <Button className="w-full">
                      View Submissions
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleEditHackathon}>
                      Edit Hackathon
                    </Button>
                    <Button variant="outline" className="w-full">
                      Export Participant Data
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full">
                      Register for Hackathon
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => {
                      // Open the how it works dialog using its trigger function instead of using it as a wrapper
                      const dialog = document.getElementById('how-it-works-dialog-trigger');
                      if (dialog) {
                        (dialog as HTMLButtonElement).click();
                      }
                    }}>
                      How It Works
                    </Button>
                    {/* Add a hidden trigger for the dialog */}
                    <div className="hidden">
                      <HowItWorksDialog />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HackathonDetailPage;
