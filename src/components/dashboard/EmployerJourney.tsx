
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmployerJourney() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const journeySteps = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Manage Jobs", path: "/employer/manage-jobs" },
    { name: "Manage Candidates", path: "/employer/candidates" },
    { name: "Hackathons", path: "/hackathons/employer" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center space-x-2 py-2 min-w-max">
        {journeySteps.map((step, index) => (
          <React.Fragment key={step.path}>
            <div
              onClick={() => navigate(step.path)}
              className={cn(
                "flex items-center px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-colors",
                pathname === step.path
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              {step.name}
            </div>
            {index < journeySteps.length - 1 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
