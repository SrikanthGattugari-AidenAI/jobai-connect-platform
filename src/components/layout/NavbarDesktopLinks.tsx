
import { Link } from "react-router-dom";
import { TrendingUp, Briefcase, GraduationCap, Code, Award, FileText, BookOpen } from "lucide-react";

export const NavbarDesktopLinks = () => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link to="/internships" className="text-sm font-medium hover:text-primary transition-colors">
        Internships
      </Link>
      <Link to="/courses" className="text-sm font-medium hover:text-primary transition-colors">
        Courses
      </Link>
      <Link to="/mock-interview" className="text-sm font-medium hover:text-primary transition-colors">
        Mock Interviews
      </Link>
      <Link to="/career-path" className="text-sm font-medium hover:text-primary transition-colors">
        Career Roadmaps
      </Link>
      <Link to="/hackathons" className="text-sm font-medium hover:text-primary transition-colors">
        Hackathons
      </Link>
      <Link to="/companies" className="text-sm font-medium hover:text-primary transition-colors">
        Companies
      </Link>
      <Link to="/resume-builder" className="text-sm font-medium hover:text-primary transition-colors">
        Resume Builder
      </Link>
      <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
        Blog
      </Link>
      <Link to="/market-trends" className="text-sm font-medium hover:text-primary transition-colors flex items-center space-x-1 group">
        <span>Live Market Trends</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      </Link>
    </nav>
  );
};
