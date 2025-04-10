
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { NavbarDesktopLinks } from "./NavbarDesktopLinks";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { UserMenu } from "./UserMenu";
import { AuthButtons } from "./AuthButtons";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    // Ensure menu is closed after logout
    setIsMenuOpen(false);
  };

  // Function to close the menu when clicking outside
  const handleClickOutside = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Invisible overlay to capture clicks outside the menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden" 
          onClick={handleClickOutside}
        />
      )}
      
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-custom flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-brand-purple" />
            <span className="text-xl font-bold">AidenIntern</span>
          </Link>

          {/* Desktop Navigation */}
          <NavbarDesktopLinks />

          {/* Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="inline-flex md:hidden items-center justify-center rounded-md text-sm font-medium p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <NavbarMobileMenu 
          isMenuOpen={isMenuOpen} 
          toggleMenu={toggleMenu} 
          handleLogout={handleLogout} 
        />
      </header>
    </>
  );
}
