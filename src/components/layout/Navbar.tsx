
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Briefcase, 
  GraduationCap, 
  BarChart,
  BookOpen
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-brand-purple" />
          <span className="text-xl font-bold">InternAI</span>
        </Link>

        {/* Desktop Navigation */}
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
        </nav>

        {/* Auth Buttons or User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    {user?.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.name} 
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <BarChart className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                {user?.role === "employer" && (
                  <DropdownMenuItem onClick={() => navigate("/post-internship")}>
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Post Internship</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Login</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/login/student")}>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    <span>Student Login</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/login/employer")}>
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Employer Login</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>Register</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/register/student")}>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    <span>Student Register</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/register/employer")}>
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Employer Register</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="inline-flex md:hidden items-center justify-center rounded-md text-sm font-medium p-2"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
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
    </header>
  );
}
