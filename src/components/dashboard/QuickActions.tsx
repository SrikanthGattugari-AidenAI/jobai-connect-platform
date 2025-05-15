
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Code2, 
  FileText, 
  Mic, 
  TrendingUp, 
  Handshake, 
  BriefcaseBusiness, 
  Trophy,
  User
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function QuickActions() {
  const { user } = useAuth();
  
  const studentActions = [
    { title: "Applied Jobs", icon: BriefcaseBusiness, href: "/applications" },
    { title: "Offer Letters", icon: FileText, href: "/offers" },
    { title: "Take Mock Interview", icon: Mic, href: "/mock-interview" },
    { title: "Try Technical Challenge", icon: Code2, href: "/technical-challenge" },
    { title: "Update Your Profile", icon: User, href: "/profile" },
    { title: "Explore Job Market Trends", icon: TrendingUp, href: "/market-trends" },
    { title: "Join a Hackathon", icon: Trophy, href: "/hackathons" },
    { title: "Explore Courses", icon: BookOpen, href: "/courses" }
  ];
  
  const employerActions = [
    { title: "Post a New Job", icon: BriefcaseBusiness, href: "/employer/post-job" },
    { title: "View Candidates", icon: Handshake, href: "/employer/candidates" },
    { title: "Host a Hackathon", icon: Trophy, href: "/hackathons/create" },
    { title: "Company Profile", icon: User, href: "/profile" }
  ];
  
  const actions = user?.role === "employer" ? employerActions : studentActions;
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Link to={action.href} key={action.title}>
          <Button
            variant="outline"
            className="w-full h-auto flex flex-col items-center gap-2 p-4 border-dashed hover:border-solid"
          >
            <action.icon className="h-6 w-6" />
            <span className="text-sm text-center">{action.title}</span>
          </Button>
        </Link>
      ))}
    </div>
  );
}
