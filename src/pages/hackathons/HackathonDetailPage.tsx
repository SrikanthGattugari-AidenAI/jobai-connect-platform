
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { HackathonLeaderboard } from "@/components/hackathons/HackathonLeaderboard";
import { useToast } from "@/hooks/use-toast";
import { HackathonHeader } from "@/components/hackathons/HackathonHeader";
import { HackathonAbout } from "@/components/hackathons/HackathonAbout";
import { HackathonPrizes } from "@/components/hackathons/HackathonPrizes";
import { HackathonDetails } from "@/components/hackathons/HackathonDetails";
import { HackathonActions } from "@/components/hackathons/HackathonActions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Hackathon } from "./types";

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
        <HackathonHeader 
          hackathon={hackathon} 
          isOwner={isOwner}
          onEditHackathon={handleEditHackathon}
          onManageParticipants={handleManageParticipants}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <HackathonAbout description={hackathon.description} />
            <HackathonPrizes prizes={hackathon.prizes} />
            
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Leaderboard</h3>
              </div>
              <div className="card-content">
                <HackathonLeaderboard />
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <HackathonDetails hackathon={hackathon} />
            <HackathonActions 
              isOwner={isOwner} 
              onEditHackathon={handleEditHackathon} 
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HackathonDetailPage;
