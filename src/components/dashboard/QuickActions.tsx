
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BuildingIcon, BookOpen, Map, Trophy, FileText } from "lucide-react";

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card className="bg-gradient-to-b from-white to-slate-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" className="w-full justify-start hover:bg-slate-50" onClick={() => navigate("/companies")}>
          <BuildingIcon className="mr-2 h-4 w-4" />
          Companies Viewing Your Profile
        </Button>
        <Button variant="outline" className="w-full justify-start hover:bg-slate-50" onClick={() => navigate("/courses")}>
          <BookOpen className="mr-2 h-4 w-4" />
          Recommended Courses
        </Button>
        <Button variant="outline" className="w-full justify-start hover:bg-slate-50" onClick={() => navigate("/career-roadmaps")}>
          <Map className="mr-2 h-4 w-4" />
          Recommended Roadmaps
        </Button>
        <Button variant="outline" className="w-full justify-start hover:bg-slate-50" onClick={() => navigate("/hackathons")}>
          <Trophy className="mr-2 h-4 w-4" />
          Recommended Hackathons
        </Button>
        <Button variant="outline" className="w-full justify-start hover:bg-slate-50" onClick={() => navigate("/resume-builder")}>
          <FileText className="mr-2 h-4 w-4" />
          Enrich Resume
        </Button>
      </CardContent>
    </Card>
  );
}
