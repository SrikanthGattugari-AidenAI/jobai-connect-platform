
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface JourneyStep {
  id: string;
  title: string;
  isOptional?: boolean;
  isCompleted?: boolean;
  isCurrent?: boolean;
  badge?: string;
  link: string;
}

const journeySteps: JourneyStep[] = [
  {
    id: "profile",
    title: "Profile",
    isCurrent: true,
    badge: "70%",
    link: "/profile"
  },
  {
    id: "courses",
    title: "Courses & Roadmap",
    isOptional: true,
    link: "/courses"
  },
  {
    id: "jobs",
    title: "Job Recommendations",
    isOptional: true,
    link: "/jobs"
  },
  {
    id: "mock",
    title: "Mock Interview",
    isOptional: true,
    link: "/mock-interview"
  },
  {
    id: "l1",
    title: "L1 Interview",
    link: "/interviews"
  },
  {
    id: "feedback",
    title: "Feedback & Insights",
    badge: "2 Available",
    link: "/feedback"
  }
];

export function StudentJourney() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-card border rounded-lg p-6 mb-8">
      <h2 className="text-lg font-semibold mb-6">Your Journey</h2>
      <ScrollArea className="w-full">
        <div className="flex space-x-4 min-w-max pb-4">
          {journeySteps.map((step, index) => (
            <div 
              key={step.id}
              className="relative flex flex-col items-center"
              onClick={() => navigate(step.link)}
            >
              <div
                className={cn(
                  "relative cursor-pointer group transition-all",
                  "flex items-center justify-center",
                  "h-24 w-48 px-4",
                  "border rounded-md",
                  "hover:shadow-lg hover:scale-105",
                  step.isCurrent && "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20",
                  step.isCompleted && "opacity-75"
                )}
              >
                {/* Chevron shape */}
                <div
                  className={cn(
                    "absolute right-0 h-6 w-6 transform rotate-45 border-t border-r",
                    step.isCurrent ? "border-primary/20" : "border-border",
                    "translate-x-2"
                  )}
                />
                
                {/* Content */}
                <div className="flex flex-col items-center justify-center space-y-2 z-10">
                  <span className="font-medium text-sm text-center">{step.title}</span>
                  
                  {step.isOptional && (
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-muted/50"
                    >
                      Optional
                    </Badge>
                  )}
                  
                  {step.badge && (
                    <Badge 
                      className={cn(
                        "text-xs",
                        step.id === "profile" ? "bg-primary/20 text-primary hover:bg-primary/30" : ""
                      )}
                    >
                      {step.badge}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
