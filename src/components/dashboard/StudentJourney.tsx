
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LayoutDashboard, Code, Briefcase, FileText } from "lucide-react";

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
    id: "dashboard",
    title: "Dashboard",
    link: "/dashboard",
    bgColor: "bg-gradient-to-r from-yellow-50 to-yellow-100",
    icon: <LayoutDashboard className="h-4 w-4 mr-1" />
  },
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
    id: "applications",
    title: "My Applications",
    link: "/applications",
    bgColor: "bg-gradient-to-r from-rose-50 to-rose-100",
    icon: <Briefcase className="h-4 w-4 mr-1" />
  },
  {
    id: "offers",
    title: "Offer Letters",
    link: "/offers",
    bgColor: "bg-gradient-to-r from-amber-50 to-amber-100",
    icon: <FileText className="h-4 w-4 mr-1" />
  },
  {
    id: "interview",
    title: "Interview Agent",
    link: "/mock-interview",
    bgColor: "bg-gradient-to-r from-purple-50 to-purple-100"
  },
  {
    id: "l1-interview",
    title: "L1 Technical Interview",
    isNew: true,
    link: "/l1-technical-interview",
    bgColor: "bg-gradient-to-r from-indigo-50 to-indigo-100",
    icon: <Code className="h-4 w-4 mr-1" />
  },
  {
    id: "feedback",
    title: "Feedback",
    badge: "2 Available",
    link: "/interview-feedback",
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
      className="w-full bg-white border rounded-lg p-6 mb-6 shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-5 text-gray-800">My Journey</h2>
      <ScrollArea className="w-full">
        <div className="flex space-x-5 min-w-max pb-4 px-1">
          {journeySteps.map((step, index) => {
            const isActive = currentPath.includes(step.link.replace('/', ''));
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
                    "h-20 w-40 px-3", 
                    "border rounded-md",
                    "hover:border-2 hover:border-primary hover:shadow-lg",
                    step.bgColor,
                    isActive && "ring-2 ring-primary shadow-lg border-primary",
                    step.isCurrent && "shadow-sm",
                    step.isCompleted && "opacity-75"
                  )}
                >
                  {/* Chevron shape with animation */}
                  <motion.div
                    className={cn(
                      "absolute right-0 h-5 w-5 transform rotate-45 border-t border-r", 
                      isActive ? "border-primary" : "border-border",
                      step.bgColor,
                      "translate-x-2"
                    )}
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                  />
                  
                  {/* Content */}
                  <div className="flex flex-col items-center justify-center space-y-1 z-10">
                    <span className="font-bold text-center flex items-center">
                      {step.icon}{step.title}
                    </span>
                    
                    {step.isNew && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Badge 
                          variant="default" 
                          className="text-xs bg-green-500 hover:bg-green-600 text-white"
                        >
                          New
                        </Badge>
                      </motion.div>
                    )}
                    
                    {step.badge && (
                      <Badge 
                        className={cn(
                          "text-xs",
                          step.id === "profile" ? "bg-green-500 hover:bg-green-600 text-white" : 
                          step.id === "feedback" ? "bg-green-500 hover:bg-green-600 text-white" : ""
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
