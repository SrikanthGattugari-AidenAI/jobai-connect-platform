
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample leaderboard data
const leaderboardData = [
  {
    id: 1,
    name: "Team Innovators",
    members: ["John Doe", "Sarah Kim", "Raj Patel"],
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
    hackathon: "AI Innovation Challenge",
    position: 1,
    score: 98,
    prize: "$5,000",
    projectName: "AI-powered Medical Diagnostic Tool"
  },
  {
    id: 2,
    name: "DataWhiz",
    members: ["Alex Johnson", "Maria Garcia", "Tom Chen"],
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    hackathon: "Data Science Challenge",
    position: 2,
    score: 95,
    prize: "$3,000",
    projectName: "Predictive Analytics for Climate Change"
  },
  {
    id: 3,
    name: "CodeCrusaders",
    members: ["Emma Wilson", "David Kim", "Olivia Martinez"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    hackathon: "Web3 Developers Hackathon",
    position: 3,
    score: 92,
    prize: "$2,000",
    projectName: "Decentralized Identity Verification"
  },
  {
    id: 4,
    name: "TechTitans",
    members: ["Michael Brown", "Sophie Taylor", "James Lee"],
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    hackathon: "AI Innovation Challenge",
    position: 4,
    score: 90,
    prize: "$1,000",
    projectName: "Voice-Controlled Smart Home Solution"
  },
  {
    id: 5,
    name: "ByteBusters",
    members: ["Ava Robinson", "Noah Singh", "Ethan Wong"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    hackathon: "Data Science Challenge",
    position: 5,
    score: 87,
    prize: "$500",
    projectName: "Traffic Congestion Prediction System"
  }
];

export const HackathonLeaderboard = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Trophy className="h-4 w-4" />
          View Leaderboard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Hackathon Leaderboard</DialogTitle>
          <DialogDescription>
            Top performing teams from our recent hackathons
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-6">
            {leaderboardData.map((team) => (
              <div 
                key={team.id} 
                className={`p-4 rounded-lg border ${
                  team.position === 1 
                    ? "border-yellow-400 bg-yellow-50" 
                    : team.position === 2 
                    ? "border-gray-400 bg-gray-50" 
                    : team.position === 3 
                    ? "border-amber-700 bg-amber-50" 
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {team.position === 1 ? (
                        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                          <Trophy className="h-6 w-6 text-yellow-800" />
                        </div>
                      ) : team.position === 2 ? (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <Medal className="h-6 w-6 text-gray-700" />
                        </div>
                      ) : team.position === 3 ? (
                        <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center">
                          <Award className="h-6 w-6 text-amber-100" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="font-semibold text-gray-700">{team.position}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{team.name}</h3>
                      <p className="text-sm text-muted-foreground">{team.hackathon}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{team.score} points</p>
                    <p className="text-sm text-emerald-600">{team.prize}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Project:</p>
                    <p className="text-sm">{team.projectName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Team Members:</p>
                    <div className="flex items-center mt-1 gap-1">
                      {team.members.map((member, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
