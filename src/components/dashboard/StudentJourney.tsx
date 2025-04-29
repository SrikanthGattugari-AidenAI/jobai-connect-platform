
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface JourneyStep {
  id: string;
  title: string;
  isOptional?: boolean;
  isCompleted?: boolean;
  isCurrent?: boolean;
  isNew?: boolean;
  badge?: string;
  link: string;
  bgColor?: string;
  icon?: React.ReactNode;
}

const journeySteps: JourneyStep[] = [
  {
    id: "profile",
    title: "Profile",
    isCurrent: true,
    badge: "70%",
    link: "/profile",
    bgColor: "bg-gradient-to-r from-blue-50 to-blue-100"
  },
  {
    id: "jobs",
    title: "Job Recommendations",
    isNew: true,
    link: "/jobs",
    bgColor: "bg-gradient-to-r from-green-50 to-green-100"
  },
  {
    id: "interview",
    title: "Interview Agent",
    link: "/mock-interview",
    bgColor: "bg-gradient-to-r from-purple-50 to-purple-100"
  },
  {
    id: "feedback",
    title: "Feedback",
    badge: "2 Available",
    link: "/feedback",
    bgColor: "bg-gradient-to-r from-orange-50 to-orange-100"
  },
  {
    id: "hackathons",
    title: "Hackathons",
    isNew: true,
    link: "/hackathons",
    bgColor: "bg-gradient-to-r from-pink-50 to-pink-100"
  },
  {
    id: "leaderboard",
    title: "Leaderboard",
    link: "/leaderboard",
    bgColor: "bg-gradient-to-r from-teal-50 to-teal-100"
  }
];

export function StudentJourney() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }
  };

  return (
    <motion.div 
      className="w-full bg-gradient-to-br from-white to-slate-50 border rounded-lg p-6 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-6">My Journey</h2>
      <ScrollArea className="w-full">
        <div className="flex space-x-4 min-w-max pb-4">
          {journeySteps.map((step, index) => {
            const isActive = currentPath === step.link;
            return (
              <motion.div 
                key={step.id}
                className="relative flex flex-col items-center"
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={cardVariants}
                transition={{ 
                  type: "spring", 
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.1 
                }}
                onClick={() => navigate(step.link)}
              >
                <div
                  className={cn(
                    "relative cursor-pointer group transition-all",
                    "flex items-center justify-center",
                    "h-24 w-48 px-4",
                    "border rounded-md",
                    "hover:shadow-lg",
                    step.bgColor,
                    isActive && "ring-2 ring-primary shadow-lg",
                    step.isCurrent && "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20",
                    step.isCompleted && "opacity-75"
                  )}
                >
                  {/* Chevron shape with animation */}
                  <motion.div
                    className={cn(
                      "absolute right-0 h-6 w-6 transform rotate-45 border-t border-r",
                      isActive ? "border-primary" : "border-border",
                      step.bgColor,
                      "translate-x-2"
                    )}
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                  />
                  
                  {/* Content */}
                  <div className="flex flex-col items-center justify-center space-y-2 z-10">
                    <span className="font-medium text-sm text-center">{step.title}</span>
                    
                    {step.isNew && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Badge 
                          variant="default" 
                          className="text-xs bg-primary/20 text-primary"
                        >
                          New
                        </Badge>
                      </motion.div>
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
              </motion.div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.div>
  );
}
