
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Video, Code, Trophy, Briefcase, FileText } from "lucide-react";

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/mock-interview")}>
          <Mic className="mr-2 h-4 w-4" />
          Practice Audio Interview
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/mock-interview")} disabled>
          <Video className="mr-2 h-4 w-4" />
          Video Interview (Coming Soon)
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/technical-challenge")}>
          <Code className="mr-2 h-4 w-4" />
          Technical Challenges
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/hackathons")}>
          <Trophy className="mr-2 h-4 w-4" />
          Browse Hackathons
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/internships")}>
          <Briefcase className="mr-2 h-4 w-4" />
          Browse Internships
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/resume-builder")}>
          <FileText className="mr-2 h-4 w-4" />
          Update Resume
        </Button>
      </CardContent>
    </Card>
  );
}
