
import { Link } from "react-router-dom";
import { Briefcase, BookOpen, User, TrendingUp, BarChart, LogOut, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface NavbarMobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  handleLogout: () => void;
}

export const NavbarMobileMenu = ({ isMenuOpen, toggleMenu, handleLogout }: NavbarMobileMenuProps) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background",
        isMenuOpen ? "slide-in-from-top-2" : "hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-background p-4">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          <Link
            to="/internships"
            className="flex w-full items-center rounded-md p-2 hover:bg-accent"
            onClick={toggleMenu}
          >
            <Briefcase className="mr-2 h-5 w-5" />
            Internships
          </Link>
          <Link
            to="/courses"
            className="flex w-full items-center rounded-md p-2 hover:bg-accent"
            onClick={toggleMenu}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Courses
          </Link>
          <Link
            to="/mock-interview"
            className="flex w-full items-center rounded-md p-2 hover:bg-accent"
            onClick={toggleMenu}
          >
            <User className="mr-2 h-5 w-5" />
            Mock Interviews
          </Link>
          <Link
            to="/market-trends"
            className="flex w-full items-center rounded-md p-2 hover:bg-accent"
            onClick={toggleMenu}
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            <span className="flex items-center">
              Live Market Trends
              <span className="ml-2 relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </span>
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex w-full items-center rounded-md p-2 hover:bg-accent"
                onClick={toggleMenu}
              >
                <BarChart className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
              {user?.role === "employer" && (
                <Link
                  to="/post-internship"
                  className="flex w-full items-center rounded-md p-2 hover:bg-accent"
                  onClick={toggleMenu}
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Post Internship
                </Link>
              )}
              <button
                className="flex w-full items-center rounded-md p-2 hover:bg-accent"
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login/student"
                className="flex w-full items-center rounded-md p-2 hover:bg-accent"
                onClick={toggleMenu}
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Student Login
              </Link>
              <Link
                to="/login/employer"
                className="flex w-full items-center rounded-md p-2 hover:bg-accent"
                onClick={toggleMenu}
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Employer Login
              </Link>
              <Link
                to="/register/student"
                className="flex w-full items-center rounded-md p-2 hover:bg-accent"
                onClick={toggleMenu}
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Student Register
              </Link>
              <Link
                to="/register/employer"
                className="flex w-full items-center rounded-md p-2 hover:bg-accent"
                onClick={toggleMenu}
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Employer Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};
