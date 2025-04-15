
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit } from "lucide-react";
import { Hackathon } from "@/pages/hackathons/types";

interface HackathonHeaderProps {
  hackathon: Hackathon;
  isOwner: boolean;
  onEditHackathon: () => void;
  onManageParticipants: () => void;
}

export const HackathonHeader = ({
  hackathon,
  isOwner,
  onEditHackathon,
  onManageParticipants
}: HackathonHeaderProps) => {
  const navigate = useNavigate();
  
  return (
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
          <Button variant="outline" onClick={onEditHackathon}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Hackathon
          </Button>
          <Button onClick={onManageParticipants}>Manage Participants</Button>
        </div>
      )}
    </div>
  );
};
