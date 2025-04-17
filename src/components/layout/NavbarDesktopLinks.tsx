
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  FileText, 
  BookOpen,
  Building,
  Map,
  ChevronDown
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export const NavbarDesktopLinks = () => {
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const handleLinkClick = () => {
    // Close any open popover when a link is clicked
    setOpenPopover(null);
  };

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {/* Explore Dropdown */}
      <Popover open={openPopover === "explore"} onOpenChange={(open) => setOpenPopover(open ? "explore" : null)}>
        <PopoverTrigger asChild>
          <button className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
            <span>Explore</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0">
          <div className="rounded-md bg-white shadow-md">
            <div className="flex flex-col">
              <Link 
                to="/internships" 
                className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={handleLinkClick}
              >
                <Briefcase className="h-4 w-4" />
                <span>Internships</span>
              </Link>
              <Link 
                to="/jobs" 
                className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={handleLinkClick}
              >
                <Briefcase className="h-4 w-4" />
                <span>Jobs</span>
              </Link>
              <Link 
                to="/hackathons" 
                className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={handleLinkClick}
              >
                <Award className="h-4 w-4" />
                <span>Hackathons</span>
              </Link>
              <Link 
                to="/companies" 
                className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={handleLinkClick}
              >
                <Building className="h-4 w-4" />
                <span>Companies</span>
              </Link>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Upskill Dropdown */}
      <Popover open={openPopover === "upskill"} onOpenChange={(open) => setOpenPopover(open ? "upskill" : null)}>
        <PopoverTrigger asChild>
          <button className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
            <span>Upskill</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0">
          <div className="rounded-md bg-white shadow-md">
            <div className="flex flex-col">
              <Link 
                to="/courses" 
                className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={handleLinkClick}
              >
                <BookOpen className="h-4 w-4" />
                <span>Courses</span>
              </Link>
              <Link 
                to="/mock-interview" 
                className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={handleLinkClick}
              >
                <Code className="h-4 w-4" />
                <span>Mock Interviews</span>
              </Link>
              <Link 
                to="/career-path" 
                className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={handleLinkClick}
              >
                <Map className="h-4 w-4" />
                <span>Career Roadmaps</span>
              </Link>
              <Link 
                to="/resume-builder" 
                className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={handleLinkClick}
              >
                <FileText className="h-4 w-4" />
                <span>Resume Builder</span>
              </Link>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Insights Dropdown */}
      <Popover open={openPopover === "insights"} onOpenChange={(open) => setOpenPopover(open ? "insights" : null)}>
        <PopoverTrigger asChild>
          <button className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
            <span>Insights</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0">
          <div className="rounded-md bg-white shadow-md">
            <div className="flex flex-col">
              <Link 
                to="/market-trends" 
                className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={handleLinkClick}
              >
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span>Live Market Trends</span>
                  <span className="ml-2 relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </div>
              </Link>
              <Link 
                to="/blog" 
                className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={handleLinkClick}
              >
                <BookOpen className="h-4 w-4" />
                <span>Blog</span>
              </Link>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </nav>
  );
};
