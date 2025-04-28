
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, BookOpen, Map, Trophy, FileText } from "lucide-react";

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
          Practice Mock Interviews
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/courses")}>
          <BookOpen className="mr-2 h-4 w-4" />
          Recommended Courses
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/career-roadmaps")}>
          <Map className="mr-2 h-4 w-4" />
          Recommended Roadmaps
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/hackathons")}>
          <Trophy className="mr-2 h-4 w-4" />
          Recommended Hackathons
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/resume-builder")}>
          <FileText className="mr-2 h-4 w-4" />
          Enrich Resume
        </Button>
      </CardContent>
    </Card>
  );
}
